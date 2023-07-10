const Discord = require("discord.js")

function makeEmbedQuestion(questionData) {

    console.log("hey we're embedding")
    console.log(questionData)

    // const embedMessage = new Discord.MessageEmbed()
    // .setTitle(questionData.question)
    // .setDescription(questionData.categoryMessage)
    // .addFields(
    //   { name: "Airdateeeeee", value: questionData.finalAirDate, inline: true },
    //   { name: "Category ID", value: questionData.catNum, inline: true },
    //   { name: "Q ID", value: questionData.qID, inline: true }
    // )  
    
    return embedMessage
}


module.exports = { makeEmbedQuestion }