// JS here. Change function names based on common sense naming conventions
// Grab html variables here

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
  console.log(queryString);
  return queryString;
}

// function to create the genre query string
var getGenres = (string) => {
  if (!string) {
    console.log('blank string returned');
    return '';
  }
  var genreQuery = `&genres=${string}`;
  console.log(genreQuery);
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
  console.log(data);
  var games = data.data.results;
  // console.log(games);
  for (var i = 0; i < games.length; i++) {
    var id = games[i].id;
    var name = games[i].name;
    var rating = games[i].metacritic;
    // console.log(name);
    // console.log(id);
    // console.log(rating);
  }
}

var renderDetails = (game) => {
  // console.log(game);
  var name = game.data.name;
  var description = game.data.description_raw;
  var imageurl = game.data.background_image;
  // console.log(name);
  // console.log(description);
  // console.log(imageurl);
}

var renderYoutube = (data) => {
  console.log(data);
}

var renderPricing = (data) => {
  console.log(data);
}
// getDetails(5679);

getGames('skyrim', 'search');
getYoutube('coding');
getPrices('tetris');