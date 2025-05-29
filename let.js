document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del modal de Letras ---
    const songCards = document.querySelectorAll('.song-card');
    const lyricsModal = document.getElementById('lyrics-display-modal');
    const closeLyricsModalBtn = document.querySelector('.close-lyrics-modal');
    const currentSongBackground = document.getElementById('current-song-background');
    const lyricsVideo = document.getElementById('lyrics-video');
    const lyricsAudio = document.getElementById('lyrics-audio');
    const typewriterPng = document.getElementById('typewriter-png');

    // Datos de las canciones (¡VERIFICA LAS RUTAS Y LOS NOMBRES DE ARCHIVO!)
    const songsData = {
        'black-beauty': {
            audioSrc: 'audios/black.mp3',
            videoSrc: 'videos/biu.mp4', // ¡Tu video de letra de IG/CapCut!
            backgroundImg: 'images/bla.jpg'
        },
        'freak': {
            audioSrc: 'audios/freak.mp3',
            videoSrc: 'videos/fris.m4p', // ¡Tu video de letra de IG/CapCut! (Revisar si .m4p funciona bien)
            backgroundImg: 'images/fre.jpg'
        }
    };

    // Escuchar clics en las tarjetas de canción (o el botón de play dentro de ellas)
    songCards.forEach(card => {
        card.addEventListener('click', function() {
            const songId = this.getAttribute('data-song-id');
            const song = songsData[songId];

            if (song) {
                // Cargar el fondo dinámicamente
                currentSongBackground.style.backgroundImage = `url('${song.backgroundImg}')`;

                // Cargar el audio
                lyricsAudio.src = song.audioSrc;

                // Cargar el video de la letra
                lyricsVideo.src = song.videoSrc;

                // Mostrar la máquina de escribir PNG
                typewriterPng.style.display = 'block'; 

                // Mostrar el modal
                lyricsModal.classList.add('show');

                // Pequeño retraso antes de reproducir para asegurar que todo esté listo
                // El .catch() es importante para manejar errores de reproducción automática (Ej. en Chrome)
                setTimeout(() => {
                    lyricsAudio.play().catch(e => console.error("Error al reproducir audio:", e));
                    lyricsVideo.play().catch(e => console.error("Error al reproducir video:", e));
                }, 500); 
            }
        });
    });

    // Escuchar clic en el botón de cerrar modal
    closeLyricsModalBtn.addEventListener('click', function() {
        // Pausar y resetear audio y video
        lyricsAudio.pause();
        lyricsAudio.currentTime = 0; // Reinicia el audio
        lyricsVideo.pause();
        lyricsVideo.currentTime = 0; // Reinicia el video

        // Ocultar el modal
        lyricsModal.classList.remove('show');
    });

    // Opcional: Pausar audio y video si el modal se cierra con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lyricsModal.classList.contains('show')) {
            closeLyricsModalBtn.click(); // Simula un clic en el botón de cerrar
        }
    });
    // --- FIN Lógica del modal de Letras ---
});
