const Discord = require("discord.js");
const request = require('request');

function tarot(message) {

    request('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

          const embed = new Discord.MessageEmbed();

          var name = body.cards[0].name;
          var type = body.cards[0].type;
          var meaningUp = body.cards[0].meaning_up;
          var meaningRev = body.cards[0].meaning_rev;
          var desc = body.cards[0].desc;

          console.log("Name: " + name)
          console.log("Description: " + desc)

        //   msg.reply("You picked the " + name + ": " + desc);
        //   msg.channel.send("Meaning: " + meaningUp)
        //   msg.channel.send("Meaning Reverse: " + meaningRev)
  
          embed.setTitle(name);
          embed.setDescription(desc);
          embed.addFields(
            { name: 'Type', value: type},
            { name: 'Meaning Up', value: meaningUp},
            { name: 'Meaning Reverse', value: meaningRev},
        )

          message.channel.send({embed});

      });
};

module.exports = tarot