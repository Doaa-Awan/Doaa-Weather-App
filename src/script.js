//CURRENT TEMPERATURE
function displayWeather(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let description = `${response.data.weather[0].description}`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = `${response.data.main.humidity}`;

  let temp = document.querySelector("#tempNumber");
  let weatherDescription = document.querySelector("#weather-description");
  let feel = document.querySelector("#feels-like");
  let cityElement = document.querySelector("#location");
  let wind = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon-element");

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

//CURRENT LOCATION BUTTON:
function showLocalTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let location = response.data.name;
  let description = `${response.data.weather[0].description}`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = `${response.data.main.humidity}`;

  let changeTemp = document.querySelector(`#tempNumber`);
  let h1 = document.querySelector("#location");
  let weatherDescription = document.querySelector("#weather-description");
  let feel = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon-element");
  let wind = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  h1.innerHTML = `${location}, ${response.data.sys.country}`;
  changeTemp.innerHTML = `${temp}°`;
  weatherDescription.innerHTML = `${description}`;
  feel.innerHTML = `${feelsLike}`;
  iconElement.setAttribute("class", `fa-solid fa-cloud-sun icon`);
  wind.innerHTML = `${windSpeed}`;
  humidityElement.innerHTML = `${humidity}`;
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

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

let now = new Date();
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = formatDay(now);

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = formatTime(now);

let refreshButton = document.querySelector("#refresh");
refreshButton.addEventListener("click", reload, false);

let celsiusTemperature = null;

let celsiusClick = document.querySelector("#c");
celsiusClick.addEventListener("click", celsius);

let fahrenheitClick = document.querySelector("#f");
fahrenheitClick.addEventListener("click", fahrenheit);

let localButton = document.querySelector("#location-button");
localButton.addEventListener("click", getCurrentPosition);

search("St. Catharines");
