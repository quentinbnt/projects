let appId = "b557d957fa58fb2b55cd51920242d40d";
let units = "metric";
let searchMethod;

// Let's create a function that determines whether we're entering a ZIP code or a city name.
function getSearchMethod(searchTerm) {
  if (
    (searchTerm.length === 5) &
    (Number.parseInt(searchTerm) + "" === searchTerm)
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

// Create a function which fetches data from the HTML link

function searchWeather(searchTerm) {
  // Call the getSearchMethod
  getSearchMethod(searchTerm);
  // Add "SearchMethod" and "SearchTerm" as a template literal.
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?$(searchMethod)=$(searchTerm)&APPID=$(appId)&units=$(units)`
  )
    // Let's convert that result to json
    .then((result) => {
      return result.json();
    })
    // Let's get the result of that data.
    // result can be called however we like.
    .then((result) => {
      init(result);
    });
}

function init(resultFromServer) {
  // Switch statement: match values and keys - if match do this, otherwise do that.
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url('clear.jpg')";
      break;

    case "Clouds":
      document.body.style.backgroundImage = "url('cloudy.jpg')";
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = "url('rain.jpg')";
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = "url('storm.jpg')";
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('snow.jpg')";
      break;

    default:
      break;
  }
  // Access the HTML
  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperatureElement");
  let humidityElement = document.getElementById("humidityElement");
  let windSpeedElement = document.getElementById("windSpeedElement");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("weatherIcon");

  weatherIcon.src =
    "http://openweathermap.org/img/w" +
    resultFromServer.weather[0].icon +
    ".png";

  // Get the resultDescription
  let ResultDescription = resultFromServer.weather[0].description;

  // Display the resultDescription and capitalize the first letter.
  // first you're putting everything in capital letters
  // Then you slice from an index, it grabs the rest of the string of no end index is provided
  weatherDescriptionHeader.innerText =
    ResultDescription.charAt(0).toUppercase() + resultFromServer.slice(1);

  // Round the temperature
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176";
  windSpeedElement.innerHTML =
    "winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";
}

// Hook up the search button
document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});
