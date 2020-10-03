const request = require('request');

function jeo(message) {

    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var question = body[0].question
        var answer = body[0].answer
        var category = body[0].category.title
        var value = body[0].value

        var addMoney;

        if (value === null) {
            console.log("hey that value is null");
          }
          else {
            addMoney = " for $" + value;
          }

        message.channel.send("Category is " + category + addMoney);
        message.channel.send(question);
        message.channel.send(answer);
    })

    
}

module.exports = jeo