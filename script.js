// Carrusel
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Verifica si los botones del carrusel existen antes de añadir los event listeners
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

if (nextButton) {
    nextButton.addEventListener('click', () => changeSlide(1));
}
if (prevButton) {
    prevButton.addEventListener('click', () => changeSlide(-1));
}

function changeSlide(direction) {
    // Asegúrate de que haya slides antes de intentar cambiar
    if (slides.length === 0) return;

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

    // Solo ejecuta el IntersectionObserver si hay tarjetas flip
    if (flipCards.length > 0) {
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
            if (inner) { // Asegura que el inner exista
                card.addEventListener('click', function() {
                    inner.classList.toggle('is-flipped');
                });
            }
        });
    }

    // --- FUNCIONALIDAD PARA EL MODAL DE CONTACTO ---
    const openContactFormBtn = document.getElementById('open-contact-form-btn');
    const contactFormModal = document.getElementById('contact-form-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');

    // Abrir el modal cuando se hace clic en el botón
    if (openContactFormBtn && contactFormModal) {
        openContactFormBtn.addEventListener('click', () => {
            contactFormModal.style.display = 'block';
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
});
