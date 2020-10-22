const { Client } = require('pg');

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.DATABASE_URL ? true : false
// })

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
  });

  
client.connect();

const query = `
INSERT INTO users (userid, points)
VALUES ('249565807288254476', 601)
`;

client.query(query, (err, res) => {
if (err) {
    console.error(err);
    return;
}
console.log(res);
client.end();
});
