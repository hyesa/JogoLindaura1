const bonecopalitocorrendo = document.querySelector('.bonecopalitocorrendo');
const fogo = document.querySelector('.fogo');
const backgroundMusic = document.getElementById('musicadefundo');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over-text');
const jumpButton = document.getElementById('jumpButton');
const restartButton = document.getElementById('restartButton'); // Novo botão de reiniciar
const blackOverlay = document.getElementById('fundopreto');

let score = 0;
let gameOver = false;
let loop;

const jump = () => {
    if (gameOver) return;
    bonecopalitocorrendo.classList.add('pulo');

    setTimeout(() => {
        bonecopalitocorrendo.classList.remove('pulo');
    }, 500);
};

const updateScore = () => {
    if (gameOver) return;
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
};

const showGameOverText = () => {
    gameOverText.textContent = `Sua pontuação final foi de ${score} pontos.`;
    gameOverText.style.display = 'block';
    gameOverText.style.opacity = '1';
    
    // Esconder botão de pular e mostrar botão de reiniciar
    jumpButton.style.display = 'none';
    restartButton.style.display = 'block';
    restartButton.addEventListener('click', () => location.reload());
};

const resetGame = () => {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    gameOverText.style.display = 'none';
    gameOverText.style.opacity = '0';

    bonecopalitocorrendo.src = './img/bonecopalitocorrendo.gif';
    bonecopalitocorrendo.style.width = '200px';
    bonecopalitocorrendo.style.position = 'absolute';
    bonecopalitocorrendo.style.top = 'auto';
    bonecopalitocorrendo.style.left = 'auto';
    bonecopalitocorrendo.style.transform = 'none';
    bonecopalitocorrendo.style.bottom = '20px';

    fogo.style.display = 'block';
    fogo.style.animation = 'fogo-animation 1.5s infinite linear';

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    blackOverlay.classList.remove('fade-in');

    bonecopalitocorrendo.style.zIndex = '1010';

    loop = setInterval(checkCollision, 10);

    // Mostrar botão de pular e esconder botão de reiniciar
    jumpButton.style.display = 'block';
    restartButton.style.display = 'none';
};

const checkCollision = () => {
    const vilaoPosition = fogo.offsetLeft;
    const bonecopalitocorrendoPosition = +window.getComputedStyle(bonecopalitocorrendo).bottom.replace('px', '');

    if (vilaoPosition <= 120 && vilaoPosition > 0 && bonecopalitocorrendoPosition < 80) {
        gameOver = true;

        fogo.style.animation = 'none';
        fogo.style.left = `${vilaoPosition}px`;

        bonecopalitocorrendo.style.animation = 'none';
        bonecopalitocorrendo.style.bottom = `${bonecopalitocorrendoPosition}px`;

        bonecopalitocorrendo.src = './img/perdeu.gif';
        bonecopalitocorrendo.style.width = '600px';
        bonecopalitocorrendo.style.position = 'absolute';
        bonecopalitocorrendo.style.top = '50%';
        bonecopalitocorrendo.style.left = '50%';
        bonecopalitocorrendo.style.transform = 'translate(-50%, -50%)';

        fogo.style.display = 'none';

        clearInterval(loop);
        backgroundMusic.pause();
        showGameOverText();

        blackOverlay.classList.add('fade-in');
        bonecopalitocorrendo.style.zIndex = '1010';
    } else {
        updateScore();
    }
};

document.addEventListener('keydown', (event) => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
    jump();
});

jumpButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
    jump();
    jumpButton.style.backgroundColor = 'purple';
    setTimeout(() => {
        jumpButton.style.backgroundColor = '';
    }, 200);
});

loop = setInterval(checkCollision, 10);
