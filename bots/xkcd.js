const request = require('request');

function xkcd(message) {

    var randomComic = Math.floor(Math.random() * Math.floor(2375));

    request('http://xkcd.com/' + randomComic + '/info.0.json', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }



        
        function generateComic() {

            console.log(body.title)
            console.log(body.img)
            
            var comicURL = body.img

            var date = body.day + "/" + body.month + "/" + body.year

            const embed = new Discord.MessageEmbed()

            .setTitle(body.title)
            .setImage(comicURL)
            .setDescription('Originally published ' + date)

            message.channel.send({embed});

        };

        generateComic();
      });
};

module.exports = xkcd