const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  
  if (filePath === './') {
    filePath = './index.html';
  }
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // Serve TyphoonFincon app
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TyphoonFincon - Financial Consultant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg border-b-4 border-amber-400">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex items-center space-x-2">
                        <div class="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold text-sm">TF</span>
                        </div>
                        <div class="text-xl font-bold text-blue-800">Typhoon Fincon</div>
                    </div>
                </div>
                <div class="flex items-center space-x-8">
                    <a href="/" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/customer" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Customer</a>
                    <a href="/connector" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Connector</a>
                    <a href="/admin" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Admin</a>
                    <a href="/customer" class="bg-blue-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-900">Apply Now</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="text-center">
                <h1 class="text-4xl lg:text-6xl font-bold mb-6">
                    Your Financial <span class="text-amber-400">Success</span> Partner
                </h1>
                <p class="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                    Get instant loan approvals with competitive rates. We provide comprehensive financial solutions tailored to your needs.
                </p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                    <a href="/customer" class="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors duration-200 text-center">
                        Apply for Loan
                    </a>
                    <a href="/connector" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center">
                        Become a Partner
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                <p class="text-xl text-gray-600">Comprehensive financial solutions for all your needs</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
                    <div class="text-4xl mb-4">🏠</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Home Loans</h3>
                    <p class="text-gray-600">Competitive rates for your dream home with flexible repayment options.</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
                    <div class="text-4xl mb-4">🚗</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Vehicle Loans</h3>
                    <p class="text-gray-600">Quick approval for cars, bikes, and commercial vehicles.</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
                    <div class="text-4xl mb-4">💳</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Personal Loans</h3>
                    <p class="text-gray-600">Unsecured loans for all your personal financial needs.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h2>
                <p class="text-xl text-blue-100">Ready to start your financial journey? Contact us today!</p>
            </div>
            
            <div class="text-center">
                <div class="space-y-4">
                    <div class="text-lg">
                        <strong>Phone:</strong> +91 9833560350
                    </div>
                    <div class="text-lg">
                        <strong>Email:</strong> info@typhoonfincare.in
                    </div>
                    <div class="text-lg">
                        <strong>Location:</strong> Mumbai, Maharashtra, India
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="mb-4">
                <div class="text-xl font-bold">Typhoon Fincon</div>
                <p class="text-gray-300">Your trusted financial partner</p>
            </div>
            <div class="text-sm text-gray-400">
                © 2025 Typhoon Finance Consultant. All rights reserved.
            </div>
        </div>
    </footer>
</body>
</html>
        `, 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('🚀 TyphoonFincon Server is running!');
  console.log('');
  console.log('🌐 Your localhost URLs:');
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
  console.log('');
  console.log('📱 Available pages:');
  console.log(`   • Home: http://localhost:${PORT}/`);
  console.log(`   • Customer: http://localhost:${PORT}/customer`);
  console.log(`   • Connector: http://localhost:${PORT}/connector`);
  console.log(`   • Admin: http://localhost:${PORT}/admin`);
  console.log('');
  console.log('🔑 Admin Login:');
  console.log('   Username: admin');
  console.log('   Password: typhoon2025');
  console.log('');
  console.log('⏹️  Press Ctrl+C to stop the server');
  console.log('='.repeat(50));
});

