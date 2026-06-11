// ---------------- MENU MOBILE ----------------
const mobileMenuButton = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// ---------------- CONTADORES ----------------
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100; // Ajusta velocidade

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// ---------------- TABS ----------------
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// ---------------- CALCULADORA ----------------
function calcularImpacto() {
    let impacto = 0;
    const checkAgua = document.getElementById('check-agua');
    const checkRecicla = document.getElementById('check-recicla');
    const checkLocal = document.getElementById('check-local');

    if (checkAgua.checked) impacto += 50; // kg/L de comida
    if (checkRecicla.checked) impacto += 30; // kg de materiais reciclados
    if (checkLocal.checked) impacto += 20; // kg de recursos transportados

    document.getElementById('resultado-recurso').innerText = impacto;
}

// ---------------- QUIZ ----------------
const quizQuestions = [
    {
        question: "Qual prática ajuda a conservar água na agricultura?",
        answers: [
            { text: "Irrigação por gotejamento", correct: true },
            { text: "Enchentes artificiais", correct: false },
            { text: "Plantar fora de época", correct: false },
            { text: "Usar produtos químicos excessivos", correct: false }
        ]
    },
    {
        question: "O que é ILPF?",
        answers: [
            { text: "Integração Lavoura-Pecuária-Floresta", correct: true },
            { text: "Instituto de Lavradores e Produtores Famosos", correct: false },
            { text: "Inovação Local Para Frutas", correct: false },
            { text: "Indústria de Laticínios e Produtos Frescos", correct: false }
        ]
    },
    {
        question: "Como os defensivos biológicos ajudam a lavoura?",
        answers: [
            { text: "Controlando pragas naturalmente", correct: true },
            { text: "Aumentando uso de pesticidas", correct: false },
            { text: "Destruindo o solo", correct: false },
            { text: "Reduzindo colheita", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score-text');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) score++;

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreText.innerText = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
}

function restartQuiz() {
    startQuiz();
}

// Iniciar quiz automaticamente ao carregar a página
startQuiz();



