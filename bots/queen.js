const Discord = require("discord.js");
const request = require('request');

function queen(message) {

    request('http://www.nokeynoshade.party/api/queens/all', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        
        function generateQueen() {

          const embed = new Discord.MessageEmbed();

          var randomQueen = Math.floor(Math.random() * Math.floor(body.length));
          console.log(body[randomQueen].name);

          var name = body[randomQueen].name;
          var quote = body[randomQueen].quote;
          var image_url = body[randomQueen].image_url;
  
          embed.setTitle(name);
          embed.setDescription(quote);
          embed.setImage(image_url);

          message.channel.send({embed});
        };

        generateQueen();
      });
};

module.exports = queen