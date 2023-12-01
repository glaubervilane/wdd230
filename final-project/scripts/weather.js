// Select HTML elements
const temperatureSpan = document.querySelector('#temperature');
const windSpeedSpan = document.querySelector('#wind-speed');
const windChillSpan = document.querySelector('#wind-chill');
const forecastContainer = document.getElementById('forecast-container');

// Declare URL variable for current weather
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Declare URL variable for 3-day forecast
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Define asynchronous function named "apiFetch()" for current weather
async function apiFetchCurrentWeather() {
  // Securely handle API key in a browser environment
  const apiKey = 'e890f6808ca6567333fbe9a956626fc9';

  // Ensure that the API key is provided
  if (!apiKey) {
    console.error("API Key is missing.");
    return;
  }

  const city = 'Cozumel';
  const countryCode = 'MX';
  const url = `${currentWeatherUrl}?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Define asynchronous function named "apiFetch()" for 3-day forecast
async function apiFetchForecast() {
  // Securely handle API key in a browser environment
  const apiKey = 'e890f6808ca6567333fbe9a956626fc9';

  // Ensure that the API key is provided
  if (!apiKey) {
    console.error("API Key is missing.");
    return;
  }

  const city = 'Cozumel';
  const countryCode = 'MX';
  const url = `${forecastUrl}?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Invoke the apiFetch() functions
apiFetchCurrentWeather();
apiFetchForecast();

// Build the displayCurrentWeather function
function displayCurrentWeather(data) {
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
      // Clear the image
      weatherIcon.src = '';
      weatherIcon.alt = 'Weather Icon';
      weatherDescription.innerHTML = 'Weather Description N/A';
    }

    // Calculate wind chill
    const windChillValue = calculateWindChill(data.main.temp, data.wind.speed);

    // Display wind chill or "N/A"
    const windChillParagraph = document.getElementById('wind-chill');
    if (!isNaN(windChillValue)) {
      windChillParagraph.innerHTML = `Wind Chill: ${windChillValue.toFixed(2)}&deg;F`;
    } else {
      windChillParagraph.innerHTML = 'Wind Chill: N/A';
    }
  } else {
    // Handle the case where data.weather is missing or empty
    console.error('Invalid or empty data.weather:', data.weather);
  }
}

function displayForecast(data) {
  // Check if data.list is defined and has at least one item
  if (data.list && data.list.length > 0) {
    // Clear previous forecast content
    forecastContainer.innerHTML = '';

    // Loop through the forecast data (for the next 3 days)
    for (let i = 0; i < 3; i++) {
      // Use i * 8 to get once per day
      const forecastItem = data.list[i * 8];

      // Create elements for each forecast item
      const forecastItemDiv = document.createElement('div');
      forecastItemDiv.classList.add('forecast-item');

      const dateParagraph = document.createElement('p');
      const temperatureParagraph = document.createElement('p');
      const weatherIconImg = document.createElement('img');

      // Format date and temperature
      const date = new Date(forecastItem.dt_txt);
      const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const temperature = forecastItem.main.temp.toFixed(2);

      // Set content and attributes
      dateParagraph.textContent = formattedDate;
      temperatureParagraph.innerHTML = `${temperature}&deg;F`;
      weatherIconImg.src = `https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`;
      weatherIconImg.alt = forecastItem.weather[0].description;

      // Append elements to the forecast item container
      forecastItemDiv.appendChild(dateParagraph);
      forecastItemDiv.appendChild(weatherIconImg);
      forecastItemDiv.appendChild(temperatureParagraph);

      // Append the forecast item container to the forecast container
      forecastContainer.appendChild(forecastItemDiv);
    }
  } else {
    // Handle the case where data.list is missing or empty
    console.error('Invalid or empty data.list:', data.list);
    // You might want to provide default values or display an error message
  }
}


// Function to calculate wind chill
function calculateWindChill(temperatureFahrenheit, windSpeedMPH) {
  const windChill = 35.74 + 0.6215 * temperatureFahrenheit - 35.75 * Math.pow(windSpeedMPH, 0.16) + 0.4275 * temperatureFahrenheit * Math.pow(windSpeedMPH, 0.16);
  return windChill;
}
