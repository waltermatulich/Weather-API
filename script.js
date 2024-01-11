const APIKey = "f95281993c521c14c228e4b130992126";
const buttonTarget = document.getElementById("search-button");
async function getWeatherForecast() {
  const cityTarget = document.getElementById("city-input").value;
  const previousSearch = JSON.parse(localStorage.getItem("Weather")) || []
  previousSearch.push(cityTarget);
  localStorage.setItem("Weather", JSON.stringify(previousSearch));
  try {
    // Fetch current weather data
    const currentWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTarget}&appid=${APIKey}`;
    const currentWeatherResponse = await fetch(currentWeatherAPIUrl);
    const currentWeatherData = await currentWeatherResponse.json();

    // Process and use the current weather data as needed
    console.log(currentWeatherData);

    // Fetch 5-day forecast data
    const forecastAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityTarget}&appid=${APIKey}&units=metric&cnt=5`;
    const forecastResponse = await fetch(forecastAPIUrl);
    const forecastData = await forecastResponse.json();

    // Process and use the forecast data as needed
    console.log(forecastData);

    // Display current weather
    displayCurrentWeather(currentWeatherData);

    // Display forecast
    displayForecast(forecastData, cityTarget);

    // Add to search history
    addToHistory(cityTarget);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayCurrentWeather(data) {
  const weatherContainer = document.getElementById('weather-container');
  const currentDate = new Date(data.dt * 1000); // Convert timestamp to milliseconds

  weatherContainer.innerHTML = `
    <h2>${data.name} Weather</h2>
    <p>Date: ${currentDate.toDateString()}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function displayForecast(data, city) {
  const forecastContainer = document.getElementById('forecast-container');
  htmlCode = '<h2>5-Day Forecast</h2>';

  data.list.forEach(day => {
    const date = new Date(day.dt * 1000); // Convert timestamp to milliseconds

    htmlCode += `
      <div class="forecast-card card" style="width: 18rem;">
        <p>Date: ${date.toDateString()}</p>
        <p>Temperature: ${day.main.temp_max}°C</p>
        <p>Humidity: ${day.main.humidity}%</p>
        <p>Wind Speed: ${day.wind.speed} m/s</p>
      </div>
    `;
  });
  forecastContainer.innerHTML = htmlCode
}

function addToHistory() {
  const historyContainer = document.getElementById('history-container');
  const previousSearch = JSON.parse(localStorage.getItem("Weather")) || []
  var htmlButtons = ""
  for (var i = 0; i < previousSearch.length; i++) {
    htmlButtons += `<p><button class="btn btn-info searchHistory">${previousSearch[i]}</button></p>`;
  }
  historyContainer.innerHTML = htmlButtons
  var searchHistoryEl = document.querySelectorAll(".searchHistory")
  searchHistoryEl.forEach(button => button.addEventListener("click",searchHistoryInput)) 
}
  buttonTarget.addEventListener("click", getWeatherForecast);
  //displayForecast();
  //displayCurrentWeather();
  addToHistory();

  async function searchHistoryInput (event) {
    var city = event.target.textContent
    console.log("City",city)
    try {
      // Fetch current weather data
      const currentWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
      const currentWeatherResponse = await fetch(currentWeatherAPIUrl);
      const currentWeatherData = await currentWeatherResponse.json();
  
      // Process and use the current weather data as needed
      console.log(currentWeatherData);
  
      // Fetch 5-day forecast data
      const forecastAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric&cnt=5`;
      const forecastResponse = await fetch(forecastAPIUrl);
      const forecastData = await forecastResponse.json();
  
      // Process and use the forecast data as needed
      console.log(forecastData);
  
      // Display current weather
      displayCurrentWeather(currentWeatherData);
  
      // Display forecast
      displayForecast(forecastData, city);
  
     
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }