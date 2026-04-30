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
// water variables
var water;
var randomw = [], wy = [];
var ymove = 0.5;
var waterdrop = 1;
// sound variables
var soundwater;

function preload() {
  soundFormats("wav");
  cake   = loadImage("Cake.png");
  candle = loadImage("Candle.png");
  water  = loadImage("Water.png");
  soundwater = loadSound("Water.wav");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-container');
  background(100);

  cx = width / 2 - 100;
  cy = height - 200;

  // initialise 3 candles with independent x and y positions
  for (let i = 0; i < 3; i++) {
    randomx[i] = random(0, width - 60);
    candley[i] = random(-300, -50);   // stagger start heights
  }

  // initialise 4 water drops with independent positions
  for (let i = 0; i < 4; i++) {
    randomw[i] = random(0, width - 60);
    wy[i] = random(-400, -50);        // stagger start heights
  }
}

function draw() {
  background("lightblue");
  image(cake, cx, cy, 200, 200);

  textSize(15);
  fill("white");
  rect(0, 10, width, 40);
  fill("black");
  text('Collect 8 candles, avoid the water!', width / 2, 35);
  textAlign(LEFT, CENTER);
  text('Candles: ' + count, 10, 35);
  textAlign(CENTER, CENTER);

  // draw 3 candles
  for (let i = 0; i < 3; i++) {
    candles(i);
  }

  // draw 4 water drops
  for (let i = 0; i < 4; i++) {
    waterDrops(i);
  }

  if (gameLost || gameWon) {
    gameOutcome();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) { cx += 12; }
  if (keyCode === LEFT_ARROW)  { cx -= 12; }
}

function candles(i) {
  candley[i] += cmove;
  image(candle, randomx[i], candley[i], 60, 60);

  if (count >= 8) {
    gameWon = true;
  }

  // candle caught by cake
  if (randomx[i] > cx && randomx[i] < cx + 200 &&
      candley[i] > cy && candley[i] < cy + 200) {
    candley[i] = -50;
    randomx[i] = random(0, width - 60);
    count += 1;
  }

  // candle fell off bottom — reset above screen
  if (candley[i] > height) {
    candley[i] = -50;
    randomx[i] = random(0, width - 60);
  }
}

function waterDrops(i) {
  wy[i] += 1.5 * ymove;
  image(water, randomw[i], wy[i], 60, 60);

  // water hit the cake
  if (randomw[i] > cx + 20 && randomw[i] < cx + 180 &&
      wy[i] > cy && wy[i] < cy + 200) {
    gameLost = true;
    if (!soundwater.isPlaying()) {
      soundwater.play();
    }
  }

  // water drop fell off bottom — reset above screen
  if (wy[i] > height) {
    wy[i] = -50;
    randomw[i] = random(0, width - 60);
  }
}

function gameOutcome() {
  if (gameLost) {
    background("red");
    textSize(50);
    fill(255);
    text('Oh no! You lost!', width / 2, height / 2);
  }
  if (gameWon) {
    background("green");
    textSize(50);
    fill(255);
    text('Yay! You Won!', width / 2, height / 2);
  }
}