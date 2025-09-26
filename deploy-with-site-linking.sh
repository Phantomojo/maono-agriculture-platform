#!/bin/bash

# MAONO Platform - Advanced Netlify CLI Deployment with Site Linking
# This script links to an existing Netlify site and deploys

echo "🚀 MAONO Platform - Advanced Netlify CLI Deployment"
echo "=================================================="

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

echo "🔗 Checking Netlify authentication..."
npx netlify-cli status

echo "🌐 Deploying to Netlify..."

# Option 1: Deploy to existing site (if linked)
if [ -f ".netlify/state.json" ]; then
    echo "📡 Deploying to linked site..."
    npx netlify-cli deploy --prod --dir=build
else
    echo "🔗 No linked site found. Creating new deployment..."
    npx netlify-cli deploy --prod --dir=build --open
fi

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your MAONO platform is now live!"
    echo "📊 Check your Netlify dashboard for deployment details"
else
    echo "❌ Deployment failed. Check the error messages above."
    echo "💡 Try running: npx netlify-cli login"
    exit 1
fi

