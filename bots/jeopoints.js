const { Client } = require('pg');

function pointsjeo(message) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        // ssl: {
        //   rejectUnauthorized: false
        // }
      });
      
      client.connect();

      const query = `
            SELECT * FROM jeopardy_test_points;
        `;

        await client.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log(res);

        })

      client.end();
}

module.exports = pointsjeo