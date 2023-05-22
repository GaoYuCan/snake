const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

let score = 0;

let snake = {
    body: [
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 }
    ],
    direction: "right"
};

let apple = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
};

function drawBlock(x, y) {
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
    ctx.fillStyle = "green";
    snake.body.forEach(function (block) {
        drawBlock(block.x, block.y);
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    drawBlock(apple.x, apple.y);
}

function moveSnake() {
    let head = { x: snake.body[0].x, y: snake.body[0].y };

    switch (snake.direction) {
        case "up":
            head.y--;
            break;
        case "right":
            head.x++;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
    }

    // 如果蛇头超出了边界，将其移到另一侧
    if (head.x < 0) {
        head.x = width - 1;
    } else if (head.x >= width) {
        head.x = 0;
    } else if (head.y < 0) {
        head.y = height - 1;
    } else if (head.y >= height) {
        head.y = 0;
    }

    snake.body.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    } else {
        snake.body.pop();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawApple();
    checkCollision();
    document.getElementById("score").innerHTML = "Score: " + score;
}

function checkCollision() {
    let head = snake.body[0];

    if (
        head.x < 0 ||
        head.x >= width ||
        head.y < 0 ||
        head.y >= height
    ) {
        gameover();
    }

    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            gameover();
        }
    }
}

function gameover() {
    clearInterval(intervalId);
    alert("游戏结束！你的得分是 " + score + "分");
}

document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 37:
            if (snake.direction !== "right") {
                snake.direction = "left";
            }
            break;
        case 38:
            if (snake.direction !== "down") {
                snake.direction = "up";
            }
            break;
        case 39:
            if (snake.direction !== "left") {
                snake.direction = "right";
            }
            break;
        case 40:
            if (snake.direction !== "up") {
                snake.direction = "down";
            }
            break;
    }
});

let intervalId = setInterval(gameLoop, 100);