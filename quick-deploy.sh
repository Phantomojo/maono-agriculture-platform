#!/bin/bash

# Quick Netlify deployment for MAONO platform
echo "🚀 Quick Netlify Deployment for MAONO Platform"

# Check if build exists, if not build it
if [ ! -d "build" ]; then
    echo "📦 Building project..."
    npm run build
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
npx netlify-cli deploy --prod --dir=build

echo "✅ Deployment complete!"

