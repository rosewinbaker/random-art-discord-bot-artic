const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(500, 500)
const ctx = canvas.getContext('2d')

function newart(message) {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // function getRandomColour(){
    //     var red = Math.floor(Math.random()* 255);
    //     var green = Math.floor(Math.random() * 255);
    //     var blue = Math.floor(Math.random() * 255);
      
    //     return "rgb("+red+","+green+"," +blue+" )";  
    //   }

    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    let c1 = getRandomColor();
    let c2 = getRandomColor();
    let c3 = getRandomColor();
    let c4 = getRandomColor();
    let c5 = getRandomColor();
    let c6 = getRandomColor();
    let c7 = getRandomColor();



    // getRandomColour()
    // let c1 = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c2 = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c3  = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c4  = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c5  = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c6  = Math.floor(Math.random()* 255)
    // getRandomColour()
    // let c7  = Math.floor(Math.random()* 255)
    // getRandomColour()

    // const randomColor = Math.floor(Math.random()*16777215).toString(16);

    gradient.addColorStop(0, c1);
    gradient.addColorStop(1 / 6, c2);
    gradient.addColorStop(2 / 6, c3);
    gradient.addColorStop(3 / 6, c4);
    gradient.addColorStop(4 / 6, c5);
    gradient.addColorStop(5 / 6, c6);
    gradient.addColorStop(1, c7);
    ctx.fillStyle = gradient;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Verdana";
    ctx.fillText("oowoOWOWOw", 10, 90);



    // createImage();

    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    // ctx.moveTo(110, 75);
    // ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    // ctx.moveTo(65, 65);
    // ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    // ctx.moveTo(95, 65);
    // ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    // ctx.stroke();


    // var imageDataURL = canvas.toDataURL();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'random-artwork.png');
    message.channel.send(attachment);
    console.log("sent attachment")
    // console.log(imageDataURL);

    // message.channel.send("My Bot's message", {files: [imageDataURL]});
};

module.exports = newart