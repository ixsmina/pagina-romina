// Mostrar y ocultar canciones por álbum
function toggleAlbum(id) {
  const list = document.getElementById(id);
  if (list) {
    list.classList.toggle("hidden");
  }
}

// Menú móvil
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});
