document.getElementById("getLocation").addEventListener("click", async () => {
  const locationButton = document.getElementById("getLocation");
  const locationResult = document.getElementById("locationResult");
  
  try {
    locationButton.textContent = "Loading...";
    locationButton.disabled = true;

    const response = await fetch("/api/location");
    const data = await response.json();

    locationResult.innerHTML = `
      <p>IP: ${data.ip}</p>
      <p>City: ${data.city}</p>
      <p>Region: ${data.continent_name}</p>
      <p>Country: ${data.country_name}</p>
    `;
  } catch (error) {
    locationResult.innerHTML = "<p>Error fetching location data.</p>";
  } finally {
    locationButton.textContent = "Get Location";
    locationButton.disabled = false;
  }
});

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherButton = e.target.querySelector("button");
  const cityInput = document.getElementById("city");
  const weatherResult = document.getElementById("weatherResult");

  try {
    weatherButton.textContent = "Loading...";
    weatherButton.disabled = true;

    const city = cityInput.value;
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    // Convert temperature to Celsius
    const tempCelsius = (data.main.temp - 273.15).toFixed(2);

    weatherResult.innerHTML = `
      <p>City: ${data.name}</p>
      <p>Temperature: ${tempCelsius}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "<p>Error fetching weather data.</p>";
  } finally {
    weatherButton.textContent = "Get Weather";
    weatherButton.disabled = false;
  }
});
