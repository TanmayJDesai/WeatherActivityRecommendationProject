// src/api/recommendations.js
const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../utils/manualRecommendations');

router.post('/', async (req, res) => {
  try {
    const { weatherData, userActivity } = req.body;
    
    if (!weatherData || !userActivity) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Get recommendations using our manual system
    const recommendations = getRecommendations(weatherData, userActivity);
    
    // Return the structured recommendations
    res.json({
      recommendations: recommendations.recommendationText,
      parsed: {
        activitySafety: recommendations.activitySafety,
        maskRecommendations: recommendations.maskRecommendations,
        healthMeasures: recommendations.healthMeasures
      },
      severity: recommendations.severity
    });
    
  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Provide a backup response
    const backupResponse = {
      recommendationText: "Unable to generate specific recommendations at this time.",
      activitySafety: "Please use your own judgment based on local conditions and official advisories.",
      maskRecommendations: "Consider wearing an N95 mask if air quality is poor or if you have respiratory sensitivities.",
      healthMeasures: "Stay hydrated, check local weather and air quality reports before activities, and limit exposure during extreme weather or poor air quality.",
      severity: {activity: 'medium', mask: 'medium', health: 'medium'}
    };
    
    res.status(200).json({ 
      error: 'Error generating recommendations', 
      message: error.message,
      recommendations: backupResponse.recommendationText,
      parsed: {
        activitySafety: backupResponse.activitySafety,
        maskRecommendations: backupResponse.maskRecommendations,
        healthMeasures: backupResponse.healthMeasures
      },
      severity: backupResponse.severity
    });
  }
});

module.exports = router;