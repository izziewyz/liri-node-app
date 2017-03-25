// Load the fs package to read and write
var fs = require("fs");
var tkeys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");

var client = new Twitter({
  consumer_key: 'mwnhuPWgujBRyyzg1Eo140fjk',
  consumer_secret: 'WDaEtQli5u8CtJIQRJGzMFRt7rutD1twiAAZzrUlS7KmE2YtSB',
  access_token_key: '238879737-hMZZPW7qrMXJRjmj1YF9wLkIy5qRcwesFz2GquHB',
  access_token_secret: 'BYLuP2rHphjEUH5B8VlzpOpN5olFciLY4ToHLW7D7S9rd',
});


// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    mytweets();
    break;

  case "spotify-this-song":
    spotifythissong();
    break;

  case "movie-this":
    moviethis();
    break;

  case "do-what-it-says":
    dowhatitsays();
    break;
}

// If the "total" function is called...
function mytweets() {
	//console.log(client);

var params = {screen_name: ''};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
}

// If the "Deposit" function is called...
function spotifythissong() {

  console.log(value);

 
spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    //console.log(data.tracks)
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].album.href);
    console.log(data.tracks.items[0].album.name);

 
    // Do something with 'data' 
});

}

// If the "Withdraw" function is called
function moviethis() {

var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json";

// This line is just to help us debug against the actual URL.
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    
    console.log(JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log(JSON.parse(body).Rated);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
    console.log(JSON.parse(body).imdbRating);
  }
});

}


// If the "Lotto" function is called
function dowhatitsays() {

  // We will subtract 25 cents
  fs.readFile("random.txt", "utf8",function(error,data){
  	console.log(data);
  	var dataArr = data.split(",");
  	console.log(dataArr)
  	if (dataArr[0] === "spotify-this-song") {
  		var value = dataArr[1];
  		spotifythissong();

  	}
  })

 
}
