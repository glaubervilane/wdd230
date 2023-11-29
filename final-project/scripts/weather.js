// Select HTML elements
const temperatureSpan = document.querySelector('#temperature');
const windSpeedSpan = document.querySelector('#wind-speed');
const windChillSpan = document.querySelector('#wind-chill');
const forecastContainer = document.getElementById('forecast-container');

// Declare URL variable
const url = 'https://api.openweathermap.org/data/2.5/forecast';

// Define asynchronous function named "apiFetch()"
async function apiFetch() {
  // Securely handle API key in a browser environment
  const apiKey = 'e890f6808ca6567333fbe9a956626fc9';

  // Ensure that the API key is provided
  if (!apiKey) {
    console.error("API Key is missing.");
    return;
  }

  const city = 'Cozumel';
  const countryCode = 'MX';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Invoke the apiFetch() function
apiFetch();

// Build the displayResults function
function displayResults(data) {
  // Check if data.weather is defined and has at least one item
  if (data.weather && data.weather.length > 0) {
    // Display temperature in Fahrenheit
    temperatureSpan.innerHTML = `${data.main.temp.toFixed(2)}&deg;F`;

    // Display wind speed in mph
    windSpeedSpan.innerHTML = `${data.wind.speed.toFixed(2)}`;

    // Set weather icon and description
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    
    // Check if the first item in data.weather has the expected properties
    if (data.weather[0].icon && data.weather[0].description) {
      weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIcon.alt = data.weather[0].description;
      weatherDescription.innerHTML = data.weather[0].description;
    } else {
      // Handle the case where the properties are missing
      weatherIcon.src = ''; // Clear the image
      weatherIcon.alt = 'Weather Icon';
      weatherDescription.innerHTML = 'Weather Description N/A';
    }

    // Calculate wind chill
    const windChillValue = calculateWindChill(data.main.temp, data.wind.speed);

    // Display wind chill or "N/A"
    if (data.main.temp <= 50 && data.wind.speed > 3.0) {
      windChillSpan.innerHTML = `Wind Chill: ${windChillValue.toFixed(2)}&deg;F`;
    } else {
      windChillSpan.innerHTML = 'Wind Chill: N/A';
    }
  } else {
    // Handle the case where data.weather is missing or empty
    console.error('Invalid or empty data.weather:', data.weather);
    // You might want to provide default values or display an error message
  }
}

// Function to calculate wind chill
function calculateWindChill(temperatureFahrenheit, windSpeedMPH) {
  const windChill = 35.74 + 0.6215 * temperatureFahrenheit - 35.75 * Math.pow(windSpeedMPH, 0.16) + 0.4275 * temperatureFahrenheit * Math.pow(windSpeedMPH, 0.16);
  return windChill;
}
