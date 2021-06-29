var player,playerImg,gameOverImage;
var ground,groundImg,invisibleGround;
var cowImage, dogImage, pigImage,obstacleGroup;
var gameState = "play";
var diamondImage,rubyImage,stoneGroup;
var score = 0;
var gameOver;

function preload(){
  playerImg = loadAnimation("player1.png","player2.png","player3.png","player4.png");
  groundImg = loadImage("background_image.png");
  cowImage = loadImage("cow_image.png");
  dogImage = loadAnimation("dog_animation.png","dog_animation (1).png","dog_animation (2).png","dog_animation (3).png","dog_animation (4).png","dog_animation (5).png");
  pigImage = loadAnimation("pig_animation.png","pig_animation (1).png","pig_animation (2).png");
  diamondImage = loadImage("diamond_image.png");
  rubyImage = loadImage("ruby_image.png");
  gameOverImage = loadImage("game_over.jpg");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  ground = createSprite(50,displayHeight/2,displayWidth,displayHeight);
  ground.addImage(groundImg);
  ground.scale = 3;
  ground.x = ground.width/2;
  ground.velocityX = -3;

  invisibleGround= createSprite(displayWidth/2,displayHeight-70,displayWidth, 10);
  invisibleGround.x = invisibleGround.width/2;
  invisibleGround.velocityX = -3;
  invisibleGround.visible = false;
  

  player = createSprite(50,displayHeight-200,50,50);
  player.addAnimation("running",playerImg);   
  player.scale = 0.5;

  obstacleGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background(255);
  
  if(gameState == "play"){
    if(invisibleGround.x<0){
      invisibleGround.x = invisibleGround.width/2;
    }
    if(ground.x<100){
      ground.x = ground.width/2;
    }
    if(keyDown("SPACE")){
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.5;
    spawnStone();
    spawnObstacles();
    if(player.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      score+=5;
    } 
    else if(player.isTouching(obstacleGroup)){
      gameState = "end";
      obstacleGroup.destroyEach();
      obstacleGroup.setVelocityXEach(0);
      stoneGroup.destroyEach();
      stoneGroup.setVelocityXEach(0);
      player.destroy();
    }
  }  
  else if(gameState=="end"){
    ground.velocityX = 0;
    player.velocityX = 0;
    //player.x = displayWidth/2;
    //player.y = displayHeight/2;
    //player.changeAnimation("running",gameOverImage);
    //text("GAME OVER!!",displayWidth/2,displayHeight/2);
    gameOver = createSprite(displayWidth/2-200,displayHeight/2,displayWidth,displayHeight);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.4;
    score = 0;
  }

  player.collide(invisibleGround);
  /*if(obstacleGroup.isTouching(player)){
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
  }*/

  drawSprites();
  fill(0);
  textSize(20);
  text("score = " + score,200,150);
}
function spawnObstacles(){
  if(frameCount%300 == 0){
  var Obstacle = createSprite(displayWidth/2,displayHeight-120,50,50);
  Obstacle.velocityX = -3;
  Obstacle.scale = 0.6;
  var rand = Math.round(random(1,2));
  if(rand == 1){
    Obstacle.addAnimation("dog_running",dogImage);
  }
  else if(rand == 2){
    Obstacle.addAnimation("pig_running",pigImage);
  }
  obstacleGroup.add(Obstacle);
  }
}
function spawnStone(){
  if(frameCount%210==0){
    var Stone = createSprite(displayWidth/2,displayHeight-250,50,50);
    Stone.y = random(displayHeight-300,displayHeight-150);
    //Wheat.addImage(diamondImage);
    Stone.velocityX = -3;
    var rand1 = Math.round(random(1,2));
    if(rand1 == 1){
      Stone.addImage(diamondImage);
      Stone.scale = 0.12;
    }
    else if(rand1 == 2){
      Stone.addImage(rubyImage);
      Stone.scale = 0.08;
    }
    stoneGroup.add(Stone);
  }
}