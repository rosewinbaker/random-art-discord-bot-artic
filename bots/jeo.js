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
        var answer = body[0].answer
        var category = body[0].category.title
        var value = body[0].value

        var addMoney;
        var categoryMessage;

        if (value === null) {
            console.log("hey that value is null");
            categoryMessage = "Category is " + titleCase(category);
          }
          else {
            addMoney = " for $" + value;
            categoryMessage = "Category is " + titleCase(category) + addMoney;
          }

        message.channel.send(categoryMessage);
        message.channel.send(question);
        message.channel.send(titleCase(answer));
    })

    
}

module.exports = jeo