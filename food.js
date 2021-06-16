class Food{
    constructor(){
this.image = loadImage("images/Milk.png");
this.foodStock;
this.lastFed;
    }
    getFoodStock(){
        var getFoodStockRef = database.ref('Food');
        getFoodStockRef.on("value",(data)=>{
            this.foodStock = data.val();
        })
    }
    updateFoodStock(food){
database.ref('/').update({
    Food: food
})
    }
    getLastFed(){
        fedTime = database.ref('fedTime');
        fedTime.on("value",(data)=>{
      lastFed=data.val
        })    
    }
    display(){
var x=80, y=100;

imageMode(CENTER);
image(this.image,720,220,70,70);

if(this.foodStock !=0){
    for(var i=0;i<this.foodStock;i++){
        if(i%10===0){
            x=80;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
    }
}
    }
}