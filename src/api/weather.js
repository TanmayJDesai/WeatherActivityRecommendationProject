// src/api/weather.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Weather API endpoint
router.get('/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const apiKey = process.env.WEATHER_API_KEY;
    
    // Call Weather API with enhanced parameters
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );
    
    // Format the data to match what our frontend and manualRecommendations.js expect
    const weatherData = {
      location: {
        name: response.data.location.name,
        region: response.data.location.region,
        country: response.data.location.country,
        lat: response.data.location.lat,
        lon: response.data.location.lon,
      },
      // Current data in the flat format expected by manualRecommendations.js
      temp_c: response.data.current.temp_c,
      temp_f: response.data.current.temp_f,
      humidity: response.data.current.humidity,
      wind_kph: response.data.current.wind_kph,
      wind_mph: response.data.current.wind_mph,
      wind_dir: response.data.current.wind_dir,
      uv: response.data.current.uv,
      feelslike_c: response.data.current.feelslike_c,
      feelslike_f: response.data.current.feelslike_f,
      vis_km: response.data.current.vis_km,
      condition: {
        text: response.data.current.condition.text,
        code: response.data.current.condition.code
      },
      // Current data in the nested format for consistent access
      current: {
        temp_c: response.data.current.temp_c,
        temp_f: response.data.current.temp_f,
        humidity: response.data.current.humidity,
        wind_kph: response.data.current.wind_kph,
        wind_dir: response.data.current.wind_dir,
        uv: response.data.current.uv,
        condition: {
          text: response.data.current.condition.text,
          code: response.data.current.condition.code
        },
        feelslike_c: response.data.current.feelslike_c,
        feelslike_f: response.data.current.feelslike_f,
        vis_km: response.data.current.vis_km
      },
      // Air quality data
      air_quality: {
        pm2_5: response.data.current.air_quality?.pm2_5,
        pm10: response.data.current.air_quality?.pm10,
        co: response.data.current.air_quality?.co,
        no2: response.data.current.air_quality?.no2,
        so2: response.data.current.air_quality?.so2,
        o3: response.data.current.air_quality?.o3,
        us_epa_index: response.data.current.air_quality?.['us-epa-index']
      }
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

module.exports = router;