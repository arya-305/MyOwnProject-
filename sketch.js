var invis, yellow, green, orange;
var backGround, backGroundImage, yellowImage;
var orangeImage, greenImage, bow, bowImage, arrowImage;
var arrow, rand, redB, greenB, pinkB, blueB, arrowGroup;

var score = 0;
var gameState = "play";

function preload() {
  //load your images here
  backGroundImage = loadImage("space.png");
  yellowImage = loadImage("yellowalien.png");
  orangeImage = loadImage("orangealien.png");
  greenImage = loadImage("pumpkin.png");
  bowImage = loadImage("greenship.png");
  arrowImage = loadImage("laser.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  backGround = createSprite(0, 0, 600, 200);
  backGround.addImage(backGroundImage);
  backGround.scale = 4.0;

  bow = createSprite(900, 230, 10, 10);
  bow.addImage(bowImage);
  bow.scale = 0.40;

  invis = createSprite(bow.x - 50, 300, 10, 700)
  invis.visible = false;

  yellowB = new Group();
  greenB = new Group();
  orangeB = new Group();
  arrowGroup = new Group();
}

function draw() {
  background(255);

  if (gameState === "play") {
    if (backGround.x < 100) {
      backGround.x = 300;
    }

    bow.y = World.mouseY;
    if (bow.y > 400) {
      bow.y = 460
    }

    if (keyDown("space")) {
      createArrows();
    }


    var select_alien = Math.round(random(1, 3));

    if (World.frameCount % 100 === 0) {
      if (select_alien == 1) {
        createYellow();
      }
      else if (select_alien == 2) {
        createGreen();
      }
      else {
        createOrange();
      }
    }


    if (arrowGroup.isTouching(orangeB)) {
      orangeB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 1
    }

    if (arrowGroup.isTouching(yellowB)) {
      yellowB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 3
    }

    if (arrowGroup.isTouching(greenB)) {
      greenB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 5
    }


    if (orangeB.isTouching(invis) || yellowB.isTouching(invis) || greenB.isTouching(invis)) {
      gameState = "end";
    }

    drawSprites();
    textSize(20)
    text("score:" + score, 270, 60)
  }

  if (gameState === "end") {
    backGround = createSprite(0, 0, 600, 200);
    backGround.addImage(backGroundImage);
    backGround.scale = 4.0;

    drawSprites();
    textSize(20);
    fill("red");
    stroke("black");
    text("THE ALIENS HAVE INFILTRATED YOUR SHIP", 300, 250)

   
  }
}



function createArrows() {
  arrow = createSprite(830, bow.y, 20, 20);
  arrow.addImage(arrowImage);
  arrow.scale = 0.3
  arrow.velocityX = -5
  arrowGroup.add(arrow)
  bow.y = arrow.y;
}

function createYellow() {
  yellow = createSprite(0, Math.round(random(50, 400)), 10, 10)
  yellow.addImage(yellowImage)
  yellow.velocityX = 4 + 3 * score / 30;
  yellow.scale = 0.1
  yellow.lifetime = 300
  yellowB.add(yellow)
}

function createGreen() {
  green = createSprite(0, Math.round(random(50, 400)), 10, 10)
  green.addImage(greenImage)
  green.velocityX = 4 + 2 * score / 20;
  green.scale = 0.1
  green.lifetime = 300
  greenB.add(green)
}

function createOrange() {
  orange = createSprite(0, Math.round(random(50, 400)), 10, 10)
  orange.addImage(orangeImage)
  orange.velocityX = 4 + 3 * score / 20;
  orange.scale = 0.1
  orange.lifetime = 300
  orangeB.add(orange)
}