// src/api/openai.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai'); // Updated import for newer OpenAI SDK
const { parseRecommendations } = require('../utils/recommendations'); // Updated path to recommendations.js

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Using your existing API key
});

// API endpoint for recommendations
router.post('/', async (req, res) => {
  try {
    const { weatherData, userActivity } = req.body;
    
    // Create a well-formatted prompt for the OpenAI API
    const prompt = `
You are an environmental safety advisor providing guidance based on current weather and air quality conditions.

Location: ${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}
Planned Activity: ${userActivity}

Current Weather Conditions:
- Temperature: ${weatherData.current.temp_c}°C (${weatherData.current.temp_f}°F)
- Feels Like: ${weatherData.current.feelslike_c}°C (${weatherData.current.feelslike_f}°F)
- Weather: ${weatherData.current.condition}
- Humidity: ${weatherData.current.humidity}%
- Wind: ${weatherData.current.wind_kph} kph, ${weatherData.current.wind_dir}
- Visibility: ${weatherData.current.vis_km} km
- UV Index: ${weatherData.current.uv}

Air Quality Data:
- US EPA Index: ${weatherData.air_quality.us_epa_index || 'Not available'}
- PM2.5: ${weatherData.air_quality.pm2_5 ? weatherData.air_quality.pm2_5.toFixed(2) + ' μg/m³' : 'Not available'}
- PM10: ${weatherData.air_quality.pm10 ? weatherData.air_quality.pm10.toFixed(2) + ' μg/m³' : 'Not available'}
- Ozone: ${weatherData.air_quality.o3 ? weatherData.air_quality.o3.toFixed(2) + ' μg/m³' : 'Not available'}
- Carbon Monoxide: ${weatherData.air_quality.co ? weatherData.air_quality.co.toFixed(2) + ' μg/m³' : 'Not available'}
- Nitrogen Dioxide: ${weatherData.air_quality.no2 ? weatherData.air_quality.no2.toFixed(2) + ' μg/m³' : 'Not available'}
- Sulfur Dioxide: ${weatherData.air_quality.so2 ? weatherData.air_quality.so2.toFixed(2) + ' μg/m³' : 'Not available'}

Based on this information, provide specific recommendations in these three clearly labeled sections:

Activity Safety Assessment: 
[Evaluate if the activity is safe given the current conditions. Provide a clear assessment and any modifications needed.]

Mask Recommendations: 
[Suggest what type of mask, if any, would be appropriate for the current air quality conditions.]

Health Measures: 
[Additional health precautions the person should take, especially for sensitive groups.]

Keep your response concise and clearly structured with these exact section headings.
`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using GPT-3.5 which is available on free tier
      messages: [
        { role: "system", content: "You are an environmental safety advisor providing accurate, helpful safety recommendations." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    // Extract the recommendation text from the response
    const recommendationText = response.choices[0].message.content;
    
    // Parse the recommendations into structured format
    const recommendationSections = parseRecommendations(recommendationText);
    
    res.json({
      recommendations: recommendationText,
      structuredRecommendations: recommendationSections
    });
    
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      details: error.message
    });
  }
});

module.exports = router;