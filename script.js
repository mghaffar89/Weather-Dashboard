var cityList = [];
var cityname;

// calling on the local storage
initCityList();
initWeather();

//function to display the city entered by user
function renderCities() {
  $("#cityList").empty();
  $("#cityInput").val("");

  for (i = 0; i < cityList.length; i++) {
    var a = $("<a>");
    a.addClass(
      "list-group-item list-group-item-action list-group-item-primary city"
    );
    a.attr("data-name", cityList[i]);
    a.text(cityList[i]);
    $("#cityList").prepend(a);
  }
}
function initCityList() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
}
//local storage functions
function initWeather() {
  var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

  if (storedWeather !== null) {
    cityname = storedWeather;

    displayWeather();
    displayFiveDayForecast();
  }
}

function storeCityArray() {
  localStorage.setItem("cities", JSON.stringify(cityList));
}
function storeCurrentCity() {
  localStorage.setItem("currentCity", JSON.stringify(cityname));
}

//event listener on click for the search button
$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  cityname = $("#cityInput").val().trim();
  if (cityname === "") {
    alert("Please enter a city to look up");
  } else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityname);
  } else {
    cityList.push(cityname);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});
