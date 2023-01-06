const API_KEY = "72bb9dab46b9ec3d65f423c63f27a9b8";
const OPEN_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CELSIUS = "C";
const FAHRENHEIT = "F";

// Setting current date
displayCurrentDate();

// Current location weather - default weather is the current location weather
getCurrentLocationWeather();

const currentLocationWeatherBtn = document.getElementById("current-weather");
currentLocationWeatherBtn.addEventListener("click", getCurrentLocationWeather);

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(fetchLocationWeather);
}

// Search engine
const searchCityForm = document.getElementById("search-city-form");
searchCityForm.addEventListener("submit", searchCityHandler);

function searchCityHandler(event) {
  event.preventDefault();
  const elements = event.target.elements;
  fetchCityWeather(elements["city-name"].value);
}

// Converting temperatures
let currentDegrees = CELSIUS;
const temperatures = document.querySelectorAll(".temperature");
const degreesButtons = document.querySelectorAll(".degree");

degreesButtons.forEach((degreesButton) =>
  degreesButton.addEventListener("click", degreesHandler)
);

function degreesHandler(event) {
  const selectedDegrees = event.target.textContent;
  if (selectedDegrees === currentDegrees) return;
  updateTemperatures(selectedDegrees);
}

function updateTemperatures(degree) {
  temperatures.forEach((temperatureElement) => {
    const temp = Number(temperatureElement.textContent);
    temperatureElement.textContent = `${convertDegrees(temp, degree)}`;
  });
}

function convertDegrees(temp, degree) {
  if (degree === FAHRENHEIT) {
    currentDegrees = FAHRENHEIT;
    return toFahrenheit(temp);
  }
  currentDegrees = CELSIUS;
  return toCelsius(temp);
}

// Utils
function displayCurrentDate() {
  const currentTimeElement = document.getElementById("current-time");
  const currentDate = new Date();

  currentTimeElement.innerHTML = `${
    DAYS_OF_WEEK[currentDate.getDay()]
  } ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function displayWeather({ data }) {
  displayCityName(data.name);
  displayCurrentTemp(data.main.temp);
  displayHumidity(data.main.humidity);
  displayCondition(data.weather[0].main);
  displayWindSpeed(data.wind.speed);
}

function displayCityName(city) {
  document.getElementById("city").textContent = city;
}

function displayCurrentTemp(currentTemp) {
  document.getElementById("current-temp").textContent = Math.round(currentTemp);
}

function displayWindSpeed(wind) {
  document.getElementById("wind-speed").textContent = Math.round(wind);
}

function displayHumidity(humidity) {
  document.getElementById("humidity").textContent = Math.round(humidity);
}

function displayCondition(condition) {
  document.getElementById("condition").textContent = condition;
}

function fetchLocationWeather({ coords: { latitude, longitude } }) {
  axios
    .get(`${OPEN_WEATHER_API}&lat=${latitude}&lon=${longitude}`)
    .then(displayWeather);
}

function fetchCityWeather(city) {
  axios.get(`${OPEN_WEATHER_API}&q=${city}`).then(displayWeather);
}

function toFahrenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function toCelsius(temp) {
  return Math.round((temp - 32) * 0.5556);
}
