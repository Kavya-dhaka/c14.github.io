var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles;
var obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;
var cloudImage;

var score;
var obstaclesgroup, cloudsgroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  obstacles1 = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");

  obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");

  cloudImage = loadImage("cloud.png");

}

function setup() {

  createCanvas(600, 200)

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //generate random numbers
  var rand = Math.round(random(1, 100))
  console.log(rand)

  //creating groups
  cloudsgroup = new Group();
  obstaclesgroup = new Group();

}

function draw() {
  //set background color
  background(180);

  console.log(trex.y);
  if (gameState === PLAY) {
    // jump when the space key is pressed
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
    }


    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //Spawn Clouds
    spawnClouds();

    //Spawn Obstacles
    spawnObstacles();

    //changing game state to end
    if (obstaclesgroup.isTouching(trex)) {
      gameState = END;
    }

  }
  else if (gameState === END) {
    ground.velocityX = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
  }

  //stop trex from falling down
  trex.collide(invisibleGround);

  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here 
  if (frameCount % 100 == 0) {
    clouds = createSprite(600, 70, 10, 20);
    clouds.velocityX = -4;
    clouds.addImage("cloud", cloudImage);
    clouds.y = Math.round(random(50, 100));
    clouds.scale = 0.7;
    clouds.lifetime = 150;
    cloudsgroup.add(clouds);
  }
}

function spawnObstacles() {
  if (frameCount % 150 == 0) {
    obstacles = createSprite(600, 163, 10, 20);
    obstacles.velocityX = -4;
    var number = Math.round(random(1, 6));
    switch (number) {
      case 1: obstacles.addImage(obstacles1);
        break;
      case 2: obstacles.addImage(obstacles2);
        break;
      case 3: obstacles.addImage(obstacles3);
        break;
      case 4: obstacles.addImage(obstacles4);
        break;
      case 5: obstacles.addImage(obstacles5);
        break;
      case 6: obstacles.addImage(obstacles6);
        break;
      default: break;
    }
    obstacles.scale = 0.5;
    obstacles.lifetime = 150;
    obstaclesgroup.add(obstacles);
  }
}

