// JS here. Change function names based on common sense naming conventions
// Grab html variables here

// Global variables here
var rawgKey = 'fa0bb86079354400af9095c66fac353c';
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
      console.log(`Failed to fetch from the api with error message of: ${error}`);
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
      console.log(`Failed to fetch from the api with error message of: ${error}`);
    });
}

// renderData function
var renderData = (data) => {
  var games = data.data.results;
  console.log(games);
  for (var i = 0; i < games.length; i++) {
    var id = games[i].id;
    var name = games[i].name;
    var rating = games[i].metacritic;
    console.log(name);
    console.log(id);
    console.log(rating);
  }
}

var renderDetails = (game) => {
  console.log(game);
  var name = game.data.name;
  var description = game.data.description_raw;
  var imageurl = game.data.background_image;
  console.log(name);
  console.log(description);
  console.log(imageurl);
}

getGames('skyrim', 'search');
getDetails(5679);