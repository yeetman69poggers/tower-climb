var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage("ghost-jumping",ghostImg)
  ghost.scale = 0.50

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background("black");

  if(gameState === "play"){

  
  
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -5
  } 
  ghost.velocityY = ghost.velocityY +0.5

  if(keyDown("left")){
    ghost.x = ghost.x -4
  }

  if(keyDown("right")){
    ghost.x = ghost.x +4
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState  = "end"
  }

  spawnDoors()
  

    drawSprites()
}
if(gameState === "end"){
 textSize(20)
  text("Game Over",300,300)
 }
}
function spawnDoors(){
  if(frameCount %80 === 0){
    door = createSprite(300,-50)
    climber = createSprite(300,10)
    invisibleBlock = createSprite(300,15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.velocityY = 5
    climber.velocityY = 5
    invisibleBlock.velocityY = 5
    door.addImage("door",doorImg)
    climber.addImage("climber",climberImg)
    door.x = Math.round(random(100,500))
    climber.x = door.x
    invisibleBlock.x = door.x
    door.lifetime = 140
    climber.lifetime = 140
    invisibleBlock.lifetime = 140
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug = true


    door.depth = ghost.depth
    ghost.depth = ghost.depth + 1

    

  }
}
