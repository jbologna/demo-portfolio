// ── Rocket Car ────────────────────────────
// Original sketch by jbologna-fuzzy

var boxlen = 150;
var boxheight = 50;
var rndX = 1;
var rndY = 1;
var ahead = 1;
var big = 1;
var grn = 50;
function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('sketch-container');
  rndX = random(100, 300);
  rndY = random(100, 300);
}

function draw() {
  background(0, 150, 200);
  fill(200, grn, 50);
  rect(rndX, rndY, boxlen + big * 2, boxheight + big * 2);
  fill(0, grn, 0);
  triangle(
    rndX + boxlen + big * 2,
    rndY,
    rndX + boxlen + boxlen / 2,
    rndY + boxheight / 2,
    rndX + boxlen + big * 2,
    rndY + boxheight + big * 2
  );
  fill(50, 50, 50);
  circle(rndX, rndY + boxheight, boxheight + big * 2);
  circle(rndX + boxlen, rndY + boxheight, boxheight + big * 2);

  rndX = rndX + ahead;
  grn = grn + ahead * 2;
  if (rndX + boxlen > width - 10) {
    ahead = -1;
    big = big - 5;
  }
  if (rndX < 10) {
    ahead = 1;
    big = big + 5;
  }
}
