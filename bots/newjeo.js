const { Client } = require('pg')
const request = require('request')
const Discord = require("discord.js")
const utils = require('../myUtils')
const discordUtils = require('../helpers/discordHelpers')


// Define jeo function that's called with "!jeo"
function newjeo(message) {

    const questionData = utils.getJeopardyQuestion() 
    console.log("question data: ", questionData)
    
    const embedMessage = discordUtils.makeEmbedQuestion(questionData)
    // message.channel.send(embedMessage)
}

module.exports = newjeo