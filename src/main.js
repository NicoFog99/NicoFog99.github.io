import './style.css'
import {dibujarMapa, aplicarEstado} from './mapa.js'
import {cargarEstado} from './estado.js'

const svg = document.getElementById('mapa')

dibujarMapa(svg)
try{
    const datos = await cargarEstado()
    aplicarEstado(svg, datos)
}
catch(error){
    console.warn('No se pudo cargar el estado', error)
}

