// src/utils/enhancedRecommendations.js

// Activity categories with expanded and more specific keywords
const activityCategories = {
  outdoorVigorous: [
    'run', 'running', 'jog', 'jogging', 'hike', 'hiking', 'bike', 'biking', 'cycling',
    'exercise', 'workout', 'sport', 'athletics', 'training', 'cardio', 'swimming', 'swim', 
    'tennis', 'basketball', 'soccer', 'football', 'baseball', 'volleyball', 'sprint', 
    'marathon', 'triathlon', 'crossfit', 'climbing', 'mountain biking', 'trail running',
    'kayaking', 'rowing', 'roller skating', 'skateboarding', 'skiing', 'snowboarding',
    'surfing', 'windsurfing', 'high intensity', 'circuit training', 'bootcamp', 'parkour',
    'rock climbing', 'obstacle course', 'racquetball', 'lacrosse', 'rugby', 'hockey'
  ],
  
  outdoorModerate: [
    'walk', 'walking', 'outdoor', 'outside', 'garden', 'gardening', 'yard work', 
    'picnic', 'sightseeing', 'golf', 'leisure', 'stroll', 'fishing', 'camping',
    'photography', 'birdwatching', 'playground', 'park', 'barbecue', 'bbq',
    'boating', 'canoeing', 'light hiking', 'beach', 'beach walking', 'dog walking', 
    'frisbee', 'flying kites', 'outdoor yoga', 'tai chi outdoors', 'outdoor painting',
    'nature study', 'butterfly watching', 'casual cycling', 'harvesting', 'foraging',
    'outdoor dining', 'farmers market', 'outdoor shopping', 'stargazing', 'sunset watching'
  ],
  
  indoorActive: [
    'gym', 'fitness', 'yoga', 'pilates', 'dance', 'weightlifting', 'weights', 
    'treadmill', 'elliptical', 'spinning', 'aerobics', 'zumba', 'exercise class',
    'bowling', 'indoor climbing', 'martial arts', 'boxing', 'wrestling',
    'indoor swimming', 'badminton', 'squash', 'racquetball', 'indoor tennis',
    'kickboxing', 'karate', 'judo', 'taekwondo', 'barre', 'gymnastics', 'crossfit',
    'circuit training', 'jump rope', 'roller derby', 'fencing', 'table tennis',
    'ice skating', 'roller skating', 'trampoline', 'indoor cycling', 'stair climber',
    'rowing machine', 'ballet', 'ballroom dancing', 'salsa dancing', 'hip hop dancing'
  ],
  
  indoorStationary: [
    'work', 'office', 'desk', 'study', 'read', 'reading', 'write', 'writing',
    'computer', 'laptop', 'meeting', 'cooking', 'baking', 'crafts', 'art',
    'painting', 'drawing', 'gaming', 'video games', 'watching tv', 'movie',
    'indoors', 'inside', 'sitting', 'rest', 'relax', 'meditation', 'knitting',
    'sewing', 'crochet', 'board games', 'card games', 'puzzles', 'chess', 'libraries',
    'museums', 'galleries', 'shopping mall', 'browsing stores', 'conferences',
    'lectures', 'classes', 'webinars', 'zoom meetings', 'phone calls', 'programming',
    'coding', 'browsing internet', 'social media', 'watching videos', 'listening to music',
    'podcasts', 'audiobooks', 'planning', 'organizing', 'budgeting', 'online shopping'
  ],
  
  sleepRest: [
    'sleep', 'sleeping', 'nap', 'napping', 'rest', 'resting', 'bed', 'bedtime',
    'recovery', 'relaxation', 'siesta', 'dozing', 'slumber', 'hibernation',
    'overnight', 'snoozing', 'recharging', 'unwinding', 'decompressing', 'deep rest',
    'morning rest', 'evening rest', 'weekend sleep', 'sleeping in', 'early bedtime',
    'recovery day', 'mental rest', 'physical recovery', 'restoration'
  ],
  
  commuting: [
    'commute', 'commuting', 'drive', 'driving', 'car', 'bus', 'train', 'subway',
    'metro', 'transit', 'transportation', 'travel', 'travelling', 'bike commute',
    'walk to work', 'rideshare', 'carpool', 'taxi', 'uber', 'lyft', 'scooter',
    'motorcycle', 'moped', 'ferry', 'tram', 'light rail', 'trolley', 'shuttle',
    'park and ride', 'vanpool', 'road trip', 'interstate', 'highway', 'freeway',
    'rush hour', 'traffic', 'passenger', 'public transportation', 'transit center'
  ],
  
  childrenOutdoor: [
    'playground', 'play', 'children', 'kids', 'toddler', 'baby', 'infant',
    'daycare', 'school recess', 'sports practice', 'child', 'youth sports',
    'summer camp', 'field trip', 'outdoor classroom', 'nature play', 'splash pad',
    'swimming lessons', 'youth athletics', 'little league', 'soccer practice',
    'tee ball', 'jungle gym', 'slides', 'swings', 'monkey bars', 'sandbox',
    'hopscotch', 'jump rope', 'tag', 'hide and seek', 'scavenger hunt', 'bike riding',
    'roller skating', 'skateboarding', 'sledding', 'snow play', 'water balloons',
    'sprinkler play', 'kiddie pool', 'outdoor birthday party', 'school yard'
  ],
  
  seniorActivities: [
    'elderly', 'senior', 'retirement', 'gentle exercise', 'senior center',
    'assisted living', 'nursing home', 'retirement community', 'senior fitness',
    'water aerobics', 'chair yoga', 'mall walking', 'senior social', 'bingo',
    'gentle walking', 'bird watching', 'gardening for seniors', 'senior trips',
    'senior dance', 'low impact', 'silver sneakers', 'senior swim', 'senior golf',
    'pickleball', 'shuffleboard', 'bocce ball', 'senior tennis', 'senior stretching',
    'senior hiking group', 'senior cycling', 'senior fitness class', 'tai chi for seniors',
    'arthritis exercise', 'balance training', 'memory care activities', 'senior outdoor club'
  ],
  
  construction: [
    'construction', 'building', 'renovation', 'remodel', 'contractor', 'worksite',
    'demolition', 'painting', 'roofing', 'landscaping', 'labor', 'digging',
    'excavation', 'foundation', 'framing', 'drywall', 'masonry', 'bricklaying',
    'concrete', 'paving', 'asphalt', 'carpentry', 'electrical work', 'plumbing',
    'welding', 'scaffold', 'crane operation', 'heavy machinery', 'forklift',
    'bulldozer', 'backhoe', 'power tools', 'jackhammer', 'chainsaw', 'generator',
    'construction site', 'building site', 'home building', 'commercial construction',
    'road construction', 'site preparation', 'outdoor labor', 'manual labor'
  ],
  
  // NEW CATEGORIES
  waterActivities: [
    'swimming', 'swim', 'pool', 'beach swimming', 'lake swimming', 'river swimming',
    'ocean swimming', 'diving', 'snorkeling', 'scuba diving', 'surfing', 'bodyboarding',
    'paddleboarding', 'kayaking', 'canoeing', 'rowing', 'sailing', 'boating',
    'jet skiing', 'water skiing', 'wakeboarding', 'tubing', 'rafting', 'white water',
    'water park', 'water slides', 'wade', 'wading', 'float', 'floating', 'fishing',
    'fly fishing', 'deep sea fishing', 'shore fishing', 'waterfall', 'hot springs'
  ],
  
  winterActivities: [
    'ski', 'skiing', 'snowboard', 'snowboarding', 'snowshoe', 'snowshoeing',
    'sledding', 'tubing', 'ice skating', 'ice fishing', 'hockey', 'curling',
    'snow', 'snowman', 'snow angels', 'snowball fight', 'winter hiking',
    'cross country skiing', 'downhill skiing', 'winter camping', 'ice climbing',
    'winter photography', 'snow shovel', 'snow removal', 'snow blowing',
    'winter commute', 'winter driving', 'winter walk', 'cold weather', 'freezing'
  ],
  
  petActivities: [
    'dog walking', 'dog', 'cat', 'pet', 'dog park', 'dog run', 'dog beach',
    'pet play', 'dog hike', 'dog jog', 'dog training', 'pet care', 'pet sitting',
    'dog sitting', 'pet exercise', 'dog exercise', 'pet outing', 'puppy',
    'kitten', 'animal', 'pet grooming', 'veterinarian', 'vet visit',
    'pet daycare', 'agility training', 'pet show', 'dog show', 'pet socialization'
  ]
};

// Enhanced thresholds for different environmental factors
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
    minimal: 2,                // UV 0-2 - Minimal
    low: 3,                    // UV 3 - Low
    moderate: 5,               // UV 4-5 - Moderate
    high: 7,                   // UV 6-7 - High
    veryHigh: 10,              // UV 8-10 - Very High
    extreme: 11                // UV 11+ - Extreme
  },
  
  temperature: {
    extremeCold: -15,          // Below -15°C (5°F) - Extreme Cold
    severeCold: -5,            // -15°C to -5°C (5°F to 23°F) - Severe Cold
    veryCold: 0,               // -5°C to 0°C (23°F to 32°F) - Very Cold
    cold: 10,                  // 0°C to 10°C (32°F to 50°F) - Cold
    cool: 15,                  // 10°C to 15°C (50°F to 59°F) - Cool
    mild: 20,                  // 15°C to 20°C (59°F to 68°F) - Mild
    comfortable: 25,           // 20°C to 25°C (68°F to 77°F) - Comfortable
    warm: 30,                  // 25°C to 30°C (77°F to 86°F) - Warm
    hot: 35,                   // 30°C to 35°C (86°F to 95°F) - Hot
    veryHot: 40,               // 35°C to 40°C (95°F to 104°F) - Very Hot
    extremeHot: 45,            // 40°C to 45°C (104°F to 113°F) - Extreme Heat
    dangerousHeat: 100         // Above 45°C (113°F) - Dangerous Heat
  },
  
  humidity: {
    desert: 10,                // Below 10% - Desert
    veryDry: 20,               // 10-20% - Very Dry
    dry: 30,                   // 20-30% - Dry
    slightlyDry: 40,           // 30-40% - Slightly Dry
    comfortable: 50,           // 40-50% - Comfortable
    moderate: 60,              // 50-60% - Moderate
    slightlyHumid: 70,         // 60-70% - Slightly Humid
    humid: 80,                 // 70-80% - Humid
    veryHumid: 90,             // 80-90% - Very Humid
    oppressive: 100            // Above 90% - Oppressive
  },
  
  wind: {
    calm: 5,                   // 0-5 kph - Calm
    lightAir: 10,              // 6-10 kph - Light Air
    lightBreeze: 20,           // 11-20 kph - Light Breeze
    gentleBreeze: 30,          // 21-30 kph - Gentle Breeze
    moderateBreeze: 40,        // 31-40 kph - Moderate Breeze
    freshBreeze: 50,           // 41-50 kph - Fresh Breeze
    strongBreeze: 60,          // 51-60 kph - Strong Breeze
    highWind: 70,              // 61-70 kph - High Wind
    gale: 80,                  // 71-80 kph - Gale
    severeGale: 90,            // 81-90 kph - Severe Gale
    storm: 100,                // 91-100 kph - Storm
    violentStorm: 110,         // 101-110 kph - Violent Storm
    hurricane: 119,            // Above 110 kph - Hurricane Force
    extremeHurricane: 200      // Extreme Hurricane Conditions
  },
  
  visibility: {
    zero: 0.1,                 // Below 0.1 km - Effectively Zero
    veryPoor: 1,               // 0.1-1 km - Very Poor
    poor: 3,                   // 1-3 km - Poor
    moderate: 5,               // 3-5 km - Moderate
    fair: 8,                   // 5-8 km - Fair
    good: 10,                  // 8-10 km - Good
    veryGood: 20,              // 10-20 km - Very Good
    excellent: 40,             // 20-40 km - Excellent
    exceptional: 100           // Above 40 km - Exceptional
  },
  
  pm25: {
    good: 12,                  // 0-12 μg/m³ - Good
    moderate: 35.4,            // 12.1-35.4 μg/m³ - Moderate
    sensitiveUnhealthy: 55.4,  // 35.5-55.4 μg/m³ - Unhealthy for Sensitive Groups
    unhealthy: 150.4,          // 55.5-150.4 μg/m³ - Unhealthy
    veryUnhealthy: 250.4,      // 150.5-250.4 μg/m³ - Very Unhealthy
    hazardous: 350.4,          // 250.5-350.4 μg/m³ - Hazardous
    veryHazardous: 500         // Above 350.5 μg/m³ - Very Hazardous
  },
  
  precipProbability: {
    none: 10,                  // 0-10% - No precipitation likely
    slight: 30,                // 10-30% - Slight chance of precipitation
    possible: 50,              // 30-50% - Possible precipitation
    likely: 70,                // 50-70% - Precipitation likely
    veryLikely: 90,            // 70-90% - Very likely precipitation
    certain: 100               // 90-100% - Certain precipitation
  },
  
  precipIntensity: {
    none: 0.25,                // 0-0.25 mm/hr - No/trace precipitation
    light: 2.5,                // 0.25-2.5 mm/hr - Light precipitation
    moderate: 10,              // 2.5-10 mm/hr - Moderate precipitation
    heavy: 50,                 // 10-50 mm/hr - Heavy precipitation
    violent: 100               // >50 mm/hr - Violent precipitation
  }
};

/**
 * Determines which activity category an activity belongs to based on keywords.
 * Improved to check for multiple matches and select the most specific category.
 * @param {string} activity - The user's planned activity.
 * @return {string} The determined category.
 */
function categorizeActivity(activity) {
  const activityLower = activity.toLowerCase();
  let matchedCategory = null;
  let maxMatches = 0;
  
  // Check for matches across all categories
  for (const [category, keywords] of Object.entries(activityCategories)) {
    let matches = 0;
    for (const keyword of keywords) {
      if (activityLower.includes(keyword)) {
        matches++;
      }
    }
    
    // If we found more matches in this category, update our best match
    if (matches > maxMatches) {
      maxMatches = matches;
      matchedCategory = category;
    }
  }
  
  // If we found a match, return it
  if (matchedCategory) {
    return matchedCategory;
  }
  
  // Default to outdoorModerate if we can't categorize
  return 'outdoorModerate';
}

/**
 * Formats recommendations into a structured object with categories and
 * ensures recommendations are complete sentences.
 * @param {Object} recommendations - Raw recommendation texts.
 * @return {Object} Categorized recommendations.
 */
function formatRecommendations(recommendations) {
  // Parse each recommendation into separate points
  const formatSection = (text) => {
    if (!text) return [];
    
    // Split by period but preserve the period in the result
    return text
      .split('.')
      .filter(item => item.trim().length > 0)
      .map(item => {
        // Ensure each item ends with a period
        let formattedItem = item.trim();
        if (!formattedItem.endsWith('.')) {
          formattedItem += '.';
        }
        return formattedItem;
      });
  };
  
  // Initialize categories for recommendations
  const formattedRecommendations = {
    activity: [],
    protection: [],
    health: [],
    timing: [],
    clothing: [],
    hydration: [],
    sunProtection: [],
    airQuality: [],
    safety: [],
    equipmentPrep: [],
    weatherSpecific: [],
    locationSpecific: [],
    sensitivePeople: [],
    general: []
  };
  
  // Parse activity safety recommendations
  const activityRecs = formatSection(recommendations.activitySafety);
  formattedRecommendations.activity = activityRecs;
  
  // Parse mask and protection recommendations
  const protectionRecs = formatSection(recommendations.maskRecommendations);
  formattedRecommendations.protection = protectionRecs;
  
  // Parse health measures
  const healthRecs = formatSection(recommendations.healthMeasures);
  
  // Categorize health measures into more specific categories
  healthRecs.forEach(rec => {
    const recLower = rec.toLowerCase();
    
    if (recLower.includes('hydration') || recLower.includes('water') || recLower.includes('drink') || recLower.includes('fluid')) {
      formattedRecommendations.hydration.push(rec);
    } 
    else if (recLower.includes('sun') || recLower.includes('uv') || recLower.includes('spf') || recLower.includes('sunscreen') || recLower.includes('hat')) {
      formattedRecommendations.sunProtection.push(rec);
    } 
    else if (recLower.includes('air quality') || recLower.includes('pollution') || recLower.includes('aqi') || recLower.includes('pm2.5') || recLower.includes('smog')) {
      formattedRecommendations.airQuality.push(rec);
    } 
    else if (recLower.includes('timing') || recLower.includes('schedule') || recLower.includes('time of day') || recLower.includes('morning') || recLower.includes('afternoon') || recLower.includes('evening')) {
      formattedRecommendations.timing.push(rec);
    } 
    else if (recLower.includes('cloth') || recLower.includes('wear') || recLower.includes('dress') || recLower.includes('layers') || recLower.includes('jacket') || recLower.includes('shoes')) {
      formattedRecommendations.clothing.push(rec);
    } 
    else if (recLower.includes('safety') || recLower.includes('danger') || recLower.includes('caution') || recLower.includes('risk') || recLower.includes('hazard') || recLower.includes('emergency')) {
      formattedRecommendations.safety.push(rec);
    } 
    else if (recLower.includes('equipment') || recLower.includes('gear') || recLower.includes('supplies') || recLower.includes('pack') || recLower.includes('bring')) {
      formattedRecommendations.equipmentPrep.push(rec);
    } 
    else if (recLower.includes('rain') || recLower.includes('snow') || recLower.includes('wind') || recLower.includes('storm') || recLower.includes('thunder') || recLower.includes('lightning') || recLower.includes('weather')) {
      formattedRecommendations.weatherSpecific.push(rec);
    } 
    else if (recLower.includes('location') || recLower.includes('area') || recLower.includes('route') || recLower.includes('trail') || recLower.includes('park') || recLower.includes('indoor')) {
      formattedRecommendations.locationSpecific.push(rec);
    } 
    else if (recLower.includes('child') || recLower.includes('elderly') || recLower.includes('senior') || recLower.includes('pregnant') || recLower.includes('medical condition') || recLower.includes('asthma')) {
      formattedRecommendations.sensitivePeople.push(rec);
    } 
    else {
      formattedRecommendations.health.push(rec);
    }
  });
  
  // Parse any additional recommendations
  if (recommendations.additionalRecommendations) {
    const additionalRecs = formatSection(recommendations.additionalRecommendations);
    formattedRecommendations.general = formattedRecommendations.general.concat(additionalRecs);
  }
  
  // Remove any empty categories
  Object.keys(formattedRecommendations).forEach(key => {
    if (formattedRecommendations[key].length === 0) {
      delete formattedRecommendations[key];
    }
  });
  
  return formattedRecommendations;
}

/**
 * Helper function to extract and normalize weather data from API response.
 * @param {Object} weatherData - The weather data from the API.
 * @return {Object} Normalized weather data for processing.
 */
function extractWeatherData(weatherData) {
  // Handle potentially different data structures from the API
  const current = weatherData.current || {};
  const airQuality = current.air_quality || weatherData.air_quality || {};
  const forecast = weatherData.forecast || {};
  
  // Extract precipitation data if available
  let precipProbability = 0;
  let precipIntensity = 0;
  if (forecast.forecastday && forecast.forecastday.length > 0) {
    const todayForecast = forecast.forecastday[0];
    if (todayForecast.day) {
      precipProbability = todayForecast.day.daily_chance_of_rain || 0;
      precipIntensity = todayForecast.day.totalprecip_mm || 0;
    }
  }
  
  return {
    aqi: airQuality.us_epa_index || 1, // Default to good if missing
    uv: current.uv || 0,
    temp: current.temp_c || 20, // Default to mild if missing
    feelsLike: current.feelslike_c || current.temp_c || 20,
    humidity: current.humidity || 50,
    wind: current.wind_kph || 0,
    windGust: current.gust_kph || current.wind_kph || 0,
    visibility: current.vis_km || 10,
    pm25: airQuality.pm2_5 || 0,
    condition: current.condition ? current.condition.text || '' : '',
    isDay: current.is_day === 1 || true,
    precipProbability: precipProbability,
    precipIntensity: precipIntensity
  };
}

/**
 * Get activity safety recommendation based on category and conditions.
 * Enhanced with more detailed, specific recommendations.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Safety assessment with text and severity level.
 */
function getActivitySafetyRecommendation(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { 
    aqi, uv, temp, feelsLike, humidity, wind, windGust, 
    visibility, pm25, condition, isDay, precipProbability, precipIntensity 
  } = data;
  
  // Start with a safety assessment base
  let safety = "ACTIVITY SAFETY ASSESSMENT: Based on current environmental conditions, here's what you should know before proceeding with your planned activity: ";
  let severity = "low";
  
  // Check weather condition first for obvious issues
  const dangerWeather = ['thunderstorm', 'lightning', 'hurricane', 'tornado', 'blizzard', 'hail', 'cyclone', 'typhoon', 'flood'];
  const cautionWeather = ['rain', 'snow', 'sleet', 'fog', 'mist', 'drizzle', 'shower', 'overcast', 'dust', 'sand', 'smoke'];
  const weatherText = condition.toLowerCase();
  
  if (dangerWeather.some(w => weatherText.includes(w))) {
    safety += "⚠️ POTENTIALLY UNSAFE weather conditions detected. " + 
      condition + " present a significant safety hazard for outdoor activities. " +
      "Consider postponing or choosing indoor alternatives until conditions improve. " +
      "If you must proceed, implement extreme caution protocols and have emergency contingency plans. ";
    severity = "high";
  } else if (cautionWeather.some(w => weatherText.includes(w))) {
    safety += "⚠️ CAUTION ADVISED due to " + condition + ". " +
      "These conditions will impact your experience and potentially your safety. " +
      "Prepare accordingly with appropriate gear, reduced expectations, and flexible plans. " +
      "Consider abbreviated activities or having backup indoor options ready. ";
    severity = "medium";
  }
  
  // Check heat index (combination of temperature and humidity)
  const calculateHeatIndex = (temp, humidity) => {
    // Basic heat index calculation
    if (temp > 27 && humidity > 40) {
      return temp + (0.5 * (humidity - 40));
    }
    return temp;
  };
  
  const heatIndex = calculateHeatIndex(temp, humidity);
  
  // Add heat index warnings if applicable
  if (heatIndex > 40) {
    safety += "🔥 EXTREME HEAT DANGER: The heat index exceeds dangerous levels. " +
      "Heat stroke risk is severe - even short exposure can be life-threatening. " +
      "Outdoor physical activity is NOT RECOMMENDED regardless of fitness level. " +
      "If absolutely necessary, extreme caution, constant hydration, and frequent cooling are essential. ";
    severity = "high";
  } else if (heatIndex > 35) {
    safety += "🔥 SERIOUS HEAT RISK: Current heat index indicates dangerous conditions. " +
      "Heat exhaustion or heat stroke is possible with prolonged exposure or exertion. " +
      "Significantly reduce intensity and duration of outdoor activities. " +
      "Take frequent cooling breaks in shade or air conditioning every 15-20 minutes. ";
    severity = "high";
  } else if (heatIndex > 30) {
    safety += "🔥 HEAT CAUTION: Elevated heat index requires modification of normal activities. " +
      "Fatigue sets in faster, and heat-related discomfort is likely. " +
      "Reduce intensity by at least 25%, increase shade breaks, and hydrate more frequently than usual. ";
    severity = severity === "low" ? "medium" : severity;
  }
  
  // Check wind chill for cold conditions
  const calculateWindChill = (temp, windSpeed) => {
    // Basic wind chill formula
    if (temp < 10 && windSpeed > 5) {
      return temp - (windSpeed * 0.1);
    }
    return temp;
  };
  
  const windChill = calculateWindChill(temp, wind);
  
  // Add wind chill warnings if applicable
  if (windChill < -15) {
    safety += "❄️ EXTREME COLD DANGER: Wind chill has reached life-threatening levels. " +
      "Frostbite can occur in minutes on exposed skin. " +
      "Outdoor activity is NOT RECOMMENDED. " +
      "If unavoidable, use extreme cold weather gear and limit exposure to very short durations with warming breaks. ";
    severity = "high";
  } else if (windChill < -10) {
    safety += "❄️ SEVERE COLD HAZARD: Dangerously low wind chill increases frostbite and hypothermia risk significantly. " +
      "Reconsider any extended outdoor activities. " +
      "If proceeding, use proper extreme cold weather protection, maintain constant movement, and have warm shelter readily available. ";
    severity = "high";
  } else if (windChill < 0) {
    safety += "❄️ COLD WARNING: Wind chill increases cold exposure risks. " +
      "Proper insulation layers are essential - make sure extremities are well protected. " +
      "Plan for shorter outdoor durations with warming breaks every 30-45 minutes. " +
      "Watch for early signs of cold stress such as shivering, numbness, or confusion. ";
    severity = severity === "low" ? "medium" : severity;
  }
  
  // Add specific advice based on activity category with enhanced personalized recommendations
  switch (category) {
    case 'outdoorVigorous':
      // AQI checks with more detailed recommendations
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "🚫 NOT RECOMMENDED: High-intensity outdoor activity in current air quality (AQI: " + aqi + "). " +
          "Heavy breathing during vigorous exercise substantially increases pollutant intake. " +
          "Your lungs are exposed to 5-10 times more pollution during exercise compared to rest. " +
          "Consider indoor alternatives with air filtration or postponing until air quality improves. " +
          "If you must proceed, reduce intensity by at least 50% and duration by 75%, monitoring breathing difficulties closely. ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "⚠️ AIR QUALITY CAUTION: Current conditions (AQI: " + aqi + ") are suboptimal for vigorous activity. " +
          "Consider these modifications: 1) Reduce workout intensity by 25-30%, 2) Shorten duration by 30-50%, " +
          "3) Select locations away from traffic or industrial areas, 4) Schedule activity when pollution levels are typically lower, " +
          "5) Monitor breathing and stop if experiencing discomfort, coughing, or unusual fatigue. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature checks with more specific advice
      if (temp <= thresholds.temperature.cold) {
        safety += "❄️ COLD WEATHER EXERCISE MODIFICATIONS: " +
          "Extended warm-up (10-15 minutes) is crucial to prevent injury in cold conditions. " +
          "Properly layer clothing (moisture-wicking base, insulating middle, wind/water resistant outer). " +
          "Cold air can trigger bronchospasm - consider a thin face covering to warm inhaled air. " +
          "Your perceived exertion may be higher - adjust expectations and monitor heart rate more closely. ";
        severity = severity === "low" ? "medium" : severity;
      } else if (temp >= thresholds.temperature.hot) {
        safety += "🔥 HOT WEATHER EXERCISE PROTOCOLS: " +
          "Pre-hydrate with 16-20oz of fluid 2-3 hours before activity and continue drinking regularly (4-8oz every 15-20 minutes). " +
          "Reduce normal intensity by 30-40% and include mandatory cooling breaks. " +
          "Performance decline is normal and expected - adjust goals accordingly. " +
          "Exercise during cooler parts of day (early morning ideal, avoid 10am-4pm). " +
          "Use the 'walk/run' method or interval training instead of continuous exertion. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // UV Index checks with detailed protection strategies
      if (uv >= thresholds.uv.high) {
        safety += "☀️ HIGH UV PROTECTION ESSENTIAL: " +
          "Apply broad-spectrum SPF 50+ sunscreen 30 minutes before going outdoors, reapplying every 60-90 minutes (more frequently when sweating). " +
          "UV-blocking sunglasses and wide-brimmed hats significantly reduce eye and face exposure. " +
          "Schedule intense portions of your activity before 10am or after 4pm when possible. " +
          "Be aware that UV rays penetrate light cloud cover and can still cause damage on overcast days. " +
          "Snow, water, and sand can reflect and amplify UV exposure by up to 80%. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Check for high humidity specifically for vigorous activity
      if (humidity >= thresholds.humidity.humid && temp >= thresholds.temperature.warm) {
        safety += "💧 HIGH HUMIDITY IMPACT: " +
          "Your body's cooling efficiency is significantly reduced in humid conditions. " +
          "Heart rate will be elevated 5-10 beats per minute higher than normal at the same workload. " +
          "Decrease intensity by 40-50% compared to what you would do in dry conditions. " +
          "External cooling methods (cold water dousing, neck cooling towels) become more important. " +
          "Recovery between intervals or efforts takes longer - extend rest periods by at least 50%. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Add specific advice for precipitation during vigorous activities
      if (precipProbability >= thresholds.precipProbability.likely) {
        safety += "🌧️ PRECIPITATION CONSIDERATIONS: " +
          "Wet conditions increase injury risk due to slippery surfaces and reduced visibility. " +
          "Wet clothing accelerates heat loss even in moderate temperatures. " +
          "Bring spare dry clothing for immediate change after activity to prevent post-exercise chill. " +
          "Choose appropriate footwear with enhanced traction for wet conditions. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'outdoorModerate':
      // AQI checks (slightly more lenient than vigorous)
      if (aqi >= thresholds.aqi.veryUnhealthy) {
        safety += "🚫 NOT RECOMMENDED: Current air quality (AQI: " + aqi + ") poses significant health risks even for moderate outdoor activities. " +
          "Short-term exposure can aggravate respiratory and cardiovascular conditions. " +
          "Consider indoor alternatives until conditions improve. " +
          "If outdoor presence is necessary, wear appropriate respiratory protection and limit exposure to 15-30 minutes. ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.unhealthy) {
        safety += "⚠️ SIGNIFICANT CAUTION NEEDED: Poor air quality (AQI: " + aqi + ") requires adjustments to outdoor plans. " +
          "Limit activity duration to under 1 hour and keep intensity low. " +
          "Be responsive to how your body feels - respiratory discomfort, unusual fatigue, or irritation are signals to move indoors. " +
          "Particularly important for children, elderly, pregnant women, or those with pre-existing health conditions to minimize exposure. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature considerations
      if (temp <= thresholds.temperature.veryCold) {
        safety += "❄️ EXTREME COLD PRECAUTIONS: " +
          "Exposed skin can freeze in minutes under current conditions. " +
          "Multiple insulating layers are essential, with special attention to head, hands, and feet which lose heat rapidly. " +
          "Plan activities near warming shelters or vehicles for regular warming breaks every 20-30 minutes. " +
          "Bring hot beverages in insulated containers to maintain core temperature. " +
          "Travel with companions when possible - cold impairs judgment and increases accident risk. ";
        severity = severity === "low" ? "medium" : severity;
      } else if (temp >= thresholds.temperature.veryHot) {
        safety += "🔥 EXTREME HEAT PRECAUTIONS: " +
          "Heat illness can develop rapidly even during moderate activity in current temperatures. " +
          "Schedule activity only during early morning or evening hours when temperatures are lower. " +
          "Maintain continuous hydration (drinking before you feel thirsty) with electrolyte-containing fluids. " +
          "Use cooling strategies like wet bandanas around neck or wrists and seek shade whenever possible. " +
          "Be alert to early warning signs like headache, dizziness, or nausea which indicate developing heat stress. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Check visibility for outdoor navigation safety
      if (visibility <= thresholds.visibility.poor) {
        safety += "👁️ POOR VISIBILITY HAZARDS: " +
          "Current visibility conditions increase risk of disorientation, falls, and accidents. " +
          "Stay on well-defined paths and use landmarks for navigation. " +
          "Carry a whistle, phone, and location sharing device for emergency situations. " +
          "Consider reflective gear or lights to make yourself visible to others, especially near roads. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'indoorActive':
      // Indoor activities specific recommendations
      safety += "🏠 INDOOR ACTIVITY CONSIDERATIONS: ";
      
      // Ventilation considerations based on outdoor air quality
      if (aqi >= thresholds.aqi.hazardous) {
        safety += "Ensure facility has adequate air filtration during current hazardous outdoor air quality. " +
          "Confirm HVAC systems are operational with recently changed filters. " +
          "Even with good filtration, reduce activity intensity by 20-30% as some pollutants may still be present indoors. " +
          "If the facility does not have proper air handling systems, consider postponing or finding an alternative location. ";
        severity = severity === "low" ? "medium" : severity;
      } else if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Check that windows remain closed and air recirculation systems are operating. " +
          "Indoor air quality is typically better than outdoor during pollution events, but not perfect. " +
          "Monitor any unusual respiratory symptoms which may indicate poor indoor air filtration. ";
      }
      
      // Temperature considerations for indoor exercise
      if (temp >= thresholds.temperature.veryHot) {
        safety += "Verify air conditioning is functioning properly before beginning intense indoor activity. " +
          "Even air-conditioned spaces may struggle during extreme heat - fan circulation becomes important. " +
          "Hydration remains critical even when indoors, as indoor exercise in hot weather can still cause significant fluid loss. ";
      } else if (temp <= thresholds.temperature.veryCold) {
        safety += "Ensure adequate heating is available - indoor spaces may be colder than expected. " +
          "Begin with longer warm-up to prepare cold muscles and joints for activity. " +
          "Layers remain important for indoor winter exercise until body temperature rises. ";
      }
      break;
      
    case 'indoorStationary':
      // Generally safe from most environmental concerns but still some considerations
      safety += "🏠 INDOOR COMFORT OPTIMIZATION: ";
      
      if (aqi >= thresholds.aqi.veryUnhealthy) {
        safety += "During severe outdoor air pollution, keep windows tightly closed and minimize entries/exits that let outdoor air in. " +
          "Consider using HEPA air purifiers in your space, particularly in smaller rooms. " +
          "Change HVAC filters more frequently during extended pollution events. ";
      }
      
      // Temperature optimization for indoor comfort
      if (temp >= thresholds.temperature.hot) {
        safety += "Use fans strategically to improve air circulation even with air conditioning. " +
          "Close blinds/curtains on sun-facing windows to reduce solar heat gain. " +
          "Stay hydrated even during sedentary indoor activities, as higher temperatures increase water needs. ";
      } else if (temp <= thresholds.temperature.cold) {
        safety += "Maintain adequate indoor heating (68-72°F/20-22°C is optimal for most activities). " +
          "Use layered clothing for adjustable comfort rather than excessive heating. " +
          "Consider supplemental space heating for particularly cold areas of your indoor space. ";
      }
      break;
      
    case 'sleepRest':
      // Optimize sleep environment
      safety += "😴 SLEEP ENVIRONMENT OPTIMIZATION: ";
      
      if (temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cold) {
        safety += "Optimal sleep temperature range is 60-67°F (15-19°C) - adjust room temperature accordingly. " +
          "Use appropriate bedding for season (lighter coverings in warm weather, layered blankets in cold). " +
          "Consider specialized cooling pillows or mattress toppers during hot weather. " +
          "Maintain good air circulation with ceiling or standing fans positioned properly. ";
      }
      
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Keep bedroom windows closed during poor air quality events. " +
          "If possible, use air purifiers with HEPA filters in sleeping areas. " +
          "Change HVAC filters regularly to improve indoor air quality. ";
      }
      
      // Humidity considerations for sleep
      if (humidity >= thresholds.humidity.humid) {
        safety += "High humidity impairs sleep quality - consider using a dehumidifier to maintain 30-50% humidity levels. " +
          "Choose moisture-wicking sheets and sleepwear to improve comfort in humid conditions. ";
      } else if (humidity <= thresholds.humidity.dry) {
        safety += "Very dry air can cause respiratory irritation during sleep - consider a humidifier to maintain 30-50% humidity. " +
          "Keep water nearby to address nighttime dry mouth from low humidity. ";
      }
      
      // Noise considerations for sleep during weather events
      if (weatherText.includes('rain') || weatherText.includes('storm') || wind >= thresholds.wind.freshBreeze) {
        safety += "Use white noise machines or apps to mask weather sounds that might disrupt sleep. " +
          "Ensure windows and doors are properly sealed to minimize noise and drafts. ";
      }
      break;
      
    case 'commuting':
      // Check visibility and road conditions
      safety += "🚗 COMMUTE SAFETY ASSESSMENT: ";
      
      if (visibility <= thresholds.visibility.poor) {
        safety += "SIGNIFICANT HAZARD: Reduced visibility conditions substantially increase accident risk. " +
          "Use headlights even during daylight hours and maintain extra distance between vehicles. " +
          "Reduce speed by at least 5-10 mph below posted limits and avoid overtaking when visibility is compromised. " +
          "Consider alternate routes that avoid high-speed roads or areas with known fog/visibility problems. " +
          "If visibility deteriorates to unsafe levels, pull over safely until conditions improve. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Air quality considerations for commuting
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Set vehicle climate control to recirculate air rather than draw in outside air. " +
          "Consider wearing appropriate masks during portions of commute spent outdoors. " +
          "If your vehicle has cabin air filters, ensure they are clean and functioning. " +
          "Keep windows closed while driving through areas with visible pollution or near high traffic. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Precipitation and road safety
      if (precipProbability >= thresholds.precipProbability.likely) {
        safety += "Wet roads require greater stopping distance - increase following distance by 3-4 seconds. " +
          "Reduce speed and avoid sudden maneuvers that could lead to hydroplaning. " +
          "Be especially cautious at intersections where visibility may be further reduced by spray from other vehicles. ";
        
        if (temp <= thresholds.temperature.cold) {
          safety += "ELEVATED RISK: Potential for ice formation on roadways, especially on bridges, overpasses, and shaded areas. " +
            "Avoid sudden braking, acceleration, or steering in potentially icy conditions. " +
            "Consider delaying trip if freezing precipitation is occurring or imminent. ";
          severity = "high";
        }
      }
      
      // Wind considerations for different vehicles
      if (wind >= thresholds.wind.highWind) {
        safety += "HIGH WIND HAZARD: Strong crosswinds can make vehicle control difficult, especially for high-profile vehicles. " +
          "Both hands on wheel at all times and reduced speed recommended. " +
          "Be especially cautious on bridges, open areas, and when passing large vehicles. " +
          "Watch for debris in roadway and be prepared for sudden gusts that may affect steering. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'childrenOutdoor':
      // More protective thresholds for children
      safety += "👶 CHILDREN'S OUTDOOR SAFETY: ";
      
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "NOT RECOMMENDED: Current air quality (AQI: " + aqi + ") presents elevated risks for children. " +
          "Children breathe more air per pound of body weight than adults and their developing lungs are more vulnerable to pollutants. " +
          "Reschedule outdoor playtime or choose indoor alternatives until air quality improves. " +
          "If brief outdoor time is necessary, limit to 15-30 minutes with minimal exertion. ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.moderate) {
        safety += "CAUTION ADVISED: While moderate air quality affects children more than adults, short periods of outdoor activity are generally acceptable. " +
          "Limit outdoor time to 1-2 hours maximum and observe children for unusual coughing, wheezing, or fatigue. " +
          "Children with asthma or respiratory conditions should use appropriate medications preventatively. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // UV protection for children
      if (uv >= thresholds.uv.moderate) {
        safety += "ENHANCED SUN PROTECTION NEEDED: Children's skin is more sensitive to UV damage than adults'. " +
          "Apply broad-spectrum SPF 30+ sunscreen 30 minutes before going outside and reapply every 2 hours or after water exposure/sweating. " +
          "Use physical barriers like hats, sunglasses, and UPF-rated clothing. " +
          "Seek shade especially during peak sun hours (10am-4pm). " +
          "Remember UV protection even on cloudy days as 80% of UV rays penetrate cloud cover. ";
        
        if (uv >= thresholds.uv.high) {
          safety += "HIGH UV ALERT: Schedule outdoor activities before 10am or after 4pm to avoid peak UV intensity. " +
            "Plan activities with readily available shade or indoor alternatives if sun exposure becomes excessive. ";
          severity = severity === "low" ? "medium" : severity;
        }
      }
      
      // Temperature considerations for children
      if (temp >= thresholds.temperature.warm) {
        safety += "HEAT PRECAUTIONS FOR CHILDREN: Kids produce more heat relative to body mass and sweat less efficiently than adults. " +
          "Ensure regular hydration breaks every 15-20 minutes even if children don't feel thirsty. " +
          "Watch for early signs of heat illness: flushed face, fatigue, dizziness, or heat rash. " +
          "Reduce activity intensity during warmer parts of the day and provide frequent shade breaks. ";
        
        if (temp >= thresholds.temperature.hot) {
          safety += "HOT WEATHER ALERT: High temperatures present serious risks for children. " +
            "Limit outdoor time to early morning or evening hours. " +
            "Ensure constant access to water and cooling methods (spray bottles, wading pools, wet towels). " +
            "Never leave children in parked vehicles, even briefly, as car interiors can reach lethal temperatures within minutes. ";
          severity = "high";
        }
      } else if (temp <= thresholds.temperature.cool) {
        safety += "COLD WEATHER CHILD PROTECTION: Children lose heat faster than adults due to higher surface area relative to body mass. " +
          "Dress children in layers (one more layer than an adult would wear in same conditions). " +
          "Keep extremities covered and check regularly for cold, wet clothing that needs changing. " +
          "Watch for signs of discomfort or cold stress, as children may not communicate when they're too cold. ";
        
        if (temp <= thresholds.temperature.cold) {
          safety += "SIGNIFICANT COLD RISK: Limit outdoor exposure to 30-45 minute sessions with warming breaks. " +
            "Monitor extremities frequently for signs of excessive cold exposure. " +
            "Maintain proper hydration even in cold weather, as dehydration accelerates heat loss. ";
          severity = severity === "low" ? "medium" : severity;
        }
      }
      
      // Precipitation considerations for children
      if (precipProbability >= thresholds.precipProbability.likely) {
        safety += "PRECIPITATION PLANNING: Ensure children have appropriate waterproof outerwear and footwear. " +
          "Wet conditions increase risk of hypothermia even in moderate temperatures - have dry clothes available for changing. " +
          "Be aware that wet playgrounds can present additional slip hazards. ";
      }
      break;
      
    case 'seniorActivities':
      // More protective thresholds for seniors
      safety += "🧓 SENIOR ACTIVITY GUIDANCE: ";
      
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "NOT ADVISED: Current air quality (AQI: " + aqi + ") presents elevated risks for older adults. " +
          "Seniors with heart or lung conditions are particularly vulnerable to air pollution effects. " +
          "Consider indoor alternatives in filtered air environments until conditions improve. " +
          "If outdoor presence is necessary, limit exposure time and wear appropriate respiratory protection. ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.moderate) {
        safety += "CAUTION RECOMMENDED: Moderate air pollution may affect seniors more than younger adults. " +
          "Those with cardiovascular disease, lung conditions, or diabetes should be particularly cautious. " +
          "Consider shorter durations for outdoor activities and have medications readily available. " +
          "Monitor for unusual symptoms like shortness of breath, chest tightness, or fatigue. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature considerations for seniors
      if (temp >= thresholds.temperature.warm) {
        safety += "HEAT SENSITIVITY ALERT: Older adults have reduced ability to regulate body temperature and may have decreased thirst sensation. " +
          "Schedule deliberate hydration breaks regardless of thirst feelings. " +
          "Choose cooler times of day (early morning, evening) for outdoor activities. " +
          "Be aware that certain medications can increase heat sensitivity and sun vulnerability. " +
          "Use cooling strategies like damp cloths on neck/wrists and portable fans. ";
        
        if (temp >= thresholds.temperature.hot) {
          safety += "HIGH RISK CONDITIONS: Hot weather significantly increases health risks for seniors. " +
            "Limit all outdoor activities to essential brief exposures during cooler hours. " +
            "Maintain contact with others who can check on wellbeing during heat events. " +
            "Be especially vigilant about medication effects that may be exacerbated by heat. ";
          severity = "high";
        }
      } else if (temp <= thresholds.temperature.cool) {
        safety += "COLD SENSITIVITY CONSIDERATIONS: Older adults lose body heat more quickly and may have reduced ability to sense temperature changes. " +
          "Layer clothing appropriately with focus on extremity protection (quality gloves, warm socks, insulated footwear). " +
          "Maintain activity during outdoor exposure to generate body heat, but avoid overexertion. " +
          "Be aware that certain conditions like diabetes, thyroid problems, or arthritis can affect cold tolerance. ";
        
        if (temp <= thresholds.temperature.cold) {
          safety += "SIGNIFICANT COLD HAZARD: Cold temperatures present serious risks for seniors. " +
            "Brief outdoor exposure only, with proper insulation layers. " +
            "Watch for early signs of hypothermia which can be subtle: confusion, sleepiness, slurred speech, shivering. " +
            "Indoor activities strongly preferred until temperatures moderate. ";
          severity = "high";
        }
      }
      
      // Fall prevention in various weather conditions
      if (precipProbability >= thresholds.precipProbability.possible || 
          weatherText.includes('snow') || 
          weatherText.includes('ice') || 
          weatherText.includes('rain')) {
        safety += "FALL PREVENTION CRITICAL: Wet or icy conditions significantly increase fall risk. " +
          "Use appropriate footwear with excellent traction and consider stabilization aids like walking poles or canes. " +
          "Take shorter, slower steps and maintain visual focus on walking surfaces. " +
          "Avoid routes with known hazards like steep inclines, uneven surfaces, or poor drainage. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Visibility considerations for seniors
      if (visibility <= thresholds.visibility.moderate || !isDay) {
        safety += "VISIBILITY CONSIDERATIONS: Reduced visibility conditions may present additional challenges. " +
          "Wear bright, reflective clothing to enhance visibility to others. " +
          "Bring lighting aids like flashlights even during daylight hours if conditions might deteriorate. " +
          "Consider companion assistance for navigation in challenging visibility conditions. ";
      }
      break;
      
    case 'construction':
      // Construction and occupational exposure
      safety += "🔨 OCCUPATIONAL SAFETY ASSESSMENT: ";
      
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "RESPIRATORY PROTECTION REQUIRED: Current air quality (AQI: " + aqi + ") necessitates appropriate respiratory protection for outdoor work. " +
          "N95 or greater filtration masks should be properly fitted and worn consistently. " +
          "Implement more frequent break cycles in filtered-air environments. " +
          "Consider rescheduling tasks that generate additional dust or airborne particulates. " +
          "Workers with respiratory conditions should consult medical professionals before working in these conditions. ";
        severity = "high";
      } else if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        safety += "RESPIRATORY PROTECTION RECOMMENDED: Air quality conditions warrant protective measures. " +
          "Make appropriate respirators available to all workers and require for those with pre-existing conditions. " +
          "Rotate personnel to minimize continuous exposure for any individual. " +
          "Increase hydration requirements as respirator use can increase fluid loss. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // UV protection for outdoor construction
      if (uv >= thresholds.uv.high) {
        safety += "SUN EXPOSURE MITIGATION ESSENTIAL: " +
          "Implement mandatory sun protection protocols: SPF 30+ sunscreen application at start of shift and reapplication every 2 hours. " +
          "Wide-brimmed hard hats with neck protection, UV-blocking safety glasses, and long-sleeved lightweight clothing recommended. " +
          "Schedule rotation of tasks to distribute sun exposure among workers. " +
          "Create artificial shade structures when working in exposed areas for extended periods. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature considerations
      if (temp >= thresholds.temperature.hot) {
        safety += "HEAT ILLNESS PREVENTION PROTOCOL ACTIVATION: " +
          "Implement mandatory work-rest cycles (15 minute break every hour minimum, increasing with temperature). " +
          "Provide cooling stations with shade, fans, and cold water/electrolyte solutions. " +
          "Adjust work schedules to avoid peak heat hours when possible. " +
          "Assign buddy system for heat illness monitoring and train personnel to recognize early symptoms. " +
          "Acclimate new workers gradually with reduced workloads for first 1-2 weeks. ";
        severity = "high";
      } else if (temp <= thresholds.temperature.cold) {
        safety += "COLD EXPOSURE MANAGEMENT PROTOCOL: " +
          "Implement engineering controls: temporary heating, windbreaks, and warming areas. " +
          "Schedule more frequent warming breaks as temperature decreases (at least 10 minutes per hour below freezing). " +
          "Proper layering with moisture-wicking base layers and waterproof/windproof outer layers. " +
          "Keep extra dry clothing available for workers who become wet. " +
          "Provide warm beverages and high-energy snacks to maintain core temperature. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Wind and weather event considerations
      if (wind >= thresholds.wind.strongBreeze) {
        safety += "WIND HAZARD CONTROLS NEEDED: " +
          "Secure all loose materials, tools, and temporary structures. " +
          "Evaluate safety of crane operations and working at heights - implement lower wind speed thresholds. " +
          "Be alert for wind-blown debris and dust - enhance eye protection requirements. " +
          "Communication systems may be compromised - establish alternative methods if necessary. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Lightning/storm risk
      if (weatherText.includes('thunder') || weatherText.includes('lightning') || weatherText.includes('storm')) {
        safety += "LIGHTNING SAFETY PROTOCOL ACTIVATION: " +
          "Suspend all outdoor work and height work when lightning is detected within 10 miles. " +
          "Move personnel to substantial buildings or enclosed metal vehicles. " +
          "Wait 30 minutes after last lightning strike before resuming outdoor operations. " +
          "Avoid contact with conductive materials including metal frameworks, equipment, and utility lines. ";
        severity = "high";
      }
      
      // Visibility considerations
      if (visibility <= thresholds.visibility.moderate) {
        safety += "REDUCED VISIBILITY PRECAUTIONS: " +
          "Enhance workspace lighting with additional temporary fixtures. " +
          "Require high-visibility clothing for all personnel regardless of task. " +
          "Implement slower equipment operation speeds and additional signaling personnel. " +
          "Clearly mark hazards, edges, and level changes with reflective materials. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'waterActivities':
      // Swimming, boating, and water-related activities
      safety += "🌊 WATER SAFETY ADVISORY: ";
      
      // Weather-related water safety
      if (weatherText.includes('thunder') || weatherText.includes('lightning') || weatherText.includes('storm')) {
        safety += "IMMEDIATE EVACUATION RECOMMENDED: Water activities during thunderstorms present extreme danger. " +
          "Exit water bodies completely at first signs of lightning or thunder and seek proper shelter. " +
          "Remember the 30/30 rule: Exit water when thunder is heard and wait 30 minutes after the last thunder before returning. " +
          "Lightning can strike water from significant distances, conducting electricity throughout the water body. ";
        severity = "high";
      }
      
      // Wind considerations for water activities
      if (wind >= thresholds.wind.freshBreeze) {
        safety += "WIND IMPACT ON WATER CONDITIONS: " +
          "Current wind speeds will create challenging conditions for watercraft, especially smaller vessels and paddlecraft. " +
          "Wave height and choppiness will be increased, affecting stability and navigation. " +
          "Inexperienced participants should postpone water activities until calmer conditions. " +
          "Life jacket use becomes even more critical in windy conditions. ";
        
        if (wind >= thresholds.wind.strongBreeze) {
          safety += "HAZARDOUS WIND CONDITIONS FOR WATER ACTIVITIES: " +
            "Small craft advisory conditions exist - recreational watercraft should remain ashore. " +
            "Wind-driven waves and currents can quickly overcome swimming abilities even for strong swimmers. " +
            "Winds can rapidly push inflatable items and paddlecraft away from shore. ";
          severity = "high";
        }
      }
      
      // Temperature considerations for immersion
      if (temp <= thresholds.temperature.mild) {
        safety += "COLD WATER IMMERSION RISK: " +
          "Water temperature will likely be significantly colder than air temperature. " +
          "Cold water immersion can rapidly lead to swimming failure and hypothermia. " +
          "Proper thermal protection (wetsuits/drysuits) recommended for extended water activities. " +
          "Limit immersion time based on water temperature and thermal protection used. ";
        
        if (temp <= thresholds.temperature.cool) {
          safety += "SERIOUS COLD WATER DANGER: " +
            "Water temperatures in current conditions can induce cold shock response within seconds. " +
            "Even strong swimmers may become incapacitated within minutes. " +
            "Cold water activities should be limited to properly equipped and experienced individuals with supervision. ";
          severity = "high";
        }
      }
      
      // UV exposure for water activities
      if (uv >= thresholds.uv.moderate) {
        safety += "ENHANCED UV EXPOSURE NEAR WATER: " +
          "Water reflects up to 100% of UV radiation, effectively doubling your exposure compared to land activities. " +
          "Apply waterproof SPF 50+ sunscreen 30 minutes before activity and reapply immediately after swimming/toweling. " +
          "Areas often missed: ears, back of neck, tops of feet, behind knees - give special attention to these. " +
          "UV-protective rash guards and hats provide more reliable protection than sunscreen alone for extended water activities. ";
        
        if (uv >= thresholds.uv.high) {
          safety += "EXTREME UV REFLECTION HAZARD: " +
            "High UV combined with water reflection creates severe sunburn risk even during short exposures. " +
            "Physical protection (clothing, hats, shade) becomes essential rather than optional. " +
            "Schedule water activities before 10am or after 4pm to avoid peak UV intensity. ";
          severity = severity === "low" ? "medium" : severity;
        }
      }
      
      // Visibility considerations for water safety
      if (visibility <= thresholds.visibility.moderate) {
        safety += "REDUCED VISIBILITY WATER HAZARDS: " +
          "Limited visibility increases risk of collisions with obstacles, other watercraft, and swimmers. " +
          "Maintain closer proximity to shore and familiar areas. " +
          "Use bright visual identifiers (flags, lights, brightly colored clothing/equipment) to increase visibility to others. " +
          "Establish clear communication plans and meeting points if group members become separated. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'winterActivities':
      // Winter sports and cold weather activities
      safety += "❄️ WINTER ACTIVITY ASSESSMENT: ";
      
      // Temperature and wind chill specific to winter activities
      if (temp <= thresholds.temperature.cold) {
        safety += "COLD EXPOSURE MANAGEMENT ESSENTIAL: " +
          "Current temperatures require proper technical cold weather gear. " +
          "Use the layering system: moisture-wicking base layer, insulating mid-layer, wind/waterproof outer layer. " +
          "Exposed skin can freeze within 30 minutes - ensure face, head, hands, and feet have appropriate protection. " +
          "Bring chemical hand/foot warmers and emergency thermal blankets. ";
        
        if (temp <= thresholds.temperature.veryCold || windChill <= thresholds.temperature.veryCold) {
          safety += "EXTREME COLD DANGER: " +
            "Frostbite risk to exposed skin within 10-30 minutes depending on wind conditions. " +
            "Hypothermia can develop rapidly, especially when combining cold with exertion and possible wet conditions. " +
            "Reduce continuous exposure time to 30-45 minute intervals with warming breaks. " +
            "Buddy system essential - monitor each other for early signs of cold injury (pale/numb skin, confusion, slurred speech). ";
          severity = "high";
        }
      }
      
      // Visibility considerations for winter
      if (visibility <= thresholds.visibility.moderate || weatherText.includes('snow') || weatherText.includes('fog')) {
        safety += "NAVIGATION HAZARDS IN WINTER CONDITIONS: " +
          "Reduced visibility increases risk of disorientation, especially in unfamiliar terrain. " +
          "Carry navigation aids (compass, GPS) and know how to use them in limited visibility. " +
          "Set conservative turnaround times and boundaries for activities. " +
          "Bright or contrasting colored clothing increases visibility to others and rescue personnel if needed. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Snow conditions and avalanche awareness
      if (weatherText.includes('snow')) {
        safety += "SNOW CONDITION CONSIDERATIONS: " +
          "Recent snowfall will affect surface conditions and potentially stability. " +
          "Trail breaking through fresh snow requires significantly more energy - plan for slower pace and greater exertion. " +
          "In backcountry areas, assess avalanche risk before proceeding, especially on slopes between 30-45 degrees. " +
          "Proper avalanche safety equipment (beacon, probe, shovel) and training recommended for backcountry travel. ";
      }
      
      // UV considerations for winter (often overlooked)
      if (uv >= thresholds.uv.moderate) {
        safety += "WINTER UV PROTECTION OFTEN OVERLOOKED: " +
          "Snow reflects up to 80% of UV radiation, significantly increasing exposure even on cloudy days. " +
          "Apply broad-spectrum sunscreen to all exposed skin, especially under-chin and nose which receive reflected UV. " +
          "Snow blindness risk requires quality sunglasses with side protection and 99-100% UV blockage. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Ice safety
      if (temp <= thresholds.temperature.cold) {
        safety += "ICE SAFETY AWARENESS: " +
          "Ice conditions on bodies of water can be highly variable and unpredictable. " +
          "Never assume ice is safe without proper assessment - thickness should be at least 4 inches for walking, more for vehicles. " +
          "Carry ice safety picks and rope when traversing frozen water bodies. " +
          "Travel with companions and maintain safe distances when checking ice conditions. ";
      }
      break;
      
    case 'petActivities':
      // Pet-specific activity considerations
      safety += "🐾 PET SAFETY ADVISORY: ";
      
      // Temperature considerations for pets
      if (temp >= thresholds.temperature.warm) {
        safety += "HEAT RISK FOR PETS: " +
          "Animals are more vulnerable to heat stress than humans due to limited cooling mechanisms. " +
          "Walk dogs during cooler parts of day (early morning/late evening). " +
          "Provide constant access to shade and fresh water during outdoor time. " +
          "Check pavement temperature with back of hand - if too hot to hold for 7 seconds, it's too hot for pet paws. ";
        
        if (temp >= thresholds.temperature.hot) {
          safety += "SERIOUS PET HEAT DANGER: " +
            "Limit outdoor exposure to brief potty breaks during cooler hours only. " +
            "Watch for signs of heat distress: excessive panting, drooling, lethargy, or bright red gums. " +
            "Never leave pets in vehicles - interior temperatures can reach lethal levels within minutes, even with windows cracked. " +
            "Consider cooling vests or mats for necessary outdoor time. ";
          severity = "high";
        }
      } else if (temp <= thresholds.temperature.cool) {
        safety += "COLD WEATHER PET PRECAUTIONS: " +
          "Short-haired breeds, puppies, senior dogs, and small dogs lose body heat more quickly. " +
          "Consider appropriate pet clothing for walks (coats, sweaters, booties for paw protection). " +
          "Shorter, more frequent walks better than single long exposure. " +
          "Wipe paws after walks to remove snow, ice, and potentially toxic de-icing chemicals. ";
        
        if (temp <= thresholds.temperature.cold) {
          safety += "SIGNIFICANT COLD RISK FOR PETS: " +
            "Limit outdoor exposure for most pets to 10-15 minute intervals. " +
            "Monitor closely for shivering, anxiety, slowing down, or lifting paws off ground. " +
            "Provide elevated bedding and wind barriers for outdoor pet shelters if permanent outdoor living situations exist. ";
          severity = severity === "low" ? "medium" : severity;
        }
      }
      
      // Air quality considerations for pets
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "AIR QUALITY IMPACT ON PETS: " +
          "Animals, particularly birds and those with respiratory conditions, are often more sensitive to air pollution. " +
          "Significantly limit outdoor time and exercise intensity during poor air quality conditions. " +
          "Watch for coughing, eye irritation, difficulty breathing, or unusual lethargy which may indicate air quality distress. " +
          "Postpone extended outdoor training or play sessions until air quality improves. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Visibility and traffic safety with pets
      if (visibility <= thresholds.visibility.moderate || !isDay) {
        safety += "PET VISIBILITY SAFETY: " +
          "Reduced visibility conditions increase risk to pets near traffic areas. " +
          "Use reflective leashes, collars, vests, or LED accessories to ensure pet visibility to vehicles. " +
          "Keep pets on shorter leads in low visibility conditions to maintain better control. " +
          "Avoid off-leash activities in unfenced areas during poor visibility. ";
      }
      
      // Precipitation and wet conditions for pets
      if (precipProbability >= thresholds.precipProbability.likely || 
          weatherText.includes('rain') || 
          weatherText.includes('snow')) {
        safety += "WET WEATHER PET CARE: " +
          "Some pets become more stressed during precipitation - plan for shorter outings if your pet shows anxiety. " +
          "Properly dry pets after wet outings, paying special attention to paws, belly, and ears to prevent skin issues. " +
          "Consider waterproof pet gear for extended necessary outings. " +
          "Be aware that scent tracking is diminished in wet conditions - pets may become disoriented more easily. ";
      }
      break;
      
    default:
      // General advice for uncategorized activities
      safety += "GENERAL ENVIRONMENTAL PRECAUTIONS: ";
      
      // Air quality general guidance
      if (aqi >= thresholds.aqi.unhealthy) {
        safety += "Poor air quality (AQI: " + aqi + ") affects most outdoor activities. " +
          "Consider indoor alternatives where appropriate air filtration is available. " +
          "If outdoor presence is necessary, limit duration and exertion level while using appropriate respiratory protection. " +
          "Those with heart disease, lung conditions, children, and older adults should avoid outdoor exposure entirely. ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      // Temperature general guidance
      if (temp >= thresholds.temperature.hot) {
        safety += "Hot conditions require proper hydration, sun protection, and heat management strategies. " +
          "Schedule activities during cooler parts of the day when possible. " +
          "Take regular breaks in shade or air-conditioned environments. " +
          "Recognize early signs of heat illness: headache, dizziness, nausea, or excessive sweating. ";
        severity = severity === "low" ? "medium" : severity;
      } else if (temp <= thresholds.temperature.cold) {
        safety += "Cold conditions require proper layering, limited skin exposure, and awareness of hypothermia/frostbite risks. " +
          "Dress in insulating layers that can be adjusted as needed. " +
          "Stay dry - wet clothing dramatically accelerates heat loss. " +
          "Maintain calorie and fluid intake to support body temperature regulation. ";
        severity = severity === "low" ? "medium" : severity;
      }
  }
  
  return { 
    text: safety, 
    severity: severity 
  };
}

/**
 * Get mask and respiratory protection recommendations based on conditions.
 * Enhanced with more detailed guidance for specific situations.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Mask recommendations with text and severity level.
 */
function getMaskRecommendations(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { aqi, pm25, condition } = data;
  
  let recommendation = "RESPIRATORY PROTECTION GUIDANCE: ";
  let severity = "low";
  
  // Check if dust or smoke conditions exist regardless of AQI
  const dustSmokeConditions = condition.toLowerCase().includes('dust') || 
                              condition.toLowerCase().includes('smoke') || 
                              condition.toLowerCase().includes('haze') || 
                              condition.toLowerCase().includes('smog');
  
  // General mask recommendations based on AQI
  if (aqi >= thresholds.aqi.hazardous || pm25 >= thresholds.pm25.veryHazardous) {
    recommendation += "URGENT RESPIRATORY PROTECTION NEEDED: Current air quality is at HAZARDOUS levels. " +
      "N95/KN95 masks are STRONGLY RECOMMENDED for everyone when outdoors, properly fitted with no gaps around edges. " +
      "Standard surgical or cloth masks provide inadequate protection against current pollutant levels. " +
      "Even with proper N95 protection, minimize outdoor exposure time to essential activities only. " +
      "Consider using additional air purification in vehicles and indoor spaces. " +
      "Those with respiratory or cardiovascular conditions should avoid outdoor exposure entirely if possible. ";
    severity = "high";
  } else if (aqi >= thresholds.aqi.veryUnhealthy || pm25 >= thresholds.pm25.veryUnhealthy) {
    recommendation += "HIGH-GRADE RESPIRATORY PROTECTION RECOMMENDED: Air quality is at VERY UNHEALTHY levels. " +
      "N95/KN95 masks are RECOMMENDED for everyone during any outdoor exposure. " +
      "Proper fit is crucial - masks should form a complete seal around nose and mouth. " +
      "Replace masks if they become damp, damaged, or visibly dirty, or after 8 hours of cumulative use. " +
      "Those with chronic health conditions should strongly consider postponing non-essential outdoor activities. " +
      "Children, elderly, pregnant women, and those with respiratory or heart conditions are at heightened risk. ";
    severity = "high";
  } else if (aqi >= thresholds.aqi.unhealthy || pm25 >= thresholds.pm25.unhealthy || dustSmokeConditions) {
    recommendation += "RESPIRATORY PROTECTION ADVISED: Air quality is at UNHEALTHY levels. " +
      "N95/KN95 masks are RECOMMENDED for extended outdoor exposure (over 1 hour). " +
      "Surgical masks provide minimal protection but are better than no mask if N95s are unavailable. " +
      "Cloth masks offer very limited protection against current pollutant levels. " +
      "Those with asthma, COPD, heart disease, or other chronic conditions should use N95/KN95 masks even for brief outdoor periods. " +
      "Consider rescheduling strenuous outdoor activities until air quality improves. ";
    severity = "medium";
  } else if (aqi >= thresholds.aqi.sensitiveUnhealthy || pm25 >= thresholds.pm25.sensitiveUnhealthy) {
    recommendation += "TARGETED RESPIRATORY PROTECTION RECOMMENDED: Air quality is UNHEALTHY FOR SENSITIVE GROUPS. " +
      "N95/KN95 masks are RECOMMENDED for vulnerable individuals during outdoor activities. " +
      "Vulnerable groups include: those with asthma, lung disease, heart conditions, children, elderly, and pregnant women. " +
      "Healthy individuals engaged in prolonged or high-intensity outdoor activities should also consider using N95/KN95 masks. " +
      "If you experience symptoms like coughing, throat irritation, or breathing difficulty, take a break indoors and consider using a mask if returning outside. ";
    severity = "medium";
  } else if (aqi >= thresholds.aqi.moderate || pm25 >= thresholds.pm25.moderate) {
    recommendation += "OPTIONAL RESPIRATORY PROTECTION: Air quality is at MODERATE levels. " +
      "Masks are generally NOT NECESSARY for most people during typical outdoor activities. " +
      "Those with severe respiratory sensitivity may consider an N95/KN95 mask during extended or strenuous outdoor exposure. " +
      "Pay attention to how you feel - unusual symptoms may indicate higher personal sensitivity to current air conditions. ";
  } else {
    recommendation += "Masks are NOT NECESSARY for air quality protection under current GOOD air quality conditions. " +
      "Air pollutant levels are below thresholds of concern for health effects. " +
      "Those with extreme respiratory sensitivity may still choose to wear masks in specific high-pollution microenvironments (near busy roads, construction, etc.). ";
  }
  
  // Additional specific recommendations based on activity category
  switch (category) {
    case 'outdoorVigorous':
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        recommendation += "IMPORTANT EXERCISE CONSIDERATION: Masks may significantly restrict airflow during vigorous exercise. " +
          "This creates a trade-off between air quality protection and exercise performance/comfort. " +
          "Consider these alternatives: 1) Reduce exercise intensity to accommodate mask wearing, 2) Choose indoor exercise with filtration, " +
          "3) Relocate to areas with better air quality, 4) Reschedule activity when air quality improves. " +
          "If you feel dizzy, lightheaded, or unusually short of breath while exercising with a mask, reduce intensity or stop immediately. ";
      }
      break;
      
    case 'childrenOutdoor':
      if (aqi >= thresholds.aqi.moderate) {
        recommendation += "CHILD-SPECIFIC MASK GUIDANCE: Standard adult masks don't properly fit children and provide inadequate protection. " +
          "Use child-sized N95/KN95 masks (or KF94) that fit properly with minimal gaps around edges. " +
          "Children under 2 years should NOT wear masks due to breathing risks. " +
          "For children 2-8 years, mask fit and comfort are especially important - practice wearing masks for short periods. " +
          "Children may touch/adjust masks frequently, reducing effectiveness - consider this limitation in protection planning. " +
          "Watch children closely for any breathing difficulty while wearing masks. ";
      }
      break;
      
    case 'seniorActivities':
      if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
        recommendation += "SENIOR-SPECIFIC RESPIRATORY PROTECTION: Older adults often have decreased respiratory capacity and are more vulnerable to air pollution. " +
          "N95/KN95 masks can increase breathing resistance - monitor for any discomfort or increased breathing difficulty. " +
          "Masks with exhalation valves may be easier to breathe through but provide less protection to others if you're contagious. " +
          "Take frequent breaks from mask wearing in clean air environments. " +
          "Those with existing breathing conditions should consult healthcare providers about appropriate mask options. ";
      }
      break;
      
    case 'construction':
      if (aqi >= thresholds.aqi.moderate || pm25 >= thresholds.pm25.moderate) {
        recommendation += "OCCUPATIONAL RESPIRATORY PROTECTION: Construction activities often generate additional dust and particulates beyond ambient air pollution. " +
          "Appropriate NIOSH-certified respirators rated for specific worksite exposures should be used according to occupational safety requirements. " +
          "Implement respiratory protection programs including proper fit testing, training, and medical clearance for respirator use. " +
          "Consider engineering controls (water spray, dust collection) to reduce airborne particulate generation. " +
          "Task rotation can limit individual exposure durations to highest particulate-generating activities. ";
        severity = severity === "low" ? "medium" : severity;
      }
      break;
      
    case 'indoorStationary':
      if (aqi >= thresholds.aqi.veryUnhealthy) {
        recommendation += "INDOOR AIR QUALITY MANAGEMENT: During severe outdoor air pollution, even indoor air quality can be compromised without proper filtration. " +
          "Consider running HEPA air purifiers if available, especially in rooms where you spend the most time. " +
          "Keep windows and doors closed to minimize infiltration of outdoor pollutants. " +
          "If indoor air quality concerns persist, wearing masks even indoors may provide additional protection. " +
          "Change HVAC filters to highest MERV rating compatible with your system and replace more frequently during pollution events. ";
      }
      break;
  }
  
  // Add advice about proper mask usage if masks are recommended
  if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
    recommendation += "PROPER MASK USAGE ESSENTIAL FOR EFFECTIVENESS: " +
      "Ensure mask completely covers nose and mouth with tight fit against face. " +
      "N95/KN95 masks should be replaced when visibly dirty, damaged, or after approximately 8 hours of cumulative use. " +
      "If removing temporarily, store in clean, breathable container like a paper bag, not in pocket or on surfaces. " +
      "Wash hands before putting on and after removing masks. ";
  }
  
  return {
    text: recommendation,
    severity: severity
  };
}

/**
 * Get comprehensive health measures based on conditions and activity.
 * Enhanced with more detailed and specific recommendations.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Health measures with text and severity level.
 */
function getHealthMeasures(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { aqi, uv, temp, humidity, wind, condition, isDay, precipProbability } = data;
  
  let measures = "HEALTH PROTECTION RECOMMENDATIONS: ";
  let severity = "low";
  
  // Hydration guidance based on conditions
  if (temp >= thresholds.temperature.warm || category === 'outdoorVigorous') {
    measures += "HYDRATION STRATEGY: " +
      "Proactive fluid replacement is critical - don't wait until you feel thirsty, as this indicates you're already dehydrated. " +
      "Pre-hydrate with 16-20oz (500-600ml) of fluid 2-3 hours before outdoor activity. " +
      "During activity, aim for 7-10oz (200-300ml) every 15-20 minutes, adjusting based on sweat rate. " +
      "For activities over 60 minutes, include electrolytes in your hydration strategy (sports drinks or electrolyte tablets). " +
      "Monitor hydration status through urine color - pale yellow indicates good hydration. ";
    
    if (temp >= thresholds.temperature.hot) {
      measures += "ENHANCED HYDRATION PROTOCOL: " +
        "Heat significantly increases fluid requirements - expect to need 25-50% more fluid than usual. " +
        "Include sodium in your hydration strategy to replace salt lost through sweat and maintain fluid balance. " +
        "Cool fluids (50-60°F/10-15°C) are absorbed more rapidly than room temperature or warm fluids. " +
        "Post-activity rehydration should replace 150% of estimated fluid loss to account for continued sweating and urination. " +
        "Know the early warning signs of heat illness: headache, dizziness, nausea, or fatigue. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  if (temp <= thresholds.temperature.cool) {
    measures += "COLD WEATHER PROTECTION: " +
      "Layer clothing using the three-layer principle: moisture-wicking base layer, insulating mid-layer, and wind/waterproof outer shell. " +
      "Pay special attention to extremities - quality insulated gloves, warm socks, and appropriate headwear can prevent significant heat loss. " +
      "Start activities slightly cool - you'll warm up during exertion and excessive early layers lead to sweating and subsequent chilling. " +
      "Change out of any damp or wet clothing promptly as moisture dramatically accelerates heat loss. ";
    
    if (temp <= thresholds.temperature.cold) {
      measures += "COLD INJURY PREVENTION: " +
        "Limit continuous cold exposure to 30-45 minutes with warming breaks in severe conditions. " +
        "Keep emergency warming supplies (chemical hand warmers, emergency blanket, thermos with hot fluid) available. " +
        "Recognize early signs of hypothermia: shivering, confusion, fumbling hands, slurred speech. " +
        "Avoid alcohol which creates false sense of warmth while increasing heat loss. " +
        "Stay well-nourished - your body needs calories to generate heat, especially in cold conditions. ";
      severity = severity === "low" ? "medium" : severity;
    }
  }
  
  // UV protection guidance based on index
  if (uv >= thresholds.uv.low) {
    measures += "SUN PROTECTION PROTOCOL: " +
      "Apply broad-spectrum SPF 30+ sunscreen to all exposed skin 30 minutes before sun exposure to allow proper binding to skin. " +
      "Focus on commonly missed areas: ears, back of neck, tops of feet, scalp part-lines, and lips (use SPF lip balm). " +
      "Reapply sunscreen every 2 hours, or immediately after swimming/significant sweating, even with 'waterproof' formulations. " +
      "Combine sunscreen with physical barriers: wide-brimmed hats (3+ inch brim), UPF-rated clothing, and UV-blocking sunglasses. ";
    
    if (uv >= thresholds.uv.high) {
      measures += "HIGH UV PROTECTION ESSENTIAL: " +
        "Seek shade whenever possible, especially during peak UV hours (10am-4pm). " +
        "UV radiation penetrates clouds and can cause severe burns even on overcast days. " +
        "Reflected UV from water, snow, sand, or concrete can double your exposure intensity. " +
        "Certain medications and skincare products can increase sun sensitivity - check labels or consult healthcare provider. " +
        "Remember UV damage is cumulative over your lifetime, contributing to skin aging and cancer risk. ";
      severity = severity === "low" ? "medium" : severity;
    }
    
    if (uv >= thresholds.uv.veryHigh) {
      measures += "EXTREME UV PRECAUTIONS: " +
        "Rearrange outdoor activities to morning (before 10am) or late afternoon (after 4pm) when possible. " +
        "Use sun-protective clothing as primary protection rather than relying solely on sunscreen. " +
        "Severe sunburn can occur in as little as 10-15 minutes of unprotected exposure at current UV levels. " +
        "Schedule indoor breaks during peak UV intensity hours. ";
      severity = "high";
    }
  }
  
  // Air quality health measures
  if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
    measures += "AIR QUALITY HEALTH PRECAUTIONS: " +
      "Be alert for symptoms like coughing, throat/eye irritation, shortness of breath, chest tightness, or unusual fatigue. " +
      "These symptoms indicate potential adverse reactions to current air quality conditions. " +
      "Reduce outdoor activity duration and intensity to minimize respiratory exposure to pollutants. " +
      "Consider activated carbon or HEPA air purifiers for indoor spaces, particularly sleeping areas. ";
    
    if (aqi >= thresholds.aqi.unhealthy) {
      measures += "SIGNIFICANT RESPIRATORY PROTECTION NEEDED: " +
        "Those with respiratory conditions should ensure rescue medications are readily available and use preventive medications as directed. " +
        "Monitor peak flow or other respiratory metrics more frequently if you have asthma or COPD. " +
        "Consider wearing appropriate respiratory protection when outdoors (see mask recommendations). " +
        "The elderly, children, pregnant women, and those with heart/lung conditions should minimize outdoor exposure. ";
      severity = severity === "low" ? "medium" : severity;
    }
    
    if (aqi >= thresholds.aqi.veryUnhealthy) {
      measures += "SERIOUS AIR QUALITY HEALTH RISKS: " +
        "Even short-term exposure at current levels can exacerbate existing cardiovascular and respiratory conditions. " +
        "Healthy individuals may experience adverse effects with prolonged exposure. " +
        "Create a clean air zone in your home with air purifiers and proper sealing against outdoor air infiltration. " +
        "If you experience significant respiratory symptoms, consider consulting healthcare providers promptly. ";
      severity = "high";
    }
  }
  
  // Weather-specific health considerations
  if (condition.toLowerCase().includes('rain') || precipProbability >= thresholds.precipProbability.likely) {
    measures += "WET CONDITIONS HEALTH SAFEGUARDS: " +
      "Waterproof outer layers are essential to prevent clothing from becoming soaked, which rapidly accelerates heat loss. " +
      "Have dry change of clothes accessible, especially for after activity completion. " +
      "Wet conditions increase blister risk - ensure properly fitted footwear and consider moisture-wicking socks. " +
      "Slippery surfaces increase fall risk - use appropriate footwear with good traction and adjust movements accordingly. ";
  }
  
  if (condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('lightning')) {
    measures += "THUNDERSTORM SAFETY PROTOCOL: " +
      "Lightning is a lethal threat - seek proper shelter at first signs of thunderstorm (indoor building or fully enclosed metal vehicle). " +
      "Avoid open fields, hilltops, ridgelines, beaches, and bodies of water during thunderstorms. " +
      "Stay away from tall isolated objects like trees, poles, or towers which attract lightning strikes. " +
      "Wait 30 minutes after the last thunder before resuming outdoor activities. ";
    severity = "high";
  }
  
  // Humidity specific health measures
  if (humidity >= thresholds.humidity.humid && temp >= thresholds.temperature.warm) {
    measures += "HIGH HUMIDITY IMPACT: " +
      "Sweat evaporation (your body's primary cooling mechanism) is significantly impaired in humid conditions. " +
      "This creates a higher risk of heat-related illness even at lower temperatures than typically concerning. " +
      "Perceived temperature ('feels like' or heat index) is substantially higher than actual temperature. " +
      "Adjust activity intensity and duration more conservatively than temperature alone would indicate. " +
      "External cooling methods become more important - cool water immersion, cold towels, fans, and air conditioning. ";
    severity = severity === "low" ? "medium" : severity;
  } else if (humidity <= thresholds.humidity.dry && temp >= thresholds.temperature.mild) {
    measures += "LOW HUMIDITY CONSIDERATIONS: " +
      "Dehydration can occur more rapidly as sweat evaporates quickly, sometimes without noticeable perspiration. " +
      "Respiratory passages may become dry, aggravating conditions like asthma or allergies. " +
      "Increase fluid intake beyond normal recommendations - you may lose more water than you realize. " +
      "Moisturize skin and use lip balm to prevent cracking and irritation from excessive dryness. ";
  }
  
  // Wind health considerations
  if (wind >= thresholds.wind.strongBreeze) {
    measures += "STRONG WIND PRECAUTIONS: " +
      "Wind significantly increases heat loss (wind chill effect), requiring additional insulation in cool/cold conditions. " +
      "Eye protection is important as wind can carry debris and irritants that damage eyes. " +
      "Wind can cause balance issues, particularly affecting elderly individuals or those on uneven terrain. " +
      "Be alert for wind-blown objects and falling branches/debris which can cause injury. ";
    severity = severity === "low" ? "medium" : severity;
  }
  
  // Activity-specific health measures
  switch (category) {
    case 'outdoorVigorous':
      measures += "VIGOROUS ACTIVITY HEALTH PROTOCOLS: " +
        "Proper warm-up (10-15 minutes of gradually increasing intensity) is essential to prevent injury. " +
        "Include dynamic stretching rather than static stretching before activity. " +
        "Adjust performance expectations for environmental conditions - pacing strategies that work in optimal conditions may be inappropriate today. " +
        "Listen to your body - unusual fatigue, dizziness, or discomfort are important signals to reduce intensity or stop. ";
        
      if (aqi >= thresholds.aqi.moderate || temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cool) {
        measures += "ENVIRONMENTAL STRESS ADAPTATION: " +
          "Consider interval training instead of continuous exertion to incorporate regular recovery periods. " +
          "Monitor heart rate if possible - expect 5-10 beats per minute higher than normal at equivalent workloads in challenging conditions. " +
          "Recovery between sessions takes longer in challenging environmental conditions - extend rest periods by 24-48 hours when necessary. " +
          "Post-activity recovery nutrition and hydration become more critical - consume protein/carbohydrates within 30 minutes after finishing. ";
      }
      break;
      
    case 'outdoorModerate':
      if (humidity >= thresholds.humidity.humid && temp >= thresholds.temperature.warm) {
        measures += "HUMIDITY IMPACT ON MODERATE ACTIVITIES: " +
          "High humidity combined with warm temperatures creates greater physiological stress even during moderate activities. " +
          "The body's natural cooling mechanisms are less effective, requiring more frequent rest periods. " +
          "Adapt expectations - tasks that normally feel easy may seem unusually demanding. " +
          "Schedule activities during lower humidity times of day when possible (typically early morning). ";
        severity = severity === "low" ? "medium" : severity;
      }
      
      if (isDay && uv >= thresholds.uv.moderate) {
        measures += "SUN EXPOSURE DURING MODERATE ACTIVITIES: " +
          "Even during lower-intensity activities, sun exposure accumulates and can lead to sunburn, heat stress, and long-term skin damage. " +
          "Plan activity routes that maximize available shade when possible. " +
          "Take regular shade breaks, especially during peak UV hours (10am-4pm). " +
          "Wide-brimmed hats provide better protection than caps or visors for face, ears, and neck. ";
      }
      break;
      
    case 'childrenOutdoor':
      measures += "CHILDREN'S HEALTH SAFEGUARDS: " +
        "Children have specific vulnerabilities different from adults - they have higher surface area to body mass ratio, less developed temperature regulation, and often don't recognize their own physical limits. " +
        "Schedule regular breaks regardless of whether children say they need them. " +
        "Children often don't recognize thirst properly - schedule specific hydration breaks every 20 minutes. " +
        "Children may not communicate discomfort effectively - watch for behavioral changes that might indicate environmental distress. ";
      
      if (aqi >= thresholds.aqi.moderate || uv >= thresholds.uv.moderate) {
        severity = severity === "low" ? "medium" : severity;
      }
      
      if (temp >= thresholds.temperature.warm) {
        measures += "CHILD HEAT PROTECTION: " +
          "Children produce more body heat relative to size and sweat less effectively than adults. " +
          "They often get distracted by activities and ignore early signs of heat stress. " +
          "Create a consistent shade/hydration/rest schedule rather than waiting for signs of fatigue. " +
          "Use cooling methods appropriate for children: water spray bottles, damp cloths on neck/wrists, and lightweight breathable clothing. ";
      }
      
      if (uv >= thresholds.uv.moderate) {
        measures += "CHILD UV PROTECTION: " +
          "Children's skin is more sensitive to UV damage, and childhood sunburns significantly increase lifetime skin cancer risk. " +
          "Reapply sunscreen more frequently for children who are swimming, sweating, or rubbing their skin. " +
          "UV protective clothing is often more effective than sunscreen for children who may resist frequent sunscreen application. " +
          "Teach sun protection as a routine habit from an early age. ";
      }
      break;
      
    case 'seniorActivities':
      measures += "SENIOR HEALTH CONSIDERATIONS: " +
        "Older adults have reduced physiological reserves and often decreased ability to sense environmental stress. " +
        "Thirst sensation diminishes with age - maintain regular fluid intake regardless of perceived need. " +
        "Heat and cold tolerance typically decrease with age, requiring more conservative activity modifications. " +
        "Medication effects can be amplified by environmental conditions - consult healthcare providers about specific precautions. ";
      
      if (aqi >= thresholds.aqi.moderate || temp >= thresholds.temperature.warm || temp <= thresholds.temperature.cool) {
        severity = severity === "low" ? "medium" : severity;
      }
      
      if (temp >= thresholds.temperature.warm) {
        measures += "SENIOR HEAT VULNERABILITY: " +
          "Age-related changes in sweat gland function and circulation reduce cooling efficiency. " +
          "Chronic conditions common in older adults (diabetes, heart disease) further increase heat sensitivity. " +
          "Certain medications (diuretics, beta-blockers, antihistamines) can impair heat regulation and increase risk. " +
          "Check in with friends or family during hot weather periods, as heat illness can progress rapidly and affect cognition. ";
      }
      
      if (temp <= thresholds.temperature.cool) {
        measures += "SENIOR COLD SENSITIVITY: " +
          "Aging skin becomes thinner with less insulating fat, increasing vulnerability to cold. " +
          "Conditions like diabetes, thyroid problems, and arthritis can affect temperature regulation and cold perception. " +
          "Maintain core temperature with appropriate layering, paying special attention to extremity protection. " +
          "Be aware that certain medications can reduce awareness of dropping body temperature or impair blood circulation. ";
      }
      
      // Fall prevention
      if (precipProbability >= thresholds.precipProbability.possible || 
          condition.toLowerCase().includes('rain') || 
          condition.toLowerCase().includes('snow') || 
          condition.toLowerCase().includes('ice')) {
        measures += "FALL PREVENTION PROTOCOL: " +
          "Falls are a leading cause of injury for older adults, and wet/icy conditions significantly increase this risk. " +
          "Wear footwear with excellent traction and non-slip soles designed for current conditions. " +
          "Use assistive devices like walking poles or canes even if not normally needed. " +
          "Scan walking paths ahead for potential hazards and take alternative routes when necessary. " +
          "Move with deliberate, shorter steps keeping center of gravity lower for greater stability. ";
      }
      break;
  }
  
  // Additional general health recommendations
  measures += "GENERAL HEALTH GUIDANCE: " +
    "Stay connected - inform others of your planned activities and expected return time in challenging conditions. " +
    "Have communication means available (charged phone, emergency contacts accessible). " +
    "Trust your instincts - if something feels unusually difficult or uncomfortable, it's appropriate to modify plans. " +
    "Environmental conditions affect everyone differently based on individual factors including fitness, acclimatization, health status, and genetics. ";
  
  return {
    text: measures,
    severity: severity
  };
}

/**
 * Get additional recommendations based on specific conditions.
 * @param {string} category - The activity category.
 * @param {Object} weatherData - Weather and air quality data.
 * @return {Object} Additional recommendations with text and severity level.
 */
function getAdditionalRecommendations(category, weatherData) {
  // Extract relevant weather data
  const data = extractWeatherData(weatherData);
  const { 
    aqi, uv, temp, humidity, wind, visibility, 
    condition, precipProbability, precipIntensity 
  } = data;
  
  let recommendations = "ADDITIONAL IMPORTANT CONSIDERATIONS: ";
  let severity = "low";
  
  // Equipment and preparation recommendations
  recommendations += "PREPARATION GUIDANCE: ";
  
  // Base layer recommendations based on temperature
  if (temp <= thresholds.temperature.cool) {
    recommendations += "Choose moisture-wicking base layers that keep sweat away from your skin to prevent chilling. " +
      "Wool or synthetic materials perform better than cotton in cool/cold conditions. ";
  } else if (temp >= thresholds.temperature.warm) {
    recommendations += "Select lightweight, loose-fitting, light-colored clothing that allows airflow and sweat evaporation. " +
      "Technical fabrics designed for heat management outperform everyday cotton in hot conditions. ";
  }
  
  // Footwear recommendations based on conditions
  if (precipProbability >= thresholds.precipProbability.likely || 
      condition.toLowerCase().includes('rain') || 
      condition.toLowerCase().includes('snow')) {
    recommendations += "Waterproof footwear with adequate traction becomes essential in current precipitation conditions. " +
      "Consider gaiters for additional protection against water/debris entry from above. ";
  }
  
  // Visibility gear recommendations
  if (visibility <= thresholds.visibility.moderate || 
      condition.toLowerCase().includes('fog') || 
      condition.toLowerCase().includes('mist')) {
    recommendations += "Visibility enhancement gear (reflective strips, bright colors, lights) significantly improves safety in current low-visibility conditions. " +
      "Carry backup illumination sources even for daytime activities in case conditions worsen. ";
  }
  
  // Emergency preparedness based on conditions
  const severeConditions = temp <= thresholds.temperature.cold || 
                          temp >= thresholds.temperature.hot || 
                          aqi >= thresholds.aqi.unhealthy || 
                          wind >= thresholds.wind.highWind ||
                          condition.toLowerCase().includes('storm');
  
  if (severeConditions) {
    recommendations += "Enhanced emergency preparedness is warranted in current conditions: " +
      "Share your detailed plan with others, carry fully charged communication devices, and have emergency contacts accessible. " +
      "Pack appropriate emergency supplies specific to current conditions (extra layers, heat packs, cooling packs, emergency shelter, etc.). " +
      "Know locations of potential emergency shelter points along your route. ";
    severity = severity === "low" ? "medium" : severity;
  }
  
  // Timing recommendations
  if (uv >= thresholds.uv.high && temp >= thresholds.temperature.warm) {
    recommendations += "OPTIMAL TIMING STRATEGY: Schedule outdoor activities during early morning (before 10am) or late afternoon/evening (after 4pm) " +
      "to avoid the combined stress of peak UV exposure and highest temperatures. " +
      "Early morning typically offers the most favorable conditions with lower temperatures, UV levels, and often pollution levels. ";
  } else if (uv >= thresholds.uv.high) {
    recommendations += "TIMING FOR UV PROTECTION: Peak UV radiation occurs between 10am-4pm, even on cloudy days. " +
      "Schedule significant outdoor exposure outside these hours when possible, or plan for indoor/shade breaks during this window. ";
  } else if (temp >= thresholds.temperature.hot) {
    recommendations += "HEAT MANAGEMENT TIMING: Temperature typically peaks between 2pm-5pm, slightly later than peak UV hours. " +
      "Early morning activities (before 9am) typically offer the coolest conditions of the day. " +
      "Allow for proper cool-down periods after activity before entering air-conditioned environments to prevent thermal shock. ";
  }
  
  // Location-specific recommendations
  if (aqi >= thresholds.aqi.sensitiveUnhealthy) {
    recommendations += "LOCATION SELECTION FOR AIR QUALITY: " +
      "Air quality can vary significantly within short distances. " +
      "Choose routes away from major roadways, industrial areas, or active construction sites which have higher localized pollution. " +
      "Higher elevation areas and those with better air circulation typically have improved air quality. " +
      "Air pollution often settles in valleys and low-lying areas, especially during temperature inversions. ";
  }
  
  if (wind >= thresholds.wind.freshBreeze) {
    recommendations += "WIND EXPOSURE PLANNING: " +
      "Select routes with natural wind barriers (trees, terrain features) when possible. " +
      "In cold conditions, plan outward journeys facing into the wind when you're fresh, allowing wind at your back on return when you're more fatigued. " +
      "In hot conditions, open areas with consistent breeze can provide beneficial cooling effects if sun protection is addressed. ";
  }
  
  // Activity-specific additional considerations
  switch (category) {
    case 'outdoorVigorous':
      recommendations += "PERFORMANCE OPTIMIZATION: " +
        "Adjust performance expectations based on environmental conditions - attempting to maintain normal pace/intensity in challenging conditions increases health risks. " +
        "Consider workout design modifications: shorter high-intensity intervals with longer recovery periods, reduced overall volume, or alternative training modalities. " +
        "Recovery nutrition becomes even more critical in environmental stress - prioritize both fluid and electrolyte replacement along with normal recovery nutrition. ";
      break;
      
    case 'childrenOutdoor':
      recommendations += "CHILD-SPECIFIC PLANNING: " +
        "Children often lack awareness of environmental conditions - create structured activity/rest cycles rather than relying on them to self-regulate. " +
        "Plan engaging alternative activities in case primary plans become unsafe due to changing conditions. " +
        "Build environmental awareness through age-appropriate education during activities. ";
      break;
      
    case 'waterActivities':
      recommendations += "WATER SAFETY ENHANCEMENTS: " +
        "Environmental conditions affect water safety beyond just weather - water temperature, visibility, and wind-generated currents require special attention. " +
        "Life jackets/personal flotation devices become even more critical in suboptimal conditions. " +
        "Establish clear communication signals that work in noisy or limited visibility environments. " +
        "Set conservative turnaround points and time limits with specific action plans if these are reached. ";
      break;
  }
  
  return {
    text: recommendations,
    severity: severity
  };
}

/**
 * Determines the overall severity level based on individual recommendation severities.
 * @param {Object} severities - Individual severity levels for each recommendation type.
 * @return {string} Overall severity level.
 */
function getOverallSeverity(severities) {
  if (Object.values(severities).includes('high')) {
    return 'high';
  } else if (Object.values(severities).includes('medium')) {
    return 'medium';
  } else {
    return 'low';
  }
}

/**
 * Main function to get recommendations.
 * Enhanced with additional recommendation types and more detailed formatting.
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
    const additionalRec = getAdditionalRecommendations(activityCategory, weatherData);
    
    // Determine overall severity
    const severities = {
      activity: activitySafetyRec.severity,
      mask: maskRec.severity,
      health: healthRec.severity,
      additional: additionalRec.severity
    };
    
    const overallSeverity = getOverallSeverity(severities);
    
    // Format as a comprehensive text
    const recommendationText = {
      activitySafety: activitySafetyRec.text,
      maskRecommendations: maskRec.text,
      healthMeasures: healthRec.text,
      additionalRecommendations: additionalRec.text
    };
    
    // Format recommendations into categories
    const formattedRecommendations = formatRecommendations(recommendationText);
    
    // Generate a concise summary based on severity
    let summary = "Environmental conditions are ";
    if (overallSeverity === "high") {
      summary += "POTENTIALLY HAZARDOUS for your planned activity. Significant modifications or postponement strongly recommended.";
    } else if (overallSeverity === "medium") {
      summary += "CHALLENGING for your planned activity. Careful preparation and modifications advised.";
    } else {
      summary += "GENERALLY FAVORABLE for your planned activity. Standard precautions recommended.";
    }
    
    // Return structured results
    return {
      summary: summary,
      recommendationText: recommendationText,
      formattedRecommendations: formattedRecommendations,
      severity: {
        overall: overallSeverity,
        activity: activitySafetyRec.severity,
        mask: maskRec.severity,
        health: healthRec.severity,
        additional: additionalRec.severity
      },
      activityCategory: activityCategory
    };
  } catch (error) {
    console.error("Error generating recommendations:", error);
    
    // Return a backup response if an error occurs
    return {
      summary: "Unable to fully analyze current conditions. Using generalized safety guidance.",
      recommendationText: {
        activitySafety: "Error generating detailed activity safety recommendations. General advice: Monitor environmental conditions closely and adjust activities accordingly.",
        maskRecommendations: "Error generating specific mask recommendations. General advice: Consider appropriate respiratory protection during poor air quality events.",
        healthMeasures: "Error generating detailed health measures. General advice: Stay hydrated, use sun protection, dress appropriately for conditions, and monitor for signs of environmental stress.",
        additionalRecommendations: "Error generating additional recommendations. General advice: Preparation is key - check forecasts before activities and have appropriate gear for potential condition changes."
      },
      formattedRecommendations: {
        general: [
          "Monitor environmental conditions and adjust activities accordingly.",
          "Consider appropriate respiratory protection during poor air quality events.",
          "Stay hydrated, use sun protection, and dress appropriately for conditions.",
          "Watch for signs of environmental distress and have a safety plan.",
          "Check forecasts before activities and prepare for potential condition changes."
        ]
      },
      severity: {
        overall: "medium",
        activity: "medium",
        mask: "medium",
        health: "medium",
        additional: "medium"
      },
      activityCategory: categorizeActivity(userActivity)
    };
  }
}

/**
 * Generates a visual indicator symbol based on severity level.
 * @param {string} severity - The severity level (low, medium, high).
 * @return {string} A visual indicator symbol.
 */
function getSeverityIndicator(severity) {
  switch(severity) {
    case 'high':
      return '🔴'; // Red circle for high severity
    case 'medium':
      return '🟠'; // Orange circle for medium severity
    case 'low':
      return '🟢'; // Green circle for low severity
    default:
      return '⚪'; // White circle for unknown severity
  }
}

/**
 * Formats a recommendation into a user-friendly display format.
 * @param {Object} recommendation - The recommendation object.
 * @return {string} Formatted recommendation text.
 */
function formatRecommendationDisplay(recommendation) {
  const { summary, formattedRecommendations, severity, activityCategory } = recommendation;
  
  // Start with the summary
  let displayText = `## ${getSeverityIndicator(severity.overall)} ${summary}\n\n`;
  
  // Add activity category
  displayText += `**Activity Category:** ${getCategoryDisplayName(activityCategory)}\n\n`;
  
  // Add each recommendation category
  const categoryDisplayOrder = [
    'activity', 'safety', 'protection', 'airQuality', 'health', 
    'hydration', 'sunProtection', 'timing', 'clothing', 
    'equipmentPrep', 'locationSpecific', 'weatherSpecific', 
    'sensitivePeople', 'general'
  ];
  
  const categoryTitles = {
    activity: '🏃 Activity Safety',
    safety: '⚠️ Safety Alerts',
    protection: '😷 Respiratory Protection',
    airQuality: '💨 Air Quality',
    health: '🧡 Health Precautions',
    hydration: '💧 Hydration',
    sunProtection: '☀️ Sun Protection',
    timing: '⏰ Timing Recommendations',
    clothing: '👕 Clothing & Gear',
    equipmentPrep: '🎒 Equipment & Preparation',
    locationSpecific: '📍 Location Considerations',
    weatherSpecific: '🌦️ Weather Specific Advice',
    sensitivePeople: '👪 For Sensitive Individuals',
    general: '📋 General Recommendations'
  };
  
  categoryDisplayOrder.forEach(category => {
    if (formattedRecommendations[category] && formattedRecommendations[category].length > 0) {
      displayText += `### ${categoryTitles[category] || category}\n`;
      
      formattedRecommendations[category].forEach(rec => {
        displayText += `- ${rec}\n`;
      });
      
      displayText += '\n';
    }
  });
  
  return displayText;
}

/**
 * Convert the technical category name to a user-friendly display name.
 * @param {string} category - The technical category name.
 * @return {string} User-friendly display name.
 */
function getCategoryDisplayName(category) {
  const displayNames = {
    outdoorVigorous: 'Vigorous Outdoor Activity',
    outdoorModerate: 'Moderate Outdoor Activity',
    indoorActive: 'Active Indoor Activity',
    indoorStationary: 'Indoor Stationary Activity',
    sleepRest: 'Sleep & Rest',
    commuting: 'Commuting & Transportation',
    childrenOutdoor: 'Children\'s Outdoor Activities',
    seniorActivities: 'Senior Activities',
    construction: 'Construction & Outdoor Work',
    waterActivities: 'Water Activities',
    winterActivities: 'Winter Activities',
    petActivities: 'Pet Activities'
  };
  
  return displayNames[category] || 'General Activity';
}

module.exports = {
  getRecommendations,
  categorizeActivity,
  formatRecommendations,
  formatRecommendationDisplay,
  getCategoryDisplayName,
  getSeverityIndicator
};