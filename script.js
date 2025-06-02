// Carrusel
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

document.getElementById('next').addEventListener('click', () => changeSlide(1));
document.getElementById('prev').addEventListener('click', () => changeSlide(-1));

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Menú móvil (toggle en el header de index.html)
const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu ul');

// Asegúrate de que este evento se adhiera al botón correcto en el header
if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

// Lógica para las tarjetas informativas (aparición al scroll y efecto flip)
document.addEventListener('DOMContentLoaded', () => {
    const flipCards = document.querySelectorAll('.flip-card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Deja de observar una vez que la tarjeta es visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // La tarjeta se mostrará cuando el 20% de ella esté visible
    });

    flipCards.forEach(card => {
        observer.observe(card); // Observa para la animación de aparición

        // Añade el event listener para el click y el efecto flip
        const inner = card.querySelector('.flip-card-inner');
        card.addEventListener('click', function() {
            inner.classList.toggle('is-flipped');
        });
    });
});

// Nota: La función toggleAlbum que tenías previamente en este archivo
// ha sido eliminada, ya que su funcionalidad es exclusiva de unre.js.
// Asegúrate de que tu unre.js contenga la lógica de toggleAlbum si la necesitas allí.
