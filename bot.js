const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require('./config.json');
const auth = process.env.BOT_TOKEN;
// var auth = require('./auth.json');
var artbot = require('./bots/art.js');
var wordbot = require('./bots/word.js');
var heyoo = require('./bots/heyo.js');
var jeo = require('./bots/jeo.js');
var deb = require('./db.js');
var queen = require('./bots/queen.js');
var newart = require('./bots/newart.js');
// import { imageDataURL } from "./bots/newart.js";
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(50, 50)
const ctx = canvas.getContext('2d')

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {

  if (message.content.startsWith("!fart")){
    artbot(message);
  }

  // Generate a random poem
  else if (message.content.startsWith("!word")) {
    wordbot(message);
   }

  // Search for a book
  else if (message.content.startsWith(prefix)) {
    heyoo(message);
  }

  // Jeopardy question
  else if (message.content.startsWith("!jeo")) {
    jeo(message);
  }

    // Jeopardy question
    else if (message.content.startsWith("!dbjeo")) {
      deb(message);
    }

    // Jeopardy question
    else if (message.content.startsWith("!queen")) {
      queen(message);
    }

  // gen art question
  else if (message.content.startsWith("!newart")) {
    newart(message);
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

    console.log(imageDataURL);
    
    const embed = new Discord.MessageEmbed()
      .setTitle("This is a title")
      .setImage(imageDataURL)
      .setThumbnail(imageDataURL)
      message.channel.send(embed) 
  };
});

// client.login(auth.token);
client.login(auth);