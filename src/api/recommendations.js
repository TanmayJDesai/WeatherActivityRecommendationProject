// src/api/recommendations.js
const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../utils/manualRecommendations');
const { adjustRecommendationsBySensitivity } = require('../utils/respiratoryIssues');

router.post('/', async (req, res) => {
  try {
    const { weatherData, userActivity, respiratoryConditions } = req.body;
    
    if (!weatherData || !userActivity) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Get base recommendations using our manual system
    const baseRecommendations = getRecommendations(weatherData, userActivity);
    
    // If user has respiratory conditions, adjust recommendations
    let finalRecommendations = baseRecommendations;
    if (respiratoryConditions && respiratoryConditions.length > 0) {
      finalRecommendations = adjustRecommendationsBySensitivity(baseRecommendations, respiratoryConditions);
    }
    
    // Return the full recommendations object
    res.json(finalRecommendations);
    
  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Provide a backup response with the same structure expected by the frontend
    const backupResponse = {
      recommendationText: {
        activitySafety: "Please use your own judgment based on local conditions and official advisories.",
        maskRecommendations: "Consider wearing an N95 mask if air quality is poor or if you have respiratory sensitivities.",
        healthMeasures: "Stay hydrated, check local weather and air quality reports before activities, and limit exposure during extreme weather or poor air quality."
      },
      formattedRecommendations: {
        activity: ["Please use your own judgment based on local conditions and official advisories."],
        protection: ["Consider wearing an N95 mask if air quality is poor or if you have respiratory sensitivities."],
        health: ["Stay hydrated, check local weather and air quality reports before activities, and limit exposure during extreme weather or poor air quality."]
      },
      severity: {
        overall: 'medium',
        activity: 'medium',
        mask: 'medium',
        health: 'medium'
      }
    };
    
    res.status(200).json(backupResponse);
  }
});

module.exports = router;