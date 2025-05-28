// Menú hamburguesa en móvil (CÓDIGO AJUSTADO PARA TU HTML)
const menuToggle = document.getElementById('menuToggle'); // Asegúrate que el ID sea 'menuToggle'
const menuList = document.querySelector('.menu ul'); // Selecciona la lista ul

if (menuToggle && menuList) {
    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('show'); // Alterna la clase 'show'

        // Cambiar el icono de la hamburguesa
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (menuList.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Icono de cerrar (X)
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Icono de hamburguesa
            }
        }
    });
}


// Lightbox funcionalidad y Slider
const galleryItems = document.querySelectorAll('.gallery-item'); // Selecciona TODOS los .gallery-item
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prevBtn'); // Referencia a la flecha anterior
const nextBtn = document.getElementById('nextBtn'); // Referencia a la flecha siguiente
const body = document.body; // Para controlar el scroll del body

let currentImageIndex = 0; // Para llevar el registro de la imagen actual
let imagesData = []; // Para almacenar todas las imágenes y sus datos

// 1. Recopilar datos de todas las imágenes de la galería al cargar
galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    const captionElement = item.querySelector('.caption');
    if (img) {
        imagesData.push({
            src: img.src,
            alt: img.alt,
            // Si el captionElement existe, usa su texto, de lo contrario, usa el alt de la imagen como fallback
            caption: captionElement ? captionElement.textContent : img.alt
        });
    }
});

// 2. Función para mostrar una imagen específica en el lightbox
function showImageInLightbox(index) {
    if (imagesData.length === 0) { // Si no hay imágenes, no hagas nada
        console.warn("No se encontraron imágenes en la galería.");
        return;
    }

    // Asegurarse de que el índice esté dentro de los límites
    if (index < 0) {
        currentImageIndex = imagesData.length - 1; // Ir al final si se presiona 'anterior' en la primera
    } else if (index >= imagesData.length) {
        currentImageIndex = 0; // Ir al principio si se presiona 'siguiente' en la última
    } else {
        currentImageIndex = index;
    }

    const imageData = imagesData[currentImageIndex];
    lightboxImg.src = imageData.src;
    lightboxImg.alt = imageData.alt;
    lightboxCaption.textContent = imageData.caption;

    // Mostrar/ocultar flechas (opcional, si quieres que no se "ciclen")
    // prevBtn.style.display = (currentImageIndex === 0) ? 'none' : 'block';
    // nextBtn.style.display = (currentImageIndex === imagesData.length - 1) ? 'none' : 'block';
}

// 3. Abrir lightbox al hacer clic en una imagen de la galería
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex'; // Muestra el lightbox
        body.style.overflow = 'hidden'; // Evita el scroll del fondo
        showImageInLightbox(index); // Carga la imagen clicada
    });
});

// 4. Cerrar lightbox al hacer clic en la "X"
closeLightboxBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Oculta el lightbox
    body.style.overflow = ''; // Restaura el scroll del fondo
});

// 5. Cerrar lightbox si se hace clic fuera de la imagen (en el fondo oscuro)
lightbox.addEventListener('click', (e) => {
    // Si el clic fue directamente en el contenedor del lightbox y no en sus hijos
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        body.style.overflow = '';
    }
});

// 6. Navegación con flechas del carrusel
if (prevBtn && nextBtn) { // Asegúrate de que los botones existan antes de añadir listeners
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic en la flecha cierre el lightbox
        showImageInLightbox(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic en la flecha cierre el lightbox
        showImageInLightbox(currentImageIndex + 1);
    });
} else {
    console.warn("Botones de navegación (prev/next) no encontrados. Asegúrate de que sus IDs sean 'prevBtn' y 'nextBtn' en el HTML.");
}


// 7. Navegación con teclado (flechas izquierda/derecha y Escape)
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') { // Solo si el lightbox está abierto
        if (e.key === 'ArrowLeft') {
            showImageInLightbox(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImageInLightbox(currentImageIndex + 1);
        } else if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            body.style.overflow = '';
        }
    }
});
