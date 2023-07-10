require('dotenv').config()
const Discord = require("discord.js")
// const client = new Discord.Client()
var newjeo = require('./bots/newjeo.js')

client.on("ready", () => {
  console.log("I am ready!")
})

client.on("message", (message) => {
  // Jeopardy question
  if (message.content.startsWith("!newjeo")) {
    newjeo(message)
  }

  // Test jeopardy question
  else if (message.content.startsWith("!tj")) {
    jeotest(message)
  }
})

// client.login(process.env.CLIENT_TOKEN)
