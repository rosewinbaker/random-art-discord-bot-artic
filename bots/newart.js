const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(50, 50)
const ctx = canvas.getContext('2d')

function newart() {
    // createImage();

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();

    var imageDataURL = canvas.toDataURL();
    // console.log(imageDataURL);

    // message.channel.send("My Bot's message", {files: [imageDataURL]});
};

module.exports = newart