var keys = require('./keys');


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});
 
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

var command = process.argv[2];
if(command == "my-tweets"){
	getTweets();
}

var spotify = require('spotify');

function getSongs(){
	spotify.search({ type: 'track', query: 'My search query' }, function(err, data) {
    if ( !error ) {
        //for(var i = 0; i < data.length; i++){
	    	console.log(data[i].text)
	    }
        // console.log('Error occurred: ' + err);
        // return;
    }) 
};

    // Do something with 'data' 

// console.log(process.argv)
// var songChoice = process.argv[3];
// if(songChoice == "spotify-this-song"){
// 	getSongs();
// }