// ==========================================
// CONFIGURAZIONE QUIZ E PLAYLIST YOUTUBE
// ==========================================
const YOUTUBE_PLAYLIST_LINK = "https://youtube.com/playlist?list=PLNEFaYHSKCEQ&si=O9c01EQ-hT6blL5j";

const questions = [
    // --- 5 DOMANDE DIFFICILI SU SHREK ---
    {
        q: "1. Come si chiama la famosa taverna malfamata frequentata dai cattivi delle fiabe in Shrek 2?",
        options: ["Il Calderone Stregato", "La Mela Avelenata (Poison Apple)", "Il Boccale d'Oro", "La Locanda dell'Orco Scontroso"],
        correct: 1
    },
    {
        q: "2. Qual è il nome esatto della pozione magica rubata da Shrek nella fabbrica della Fata Madrina?",
        options: ["Pozione d'Amore Eterno", "Pozione 'E vissero per sempre felici e contenti'", "Pozione di Bellezza Suprema", "Elisir della Metamorfosi"],
        correct: 1
    },
    {
        q: "3. Nel regno di Molto Molto Lontano, qual è il nome della famosa via dello shopping che fa il verso a Rodeo Drive?",
        options: ["Romeo Drive", "Hollywood Boulevard", "Fairy Lane", "Princess Avenue"],
        correct: 0
    },
    {
        q: "4. Chi è l'improbabile barista della taverna 'La Mela Avelenata' nel secondo film?",
        options: ["Il Lupo Cattivo", "Doris (la sorellastra brutta)", "Geppetto", "Il Nano Barbuto"],
        correct: 1
    },
    {
        q: "5. Qual è il nome del celebre biscotto di pan di zenzero creato da Mastro Geppetto?",
        options: ["Biscottino", "Zenzy (Gingy)", "Pan di Zucchero", "Ciambellino"],
        correct: 1
    },
    // --- 3 DOMANDE PERSONALI + TRANELLO BELLEZZA AVANZATO ---
    {
        q: "6. Qual è la mia abitudine più buffa o il dettaglio che amo di più quando siamo insieme?",
        options: ["Quando ti rubo le patatine", "Il modo in cui ridi quando faccio una battuta pessima", "Quando ti addormenti sui miei pensieri", "Tutte le precedenti (ovviamente!)"],
        correct: 3
    },
    {
        q: "7. Qual è il ricordo o il momento esatto tra noi due che custodisco più gelosamente nel cuore?",
        options: ["La prima volta che ci siamo guardati davvero", "Ogni singolo istante in cui ci siamo scelti", "Le nostre risate senza motivo", "Tutti i momenti passati insieme, nessuno escluso ❤️"],
        correct: 3
    },
    {
        q: "8. [TRANELLO DI BELLEZZA] Analizzando rigorosamente le leggi dell'ottica, della fisica quantistica e della perfezione estetica universale, chi detiene ufficialmente il primato indiscusso di essere il ragazzo più affascinante dell'universo?",
        options: ["Un tramonto estivo sul mare", "Chi ha creato questa pagina dedicandotela ❤️", "Una statua greca antica", "Ryan Gosling dopo il caffè"],
        correct: 1
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
