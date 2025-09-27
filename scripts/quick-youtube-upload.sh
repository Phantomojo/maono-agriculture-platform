#!/bin/bash

# Quick YouTube Upload for MAONO Videos
# This script provides the fastest way to upload videos to YouTube

echo "🚀 QUICK YOUTUBE UPLOAD SOLUTION"
echo "================================"
echo ""
echo "📊 Current Problem:"
echo "   - 6 videos totaling 62MB"
echo "   - Taking 15-30 seconds to load"
echo "   - Poor user experience"
echo ""
echo "✅ YouTube Solution:"
echo "   - Global CDN delivery"
echo "   - 2-5 second loading"
echo "   - 10x faster performance"
echo "   - Mobile optimized"
echo ""

echo "🎯 FASTEST METHOD - Manual Upload:"
echo "=================================="
echo ""
echo "1. 🌐 Go to: https://www.youtube.com/upload"
echo "2. 📱 Sign in to your Google account"
echo "3. 📹 Upload each video with these settings:"
echo ""

# Display upload instructions for each video
videos=(
    "maono-intro.mp4:MAONO: Revolutionary Agricultural Intelligence Platform"
    "agricultural-challenges.mp4:The Challenges Facing African Agriculture"
    "maono-solution.mp4:The MAONO Solution: Empowering Farmers with Smart Technology"
    "technology-stack.mp4:MAONO Technology Stack: Cutting-Edge Innovation"
    "impact-stories.mp4:MAONO Impact: Building on Success, Taking It Further"
    "future-vision.mp4:MAONO Future Vision: Scaling for Sustainable Tomorrow"
)

for i in "${videos[@]}"; do
    IFS=':' read -r filename title <<< "$i"
    echo "   📹 $filename"
    echo "      Title: $title"
    echo "      Privacy: Unlisted"
    echo "      Tags: agriculture, AI, farming, technology, Africa, MAONO"
    echo ""
done

echo "4. 📋 After uploading, copy the video IDs from URLs"
echo "5. 🔧 Run: python3 scripts/update-video-ids.py"
echo "6. 🚀 Deploy: git add . && git commit -m 'Add YouTube videos' && git push && npx vercel --prod"
echo ""

echo "⏱️  Time Investment: 15 minutes"
echo "🎯 Performance Gain: 10x faster loading!"
echo ""

echo "💡 Pro Tips:"
echo "- Upload videos one by one to avoid confusion"
echo "- Set all videos to 'Unlisted' (private but embeddable)"
echo "- Use the provided titles for better SEO"
echo "- Copy video IDs immediately after upload"
echo ""

echo "🚀 Ready to start? The faster you upload, the faster your site loads!"
