function word() {

    request('https://www.poemist.com/api/v1/randompoems', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        
        function generatePoem() {

          var randomEntry = Math.floor(Math.random() * Math.floor(5));
          console.log(body[randomEntry].title);

          var poemTitle = body[randomEntry].title;
          var poemPoet = body[randomEntry].poet.name;
          var poemContent = body[randomEntry].content;
          var poemURL = body[randomEntry].url;

          message.channel.send(poemTitle + "\n" + "by " + poemPoet + "\n\n" + poemContent + "\n\n" + poemURL);


          // // Switch to embedded format
          // const embed = new Discord.MessageEmbed();

          // var randomEntry = Math.floor(Math.random() * Math.floor(5));
          // console.log(body[randomEntry].title);

          
          // var poemTitle = body[randomEntry].title;
          // var poemPoet = body[randomEntry].poet.name;
          // var poemContent = body[randomEntry].content;
          // var poemURL = body[randomEntry].url;
  
          // embed.addField("Title", poemTitle);
          // embed.addField("Poet", poemPoet);
          // embed.addField("Content", poemContent);
          // embed.addField("URL", poemURL);

          // message.channel.send({embed});
        };

        generatePoem();
      });
};

module.exports = word