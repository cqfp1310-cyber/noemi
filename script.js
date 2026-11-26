// ==========================================
// CONFIGURAZIONE LINK PLAYLIST YOUTUBE
// ==========================================
const YOUTUBE_PLAYLIST_LINK = "https://youtube.com/playlist?list=PLNEFaYHSKCEQ&si=O9c01EQ-hT6blL5j";

const playlistBtn = document.getElementById('playlistBtn');
if (playlistBtn) {
    playlistBtn.href = YOUTUBE_PLAYLIST_LINK;
}

// Falling Rose Petals Generation
const petalsContainer = document.getElementById('petalsContainer');

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 12 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    petal.style.animationDuration = `${durations}s`; // wait, let's keep ${duration}s
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, (duration + delay) * 1000);
}

// Genera petali iniziali
for (let i = 0; i < 20; i++) {
    createPetal();
}
setInterval(createPetal, 400);

// Surprise Button Action (Esplosione di petali di rose)
const surpriseBtn = document.getElementById('surpriseBtn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        for (let i = 0; i < 30; i++) {
            setTimeout(createPetal, i * 50);
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
