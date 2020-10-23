const request = require('request');

function meow(message) {

    request('https://api.thecatapi.com/v1/images/search', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        
        function generateCat() {
        
          var randomCat = body.url

          message.channel.send(randomCat);

        };

        generateCat();
      });
};

module.exports = meow