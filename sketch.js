var dogImg , happyDogImg ,dog , database , foodS , foodstock ;

var lastFed , feed , addFood;
var foodObj , fedTime;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  foodObj = new Food();
  feed=createButton("Feed the dog");
  feed.position(100 , 100);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(200 , 100);
  addFood.mousePressed(addFoods);
    //database
    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value",readStock);
  
  //sprites and their animation
  dog = createSprite(350,350,1900,100);
  dog.addImage(dogImg,200,200);
  dog.scale = 0.2;
}


function draw() {  
  background(46,139,87);

  foodObj.display();
  foodObj.getLastFed();

  drawSprites();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM" ,10,30);
  }else if(lastFed===0){
    text("last Feed : 12 AM" , 10 , 30);
  }else{
    text("last Feed : "+ lastFed + " AM", 10,30);
  }

}
// function to read values from DB
function readStock(data){
  foodS = data.val();
}

//function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  foodS = foodS - 1;
  database.ref('/').update({
    Food: foodS
  })

}
function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}

