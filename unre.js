document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
            if (menu.classList.contains('show')) {
                menuToggle.innerHTML = '×'; // Icono de cerrar (X)
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.innerHTML = '☰'; // Icono de hamburguesa
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function toggleAlbum(id) {
        const list = document.getElementById(id);
        if (list) {
            document.querySelectorAll('.album-list.show').forEach(open_list => {
                if (open_list.id !== id) { // No cerrar la que acabamos de cliquear
                    open_list.classList.remove('show');
                }
            });
            list.classList.toggle('show');
        } else {
            console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
        }
    }
    window.toggleAlbum = toggleAlbum;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body;

    function openLightbox(src, alt) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text
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
            lightbox.addEventListener('transitionend', function handleTransition() {
                if (!lightbox.classList.contains('show')) { // Solo si ya está oculto visualmente
                    lightbox.classList.add('hidden');
                }
                lightbox.removeEventListener('transitionend', handleTransition); // Limpiar listener
            }, { once: true }); // El listener se ejecuta una sola vez

            body.style.overflow = ''; // Restaurar scroll del fondo
        }
    }
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
