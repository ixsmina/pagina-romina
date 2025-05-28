// Menú hamburguesa en móvil
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar con CSS

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
        // La clase 'show' controla la propiedad max-height en CSS para la animación
        list.classList.toggle('show');

        // Opcional: Cerrar otras listas si solo quieres una abierta a la vez
        if (list.classList.contains('show')) {
            document.querySelectorAll('.album-list.show').forEach(open_list => {
                // Asegúrate de que no estás cerrando la lista que acabas de abrir
                if (open_list.id !== id) {
                    open_list.classList.remove('show');
                }
            });
        }
    } else {
        console.error("Error: Elemento con ID '" + id + "' no fue encontrado para toggleAlbum.");
    }
}

// Funcionalidad del Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const body = document.body;

function openLightbox(src, alt) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Imagen ampliada"; // Fallback para alt text

        // Asegúrate de que el lightbox no tenga display:none si se le aplica 'hidden'
        // Lo mostramos primero y luego añadimos la clase 'show' para la transición
        lightbox.classList.remove('hidden'); // Esto es crucial si 'hidden' lo pone en display:none
        void lightbox.offsetWidth; // Forzar un reflow para que la transición de opacidad funcione
        lightbox.classList.add('show');
        body.style.overflow = 'hidden'; // Evitar scroll del fondo
    } else {
        console.error("Error: Elementos del lightbox no encontrados.");
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
        // Esperar a que termine la transición de opacidad para volver a poner 'hidden'
        // Esto evita que el elemento bloquee clics aunque sea invisible.
        lightbox.addEventListener('transitionend', function handleTransition() {
            if (!lightbox.classList.contains('show')) { // Solo si ya no tiene la clase 'show'
                lightbox.classList.add('hidden'); // Ahora sí podemos ocultarlo con display:none
            }
            lightbox.removeEventListener('transitionend', handleTransition); // Limpiar listener
        }, { once: true }); // El listener se ejecuta una sola vez

        body.style.overflow = ''; // Restaurar scroll del fondo
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
        // Si el clic fue directamente sobre el contenedor (el fondo oscuro)
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}
