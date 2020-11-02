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
            const User = client.users.fetch(res.rows[i].userid);
            discordMessage = User + ":  $" + res.rows[i].points;
            console.log(discordMessage);
            message.channel.send(discordMessage);
          }
          
        console.log("Response is: " + res.rows[1].userid);

        client.end()
    });

}

module.exports = pointsjeo