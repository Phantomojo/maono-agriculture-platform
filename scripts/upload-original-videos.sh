#!/bin/bash

# Upload original videos to Vercel Blob
# This script uploads the original videos from Downloads folder

echo "🎬 Uploading Original MAONO Videos"
echo "===================================="
echo ""

# Check if videos exist in public/videos/
echo "📁 Checking for videos in public/videos/:"
videos=(
    "maono-intro.mp4"
    "agricultural-challenges.mp4"
    "maono-solution.mp4"
    "technology-stack.mp4"
    "impact-stories.mp4"
    "future-vision.mp4"
)

all_exist=true
for video in "${videos[@]}"; do
    if [ -f "public/videos/$video" ]; then
        size=$(du -h "public/videos/$video" | cut -f1)
        echo "✅ $video ($size)"
    else
        echo "❌ $video (NOT FOUND)"
        all_exist=false
    fi
done

if [ "$all_exist" = false ]; then
    echo ""
    echo "❌ Some videos are missing!"
    echo "Please copy your original videos from Downloads to public/videos/"
    echo "Make sure they have the correct names listed above."
    exit 1
fi

echo ""
echo "🚀 Uploading to Vercel Blob..."

# Set the token
export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_PtewdRB0FMlMvMtc_t4BN89GvB63WuUNAtP8MOmDaZsa34h"

# Run the upload script
node scripts/upload-to-vercel-blob-store.js

echo ""
echo "✅ Upload complete!"
echo "📝 Next steps:"
echo "1. Check the video URLs in src/data/vercel-blob-urls.json"
echo "2. Deploy to Vercel: npx vercel --prod"
echo "3. Test the videos in the presentation"
