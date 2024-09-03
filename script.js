// script.js
const apiKey = 'a8f598a8d91472cbaf5900e734f4b6a1'; // Replace 'YOUR_API_KEY' with the actual API key from OpenWeatherMap
const weatherDisplay = document.getElementById('weatherDisplay');
const locationName = document.getElementById('locationName');
const weatherCondition = document.getElementById('weatherCondition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Get weather data by city name
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
        fetchWeatherByLocation(locationInput);
    }
});

// Get weather data by geolocation
document.getElementById('getLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Fetch weather data by city name
function fetchWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Unable to retrieve weather data'));
}

// Fetch weather data by latitude and longitude
function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Unable to retrieve weather data'));
}

// Display weather data on the web page
function displayWeather(data) {
    locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
    weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherDisplay.style.display = 'block';
}
