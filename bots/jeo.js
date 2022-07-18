const { Client } = require('pg');
const request = require('request');
const Discord = require("discord.js");

// Define titleCase for later use
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }


// Define jeo function that's called with "!jeo"
function jeo(message) {

    // Make request to jService API for random question
    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var question = body[0].question
        // var answer = titleCase(body[0].answer).replace( /(<([^>]+)>)/ig, '');
        var cleananswer = (body[0].answer).replace(/(<([^>]+)>)/gi, "");
        var answer = cleananswer.toLowerCase();
        var category = body[0].category.title
        var value = body[0].value
        var catNum = body[0].category.id
        var qID = body[0].id;
        var airDate = body[0].airdate;

        var addMoney;
        var categoryMessage;

        // Format date info to look pretty
        date = new Date(airDate);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();
        
            if (dt < 10) {
                dt = "0" + dt;
            }
            if (month < 10) {
                month = "0" + month;
            }
        
            finalAirDate = year + "-" + month + "-" + dt;


        // Check to see if value is null. If not, add that money information to categoryMessage
        if (value === null) {
            console.log("Category value is null");
            categoryMessage = "Category is '" + titleCase(category) + "'";
          }
          else {
            addMoney = " for $" + value;
            categoryMessage = "Category is '" + titleCase(category) + "'" + " (#" + catNum + ") " + addMoney;
          }

        console.log("Category message: " + categoryMessage);
        console.log("Question: " + question);
        console.log("Answer: " + answer);
        console.log("Category number: " + catNum)

        // Build embedded message
        const exampleEmbed = new Discord.MessageEmbed()
          .setTitle(question)
          .setDescription(categoryMessage)
          .addFields(
            { name: "Airdate", value: finalAirDate, inline: true },
            { name: "Category ID", value: catNum, inline: true },
            { name: "Q ID", value: qID, inline: true }
          );

        // Define a filter for correct answer 
        const filter = message => message.content.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(answer);

        // Send the embdedded message and check for message that match our filter
        message.channel.send(exampleEmbed).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })

                // Win condition
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer! ` + answer);
                    message.channel.send(`${value} to ${collected.first().author}. You go, ${collected.first().author}!`)
                    console.log(`${collected.first().author.id} got the correct answer! `)

                    // Start a connection to psql database
                    const client = new Client({
                        connectionString: process.env.DATABASE_URL,
                        // ssl: {
                        //   rejectUnauthorized: false
                        // }
                      });
                      
                      client.connect();

                      // Check to see if user exists
                      const checkUser = `
                        SELECT *
                        FROM jeopardy_test_points
                        WHERE userid = ${collected.first().author.id}
                        `;

                    client.query(checkUser, (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        console.log("Row count is: " + res.rowCount);

                        // If user exists, add posts to existing user entry
                        if (res.rowCount == 1) {
                            console.log("User exists. Updating table with points.")
                            const query = `
                                UPDATE jeopardy_test_points SET points = points + ${value} WHERE userid = ${collected.first().author.id};
                            `;
                            client.query(query, (err, res) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                
                                console.log(res);
    
                            })
                            
                        }

                        // If this is a new user, add a new entry for them
                        else {
                            console.log("Did not find existing user. Adding new user entry now for " + `${collected.first().author.id}`)
                            const query = `
                                INSERT INTO jeopardy_test_points (userid, points)
                                VALUES (${collected.first().author.id}, ${value})
                            `;
                            client.query(query, (err, res) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                
                                console.log(res);
    
                            })
                        }

                        client.end();
                      }); 
                      
                })

                // Lose condition. Better luck next time.
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. Correct answer: ' + answer);
                    console.log("No winner");
                });
            });
    })
}

module.exports = jeo