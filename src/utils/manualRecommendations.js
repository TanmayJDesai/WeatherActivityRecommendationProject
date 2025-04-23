// src/utils/manualRecommendations.js

// Activity categories with keywords
const activityCategories = {
  outdoorVigorous: [
    'run', 'running', 'jog', 'jogging', 'hike', 'hiking', 'bike', 'biking', 'cycling',
    'exercise', 'workout', 'sport', 'athletics', 'training', 'cardio', 'swimming', 'swim', 
    'tennis', 'basketball', 'soccer', 'football', 'baseball', 'volleyball', 'sprint', 
    'marathon', 'triathlon', 'crossfit', 'climbing'
  ],
  
  outdoorModerate: [
    'walk', 'walking', 'outdoor', 'outside', 'garden', 'gardening', 'yard work', 
    'picnic', 'sightseeing', 'golf', 'leisure', 'stroll', 'fishing', 'camping',
    'photography', 'birdwatching', 'playground', 'park', 'barbecue', 'bbq'
  ],
  
  indoorActive: [
    'gym', 'fitness', 'yoga', 'pilates', 'dance', 'weightlifting', 'weights', 
    'treadmill', 'elliptical', 'spinning', 'aerobics', 'zumba', 'exercise class',
    'bowling', 'indoor climbing', 'martial arts', 'boxing', 'wrestling',
    'indoor swimming', 'badminton', 'squash', 'racquetball'
  ],
  
  indoorStationary: [
    'work', 'office', 'desk', 'study', 'read', 'reading', 'write', 'writing',
    'computer', 'laptop', 'meeting', 'cooking', 'baking', 'crafts', 'art',
    'painting', 'drawing', 'gaming', 'video games', 'watching tv', 'movie',
    'indoors', 'inside', 'sitting', 'rest', 'relax', 'meditation'
  ],
  
  sleepRest: [
    'sleep', 'sleeping', 'nap', 'napping', 'rest', 'resting', 'bed', 'bedtime',
    'recovery', 'relaxation'
  ],
  
  commuting: [
    'commute', 'commuting', 'drive', 'driving', 'car', 'bus', 'train', 'subway',
    'metro', 'transit', 'transportation', 'travel', 'travelling', 'bike commute',
    'walk to work', 'rideshare', 'carpool'
  ],
  
  childrenOutdoor: [
    'playground', 'play', 'children', 'kids', 'toddler', 'baby', 'infant',
    'daycare', 'school recess', 'sports practice', 'child', 'youth sports'
  ],
  
  seniorActivities: [
    'elderly', 'senior', 'retirement', 'gentle exercise', 'senior center',
    'assisted living', 'nursing home', 'retirement community'
  ],
  
  construction: [
    'construction', 'building', 'renovation', 'remodel', 'contractor', 'worksite',
    'demolition', 'painting', 'roofing', 'landscaping', 'labor', 'digging'
  ]
};

// Thresholds for different environmental factors
const thresholds = {
  aqi: {
    good: 1,                   // AQI 1 - Good
    moderate: 2,               // AQI 2 - Moderate
    sensitiveUnhealthy: 3,     // AQI 3 - Unhealthy for Sensitive Groups
    unhealthy: 4,              // AQI 4 - Unhealthy
    veryUnhealthy: 5,          // AQI 5 - Very Unhealthy
    hazardous: 6               // AQI 6 - Hazardous
  },
  
  uv: {
    low: 2,                    // UV 0-2 - Low
    moderate: 5,               // UV 3-5 - Moderate
    high: 7,                   // UV 6-7 - High
    veryHigh: 10,              // UV 8-10 - Very High
    extreme: 11                // UV 11+ - Extreme
  },
  
  temperature: {
    veryCold: 0,               // Below 0°C (32°F)
    cold: 10,                  // 0-10°C (32-50°F)
    cool: 15,                  // 10-15°C (50-59°F)
    mild: 25,                  // 15-25°C (59-77°F)
    warm: 30,                  // 25-30°C (77-86°F)
    hot: 35,                   // 30-35°C (86-95°F)
    veryHot: 40,               // 35-40°C (95-104°F)
    extreme: 100               // Above 40°C (104°F)
  },
  
  humidity: {
    veryDry: 20,               // Below 20%
    dry: 30,                   // 20-30%
    comfortable: 60,           // 30-60%
    humid: 80,                 // 60-80%
    veryHumid: 100             // Above 80%
  },
  
  wind: {
    calm: 10,                  // 0-10 kph
    light: 20,                 // 10-20 kph
    moderate: 30,              // 20-30 kph
    strong: 40,                // 30-40 kph
    veryStrong: 50,            // 40-50 kph
    extreme: 100               // Above 50 kph
  },
  
  visibility: {
    veryPoor: 1,               // Below 1 km
    poor: 3,                   // 1-3 km
    moderate: 5,               // 3-5 km
    good: 10,                  // 5-10 km
    excellent: 100             // Above 10 km
  },
  
  pm25: {
    good: 12,                  // 0-12 μg/m³
    moderate: 35.4,            // 12.1-35.4 μg/m³
    sensitiveUnhealthy: 55.4,  // 35.5-55.4 μg/m³
    unhealthy: 150.4,          // 55.5-150.4 μg/m³
    veryUnhealthy: 250.4,      // 150.5-250.4 μg/m³
    hazardous: 500             // Above 250.5 μg/m³
  }
};

/**
 * Determines which activity category an activity belongs to based on keywords.
 * @param {string} activity - The user's planned activity.
 * @return {string} The determined category.
 */
function categorizeActivity(activity) {
  const activityLower = activity.toLowerCase();
  
  for (const [category, keywords] of Object.entries(activityCategories)) {
    for (const keyword of keywords) {
      if (activityLower.includes(keyword)) {
        return category;
      }
    }
  }
  
  // Default to outdoorModerate if we can't categorize
  return 'outdoorModerate';
}

/**
 * Formats recommendations into a structured object with categories.
 * @param {Object} recommendations - Raw recommendation texts.
 * @return {Object} Categorized recommendations.
 */
function formatRecommendations(recommendations) {
  // Parse each recommendation into separate points
  const formatSection = (text) => {
    return text
      .split('.')
      .filter(item => item.trim().length > 0)
      .map(item => item.trim() + '.');
  };
  
  // Initialize categories for recommendations
  const formattedRecommendations = {
    activity: [],
    protection: [],
    health: [],
    timing: [],
    clothing: [],
    general: []
  };
  
  // Parse activity safety recommendations
  const activityRecs = formatSection(recommendations.activitySafety);
  formattedRecommendations.activity = activityRecs;
  
  // Parse mask recommendations
  const maskRecs = formatSection(recommendations.maskRecommendations);
  formattedRecommendations.protection = maskRecs;
  
  // Parse health measures
  const healthRecs = formatSection(recommendations.healthMeasures);
  
  // Categorize health measures into more specific categories
  healthRecs.forEach(rec => {
    if (rec.includes('HYDRATION') || rec.includes('water') || rec.includes('hydration')) {
      if (!formattedRecommendations.hasOwnProperty('hydration')) {
        formattedRecommendations.hydration = [];
      }
      formattedRecommendations.hydration.push(rec);
    } else if (rec.includes('SUN PROTECTION') || rec.includes('sunscreen') || rec.includes('SPF')) {
      formattedRecommendations.protection.push(rec);
    } else if (rec.includes('TIMING') || rec.includes('between') || rec.includes('during')) {
      if (!formattedRecommendations.hasOwnProperty('timing')) {
        formattedRecommendations.timing = [];
      }
      formattedRecommendations.timing.push(rec);
    } else if (rec.includes('DRESS') || rec.includes('clothing') || rec.includes('layers') || rec.includes('wear')) {
      if (!formattedRecommendations.hasOwnProperty('clothing')) {
        formattedRecommendations.clothing = [];
      }
      formattedRecommendations.clothing.push(rec);
    } else {
      formattedRecommendations.health.push(rec);
    }
  });
  
  // Remove any empty categories
  Object.keys(formattedRecommendations).forEach(key => {
    if (formattedRecommendations[key].length === 0) {
      delete formattedRecommendations[key];
    }
  });
  
  return formattedRecommendations;
}

/**
 * Get activity safety recommendation based on category and conditions.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Safety assessment with text and severity level.
 */
function getActivitySafetyRecommendation(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { aqi, uv, temp, humidity, wind, visibility, pm25, condition } = data;
  
  // Start with a safety assessment base
  let safety = "Based on current conditions: ";
  let severity = "low";
  
  // Check weather condition first for obvious issues
  const dangerWeather = ['thunderstorm', 'lightning', 'hurricane', 'tornado', 'blizzard', 'hail'];
  const cautionWeather = ['rain', 'snow', 'sleet', 'fog', 'mist', 'drizzle', 'shower', 'overcast'];
  const weatherText = condition.toLowerCase();
  
  if (dangerWeather.some(w => weatherText.includes(w))) {
    safety += "UNSAFE due to current weather conditions. Consider indoor alternatives. ";
    severity = "high";
  } else if (cautionWeather.some(w => weatherText.includes(w))) {
    safety += "Use CAUTION due to current weather conditions. Adjust plans accordingly. ";
    severity = "medium";
  }
  
  // Add specific advice based on activity category
  switch (category) {
    case 'outdoorVigorous':
      // AQI checks
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "UNSAFE for vigorous outdoor activity due to poor air quality (AQI: " + aqi + "). ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "CAUTION for vigorous outdoor activity due to compromised air quality (AQI: " + aqi + "). Consider reducing intensity or duration. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature checks
      if (temp <= thresholds.temperature.cold) {
        safety += "COLD conditions require proper layering and limited exposure time. ";
        severity = severity === "low" ? "medium" : severity;
      } else if (temp >= thresholds.temperature.hot) {
        safety += "HOT conditions require proper hydration and avoiding midday exertion. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // UV Index checks for outdoor activities
      if (uv >= thresholds.uv.high) {
        safety += "HIGH UV exposure risk. Use sun protection and limit direct exposure. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'outdoorModerate':
      // AQI checks (slightly more lenient than vigorous)
      if (aqi >= thresholds.aqi.veryUnhealthy) {
        safety += "UNSAFE for outdoor activities due to very poor air quality (AQI: " + aqi + "). ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.unhealthy) {
        safety += "CAUTION for outdoor activities due to poor air quality (AQI: " + aqi + "). Consider shorter duration. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature and other checks similar to vigorous but with different thresholds
      if (temp <= thresholds.temperature.veryCold || temp >= thresholds.temperature.veryHot) {
        safety += "EXTREME temperature conditions require proper precautions and limited exposure. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'indoorActive':
      // Indoor activities are generally safer regarding weather, but still check air quality if ventilation is poor
      if (aqi >= thresholds.aqi.hazardous) {
        safety += "Ensure indoor air filtration is adequate during hazardous outdoor air quality conditions. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'indoorStationary':
      // Generally safe from most environmental concerns
      if (aqi >= thresholds.aqi.veryUnhealthy) {
        safety += "Keep windows closed and use air purification during very poor outdoor air quality. ";
      }
      break;
      
    case 'sleepRest':
      // Optimize sleep environment
      if (temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cold) {
        safety += "Consider adjusting room temperature for optimal sleep conditions. ";
      }
      break;
      
    case 'commuting':
      // Check visibility and road conditions
      if (visibility <= thresholds.visibility.poor) {
        safety += "CAUTION for commuting due to poor visibility conditions. ";
        severity = severity === "low" ? "medium" : severity;
      }
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Use vehicle air recirculation mode during poor air quality conditions. ";
      }
      break;
      
    case 'childrenOutdoor':
      // More protective thresholds for children
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "NOT RECOMMENDED for children's outdoor activities due to air quality concerns (AQI: " + aqi + "). ";
        severity = "high";
      } else if (uv >= thresholds.uv.high) {
        safety += "CAUTION for children outdoors due to high UV index. Ensure sun protection and frequent breaks. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'seniorActivities':
      // More protective thresholds for seniors
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "NOT RECOMMENDED for senior outdoor activities due to air quality concerns (AQI: " + aqi + "). ";
        severity = "high";
      }
      if (temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cool) {
        safety += "CAUTION for seniors due to temperature considerations. Ensure proper hydration and appropriate clothing. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'construction':
      // Construction and occupational exposure
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "OCCUPATIONAL HAZARD: Respiratory protection recommended for outdoor work due to poor air quality. ";
        severity = "high";
      }
      if (uv >= thresholds.uv.high) {
        safety += "Sun protection essential for outdoor construction work. ";
      }
      break;
      
    default:
      // General advice for uncategorized activities
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Consider indoor alternatives during poor air quality conditions. ";
        severity = severity === "low" ? "medium" : severity;
      }
  }
  
  return { 
    text: safety, 
    severity: severity 
  };
}

/**
 * Helper function to extract and normalize weather data from API response.
 * @param {Object} weatherData - The weather data from the API.
 * @return {Object} Normalized weather data for processing.
 */
function extractWeatherData(weatherData) {
  // Handle potentially different data structures from the API
  const current = weatherData.current || {};
  const airQuality = weatherData.air_quality || {};
  
  return {
    aqi: airQuality.us_epa_index || 1, // Default to good if missing
    uv: current.uv || 0,
    temp: current.temp_c || 20, // Default to mild if missing
    humidity: current.humidity || 50,
    wind: current.wind_kph || 0,
    visibility: current.vis_km || 10,
    pm25: airQuality.pm2_5 || 0,
    condition: current.condition ? current.condition.text || '' : ''
  };
}

/**
 * Get mask recommendations based on conditions.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Mask recommendations with text and severity level.
 */
function getMaskRecommendations(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { aqi, pm25 } = data;
  
  let recommendation = "";
  let severity = "low";
  
  // General mask recommendations based on AQI
  if (aqi >= thresholds.aqi.hazardous) {
    recommendation = "N95/KN95 masks STRONGLY RECOMMENDED for everyone when outdoors. ";
    severity = "high";
  } else if (aqi >= thresholds.aqi.veryUnhealthy) {
    recommendation = "N95/KN95 masks RECOMMENDED for everyone when outdoors. ";
    severity = "high";
  } else if (aqi >= thresholds.aqi.unhealthy) {
    recommendation = "N95/KN95 masks RECOMMENDED for extended outdoor exposure. Surgical masks provide minimal protection. ";
    severity = "medium";
  } else if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
    recommendation = "N95/KN95 masks RECOMMENDED for sensitive individuals (those with respiratory conditions, elderly, children) during outdoor activities. ";
    severity = "medium";
  } else if (aqi >= thresholds.aqi.moderate) {
    recommendation = "Masks generally NOT NECESSARY for most people. Those with severe respiratory sensitivity may consider a mask during extended outdoor exposure. ";
  } else {
    recommendation = "Masks NOT NECESSARY for air quality protection under current conditions. ";
  }
  
  // Additional specific recommendations based on activity category
  switch (category) {
    case 'outdoorVigorous':
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        recommendation += "Note that masks may restrict airflow during vigorous exercise - consider reducing intensity instead. ";
      }
      break;
      
    case 'childrenOutdoor':
      if (aqi >= thresholds.aqi.moderate) {
        recommendation += "Ensure proper fitting masks for children if used. Children under 2 should not wear masks. ";
      }
      break;
      
    case 'construction':
      if (aqi >= thresholds.aqi.moderate || pm25 >= thresholds.pm25.moderate) {
        recommendation += "Occupational-grade respiratory protection recommended for construction work, especially when dust-generating activities are involved. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
  }
  
  return {
    text: recommendation,
    severity: severity
  };
}

/**
 * Get health measures based on conditions and activity.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Health measures with text and severity level.
 */
function getHealthMeasures(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { aqi, uv, temp, humidity } = data;
  
  let measures = "";
  let severity = "low";
  
  // General health measures
  if (temp >= thresholds.temperature.warm) {
    measures += "HYDRATION: Drink plenty of water before, during, and after activities. ";
    if (temp >= thresholds.temperature.hot) {
      measures += "HEAT SAFETY: Take frequent breaks in shade or air-conditioning. Know the signs of heat exhaustion. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  if (temp <= thresholds.temperature.cool) {
    measures += "COLD PROTECTION: Dress in layers and protect extremities. ";
    if (temp <= thresholds.temperature.cold) {
      measures += "HYPOTHERMIA RISK: Limit exposure time and maintain dry clothing. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  if (uv >= thresholds.uv.moderate) {
    measures += "SUN PROTECTION: Use SPF 30+ sunscreen, wear hat, sunglasses, and UPF clothing. ";
    if (uv >= thresholds.uv.high) {
      measures += "LIMIT EXPOSURE: Avoid direct sun between 10am-4pm. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
    measures += "AIR QUALITY PRECAUTIONS: Monitor symptoms like coughing, throat irritation, or difficulty breathing. ";
    if (aqi >= thresholds.aqi.unhealthy) {
      measures += "Keep rescue medications handy if you have asthma or other respiratory conditions. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  // Activity-specific health measures
  switch (category) {
    case 'outdoorVigorous':
      measures += "EXERTION: Warm up properly and adjust intensity based on conditions. ";
      if (aqi >= thresholds.aqi.moderate || temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cool) {
        measures += "Consider shorter duration or lower intensity exercise under current conditions. ";
      }
      break;
      
    case 'outdoorModerate':
      if (humidity >= thresholds.humidity.humid && temp >= thresholds.temperature.warm) {
        measures += "HUMIDITY CAUTION: High humidity makes it harder for your body to cool down. Take more frequent breaks and increase hydration. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'childrenOutdoor':
      measures += "CHILDREN PRECAUTIONS: Children are more susceptible to air pollution, UV damage, and temperature extremes. Ensure more frequent breaks, hydration, and monitoring than for adults. ";
      if (aqi >= thresholds.aqi.moderate || uv >= thresholds.uv.moderate) {
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'seniorActivities':
      measures += "SENIOR PRECAUTIONS: Older adults may have reduced thirst sensation and temperature sensitivity. Ensure regular hydration and appropriate clothing regardless of perceived need. ";
      if (aqi >= thresholds.aqi.moderate || temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cool) {
        severity = severity === "low" ? "medium" : severity;
      }
      break;
  }
  
  return {
    text: measures,
    severity: severity
  };
}

/**
 * Determines the overall severity level based on individual recommendation severities.
 * @param {Object} severities - Individual severity levels for each recommendation type.
 * @return {string} Overall severity level.
 */
function getOverallSeverity(severities) {
  if (severities.activity === 'high' || severities.mask === 'high' || severities.health === 'high') {
    return 'high';
  } else if (severities.activity === 'medium' || severities.mask === 'medium' || severities.health === 'medium') {
    return 'medium';
  } else {
    return 'low';
  }
}

/**
 * Main function to get recommendations.
 * @param {Object} weatherData - Weather and air quality data.
 * @param {string} userActivity - The user's planned activity.
 * @return {Object} Comprehensive recommendations.
 */
function getRecommendations(weatherData, userActivity) {
  try {
    // Determine activity category
    const activityCategory = categorizeActivity(userActivity);
    
    // Get recommendations for each section
    const activitySafetyRec = getActivitySafetyRecommendation(activityCategory, weatherData);
    const maskRec = getMaskRecommendations(activityCategory, weatherData);
    const healthRec = getHealthMeasures(activityCategory, weatherData);
    
    // Determine overall severity
    const severities = {
      activity: activitySafetyRec.severity,
      mask: maskRec.severity,
      health: healthRec.severity
    };
    
    const overallSeverity = getOverallSeverity(severities);
    
    // Format as a comprehensive text
    const recommendationText = {
      activitySafety: activitySafetyRec.text,
      maskRecommendations: maskRec.text,
      healthMeasures: healthRec.text
    };
    
    // Format recommendations into categories
    const formattedRecommendations = formatRecommendations(recommendationText);
    
    // Return structured results
    return {
      recommendationText: recommendationText,
      formattedRecommendations: formattedRecommendations,
      activitySafety: activitySafetyRec.text,
      maskRecommendations: maskRec.text,
      healthMeasures: healthRec.text,
      severity: {
        overall: overallSeverity,
        activity: activitySafetyRec.severity,
        mask: maskRec.severity,
        health: healthRec.severity
      }
    };
  } catch (error) {
    console.error("Error generating recommendations:", error);
    
    // Return a backup response if an error occurs
    return {
      recommendationText: {
        activitySafety: "Error generating activity safety recommendations. Please check weather data and try again.",
        maskRecommendations: "Error generating mask recommendations. General advice: Consider wearing masks in poor air quality.",
        healthMeasures: "Error generating health measures. General advice: Stay hydrated and use sun protection as needed."
      },
      activitySafety: "Error generating activity safety recommendations. Please check weather data and try again.",
      maskRecommendations: "Error generating mask recommendations. General advice: Consider wearing masks in poor air quality.",
      healthMeasures: "Error generating health measures. General advice: Stay hydrated and use sun protection as needed.",
      severity: {
        overall: "medium",
        activity: "medium",
        mask: "medium",
        health: "medium"
      }
    };
  }
}

module.exports = {
  getRecommendations,
  categorizeActivity,
  formatRecommendations  // Export this for testing or other uses
};