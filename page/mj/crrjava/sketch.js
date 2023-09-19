function setup() {
  createCanvas(windowWidth, windowHeight);
  
  angleMode(DEGREES)
  rectMode(CENTER)
  
}

let size = 100;

function draw() {
  background(0,0,255);
   translate(width/2, height/2);
  
  noFill()
  stroke(255);
  
  for(i=0; i <200; i++){
    push()
//     let r = map(sin(frameCount+i), 0, 20, 100, 1)
//     let g = map(cos(frameCount/4-i), -1, 1, 100,200)
//     let b = map(sin(frameCount/4+i), -1, 1, 1, 200)
    
//     stroke(r, g, b);
    
    rotate(sin(frameCount+i*10))
    rect(tan(frameCount+i)*20, cos(frameCount+i)*20 , i*mouseX/50 ,i*mouseX/50, 200-i);
    pop()
    
    
    
    
  }
  
  
 
}

