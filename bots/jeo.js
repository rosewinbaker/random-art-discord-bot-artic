const request = require('request');
const Discord = require("discord.js");


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

function jeo(message) {

    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var question = body[0].question
        var answer = titleCase(body[0].answer).replace( /(<([^>]+)>)/ig, '');
        var category = body[0].category.title
        var value = body[0].value
        var catNum = body[0].category.id
        var qID = body[0].id
        var airDate = body[0].airdate

        var addMoney;
        var categoryMessage;

        date = new Date(airDate);
        year = date.getFullYear();
        month = date.getMonth()+1;
        dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        finalAirDate = (year+'-' + month + '-'+dt)

        if (value === null) {
            console.log("hey that value is null");
            categoryMessage = "Category is '" + titleCase(category) + "'";
          }
          else {
            addMoney = " for $" + value;
            categoryMessage = "Category is '" + titleCase(category) + "'" + addMoney;
          }

          const exampleEmbed = new Discord.MessageEmbed()
            .setTitle(categoryMessage)
            .setURL('https://discord.js.org/')
            .setDescription(question)
            .addFields(
                { name: 'Airdate', value: finalAirDate, inline: true },
                { name: 'Category ID', value: catNum, inline: true },
                { name: 'Q ID', value: qID, inline: true },
            )

        // channel.send(exampleEmbed);

   


        const { createCanvas, loadImage } = require('canvas')
        const canvas = createCanvas(500, 500)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#060CE9';
        ctx.fillRect(0, 0, canvas.width, canvas.length);


            // Pass the entire Canvas object because you'll need to access its width, as well its context
            const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');

            // Declare a base size of the font
            let fontSize = 70;

            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);

            // Return the result to use in the actual canvas
            return ctx.font;
        };

        	// Assign the decided font to the canvas
        ctx.font = applyText(canvas, question);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(question, canvas.width / 2.5, canvas.height / 1.8);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'jeopardy.png');

        message.channel.send(attachment);


        // message.channel.send(categoryMessage + " - originally aired " + finalAirDate);
        // message.channel.send(question);
        // message.channel.send(answer);

        console.log("Category message: " + categoryMessage);
        console.log("Question: " + question);
        console.log("Answer: " + answer);
        console.log("Category number: " + catNum)
        console.log("Airdate: " + airDate)

        const filter = message => message.content.includes(answer);
        // const filter = message => message.content.includes("wtf");

        // const filter = response => {
        //     return (answer => answer.toLowerCase() === response.content.toLowerCase());
        // };

        message.channel.send(exampleEmbed).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer! ` + answer);
                    console.log(`${collected.first().author.id} got the correct answer! `)
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. Correct answer: ' + answer);
                    message.channel.send("Here's a cute cat for your troubles: ");
                    message.channel.send("!meow");
                });
            });
    })
}

module.exports = jeo