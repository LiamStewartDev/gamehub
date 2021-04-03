// JS here. Change function names based on common sense naming conventions
// Grab html variables here

// Global variables here

// Define local storage variable(s)

// We know for a fact that we'll need to make at least 1 API call
// function to fetch data from api
var getData = (param) => {
  var apiurl = `ADD MODIFIED API URL HERE`;
  $.ajax({
    url: apiurl,
    method: 'GET',
    error: () => console.log('Failed to retrieve') // error function if the fetch fails. REPLACE THIS WITH AN ALERT FUNCTION THAT CREATES A POP UP BOX
  }).then(function (response) {
    // if success, initialize renderData
    renderData(response);
  });
}

// renderData function
var renderData = (data) => {
  console.log(data);
}