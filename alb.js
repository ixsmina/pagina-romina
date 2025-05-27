@@ -3,10 +3,10 @@ const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
  menu.classList.toggle('hidden');
});

// Función para mostrar u ocultar la lista de canciones
// Mostrar u ocultar la lista de canciones
function toggleAlbum(id) {
  const list = document.getElementById(id);
  list.classList.toggle('hidden');
