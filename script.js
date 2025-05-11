<script>
  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Mostrar detalles del álbum
  function toggleAlbum(id) {
    const section = document.getElementById(id);
    section.classList.toggle('hidden');
  }
</script>
