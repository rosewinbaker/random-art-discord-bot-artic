const { Pool, Client } = require('pg');

function pointsjeo(message) {
    const pool = new Pool()

    pool.query('SELECT * FROM jeopardy_test_points', [1], (err, res) => {
        if (err) {
          throw err
        }
        console.log('user:', res.rows[0])
      })


    console.log('calling end')
    pool.end()
    console.log('pool has drained')



    // const client = new Client({
    //     connectionString: process.env.DATABASE_URL,
    //     // ssl: {
    //     //   rejectUnauthorized: false
    //     // }
    //   });
      
    //   client.connect();

    //   const query = `
    //         SELECT * FROM jeopardy_test_points;
    //     `;

    //     // client.query(query, (err, res) => {
    //     //     if (err) {
    //     //         console.error(err);
    //     //         return;
    //     //     }
    //     //     else {
    //     //         console.log(res.rows[0]);
    //     //     }

    //         // async/await
    //     // try {
    //     //     const res = await client.query(query)
    //     //     console.log(res.rows[0])
    //     //     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    //     // } catch (err) {
    //     //     console.log(err.stack)
    //     // }

    //     client
    //         .query(query)
    //         .then(res => {
    //             console.log(res.rows[0])
    //             // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    //         })
    //         .catch(e => console.error(e.stack))
            
            

    //     // })

    //   client.end();
}

module.exports = pointsjeo