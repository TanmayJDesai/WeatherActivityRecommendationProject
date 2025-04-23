// public/js/respiratoryHandler.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const toggleRespiratoryBtn = document.getElementById('toggle-respiratory');
    const respiratoryOptions = document.getElementById('respiratory-options');
    const conditionsContainer = document.querySelector('.conditions-container');
    const selectedConditionsContainer = document.getElementById('selected-conditions');
    const addConditionBtn = document.getElementById('add-condition');
    
    // Keep track of selected conditions
    let selectedConditions = [];
    let respiratoryConditions = [];
    let severityLevels = [];
    
    // Fetch respiratory conditions data
    async function fetchRespiratoryData() {
        try {
            const response = await fetch('/api/respiratory-data');
            if (!response.ok) {
                throw new Error('Failed to fetch respiratory data');
            }
            const data = await response.json();
            respiratoryConditions = data.respiratoryConditions;
            severityLevels = data.severityLevels;
            
            // Initialize condition selection UI
            initializeConditionsUI();
        } catch (error) {
            console.error('Error fetching respiratory data:', error);
            // Fallback to default conditions
            useFallbackData();
        }
    }
    
    // Fallback data if API fails
    function useFallbackData() {
        respiratoryConditions = [
            { id: 'asthma', name: 'Asthma', description: 'Chronic condition affecting the airways' },
            { id: 'copd', name: 'COPD', description: 'Chronic obstructive pulmonary disease' },
            { id: 'allergies', name: 'Allergies', description: 'Seasonal or perennial allergic rhinitis' },
            { id: 'bronchitis', name: 'Bronchitis', description: 'Inflammation of the bronchial tubes' },
            { id: 'other', name: 'Other Respiratory Condition', description: 'Other condition affecting breathing' }
        ];
        
        severityLevels = [
            { id: 'mild', name: 'Mild', description: 'Occasional symptoms' },
            { id: 'moderate', name: 'Moderate', description: 'Regular symptoms' },
            { id: 'severe', name: 'Severe', description: 'Frequent severe symptoms' }
        ];
        
        // Initialize condition selection UI
        initializeConditionsUI();
    }
    
    // Initialize the conditions UI
    function initializeConditionsUI() {
        // Clear the container
        conditionsContainer.innerHTML = '';
        
        // Add condition options
        respiratoryConditions.forEach(condition => {
            const conditionElement = document.createElement('div');
            conditionElement.className = 'condition-item';
            conditionElement.dataset.id = condition.id;
            conditionElement.innerHTML = `
                <i class="fas fa-lungs"></i>
                <span>${condition.name}</span>
            `;
            
            conditionElement.addEventListener('click', () => selectCondition(condition));
            conditionsContainer.appendChild(conditionElement);
        });
    }
    
    // Handle condition selection
    function selectCondition(condition) {
        // Check if condition is already selected
        if (selectedConditions.some(c => c.conditionId === condition.id)) {
            return;
        }
        
        // Add to selected conditions
        const newCondition = {
            conditionId: condition.id,
            conditionName: condition.name,
            severityId: 'moderate', // Default to moderate
            severityName: 'Moderate' // Default name
        };
        
        selectedConditions.push(newCondition);
        
        // Update the UI
        updateSelectedConditionsUI();
        
        // Hide the condition from the selection list
        const conditionElement = document.querySelector(`.condition-item[data-id="${condition.id}"]`);
        if (conditionElement) {
            conditionElement.classList.add('selected');
            conditionElement.style.display = 'none';
        }
    }
    
    // Update the selected conditions UI
    function updateSelectedConditionsUI() {
        selectedConditionsContainer.innerHTML = '';
        
        if (selectedConditions.length === 0) {
            selectedConditionsContainer.innerHTML = '<p>No respiratory conditions selected.</p>';
            return;
        }
        
        selectedConditions.forEach((condition, index) => {
            const conditionElement = document.createElement('div');
            conditionElement.className = 'selected-condition';
            conditionElement.innerHTML = `
                <div class="condition-details">
                    <div class="condition-name">${condition.conditionName}</div>
                    <div class="severity-options">
                        ${severityLevels.map(severity => `
                            <button type="button" class="severity-btn ${condition.severityId === severity.id ? 'selected' : ''}" 
                                data-condition-index="${index}" 
                                data-severity-id="${severity.id}" 
                                data-severity-name="${severity.name}">
                                ${severity.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button type="button" class="remove-condition" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            selectedConditionsContainer.appendChild(conditionElement);
        });
        
        // Add event listeners for severity buttons
        document.querySelectorAll('.severity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const conditionIndex = parseInt(e.target.dataset.conditionIndex);
                const severityId = e.target.dataset.severityId;
                const severityName = e.target.dataset.severityName;
                
                // Update the condition severity
                selectedConditions[conditionIndex].severityId = severityId;
                selectedConditions[conditionIndex].severityName = severityName;
                
                // Update UI
                updateSeverityButtons(conditionIndex, severityId);
            });
        });
        
        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-condition').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.remove-condition').dataset.index);
                removeCondition(index);
            });
        });
    }
    
    // Update severity buttons UI
    function updateSeverityButtons(conditionIndex, selectedSeverityId) {
        const severityButtons = document.querySelectorAll(`.severity-btn[data-condition-index="${conditionIndex}"]`);
        
        severityButtons.forEach(btn => {
            if (btn.dataset.severityId === selectedSeverityId) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }
    
    // Remove a condition
    function removeCondition(index) {
        const conditionId = selectedConditions[index].conditionId;
        selectedConditions.splice(index, 1);
        
        // Show the condition in the selection list again
        const conditionElement = document.querySelector(`.condition-item[data-id="${conditionId}"]`);
        if (conditionElement) {
            conditionElement.classList.remove('selected');
            conditionElement.style.display = 'flex';
        }
        
        updateSelectedConditionsUI();
    }
    
    // Event listener for toggle button
    toggleRespiratoryBtn.addEventListener('click', () => {
        respiratoryOptions.classList.toggle('hidden');
        
        if (!respiratoryOptions.classList.contains('hidden')) {
            toggleRespiratoryBtn.innerHTML = '<i class="fas fa-minus-circle"></i> Hide respiratory conditions';
            
            // Fetch data if not already done
            if (respiratoryConditions.length === 0) {
                fetchRespiratoryData();
            }
        } else {
            toggleRespiratoryBtn.innerHTML = '<i class="fas fa-plus-circle"></i> I have respiratory conditions';
        }
    });
    
    // Event listener for add condition button
    addConditionBtn.addEventListener('click', () => {
        // Show all conditions that aren't already selected
        document.querySelectorAll('.condition-item').forEach(item => {
            if (!selectedConditions.some(c => c.conditionId === item.dataset.id)) {
                item.style.display = 'flex';
            }
        });
    });
    
    // Add event listener to the form to include respiratory data
    const safetyForm = document.getElementById('safety-form');
    
    safetyForm.addEventListener('submit', async (e) => {
        // Don't prevent default here, as your main form handler will do that
        
        // Add respiratory conditions as hidden input for form submission
        if (selectedConditions.length > 0) {
            let input = document.getElementById('respiratory-conditions-input');
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.id = 'respiratory-conditions-input';
                input.name = 'respiratoryConditions';
                safetyForm.appendChild(input);
            }
            input.value = JSON.stringify(selectedConditions);
        }
    });
});