#!/bin/bash

# Test MAONO Video Files
# This script tests if all video files are accessible and working

echo "🎬 MAONO Video File Test"
echo "========================"
echo ""

# Check if videos exist and are accessible
videos=(
    "maono-intro.mp4"
    "agricultural-challenges.mp4"
    "maono-solution.mp4"
    "technology-stack.mp4"
    "impact-stories.mp4"
    "future-vision.mp4"
)

echo "📁 Testing video files in public/videos/:"
echo ""

all_good=true

for video in "${videos[@]}"; do
    video_path="public/videos/$video"
    
    if [ -f "$video_path" ]; then
        size=$(du -h "$video_path" | cut -f1)
        echo "✅ $video ($size)"
        
        # Test if file is readable
        if [ -r "$video_path" ]; then
            echo "   ✅ File is readable"
        else
            echo "   ❌ File is not readable"
            all_good=false
        fi
        
        # Test if file has content
        if [ -s "$video_path" ]; then
            echo "   ✅ File has content"
        else
            echo "   ❌ File is empty"
            all_good=false
        fi
        
    else
        echo "❌ $video (NOT FOUND)"
        all_good=false
    fi
    echo ""
done

echo "📊 Summary:"
if [ "$all_good" = true ]; then
    echo "🎉 All videos are accessible and ready!"
    echo ""
    echo "🔧 If videos still show the same content:"
    echo "1. Check browser cache (Ctrl+F5 or Cmd+Shift+R)"
    echo "2. Check browser console for errors"
    echo "3. Verify video files are not corrupted"
    echo "4. Test with the test-videos.html file"
else
    echo "❌ Some videos have issues!"
    echo "Please check the file permissions and content."
fi

echo ""
echo "🌐 Test URL: http://localhost:3000/test-videos.html"
echo "   (Open this in your browser to test all videos)"
