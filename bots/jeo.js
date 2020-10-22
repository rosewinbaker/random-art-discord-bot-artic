const request = require('request');

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

function jeo(message) {

    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var question = body[0].question
        var answer = titleCase(body[0].answer).replace( /(<([^>]+)>)/ig, '');
        var category = body[0].category.title
        var value = body[0].value
        var catNum = body[0].category.id

        var addMoney;
        var categoryMessage;

        if (value === null) {
            console.log("hey that value is null");
            categoryMessage = "Category is '" + titleCase(category) + "'";
          }
          else {
            addMoney = " for $" + value;
            categoryMessage = "Category is '" + titleCase(category) + "'" + " (#" + catNum + ") " + addMoney;
          }

        message.channel.send(categoryMessage);
        // message.channel.send(question);
        // message.channel.send(answer);

        console.log("Category message: " + categoryMessage);
        console.log("Question: " + question);
        console.log("Answer: " + answer);
        console.log("Category number: " + catNum)

        const filter = message => message.content.includes(answer);
        // const filter = message => message.content.includes("wtf");

        // const filter = response => {
        //     return (answer => answer.toLowerCase() === response.content.toLowerCase());
        // };

        message.channel.send(question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer! ` + answer);
                    console.log(`${collected.first().id} got the correct answer! `)
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time. Correct answer: ' + answer);
                });
            });
    })
}

module.exports = jeo