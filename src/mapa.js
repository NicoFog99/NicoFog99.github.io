import { nodos, conexiones, nodoPorId } from './datos/proyectos'

console.log('dibujarMapa se ejecuta con', nodos.length, 'nodos')
const NS = 'http://www.w3.org/2000/svg';
function svgEl(etiqueta, atributos = {}) {
  const el = document.createElementNS(NS, etiqueta);
  for (const [nombre, valor] of Object.entries(atributos)) el.setAttribute(nombre, valor);
  return el;
}

export function dibujarMapa(svg) {
        const defs = svgEl( 'defs', {})
const radialGradient = svgEl('radialGradient', {
    id: 'esfera',
    fx: '30%',
    fy: '30%'
})

const stopClaro = svgEl('stop', {
    offset: '0%',
    'stop-color': '#7dd3fc'
})
const stopOscuro = svgEl('stop', {
    offset: '100%',
    'stop-color': '#1e3a8a'
})

radialGradient.append(stopClaro, stopOscuro)
defs.append(radialGradient)
svg.append(defs)

        const panelNombre = document.getElementById('panel-nombre')
        const panelDescripcion = document.getElementById('panel-descripcion')
        const panelStack = document.getElementById('panel-stack')
        const panelEnlaces = document.getElementById('panel-enlaces')
        const escenario = document.querySelector('.escenario')

        const boton = document.getElementById('panel-cerrar')

        //funcion para quitar el panel
        function vaciarPanel(){
            escenario.classList.remove('abierto')
        }

        boton.addEventListener ('click', vaciarPanel)

        document.addEventListener('click', (evento) => {
            if (! evento.target.closest('#panel') && ! evento.target.closest('.nodo')) {
                vaciarPanel()
            }
        })

        const capaPuntos = svgEl ('g',{ 
            class: 'capa-puntos'
        })

        const capaConexiones = svgEl ('g', {
            class: 'capa-conexiones',
        })
        const capaNodos = svgEl ('g', {
            class: 'capa-nodos',
        })
        svg.append(capaConexiones, capaPuntos, capaNodos)

    const meridianos = []
    for (const nodo of nodos){
        //transformamos las coordenadas del nodo
        const [x, y] = nodo.pos;
        const coordenadas = `translate(${x}, ${y})`;
        //crea el grupo
        const grupo = svgEl('g', {
            class: 'nodo',
            transform: coordenadas,
            'data-id': nodo.id
        })
        //crea el circulo en base de la categoria
        const radio = nodo.tipo === "proyecto" ? 24 : 15
        const circulo = svgEl('circle', {
            class: 'nodo-cuerpo',
            r: radio
        })
        //crea el nombre
        const textoNombre = svgEl('text',{
            y: radio + 24,
            'text-anchor': 'middle',
            class: 'texto-svg'
        })
        textoNombre.textContent = nodo.nombre
        //crea el subtexto
        const textoSub = svgEl('text',{
            y: radio + 44,
            'text-anchor': 'middle',
            class: 'texto-svg'
        })
        textoSub.textContent = nodo.sub
        grupo.append(circulo)

        // Creamos las elipses
        const angulos = [0, 1.05, 2.1]
        for (const angulo of angulos){
            const elipse = svgEl('ellipse',{
                class: 'alambre',
                ry: radio
            })
            meridianos.push({elipse, radio, angulo, grupo})
            grupo.append(elipse)
        }
        
        //Calcular paralelos
        const alturas = [-0.5, 0, 0.5]
        for (const altura of alturas){
            const elipse = svgEl('ellipse', {
                class: 'alambre',
                cy: radio * altura,
                rx: radio * Math.sqrt(1-altura * altura),
                ry: radio * 0.15
            })
            
            grupo.append(elipse)
        }

        grupo.append( textoNombre, textoSub)
        capaNodos.append(grupo)
        const selector = `[data-origen="${nodo.id}"],[data-destino="${nodo.id}"]`
        grupo.addEventListener('mouseenter', () => {
            const lineas = svg.querySelectorAll(selector)
            svg.classList.add('enfocado')
            grupo.classList.add('girando')
            for (const linea of lineas) {
                linea.classList.add('activa')
            }    
        })
        grupo.addEventListener('mouseleave', () =>{
            const lineas = svg.querySelectorAll(selector)
            svg.classList.remove('enfocado')
            grupo.classList.remove('girando')
            for (const linea of lineas) {
                linea.classList.remove('activa')
            }
        })
        if (nodo.tipo === "proyecto"){
            grupo.addEventListener('click', () =>{
                panelNombre.textContent = nodo.nombre
                panelDescripcion.textContent = nodo.descripcion
                panelStack.replaceChildren()
                for (const tecnologia of nodo.stack){
                    const li = document.createElement('li')
                    li.textContent = tecnologia
                    panelStack.append(li)
                }
                panelEnlaces.replaceChildren()
                for (const enlace of nodo.enlaces){
                    const a = document.createElement('a')
                    a.href = enlace.url
                    a.textContent = enlace.texto
                    a.target = '_blank'
                    a.rel = 'noopener'
                    panelEnlaces.append(a)
                }
            
            escenario.classList.add('abierto')
        })}
    }

    const viajeros = []
    //crea las lineas de union entre nodos
    for (const [i, conexion] of conexiones.entries()){
        const [x1, y1] = nodoPorId[conexion.origen].pos;
        const [x2, y2] = nodoPorId[conexion.destino].pos;
        const curva = conexion.curva ?? 40
        const dx = x2 - x1
        const dy = y2 - y1
        const largo = Math.hypot(dx, dy)
        const cx = (x1 + x2) / 2 + dy / largo *curva
        const cy = (y1 + y2) / 2 - dx / largo * curva



        const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
        const camino = svgEl ('path', {
            class: 'conexion',
            d,
            'data-origen': conexion.origen,
            'data-destino': conexion.destino
        })
        //variable para retraso en animacion
        const tiempo = `${i * 0.15}s`
        capaConexiones.append(camino)
        const largoCamino = camino.getTotalLength()
        //animaciones para el css
        camino.style.setProperty('--largo', largoCamino)
        camino.style.setProperty('--retraso', tiempo)
        const punto = svgEl ('circle', {
            class: 'punto',
            r: 3
        })
        capaPuntos.append(punto)
         // calcula el tiempo de que tarda en recorrer la linea  
        const duracion = largoCamino / 120 * 1000
        const desfase = Math.random() * duracion
        viajeros.push({camino, punto, largoCamino, duracion, desfase})
    }
    let tiempoAnterior = 0
    function animar(tiempo) {
        const delta = tiempo - tiempoAnterior
        tiempoAnterior = tiempo
        for (const viajero of viajeros) {
           const fraccion = ((tiempo + viajero.desfase) % viajero.duracion) / viajero.duracion
           const distancia = fraccion * viajero.largoCamino
           const p = viajero.camino.getPointAtLength(distancia)
           viajero.punto.setAttribute('cx', p.x)
           viajero.punto.setAttribute('cy', p.y) 
        }
        for (const meridiano of meridianos){
            const velocidad =  meridiano.grupo.classList.contains('girando') ? 0.004 : 0.0005
            meridiano.angulo += delta * velocidad
            meridiano.elipse.setAttribute('rx', meridiano.radio * Math.abs(Math.cos(meridiano.angulo)))
        }
        requestAnimationFrame(animar)
    }
    requestAnimationFrame(animar)
}

function marcar (svg, id, clase) {
    const selector = `[data-id="${id}"]`
    const grupo = svg.querySelector(selector)
    grupo.classList.add(clase) 
}

export function aplicarEstado(svg, datos){

    for (const nodo of nodos) {
        if (nodo.monitor === undefined){
            continue
        }
        const comprobacion = datos.apis.find((api) => api.nombre === nodo.monitor)
        if (comprobacion === undefined){
            continue
        }
        marcar(svg, nodo.id, comprobacion.ok ? 'ok' : 'caido')
    }
    marcar(svg, 'portfolio', 'ok')
    marcar(svg, 'api-status', 'ok')
    marcar(svg, 'neon', 'ok')

    const catalogo = datos.apis.filter(api => ! nodos.some(nodo => nodo.monitor === api.nombre))
    const caidas = catalogo.filter(api => !api.ok).length
    marcar(svg, 'apis', caidas === 0 ? 'ok' : 'parcial')
}