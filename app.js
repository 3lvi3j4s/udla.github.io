// ====================================================================
// --- DATOS DE EJEMPLO ---
// ====================================================================

const USUARIOS = {
    '19876543-2': { nombre: 'María Soto', pass: 'clases' },
    '17123456-7': { nombre: 'Pedro González', pass: 'udla' }
};

// Horario y Detalle Ramos
const HORARIO = [
    { hora: '08:00 - 09:30', ramo: 'Álgebra I', sala: 'Sala B-201', campus: 'SANTIAGO CENTRO' },
    { hora: '10:00 - 11:30', ramo: 'Cálculo Diferencial', sala: 'Auditorio A', campus: 'SANTIAGO CENTRO' },
    { hora: '13:00 - 14:30', ramo: 'Programación', sala: 'Laboratorio P1', campus: 'SANTIAGO CENTRO' },
    { hora: '15:00 - 16:30', ramo: 'Economía', sala: 'Sala D-305', campus: 'SANTIAGO CENTRO' },
    { hora: '17:00 - 18:30', ramo: 'Tecnologías y Creac. de Valor', sala: 'Sala C-101', campus: 'SANTIAGO CENTRO' }
];

const DETALLE_RAMOS = {
    'Álgebra I': {
        asistencia: '90% (2 faltas)',
        notas: [
            { nombre: 'Control 1', nota: 6.8, ponderacion: '25%' },
            { nombre: 'Examen Parcial', nota: 5.0, ponderacion: '45%' }
        ],
        avisos: 'El Examen Global de recuperación se realizará el próximo martes a las 15:00 hrs.'
    },
    'Cálculo Diferencial': {
        asistencia: '85% (3 faltas)',
        notas: [
            { nombre: 'Prueba Escrita', nota: 4.2, ponderacion: '40%' },
            { nombre: 'Laboratorio', nota: 6.5, ponderacion: '60%' }
        ],
        avisos: 'El profesor subió el material de series al aula virtual. Revisar antes de la próxima sesión.'
    },
    'Programación': {
        asistencia: '78% (5 faltas)',
        notas: [
            { nombre: 'Tarea 1 (Estructuras)', nota: 5.5, ponderacion: '30%' },
            { nombre: 'Proyecto Final', nota: 6.2, ponderacion: '70%' }
        ],
        avisos: 'Se extendió el plazo de la Tarea 2 hasta el viernes a las 23:59.'
    },
    'Economía': {
        asistencia: '98% (0 faltas)',
        notas: [
            { nombre: 'Ensayo 1', nota: 6.0, ponderacion: '50%' },
            { nombre: 'Presentación', nota: 6.5, ponderacion: '50%' }
        ],
        avisos: 'No hay avisos urgentes.'
    },
    'Tecnologías y Creac. de Valor': {
        asistencia: '82% (4 faltas)',
        notas: [
            { nombre: 'Investigación', nota: 5.8, ponderacion: '100%' }
        ],
        avisos: 'El horario de consultas de proyectos será los miércoles de 18:00 a 19:00 hrs.'
    }
};

// ====================================================================
// --- ESTRUCTURA DEL TOUR VR ---
// ====================================================================

const TOUR_NODOS = {
    "pasillo_atencion": {
        img: "imagenes/IMG_0837.jpg", 
        descripcion: "Pasillo central y área de atención al alumno.",
        enlaces: [
            { destino: "pasillo_clases", texto: "Avanzar a Corredor de Salas", pos: "0.2 1.5 -3", rot: "0 0 0" },
            { destino: "area_servicios", texto: "Oficina de Servicios", pos: "-3 1.5 0", rot: "0 90 0" }, 
            { destino: "pasillo_salas_entrada", texto: "Ir a Salas de Clase", pos: "2 1.5 -2.5", rot: "0 45 0" },
            { destino: "kiosco_area", texto: "Ir a Kiosco Impresión", pos: "1.5 1.5 3", rot: "0 180 0" },
        ]
    },
    "pasillo_clases": {
        img: "imagenes/IMG_0867.jpg",
        descripcion: "Corredor principal de salas de clase.",
        enlaces: [
            { destino: "entrada_patio", texto: "Ver Patio Exterior", pos: "0 1.5 -3", rot: "0 0 0" },
            { destino: "pasillo_atrio_inicio", texto: "Ir a Escaleras y Atrio", pos: "-2.5 1.5 0", rot: "0 90 0" },
            { destino: "pasillo_oficinas", texto: "Ir a Oficinas/Dirección", pos: "2.5 1.5 0", rot: "0 -90 0" },
            { destino: "pasillo_atencion", texto: "Volver al Área de Atención", pos: "0 1.5 3", rot: "0 180 0" },
        ]
    },
    "pasillo_oficinas": {
        img: "imagenes/IMG_0877.jpg",
        descripcion: "Pasillo de oficinas y áreas administrativas.",
        enlaces: [
            { destino: "oficina_subdirector", texto: "Ver Oficina Sub Director", pos: "1.5 1.5 0", rot: "0 -90 0" },
            { destino: "pasillo_clases", texto: "Volver al Corredor Principal", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "oficina_subdirector": {
        img: "imagenes/IMG_0878.jpg",
        descripcion: "Oficina del Sub Director de Tecnologías de la Información.",
        enlaces: [
            { destino: "pasillo_oficinas", texto: "Volver al Pasillo", pos: "-3 1.5 0", rot: "0 90 0" }
        ]
    },
    "entrada_patio": {
        img: "imagenes/IMG_0887.jpg", 
        descripcion: "Puerta de salida al patio/terraza del campus.",
        enlaces: [
            { destino: "pasillo_clases", texto: "Volver a Corredor", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "pasillo_atrio_inicio": {
        img: "imagenes/IMG_0857.jpg",
        descripcion: "Inicio del atrio central, cerca del kiosco de impresión.",
        enlaces: [
            { destino: "pasillo_atrio", texto: "Ver Atrio / Ascensores", pos: "2.5 1.5 0", rot: "0 -90 0" },
            { destino: "escaleras_planta_baja", texto: "Escaleras / Zona Social", pos: "-2 1.5 0", rot: "0 90 0" },
            { destino: "pasillo_clases", texto: "Volver a Corredor Principal", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "pasillo_atrio": {
        img: "imagenes/IMG_0852.jpg",
        descripcion: "Vista del atrio de varios niveles y ascensores.",
        enlaces: [
            { destino: "pasillo_atrio_inicio", texto: "Volver al Pasillo", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "escaleras_planta_baja": {
        img: "imagenes/IMG_0859.jpg",
        descripcion: "Escaleras y zona de acceso al segundo piso.",
        enlaces: [
            { destino: "zona_social", texto: "Ver Sofás (Zona Social)", pos: "0 1.5 3", rot: "0 180 0" }, 
            { destino: "pasillo_atrio_inicio", texto: "Volver al Atrio", pos: "-3 1.5 0", rot: "0 90 0" }
        ]
    },
    "zona_social": {
        img: "imagenes/IMG_0861.jpg",
        descripcion: "Sofás naranjas y zona de encuentro.",
        enlaces: [
            { destino: "escaleras_planta_baja", texto: "Volver a Escaleras", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "area_servicios": {
        img: "imagenes/IMG_0822.jpg", 
        descripcion: "Área de Servicios y Atención al Alumno.",
        enlaces: [
            { destino: "servicio_counter", texto: "Ver Mesón de Atención", pos: "-1 1.5 -3", rot: "0 0 0" }, 
            { destino: "pasillo_atencion", texto: "Volver al Pasillo", pos: "3 1.5 0", rot: "0 -90 0" },
        ]
    },
    "servicio_counter": {
        img: "imagenes/IMG_0847.jpg", 
        descripcion: "Detalle del mesón de servicios tecnológicos.",
        enlaces: [
            { destino: "area_servicios", texto: "Volver al Área", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "pasillo_salas_entrada": {
        img: "imagenes/IMG_0803.jpg", 
        descripcion: "Pasillo central entre salas A316 y A314.",
        enlaces: [
            { destino: "entrada_sala_a316", texto: "Entrada Sala A316", pos: "-2 1.5 0.5", rot: "0 90 0" },
            { destino: "entrada_sala_a314", texto: "Entrada Sala A314", pos: "2 1.5 0.5", rot: "0 -90 0" },
            { destino: "pasillo_atencion", texto: "Volver al Pasillo Principal", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "entrada_sala_a316": {
        img: "imagenes/IMG_0800.jpg",
        descripcion: "Vista de la puerta de Sala A316.",
        enlaces: [
            { destino: "sala_a316_interior", texto: "Acceder a Sala", pos: "2 1.5 -0.5", rot: "0 0 0" },
            { destino: "pasillo_salas_entrada", texto: "Volver al Centro", pos: "-3 1.5 0", rot: "0 90 0" }
        ]
    },
    "entrada_sala_a314": {
        img: "imagenes/IMG_0805.jpg",
        descripcion: "Vista de la puerta de Sala A314.",
        enlaces: [
            { destino: "laboratorio_computacion", texto: "Acceder a Laboratorio", pos: "-1 1.5 -2", rot: "0 0 0" },
            { destino: "pasillo_salas_entrada", texto: "Volver al Centro", pos: "3 1.5 0", rot: "0 -90 0" }
        ]
    },
    "laboratorio_computacion": {
        img: "imagenes/IMG_0796.jpg",
        descripcion: "Interior: Laboratorio de Computación A314.",
        enlaces: [
            { destino: "entrada_sala_a314", texto: "Salir de Laboratorio", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
    "sala_a316_interior": {
        img: "imagenes/IMG_0797.jpg",
        descripcion: "Interior de la Sala A316.",
        enlaces: [
            { destino: "entrada_sala_a316", texto: "Salir de Sala", pos: "0 1.5 3", rot: "0 180 0" }
        ]
    },
};

// ====================================================================
// --- FUNCIONES VR ---
// ====================================================================

function getAssetId(imagePath) {
    return `#img-${imagePath.split('/').pop().split('.')[0]}`;
}

function startCampusTour() {
    loadScene('pasillo_atencion'); 
}

function loadScene(nodoKey) {
    const nodo = TOUR_NODOS[nodoKey];
    if (!nodo) { console.error("Nodo no encontrado:", nodoKey); return; }

    const imagePlane = document.getElementById('current-image-plane');
    if (!imagePlane) {
        setTimeout(() => loadScene(nodoKey), 500); 
        return;
    }
    
    const assetId = getAssetId(nodo.img);
    imagePlane.setAttribute('src', assetId);
    
    const hotspotsContainer = document.getElementById('hotspots-container');
    hotspotsContainer.innerHTML = '';

    nodo.enlaces.forEach(enlace => {
        createHotspot(hotspotsContainer, enlace);
    });

    document.getElementById('tour-info').textContent = `Ubicación actual: ${nodo.descripcion}`;
}

function createHotspot(container, enlace) {
    const hotspot = document.createElement('a-box');
    hotspot.setAttribute('width', 0.5);
    hotspot.setAttribute('height', 0.3);
    hotspot.setAttribute('depth', 0.1);
    hotspot.setAttribute('position', enlace.pos);
    hotspot.setAttribute('color', '#FF8C00');
    hotspot.setAttribute('opacity', 0.8);
    hotspot.setAttribute('cursor-listener', ''); 
    
    const text = document.createElement('a-text');
    text.setAttribute('value', enlace.texto);
    text.setAttribute('align', 'center');
    text.setAttribute('width', 3);
    text.setAttribute('position', '0 0 0.06');
    text.setAttribute('color', 'white');
    hotspot.appendChild(text);

    hotspot.addEventListener('click', () => { loadScene(enlace.destino); });
    container.appendChild(hotspot);
}

// ====================================================================
// --- CONTROL DE VISTA Y LOGICA PRINCIPAL ---
// ====================================================================

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();
    const mensajeError = document.getElementById('mensaje-error');

    const credenciales = USUARIOS[usuario];

    if (credenciales && credenciales.pass === password) {
        sessionStorage.setItem('usuarioLogueado', credenciales.nombre);
        mensajeError.textContent = '';
        inicializarApp(credenciales.nombre);
    } else {
        mensajeError.textContent = 'Usuario o contraseña incorrectos.';
    }
});

function inicializarApp(nombreUsuario) {
    document.getElementById('login').classList.add('oculto');
    document.getElementById('horario').classList.remove('oculto');
    document.getElementById('horario-titulo').textContent = `Horario y Detalles Académicos`;
    const header = document.querySelector(".header h1");
    header.textContent = `Hola, ${nombreUsuario.split(' ')[0]} ${nombreUsuario.split(' ')[1] || ''}`; 
    cargarHorario(); 
    document.getElementById('ai-widget-flotante').classList.remove('ocultar-widget');
    document.querySelector(".menu-toggle").classList.remove('ocultar-widget');
}

function toggleMenu() {
    if (!sessionStorage.getItem('usuarioLogueado')) return; 
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === '0px' || sidebar.style.width === '') {
        sidebar.style.width = (window.innerWidth <= 768) ? "100%" : "250px";
    } else {
        sidebar.style.width = "0"; 
    }
}

function cargarHorario() {
    const carrusel = document.createElement('div');
    carrusel.className = 'carrusel-horario';

    HORARIO.forEach(clase => {
        const item = document.createElement('div');
        item.className = 'clase-item';
        item.innerHTML = `
            <div class="clase-header">
                <span class="clase-detalle hora">${clase.hora}</span>
                <span class="clase-nombre">${clase.ramo}</span>
            </div>
            <div class="clase-footer">
                <span class="clase-detalle lugar">📍 ${clase.sala}</span>
                <span class="clase-detalle lugar">${clase.campus}</span>
            </div>
        `;
        carrusel.appendChild(item);
    });
    document.getElementById('carrusel-tarjetas').innerHTML = '';
    document.getElementById('carrusel-tarjetas').appendChild(carrusel);
    cargarListaRamos();
}

function cargarListaRamos() {
    const listaRamosDiv = document.getElementById('ramo-list'); 
    let html = '<h4 class="lista-titulo">Mis Ramos</h4>';
    Object.keys(DETALLE_RAMOS).forEach(ramo => { 
        html += `<a href="#" class="ramo-link" onclick="handleRamoClick(event, '${ramo}')">${ramo}</a>`;
    });
    if (listaRamosDiv) listaRamosDiv.innerHTML = html;
}

function handleRamoClick(e, ramoNombre) {
    e.preventDefault();
    mostrarDetalleRamo(ramoNombre, e.currentTarget);
    if (window.innerWidth <= 768) document.getElementById("sidebar").style.width = "0";
}

function mostrarDetalleRamo(ramoNombre, clickedLink) {
    const detalle = DETALLE_RAMOS[ramoNombre];
    document.getElementById('carrusel-tarjetas').classList.add('oculto-detail');
    document.getElementById('detalle-ramo').classList.remove('oculto-detail');
    
    document.getElementById('detalle-ramo-titulo').textContent = ramoNombre;
    document.getElementById('asistencia-info').textContent = detalle.asistencia;
    document.getElementById('avisos-info').textContent = detalle.avisos;

    const notasLista = document.getElementById('notas-lista');
    notasLista.innerHTML = '';
    detalle.notas.forEach(nota => {
        const li = document.createElement('li');
        li.innerHTML = `${nota.nombre}: <strong style="color: ${nota.nota >= 5.0 ? '#27AE60' : '#E74C3C'};">${nota.nota}</strong> (${nota.ponderacion})`;
        notasLista.appendChild(li);
    });
    
    document.querySelectorAll('#ramo-list .ramo-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.trim() === ramoNombre) link.classList.add('active');
    });
}

function volverACarrusel() {
    document.getElementById('carrusel-tarjetas').classList.remove('oculto-detail');
    document.getElementById('detalle-ramo').classList.add('oculto-detail');
    document.querySelectorAll('.ramo-link').forEach(link => link.classList.remove('active'));
}

function mostrarVista(vistaId) {
    // Ocultar todo
    document.getElementById('login').classList.add('oculto');
    document.getElementById('horario').classList.add('oculto');
    document.getElementById('mapa').classList.add('oculto');
    document.getElementById('vr-view').classList.add('oculto');

    // Mostrar selección
    document.getElementById(vistaId).classList.remove('oculto');
    
    if (vistaId === 'horario') volverACarrusel();
    
    // NOTA: Ya no necesitamos inicializar Leaflet aquí, porque usamos un iframe.
    
    if (vistaId === 'vr-view' && typeof AFRAME !== 'undefined') startCampusTour();
    
    document.getElementById("sidebar").style.width = "0";
}

function cerrarSesion() {
    sessionStorage.removeItem('usuarioLogueado');
    location.reload(); 
}

window.onload = function() {
    const nombreUsuario = sessionStorage.getItem('usuarioLogueado');
    if (nombreUsuario) inicializarApp(nombreUsuario);
};
