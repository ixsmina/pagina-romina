document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa en móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

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
            // Cierra todas las demás listas antes de abrir la actual
            document.querySelectorAll('.album-list.show').forEach(open_list => {
                if (open_list.id !== id) { // No cerrar la que acabamos de cliquear
                    open_list.classList.remove('show');
                }
            });
            // Alternar la clase 'show' para controlar la animación con CSS (max-height y opacity)
            list.classList.toggle('show');
        } else {
            console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
        }
    }

    // Exportar la función toggleAlbum para que sea accesible desde el HTML
    window.toggleAlbum = toggleAlbum;

    // Funcionalidad del Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body;

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

            body.style.overflow = ''; // Restaurar scroll del fondo
        }
    }

    // Exportar las funciones del lightbox para que sean accesibles desde el HTML
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    // Cerrar lightbox al presionar la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

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
