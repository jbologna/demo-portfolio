// ── 25-buttons-and-circles ────────────────────────────
// Original sketch by jbologna-fuzzy
// https://editor.p5js.org/jbologna-fuzzy/sketches/jYea2iR7v

let buttonSize = 40;
let circleSize = 60;
let buttonX = [60, 130, 210, 280];
let buttonY = 50;
let circleX = [80, 150, 230, 300];
let circleY = 170;
let c1 = false, c2 = false, c3 = false, c4 = false;
let msg, baseX, textY, colors;

function setup() {
  let canvas = createCanvas(360, 300);
  canvas.parent('sketch-container');
  textAlign(CENTER, CENTER);
  textSize(20);
  msg = "Happy Holidays";
  baseX = width / 2 - 80;
  textY = height - 50;
  colors = [
    color(255, 80, 80),
    color(255, 150, 70),
    color(255, 210, 50),
    color(120, 200, 80),
    color(80, 170, 220),
    color(140, 110, 230),
    color(220, 90, 200),
  ];
}

function draw() {
  background(240);
  for (let i = 0; i < 4; i++) {
    fill(200);
    rect(buttonX[i], buttonY, buttonSize, buttonSize, 5);
    fill(0);
    text(i + 1, buttonX[i] + buttonSize / 2, buttonY + buttonSize / 2);
  }
  fill(c1 ? color(255, 0, 0) : color(150));
  circle(circleX[0], circleY, circleSize);
  fill(c2 ? color(0, 255, 0) : color(150));
  circle(circleX[1], circleY, circleSize);
  fill(c3 ? color(255, 220, 0) : color(150));
  circle(circleX[2], circleY, circleSize);
  fill(c4 ? color(0, 0, 255) : color(150));
  circle(circleX[3], circleY, circleSize);
  if (c1 && c2 && c3 && c4) {
    textSize(30);
    for (let i = 0; i < msg.length; i++) {
      fill(colors[i % colors.length]);
      text(msg[i], baseX + i * 15, textY);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    if (
      mouseX > buttonX[i] &&
      mouseX < buttonX[i] + buttonSize &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonSize
    ) {
      switch (i) {
        case 0: c1 = !c1; break;
        case 1: c2 = !c2; break;
        case 2: c3 = !c3; break;
        case 3: c4 = !c4; break;
      }
    }
  }
}