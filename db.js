const { Client } = require('pg');

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.DATABASE_URL ? true : false
// })


function jeotest(message) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
  });
  
  client.connect();
  
  const query = `
  INSERT INTO users (userid, points)
  VALUES ('249565807288254474', 600)
  `;
  
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data was inserted successfully');
    client.end();
  });
}

module.exports = jeotest