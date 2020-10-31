var request = require('superagent');

var clientID = '92cd77a685cbdac58406',
    clientSecret = '202abd50e2b0c7d19fbeee6cfb4ecf47',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
    xappToken;

request
  .post(apiUrl)
  .send({ client_id: clientID, client_secret: clientSecret })
  .end(function(res) {
    xappToken = res.body.token; 
  });