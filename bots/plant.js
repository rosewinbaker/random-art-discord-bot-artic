const request = require('request');

function plant(message) {

    request('https://trefle.io/api/v1/plants?token=' + TREFLE_TOKEN, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var totalPagesLink = body.links.last
        function getPage(str) {
            return str.split('=')[1];
        }
        

        var totalPageNumber = getPage(totalPagesLink);
        console.log("Total page number: " + totalPageNumber);
        var randomPage = Math.floor(Math.random() * totalPageNumber) + 1;
        console.log("Random page: " + randomPage);
        
        request('https://trefle.io/api/v1/plants?token=' + TREFLE_TOKEN + '&page=' + randomPage, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
        
            function generatePlant() {

                var randomEntry = Math.floor(Math.random() * Math.floor(body.data.length));
                console.log("Plant ID: " + body[randomEntry].data.id);

        };

        generatePlant();
      });
    });
};

module.exports = plant