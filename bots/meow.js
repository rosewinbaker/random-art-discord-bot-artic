const request = require('request');

function meow(message) {

    request('https://api.thecatapi.com/v1/images/search', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        
        function generateCat() {

            console.log(body[0].url)
            
            var randomCat = body[0].url

            message.channel.send(randomCat);

        };

        generateCat();
      });
};

module.exports = meow