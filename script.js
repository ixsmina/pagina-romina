// Función para mostrar/ocultar las canciones del álbum
function toggleAlbum(id) {
  const element = document.getElementById(id);
  element.classList.toggle('hidden');
}

// Función para abrir/cerrar el menú (☰)
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("show");
});

