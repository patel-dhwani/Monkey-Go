var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0,life=3;
var ground, invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY,gameState = END;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  
  //Monkey Sprite
  monkey = createSprite(50,140,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //Ground
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //Invisible ground to collide with monkey
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //New Groups
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score=0;
  life=3;
}

function draw() {
  //Background color
  background(255);
  //Display scores
  textSize(20);
  fill(0);
  text("Score: "+ score, 300,40);
  
  //Display Life
  textSize(15);
  fill(0);
  text("Life: "+ life,10,40);
  
  drawSprites();
  if (gameState===PLAY){
  if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && monkey.y >= 139) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnFood();
    monkey.collide(ground);
    
    if (FoodGroup.isTouching(monkey)){
      score=score+5;
      FoodGroup[0].destroy();
    }
  if(life === 0){
    gameState = END;
  }
  }
  
  else if (gameState === END ){
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
}
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 60 === 0) {
    var Food = createSprite(400,120,40,10);
    Food.y = Math.round(random(80,120));
    Food.addImage(bananaImage);
    Food.scale = 0.1;
    Food.velocityX = -3;
    
     //assign lifetime to the variable
    Food.lifetime = 200;
    
    //adjust the depth
    Food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    //generate random obstacles
    var rand = Math.round(random(1));    
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle  
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


