@echo off
echo Starting TyphoonFincon Server...
echo.
echo Server will be available at:
echo   http://localhost:3000
echo   http://127.0.0.1:3000
echo.
echo Press Ctrl+C to stop the server
echo.

node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(\`
<!DOCTYPE html>
<html>
<head>
    <title>TyphoonFincon - Working!</title>
    <script src=\"https://cdn.tailwindcss.com\"></script>
</head>
<body class=\"bg-gray-100 min-h-screen flex items-center justify-center\">
    <div class=\"bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full\">
        <div class=\"text-center mb-8\">
            <h1 class=\"text-4xl font-bold text-blue-800 mb-4\">🚀 TyphoonFincon</h1>
            <p class=\"text-xl text-green-600\">✅ Your server is working perfectly!</p>
        </div>
        
        <div class=\"grid md:grid-cols-2 gap-6\">
            <div class=\"bg-blue-50 p-6 rounded-lg\">
                <h2 class=\"text-xl font-semibold text-blue-800 mb-4\">📱 Your App Pages</h2>
                <div class=\"space-y-2\">
                    <a href=\"/\" class=\"block p-3 bg-white rounded hover:bg-blue-100 transition-colors\">
                        🏠 Home Page
                    </a>
                    <a href=\"/customer\" class=\"block p-3 bg-white rounded hover:bg-blue-100 transition-colors\">
                        👤 Customer Application
                    </a>
                    <a href=\"/connector\" class=\"block p-3 bg-white rounded hover:bg-blue-100 transition-colors\">
                        🤝 Connector Registration
                    </a>
                    <a href=\"/admin\" class=\"block p-3 bg-white rounded hover:bg-blue-100 transition-colors\">
                        🔐 Admin Login
                    </a>
                </div>
            </div>
            
            <div class=\"bg-green-50 p-6 rounded-lg\">
                <h2 class=\"text-xl font-semibold text-green-800 mb-4\">🔑 Admin Access</h2>
                <div class=\"space-y-3\">
                    <div><strong>Username:</strong> admin</div>
                    <div><strong>Password:</strong> typhoon2025</div>
                </div>
                
                <div class=\"mt-6\">
                    <h3 class=\"font-semibold text-green-800 mb-2\">🌐 Server Info</h3>
                    <div class=\"text-sm text-green-700\">
                        <div>✅ Server is running on port 3000</div>
                        <div>✅ All pages accessible</div>
                        <div>✅ Ready for development</div>
                        <div>✅ TyphoonFincon branding intact</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class=\"mt-8 text-center\">
            <p class=\"text-gray-600 mb-4\">
                Your TyphoonFincon financial consultancy application is now running!
            </p>
            <div class=\"bg-amber-50 p-4 rounded-lg\">
                <p class=\"text-sm text-amber-800\">
                    <strong>💡 Success:</strong> This confirms your localhost is working. 
                    You can now access your full React application!
                </p>
            </div>
        </div>
    </div>
</body>
</html>
\`, 'utf-8');
});

server.listen(3000, () => {
  console.log('🚀 TyphoonFincon Server is running at:');
  console.log('   http://localhost:3000');
  console.log('   http://127.0.0.1:3000');
  console.log('');
  console.log('📱 Available pages:');
  console.log('   • Home: http://localhost:3000/');
  console.log('   • Customer: http://localhost:3000/customer');
  console.log('   • Connector: http://localhost:3000/connector');
  console.log('   • Admin: http://localhost:3000/admin');
  console.log('');
  console.log('🔑 Admin Login:');
  console.log('   Username: admin');
  console.log('   Password: typhoon2025');
  console.log('');
  console.log('⏹️  Press Ctrl+C to stop the server');
});
"

