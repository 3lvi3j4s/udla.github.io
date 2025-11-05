// 🛑 1. BASE DE DATOS SIMULADA DE USUARIOS 🛑
const datosUsuarios = {
    "19876543-2": {
        nombre: "María Soto",
        password: "clases", 
        eventos: [
            { nombre: "Matemáticas Avanzadas", hora: "08:00 - 09:30", sala: "Sala 201" },
            { nombre: "Física Aplicada", hora: "10:00 - 11:30", sala: "Laboratorio F1" },
            { nombre: "Programación Web", hora: "13:00 - 14:30", sala: "Edificio C, Sala 305" }
        ]
    },
    "17123456-7": {
        nombre: "Pedro González",
        password: "udla", 
        eventos: [
            { nombre: "Historia del Arte", hora: "09:00 - 10:30", sala: "Auditorio Principal" },
            { nombre: "Literatura Clásica", hora: "11:00 - 12:30", sala: "Sala de Estudio 5" },
            { nombre: "Cálculo I", hora: "16:00 - 17:30", sala: "Sala 105" }
        ]
    }
};

let eventosActuales = []; 

// 🛑 2. BASE DE DATOS SIMULADA DE DETALLES DE RAMOS 🛑
const datosRamos = {
    "Matemáticas Avanzadas": {
        asistencia: "85% - (4 faltas) - Estado: Regular",
        notas: [
            { nombre: "Control 1", nota: 5.8 },
            { nombre: "Examen Parcial", nota: 4.5 },
            { nombre: "Proyecto Final", nota: 6.2 }
        ],
        avisos: "El Examen Global de recuperación se realizará el próximo viernes a las 14:00 hrs en el Auditorio A.",
    },
    "Física Aplicada": {
        asistencia: "95% - (1 falta) - Estado: Óptimo",
        notas: [
            { nombre: "Laboratorio 1", nota: 6.5 },
            { nombre: "Prueba 1", nota: 5.0 }
        ],
        avisos: "El profesor subió el material de la unidad 3 al aula virtual. Revisar antes de la próxima sesión.",
    },
    "Programación Web": {
        asistencia: "70% - (6 faltas) - Estado: Crítico",
        notas: [
            { nombre: "Tarea 1 (Frontend)", nota: 5.5 },
            { nombre: "Examen 1 (JS)", nota: 4.8 }
        ],
        avisos: "El horario de laboratorio de programación para consultas se ha movido a los miércoles de 18:00 a 19:00 hrs.",
    },
    "Historia del Arte": {
        asistencia: "100% - Estado: Óptimo",
        notas: [
            { nombre: "Ensayo 1", nota: 6.0 },
            { nombre: "Trabajo en Clase", nota: 6.5 }
        ],
        avisos: "No hay avisos.",
    },
    "Literatura Clásica": {
        asistencia: "80% - Estado: Regular",
        notas: [
            { nombre: "Control Lectura", nota: 5.2 },
        ],
        avisos: "Próxima lectura obligatoria: La Odisea.",
    }
};

// -------------------------------------------------------------------------
// 3. FUNCIONES DE AUTENTICACIÓN
// -------------------------------------------------------------------------

function iniciarSesion(e) {
    e.preventDefault(); 
    const usuarioInput = document.getElementById('usuario').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const mensajeError = document.getElementById('mensaje-error');
    const userData = datosUsuarios[usuarioInput];

    if (userData && userData.password === passwordInput) {
        sessionStorage.setItem('usuarioLogueado', JSON.stringify({
            id: usuarioInput,
            nombre: userData.nombre
        }));
        eventosActuales = userData.eventos; 
        inicializarApp();
        mensajeError.textContent = '';
        document.getElementById('login-form').reset();
    } else {
        mensajeError.textContent = 'Usuario o contraseña incorrectos.';
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('usuarioLogueado');
    eventosActuales = []; 
    document.querySelector('.header h1').textContent = "App Académica UDLA ✨";
    
    document.getElementById('ai-widget-flotante').classList.add('ocultar-widget'); 
    document.querySelector('.menu-toggle').classList.add('ocultar-widget');
    
    mostrarVista('login'); 
    document.getElementById("sidebar").style.width = "0";
}

// -------------------------------------------------------------------------
// 4. LÓGICA DE CARGA Y NAVEGACIÓN
// -------------------------------------------------------------------------

function cargarListaRamos() {
    const listaRamosDiv = document.getElementById('ramo-list');
    let listaHTML = '';
    
    eventosActuales.forEach(evento => {
        listaHTML += `
            <a href="#" class="ramo-link" 
               onclick="handleRamoClick('${evento.nombre}', this, event);">
               ${evento.nombre}
            </a>
        `;
    });

    listaRamosDiv.innerHTML = `<h3 class="lista-titulo">Mis Ramos</h3>` + listaHTML;
}

function cargarTarjetasClase() {
    const carruselDiv = document.getElementById('carrusel-tarjetas');
    let contenido = '<div class="carrusel-horario">'; 

    if (eventosActuales.length === 0) {
        contenido += '<p style="text-align:center; flex-basis: 100%;">No tienes clases programadas para hoy.</p>';
    } else {
        contenido += eventosActuales.map(evento => `
            <div class="clase-item">
                <div class="clase-header">
                    <span class="clase-detalle hora">🕒 ${evento.hora}</span>
                    <span class="clase-nombre">${evento.nombre}</span>
                </div>
                <div class="clase-footer">
                    <span class="clase-detalle">📍 ${evento.sala}</span>
                    <span class="clase-detalle lugar">SANTIAGO CENTRO</span> 
                </div>
            </div>
        `).join('');
    }
    
    contenido += '</div>';
    carruselDiv.innerHTML = contenido;
}

function cargarHorario() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    if (usuario) {
        document.querySelector('.header h1').textContent = `Hola, ${usuario.nombre}`;
    }
    
    document.getElementById('horario-titulo').textContent = 'HORARIO Y DETALLES ACADÉMICOS';

    cargarListaRamos();
    cargarTarjetasClase();
    
    document.getElementById('carrusel-tarjetas').classList.remove('oculto-detail');
    document.getElementById('detalle-ramo').classList.add('oculto-detail');
}

// FUNCIÓN AUXILIAR CLAVE PARA EVITAR LA PROPAGACIÓN DEL CLIC (Resuelve el problema del doble despliegue)
function handleRamoClick(nombreRamo, clickedLink, e) {
    if (e) {
        e.preventDefault(); 
        e.stopPropagation(); // Detiene el evento para que no sea capturado por el fondo
    }
    
    // Cerramos el menú inmediatamente
    document.getElementById("sidebar").style.width = "0"; 

    // Llamamos a la función principal
    mostrarDetalleRamo(nombreRamo, clickedLink);
}

function mostrarDetalleRamo(nombreRamo, clickedLink) {
    const detalleRamoData = datosRamos[nombreRamo];
    const detalleRamoDiv = document.getElementById('detalle-ramo');
    
    // 1. Ocultar el carrusel de tarjetas y mostrar el panel de detalle
    document.getElementById('carrusel-tarjetas').classList.add('oculto-detail');
    detalleRamoDiv.classList.remove('oculto-detail');

    // 2. Marcar el link activo en la lista izquierda
    document.querySelectorAll('.ramo-link').forEach(link => {
        link.classList.remove('active');
    });
    if (clickedLink) {
        clickedLink.classList.add('active');
    }

    // 3. Cargar datos
    document.getElementById('detalle-ramo-titulo').textContent = nombreRamo.toUpperCase();
    
    if (detalleRamoData) {
        document.getElementById('asistencia-info').innerHTML = `<strong>${detalleRamoData.asistencia}</strong>`;
        document.getElementById('avisos-info').textContent = detalleRamoData.avisos;
        
        // Cargar notas
        const notasLista = document.getElementById('notas-lista');
        notasLista.innerHTML = detalleRamoData.notas.map(n => 
            `<li>${n.nombre}: <strong style="color: ${n.nota >= 5.0 ? 'green' : 'red'};">${n.nota}</strong></li>`
        ).join('');
        
    } else {
        document.getElementById('asistencia-info').textContent = "Datos no disponibles. El ramo no se encontró en la base de datos simulada.";
        document.getElementById('avisos-info').textContent = "No hay información detallada para este ramo.";
        document.getElementById('notas-lista').innerHTML = "<li>No hay notas registradas.</li>";
    }
}

function volverACarrusel() {
    document.getElementById('detalle-ramo').classList.add('oculto-detail');
    document.getElementById('carrusel-tarjetas').classList.remove('oculto-detail');
    document.querySelectorAll('.ramo-link').forEach(link => {
        link.classList.remove('active');
    });
}

function mostrarVista(vistaId) {
    if (!sessionStorage.getItem('usuarioLogueado') && vistaId !== 'login') return;

    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.add('oculto');
    });

    document.getElementById(vistaId).classList.remove('oculto');
    
    if (vistaId === 'horario') {
        volverACarrusel(); 
    }
}

function toggleMenu() {
    if (!sessionStorage.getItem('usuarioLogueado')) return; 
    
    const sidebar = document.getElementById("sidebar");
    
    if (sidebar.style.width === '0px' || sidebar.style.width === '') {
        sidebar.style.width = "250px"; 
    } else {
        sidebar.style.width = "0";
    }
}

// -------------------------------------------------------------------------
// 5. INICIALIZACIÓN
// -------------------------------------------------------------------------

function inicializarApp() {
    const usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
    const widgetIA = document.getElementById('ai-widget-flotante');
    const menuToggle = document.querySelector('.menu-toggle'); 
    
    if (usuarioLogueado) {
        const userData = JSON.parse(usuarioLogueado);
        const usuarioID = userData.id;
        
        if (datosUsuarios[usuarioID]) {
            eventosActuales = datosUsuarios[usuarioID].eventos;
        }

        cargarHorario();
        mostrarVista('horario'); 
        
        widgetIA.classList.remove('ocultar-widget'); 
        menuToggle.classList.remove('ocultar-widget'); 

    } else {
        // Pantalla de Login
        mostrarVista('login');
        widgetIA.classList.add('ocultar-widget'); 
        menuToggle.classList.add('ocultar-widget'); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', iniciarSesion);
    // 🛑 ARREGLO FINAL: Usamos el onclick del HTML para abrir el menú 
    // y evitamos el addEventListener conflictivo aquí.
    inicializarApp(); 
});