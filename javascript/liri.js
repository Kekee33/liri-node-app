var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var omdb = require('omdb');
var fs = require("fs");

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});

var command = process.argv[2];
var search = process.argv[3];

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

var omdbQuery = keys.omdb.apiKey;
 
switch(command) {
	default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
  
    case "my-tweets":
    getTweets();
    break;

    case "spotify-this-song":
    getSongs(search);
    break;

    case "movie-this":
    myMovie();
    break;
    case "do-what-it-says":
    randomPick();
    break;
}

function getTweets(){
	var params = {screen_name: 'Lauren_Daigle', count: 20};
	client.get('statuses/user_timeline', params, function(error, data, response) {
	  if (!error) {
	    for(var i = 0; i < data.length; i++){
	    	console.log(data[i].text);
	    }
	   }
	});
}

//Function for pulling in artist, song name, link to song and album with song via Spotify
// function getSongs(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
       
        console.log("Artist: " + songData.artists[0].name);
        console.log("Song: " + songData.name);
        console.log("Preview URL: " + songData.preview_url);
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");

            var error = function(err) {
              if ( err ) throw err;
              console.log('data appended');
        };
        
        fs.appendFile('log.txt', songData.artists[0].name);
        fs.appendFile('log.txt', songData.name);
        fs.appendFile('log.txt', songData.preview_url);
        fs.appendFile('log.txt', songData.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}
// function randomPick(){
//   fs.readFile('random.txt', "utf8", function(error, data){
//     var txt = data.split(',');
   
//   });
// }

// function myMovie(movie){
//   var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

//   request(omdbURL, function (error, response, body){
//     if(!error && response.statusCode == 200){
//       var body = JSON.parse(body);

//       console.log("Title: " + body.Title);
//       console.log("Release Year: " + body.Year);
//       console.log("IMdB Rating: " + body.imdbRating);
//       console.log("Country: " + body.Country);
//       console.log("Language: " + body.Language);
//       console.log("Plot: " + body.Plot);
//       console.log("Actors: " + body.Actors);
//       console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
//       console.log("Rotten Tomatoes URL: " + body.tomatoURL);

//       //adds text to log.txt
//       fs.appendFile('log.txt', "Title: " + body.Title);
//       fs.appendFile('log.txt', "Release Year: " + body.Year);
//       fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
//       fs.appendFile('log.txt', "Country: " + body.Country);
//       fs.appendFile('log.txt', "Language: " + body.Language);
//       fs.appendFile('log.txt', "Plot: " + body.Plot);
//       fs.appendFile('log.txt', "Actors: " + body.Actors);
//       fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
//       fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

//     } else{
//       console.log('Error occurred.')
//     }
//     if(movie === "Mr. Nobody"){
//       console.log("-----------------------");
//       console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
//       console.log("It's on Netflix!");

//       //adds text to log.txt
//       fs.appendFile('log.txt', "-----------------------");
//       fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
//       fs.appendFile('log.txt', "It's on Netflix!");
//     }
//   });

// }


