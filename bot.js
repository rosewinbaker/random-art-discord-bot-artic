require('dotenv').config()
const Discord = require("discord.js")
var jeo = require('./bots/jeo.js')
var jeotest = require('./bots/jeotest.js')
const db = require('./models/index.js')

const client = new Discord.Client()

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

client.login(process.env.CLIENT_TOKEN)
