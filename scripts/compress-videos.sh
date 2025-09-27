#!/bin/bash

# Compress MAONO Videos for Faster Loading
# This script compresses videos to reduce file size and improve loading

echo "🎬 MAONO Video Compression"
echo "==========================="
echo ""

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Installing..."
    echo "Please install ffmpeg first:"
    echo "  Ubuntu/Debian: sudo apt install ffmpeg"
    echo "  macOS: brew install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/"
    exit 1
fi

echo "📁 Creating compressed videos directory..."
mkdir -p public/videos/compressed

echo "🗜️  Compressing videos for faster loading..."
echo ""

# Compress each video
videos=(
    "maono-intro.mp4"
    "agricultural-challenges.mp4"
    "maono-solution.mp4"
    "technology-stack.mp4"
    "impact-stories.mp4"
    "future-vision.mp4"
)

total_original=0
total_compressed=0

for video in "${videos[@]}"; do
    input="public/videos/$video"
    output="public/videos/compressed/$video"
    
    if [ -f "$input" ]; then
        original_size=$(du -b "$input" | cut -f1)
        total_original=$((total_original + original_size))
        
        echo "🗜️  Compressing $video..."
        
        # Compress with optimized settings for web
        ffmpeg -i "$input" \
            -c:v libx264 \
            -crf 28 \
            -preset fast \
            -c:a aac \
            -b:a 128k \
            -movflags +faststart \
            -y "$output" 2>/dev/null
        
        if [ -f "$output" ]; then
            compressed_size=$(du -b "$output" | cut -f1)
            total_compressed=$((total_compressed + compressed_size))
            reduction=$((100 - (compressed_size * 100 / original_size)))
            
            echo "   ✅ Compressed: $(du -h "$output" | cut -f1) (${reduction}% reduction)"
        else
            echo "   ❌ Compression failed"
        fi
    else
        echo "   ❌ $video not found"
    fi
    echo ""
done

# Calculate total savings
if [ $total_original -gt 0 ]; then
    total_reduction=$((100 - (total_compressed * 100 / total_original)))
    echo "📊 Compression Summary:"
    echo "   Original size: $(du -h public/videos | cut -f1)"
    echo "   Compressed size: $(du -h public/videos/compressed | cut -f1)"
    echo "   Total reduction: ${total_reduction}%"
    echo ""
    
    if [ $total_reduction -gt 30 ]; then
        echo "🎉 Great compression achieved!"
        echo "   Your videos will load much faster now"
    else
        echo "⚠️  Limited compression achieved"
        echo "   Consider YouTube upload for better performance"
    fi
fi

echo "🚀 Next Steps:"
echo "1. Test the compressed videos"
echo "2. Update code to use compressed videos if satisfied"
echo "3. Or proceed with YouTube upload for even better performance"
echo ""
echo "💡 For best results, still recommend YouTube upload:"
echo "   bash scripts/quick-youtube-upload.sh"