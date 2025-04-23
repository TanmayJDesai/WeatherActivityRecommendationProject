document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const form = document.getElementById('safety-form');
    const resultsSection = document.getElementById('results');
    const weatherDataSection = document.getElementById('weather-data');
    const recommendationsSection = document.getElementById('recommendations');
    const loadingIndicator = document.getElementById('loading');
    const activityIcons = document.querySelectorAll('.activity-icon');
    const activityInput = document.getElementById('activity');
    const useCurrentLocationBtn = document.getElementById('use-current-location');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const recentSearchesList = document.getElementById('recent-searches-list');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const aboutLink = document.getElementById('about-link');
    const faqLink = document.getElementById('faq-link');
    const contactLink = document.getElementById('contact-link');

    // Initialize search history
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Current search data for saving
    let currentWeatherData = null;
    let currentRecommendations = null;
    
    // Initialize theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Update search history display
    function updateSearchHistory() {
        // Update recent searches
        recentSearchesList.innerHTML = '';
        
        // Display up to 3 most recent searches
        const recentSearches = searchHistory.slice(0, 3);
        
        if (recentSearches.length === 0) {
            recentSearchesList.innerHTML = '<p>No recent searches</p>';
        } else {
            recentSearches.forEach((search, index) => {
                const searchItem = document.createElement('div');
                searchItem.classList.add('recent-search-item');
                searchItem.innerHTML = `
                    <span>${search.location} - ${search.activity}</span>
                    <button class="use-search-btn" data-index="${index}">Use</button>
                `;
                recentSearchesList.appendChild(searchItem);
            });
        }
        
        // Update history tab
        historyList.innerHTML = '';
        
        if (searchHistory.length === 0) {
            historyList.innerHTML = '<p>No search history found</p>';
        } else {
            searchHistory.forEach((search, index) => {
                const historyItem = document.createElement('div');
                historyItem.classList.add('history-item');
                historyItem.innerHTML = `
                    <div>
                        <strong>${search.location}</strong> - ${search.activity}
                        <br>
                        <small>${new Date(search.timestamp).toLocaleString()}</small>
                    </div>
                    <div>
                        <button class="use-history-btn" data-index="${index}">Use</button>
                        <button class="delete-history-btn" data-index="${index}">Delete</button>
                    </div>
                `;
                historyList.appendChild(historyItem);
            });
        }
    }

    // Save search to history
    function saveSearch(location, activity, weatherData, recommendations, respiratoryConditions = []) {
        const search = {
            location,
            activity,
            weatherData,
            recommendations,
            respiratoryConditions,
            timestamp: new Date().getTime()
        };
        
        // Add to beginning of array
        searchHistory.unshift(search);
        
        // Limit history to 20 items
        if (searchHistory.length > 20) {
            searchHistory.pop();
        }
        
        // Save to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        
        // Update display
        updateSearchHistory();
    }

    // Load search from history
    function loadSearch(index) {
        const search = searchHistory[index];
        
        if (search) {
            // Populate form fields
            document.getElementById('location').value = search.location;
            document.getElementById('activity').value = search.activity;
            
            // Handle respiratory conditions if present
            if (search.respiratoryConditions && search.respiratoryConditions.length > 0) {
                // Create or update the hidden input
                let input = document.getElementById('respiratory-conditions-input');
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    input.id = 'respiratory-conditions-input';
                    input.name = 'respiratoryConditions';
                    document.getElementById('safety-form').appendChild(input);
                }
                input.value = JSON.stringify(search.respiratoryConditions);
                
                // Show the respiratory options if they're hidden
                const respiratoryOptions = document.getElementById('respiratory-options');
                if (respiratoryOptions.classList.contains('hidden')) {
                    document.getElementById('toggle-respiratory').click();
                }
                
                // This will need to update the UI to show selected conditions
                // We'd need to implement a function to load saved conditions in the respiratoryHandler.js
            }
            
            // Display saved data
            displayWeatherData(search.weatherData);
            displayRecommendations(search.recommendations);
            
            // If user had respiratory conditions, highlight this in the UI
            if (search.respiratoryConditions && search.respiratoryConditions.length > 0) {
                highlightRespiratoryConsiderations(search.respiratoryConditions);
            }
            
            // Show results
            resultsSection.style.display = 'block';
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Delete search from history
    function deleteSearch(index) {
        searchHistory.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateSearchHistory();
    }

        // Event listener for form submission
        // Update these parts in your form submit event listener
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading indicator
            loadingIndicator.style.display = 'block';
            resultsSection.style.display = 'none';
            
            // Get form values
            const location = document.getElementById('location').value;
            const activity = document.getElementById('activity').value;
            
            // Get respiratory conditions if present
            let respiratoryConditions = [];
            const respiratoryInput = document.getElementById('respiratory-conditions-input');
            if (respiratoryInput && respiratoryInput.value) {
                try {
                    respiratoryConditions = JSON.parse(respiratoryInput.value);
                } catch (error) {
                    console.error('Error parsing respiratory conditions:', error);
                }
            }
            
            try {
                // Step 1: Get weather data
                const weatherResponse = await fetch(`/api/weather/${encodeURIComponent(location)}`);
                if (!weatherResponse.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData = await weatherResponse.json();
                
                // Step 2: Get recommendations using weather data, activity, and respiratory conditions
                const recommendationsResponse = await fetch('/api/recommendations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        weatherData, 
                        userActivity: activity,
                        respiratoryConditions // Include respiratory conditions
                    })
                });
                
                if (!recommendationsResponse.ok) {
                    throw new Error('Failed to fetch recommendations');
                }
                
                const recommendationsData = await recommendationsResponse.json();
                
                // Save current data
                currentWeatherData = weatherData;
                
                // Extract formatted recommendations from the response
                if (recommendationsData.formattedRecommendations) {
                    currentRecommendations = recommendationsData.formattedRecommendations;
                } else if (recommendationsData.recommendationText) {
                    currentRecommendations = recommendationsData.recommendationText;
                }
                
                // Display results
                displayWeatherData(weatherData);
                
                // Use the overall severity if available, otherwise default to 'low'
                const overallSeverity = recommendationsData.severity && recommendationsData.severity.overall 
                    ? recommendationsData.severity.overall 
                    : 'low';
                    
                displayRecommendations(currentRecommendations, overallSeverity);
                
                // If user has respiratory conditions, highlight this in the UI
                if (respiratoryConditions && respiratoryConditions.length > 0) {
                    highlightRespiratoryConsiderations(respiratoryConditions);
                }
                
                // Show results and hide loading
                resultsSection.style.display = 'block';
                loadingIndicator.style.display = 'none';
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Save to history
                saveSearch(location, activity, weatherData, currentRecommendations, respiratoryConditions);
                
            } catch (error) {
                console.error('Error:', error);
                loadingIndicator.style.display = 'none';
                showNotification('An error occurred: ' + error.message, 'error');
            }
        });
    
        // Enhanced function to display weather data with visual indicators
    function displayWeatherData(data) {
        // AQI index color and interpretation
        let aqiColor = '#777';
        let aqiText = 'Not available';
        let aqiWidth = '0%';
        
        if (data.air_quality && data.air_quality.us_epa_index) {
            const aqiValue = data.air_quality.us_epa_index;
            if (aqiValue === 1) { aqiColor = '#00e400'; aqiText = 'Good'; aqiWidth = '16.7%'; }
            else if (aqiValue === 2) { aqiColor = '#ffff00'; aqiText = 'Moderate'; aqiWidth = '33.3%'; }
            else if (aqiValue === 3) { aqiColor = '#ff7e00'; aqiText = 'Unhealthy for Sensitive Groups'; aqiWidth = '50%'; }
            else if (aqiValue === 4) { aqiColor = '#ff0000'; aqiText = 'Unhealthy'; aqiWidth = '66.7%'; }
            else if (aqiValue === 5) { aqiColor = '#99004c'; aqiText = 'Very Unhealthy'; aqiWidth = '83.3%'; }
            else if (aqiValue === 6) { aqiColor = '#7e0023'; aqiText = 'Hazardous'; aqiWidth = '100%'; }
        }
        
        // UV index color and interpretation
        let uvColor = '#777';
        let uvText = 'Not available';
        let uvWidth = '0%';
        
        if (data.uv !== undefined) {
            const uvValue = data.uv;
            if (uvValue >= 0 && uvValue <= 2) { uvColor = '#299501'; uvText = 'Low'; uvWidth = '20%'; }
            else if (uvValue >= 3 && uvValue <= 5) { uvColor = '#f7e401'; uvText = 'Moderate'; uvWidth = '40%'; }
            else if (uvValue >= 6 && uvValue <= 7) { uvColor = '#f95901'; uvText = 'High'; uvWidth = '60%'; }
            else if (uvValue >= 8 && uvValue <= 10) { uvColor = '#d90011'; uvText = 'Very High'; uvWidth = '80%'; }
            else if (uvValue >= 11) { uvColor = '#6c49cb'; uvText = 'Extreme'; uvWidth = '100%'; }
        }
        
        // Build weather data HTML
        let weatherHTML = `
            <h2><i class="fas fa-cloud-sun"></i> Current Conditions for ${data.location.name}</h2>
            
            <div class="weather-icon">
                <i class="${getWeatherIcon(data.condition.code)}"></i>
            </div>
            
            <div class="data-item">
                <span>Condition:</span>
                <span>${data.condition.text}</span>
            </div>
            
            <div class="data-item">
                <span>Temperature:</span>
                <span>${data.temp_f}°F / ${data.temp_c}°C</span>
            </div>
            
            <div class="data-item">
                <span>Feels Like:</span>
                <span>${data.feelslike_f}°F / ${data.feelslike_c}°C</span>
            </div>
            
            <div class="data-item">
                <span>Humidity:</span>
                <span>${data.humidity}%</span>
            </div>
            
            <div class="data-item">
                <span>Wind:</span>
                <span>${data.wind_mph} mph / ${data.wind_kph} kph (${data.wind_dir})</span>
            </div>
            
            <div class="data-item">
                <span>UV Index:</span>
                <span>${data.uv !== undefined ? data.uv : 'N/A'} 
                    <span class="indicator" style="background-color: ${uvColor}; color: white;">${uvText}</span>
                </span>
                <div class="meter-container">
                    <div class="meter-value" style="width: ${uvWidth}; background-color: ${uvColor};"></div>
                </div>
                <div class="meter-labels">
                    <span>0</span>
                    <span>3</span>
                    <span>6</span>
                    <span>8</span>
                    <span>11+</span>
                </div>
            </div>
            
            <div class="data-item">
                <span>Air Quality (US EPA):</span>
                <span>${data.air_quality && data.air_quality.us_epa_index ? data.air_quality.us_epa_index : 'N/A'}
                    <span class="indicator" style="background-color: ${aqiColor}; color: ${aqiColor === '#ffff00' ? 'black' : 'white'};">${aqiText}</span>
                </span>
                <div class="meter-container">
                    <div class="meter-value" style="width: ${aqiWidth}; background-color: ${aqiColor};"></div>
                </div>
                <div class="meter-labels">
                    <span>Good</span>
                    <span>Mod</span>
                    <span>USG</span>
                    <span>Unhealthy</span>
                    <span>V. Unhealthy</span>
                    <span>Hazardous</span>
                </div>
            </div>`;
            
        // Add air quality details if available
        if (data.air_quality) {
            weatherHTML += `
                <div class="air-quality-details">
                    <h3>Air Quality Details</h3>
                    <div class="data-item">
                        <span>PM2.5:</span>
                        <span>${data.air_quality.pm2_5 ? data.air_quality.pm2_5.toFixed(1) : 'N/A'} μg/m³</span>
                    </div>
                    <div class="data-item">
                        <span>PM10:</span>
                        <span>${data.air_quality.pm10 ? data.air_quality.pm10.toFixed(1) : 'N/A'} μg/m³</span>
                    </div>
                    <div class="data-item">
                        <span>Ozone (O₃):</span>
                        <span>${data.air_quality.o3 ? data.air_quality.o3.toFixed(1) : 'N/A'} μg/m³</span>
                    </div>
                    <div class="data-item">
                        <span>Nitrogen Dioxide (NO₂):</span>
                        <span>${data.air_quality.no2 ? data.air_quality.no2.toFixed(1) : 'N/A'} μg/m³</span>
                    </div>
                </div>
            `;
        }
        
        weatherDataSection.innerHTML = weatherHTML;
    }
    
    // Display recommendations based on weather data
    function displayRecommendations(recommendations, severity = 'low') {
        // Set recommendation color based on severity
        let severityClass = 'severity-low';
        let severityText = 'Low Risk';
        
        if (severity === 'medium') {
            severityClass = 'severity-medium';
            severityText = 'Medium Risk';
        } else if (severity === 'high') {
            severityClass = 'severity-high';
            severityText = 'High Risk';
        }
        
        // Generate HTML for recommendations
        let recommendationsHTML = `
            <h2>
                <i class="fas fa-clipboard-list"></i> 
                Recommendations 
                <span class="severity-indicator ${severityClass}" title="${severityText}"></span>
            </h2>
            <p class="recommendation-status">
                <strong>Current Risk Level:</strong> 
                <span class="status-${severity === 'low' ? 'safe' : (severity === 'medium' ? 'warning' : 'danger')}">${severityText}</span>
            </p>
        `;
        
        // Add each recommendation section
        if (recommendations) {
            // Check if recommendations is in the old string format
            if (typeof recommendations === 'string') {
                recommendationsHTML += `
                    <div class="recommendation-section" data-category="general">
                        <h3><i class="fas fa-info-circle"></i> General Recommendations</h3>
                        <div class="recommendation-content">
                            <p>${recommendations}</p>
                        </div>
                    </div>
                `;
            } 
            // Check if it's in the expected object format from formattedRecommendations
            else if (typeof recommendations === 'object') {
                Object.keys(recommendations).forEach(category => {
                    // Handle both array and string formats
                    let recContent = '';
                    
                    if (Array.isArray(recommendations[category])) {
                        recContent = `
                            <ul>
                                ${recommendations[category].map(rec => `<li>${rec}</li>`).join('')}
                            </ul>
                        `;
                    } else if (typeof recommendations[category] === 'string') {
                        recContent = `<p>${recommendations[category]}</p>`;
                    }
                    
                    recommendationsHTML += `
                        <div class="recommendation-section" data-category="${category}">
                            <h3>${categoryIconMap(category)} ${formatCategoryName(category)}</h3>
                            <div class="recommendation-content">
                                ${recContent}
                            </div>
                        </div>
                    `;
                });
            }
        } else {
            recommendationsHTML += '<p>No specific recommendations available.</p>';
        }
        
        recommendationsSection.innerHTML = recommendationsHTML;
        
        // Add event listeners for recommendation sections
        document.querySelectorAll('.recommendation-section').forEach(section => {
            section.addEventListener('click', () => {
                section.classList.toggle('expanded');
            });
        });
    }

    // Helper function to get weather icon class based on condition code
    function getWeatherIcon(code) {
        // Map condition codes to Font Awesome icons
        // This is a simplified mapping - expand as needed
        if (code >= 1000 && code < 1003) return 'fas fa-sun'; // Sunny, mostly sunny
        if (code >= 1003 && code < 1006) return 'fas fa-cloud-sun'; // Partly cloudy
        if (code >= 1006 && code < 1010) return 'fas fa-cloud'; // Cloudy
        if (code >= 1030 && code < 1040) return 'fas fa-smog'; // Mist, fog
        if (code >= 1063 && code < 1070) return 'fas fa-cloud-rain'; // Light rain
        if (code >= 1150 && code < 1170) return 'fas fa-cloud-showers-heavy'; // Heavy rain
        if (code >= 1180 && code < 1200) return 'fas fa-cloud-rain'; // Showers
        if (code >= 1210 && code < 1230) return 'fas fa-snowflake'; // Snow
        if (code >= 1230 && code < 1260) return 'fas fa-snowman'; // Heavy snow
        if (code >= 1273 && code < 1280) return 'fas fa-bolt'; // Thunderstorm
        return 'fas fa-cloud'; // Default
    }
    
    // Helper function to add icons to recommendation categories
    function categoryIconMap(category) {
        const iconMap = {
            'general': '<i class="fas fa-info-circle"></i>',
            'outdoor': '<i class="fas fa-tree"></i>',
            'health': '<i class="fas fa-heartbeat"></i>',
            'protection': '<i class="fas fa-shield-alt"></i>',
            'activity': '<i class="fas fa-running"></i>',
            'clothing': '<i class="fas fa-tshirt"></i>',
            'hydration': '<i class="fas fa-glass-water"></i>',
            'timing': '<i class="fas fa-clock"></i>',
            'equipment': '<i class="fas fa-toolbox"></i>',
            'precautions': '<i class="fas fa-exclamation-triangle"></i>'
        };
        
        return iconMap[category] || '<i class="fas fa-info-circle"></i>';
    }
    
    // Helper function to format category names
    function formatCategoryName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1) + ' Recommendations';
    }
    
    // Function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set notification type and message
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
    
    // Event listeners for activity icons
    activityIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Remove selected class from all icons
            activityIcons.forEach(i => i.classList.remove('selected'));
            
            // Add selected class to clicked icon
            icon.classList.add('selected');
            
            // Update activity input value
            activityInput.value = icon.dataset.activity;
        });
    });
    
    // Event listener for using current location
    useCurrentLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            // Show loading state
            useCurrentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
            useCurrentLocationBtn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Get location name from coordinates
                        const response = await fetch(`/api/reverse-geocode?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                        if (!response.ok) throw new Error('Geocoding failed');
                        
                        const data = await response.json();
                        document.getElementById('location').value = data.locationName || `${position.coords.latitude}, ${position.coords.longitude}`;
                        
                        // Restore button state
                        useCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Use My Location';
                        useCurrentLocationBtn.disabled = false;
                        
                    } catch (error) {
                        console.error('Error getting location name:', error);
                        document.getElementById('location').value = `${position.coords.latitude}, ${position.coords.longitude}`;
                        useCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Use My Location';
                        useCurrentLocationBtn.disabled = false;
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    showNotification('Unable to get your location. Please check your browser settings.', 'error');
                    useCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Use My Location';
                    useCurrentLocationBtn.disabled = false;
                }
            );
        } else {
            showNotification('Geolocation is not supported by your browser.', 'error');
        }
    });
    
    // Event listener for theme toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Event listeners for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
            
            // Special handling for history tab
            if (tab.dataset.tab === 'history') {
                document.getElementById('history-container').style.display = 'block';
            }
        });
    });
    
    // Event listener for clear history button
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all search history?')) {
            searchHistory = [];
            localStorage.removeItem('searchHistory');
            updateSearchHistory();
            showNotification('Search history cleared successfully', 'info');
        }
    });
    
    // Event delegation for history buttons
    document.addEventListener('click', (e) => {
        // Handle "Use" buttons in recent searches
        if (e.target.classList.contains('use-search-btn')) {
            const index = e.target.dataset.index;
            loadSearch(index);
        }
        
        // Handle "Use" buttons in history tab
        if (e.target.classList.contains('use-history-btn')) {
            const index = e.target.dataset.index;
            loadSearch(index);
        }
        
        // Handle "Delete" buttons in history tab
        if (e.target.classList.contains('delete-history-btn')) {
            const index = e.target.dataset.index;
            deleteSearch(index);
        }
    });
    
    // Modal event listeners
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Footer links event listeners
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        modalContent.innerHTML = `
            <h2>About UCLA Environmental Safety Advisor</h2>
            <p>The UCLA Environmental Safety Advisor is a tool designed to help students, faculty, and visitors make informed decisions about outdoor activities based on current environmental conditions.</p>
            <p>Our application pulls real-time data from weather and air quality monitoring stations to provide personalized recommendations for your planned activities.</p>
        `;
        modal.style.display = 'block';
    });
    
    faqLink.addEventListener('click', (e) => {
        e.preventDefault();
        modalContent.innerHTML = `
            <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
                <h3>How accurate is the weather data?</h3>
                <p>Our data comes from reliable weather services and local monitoring stations. While we strive for accuracy, environmental conditions can change rapidly, so always use your judgment.</p>
            </div>
            <div class="faq-item">
                <h3>What does the AQI mean?</h3>
                <p>The Air Quality Index (AQI) is a standardized indicator for reporting air quality. It tells you how clean or polluted your air is and what associated health concerns you should be aware of.</p>
            </div>
            <div class="faq-item">
                <h3>How often is the data updated?</h3>
                <p>Our weather and air quality data is refreshed every time you make a search. The data represents the most current information available from our sources.</p>
            </div>
            <div class="faq-item">
                <h3>Can I use this app outside of Los Angeles?</h3>
                <p>Yes! While developed at UCLA, our app works for locations worldwide where weather data is available.</p>
            </div>
        `;
        modal.style.display = 'block';
    });
    
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        modalContent.innerHTML = `
            <h2>Contact Us</h2>
            <p>For questions, suggestions, or technical support, please reach out to us:</p>
            <ul>
                <li>Email: desai.j.tanmay@gmail.com</li>
                <li>Phone: (805)871-6211</li>
                <li>Names: Tanmay Desai, Suraj Kulkarni, Joshua Lee</li>
            </ul>
            <p>We welcome your feedback to improve this tool!</p>
        `;
        modal.style.display = 'block';
    });
    
    // Initial update of search history
    updateSearchHistory();
});

function highlightRespiratoryConsiderations(conditions) {
    // Add a notification at the top of recommendations
    const recSection = document.querySelector('.recommendations');
    if (recSection) {
        const noticeDiv = document.createElement('div');
        noticeDiv.className = 'respiratory-notice';
        
        const conditionNames = conditions.map(c => `${c.conditionName} (${c.severityName})`).join(', ');
        
        noticeDiv.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-lungs"></i>
                <strong>Respiratory Considerations:</strong> Recommendations have been adjusted based on your ${conditionNames}.
            </div>
        `;
        
        // Insert at the top of recommendations, after the h2
        recSection.insertBefore(noticeDiv, recSection.querySelector('h2').nextSibling);
        
        // Highlight respiratory-specific recommendations if they exist
        const respiratorySection = document.querySelector('.recommendation-section[data-category="respiratory"]');
        if (respiratorySection) {
            respiratorySection.classList.add('highlight-section');
            respiratorySection.classList.add('expanded'); // Auto-expand this section
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the clear form button
    const clearFormBtn = document.getElementById('clear-form');
    
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', () => {
            // Clear the form inputs
            clearForm();
        });
    }
    
    // Function to clear the form
    function clearForm() {
        // Clear location and activity inputs
        document.getElementById('location').value = '';
        document.getElementById('activity').value = '';
        
        // Remove "selected" class from activity icons
        document.querySelectorAll('.activity-icon').forEach(icon => {
            icon.classList.remove('selected');
        });
        
        // Reset respiratory section if it exists
        const respiratoryOptions = document.getElementById('respiratory-options');
        const toggleRespiratoryBtn = document.getElementById('toggle-respiratory');
        
        if (respiratoryOptions && !respiratoryOptions.classList.contains('hidden')) {
            respiratoryOptions.classList.add('hidden');
            
            if (toggleRespiratoryBtn) {
                toggleRespiratoryBtn.innerHTML = '<i class="fas fa-plus-circle"></i> I have respiratory conditions';
            }
            
            // Clear any selected conditions
            const selectedConditionsContainer = document.getElementById('selected-conditions');
            if (selectedConditionsContainer) {
                selectedConditionsContainer.innerHTML = '';
            }
            
            // Reset condition items
            document.querySelectorAll('.condition-item').forEach(item => {
                item.classList.remove('selected');
                item.style.display = 'flex';
            });
            
            // Remove the hidden input if it exists
            const respiratoryInput = document.getElementById('respiratory-conditions-input');
            if (respiratoryInput) {
                respiratoryInput.remove();
            }
        }
        
        // Hide results section if visible
        const resultsSection = document.getElementById('results');
        if (resultsSection && resultsSection.style.display !== 'none') {
            resultsSection.style.display = 'none';
        }
        
        // Show success notification
        showNotification('Form has been cleared', 'info');
        
        // Focus on the location input for a better user experience
        document.getElementById('location').focus();
    }
});