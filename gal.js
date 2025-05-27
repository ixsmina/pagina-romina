// Lightbox funcionalidad
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.lightbox .close');

// Abrir lightbox al hacer clic en una imagen
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.nextElementSibling?.textContent || item.alt;
  });
});

// Cerrar al hacer clic en la "X"
closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// También cerrar si se hace clic fuera de la imagen (en el fondo oscuro)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
