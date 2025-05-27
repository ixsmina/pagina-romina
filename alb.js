// Menú hamburguesa en móvil
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Función para mostrar u ocultar la lista de canciones
function toggleAlbum(id) {
  const list = document.getElementById(id);
  list.classList.toggle('hidden');
}
