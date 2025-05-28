// Menú hamburguesa en móvil (EXISTENTE, LO MANTENEMOS)
const menuToggle = document.getElementById('menuToggle');
const menuList = document.querySelector('.menu ul');

if (menuToggle && menuList) {
    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('show');
        // Opcional: Cambiar el icono del menú hamburguesa
        const icon = menuToggle.querySelector('i');
        if (menuList.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Cambia a una 'X'
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Vuelve a la hamburguesa
        }
    });
}

// Lightbox funcionalidad y Slider
const galleryItems = document.querySelectorAll('.gallery-item'); // Selecciona los .gallery-item completos
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const body = document.body; // Para controlar el scroll del body

let currentImageIndex = 0;
let imagesData = []; // Guardará las URLs y captions de todas las imágenes

// Prepara los datos de las imágenes al cargar la página
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption');
    if (img && caption) {
        imagesData.push({
            src: img.src,
            alt: img.alt,
            caption: caption.textContent
        });
    }
});

// Función para mostrar una imagen en el lightbox
function showImageInLightbox(index) {
    if (index >= 0 && index < imagesData.length) {
        currentImageIndex = index;
        lightboxImg.src = imagesData[currentImageIndex].src;
        lightboxImg.alt = imagesData[currentImageIndex].alt;
        lightboxCaption.textContent = imagesData[currentImageIndex].caption;

        // Ocultar/Mostrar flechas si estamos en el principio/final
        prevBtn.style.display = (currentImageIndex === 0) ? 'none' : 'block';
        nextBtn.style.display = (currentImageIndex === imagesData.length - 1) ? 'none' : 'block';
    }
}

// Abrir lightbox al hacer clic en una imagen de la galería
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        body.style.overflow = 'hidden'; // Evita el scroll del fondo
        showImageInLightbox(index); // Muestra la imagen clicada
    });
});

// Cerrar al hacer clic en la "X"
closeLightboxBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    body.style.overflow = ''; // Restaura el scroll del fondo
});

// Cerrar si se hace clic fuera de la imagen (en el fondo oscuro)
lightbox.addEventListener('click', (e) => {
    // Si el clic fue en el fondo oscuro del lightbox, no en la imagen o flechas
    if (e.target === lightbox || e.target === closeLightboxBtn) {
        lightbox.style.display = 'none';
        body.style.overflow = '';
    }
});

// Navegación con flechas
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en la flecha cierre el lightbox
    showImageInLightbox(currentImageIndex - 1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en la flecha cierre el lightbox
    showImageInLightbox(currentImageIndex + 1);
});

// Navegación con teclado (flechas izquierda/derecha)
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') { // Solo si el lightbox está abierto
        if (e.key === 'ArrowLeft') {
            showImageInLightbox(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImageInLightbox(currentImageIndex + 1);
        } else if (e.key === 'Escape') { // Cerrar con Escape
            lightbox.style.display = 'none';
            body.style.overflow = '';
        }
    }
});

// Manejo del menú hamburguesa (Tu código existente lo hace)
// NOTA: Tu HTML tiene un div.menu-toggle dentro del nav.menu.
// Y tu JS lo busca por id="menuToggle" que está dentro de .menu.
// Tu CSS tiene .menu-toggle display: none; y .menu ul.hidden/show.
// Asegúrate de que este JS se sincronice bien con tu CSS de menú.
// El código que te di arriba para el menú hamburguesa es genérico.
// Si ya tienes uno funcionando en otra página, úsalo.
