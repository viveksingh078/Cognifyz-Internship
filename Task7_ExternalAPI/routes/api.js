const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fetch Location Data
router.get("/location", async (req, res) => {
  try {
    const apiKey = "a45447b08d5d48459db769b5e7a95be5";
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Unable to fetch location data.", details: error.message });
  }
});

// Fetch Weather Data (Optional)
router.get("/weather", async (req, res) => {
  try {
    const city = req.query.city || "New York";
    const apiKey = "6f68473d36bd6d3a5dc8953dad5b80e7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    // Perform the HTTP request using axios
    const response = await axios.get(url);

    // Send the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Unable to fetch weather data." });
  }
});

module.exports = router;
