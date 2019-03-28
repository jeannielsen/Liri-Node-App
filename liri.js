// code to read and set any environment variables with the dotenv package
require('dotenv').config();
// code required to import keys.js file and store it in a variable
var keys = require("./keys.js");
// access key information
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var choice = process.argv[3];


// IF THE PROCESS.ARGV==="MOVIE-THIS"
var getMovie = function (movieName) {
  axios.get("http://www.omdbapi.com/?s=" + movieName + "&apikey=c9543702")
    .then(function (response) {
      console.log(response.data.Search[0]);
      // console.log("Title: ", Title);
      // console.log("Year: ", Year);
      // console.log("IMBD Rating: ", imdbRating);
      // console.log("Rotten Tomatoes: ", Rating);
      // console.log("Country: ", Country);
      // console.log("Language: ", Language);
      // console.log("Plot: ", Plot);
      // console.log("Actors: ", Actors);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// IF THE PROCESS.ARGV==="CONCERT-THIS"
function getConcerts(artist) {
  axios.get(`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`)
    .then(function (response) {
      console.log(response.data.Search[0]);
    
    })
    .catch(function (error) {
      console.log(error);
    });
};
var getArtistNames = function (artist) {
  return artist.name;
}

var getMeSpotify = function (songName) {
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    };

    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artists.map(getArtistNames));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-------------------------------")
    }
  });
}

var askLiri = function () {
  if (command === "movie-this") {
    console.log("Searching for: " + choice)
    getMovie(choice)
  }









  // IF THE PROCESS.ARGV==="SPOTIFY-THIS-SONG"
  else if (command === "spotify-this-song") {
    console.log("searchingForSong")
    getMeSpotify(choice);
  }
  // IF THE PROCESS.ARGV==="CONCERT-THIS"
  else if (command === "concert-this") {
    console.log("Searching for: " + choice)
    getConcerts(choice);
  }
}

askLiri()

