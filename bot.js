const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix } = require('./config.json')
const auth = process.env.BOT_TOKEN
// var auth = require('./auth.json')
var jeo = require('./bots/jeo.js')
var jeotest = require('./bots/jeotest.js')
const db = require('./models/index.js')

client.on("ready", () => {
  console.log("I am ready!")
})

client.on("message", (message) => {
  // Jeopardy question
  if (message.content.startsWith("!j")) {
    jeo(message)
  }

  // Test jeopardy question
  else if (message.content.startsWith("!tj")) {
    jeotest(message)
  }
})

// client.login(auth.token);
client.login(auth)