const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require('./config.json');
const auth = process.env.BOT_TOKEN;
// var auth = require('./auth.json');
var artbot = require('./bots/art.js');
var wordbot = require('./bots/word.js');
var heyoo = require('./bots/heyo.js');
var jeo = require('./bots/jeo.js');


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
  };
});

// client.login(auth.token);
client.login(auth);