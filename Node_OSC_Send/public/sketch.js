// Create connection to Node.JS Server
const socket = io();
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
 
}

function draw() {
  background(200);
  noStroke();

  fill(0);
  text("Send OSC",10,20);
 
  fill(255,0,0);
  circle(mouseX,mouseY,50);
}

function mouseDragged() {
  // Send message back to Arduino

  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    socket.emit("message", {
      address: "/mousePos",
      args: [
          {
            type: "f",
            value: mouseX / width
          },
          {
            type: "f",
            value: mouseY / height
          }
      ]
    });
  }

}

//Events that we are listening for
// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  console.log(_message);

});