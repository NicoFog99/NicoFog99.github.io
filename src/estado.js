const URL_ESTADO = "https://api-status-t0z4.onrender.com/api/estado"
export async function cargarEstado() {
    const respuesta = await fetch(URL_ESTADO)
    if (!respuesta.ok){
        throw new Error('API Status respondió ' + respuesta.status)
    }
    return await respuesta.json()
}