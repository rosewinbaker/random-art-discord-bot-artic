const { Client } = require('pg');
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

        if (value === null) {
            console.log("hey that value is null");
            categoryMessage = "Category is '" + titleCase(category) + "'";
          }
          else {
            addMoney = " for $" + value;
            categoryMessage = "Category is '" + titleCase(category) + "'" + " (#" + catNum + ") " + addMoney;
          }

        // message.channel.send(categoryMessage);
        // message.channel.send(question);
        // message.channel.send(answer);

        console.log("Category message: " + categoryMessage);
        console.log("Question: " + question);
        console.log("Answer: " + answer);
        console.log("Category number: " + catNum)


        const exampleEmbed = new Discord.MessageEmbed()
          .setTitle(question)
          .setURL("https://discord.js.org/")
          .setDescription(categoryMessage)
          .addFields(
            { name: "Airdate", value: finalAirDate, inline: true },
            { name: "Category ID", value: catNum, inline: true },
            { name: "Q ID", value: qID, inline: true }
          );

        const filter = message => message.content.includes(answer);
        // const filter = message => message.content.includes("wtf");

        // const filter = response => {
        //     return (answer => answer.toLowerCase() === response.content.toLowerCase());
        // };

        message.channel.send(exampleEmbed).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer! ` + answer);
                    message.channel.send(`${value} to ${collected.first().author}. You go, ${collected.first().author}!`)
                    console.log(`${collected.first().author.id} got the correct answer! `)

                    const client = new Client({
                        connectionString: process.env.DATABASE_URL,
                        // ssl: {
                        //   rejectUnauthorized: false
                        // }
                      });
                      
                      client.connect();

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
                      
                    //   const query = `
                    //   INSERT INTO jeopardy_test_points (userid, points)
                    //   VALUES (${collected.first().author.id}, ${value})
                    //   `;
                      
                    //   client.query(query, (err, res) => {
                    //     if (err) {
                    //         console.error(err);
                    //         return;
                    //     }
                    //     console.log('Data was inserted successfully');
                    //     client.end();
                    //   });



                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. Correct answer: ' + answer);
                });
            });
    })
}

module.exports = jeo