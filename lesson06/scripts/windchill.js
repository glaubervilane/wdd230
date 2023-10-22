// Get the temperature and wind speed values from the HTML elements
const temperatureInFahrenheit = parseFloat(document.getElementById("temperature").textContent);
const windSpeedInMph = parseFloat(document.getElementById("wind-speed").textContent);

// Convert wind speed to km/h (1 mph = 1.60934 km/h)
const windSpeedInKph = windSpeedInMph * 1.60934;

// Check if the input values meet the specifications for wind chill calculation
if (temperatureInFahrenheit <= 50 && windSpeedInKph > 4.8) {
  // Calculate the wind chill factor in Fahrenheit
  const windChillFahrenheit = 35.74 + 0.6215 * temperatureInFahrenheit - 35.75 * Math.pow(windSpeedInMph, 0.16) + 0.4275 * temperatureInFahrenheit * Math.pow(windSpeedInMph, 0.16);

  // Display the wind chill factor on the page
  document.getElementById("wind-chill").textContent = `Wind Chill: ${Math.round(windChillFahrenheit)}°F`;
} else {
  // If the input values do not meet the requirements, display "N/A"
  document.getElementById("wind-chill").textContent = "Wind Chill: N/A";
}