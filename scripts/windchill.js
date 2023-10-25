/* code in javascript of weather with openweathermap============  */


window.addEventListener('load', async () => {
  const latitude = 51.0447;
  const longitude = -114.0719;

  const temperatureSpan = document.querySelector('#temperature');
  const windSpeedSpan = document.querySelector('#wind-speed');
  const windChillSpan = document.querySelector('#wind-chill');

  const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + latitude + ',' + longitude;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4edddb0f16mshdf57012d8fe67ffp1583d3jsnb5caa4023c12',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Extract actual temperature in Fahrenheit
    const actualTemperature = data.current.temp_f;

    // Update the temperature span with the actual temperature
    temperatureSpan.textContent = actualTemperature.toFixed(2) + '°F';

    // Extract temperature in Celsius and wind speed in m/s
    const temperatureCelsius = data.current.temp_c;
    const windSpeedMS = data.current.wind_kph / 3.6;

    // Convert temperature to Fahrenheit
    const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

    // Convert wind speed to miles per hour
    const windSpeedMPH = windSpeedMS * 2.237;

    // Update the temperature and wind speed spans
    temperatureSpan.textContent = temperatureFahrenheit.toFixed(2) + '°F';
    windSpeedSpan.textContent = windSpeedMPH.toFixed(2) + ' mph';

    // Calculate the wind chill
    const windChillValue = calculateWindChill(temperatureFahrenheit, windSpeedMPH);

    // Display wind chill or "N/A"
    if (temperatureFahrenheit <= 50 && windSpeedMPH > 3.0) {
      windChillSpan.textContent = 'Wind Chill: ' + windChillValue.toFixed(2) + '°F';
    } else {
      windChillSpan.textContent = 'Wind Chill: N/A';
    }
  } catch (error) {
    console.error(error);
  }
});

// Function to calculate wind chill
function calculateWindChill(temperatureFahrenheit, windSpeedMPH) {
  const windChill = 35.74 + (0.6215 * temperatureFahrenheit) - 35.75 * Math.pow(windSpeedMPH, 0.16) + 0.4275 * temperatureFahrenheit * Math.pow(windSpeedMPH, 0.16);
  return windChill;
}