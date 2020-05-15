var cityList = [];
var cityName;

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
    cityName = storedWeather;

    displayWeather();
    displayFiveDayForecast();
  }
}

function storeCityArray() {
  localStorage.setItem("cities", JSON.stringify(cityList));
}
function storeCurrentCity() {
  localStorage.setItem("currentCity", JSON.stringify(cityName));
}

//event listener on click for the search button
$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  cityName = $("#cityInput").val().trim();
  if (cityName === "") {
    alert("Please enter a city to look up");
  } else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityName);
  } else {
    cityList.push(cityName);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});

//getting the current weather and displaying in the DIV
function displayWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=667b640793ff41c55d2a26c7d8568bb6";

  var response = $.ajax({
    url: queryURL,
    method: "GET",
  });
  console.log(response);

  var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
  var getCurrentCity = response.name;
  var date = new Date();
  var val =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  var currentCityEl = $("<h3 class = 'card-body'>").text(
    getCurrentCity + " (" + val + ")"
  );
  currentCityEl.append(displayCurrentWeatherIcon);
  currentWeatherDiv.append(currentCityEl);

  var getTemp = response.main.temp.toFixed(1);
  var tempEl = $("<p class='card-text'>").text(
    "Temperature: " + getTemp + "° F"
  );
  currentWeatherDiv.append(tempEl);

  var getHumidity = response.main.humidity;
  var humidityEl = $("<p class='card-text'>").text(
    "Humidity: " + getHumidity + "%"
  );
  currentWeatherDiv.append(humidityEl);

  var getWindSpeed = response.wind.speed.toFixed(1);
  var windSpeedEl = $("<p class='card-text'>").text(
    "Wind Speed: " + getWindSpeed + " mph"
  );
  currentWeatherDiv.append(windSpeedEl);

  //--------UV INDEX & need to add class depending on the number//
  var uvURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=667b640793ff41c55d2a26c7d8568bb6";

  var uvResponse = $.ajax({
    url: uvURL,
    method: "GET",
  });

  //Attempt 1
  var getUVNumber = uvResponse.value;
  var uVNumber = $("<span>");
  if (getUVNumber > 0 && getUVNumber <= 2.99) {
    uVNumber.addClass("low");
  } else if (getUVNumber > 3 && getUVNumber <= 5.99) {
    uVNumber.addclass("moderate");
  } else if (getUVNumber > 6 && getUVNumber <= 7.99) {
    uVNumber.addclass("high");
  } else if (getUVNumber > 8 && getUVNumber <= 10.99) {
    uVNumber.addclass("veryhigh");
  } else {
    uVNumber.addclass("extreme");
  }
  uVNumber.text(getUVNumber);
  var uvIndexEl = $("<p>").text("UV Index: ");
  uVNumber.appendTo(uvIndexEl);
  currentWeatherDiv.append(uvIndexEl);
  $("#weatherContainer").html(currentWeatherDiv);
}

function historyDisplayWeather() {
  cityname = $(this).attr("data-name");
  displayWeather();
  console.log(cityname);
}

$(document).on("click", ".city", historyDisplayWeather);
