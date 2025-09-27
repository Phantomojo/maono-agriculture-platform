#!/bin/bash

# Get Vercel Blob Token for MAONO
# This script helps you get the token from your Vercel dashboard

echo "🔑 VERCEL BLOB TOKEN SETUP"
echo "==========================="
echo ""

echo "📋 Step-by-step instructions:"
echo ""
echo "1. 🌐 Go to your Vercel dashboard:"
echo "   https://vercel.com/michaels-projects-98d56afb/maono-agriculture-platform"
echo ""
echo "2. 📁 Click on 'Storage' tab (you're already there!)"
echo ""
echo "3. 🔧 Click on your 'maono' blob store"
echo ""
echo "4. 🔑 Look for 'Environment Variables' or 'Tokens' section"
echo "   - Look for 'BLOB_READ_WRITE_TOKEN'"
echo "   - Or click 'Generate Token' if available"
echo ""
echo "5. 📋 Copy the token value"
echo ""
echo "6. 💾 Set the environment variable:"
echo "   export BLOB_READ_WRITE_TOKEN='your_token_here'"
echo ""
echo "7. 🚀 Run the upload script:"
echo "   node scripts/upload-to-vercel-blob-store.js"
echo ""

echo "💡 Alternative: Check your Vercel project settings:"
echo "   - Go to Project Settings"
echo "   - Look for 'Environment Variables'"
echo "   - Add BLOB_READ_WRITE_TOKEN if not present"
echo ""

echo "🎯 What you'll get:"
echo "   - All 6 videos uploaded to Vercel Blob"
echo "   - 1-2 second loading times"
echo "   - Global CDN delivery"
echo "   - Automatic optimization"
echo ""

echo "⚡ Ready to get your token? Follow the steps above!"
