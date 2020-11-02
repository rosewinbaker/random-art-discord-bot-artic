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

        console.log("Response is: " + res.row[1].userid);

        client.end()
    });

}

module.exports = pointsjeo