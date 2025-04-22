const express = require('express');
const { HfInference } = require('@huggingface/inference');
const router = express.Router();
const { parseRecommendations, categorizeSeverity } = require('../utils/recommendations');

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_TOKEN || 'hf_dummy_token_replace_me');

router.post('/', async (req, res) => {
  try {
    const { weatherData, userActivity } = req.body;
    
    if (!weatherData || !userActivity) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Extract relevant environmental data for the AI prompt
    const location = `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`;
    const aqiValue = weatherData.air_quality.us_epa_index;
    const uvValue = weatherData.current.uv;
    
    // Convert AQI to text description
    let aqiCategory = 'Not available';
    if (aqiValue === 1) aqiCategory = 'Good';
    else if (aqiValue === 2) aqiCategory = 'Moderate';
    else if (aqiValue === 3) aqiCategory = 'Unhealthy for Sensitive Groups';
    else if (aqiValue === 4) aqiCategory = 'Unhealthy';
    else if (aqiValue === 5) aqiCategory = 'Very Unhealthy';
    else if (aqiValue === 6) aqiCategory = 'Hazardous';
    
    // Convert UV to text description
    let uvCategory = 'Not available';
    if (uvValue >= 0 && uvValue <= 2) uvCategory = 'Low';
    else if (uvValue >= 3 && uvValue <= 5) uvCategory = 'Moderate';
    else if (uvValue >= 6 && uvValue <= 7) uvCategory = 'High';
    else if (uvValue >= 8 && uvValue <= 10) uvCategory = 'Very High';
    else if (uvValue >= 11) uvCategory = 'Extreme';

    // Create comprehensive prompt for the AI
    const prompt = `
You are an environmental health and safety expert. Based on the following environmental data and planned activity, provide specific safety recommendations formatted exactly as specified below.

ENVIRONMENTAL DATA:
- Location: ${location}
- Weather: ${weatherData.current.condition}
- Temperature: ${weatherData.current.temp_c}°C (${weatherData.current.temp_f}°F), Feels like: ${weatherData.current.feelslike_c}°C
- Humidity: ${weatherData.current.humidity}%
- Wind: ${weatherData.current.wind_kph} kph, ${weatherData.current.wind_dir}
- Visibility: ${weatherData.current.vis_km} km
- UV Index: ${uvValue} (${uvCategory})
- Air Quality Index (US EPA): ${aqiValue} (${aqiCategory})
- PM2.5: ${weatherData.air_quality.pm2_5 ? weatherData.air_quality.pm2_5.toFixed(2) + ' μg/m³' : 'Not available'}
- PM10: ${weatherData.air_quality.pm10 ? weatherData.air_quality.pm10.toFixed(2) + ' μg/m³' : 'Not available'}
- Carbon Monoxide: ${weatherData.air_quality.co ? weatherData.air_quality.co.toFixed(2) + ' μg/m³' : 'Not available'}
- Nitrogen Dioxide: ${weatherData.air_quality.no2 ? weatherData.air_quality.no2.toFixed(2) + ' μg/m³' : 'Not available'}
- Sulfur Dioxide: ${weatherData.air_quality.so2 ? weatherData.air_quality.so2.toFixed(2) + ' μg/m³' : 'Not available'}
- Ozone: ${weatherData.air_quality.o3 ? weatherData.air_quality.o3.toFixed(2) + ' μg/m³' : 'Not available'}

PLANNED ACTIVITY:
${userActivity}

Provide recommendations in EXACTLY this format:

Activity Safety Assessment:
[Evaluate if the activity is safe given current conditions. Include specific risks related to weather, pollution, and UV exposure. Suggest modifications or alternatives if needed.]

Mask Recommendations:
[Provide specific mask recommendations for the current air quality: whether masks are necessary, what types (N95, surgical, cloth), when to wear them, who needs them most.]

Health Measures:
[Additional health precautions to take before, during, and after the activity. Include hydration advice, clothing recommendations, timing considerations, and any special measures for vulnerable individuals.]

Be precise, practical, and evidence-based in your recommendations.
`;

    // Call Hugging Face text generation using a model that's available for text generation
    const response = await hf.textGeneration({
      model: 'tiiuae/falcon-7b-instruct', // Model that supports text-generation task
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
      }
    });

    // Extract the generated text
    const generatedText = response.generated_text;
    
    // Parse the recommendations and categorize by severity
    const parsedRecommendations = parseRecommendations(generatedText);
    const severity = categorizeSeverity(parsedRecommendations);

    // Return recommendations
    return res.json({
      recommendations: generatedText,
      parsed: parsedRecommendations,
      severity: severity
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Provide a backup response
    const backupResponse = `
Activity Safety Assessment:
Based on the available data, we cannot provide personalized recommendations at this time. Please use your own judgment based on local conditions and official advisories.

Mask Recommendations:
For general guidance, consider wearing an N95 mask if air quality is poor or if you have respiratory sensitivities.

Health Measures:
Stay hydrated, check local weather and air quality reports before outdoor activities, and limit exposure during extreme weather or poor air quality.
    `;
    
    res.status(200).json({ 
      error: 'Error generating recommendations', 
      message: error.message,
      recommendations: backupResponse,
      parsed: parseRecommendations(backupResponse),
      severity: {activity: 'medium', mask: 'medium', health: 'medium'}
    });
  }
});

module.exports = router;