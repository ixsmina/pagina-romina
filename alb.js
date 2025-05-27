document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu ul");
@@ -3,10 +3,10 @@ const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Slider solo si existe en la página
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 8000);

    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  }
toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
  menu.classList.toggle('hidden');
});

// Función para mostrar u ocultar la lista de canciones
// Mostrar u ocultar la lista de canciones
function toggleAlbum(id) {
  const list = document.getElementById(id);
  list.classList.toggle('hidden');
