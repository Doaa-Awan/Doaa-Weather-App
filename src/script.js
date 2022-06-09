//FORECAST:

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecastList");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col forecast-col f1">
        <div id="f1">${day}</div>
        <div class="fa-solid fa-cloud-sun forecast-icon"></div>
        <div class="forecast-temp">8</div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// let forecastBtn = document.querySelector("#forecastBtn");
// forecastBtn.addEventListener("click", displayForecast);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9d66353d7a075841285d6608a0acc09a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//CURRENT TEMPERATURE
function displayWeather(response) {
  temperature = Math.round(response.data.main.temp);
  description = `${response.data.weather[0].description}`;
  feelsLike = Math.round(response.data.main.feels_like);
  windSpeed = Math.round(response.data.wind.speed);
  humidity = `${response.data.main.humidity}`;
  celsiusTemperature = response.data.main.temp;

  temp.innerHTML = `${temperature}°`;
  weatherDescription.innerHTML = `${description}`;
  feel.innerHTML = `${feelsLike}`;
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  wind.innerHTML = `${windSpeed}`;
  humidityElement.innerHTML = `${humidity}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${description}`);

  getForecast(response.data.coord);
}

//SEARCH:
function search(city) {
  let units = `metric`;
  let apiKey = "9d66353d7a075841285d6608a0acc09a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-value");
  search(searchInput.value);
}

//CURRENT DAY

function formatDay(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}`;
}

//CURRENT TIME

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//REFRESH BUTTON:
function reload() {
  reload = location.reload();
}

//CELSIUS BUTTON:
function celsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#tempNumber");
  temp.innerHTML = `${Math.round(celsiusTemperature)}°`;

  fahrenheitClick.classList.remove("active");
  celsiusClick.classList.add("active");
}

//FAHRENHEIT BUTTON
function fahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#tempNumber");
  temp.innerHTML = `${Math.round(fahrenheitTemp)}°`;

  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
}

//LIGHT BUTTON:

function toggleLight() {
  // let f1 = document.querySelector(".f1");
  // let f2 = document.querySelector(".f2");
  // let f3 = document.querySelector(".f3");
  // let f4 = document.querySelector(".f4");
  // let f5 = document.querySelector(".f5");
  let nameSigned = document.querySelector(".code-link");
  let link = document.querySelector(".link");
  lightBtn.classList.toggle("white");
  section.classList.toggle("glow");
  // f1.classList.toggle("glow");
  // f2.classList.toggle("glow");
  // f3.classList.toggle("glow");
  // f4.classList.toggle("glow");
  // f5.classList.toggle("glow");
  nameSigned.classList.toggle("white");
  link.classList.toggle("white");

  document.querySelectorAll(`.f1`).forEach((el) => el.classList.toggle(`glow`));
}

//CURRENT LOCATION BUTTON:
function showLocalTemp(response) {
  let localCity = response.data.name;
  let localCountry = response.data.sys.country;
  let localTemp = Math.round(response.data.main.temp);
  let localDescription = `${response.data.weather[0].description}`;
  let localFeelsLike = Math.round(response.data.main.feels_like);
  let localWindSpeed = Math.round(response.data.wind.speed);
  let localHumidity = `${response.data.main.humidity}`;

  cityElement.innerHTML = `${localCity}, ${localCountry}`;
  temp.innerHTML = `${localTemp}°`;
  weatherDescription.innerHTML = `${localDescription}`;
  feel.innerHTML = `${localFeelsLike}`;
  wind.innerHTML = `${localWindSpeed}`;
  humidityElement.innerHTML = `${localHumidity}`;
  iconElement.setAttribute("class", `fa-solid fa-cloud-sun icon`);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = "9d66353d7a075841285d6608a0acc09a";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocalTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//GLOBAL VARIABLES:

let temperature = null;
let description = null;
let feelsLike = null;
let windSpeed = null;
let humidity = null;
let celsiusTemperature = null;

let cityElement = document.querySelector("#location");
let temp = document.querySelector("#tempNumber");
let weatherDescription = document.querySelector("#weather-description");
let feel = document.querySelector("#feels-like");
let wind = document.querySelector("#wind-speed");
let humidityElement = document.querySelector("#humidity");
let iconElement = document.querySelector("#icon-element");

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

let now = new Date();
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = formatDay(now);

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = formatTime(now);

let refreshButton = document.querySelector("#refresh");
refreshButton.addEventListener("click", reload, false);

let celsiusClick = document.querySelector("#c");
celsiusClick.addEventListener("click", celsius);

let fahrenheitClick = document.querySelector("#f");
fahrenheitClick.addEventListener("click", fahrenheit);

let localButton = document.querySelector("#location-button");
localButton.addEventListener("click", getCurrentPosition);

let lightBtn = document.querySelector("#light");
lightBtn.addEventListener("click", toggleLight);

let section = document.querySelector("section");

search("Niagara Falls");

// function toggleForecast() {
//   if (forecast.style.maxHeight == "0px") {
//     forecast.style.maxHeight = "400px";
//   } else {
//     forecast.style.maxHeight = "0px";
//   }
// }

// let forecast = document.querySelector("#forecastList");
// forecast.style.maxHeight = "0px";

// function toggleForecast() {
//   let forecast = document.querySelector(".f1");
//   forecast.classList.toggle(".hide");
// }

// let forecastBtn = document.querySelector("#forecastBtn");
// forecastBtn.addEventListener("click", toggleForecast);
