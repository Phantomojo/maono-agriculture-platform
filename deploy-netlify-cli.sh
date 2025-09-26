#!/bin/bash

# MAONO Platform - Netlify CLI Deployment Script
# This script automates the deployment process to Netlify

echo "🚀 MAONO Platform - Netlify CLI Deployment"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct directory. Please run from maono-agricultural-platform folder"
    exit 1
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "📦 Building the project first..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix errors and try again."
        exit 1
    fi
    echo "✅ Build completed successfully"
else
    echo "✅ Build directory found"
fi

# Check if Netlify CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

echo "🔧 Deploying to Netlify..."

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=build

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your MAONO platform is now live!"
else
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi

