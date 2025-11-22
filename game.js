const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let velocityX = 0;
let velocityY = 0;
let foodX = 15;
let foodY = 15;
let score = 0;

// Yön tuşları kontrolü
document.addEventListener('keydown', keyDown);

function keyDown(event) {
    // Yukarı
    if (event.keyCode == 38 && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    // Aşağı
    if (event.keyCode == 40 && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    // Sol
    if (event.keyCode == 37 && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    // Sağ
    if (event.keyCode == 39 && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    // Yılanın başını hareket ettir
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

    // ÖLÜMSÜZLÜK: Duvara çarpınca karşı taraftan çık
    if (head.x < 0) {
        head.x = tileCount - 1;
    }
    if (head.x >= tileCount) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = tileCount - 1;
    }
    if (head.y >= tileCount) {
        head.y = 0;
    }

    // ÖLÜMSÜZLÜK: Kendine çarpınca oyun bitmiyor, sadece devam ediyor
    // (Normalde burada oyun biterdi, ama kontrol yok)

    snake.unshift(head);

    // Yemek yeme kontrolü
    if (head.x === foodX && head.y === foodY) {
        score++;
        scoreElement.textContent = 'Skor: ' + score;
        placeFood();
    } else {
        // Yemek yemediyse kuyruk kısalır
        snake.pop();
    }
}

function draw() {
    // Arkaplanı temizle
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Yılanı çiz
    ctx.fillStyle = 'lime';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Yemeği çiz
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function placeFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}

// Oyunu başlat
gameLoop();
