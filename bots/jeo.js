const request = require('request');

function jeo(message) {

    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        console.log(body.question)
    })

    
}

module.exports = jeo