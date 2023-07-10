require('dotenv').config()
const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix } = require('./config.json')
// var auth = require('./auth.json')
var jeo = require('./bots/jeo.js')
var jeotest = require('./bots/jeotest.js')
const db = require('./models/index.js')

client.on("ready", () => {
  console.log("I am ready!")
})

client.on("message", (message) => {
  // Jeopardy question
  if (message.content.startsWith("!jeo")) {
    jeo(message)
  }

  // Test jeopardy question
  else if (message.content.startsWith("!tj")) {
    jeotest(message)
  }
})

// console.log(auth)
// console.log(ARTIC_BOT_TOKEN)
// client.login(auth.token)
// client.login(auth)
client.login(process.env.CLIENT_TOKEN)
