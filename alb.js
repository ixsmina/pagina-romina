document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // Funcionalidad del Menú de Hamburguesa
    // ------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar con CSS
            menuToggle.setAttribute('aria-expanded', menu.classList.contains('show')); // Actualiza el atributo ARIA

            // Cambiar el icono del botón
            if (menu.classList.contains('show')) {
                menuToggle.innerHTML = '✕'; // Icono de cerrar (X)
            } else {
                menuToggle.innerHTML = '☰'; // Icono de hamburguesa
            }
        });

        // Opcional: Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target) && menu.classList.contains('show')) {
                menu.classList.remove('show');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ------------------------------------------
    // Funcionalidad de los botones "Ver canciones"
    // ------------------------------------------
    const albumButtons = document.querySelectorAll('.album-btn');

    albumButtons.forEach(button => {
        button.addEventListener('click', () => {
            const albumId = button.dataset.albumId; // Obtiene el ID del álbum del atributo data-album-id
            const albumList = document.getElementById(albumId);

            if (albumList) {
                // Cierra todas las demás listas antes de abrir la actual
                document.querySelectorAll('.album-list.show').forEach(open_list => {
                    if (open_list.id !== albumId) { // No cerrar la lista que acabamos de cliquear
                        open_list.classList.remove('show');
                        // También actualiza el texto del botón correspondiente
                        const correspondingButton = document.querySelector(`.album-btn[data-album-id="${open_list.id}"]`);
                        if (correspondingButton) {
                            correspondingButton.innerHTML = '<i class="fas fa-music"></i> Ver canciones';
                        }
                    }
                });

                // Alternar la clase 'show' en la lista actual
                albumList.classList.toggle('show');

                // Cambia el texto del botón actual
                if (albumList.classList.contains('show')) {
                    button.innerHTML = '<i class="fas fa-minus"></i> Ocultar canciones';
                } else {
                    button.innerHTML = '<i class="fas fa-music"></i> Ver canciones';
                }
            } else {
                console.error(`Error: Elemento con ID '${albumId}' no fue encontrado para la lista de álbumes.`);
            }
        });
    });

    // ------------------------------------------
    // Funcionalidad del Lightbox
    // ------------------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body; // Para controlar el scroll del body

    // Función para abrir el lightbox
    window.openLightbox = (src, alt) => {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text

            // Remueve 'hidden' primero para que la transición de opacidad sea visible
            lightbox.classList.remove('hidden');
            // Forzar un reflow para asegurar que la transición de opacidad se aplique
            void lightbox.offsetWidth;

            lightbox.classList.add('show');
            body.style.overflow = 'hidden'; // Evitar scroll del fondo
        } else {
            console.error("Error: Elementos del lightbox no encontrados.");
        }
    };

    // Función para cerrar el lightbox
    window.closeLightbox = () => {
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
    };

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
