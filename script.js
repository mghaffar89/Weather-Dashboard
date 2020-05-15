var cityList = [];
var cityname;

// local storage functions
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
