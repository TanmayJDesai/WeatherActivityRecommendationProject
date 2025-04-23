// src/api/respiratory.js
const express = require('express');
const router = express.Router();
const { respiratoryConditions, severityLevels } = require('../utils/respiratoryIssues');

// API endpoint to get respiratory conditions
router.get('/respiratory-data', (req, res) => {
  try {
    res.json({
      respiratoryConditions,
      severityLevels
    });
  } catch (error) {
    console.error('Error serving respiratory data:', error);
    res.status(500).json({ error: 'Failed to retrieve respiratory data' });
  }
});

module.exports = router;