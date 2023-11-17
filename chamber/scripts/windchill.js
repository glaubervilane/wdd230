// Select HTML elements
const temperatureSpan = document.querySelector('#temperature');
const windSpeedSpan = document.querySelector('#wind-speed');
const windChillSpan = document.querySelector('#wind-chill');
const forecastContainer = document.querySelector('#forecast-container');

// Declare URL variable for current weather
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Declare URL variable for forecast
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Securely handle API key in a browser environment
const apiKey = 'e890f6808ca6567333fbe9a956626fc9';

// Ensure that the API key is provided
if (!apiKey) {
  console.error('API Key is missing.');
} else {
  // Fetch current weather data
  apiFetch(currentWeatherUrl, displayCurrentWeather);

  // Fetch forecast data
  apiFetch(forecastUrl, displayForecast);
}

// Define asynchronous function named "apiFetch()"
async function apiFetch(url, displayFunction) {
  const city = 'Calgary';
  const countryCode = 'CA';
  const fullUrl = `${url}?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      displayFunction(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to display current weather
function displayCurrentWeather(data) {
  // Display temperature in Fahrenheit
  temperatureSpan.innerHTML = `${data.main.temp.toFixed(2)}&deg;F`;

  // Display wind speed in mph
  windSpeedSpan.innerHTML = `${data.wind.speed.toFixed(2)}`;

  // Set weather icon and description
  const weatherIcon = document.getElementById('weather-icon');
  const weatherDescription = document.getElementById('weather-description');
  weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.alt = data.weather[0].description;
  weatherDescription.innerHTML = data.weather[0].description;

  // Calculate wind chill
  const windChillValue = calculateWindChill(data.main.temp, data.wind.speed);

  // Display wind chill or "N/A"
  if (data.main.temp <= 50 && data.wind.speed > 3.0) {
    windChillSpan.innerHTML = `Wind Chill: ${windChillValue.toFixed(2)}&deg;F`;
  } else {
    windChillSpan.innerHTML = 'Wind Chill: N/A';
  }
}

// Function to display forecast
function displayForecast(data) {
  // Filter forecast data for the next 3 days
  const forecastData = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  // Display only the first 3 days of forecast data
  const slicedForecastData = forecastData.slice(0, 3);

  // Display forecast data
  forecastContainer.innerHTML = '';
  slicedForecastData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <p>${day}</p>
      <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
      <p>${item.main.temp.toFixed(2)}&deg;F</p>
    `;

    forecastContainer.appendChild(forecastItem);
  });
}

// Function to calculate wind chill
function calculateWindChill(temperatureFahrenheit, windSpeedMPH) {
  const windChill =
    35.74 +
    0.6215 * temperatureFahrenheit -
    35.75 * Math.pow(windSpeedMPH, 0.16) +
    0.4275 * temperatureFahrenheit * Math.pow(windSpeedMPH, 0.16);
  return windChill;
}
