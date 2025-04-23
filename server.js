// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const weatherAPI = require('./src/api/weather');
const recommendationsAPI = require('./src/api/recommendations');
const respiratoryAPI = require('./src/api/respiratory'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/weather', weatherAPI);
app.use('/api/recommendations', recommendationsAPI);
app.use('/api', respiratoryAPI); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌤️ Server running on http://localhost:${PORT}`);
});