const { Pool, Client } = require('pg');



function pointsjeo(message) {
    // console.log("No points code working right now. Sorry.")

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        // ssl: {
        //   rejectUnauthorized: false
        // }
      });
      
      client.connect();

      const checkPoints = `
        SELECT *
        FROM jeopardy_test_points
        WHERE userid = 249565807288254474
        `;

    client.query(checkPoints, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }

        message.channel.send(`${message.author}` + ": $" + res.rows[i].points);

        // var numEntries = res.rowCount;
        // console.log("numEntries: " + numEntries)

        // var i;
        // for (i = 0; i < numEntries; i++) {
        // //     var myuser = "'" + res.rows[i].userid + "'"
        // //     const User = client.users.fetch(myuser);
        //     discordMessage = <@! + res.rows[i].userid + > + ":  $" + res.rows[i].points;
        //     console.log(discordMessage);
        //     message.channel.send(discordMessage);


            // const User = client.users.cache.get(res.rows[i].userid); // Getting the user by ID.
            //     if (User) { // Checking if the user exists.
            //         message.channel.send(User.tag) // The user exists.
            //     } else {
            //         message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
            //     };
        //   }
          
        console.log("Response is: " + res.rows[1].userid);

        client.end()
    });

}

module.exports = pointsjeo