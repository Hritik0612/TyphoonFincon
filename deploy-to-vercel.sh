#!/bin/bash

echo "🚀 Deploying TyphoonFincon to Vercel..."
echo "🌐 Your domain: typhoonfincon.com"
echo ""

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to production..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://typhoonfincon.com"
echo "📱 Next steps:"
echo "1. Go to vercel.com dashboard"
echo "2. Add custom domain: typhoonfincon.com"
echo "3. Update DNS records as instructed"
echo "4. Your site will be LIVE!"
