export const nodos = [
    {id: "tu", nombre: "Tú", sub: "tu navegador", tipo: "servicio", pos: [100, 380]},
    {id: "portfolio", nombre: "Este portfolio", sub: "GitHub Pages", tipo: "proyecto", pos: [340, 150],
        descripcion: "El mapa que estás viendo. Está hecho con SVG y JavaScript, sin librerías, y se genera a partir de un archivo de datos. Lee en directo el estado de mis servicios desde API Status.",
        stack: ["JavaScript", "SVG", "Vite", "GitHub Actions"],
        enlaces: [
            {texto: "Código", url: "https://github.com/NicoFog99/NicoFog99.github.io"}
        ]},
    {id: "apihub", nombre: "APIHub", sub: "Django en Render", tipo: "proyecto", pos: [340, 380], monitor: "APIHub (demo)",
        descripcion: "Catálogo de APIs públicas donde puedes probar cada una desde el navegador. Las peticiones pasan por un proxy en el servidor limitado a las APIs del catálogo, y tiene una cuenta demo protegida.",
        stack: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
        enlaces: [
            {texto: "Demo", url: "https://apihub-09o7.onrender.com/"},
            {texto: "Código", url: "https://github.com/NicoFog99/apihub"}
        ]},
    {id: "mythos", nombre: "MYTHOS", sub: "PHP tras Cloudflare", tipo: "proyecto", pos: [340, 610], monitor: "MYTHOS",
        descripcion: "Sitio bilingüe (EN/IT) de mitología con historias enviadas por usuarios. Refactorización y despliegue en PHP, MySQL y JS vanilla, con SEO, moderación por correo y medidas de seguridad.",
        stack: ["PHP", "Cloudflare", "JavaScript", "MySQL"],
        enlaces: [
            {texto: "Web", url: "https://mythosleader.com/"}
        ]},
    {id: "api-status", nombre: "API Status", sub: "FastAPI en Render", tipo: "proyecto", pos: [620, 150],
        descripcion: "Monitor de disponibilidad. Cada hora, GitHub Actions comprueba mis servicios y las APIs del catálogo y guarda el resultado en PostgreSQL. Una API en FastAPI sirve el estado actual y el historial.",
        stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "GitHub Actions"],
        enlaces: [
            {texto: "Estado en directo", url: "https://api-status-t0z4.onrender.com/"},
            {texto: "Código", url: "https://github.com/NicoFog99/api-status"}
        ]},
    {id: "apis", nombre: "APIs públicas", sub: "las del catálogo", tipo: "servicio", pos: [620, 380]},
    {id: "neon", nombre: "PostgreSQL", sub: "Neon", tipo: "servicio", pos: [900, 150]},
    {id: "actions", nombre: "GitHub Actions", sub: "cada hora", tipo: "servicio", pos: [900, 380]},
    {id: "boe", nombre: "API del BOE", sub: "BORME diario", tipo: "servicio", pos: [790, 650]},
    {id: "borme", nombre: "Scraper BORME", sub: "Python en Linux", tipo: "proyecto", pos: [960, 650],
        descripcion: "Proyecto de mis prácticas en Arenna Labs. Descarga cada día el BORME desde la API del BOE, extrae los actos societarios y los guarda de forma estructurada. Es código privado de la empresa.",
        stack: ["Python", "Linux"],
        enlaces: []},
    {id: "proggest", nombre: "Proggest", sub: "gestión de empresa", tipo: "proyecto", pos: [1130, 650],
        descripcion: "Participé en el desarrollo de Proggest, una aplicación ERP desarrollada por Arenna Labs.",
        stack: ["Next.js", "React", "Tailwind CSS"],
        enlaces: []}
]

export const conexiones = [
    {origen: "tu", destino: "portfolio", descripcion: "visitas esta web"},
    {origen: "tu", destino: "apihub", descripcion: "pruebas una API"},
    {origen: "tu", destino: "mythos", descripcion: "lees un mito"},
    {origen: "portfolio", destino: "api-status", descripcion: "lee el estado en directo"},
    {origen: "apihub", destino: "apis", descripcion: "proxy limitado al catálogo"},
    {origen: "actions", destino: "apis", descripcion: "comprueba cada hora"},
    {origen: "actions", destino: "apihub", descripcion: "comprueba cada hora", curva : -90},
    {origen: "actions", destino: "mythos", descripcion: "comprueba cada hora"},
    {origen: "actions", destino: "neon", descripcion: "guarda los resultados"},
    {origen: "api-status", destino: "neon", descripcion: "lee el historial"},
    {origen: "boe", destino: "borme", descripcion: "descarga diaria"}
]

export const nodoPorId = Object.fromEntries(nodos.map(nodo => [nodo.id, nodo]))