let tempoRestante = 25 * 60; // 25 minutos
let timerInterval = null;
let timerTexto = document.getElementById('timer');
let isRunning = false; // Variável para controlar o estado do timer
let startButton = document.getElementById('start'); // Adiciona esta linha

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
}

function iniciarTimer() {
    timerInterval = setInterval(() => {
        tempoRestante--;
        timerTexto.textContent = formatarTempo(tempoRestante);

        if (tempoRestante === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            startButton.textContent = 'Iniciar';
            startButton.removeAttribute('data-state'); // Remove o atributo
            alert("Tempo esgotado!");
        }
    }, 1000);
    isRunning = true;
    startButton.textContent = 'Parar';
    startButton.setAttribute('data-state', 'stop'); // Adiciona o atributo
}

function pararTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startButton.textContent = 'Iniciar';
    startButton.removeAttribute('data-state'); // Remove o atributo
}

function resetarTimer() {
    pararTimer();
    tempoRestante = 25 * 60;
    timerTexto.textContent = formatarTempo(tempoRestante);
}

function toggleTimer() {
    if (isRunning) {
        pararTimer();
    } else {
        iniciarTimer();
    }
}

// Lógica do modo escuro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'light');
    }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}