// Menú hamburguesa
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('active');
});

// Cambio de imagen interactiva
const image = document.getElementById('lana-img');
const button = document.getElementById('change-image');

const images = [
    'images/lana.jpg',
    'images/lana2.jpg',
    'images/lana3.jpg'
];
let current = 0;

button.addEventListener('click', () => {
    current = (current + 1) % images.length;
    image.src = images[current];
});

