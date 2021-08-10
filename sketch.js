//Create variables here
var dog, happyDog, dogImg, happyDogImg, database, foodS, foodStock, milkBottleImg, foodObj, fedTime, lastFed;
function preload() {
  //load images here
  dogImg = loadImage("images/dogimg.png");
  happyDogImg = loadImage("images/dogimg1.png");
  milkBottleImg = loadImage("images/milk.png")
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  dog = createSprite(250, 350, 30, 30);
  dog.addImage("dog", dogImg);
  dog.scale = 0.3
  foodObj = new Food();
}

function draw() {
  background(46, 139, 87);
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  textSize(20);
  stroke("black")
  foodObj.display();
  text("foodStock: " + foodS, 200, 200);
  fedTime = database.ref('lastFedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val()
  });
  fill(255, 255, 254);
  textSize(15)
  text("last Fed: " + lastFed, 350, 20);
  if (lastFed >= 12) {
    text("last Fed: " + lastFed % 12 + " PM", 350, 20);
  } else if (lastFed == 0) {
    text("last Fed Time: 12 AM", 450, 20);
  } else {
    text("last Fed Time: " + lastFed + " AM", 550, 20);
  }
  drawSprites();
}



function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {
  database.ref('/').update({
    food: x
  })
}



