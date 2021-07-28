const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var balls = [];
var boats = [];
var boatanimation=[];
var boatspritedata
var boatspritesheet
var boatframes
var brokenboatanimation=[];
var brokenboatspritedata
var brokenboatspritesheet
var brokenboatframes
var watersplashanimation=[];
var watersplashspritedata
var watersplashpritesheet
var watersplashframes
var watersound,piratelaughsound,cannonexplosion,backgroundmusic
var isgameover=false
var islaughing=false

function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");
  boatspritedata=loadJSON("assests/boat.json")
  boatspritesheet=loadImage("assests/boat.png")
  brokenboatspritedata=loadJSON("assests/broken_boat.json")
  brokenboatspritesheet=loadImage("assests/broken_boat.png")
  watersplashspritedata=loadJSON("assests/water_splash.png")
  watersplashspritesheet=loadImage("assests/water_splash.png")
backgroundmusic=loadSound("assets/background_music.wav")
watersound=loadSound("assets/cannon_water.wav")
cannonexplosion=loadSound("assets/cannon_explosion.wav")
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 290, 250, 580);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);

  boat = new Boat(width, height - 100, 200, 200, -100);
  boatframes=boatspritedata.frames
  for (var i=0;i<boatframes.length;i++){
  var pos=boatframes[i].position
  var img=boatspritesheet.get(pos.x,pos.y,pos.w,pos.h)
  boatanimation.push(img)
  }
  brokenboatframes=brokenboatspritedata.frames
  for (var j=0;j<boatframes.length;j++){
  var posj=brokenboatframes[j].position
  var imgj=brokenboatspritesheet.get(posj.x,posj.y,posj.w,posj.h)
  brokenboatanimation.push(imgj)
  }
  watersplashframes=watersplashspritedata.frames
  for (var k=0;k<watersplashframes.length;k++){
  var posk=watersplashframes[k].position
  var imgk=watersplashspritesheet.get(posj.x,posk.y,posk.w,posk.h)
  watersplashanimation.push(imgk)
  }
 
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  if(!backgroundmusic.isPlaying())
  {
  backgroundmusic.play()
  backgroundmusic.setVolume(0.1)
  }

  Engine.update(engine);
  ground.display();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided&&!boats[i].isBroken) {
          if(!islaughing&&!piratelaughsound.isPlaying()){
          piratelaughsound.play()
          islaughing=true
          }
          boats[j].remove(j);

          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
          
        }
      } 
    }
  }

  cannon.display();
  tower.display();
}


//creating the cannon ball on key press
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

// function to show the ball.
function showCannonBalls(ball, index) {
  ball.display();
  ball.animate();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
   if(!ball.issink){
     watersound.play()
    ball.remove(index)
   }
  }
}


//function to show the boat
function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width,height - 100, 200, 200, position,boatanimation);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate()
    }
  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100,boatanimation);
    boats.push(boat);
  }
}


//releasing the cannonball on key release
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonexplosion.play()
    balls[balls.length - 1].shoot();
  }
}
function gameover(){

}

