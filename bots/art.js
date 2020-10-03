const Discord = require("discord.js");
const request = require('request');

function art() {
    // see how many results there are in total, then pick a random number to build the URL for next API request
    request('https://api.artic.edu/api/v1/artworks?limit=1&page=1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var totalArt = body.pagination.total_pages

        var randomArtNum = Math.floor(Math.random() * totalArt) + 1;
        console.log(randomArtNum)
        newURL = "https://api.artic.edu/api/v1/artworks?limit=1&page=" + randomArtNum
        console.log(newURL)

        generateRandomImage(newURL)
      });

      // generate the random API request and include any relevant fields that exist
      function generateRandomImage(newURL) {
        request(newURL, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }

            if (body.data[0].is_public_domain === true) {

            console.log(body.data[0].id);
            //message.channel.send("Artwork id: " + body.data[0].id);
            
            const embed = new Discord.MessageEmbed()

            .setImage("https://www.artic.edu/iiif/2/" + body.data[0].image_id + "/full/843,/0/default.jpg")
            .setColor(0x00AE86)

            if (body.data[0].title === null) {
              console.log("hey that title is null");
            }
            else {
              embed.addField("Title", body.data[0].title)
            }

            if (body.data[0].title === null) {
              console.log("hey that artist_display is null");
            }
            else {
              embed.addField("Artist", body.data[0].artist_display)
            }

            if (body.data[0].date_display === null) {
              console.log("hey that date_display is null");
            }
            else {
              embed.addField("Date", body.data[0].date_display, true)
            }

            if (body.data[0].medium_display === null) {
              console.log("hey that medium_display is null");
            }
            else {
              embed.addField("Medium", body.data[0].medium_display, true)
            }

            if (body.data[0].description === null) {
              console.log("hey that description is null");
            }
            else {
              embed.addField("Description", body.data[0].description)
            }

            if (body.data[0].credit_line === null) {
              console.log("hey that credit_line is null");
            }
            else {
              embed.addField("Credit", body.data[0].credit_line)
            }

            if (body.data[0].provenance_text === null) {
              console.log("hey that provenance_text is null");
            }
            else {
              console.log("Provenance", body.data[0].provenance_text, true)
            }
            
            message.channel.send({embed});
            }

            else {
              console.log('do you see this message?');
              message.channel.send("Whoops.. looks like that image isn't in the public domain. Eventually you will not see this message. In the meantime, let me try that again for you:")
              message.channel.send("!fart");
            };
          });
      };
};

module.exports = art