// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let backgroundColor,
  frogX,
  frogY,
  frogV,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V,
  floating1 = false,
  floating2 = false;
let logs = [];
let cars = [];
let frog2X, frog2Y, lives2, frog2V, player1win, player2win;
class Log {
  constructor(x, y, Vx, Vy, length, position) {
    this.x = x;
    this.y = y;
    this.Vx = Vx;
    this.Vy = Vy;
    this.length = length;
    this.position = position;
  }
  collision() {
    if (collideRectCircle(this.x, this.y, this.length, 35, frogX, frogY, 20)) {
      floating1 = true;
      frogX += this.Vx * this.position;
    } else {
      floating1 = floating1 || false;
    }
    if (
      collideRectCircle(this.x, this.y, this.length, 35, frog2X, frog2Y, 20)
    ) {
      floating2 = true;
      frog2X += this.Vx * this.position;
    } else {
      floating2 = floating2 || false;
    }
  }

  display() {
    fill(60, 100, 100);
    rect(this.x, this.y, this.length, 35);
    this.x = this.x + this.Vx * this.position;
    if (this.x > width && this.position == 1) {
      this.x = -length - 200;
    } else if (this.x + 300 < 0 && this.position == -1) {
      this.x = 600;
    }
  }
}
class car {
  constructor(y, direction) {
    this.Vx = random(5, 7);
    this.y = y;
    this.direction = direction;
    //-1 or 1
    this.x = random(100, 400);
    if (direction > 0) {
      this.x *= -1;
    } else if (this.direction < 0) {
      this.x += width;
    }
    this.width = 40;
    this.height = 30;
  }
  display() {
    // Code for car 1
    fill(0, 80, 80);
    rect(this.x, this.y, this.width, this.height);
    // Code for additional cars
  }
  collision() {
    if (
      collideRectCircle(
        this.x,
        this.y,
        this.width,
        this.height,
        frogX,
        frogY,
        20
      )
    ) {
      console.log("collided with Car 1");
      frogX = width / 2;
      frogY = height * 0.95;
      lives -= 1;
    }
    //console.log("ok")
    if (lives <= 0) {
      player2win = true;
    }
    //code for frog #2
    if (
      collideRectCircle(
        this.x,
        this.y,
        this.width,
        this.height,
        frog2X,
        frog2Y,
        20
      )
    ) {
      console.log("collided with Car 2");
      frog2X = width / 2;
      frog2Y = height * 0.95;
      lives2 -= 1;
    }
    if (lives2 <= 0) {
      player1win = true;
    }
  }
  update() {
    this.x += this.Vx * this.direction;
    if (this.x + this.width < 0 && this.direction < 0) {
      return new car(this.y, this.direction);
    } else if (this.x > width && this.direction > 0) {
      return new car(this.y, this.direction);
    }
  }
}

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2 - 100;
  frogY = height * 0.95;
  frogV = 15;
  frog2X = width / 2 + 100;
  frog2Y = height * 0.95;
  frog2V = 15;
  score = 0;
  lives = 3;
  lives2 = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 300;
  car1V = 5;

  logs.push(new Log(0, 110, 1, 0, 125, 1));
  logs.push(new Log(200, 110, 1, 0, 75, 1));
  logs.push(new Log(350, 110, 1, 0, 100, 1));
  logs.push(new Log(700, 110, 1, 0, 75, 1));
  logs.push(new Log(0, 155, 1, 0, 125, -1));
  logs.push(new Log(200, 155, 1, 0, 75, -1));
  logs.push(new Log(350, 155, 1, 0, 100, -1));
  logs.push(new Log(700, 155, 1, 0, 75, -1));

  cars.push(new car(60, -1));
  cars.push(new car(210, -1));
  cars.push(new car(260, 1));
  cars.push(new car(310, -1));
  cars.push(new car(360, -1));
  cars.push(new car(410, 1));
}

function draw() {
  background(backgroundColor);
  floating1 = false;
  floating2 = false;
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog

  fill(240, 60, 100);
  rect(0, 100, width, 100);
  for (var i = 0; i < 5; i++) {
    line(0, 250 + i * 50, width, 250 + i * 50);
  }
  for (var i = 0; i < logs.length; i++) {
    if (logs[i]) {
      logs[i].collision();
      logs[i].display();
    }
  }

  for (var i = 0; i < cars.length; i++) {
    if (cars[i]) {
      //cars[i].collsion();
      var newCar = cars[i].update();
      if (newCar) {
        cars[i] = newCar;
      }
      cars[i].collision();
      cars[i].display();
    }
  }

  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  fill(0, 0, 0);
  textSize(12);
  text("1", frogX - 4, frogY + 3);
  //2nd purple frog
  fill(270, 80, 80);
  ellipse(frog2X, frog2Y, 20);
  fill(90, 0, 100);
  text("2", frog2X - 4, frog2Y + 3);
  //moveCars();
  //drawCars();
  //checkCollisions();
  checkWin();
  displayScores();

  if (
    (frogY > 110 && frogY < 190 && floating1 == false) ||
    (frogX < 0 || frogX > width)
  ) {
    frogX = width / 2;
    frogY = height * 0.95;
    lives -= 1;
    if (lives <= 0) {
      player2win = true;
    }
  }
  if (
    (frog2Y > 110 && frog2Y < 190 && floating2 == false) ||
    (frog2X < 0 || frog2X > width)
  ) {
    frog2X = width / 2;
    frog2Y = height * 0.95;
    lives -= 1;
    if (lives <= 0) {
      player1win = true;
    }
  }
}

function keyPressed() {
  if (!player1win && !player2win) {
    if (keyCode == UP_ARROW) {
      frogY -= frogV;
    } else if (keyCode == DOWN_ARROW) {
      frogY += frogV;
    } else if (keyCode == LEFT_ARROW) {
      frogX -= frogV;
    } else if (keyCode == RIGHT_ARROW) {
      frogX += frogV;
    }
    if (key == "w") {
      frog2Y -= frog2V;
    } else if (key == "s") {
      frog2Y += frog2V;
    } else if (key == "a") {
      frog2X -= frog2V;
    } else if (key == "d") {
      frog2X += frog2V;
    }
  }
}
function moveCars() {
  // Move the car
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X >= width) {
    car1X = -30;
    car1Y = random(200, height * 0.8);
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    console.log("collided with Car 1");
    frogX = width / 2;
    frogY = height * 0.9;
    lives -= 1;
  }
  if (lives <= 0) {
    gameIsOver = true;

    //code for frog #2
    if (collideRectCircle(car1X, car1Y, 40, 30, frog2X, frog2Y, 20)) {
      console.log("collided with Car 2");
      frog2X = width / 2;
      frog2Y = height * 0.9;
      lives2 -= 1;
    }
    if (lives2 <= 0) {
      gameIsOver = true;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (collideRectCircle(0, 0, width, 30, frogX, frogY, 20)) {
    //score += 1;
    player1win = true;
    //frogX = width / 2;
    //frogY = height * 0.9;
  }
}

if (collideRectCircle(0, 0, width, 30, frog2X, frog2Y, 20)) {
  player2win = true;
  /* 
   score += 1;
    frog2X = width / 2;
    frog2Y = height * 0.9;
     */
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Player 1 Lives: ${lives}`, 10, 20);
  text(`Player 1: Arrowkeys`, width-120, 20);
  // Display Score
  //text(`Score: ${score}`, 10, 38);
  text(`Player 2 Lives: ${lives2}`, 10, 38);
  text(`Player 2: WASD`, width-120, 38);
  // Display game over message if the game is over
  if (player1win) {
    textSize(60);
    text("PLAYER 1 WINS", 20, height / 2);
  }
  if (player2win) {
    textSize(60);
    text("PLAYER 2 WINS", 20, height / 2);
  }
  /*
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height / 2);
  }*/
}
