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

        client.end()
    });

}

module.exports = pointsjeo