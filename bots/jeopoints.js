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

        client.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            else {
                console.log(res.rows[0]);
            }
            
            

        })

      client.end();
}

module.exports = pointsjeo