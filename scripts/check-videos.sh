#!/bin/bash

# Check if all MAONO videos are ready for YouTube upload

echo "🎬 MAONO Video Check"
echo "===================="

# Check if videos exist
video_dir="public/videos"
videos=(
    "maono-intro.mp4"
    "agricultural-challenges.mp4"
    "maono-solution.mp4"
    "technology-stack.mp4"
    "impact-stories.mp4"
    "future-vision.mp4"
)

echo "📁 Checking video files..."
echo ""

all_videos_exist=true
total_size=0

for video in "${videos[@]}"; do
    video_path="$video_dir/$video"
    
    if [ -f "$video_path" ]; then
        size=$(du -h "$video_path" | cut -f1)
        total_size_bytes=$(du -b "$video_path" | cut -f1)
        total_size=$((total_size + total_size_bytes))
        echo "✅ $video ($size)"
    else
        echo "❌ $video (NOT FOUND)"
        all_videos_exist=false
    fi
done

echo ""
echo "📊 Summary:"
echo "Total videos: ${#videos[@]}"
echo "Found: $(ls -1 $video_dir/*.mp4 2>/dev/null | wc -l)"
echo "Total size: $(du -h $video_dir | cut -f1)"

if [ "$all_videos_exist" = true ]; then
    echo ""
    echo "🎉 All videos ready for upload!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Run: ./scripts/setup-youtube-api.sh"
    echo "2. Follow the setup guide"
    echo "3. Run: python3 scripts/youtube-uploader.py"
    echo "4. Copy video IDs to your code"
    echo "5. Deploy and enjoy fast videos!"
else
    echo ""
    echo "❌ Some videos are missing!"
    echo "Please ensure all 6 videos are in $video_dir/"
fi

echo ""
echo "🔧 YouTube API Status:"
if [ -f "client_secrets.json" ]; then
    echo "✅ client_secrets.json found"
else
    echo "❌ client_secrets.json not found"
    echo "   Run: ./scripts/setup-youtube-api.sh"
fi
