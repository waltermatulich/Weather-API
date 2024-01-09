const APIKey = "f95281993c521c14c228e4b130992126" ;

var city

var buttonTarget = document.getElementById("search-button");

async function getWeatherForecast() {
    var cityTarget = document.getElementById("city-input").value;
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTarget}&appid=${APIKey}`
console.log(cityTarget)
    try {
        const response = await fetch(APIUrl);
         console.log(response)
        const weatherData = await response.json();
        // Process and use the weather data as needed
        console.log(weatherData)
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

buttonTarget.addEventListener("click", getWeatherForecast);