// ==========================================
// CONFIGURAZIONE LINK PLAYLIST YOUTUBE
// ==========================================
const YOUTUBE_PLAYLIST_LINK = "https://youtube.com/playlist?list=PLNEFaYHSKCEQ&si=O9c01EQ-hT6blL5j";

document.addEventListener('DOMContentLoaded', () => {
    const playlistBtn = document.getElementById('playlistBtn');
    if (playlistBtn) {
        playlistBtn.href = YOUTUBE_PLAYLIST_LINK;
    }

    // Falling Rose Petals Generation
    const petalsContainer = document.getElementById('petalsContainer');

    function createPetal() {
        if (!petalsContainer) return;
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 12 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.4}px`;
        petal.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 3;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    if (petalsContainer) {
        // Genera petali iniziali
        for (let i = 0; i < 25; i++) {
            createPetal();
        }
        setInterval(createPetal, 300);
    }

    // Surprise Button Action (Esplosione di petali di rose)
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            for (let i = 0; i < 35; i++) {
                setTimeout(createPetal, i * 40);
            }

            const header = document.querySelector('.dedication-header');
            if (header) {
                header.style.transform = 'scale(1.03)';
                header.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    header.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
});
