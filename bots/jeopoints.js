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
        `;

    client.query(checkPoints, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }

        var numEntries = res.rowCount;
        console.log("numEntries: " + numEntries)

        var i;
        for (i = 0; i < numEntries; i++) {
            discordMessage = res.rows[i].userid + " has " + res.rows[i].points + " points. Nice, dude."
            console.log(discordMessage);
            message.channel.send(discordMessage);
          }
          
        console.log("Response is: " + res.rows[1].userid);

        client.end()
    });

}

module.exports = pointsjeo