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
                var newAPIlink = "https://trefle.io/" + newAPIend + '?token=' + process.env.TREFLE_TOKEN;
                // common_name
                // scientific_name
                // family_common_name
                // image_url
                // synonyms[]
                // genus
                // family 
                // distributions.native[]

                request(newAPIlink, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    message.channel.send(body.data.scientific_name);

                    const embed = new Discord.MessageEmbed()


                    if (body.data.main_species.image_url === null) {
                        console.log("hey that image_url is null");
                        }
                        else {
                        embed.setImage(body.data.main_species.image_url)
                        }

                    if (body.data.main_species.common_name === null) {
                        console.log("hey that common_name is null");
                        }
                        else {
                        embed.addField("Common Name", body.data.main_species.common_name, true)
                        } 

                    if (body.data.main_species.family_common_name === null) {
                        console.log("hey that family_common_name is null");
                        }
                        else {
                        embed.addField("Family Common Name", body.data.main_species.family_common_name, true)
                        } 

                    if (body.data.main_species.scientific_name === null) {
                        console.log("hey that scientific_name is null");
                        }
                        else {
                        embed.addField("Scientific Name", body.data.main_species.scientific_name, true)
                        } 
                    
                    if (body.data.main_species.genus === null) {
                        console.log("hey that genus is null");
                        }
                        else {
                        embed.addField("Genus", body.data.main_species.genus, true)
                        } 

                    if (body.data.main_species.family === null) {
                        console.log("hey that family is null");
                        }
                        else {
                        embed.addField("Family", body.data.main_species.family, true)
                        } 

                        message.channel.send({embed});

            });

        };

        generatePlant();
      });
    });
};

module.exports = plant