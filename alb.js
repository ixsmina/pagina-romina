// alb.js

// Menú hamburguesa
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

// Mostrar u ocultar la lista de canciones con animación
function toggleAlbum(id) {
    const list = document.getElementById(id);
    if (list) {
        const button = list.previousElementSibling; // El botón está justo antes de la lista ul
        const isNowShown = list.classList.toggle('show');

        if (isNowShown) {
            if (button && button.classList.contains('album-btn')) {
                if (!button.dataset.originalTextContent) { // Usar un nombre de dataset diferente
                    const iconNode = button.querySelector('i');
                    let textContent = '';
                    button.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            textContent += node.textContent.trim();
                        }
                    });
                    button.dataset.originalTextContent = textContent; // Guardar solo el texto
                    if (iconNode) {
                        button.dataset.originalIconClass = iconNode.className;
                    }
                }
                const iconClass = button.dataset.originalIconClass ? button.dataset.originalIconClass.replace('fa-music', 'fa-chevron-up').replace('fa-chevron-down', 'fa-chevron-up') : 'fas fa-chevron-up';
                button.innerHTML = `<i class="${iconClass}"></i> Ocultar canciones`;
            }

            document.querySelectorAll('.album-list.show').forEach(open_list => {
                if (open_list !== list) {
                    open_list.classList.remove('show');
                    const otherButton = open_list.previousElementSibling;
                    if (otherButton && otherButton.classList.contains('album-btn') && otherButton.dataset.originalTextContent) {
                        const originalIcon = otherButton.dataset.originalIconClass || 'fas fa-music'; // Fallback
                        otherButton.innerHTML = `<i class="${originalIcon}"></i> ${otherButton.dataset.originalTextContent}`;
                    }
                }
            });
        } else {
            if (button && button.classList.contains('album-btn') && button.dataset.originalTextContent) {
                const originalIcon = button.dataset.originalIconClass ? button.dataset.originalIconClass.replace('fa-chevron-up', 'fa-music') : 'fas fa-music';
                button.innerHTML = `<i class="${originalIcon}"></i> ${button.dataset.originalTextContent}`;
            }
        }
    } else {
        console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
    }
}


// Funcionalidad del Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const body = document.body; // Definir body aquí para que sea accesible globalmente en este script

function openLightbox(src, alt) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Imagen ampliada";
        lightbox.classList.remove('hidden');
        void lightbox.offsetWidth; // Forzar reflow para la transición de opacidad
        lightbox.classList.add('show');
        if (body) body.style.overflow = 'hidden'; // Evitar scroll del fondo
    } else {
        console.error("Error: Elementos del lightbox no encontrados.");
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
        lightbox.addEventListener('transitionend', function handleTransition() {
            if (!lightbox.classList.contains('show')) { // Solo si sigue oculto
                lightbox.classList.add('hidden');
            }
            lightbox.removeEventListener('transitionend', handleTransition); // Limpiar listener
        }, { once: true }); // El listener se ejecuta una sola vez

        if (body) body.style.overflow = ''; // Restaurar scroll del fondo
    }
}

// Cerrar lightbox al presionar la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
        closeLightbox();
    }
});

// Cerrar lightbox al hacer clic fuera de la imagen (en el contenedor del lightbox)
if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) { // Si el clic fue directamente sobre el contenedor (el fondo oscuro)
            closeLightbox();
        }
    });
}
