let tempoRestante = 1500; // 25 minutos em segundos
let timerInterval = null;
let timerTexto = document.getElementById('timer');
let isRunning = false;
let startButton = document.getElementById('start');
let progressBar = document.getElementById('progress-bar');
let progressStart = document.getElementById('progress-start');
let progressEnd = document.getElementById('progress-end');
let taskInput = document.getElementById('task-input');
let taskList = document.getElementById('task-list');
let taskTimerInterval = null; // Intervalo para os timers das tarefas
let taskSeconds = 0; // Segundos para os timers das tarefas
let xpPorPomodoro = 64; // XP por Pomodoro completo

// Função para formatar o tempo
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
}

// Função para iniciar o timer
function iniciarTimer() {
    timerInterval = setInterval(() => {
        tempoRestante--;
        timerTexto.textContent = formatarTempo(tempoRestante);

        // Atualiza a barra de progresso
        let progresso = (1500 - tempoRestante) / 1500 * 100;
        progressBar.style.width = progresso + '%';

        // Atualiza o texto de XP na barra de progresso
        progressStart.textContent = `${Math.floor(progresso / 100 * xpPorPomodoro)} XP`;
        progressEnd.textContent = `${xpPorPomodoro} XP`;

        if (tempoRestante === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            startButton.textContent = 'Iniciar';
            startButton.removeAttribute('data-state');
            alert("Tempo esgotado!");

            // Concluir uma tarefa ao terminar o Pomodoro
            concluirTarefa();
        }
    }, 1000);
    isRunning = true;
    startButton.textContent = 'Parar';
    startButton.setAttribute('data-state', 'stop');

    // Inicia os timers das tarefas
    const taskTimers = document.querySelectorAll('.task-time');
    taskSeconds = 0;
    taskTimerInterval = setInterval(() => {
        taskSeconds++;
        taskTimers.forEach(timer => {
            timer.textContent = formatarTempo(taskSeconds);
        });
    }, 1000);
}

// Função para parar o timer
function pararTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startButton.textContent = 'Iniciar';
    startButton.removeAttribute('data-state');

    // Para os timers das tarefas
    clearInterval(taskTimerInterval);
}

// Função para resetar o timer
function resetarTimer() {
    pararTimer();
    tempoRestante = 1500; // Resetando para 25 minutos
    timerTexto.textContent = formatarTempo(tempoRestante);
    progressBar.style.width = '0%';
    progressStart.textContent = '0 XP';

    // Reseta os timers das tarefas
    const taskTimers = document.querySelectorAll('.task-time');
    taskTimers.forEach(timer => {
        timer.textContent = "00:00";
    });
}

// Função para alternar o estado do timer
function toggleTimer() {
    if (isRunning) {
        pararTimer();
    } else {
        iniciarTimer();
    }
}

// Função para adicionar tarefas
function adicionarTarefa() {
    const tarefa = taskInput.value.trim();
    if (tarefa) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-name">${tarefa}</span>
            <span class="task-time">00:00</span>
            <button class="delete-task"><i class="fas fa-trash"></i></button>
        `;

        // Adicionar evento para deletar tarefas
        const deleteButton = li.querySelector('.delete-task');
        deleteButton.addEventListener('click', function () {
            li.remove();
        });

        taskList.appendChild(li);

        // Limpar o campo de entrada
        taskInput.value = '';
    }
}

// Função para concluir a tarefa
function concluirTarefa() {
    const tarefas = document.querySelectorAll('#task-list li');
    if (tarefas.length > 0) {
        tarefas.forEach(tarefa => {
            const taskTime = tarefa.querySelector('.task-time');
            taskTime.innerHTML = '<i class="fas fa-check"></i>'; // Marca a tarefa como concluída com um ícone
            tarefa.style.textDecoration = 'line-through'; // Risca a tarefa

            const btnExcluir = tarefa.querySelector('.delete-task');
            btnExcluir.style.display = 'none'; // Oculta o botão de excluir
        });
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