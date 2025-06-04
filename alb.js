document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa en móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
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

    // Función para mostrar u ocultar la lista de canciones con animación
    // Se hace global para que pueda ser llamada desde el onClick en el HTML.
    window.toggleAlbum = function(id) {
        const list = document.getElementById(id);
        if (list) {
            // Cierra todas las demás listas antes de abrir la actual
            document.querySelectorAll('.album-list.show').forEach(open_list => {
                if (open_list.id !== id) { // Solo cierra si no es la lista que acabamos de cliquear
                    open_list.classList.remove('show');
                }
            });
            // Alternar la clase 'show' para controlar la animación con CSS (max-height y opacity)
            list.classList.toggle('show');
        } else {
            console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
        }
    };

    // Funcionalidad del Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body;

    // Se hacen globales para que puedan ser llamadas desde el onClick en el HTML.
    window.openLightbox = function(src, alt) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text

            // Remueve hidden primero para que la transición de opacidad sea visible
            lightbox.classList.remove('hidden');
            // Forzar un reflow para asegurar que la transición de opacidad se aplique
            void lightbox.offsetWidth; // Truco para forzar reflow

            lightbox.classList.add('show');
            body.style.overflow = 'hidden'; // Evitar scroll del fondo
        } else {
            console.error("Error: Elementos del lightbox no encontrados.");
        }
    };

    window.closeLightbox = function() {
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
            window.closeLightbox(); // Llama a la función global
        }
    });

    // Cerrar lightbox al hacer clic fuera de la imagen (en el contenedor del lightbox)
    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            // Si el clic fue directamente sobre el contenedor (el fondo oscuro)
            if (event.target === lightbox) {
                window.closeLightbox(); // Llama a la función global
            }
        });
    }

    ---

    // --- FUNCIONALIDAD PARA EL MODAL DE CONTACTO ---
    // Seleccionar todos los botones que abren el modal
    const openContactFormBtns = document.querySelectorAll('.contact-form-trigger-btn');
    const contactFormModal = document.getElementById('contact-form-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');

    // Abrir el modal cuando se hace clic en CUALQUIERA de los botones
    if (openContactFormBtns.length > 0 && contactFormModal) {
        openContactFormBtns.forEach(button => {
            button.addEventListener('click', () => {
                contactFormModal.style.display = 'block';
            });
        });
    }

    // Cerrar el modal cuando se hace clic en la 'x'
    if (closeContactModalBtn && contactFormModal) {
        closeContactModalBtn.addEventListener('click', () => {
            contactFormModal.style.display = 'none';
        });
    }

    // Cerrar el modal haciendo clic fuera de su contenido
    if (contactFormModal) {
        window.addEventListener('click', (event) => {
            if (event.target === contactFormModal) { // Usa === para una comparación estricta
                contactFormModal.style.display = 'none';
            }
        });
    }
}); // Cierre del único DOMContentLoaded
