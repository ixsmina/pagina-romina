document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del menú hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu ul');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('show');
        });
    }
    // --- Fin Lógica del menú hamburguesa ---

    // --- Lógica de la galería lightbox (si la tienes) ---
    // (Tu código existente para el lightbox iría aquí)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');

    let currentIndex = 0; // Para la navegación del lightbox

    // Abre el lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    function showImage(index) {
        const img = galleryItems[index].querySelector('img');
        const caption = galleryItems[index].querySelector('.caption');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : img.alt;
        lightbox.style.display = 'flex';
    }

    // Cierra el lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Navegación con flechas
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
    // --- Fin Lógica de la galería lightbox ---
});

document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del menú hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu ul');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('show');
        });
    }
    // --- Fin Lógica del menú hamburguesa ---

    // --- Lógica de la galería lightbox (si la tienes) ---
    // (Tu código existente para el lightbox iría aquí)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');

    let currentIndex = 0; // Para la navegación del lightbox

    // Abre el lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    function showImage(index) {
        const img = galleryItems[index].querySelector('img');
        const caption = galleryItems[index].querySelector('.caption');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : img.alt;
        lightbox.style.display = 'flex';
    }

    // Cierra el lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Navegación con flechas
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
    // --- Fin Lógica de la galería lightbox ---
});
