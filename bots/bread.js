const Discord = require("discord.js");
const request = require('request');

function bread(message) {

    request('https://my-bao-server.herokuapp.com/api/breadpuns', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

            console.log(body)

            var breadmessage = body;

            message.channel.send(breadmessage);
        
      });
};

module.exports = bread