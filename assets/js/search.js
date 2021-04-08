// grab DOM elements
var searchButton = $('#search-Button')
var searchQuery = $('input[name = "searchBar"]');

var goSearch = (event) => {
  event.preventDefault();
  // grab the search input query
  var query = searchQuery.val();

  // if no search query, change placeholder
  if (!query) {
    searchQuery.attr('placeholder', 'PLEASE ENTER A SEARCH QUERY');
    return;
  }

  // grab our query format from our dropdown select
  var queryFormat = $(this).find(':selected').val();

  // grab our genres from the checked buttons
  var genreChecks = $('input:checked');
  var genreArray = [];
  $.each(genreChecks, function() {
    genreArray.push($(this).val());
  });
  if(genreArray.length > 0) {
    var genreQuery = genreArray.join(',');
  }

  // create our query string
  var queryString = `./index.html?q=${query}&format=${queryFormat}`;
  if (genreQuery) {
    queryString += `&genre=${genreQuery}`;
  }

  // reassign our location to index.html
  location.assign(queryString);
}

searchButton.on('click', goSearch);