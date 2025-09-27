#!/bin/bash

# Video compression script for better performance
# Requires ffmpeg to be installed

echo "🎬 Compressing videos for better performance..."

# Create compressed directory
mkdir -p public/videos/compressed

# Compression settings for web optimization
COMPRESS_SETTINGS="-c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart"

# List of videos to compress
VIDEOS=(
    "maono-intro.mp4"
    "agricultural-challenges.mp4" 
    "maono-solution.mp4"
    "technology-stack.mp4"
    "impact-stories.mp4"
    "future-vision.mp4"
)

# Compress each video
for video in "${VIDEOS[@]}"; do
    if [ -f "public/videos/$video" ]; then
        echo "Compressing $video..."
        
        # Get original size
        original_size=$(du -h "public/videos/$video" | cut -f1)
        
        # Compress video
        ffmpeg -i "public/videos/$video" $COMPRESS_SETTINGS "public/videos/compressed/$video" -y
        
        # Get compressed size
        compressed_size=$(du -h "public/videos/compressed/$video" | cut -f1)
        
        echo "✅ $video: $original_size → $compressed_size"
    else
        echo "❌ $video not found"
    fi
done

echo "🎉 Video compression complete!"
echo "📊 Check the compressed/ directory for optimized videos"
