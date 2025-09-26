#!/bin/bash

echo "🚀 MAONO Platform - Netlify Deployment Script"
echo "=============================================="

# Check if build folder exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Building project first..."
    npm run build
fi

echo "✅ Build folder found"
echo "📁 Build contents:"
ls -la build/

echo ""
echo "🌐 Deployment Options:"
echo "1. Manual Netlify Deployment (Recommended)"
echo "   - Go to https://netlify.com"
echo "   - Click 'Add new site' → 'Deploy manually'"
echo "   - Drag and drop the 'build' folder"
echo ""
echo "2. Netlify CLI (if installed)"
echo "   - Run: netlify deploy --prod --dir=build"
echo ""
echo "3. Git-based Deployment"
echo "   - Push to GitHub and connect to Netlify"
echo "   - Set build command: npm run build"
echo "   - Set publish directory: build"
echo ""

echo "📊 Build Statistics:"
du -sh build/
echo ""

echo "🎯 Ready for deployment!"
echo "Your MAONO agricultural platform is optimized and ready to go live!"

