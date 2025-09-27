#!/bin/bash

# YouTube Upload Script for MAONO Videos
# This script uploads all presentation videos to YouTube using youtubeuploader

echo "🎬 MAONO YouTube Upload Script"
echo "=============================="

# Check if youtubeuploader is installed
if ! command -v youtubeuploader &> /dev/null; then
    echo "❌ youtubeuploader not found. Installing..."
    
    # Download youtubeuploader for Linux
    wget https://github.com/porjo/youtubeuploader/releases/latest/download/youtubeuploader_linux_amd64.tar.gz
    tar -xzf youtubeuploader_linux_amd64.tar.gz
    chmod +x youtubeuploader
    sudo mv youtubeuploader /usr/local/bin/
    
    echo "✅ youtubeuploader installed successfully!"
fi

# Check if client_secrets.json exists
if [ ! -f "client_secrets.json" ]; then
    echo "❌ client_secrets.json not found!"
    echo "📋 Please follow these steps:"
    echo "1. Go to https://console.developers.google.com/"
    echo "2. Create a new project"
    echo "3. Enable YouTube Data API v3"
    echo "4. Create OAuth 2.0 credentials"
    echo "5. Download client_secrets.json to this directory"
    echo "6. Run this script again"
    exit 1
fi

# Video upload configurations
declare -A videos=(
    ["maono-intro.mp4"]="MAONO Introduction - Agricultural Intelligence Platform"
    ["agricultural-challenges.mp4"]="Agricultural Challenges in Africa - The Problem We Solve"
    ["maono-solution.mp4"]="The MAONO Solution - AI-Powered Agriculture"
    ["technology-stack.mp4"]="Cutting-Edge Technology - How MAONO Works"
    ["impact-stories.mp4"]="Proven Impact - Success Stories from the Field"
    ["future-vision.mp4"]="The Future of Agriculture - MAONO's Vision"
)

# Upload each video
for video_file in "${!videos[@]}"; do
    video_path="public/videos/$video_file"
    video_title="${videos[$video_file]}"
    
    if [ -f "$video_path" ]; then
        echo "📤 Uploading: $video_file"
        echo "📝 Title: $video_title"
        
        # Upload to YouTube as unlisted
        youtubeuploader \
            -filename "$video_path" \
            -title "$video_title" \
            -description "MAONO Agricultural Intelligence Platform - $video_title" \
            -tags "agriculture,AI,farming,technology,Africa,MAONO" \
            -privacy "unlisted" \
            -category "22" \
            -thumbnail ""
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully uploaded: $video_file"
        else
            echo "❌ Failed to upload: $video_file"
        fi
        
        echo "---"
    else
        echo "❌ Video not found: $video_path"
    fi
done

echo "🎉 Upload process completed!"
echo "📋 Next steps:"
echo "1. Check your YouTube channel for the uploaded videos"
echo "2. Copy the video IDs from the URLs"
echo "3. Update the YOUTUBE_VIDEOS object in DualPanelPresentation.tsx"
echo "4. Deploy your updated application"
