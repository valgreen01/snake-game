let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let score = 0;
let box = 32;
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};
let obstacles = [
  { x: 3 * box, y: 3 * box },
  { x: 6 * box, y: 7 * box },
  { x: 9 * box, y: 12 * box },
  // Add more obstacles as needed
];

function createBG() {
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function drawObstacles() {
  context.fillStyle = 'gray';
  context.strokeStyle = 'black';
  for (let i = 0; i < obstacles.length; i++) {
    context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    context.strokeRect(obstacles[i].x, obstacles[i].y, box, box);
  }
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  // Check for collisions with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
      clearInterval(game);
      alert('Game Over :(');
    }
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game Over :(');
    }
  }

  createBG();
  createSnake();
  drawFood();
  drawObstacles();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    score++;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
  document.getElementById('score').innerText = 'Score: ' + score; // Update the score display
}

let game = setInterval(startGame, 100);
