class Boats{
constructor(x,y,width,height,boatpos){
var options={
restitution:0.8,
friction:1.0,
density:1.0
}
this.body=Bodies.rectangle(x,y,width,height,options)
this.width=width
this.height=height
this.x=x
this.y=y
this.boatposition=boatpos

this.image=loadImage("assets/boat.png")
World.add(world,this.body)
}
display(){
    var angle=this.body.angle
    var pos=this.body.position



  
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image,0,0,this.r,this.r)
    noTint()
    pop();

}

}