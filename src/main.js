import './style.css'
import '@fontsource-variable/inter'
import {dibujarMapa, aplicarEstado} from './mapa.js'
import {cargarEstado} from './estado.js'

const svg = document.getElementById('mapa')

const email = document.getElementById('contacto-email')
const emailTexto = document.getElementById('email-texto')


email.addEventListener('click', (evento) => {
    evento.preventDefault()
    const usuario = 'nicofog99'
    const dominio = 'gmail.com'
    const direccion = `${usuario}@${dominio}`
    navigator.clipboard.writeText(direccion)
    emailTexto.textContent = `${direccion} · copiado ✓`
    setTimeout(() => {emailTexto.textContent=''}, 3000)
})


dibujarMapa(svg)
try{
    const datos = await cargarEstado()
    aplicarEstado(svg, datos)
}
catch(error){
    console.warn('No se pudo cargar el estado', error)
}