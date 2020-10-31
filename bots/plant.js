const request = require('request');
const Discord = require("discord.js");

function plant(message) {

    request('https://trefle.io/api/v1/plants?token=' + process.env.TREFLE_TOKEN, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var totalPagesLink = body.links.last
        function getPage(str) {
            return str.split('=')[1];
        }
        

        var totalPageNumber = getPage(totalPagesLink);
        console.log("Total page number: " + totalPageNumber);
        var randomPage = Math.floor(Math.random() * totalPageNumber) + 1;
        console.log("Random page: " + randomPage);
        
        request('https://trefle.io/api/v1/plants?token=' + process.env.TREFLE_TOKEN + '&page=' + randomPage, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
        
            function generatePlant() {

                var randomEntry = Math.floor(Math.random() * Math.floor(body.data.length));
                console.log("Random entry: " + randomEntry);
                console.log("Plant ID: " + body.data[randomEntry].id);

                var newAPIend = body.data[randomEntry].links.plant;
                console.log(newAPIend);
                var newAPIlink = "https://trefle.io/" + newAPIend + '?token=' + process.end.TREFLE_TOKEN;
                // common_name
                // scientific_name
                // family_common_name
                // image_url
                // synonyms[]
                // genus
                // family 

                request(newAPIlink, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    message.channel.send(body.data.scientific_name);

            });

        };

        generatePlant();
      });
    });
};

module.exports = plant