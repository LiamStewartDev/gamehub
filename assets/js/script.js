// JS here. Change function names based on common sense naming conventions
// Grab html variables here
var gameList = $('#gameList');
var detailScreen = $('#detailScreen');
// Global variables here
var rawgKey = 'fa0bb86079354400af9095c66fac353c';
var ytKey = 'AIzaSyDq8ij9L8lkIiOCCwHMyDrz4-Jf8ljNWVU';
// Define local storage variable(s)

// object of query types
var queryTypes = {
  search: '&search=',
  developer: '&developers=',
  publisher: '&publishers='
}

// function to create query string
var getType = (query, type) => {
  var queryString = `${queryTypes[type]}${query}`;
  return queryString;
}

// function to create the genre query string
var getGenres = (string) => {
  if (!string) {
    return '';
  }
  var genreQuery = `&genres=${string}`;
  return genreQuery;
}

// We know for a fact that we'll need to make at least 1 API call
// function to fetch list of games from api
var getGames = (query, type, genre) => {
  var param = getType(query, type);
  var genres = getGenres(genre);
  var apiurl = `https://api.rawg.io/api/games?key=${rawgKey}${param}${genres}`;
  axios.get(apiurl)
    .then((response) => {
      renderData(response);
    })
    .catch((error) => {
      console.log(`Failed to fetch from the RAWG api with error message of: ${error}`);
    });
}

// function to fetch game details based on id
var getDetails = (id) => {
  var apiurl = `https://api.rawg.io/api/games/${id}?key=${rawgKey}`;
  axios.get(apiurl)
    .then((response) => {
      renderDetails(response);
    })
    .catch((error) => {
      console.log(`Failed to fetch from the RAWG api with error message of: ${error}`);
    });
}

// function to get youtube data based on search query
var getYoutube = (query) => {
  var apiurl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${ytKey}`;
  axios.get(apiurl)
    .then((response) => {
      renderYoutube(response);
    })
    .catch((error) => {
      console.log(`Failed to fetch from the youtube api with error message of: ${error}`);
    });
}

// function to get cheapshark api pricing data by title
var getPrices = (title) => {
  var apiurl = `https://www.cheapshark.com/api/1.0/games?title=${title}`;
  axios.get(apiurl)
    .then((response) => {
      renderPricing(response);
    })
    .catch((error) => {
      console.log(`Failed to fetch from the cheapshark api with error message of: ${error}`);
    });
}

// renderData function
var renderData = (data) => {
  // empty out the list
  // gameList.empty();

  // define our game data array from the api
  var games = data.data.results;
  console.log(games);

  // for loop to create our list of games
  // for (var i = 0; i < games.length; i++) {
  //   var id = games[i].id;
  //   var name = games[i].name;
  //   var li = $(`<li gameid = "${id}">${name}</li>`);
  //   li.on('click', (event) => {
  //     var target = $(event.target);
  //     idparam = target.attr('gameid');
  //     getDetails(idparam);
  //   });
  //   gameList.append(li);
  // }
}

var renderDetails = (game) => {
  console.log(game);
  var name = game.data.name;
  var description = game.data.description_raw;
  var imageurl = game.data.background_image;
  var platforms = game.data.platforms; // an array of objects, the name will be under .name, there is also a system requirements object within only the data for PC will be filled in, the rest will be empty objects.
  var genre = game.data.genres; // an array of objects, the name will be under .name
  var developers = game.data.developers; // an array of objects, the name will be under .name
  var publishers = game.data.publishers; // an array of objects, the name will be under .name
  var releaseDate = moment(game.data.released).format('MMM D, YYYY');

  var score = game.data.metacritic; // This value might not exist for some of the lesser games
  var rating = game.data.esrb_rating; //The rating is contained in .name This value might be null

  var detailDisplay = $(``);
}

var renderYoutube = (data) => {
  console.log(data);
  var videos = data.data.items;
  for (var i = 0; i < videos.length; i++) {
    var vid = videos[i].id.videoId;
    var videourl = `https://www.youtube.com/watch?v=${vid}`;
    var channel = videos[i].snippet.channelTitle;
    var title = videos[i].snippet.title;
    // console.log(title);
    // console.log(channel);
    // console.log(videourl);
  }
}

var renderPricing = (data) => {
  console.log(data);
}


// getGames('skyrim', 'search');
getDetails(290476);
// getYoutube('coding');
// getPrices('tetris');