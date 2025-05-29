document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del menú hamburguesa (asegúrate de que sea 'active' o 'show' según tu CSS) ---
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.querySelector('.menu ul');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active'); // Usa 'active' si es la clase que muestra/oculta el menú
        });
    }
    // --- Fin Lógica del menú hamburguesa ---


    // --- Lógica específica de la página de letras ---
    const songCards = document.querySelectorAll('.song-card');
    const lyricsModal = document.getElementById('lyrics-modal');
    // Asegúrate de que este selector apunte al botón de cerrar dentro del modal de letras
    const closeButton = document.querySelector('.lyrics-modal .close-button'); 
    const songDetailView = document.getElementById('song-detail-view');
    const lyricsPlayerView = document.getElementById('lyrics-player-view');
    const modalSongTitle = document.getElementById('modal-song-title');
    const modalAlbumYear = document.getElementById('modal-album-year');
    const modalDescription = document.getElementById('modal-description');
    const playLyricsButton = document.getElementById('play-lyrics-button');
    const lyricsVideo = document.getElementById('lyrics-video');
    const lyricsAudio = document.getElementById('lyrics-audio');
    const currentSongBackground = document.getElementById('current-song-background');
    const typewriterPng = document.getElementById('typewriter-png');

    // Datos de las canciones (puedes añadir más aquí)
    const songsData = {
        'black-beauty': {
            title: 'Black Beauty',
            albumYear: 'Álbum: Ultraviolence (2014)',
            description: 'Una balada melancólica que explora la belleza de la tristeza y la lucha por entender a un amante. Una joya escondida para muchos fans. Destaca por su instrumentación sombría y la voz etérea de Lana.',
            videoSrc: 'videos/black-beauty-lyrics.mp4', // ¡Necesitas crear o encontrar este video!
            audioSrc: 'audio/black-beauty.mp3', // ¡Necesitas el archivo de audio!
            backgroundImage: 'images/bla.jpg' // Imagen de fondo para el reproductor
        },
        'freak': {
            title: 'Freak',
            albumYear: 'Álbum: Honeymoon (2015)',
            description: 'Un tema sensual y oscuro que captura la esencia de la vida bohemia en California, invitando a vivir sin ataduras y a abrazar la locura del amor. Ideal para un ambiente relajado y misterioso.',
            videoSrc: 'videos/freak-lyrics.mp4',
            audioSrc: 'audio/freak.mp3',
            backgroundImage: 'images/fre.jpg'
        }
        // Agrega más canciones aquí siguiendo el mismo formato
        // Ejemplo:
        // 'video-games': {
        //     title: 'Video Games',
        //     albumYear: 'Álbum: Born to Die (2012)',
        //     description: 'La canción icónica que lanzó a Lana Del Rey a la fama, conocida por su atmósfera melancólica y letras sobre un amor devoto y nostálgico.',
        //     videoSrc: 'videos/video-games-lyrics.mp4',
        //     audioSrc: 'audio/video-games.mp3',
        //     backgroundImage: 'images/video-games-bg.jpg'
        // }
    };

    // Abre el modal y muestra los detalles de la canción
    songCards.forEach(card => {
        const viewDetailsButton = card.querySelector('.view-details-button');
        if (viewDetailsButton) {
            viewDetailsButton.addEventListener('click', () => {
                const songId = card.dataset.songId;
                const song = songsData[songId];

                if (song) {
                    modalSongTitle.textContent = song.title;
                    modalAlbumYear.textContent = song.albumYear;
                    modalDescription.textContent = song.description;

                    // Restablece la vista del modal
                    lyricsPlayerView.classList.add('hidden'); // Oculta el reproductor
                    songDetailView.classList.remove('hidden'); // Muestra los detalles
                    lyricsVideo.pause();
                    lyricsAudio.pause();
                    lyricsVideo.currentTime = 0;
                    lyricsAudio.currentTime = 0;
                    
                    // Muestra el modal
                    lyricsModal.classList.add('show');
                }
            });
        }
    });

    // Cierra el modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            lyricsModal.classList.remove('show');
            // Detiene el video y el audio cuando se cierra el modal
            lyricsVideo.pause();
            lyricsAudio.pause();
            lyricsVideo.currentTime = 0;
            lyricsAudio.currentTime = 0;
        });
    }

    // Cierra el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === lyricsModal) {
            lyricsModal.classList.remove('show');
            lyricsVideo.pause();
            lyricsAudio.pause();
            lyricsVideo.currentTime = 0;
            lyricsAudio.currentTime = 0;
        }
    });

    // Maneja el botón "Escuchar Letra"
    if (playLyricsButton) {
        playLyricsButton.addEventListener('click', () => {
            const currentSongTitle = modalSongTitle.textContent;
            // Encuentra la canción por el título (o por ID si lo pasas al modal)
            const song = Object.values(songsData).find(s => s.title === currentSongTitle);

            if (song) {
                // Configura las fuentes del video y audio
                lyricsVideo.src = song.videoSrc;
                lyricsAudio.src = song.audioSrc;
                currentSongBackground.style.backgroundImage = `url(${song.backgroundImage})`;

                // Oculta la vista de detalles y muestra el reproductor
                songDetailView.classList.add('hidden');
                lyricsPlayerView.classList.remove('hidden');

                // Carga y reproduce el video y audio
                lyricsVideo.load(); 
                lyricsAudio.load();
                lyricsVideo.play().catch(e => console.error("Error al reproducir video:", e));
                lyricsAudio.play().catch(e => console.error("Error al reproducir audio:", e));
            }
        });
    }

    // Sincroniza la duración del audio y video (opcional, si los videos no tienen audio propio)
    if (lyricsVideo) {
        lyricsVideo.addEventListener('ended', () => {
            if (lyricsAudio) {
                lyricsAudio.pause();
                lyricsAudio.currentTime = 0;
            }
        });
    }

    if (lyricsAudio) {
        lyricsAudio.addEventListener('ended', () => {
            if (lyricsVideo) {
                lyricsVideo.pause();
                lyricsVideo.currentTime = 0;
            }
        });
    }
});
