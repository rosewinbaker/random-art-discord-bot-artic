const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(500, 500)
const ctx = canvas.getContext('2d')

function newart(message) {
    var gradient = ctx.createLinearGradient(0, 0, -(canvas.width/10), canvas.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



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