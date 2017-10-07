
var fs = require("fs");
var request = require("request");
var twitter = require ("twitter");
var spotify = require ("spotify");
var keys = require("./keys.js");
var nodeArg = process.argv[2];



if(nodeArg === "my-tweets"){
  runTwitter();
}
else if(nodeArg === "spotify-this-song"){
  runSpotify();
}
else if(nodeArg === "movie-this"){
  runOMDB();
}
else if(nodeArg === "do-what-it-says"){
  runDoIt();
}
else {
  "Liri is not sure where you are asking for. Try again!"
}

function runTwitter(){
 
  
  var client = new twitter(keys);

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

function runSpotify(){

var spotifyApi = new SpotifyWebApi(keys);

spotifyApi.searchTracks(nodeArg, function(err, data) {
  if (err) {
    console.error('Something went wrong', err.message);
    return;
  }

  // Print some information about the results
  console.log('I got ' + data.body.tracks.total + ' results!');

  // Go through the first page of results
  var firstPage = data.body.tracks.items;
  console.log('The tracks in the first page are.. (popularity in parentheses)');

  /*
   * 0: All of Me (97)
   * 1: My Love (91)
   * 2: I Love This Life (78)
   * ...
   */
  firstPage.forEach(function(track, index) {
    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
  });
});















}
