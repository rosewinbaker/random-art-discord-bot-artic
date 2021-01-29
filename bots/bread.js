const Discord = require("discord.js");
const request = require('request');

function bread(message) {

    request('https://my-bao-server.herokuapp.com/api/breadpuns', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

            console.log(body)

            var breadmessage = '<@' + process.env.P_USER_ID + '> ' + body;

            message.channel.send(breadmessage);
        
      });
};

module.exports = bread