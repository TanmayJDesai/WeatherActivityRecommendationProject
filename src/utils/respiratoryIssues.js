// src/utils/respiratoryIssues.js

/**
 * Respiratory conditions that increase sensitivity to environmental factors
 */
const respiratoryConditions = [
    {
      id: 'asthma',
      name: 'Asthma',
      description: 'Chronic condition affecting the airways',
      sensitivityFactor: 1.5,
      affectedBy: ['aqi', 'humidity', 'temperature', 'pollen']
    },
    {
      id: 'copd',
      name: 'COPD',
      description: 'Chronic obstructive pulmonary disease',
      sensitivityFactor: 2.0,
      affectedBy: ['aqi', 'humidity', 'temperature']
    },
    {
      id: 'allergies',
      name: 'Allergies (Hay Fever)',
      description: 'Seasonal or perennial allergic rhinitis',
      sensitivityFactor: 1.3,
      affectedBy: ['pollen', 'aqi', 'humidity']
    },
    {
      id: 'bronchitis',
      name: 'Bronchitis',
      description: 'Inflammation of the bronchial tubes',
      sensitivityFactor: 1.4,
      affectedBy: ['aqi', 'temperature', 'humidity']
    },
    {
      id: 'emphysema',
      name: 'Emphysema',
      description: 'Lung condition causing shortness of breath',
      sensitivityFactor: 1.8,
      affectedBy: ['aqi', 'temperature', 'humidity']
    },
    {
      id: 'cysticFibrosis',
      name: 'Cystic Fibrosis',
      description: 'Hereditary disease affecting lungs and digestive system',
      sensitivityFactor: 2.0,
      affectedBy: ['aqi', 'humidity', 'temperature', 'infection-risk']
    },
    {
      id: 'lungCancer',
      name: 'Lung Cancer',
      description: 'Cancer that begins in the lungs',
      sensitivityFactor: 2.0,
      affectedBy: ['aqi', 'temperature', 'infection-risk']
    },
    {
      id: 'pulmonaryFibrosis',
      name: 'Pulmonary Fibrosis',
      description: 'Scarring of lung tissue',
      sensitivityFactor: 1.9,
      affectedBy: ['aqi', 'humidity', 'temperature']
    },
    {
      id: 'respiratoryInfection',
      name: 'Recent Respiratory Infection',
      description: 'Recovering from a respiratory infection',
      sensitivityFactor: 1.4,
      affectedBy: ['aqi', 'temperature', 'infection-risk']
    }
  ];
  
  /**
   * Severity levels for respiratory conditions
   */
  const severityLevels = [
    {
      id: 'mild',
      name: 'Mild',
      description: 'Occasional symptoms that respond well to treatment',
      factor: 1.0
    },
    {
      id: 'moderate',
      name: 'Moderate',
      description: 'Regular symptoms that may limit some activities',
      factor: 1.5
    },
    {
      id: 'severe',
      name: 'Severe',
      description: 'Frequent symptoms that significantly limit activities',
      factor: 2.0
    }
  ];
  
  /**
   * Adjusts recommendation severity based on user's respiratory conditions
   * @param {Object} recommendations - The original recommendations object
   * @param {Array} userConditions - Array of user's respiratory conditions with severity
   * @return {Object} - Updated recommendations with adjusted severity
   */
  function adjustRecommendationsBySensitivity(recommendations, userConditions) {
    if (!userConditions || userConditions.length === 0) {
      return recommendations; // No adjustments needed
    }
    
    // Create a copy of the original recommendations
    const adjustedRecommendations = JSON.parse(JSON.stringify(recommendations));
    
    // Calculate an overall sensitivity multiplier based on conditions and their severity
    let sensitivityMultiplier = 1.0;
    let affectedFactors = new Set();
    
    userConditions.forEach(userCondition => {
      const condition = respiratoryConditions.find(c => c.id === userCondition.conditionId);
      const severity = severityLevels.find(s => s.id === userCondition.severityId);
      
      if (condition && severity) {
        // Increase the sensitivity multiplier
        sensitivityMultiplier = Math.max(sensitivityMultiplier, condition.sensitivityFactor * severity.factor);
        
        // Add affected environmental factors to the set
        condition.affectedBy.forEach(factor => affectedFactors.add(factor));
      }
    });
    
    // Apply the sensitivity multiplier to severity levels
    if (adjustedRecommendations.severity) {
      // Store original severity for reference
      const originalSeverity = { ...adjustedRecommendations.severity };
      
      // Adjust severity levels
      if (affectedFactors.has('aqi') && adjustedRecommendations.severity.mask) {
        // Increase mask recommendations severity if AQI is an issue
        if (originalSeverity.mask === 'low') {
          adjustedRecommendations.severity.mask = sensitivityMultiplier >= 1.5 ? 'medium' : 'low';
        } else if (originalSeverity.mask === 'medium') {
          adjustedRecommendations.severity.mask = sensitivityMultiplier >= 1.3 ? 'high' : 'medium';
        }
      }
      
      if (adjustedRecommendations.severity.health) {
        // Increase health recommendations severity
        if (originalSeverity.health === 'low') {
          adjustedRecommendations.severity.health = sensitivityMultiplier >= 1.5 ? 'medium' : 'low';
        } else if (originalSeverity.health === 'medium') {
          adjustedRecommendations.severity.health = sensitivityMultiplier >= 1.3 ? 'high' : 'medium';
        }
      }
      
      // Recalculate overall severity
      if (adjustedRecommendations.severity.mask === 'high' || 
          adjustedRecommendations.severity.activity === 'high' || 
          adjustedRecommendations.severity.health === 'high') {
        adjustedRecommendations.severity.overall = 'high';
      } else if (adjustedRecommendations.severity.mask === 'medium' || 
                adjustedRecommendations.severity.activity === 'medium' || 
                adjustedRecommendations.severity.health === 'medium') {
        adjustedRecommendations.severity.overall = 'medium';
      } else {
        adjustedRecommendations.severity.overall = 'low';
      }
    }
    
    // Add additional recommendations for respiratory conditions
    const additionalRecommendations = generateAdditionalRecommendations(userConditions, affectedFactors);
    
    // Add respiratory-specific recommendations
    if (additionalRecommendations.length > 0) {
      if (!adjustedRecommendations.formattedRecommendations) {
        adjustedRecommendations.formattedRecommendations = {};
      }
      
      if (!adjustedRecommendations.formattedRecommendations.respiratory) {
        adjustedRecommendations.formattedRecommendations.respiratory = [];
      }
      
      adjustedRecommendations.formattedRecommendations.respiratory.push(...additionalRecommendations);
    }
    
    return adjustedRecommendations;
  }
  
  /**
   * Generates additional recommendations based on respiratory conditions
   * @param {Array} userConditions - User's respiratory conditions with severity
   * @param {Set} affectedFactors - Environmental factors that affect the user
   * @return {Array} - Array of additional recommendations
   */
  function generateAdditionalRecommendations(userConditions, affectedFactors) {
    const recommendations = [];
    
    // Add general respiratory recommendations
    recommendations.push("Keep rescue medications readily accessible at all times.");
    recommendations.push("Monitor your symptoms before, during, and after outdoor activities.");
    
    // Add specific recommendations based on conditions and factors
    if (affectedFactors.has('aqi')) {
      recommendations.push("Consider wearing an N95 mask when air quality is compromised, even at levels safe for the general population.");
      recommendations.push("Create a clean air space at home using HEPA air purifiers during poor air quality days.");
    }
    
    if (affectedFactors.has('humidity')) {
      recommendations.push("In dry conditions, consider using a portable humidifier indoors. In humid conditions, use dehumidifiers to maintain optimal humidity levels (30-50%).");
    }
    
    if (affectedFactors.has('temperature')) {
      recommendations.push("Use a scarf or mask to warm inhaled air during cold weather activities.");
      recommendations.push("Allow extra time for your body to acclimate to temperature changes before starting activities.");
    }
    
    if (affectedFactors.has('pollen')) {
      recommendations.push("Check pollen forecasts and plan activities when pollen counts are lower (typically in the evening and after rain).");
      recommendations.push("Shower and change clothes after outdoor activities to remove pollen.");
    }
    
    if (affectedFactors.has('infection-risk')) {
      recommendations.push("Consider wearing a mask in crowded settings during cold and flu season.");
      recommendations.push("Maintain vigilant hand hygiene when in public spaces.");
    }
    
    return recommendations;
  }
  
  module.exports = {
    respiratoryConditions,
    severityLevels,
    adjustRecommendationsBySensitivity
  };