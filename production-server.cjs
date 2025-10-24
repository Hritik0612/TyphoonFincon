const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Serve the main HTML file for all routes (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 TYPHOON FINCON PRODUCTION SERVER 🚀');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Network accessible: http://0.0.0.0:${PORT}`);
  console.log('📱 Ready for domain: typhoonfincon.com');
  console.log('✅ Production server is LIVE!');
});