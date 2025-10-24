const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));
app.use(express.static('src'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle all other routes for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 TYPHOON FINCON IS LIVE! 🚀');
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`🌍 Network: http://0.0.0.0:${PORT}`);
  console.log('📱 Your website is now accessible!');
  console.log('🔗 Share this URL with anyone to access your live website!');
});
