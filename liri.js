// Load the fs package to read and write
var fs = require("fs");
var tkeys = require("./keys.js")
var Twitter = require('twitter');

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
    deposit();
    break;

  case "movie-this":
    withdraw();
    break;

  case "do-what-it-says":
    lotto();
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
function deposit() {

  // We will add the value to the bank file.
  fs.appendFile("bank.txt", ", " + value);

  // We will then print the value that was added (but we wont print the total).
  console.log("Deposited " + value + ".");
}

// If the "Withdraw" function is called
function withdraw() {

  // We will add a negative value to the bank file.
  fs.appendFile("bank.txt", ", -" + value);

  // We will then print the value that was subtracted (but we wont print the total).
  console.log("Withdrew " + value + ".");
}


// If the "Lotto" function is called
function lotto() {

  // We will subtract 25 cents
  fs.appendFile("bank.txt", ", -.25");

  // Then grab a random number
  var chance = Math.floor((Math.random() * 10) + 1);

  // If the random number equals 1...
  if (chance === 1) {

    // We will then add $2 to the account.
    fs.appendFile("bank.txt", ", 2");

    // And tell the user the amount was added.
    console.log("Congrats you won the lottery!");

  // Otherwise we will tell them they lost 25 cents.
  }
  else {
    console.log("Sorry. You just lost 25 cents. Maybe you should get a job instead.");
  }
}
