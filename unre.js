// Menú móvil
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("show");
});

// Función para mostrar/ocultar lista de canciones
function toggleAlbum(id) {
    const list = document.getElementById(id);
    if (list) {
        list.classList.toggle("show"); // Usamos la clase 'show' en lugar de 'hidden'
    }
}

// Lightbox
function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('show');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}

// Observador de Intersección para cargar álbumes al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const albums = document.querySelectorAll('.album');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar una vez que el álbum es visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // El álbum se mostrará cuando el 20% de él esté visible
    });

    albums.forEach(album => {
        observer.observe(album);
    });
});
