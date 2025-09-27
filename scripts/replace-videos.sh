#!/bin/bash

# Replace MAONO videos with original downloads folder videos
# This script helps you replace the current videos with original ones

echo "🎬 MAONO Video Replacement Script"
echo "=================================="
echo ""

echo "📁 Current videos in public/videos/:"
ls -la public/videos/*.mp4 2>/dev/null || echo "No videos found"
echo ""

echo "📁 Videos in Downloads folder:"
if [ -d "$HOME/Downloads" ]; then
    find "$HOME/Downloads" -name "*.mp4" -type f | head -10
else
    echo "Downloads folder not found"
fi
echo ""

echo "🔄 To replace videos with original downloads:"
echo "1. Copy your original videos from Downloads to public/videos/"
echo "2. Make sure they have the correct names:"
echo "   - maono-intro.mp4"
echo "   - agricultural-challenges.mp4"
echo "   - maono-solution.mp4"
echo "   - technology-stack.mp4"
echo "   - impact-stories.mp4"
echo "   - future-vision.mp4"
echo ""
echo "3. Run: bash scripts/upload-original-videos.sh"
echo ""

echo "💡 This will:"
echo "   - Replace current videos with original ones"
echo "   - Upload them to Vercel Blob"
echo "   - Update the code with new URLs"
echo "   - Deploy the changes"
echo ""

echo "🚀 Ready to replace videos? Follow the steps above!"
