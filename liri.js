var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var twitter = require ("twitter");
var spotify = require ("node-spotify-api");
var firstArg = process.argv[2];



if(firstArg === "my-tweets"){
  runTwitter();
}
else if(firstArg === "spotify-this-song"){
  if (process.argv[3]){
  var value = "";
  for (var n = 3; n < process.argv.length; n++){
      value += " " + process.argv[n];
    }
    };
  runSpotify();
}
else if(firstArg === "movie-this"){
  if (process.argv[3]){
  var value = "";
  for (var n = 3; n < process.argv.length; n++){
      value += " " + process.argv[n];
    }
    };
  runOMDB();
}
else if(firstArg === "do-what-it-says"){
  if (process.argv [2]){
    var value = "";
    for (var n = 2; n < process.argv.length; n++){
        value += " " + process.argv[n];
      }
      };
  runDoIt();
}
else {
 console.log( "Liri is not sure where you are asking for. Try again!");
}




function runTwitter(){
 
  
  var client = new twitter(keys.twitterKeys);

  var params = {screen_name: 'mandawisniowski',  count: 20 };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
     
  for (var i = 0; i < tweets.length; i++) {
    var date = tweets[i].created_at;
      
      console.log("@mandawisniowski: " +  tweets[i].text + "created at:" + date)
       }     

    }
    else{
      console.log(error);
    }
  });

}



function runSpotify (){

  // if (value === undefined) {
  //   value = "The Sign Ace of Base";
  // }
   
  var spotifyAPI = new spotify(keys.spotifyKeys);
   
   spotifyAPI.search({ type: 'track', query: value || "The Sign Ace of Base"}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   else {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview Here: " + data.tracks.items[0].preview_url);
   }
  });
}

function runDoIt (){
  fs.readFile("random.txt", "utf8", function(error, data) {

if (error) {
  return console.log(error);
}

else {

  var spotifyAPI = new spotify(keys.spotifyKeys);
  var dataArr = data.split(",");

spotifyAPI.search({ type: 'track', query: dataArr[1]}, function(err, data) {

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview Here: " + data.tracks.items[0].preview_url)
});
}



});
}

function runOMDB(){
  if (value === undefined) {
    value = 'Mr Nobody';
  }

 
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

  
  request(queryUrl, function(error, response, body) {
  

    if (!error && response.statusCode === 200) {
  
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });

}