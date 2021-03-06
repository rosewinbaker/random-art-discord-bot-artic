const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require('./config.json');
const auth = process.env.BOT_TOKEN;
// var auth = require('./auth.json');
var artbot = require('./bots/art.js');
var wordbot = require('./bots/word.js');
var heyoo = require('./bots/heyo.js');
var jeo = require('./bots/jeo.js');
var jeotest = require('./bots/jeotest.js');
// var deb = require('./db.js');
var queen = require('./bots/queen.js');
var meow = require('./bots/meow.js');
var newart = require('./bots/newart.js');
var xkcd = require('./bots/xkcd.js');
var plant = require('./bots/plant.js');
var bread = require('./bots/bread.js');
var redart = require('./bots/redart.js');
var tarot = require('./bots/tarot.js');
var pointsjeo = require('./bots/jeopoints.js');
// import { imageDataURL } from "./bots/newart.js";
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(50, 50)
const ctx = canvas.getContext('2d')
const db = require('./models/index.js');


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

     // Generate a random cat
  else if (message.content.startsWith("!meow")) {
    meow(message);
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
    else if (message.content.startsWith("!testjeo")) {
      jeotest(message);
    }


    // plant
    else if (message.content.startsWith("!pointsjeo")) {
      pointsjeo(message);
    }

    // Jeopardy question
    else if (message.content.startsWith("!queen")) {
      queen(message);
    }
    

    // xkcd comic
    else if (message.content.startsWith("!xkcd")) {
      xkcd(message);
    }


    // plant
    else if (message.content.startsWith("!plant")) {
      plant(message);
    }

    // bread
    else if (message.content.startsWith("!bread")) {
      bread(message);
    }

      // tarot
      else if (message.content.startsWith("!tarot")) {
        tarot(message);
      }
  


    // redart
    else if (message.content.startsWith("!redart")) {
      redart(message);
    }


  // gen art question
  else if (message.content.startsWith("!newart")) {
    newart(message);
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
    
    // const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'random-artwork.png');

    // message.channel.send(attachment);

    // console.log("sent attachment")

    // var imageDataURL = canvas.toDataURL();

    // console.log(imageDataURL);
    
    // const embed = new Discord.MessageEmbed()
    //   .setTitle("This is a title")
    //   .setImage(imageDataURL)
    //   .setThumbnail(imageDataURL)
    //   message.channel.send(embed) 

    // line
  };
});

// client.login(auth.token);
client.login(auth);