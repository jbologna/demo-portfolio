// ── CR Game ───────────────────────────────────────────

// cake variables
var cake;
var cx, cy;
// candle variables
var candle;
var randomx = [], candley = [];
var cmove = 1;
var count = 0;
// game status variables
var gameLost = false;
var gameWon = false;
var gameStarted = false;
// water variables
var water;
var randomw = [], wy = [];
var ymove = 0.5;

function preload() {
  cake   = loadImage("Cake.png");
  candle = loadImage("Candle.png");
  water  = loadImage("Water.png");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-container');
  cx = width / 2 - 100;
  cy = height - 200;

  for (let i = 0; i < 3; i++) {
    randomx[i]  = random(0, width - 60);
    candley[i]  = random(-300, -50);
  }
  for (let i = 0; i < 4; i++) {
    randomw[i] = random(0, width - 60);
    wy[i]      = random(-400, -50);
  }
}

function draw() {
  // ── Start screen ──────────────────────────────────
  if (!gameStarted) {
    background("#1a1a1a");
    fill("#c8f04a");
    textSize(22);
    textAlign(CENTER, CENTER);
    text("CR Game", width / 2, height / 2 - 40);
    fill(255);
    textSize(14);
    text("Click to start", width / 2, height / 2 + 10);
    textSize(12);
    fill(150);
    text("← → arrow keys to move the cake", width / 2, height / 2 + 45);
    text("Collect 8 candles · Dodge the water!", width / 2, height / 2 + 65);
    return;
  }

  // ── Main game ─────────────────────────────────────
  background("lightblue");
  image(cake, cx, cy, 200, 200);

  textAlign(LEFT, CENTER);
  textSize(14);
  fill(0);
  text('Candles: ' + count + ' / 8', 10, 25);
  textAlign(RIGHT, CENTER);
  text('← → to move', width - 10, 25);

  for (let i = 0; i < 3; i++) { candles(i); }
  for (let i = 0; i < 4; i++) { waterDrops(i); }

  if (gameLost || gameWon) { gameOutcome(); }
}

function mousePressed() {
  _restartIfOver();
  if (!gameStarted) {
    gameStarted = true;
    return;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) { cx += 12; }
  if (keyCode === LEFT_ARROW)  { cx -= 12; }
}

function candles(i) {
  candley[i] += cmove;
  image(candle, randomx[i], candley[i], 60, 60);

  if (count >= 8) { gameWon = true; }

  if (randomx[i] > cx && randomx[i] < cx + 200 &&
      candley[i] > cy && candley[i] < cy + 200) {
    candley[i]  = -50;
    randomx[i]  = random(0, width - 60);
    count += 1;
  }

  if (candley[i] > height) {
    candley[i] = -50;
    randomx[i] = random(0, width - 60);
  }
}

function waterDrops(i) {
  wy[i] += 1.5 * ymove;
  image(water, randomw[i], wy[i], 60, 60);

  if (randomw[i] > cx + 20 && randomw[i] < cx + 180 &&
      wy[i] > cy && wy[i] < cy + 200) {
    gameLost = true;
  }

  if (wy[i] > height) {
    wy[i]      = -50;
    randomw[i] = random(0, width - 60);
  }
}

function gameOutcome() {
  if (gameLost) {
    background("red");
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text('Oh no! You lost!', width / 2, height / 2 - 20);
    textSize(16);
    text('Click to play again', width / 2, height / 2 + 30);
  }
  if (gameWon) {
    background("green");
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text('Yay! You Won!', width / 2, height / 2 - 20);
    textSize(16);
    text('Click to play again', width / 2, height / 2 + 30);
  }
}

// restart on click after game ends
function _restartIfOver() {
  if (gameLost || gameWon) {
    gameLost = false;
    gameWon  = false;
    count    = 0;
    cx = width / 2 - 100;
    for (let i = 0; i < 3; i++) {
      randomx[i]  = random(0, width - 60);
      candley[i]  = random(-300, -50);
    }
    for (let i = 0; i < 4; i++) {
      randomw[i] = random(0, width - 60);
      wy[i]      = random(-400, -50);
    }
  }
}