#!/bin/bash

# Execute YouTube Upload Process for MAONO
# This script guides you through the entire process

echo "🎬 MAONO YouTube Upload Execution"
echo "=================================="
echo ""

# Step 1: Check videos
echo "📋 Step 1: Checking videos..."
bash scripts/check-videos.sh
echo ""

# Step 2: Create upload instructions
echo "📋 Step 2: Creating upload instructions..."
python3 scripts/manual-youtube-setup.py
echo ""

# Step 3: Instructions for manual upload
echo "📋 Step 3: Manual Upload Instructions"
echo "====================================="
echo ""
echo "🌐 Go to: https://www.youtube.com/upload"
echo ""
echo "📝 For each video, follow these steps:"
echo "1. Click 'Select files to upload'"
echo "2. Choose video from public/videos/"
echo "3. Use the title and description from youtube_upload_instructions.json"
echo "4. Set privacy to 'Unlisted'"
echo "5. Add the provided tags"
echo "6. Click 'Publish'"
echo "7. Copy the video ID from the URL"
echo ""
echo "📱 After uploading all 6 videos:"
echo "Run: python3 scripts/update-video-ids.py"
echo ""
echo "🚀 Then deploy:"
echo "git add . && git commit -m 'Add YouTube videos' && git push && npx vercel --prod"
echo ""

echo "⏱️  Estimated time: 15-20 minutes"
echo "🎯 Result: 10x faster video loading!"
echo ""
echo "Ready to start? Press Enter to continue..."
read
