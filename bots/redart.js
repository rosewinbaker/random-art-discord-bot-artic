const Discord = require("discord.js");
const request = require('request');

function redart(message) {

    request('https://www.reddit.com/r/generative/top.json?limit=100&t=all', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        function generateEntry() {

            var totalEntries = body.data.dist;
            var randomEntry = Math.floor(Math.random() * Math.floor(totalEntries));
            console.log("Entry #: " + randomEntry)

            // const embed = new Discord.MessageEmbed();

            var name = body.data.children[randomEntry].data.title;
            var url = body.data.children[randomEntry].data.url_overridden_by_dest;

            console.log("Name: " + name)
            console.log("URL: " + url)
    
            // embed.setTitle(name);
            // embed.setDescription(quote);
            // embed.setImage(image_url);
  
            // message.channel.send({embed});

            message.channel.send(url)
        }

        generateEntry();
        
      });
};

module.exports = redart