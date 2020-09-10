const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require('./config.json');
// var auth = require('./auth.json');
const auth = process.env.BOT_TOKEN;
const request = require('request');

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {

  if (message.content.startsWith("!fart")){

    // see how many results there are in total, then pick a random number to build the URL for next API request
    request('https://api.artic.edu/api/v1/artworks?limit=1&page=1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var totalArt = body.pagination.total_pages

        var randomArtNum = Math.floor(Math.random() * totalArt) + 1;
        console.log(randomArtNum)
        newURL = "https://api.artic.edu/api/v1/artworks?limit=1&page=" + randomArtNum
        console.log(newURL)

        generateRandomImage(newURL)
      });

      // generate the random API request and include any relevant fields that exist
      function generateRandomImage(newURL) {
        request(newURL, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }

            if (body.data[0].is_public_domain === true) {

            console.log(body.data[0].id);
            //message.channel.send("Artwork id: " + body.data[0].id);
            
            const embed = new Discord.MessageEmbed()

            .setImage("https://www.artic.edu/iiif/2/" + body.data[0].image_id + "/full/843,/0/default.jpg")
            .setColor(0x00AE86)

            if (body.data[0].title === null) {
              console.log("hey that title is null");
            }
            else {
              embed.addField("Title", body.data[0].title)
            }

            if (body.data[0].title === null) {
              console.log("hey that artist_display is null");
            }
            else {
              embed.addField("Artist", body.data[0].artist_display)
            }

            if (body.data[0].date_display === null) {
              console.log("hey that date_display is null");
            }
            else {
              embed.addField("Date", body.data[0].date_display, true)
            }

            if (body.data[0].medium_display === null) {
              console.log("hey that medium_display is null");
            }
            else {
              embed.addField("Medium", body.data[0].medium_display, true)
            }

            if (body.data[0].description === null) {
              console.log("hey that description is null");
            }
            else {
              embed.addField("Description", body.data[0].description)
            }

            if (body.data[0].credit_line === null) {
              console.log("hey that credit_line is null");
            }
            else {
              embed.addField("Credit", body.data[0].credit_line)
            }

            if (body.data[0].provenance_text === null) {
              console.log("hey that provenance_text is null");
            }
            else {
              console.log("Provenance", body.data[0].provenance_text, true)
            }
            
            message.channel.send({embed});
            }

            else {
              console.log('do you see this message?');
              message.channel.send("Whoops.. looks like that image isn't in the public domain. Eventually you will not see this message. In the meantime, let me try that again for you:")
              message.channel.send("!fart");
            };
          });
      };
  }

  // Generate a random poem
  else if (message.content.startsWith("!word")) {

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
   }

  // Generate a random poem
  else if (message.content.startsWith(prefix)) {

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



        const filter = (reaction, user) => {
          return reaction.emoji.name === ':thumbsup:';
        };
        
        const collector = message.createReactionCollector(filter, { time: 15000 });
        
        collector.on('collect', (reaction, user) => {
          console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        collector.on('end', collected => {
          console.log(`Collected ${collected.size} items`);
        });




        // message.channel.send("wow");
        console.log(body.items[0].volumeInfo.title);

          // Switch to embedded format
          const embed = new Discord.MessageEmbed();
          
          // var bookTitle = body.items[0].volumeInfo.title;
          // var bookAuthor = body.items[0].volumeInfo.authors[0];
          // var bookDescription = body.items[0].volumeInfo.description;
          // var bookDescriptionSubstring = bookDescription.substring(0, 1023);
          // var bookPages = body.items[0].volumeInfo.pageCount;

          if (body.items[0].volumeInfo.title === null) {
            console.log("hey that bookTitle is null");
          }
          else {
            var bookTitle = body.items[0].volumeInfo.title;
            embed.addField("Title", bookTitle);
          };

          if (body.items[0].volumeInfo.authors[0] === null) {
            console.log("hey that bookAuthor is null");
          }
          else {
            var bookAuthor = body.items[0].volumeInfo.authors[0];
            embed.addField("Author", bookAuthor);
          };

          if (body.items[0].volumeInfo.description === null) {
            console.log("hey that description is null");
          }
          else {
            var bookDescription = body.items[0].volumeInfo.description;
            var bookDescriptionSubstring = bookDescription.substring(0, 1023);
            embed.addField("Description", bookDescriptionSubstring);
          };

          if (body.items[0].volumeInfo.pageCount === null) {
            console.log("hey that pageCount is null");
          }
          else {
            var bookPages = body.items[0].volumeInfo.pageCount;
            embed.addField("# of pages", bookPages);
          };

          try {
            if (body.items[0].volumeInfo.imageLinks === null) {
              console.log("hey that imageLinks is null");
            }
            else {
              embed.setImage(body.items[0].volumeInfo.imageLinks.thumbnail);
            };
          }
          catch {
            console.log("oops couldn't do the image");
          }



          // embed.addField("Title", bookTitle);
          // embed.addField("Author", bookAuthor);
          // embed.addField("Description", bookDescriptionSubstring);
          // embed.addField("# of pages", bookPages);

          // embed.setImage(body.items[0].volumeInfo.imageLinks.thumbnail);

          message.channel.send({embed});
      });
   };
   
});

// client.login(auth.token);
client.login(auth);