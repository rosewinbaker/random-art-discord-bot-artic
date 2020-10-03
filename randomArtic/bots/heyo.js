function heyoo() {

    const args = message.content.slice(prefix.length).trim().split(' ');
    console.log("Args: " + args);

    // const searchStuff = args.shift().toLowerCase();
    // console.log("Search stuff: " + searchStuff);

    console.log("Arg 1: " + args[0]);
    message.channel.send("Searching for: " + args);

    bookRequestURL = "https://www.googleapis.com/books/v1/volumes?q="
    for (let i=0; i < args.length; i++) {
      bookRequestURL += "+" + args[i];
      console.log(bookRequestURL);
    };

    request(bookRequestURL, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }



        // const filter = (reaction, user) => {
        //   return reaction.emoji.name === ':thumbsup:';
        // };
        
        // const collector = message.createReactionCollector(filter, { time: 15000 });
        
        // collector.on('collect', (reaction, user) => {
        //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        // });
        
        // collector.on('end', collected => {
        //   console.log(`Collected ${collected.size} items`);
        // });




        // message.react('👍').then(() => message.react('👎'));

        // const filter = (reaction, user) => {
        //   return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        // };
        
        // message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        //   .then(collected => {
        //     const reaction = collected.first();
        
        //     if (reaction.emoji.name === '👍') {
        //       message.reply('you reacted with a thumbs up.');
        //     } else {
        //       message.reply('you reacted with a thumbs down.');
        //     }
        //   })
        //   .catch(collected => {
        //     message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
        //   });


        
          message.react('👍').then(r => {
            message.react('👎');
           });

           // First argument is a filter function
          message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
            { max: 1, time: 30000 }).then(collected => {
              if (collected.first().emoji.name == '👍') {
                      message.reply('You replied thumbs up');
              }
              else
                  message.reply('not a thumbs up');
            }).catch(() => {
                    message.reply('No reaction after 30 seconds, operation canceled');
            });


          var bookObj = {
  
          };

        // message.channel.send("wow");
        console.log(body.items[0].volumeInfo.title);

          // Switch to embedded format
          const embed = new Discord.MessageEmbed();
          
          // var bookTitle = body.items[0].volumeInfo.title;
          // var bookAuthor = body.items[0].volumeInfo.authors[0];
          // var bookDescription = body.items[0].volumeInfo.description;
          // var bookDescriptionSubstring = bookDescription.substring(0, 1023);
          // var bookPages = body.items[0].volumeInfo.pageCount;
          
          try {
            var bookTitle = body.items[0].volumeInfo.title;
            embed.addField("Title", bookTitle);
            bookObj.title = bookTitle;
          }
          catch {
            console.log("error adding bookTitle");
          };

          try {
            var bookAuthor = body.items[0].volumeInfo.authors[0];
            embed.addField("Author", bookAuthor);
            bookObj.author = bookAuthor;
          }
          catch {
            console.log("error adding bookAuthor");
          };

          try {
            var bookDescription = body.items[0].volumeInfo.description;
            var bookDescriptionSubstring = bookDescription.substring(0, 1023);
            embed.addField("Description", bookDescriptionSubstring);
            bookObj.description = bookDescription;
          }
          catch {
            console.log("error adding description");
          };

          try {
            var bookPages = body.items[0].volumeInfo.pageCount;
            embed.addField("# of pages", bookPages);
            bookObj.pages = bookPages;
          }
          catch {
            console.log("error adding pageCount");
          };

          try {
            bookImageURL = body.items[0].volumeInfo.imageLinks.thumbnail
            embed.setImage(bookImageURL);
            bookObj.image = bookImageURL;
          }
          catch {
            console.log("oops couldn't do the image");
          };



          // embed.addField("Title", bookTitle);
          // embed.addField("Author", bookAuthor);
          // embed.addField("Description", bookDescriptionSubstring);
          // embed.addField("# of pages", bookPages);

          // embed.setImage(body.items[0].volumeInfo.imageLinks.thumbnail);

          fs.writeFileSync('./data.json', JSON.stringify(bookObj));
          message.channel.send({embed});
      });
}

module.exports = heyoo