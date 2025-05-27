const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

document.getElementById('next').addEventListener('click', () => changeSlide(1));
document.getElementById('prev').addEventListener('click', () => changeSlide(-1));

function changeSlide(direction) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu ul');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
