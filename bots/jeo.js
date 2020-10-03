const request = require('request');

function jeo(message) {

    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var question = body[0].question
        var answer = body[0].answer

        message.channel.send(question);
        message.channel.send(answer);
    })

    
}

module.exports = jeo