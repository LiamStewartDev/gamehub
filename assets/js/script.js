// JS here. Change function names based on common sense naming conventions
// Grab html variables here
var gameList = $('#game-list');
var detailScreen = $('#game-details');
var priceContainer = $('#price-list');
var videoSlot = $('#youtube-vid');
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

// function to get cheapshark api all deals for a game
var getDeals = (id) => {

}

// renderData function
var renderData = (data) => {
  // empty out the list
  // gameList.empty();

  console.log(data);

  // define our game data array from the api
  var games = data.data.results;

  // for loop to create our list of games
  for (var i = 0; i < games.length; i++) {
    // create each game list item
    var id = games[i].id;
    var name = games[i].name;
    var li = $(`<li gameid = "${id}" class = "card-header-title card-radius">${name}</li>`);

    // add the on click event listener
    li.on('click', (event) => {
      var target = $(event.target);
      idparam = target.attr('gameid');
      getDetails(idparam);
    });

    // append each created li onto the gameList
    // gameList.append(li);
  }
}

var renderDetails = (game) => {
  console.log(game);
  var name = game.data.name;
  var description = game.data.description_raw;
  var imageurl = game.data.background_image;
  var platforms = game.data.platforms; // an array of objects, the name will be under .name under the platform object, there is also a system requirements object within only the data for PC will be filled in, the rest will be empty objects.
  var platformsString = '';
  for (var i = 0; i < platforms.length; i++) {
    platformsString += platforms[i].platform.name;
    if (i < platforms.length - 1) {
      platformsString += ', ';
    }
  }

  var genre = game.data.genres; // an array of objects, the name will be under .name
  var genreString = getNames(genre);

  var developers = game.data.developers; // an array of objects, the name will be under .name
  var developersString = getNames(developers);

  var publishers = game.data.publishers; // an array of objects, the name will be under .name
  var publishersString = getNames(publishers);

  var releaseDate = moment(game.data.released).format('MMM D, YYYY');

  var score = game.data.metacritic; // This value might not exist for some of the lesser games
  if (!score) {
    score = "No Metacritic Score";
  }

  var rating = game.data.esrb_rating; //The rating is contained in .name This value might be null
  if (!rating) {
    rating = "No ESRB rating";
  } else {
    rating = game.data.esrb_rating.name;
  }

  var detailDisplay = $(`
  <div class = "card">
    <img src = "${imageurl}" />
    <h2>${name}</h2>
    <p>Description:</p>
    <p>${description}</p>
    <p>Release Date:</p>
    <p>${releaseDate}</p>
    <p>Platforms:</p>
    <p>${platformsString}</p>
    <p>Genres:</p>
    <p>${genreString}</p>
    <p>Developers:</p>
    <p>${developersString}</p>
    <p>Publishers:</p>
    <p>${publishersString}</p>
    <p>Metacritic:</p>
    <p>${score}</p>
    <p>ESRB Rating:</p>
    <p>${rating}</p>
  </div>
  `);

  console.log(imageurl);
  console.log(name);
  console.log(description);
  console.log(releaseDate);
  console.log(platformsString);
  console.log(genreString);
  console.log(developersString);
  console.log(publishersString);
  console.log(score);
  console.log(rating);

  // append the detailDisplay to the details screen section
  // detailScreen.append(detailDisplay);
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

var getNames = (array) => {
  var resultString = '';
  for (var i = 0; i < array.length; i++) {
    resultString += array[i].name;
    // if there are more items, add comma and space to the end of the string
    if (i < array.length - 1) {
      resultString += ', ';
    }
  }
  return resultString;
}

getGames('skyrim', 'search', 'adventure,rpg');
getDetails(5679);
// getYoutube('coding');
getPrices('The Elder Scrolls V: Skyrim');