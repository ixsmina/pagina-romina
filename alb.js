// Menú hamburguesa en móvilAdd commentMore actions
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa en móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar con CSS
        
        // Cambiar el icono del botón y el atributo aria-expanded
        if (menu.classList.contains('show')) {
            menuToggle.innerHTML = '&times;'; // Icono de cerrar (X)
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menuToggle.innerHTML = '☰'; // Icono de hamburguesa
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
            // Cambiar el icono del botón y el atributo aria-expanded
            if (menu.classList.contains('show')) {
                menuToggle.innerHTML = '×'; // Icono de cerrar (X)
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.innerHTML = '☰'; // Icono de hamburguesa
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

// Mostrar u ocultar la lista de canciones con animación
function toggleAlbum(id) {
    const list = document.getElementById(id);
    if (list) {
        // Alternar la clase 'show' para controlar la animación con CSS (max-height)
        list.classList.toggle('show');
        
        // Opcional: Cerrar otras listas si solo quieres una abierta a la vez
        if (list.classList.contains('show')) {
    // Mostrar u ocultar la lista de canciones con animación
    function toggleAlbum(id) {
        const list = document.getElementById(id);
        if (list) {
            // Cierra todas las demás listas antes de abrir la actual
            document.querySelectorAll('.album-list.show').forEach(open_list => {
                if (open_list !== list) { // No cerrar la que acabamos de abrir
                if (open_list.id !== id) { // No cerrar la que acabamos de cliquear
                    open_list.classList.remove('show');
                }
            });
            // Alternar la clase 'show' para controlar la animación con CSS (max-height y opacity)
            list.classList.toggle('show');
        } else {
            console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
        }

    } else {
        console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
    }
}

// Funcionalidad del Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const body = document.body;
    // Exportar la función toggleAlbum para que sea accesible desde el HTML
    window.toggleAlbum = toggleAlbum;

function openLightbox(src, alt) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text
        lightbox.classList.remove('hidden'); // Asegurar que no tenga display:none
        
        // Forzar un reflow para que la transición de opacidad funcione desde display:none
        // A veces es necesario si se pasa de display: none a opacity: 1
        void lightbox.offsetWidth; 
    // Funcionalidad del Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body;

        lightbox.classList.add('show');
        body.style.overflow = 'hidden'; // Evitar scroll del fondo
    } else {
        console.error("Error: Elementos del lightbox no encontrados.");
    function openLightbox(src, alt) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text
            
            // Remueve hidden primero para que la transición de opacidad sea visible
            lightbox.classList.remove('hidden'); 
            // Forzar un reflow para asegurar que la transición de opacidad se aplique
            void lightbox.offsetWidth; 
            
            lightbox.classList.add('show');
            body.style.overflow = 'hidden'; // Evitar scroll del fondo
        } else {
            console.error("Error: Elementos del lightbox no encontrados.");
        }
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
        // Esperar a que termine la transición de opacidad para volver a poner 'hidden'
        // Esto evita que el elemento bloquee clics aunque sea invisible.
        lightbox.addEventListener('transitionend', function handleTransition() {
            if (!lightbox.classList.contains('show')) { // Solo si sigue oculto
                lightbox.classList.add('hidden');
            }
            lightbox.removeEventListener('transitionend', handleTransition); // Limpiar listener
        }, { once: true }); // El listener se ejecuta una sola vez
        
        body.style.overflow = ''; // Restaurar scroll del fondo
    }
}
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('show');
            // Añadir 'hidden' después de que la transición de opacidad termine
            lightbox.addEventListener('transitionend', function handleTransition() {
                if (!lightbox.classList.contains('show')) { // Solo si ya está oculto visualmente
                    lightbox.classList.add('hidden');
                }
                lightbox.removeEventListener('transitionend', handleTransition); // Limpiar listener
            }, { once: true }); // El listener se ejecuta una sola vez

// Cerrar lightbox al presionar la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
        closeLightbox();
            body.style.overflow = ''; // Restaurar scroll del fondo
        }
    }
});

// Cerrar lightbox al hacer clic fuera de la imagen (en el contenedor del lightbox)
if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        // Si el clic fue directamente sobre el contenedor (el fondo oscuro)
        if (event.target === lightbox) {
    // Exportar las funciones del lightbox para que sean accesibles desde el HTML
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    // Cerrar lightbox al presionar la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}

// Asegúrate de que los IDs de las listas de canciones en HTML (ej: id="born")
// coincidan con los que se pasan a toggleAlbum() en los botones onclick.
// (Ya hemos corregido el de "Did You Know..." a "didyouknow" en el HTML).
    // Cerrar lightbox al hacer clic fuera de la imagen (en el contenedor del lightbox)
    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            // Si el clic fue directamente sobre el contenedor (el fondo oscuro)
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
