import { test, expect, expectTypeOf } from 'vitest'
import { nodos, conexiones, nodoPorId } from './proyectos'


test ('cada conexion apunta a nodos existentes', () => {
    for (const conexion of conexiones){
        expect(nodoPorId[conexion.origen]).toBeDefined()
        expect(nodoPorId[conexion.destino]).toBeDefined()
    } 
})

test ('los id no se repiten', () => {
    const ids = nodos.map(nodo => nodo.id)
    const setIds = new Set(ids)
    expect(setIds.size).toBe(ids.length)
})

test ('cada proyecto tiene stack y enlaces', () => {
    const proyectos = nodos.filter(nodo =>  nodo.tipo === "proyecto")
    expect(proyectos.length).toBeGreaterThan(0)
    for (const proyecto of proyectos) {
        expect(Array.isArray(proyecto.stack)).toBe(true)
        expect(Array.isArray(proyecto.enlaces)).toBe(true)
    }
})