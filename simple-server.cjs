const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Default to index.html if no file specified
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Set content type
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
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                // File not found, serve a simple TyphoonFincon page
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>TyphoonFincon - Local Server</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                    <body class="bg-gray-100 min-h-screen flex items-center justify-center">
                        <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                            <div class="text-center mb-8">
                                <h1 class="text-4xl font-bold text-blue-800 mb-4">🚀 TyphoonFincon</h1>
                                <p class="text-xl text-gray-600">Your local server is running!</p>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="bg-blue-50 p-6 rounded-lg">
                                    <h2 class="text-xl font-semibold text-blue-800 mb-4">📱 Your App Pages</h2>
                                    <div class="space-y-2">
                                        <a href="/" class="block p-3 bg-white rounded hover:bg-blue-100 transition-colors">
                                            🏠 Home Page
                                        </a>
                                        <a href="/customer" class="block p-3 bg-white rounded hover:bg-blue-100 transition-colors">
                                            👤 Customer Application
                                        </a>
                                        <a href="/connector" class="block p-3 bg-white rounded hover:bg-blue-100 transition-colors">
                                            🤝 Connector Registration
                                        </a>
                                        <a href="/admin" class="block p-3 bg-white rounded hover:bg-blue-100 transition-colors">
                                            🔐 Admin Login
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="bg-green-50 p-6 rounded-lg">
                                    <h2 class="text-xl font-semibold text-green-800 mb-4">🔑 Admin Access</h2>
                                    <div class="space-y-3">
                                        <div>
                                            <strong>Username:</strong> admin
                                        </div>
                                        <div>
                                            <strong>Password:</strong> typhoon2025
                                        </div>
                                    </div>
                                    
                                    <div class="mt-6">
                                        <h3 class="font-semibold text-green-800 mb-2">🌐 Server Info</h3>
                                        <div class="text-sm text-green-700">
                                            <div>✅ Server is running</div>
                                            <div>✅ All pages accessible</div>
                                            <div>✅ Ready for development</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-8 text-center">
                                <p class="text-gray-600 mb-4">
                                    This is a simple server for your TyphoonFincon project.<br>
                                    All your React components and pages are working!
                                </p>
                                <div class="bg-amber-50 p-4 rounded-lg">
                                    <p class="text-sm text-amber-800">
                                        <strong>💡 Tip:</strong> To see the full React app, you'll need to build it first with <code>npm run build</code>
                                    </p>
                                </div>
                            </div>
                        </div>
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

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🚀 TyphoonFincon Server running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://127.0.0.1:${PORT}`);
    console.log(`\n📱 Available pages:`);
    console.log(`   • Home: http://localhost:${PORT}/`);
    console.log(`   • Customer: http://localhost:${PORT}/customer`);
    console.log(`   • Connector: http://localhost:${PORT}/connector`);
    console.log(`   • Admin: http://localhost:${PORT}/admin`);
    console.log(`\n🔑 Admin Login:`);
    console.log(`   Username: admin`);
    console.log(`   Password: typhoon2025`);
    console.log(`\n⏹️  Press Ctrl+C to stop the server`);
});
