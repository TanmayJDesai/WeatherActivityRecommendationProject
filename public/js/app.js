document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('safety-form');
    const resultsSection = document.getElementById('results');
    const weatherDataSection = document.getElementById('weather-data');
    const recommendationsSection = document.getElementById('recommendations');
    const loadingIndicator = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        resultsSection.style.display = 'none';
        
        // Get form values
        const location = document.getElementById('location').value;
        const activity = document.getElementById('activity').value;
        
        try {
            // Step 1: Get weather data
            const weatherResponse = await fetch(`/api/weather/${encodeURIComponent(location)}`);
            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const weatherData = await weatherResponse.json();
            
            // Step 2: Get recommendations using weather data and activity
            const recommendationsResponse = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ weatherData, userActivity: activity })
            });
            
            if (!recommendationsResponse.ok) {
                throw new Error('Failed to fetch recommendations');
            }
            
            const recommendationsData = await recommendationsResponse.json();
            
            // Display results
            displayWeatherData(weatherData);
            displayRecommendations(recommendationsData.recommendations);
            
            // Show results and hide loading
            resultsSection.style.display = 'block';
            loadingIndicator.style.display = 'none';
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            loadingIndicator.style.display = 'none';
            alert('An error occurred: ' + error.message);
        }
    });

    // Enhanced function to display weather data
    function displayWeatherData(data) {
        // AQI index color and interpretation
        let aqiColor = '#777';
        let aqiText = 'Not available';
        
        if (data.air_quality.us_epa_index) {
            const aqiValue = data.air_quality.us_epa_index;
            if (aqiValue === 1) { aqiColor = '#00e400'; aqiText = 'Good'; }
            else if (aqiValue === 2) { aqiColor = '#ffff00'; aqiText = 'Moderate'; }
            else if (aqiValue === 3) { aqiColor = '#ff7e00'; aqiText = 'Unhealthy for Sensitive Groups'; }
            else if (aqiValue === 4) { aqiColor = '#ff0000'; aqiText = 'Unhealthy'; }
            else if (aqiValue === 5) { aqiColor = '#99004c'; aqiText = 'Very Unhealthy'; }
            else if (aqiValue === 6) { aqiColor = '#7e0023'; aqiText = 'Hazardous'; }
        }
        
        // UV index color and interpretation
        let uvColor = '#777';
        let uvText = 'Not available';
        
        if (data.current.uv !== undefined) {
            const uvValue = data.current.uv;
            if (uvValue >= 0 && uvValue <= 2) { uvColor = '#299501'; uvText = 'Low'; }
            else if (uvValue >= 3 && uvValue <= 5) { uvColor = '#f7e401'; uvText = 'Moderate'; }
            else if (uvValue >= 6 && uvValue <= 7) { uvColor = '#f95901'; uvText = 'High'; }
            else if (uvValue >= 8 && uvValue <= 10) { uvColor = '#d8001d'; uvText = 'Very High'; }
            else if (uvValue >= 11) { uvColor = '#6b49c8'; uvText = 'Extreme'; }
        }
        
        weatherDataSection.innerHTML = `
            <h2>Current Environmental Conditions</h2>
            <div class="data-item"><span>Location:</span> ${data.location.name}, ${data.location.region}, ${data.location.country}</div>
            <div class="data-item"><span>Weather:</span> ${data.current.condition}</div>
            <div class="data-item"><span>Temperature:</span> ${data.current.temp_c}°C (${data.current.temp_f}°F)</div>
            <div class="data-item"><span>Feels Like:</span> ${data.current.feelslike_c}°C (${data.current.feelslike_f}°F)</div>
            <div class="data-item"><span>Humidity:</span> ${data.current.humidity}%</div>
            <div class="data-item"><span>Wind:</span> ${data.current.wind_kph} kph, ${data.current.wind_dir}</div>
            <div class="data-item"><span>Visibility:</span> ${data.current.vis_km} km</div>
            
            <div class="data-item">
                <span>UV Index:</span> ${data.current.uv} 
                <span class="indicator" style="background-color: ${uvColor}; color: white; padding: 2px 6px; border-radius: 3px; margin-left: 5px;">
                    ${uvText}
                </span>
            </div>
            
            <div class="data-item">
                <span>Air Quality Index:</span> ${data.air_quality.us_epa_index || 'N/A'} 
                <span class="indicator" style="background-color: ${aqiColor}; color: white; padding: 2px 6px; border-radius: 3px; margin-left: 5px;">
                    ${aqiText}
                </span>
            </div>
            
            <div class="air-quality-details">
                <h3>Air Quality Details</h3>
                <div class="data-item"><span>PM2.5:</span> ${data.air_quality.pm2_5 ? data.air_quality.pm2_5.toFixed(2) + ' μg/m³' : 'Not available'}</div>
                <div class="data-item"><span>PM10:</span> ${data.air_quality.pm10 ? data.air_quality.pm10.toFixed(2) + ' μg/m³' : 'Not available'}</div>
                <div class="data-item"><span>Carbon Monoxide (CO):</span> ${data.air_quality.co ? data.air_quality.co.toFixed(2) + ' μg/m³' : 'Not available'}</div>
                <div class="data-item"><span>Nitrogen Dioxide (NO2):</span> ${data.air_quality.no2 ? data.air_quality.no2.toFixed(2) + ' μg/m³' : 'Not available'}</div>
                <div class="data-item"><span>Sulfur Dioxide (SO2):</span> ${data.air_quality.so2 ? data.air_quality.so2.toFixed(2) + ' μg/m³' : 'Not available'}</div>
                <div class="data-item"><span>Ozone (O3):</span> ${data.air_quality.o3 ? data.air_quality.o3.toFixed(2) + ' μg/m³' : 'Not available'}</div>
            </div>
        `;
    }

    // Enhanced function to display recommendations
    function displayRecommendations(recommendations) {
        // Parse the recommendations into sections
        const sections = parseRecommendationSections(recommendations);
        
        recommendationsSection.innerHTML = `
            <h2>Your Personalized Safety Recommendations</h2>
            
            <div class="recommendation-section">
                <h3>Activity Safety Assessment</h3>
                <div class="recommendation-content">${sections.activitySafety || 'No specific assessment available.'}</div>
            </div>
            
            <div class="recommendation-section">
                <h3>Mask Recommendations</h3>
                <div class="recommendation-content">${sections.maskRecommendations || 'No specific mask recommendations available.'}</div>
            </div>
            
            <div class="recommendation-section">
                <h3>Health Measures</h3>
                <div class="recommendation-content">${sections.healthMeasures || 'No specific health measures available.'}</div>
            </div>
        `;
    }

    // Improved function to parse AI response into sections
    function parseRecommendationSections(text) {
        const sections = {
            activitySafety: '',
            maskRecommendations: '',
            healthMeasures: ''
        };
        
        // Extract Activity Safety Assessment
        const activityPattern = /Activity Safety Assessment:?\s*([\s\S]*?)(?=Mask Recommendations:?|$)/i;
        const activityMatch = text.match(activityPattern);
        if (activityMatch && activityMatch[1]) {
            sections.activitySafety = formatRecommendationText(activityMatch[1]);
        }
        
        // Extract Mask Recommendations
        const maskPattern = /Mask Recommendations:?\s*([\s\S]*?)(?=Health Measures:?|$)/i;
        const maskMatch = text.match(maskPattern);
        if (maskMatch && maskMatch[1]) {
            sections.maskRecommendations = formatRecommendationText(maskMatch[1]);
        }
        
        // Extract Health Measures
        const healthPattern = /Health Measures:?\s*([\s\S]*?)(?=$)/i;
        const healthMatch = text.match(healthPattern);
        if (healthMatch && healthMatch[1]) {
            sections.healthMeasures = formatRecommendationText(healthMatch[1]);
        }
        
        return sections;
    }
    
    // Helper function to format recommendation text
    function formatRecommendationText(text) {
        // Convert markdown-style lists to HTML
        let formatted = text.trim()
            .replace(/\n\s*\n/g, '<br><br>') // Convert double line breaks to HTML breaks
            .replace(/\n- /g, '<br>• ') // Convert markdown list items to HTML list items with bullets
            .replace(/\n\d+\.\s+/g, '<br>• '); // Convert numbered list items to bullet points
            
        // If we don't have any HTML breaks yet, add paragraphs
        if (!formatted.includes('<br>')) {
            formatted = formatted.replace(/\n/g, '<br>');
        }
        
        return formatted;
    }
});