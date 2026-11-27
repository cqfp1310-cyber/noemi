// ==========================================
// CONFIGURAZIONE QUIZ E PLAYLIST YOUTUBE
// ==========================================
const YOUTUBE_PLAYLIST_LINK = "https://youtube.com/playlist?list=PLNEFaYHSKCEQ&si=O9c01EQ-hT6blL5j";

const questions = [
    // --- 5 DOMANDE SU SHREK ---
    {
        q: "1. Qual è il colore della pelle di Shrek?",
        options: ["Blu", "Verde", "Rosso", "Giallo"],
        correct: 1
    },
    {
        q: "2. Come si chiama il fedele (e chiacchierone) compagno di avventure di Shrek?",
        options: ["Il Gatto con gli Stivali", "Ciuchino", "Lo Specchio Magico", "Zenzy"],
        correct: 1
    },
    {
        q: "3. Chi è la principessa che Shrek salva nella torre sorvegliata dal drago?",
        options: ["Cenerentola", "Biancaneve", "Fiona", "Aurora"],
        correct: 2
    },
    {
        q: "4. Qual è il nome del regno in cui regna Lord Farquaad?",
        options: ["Molto Molto Lontano", "Duloc", "Camelot", "Narnia"],
        correct: 1
    },
    {
        q: "5. Chi sposa Ciuchino alla fine dei film?",
        options: ["La Dragona", "La Fata Madrina", "Una gatta", "Un'altra ciuchina"],
        correct: 0
    },
    // --- 3 DOMANDE SU DI ME + TRANELLO BELLEZZA ---
    {
        q: "6. Qual è il mio piatto preferito in assoluto?",
        options: ["Pizza", "Sushi", "Carbonara", "Quello che cucini tu ❤️"],
        correct: 3
    },
    {
        q: "7. Qual è la cosa che mi fa più sorridere al mondo?",
        options: ["Un meme divertente", "Quando vinco ai videogiochi", "Vedere te", "Dormire tutto il giorno"],
        correct: 2
    },
    {
        q: "8. [TRANELLO] Chi è in assoluto il ragazzo più bello, affascinante e irresistibile dell'universo?",
        options: ["Brad Pitt", "Ryan Gosling", "Chi ha creato questa dedica ❤️", "Nessuno dei precedenti"],
        correct: 2
    }
];

let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const smartBanner = document.getElementById('smart-memory-banner');
    const quizIntro = document.getElementById('quizIntro');
    const quizContainer = document.getElementById('quizContainer');
    const unlockedPlaylist = document.getElementById('unlockedPlaylist');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizProgress = document.getElementById('quizProgress');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');

    // Verifica se ha già superato il quiz in precedenza (localStorage)
    const quizPassed = localStorage.getItem('quizPassedNoemi');
    if (quizPassed === 'true') {
        if (smartBanner) smartBanner.style.display = 'block';
        if (quizIntro) quizIntro.style.display = 'none';
    }

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            if (quizIntro) quizIntro.style.display = 'none';
            if (quizContainer) quizContainer.style.display = 'block';
            loadQuestion();
        });
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            // Quiz completato con successo!
            localStorage.setItem('quizPassedNoemi', 'true');
            if (quizContainer) quizContainer.style.display = 'none';
            if (unlockedPlaylist) unlockedPlaylist.style.display = 'block';
            return;
        }

        const currentQ = questions[currentQuestionIndex];
        if (quizProgress) quizProgress.textContent = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;
        if (quizQuestion) quizQuestion.textContent = currentQ.q;
        if (quizFeedback) quizFeedback.textContent = '';
        if (quizOptions) quizOptions.innerHTML = '';

        currentQ.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('quiz-btn');
            btn.textContent = opt;
            btn.addEventListener('click', () => checkAnswer(index, currentQ.correct, btn));
            quizOptions.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, correctIndex, selectedBtn) {
        // Disattiva tutti i bottoni temporaneamente
        const allBtns = quizOptions.querySelectorAll('.quiz-btn');
        allBtns.forEach(b => b.disabled = true);

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add('correct');
            if (quizFeedback) quizFeedback.textContent = "Esatto! ❤️ Bravissima!";
            setTimeout(() => {
                currentQuestionIndex++;
                loadQuestion();
            }, 1200);
        } else {
            selectedBtn.classList.add('wrong');
            // Evidenzia anche quella corretta
            allBtns[correctIndex].classList.add('correct');
            if (quizFeedback) quizFeedback.textContent = "Ops! Non è questa la risposta giusta... 😉 Riprova!";
            setTimeout(() => {
                // Ricarica la stessa domanda per riprovare
                loadQuestion();
            }, 1800);
        }
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
