#!/bin/bash

# Cloudinary Setup for MAONO Videos
# Professional video hosting with free tier

echo "☁️  CLOUDINARY SETUP FOR MAONO"
echo "==============================="
echo ""

echo "✅ Why Cloudinary is Great:"
echo "   - Free tier: 25GB storage, 25GB bandwidth"
echo "   - Automatic video optimization"
echo "   - Global CDN delivery"
echo "   - 2-3 second loading times"
echo "   - Professional video hosting"
echo "   - Easy integration"
echo ""

echo "📦 Installing Cloudinary..."
npm install cloudinary

echo ""
echo "🔧 Setting up Cloudinary integration..."

# Create Cloudinary upload script
cat > scripts/upload-to-cloudinary.js << 'EOF'
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary (you'll need to get these from cloudinary.com)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadVideos() {
  const videosDir = path.join(__dirname, '../public/videos');
  const videos = [
    'maono-intro.mp4',
    'agricultural-challenges.mp4',
    'maono-solution.mp4',
    'technology-stack.mp4',
    'impact-stories.mp4',
    'future-vision.mp4'
  ];

  console.log('☁️  Uploading videos to Cloudinary...');
  
  const videoUrls = {};
  
  for (const video of videos) {
    const videoPath = path.join(videosDir, video);
    
    if (fs.existsSync(videoPath)) {
      try {
        console.log(`📹 Uploading ${video}...`);
        
        const result = await cloudinary.uploader.upload(videoPath, {
          resource_type: 'video',
          folder: 'maono-videos',
          public_id: video.replace('.mp4', ''),
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });
        
        videoUrls[video] = result.secure_url;
        console.log(`✅ ${video} uploaded: ${result.secure_url}`);
        
      } catch (error) {
        console.error(`❌ Failed to upload ${video}:`, error);
      }
    } else {
      console.log(`⚠️  ${video} not found`);
    }
  }
  
  // Save video URLs to file
  fs.writeFileSync(
    path.join(__dirname, '../src/data/video-urls.json'),
    JSON.stringify(videoUrls, null, 2)
  );
  
  console.log('🎉 All videos uploaded successfully!');
  console.log('📁 Video URLs saved to src/data/video-urls.json');
}

uploadVideos().catch(console.error);
EOF

# Create Cloudinary component
cat > src/components/CloudinaryVideo.tsx << 'EOF'
import React, { useState, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface CloudinaryVideoProps {
  publicId: string;
  cloudName: string;
  poster?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: any) => void;
  style?: React.CSSProperties;
}

const CloudinaryVideo: React.FC<CloudinaryVideoProps> = ({
  publicId,
  cloudName,
  poster,
  onLoadStart,
  onCanPlay,
  onError,
  style
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    onCanPlay?.();
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  // Cloudinary video URL with optimization
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/${publicId}.mp4`;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CircularProgress sx={{ color: '#D9B08C' }} />
          <Typography variant="body2" sx={{ color: '#D1E8E2' }}>
            Loading video...
          </Typography>
        </Box>
      )}
      
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            color: '#D1E8E2'
          }}
        >
          <Typography variant="body2" color="error">
            Failed to load video
          </Typography>
        </Box>
      )}
      
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          ...style
        }}
        controls
        preload="metadata"
      />
    </Box>
  );
};

export default CloudinaryVideo;
EOF

echo ""
echo "📝 Setup Steps:"
echo "1. Go to https://cloudinary.com and create free account"
echo "2. Get your Cloud Name, API Key, and API Secret"
echo "3. Set environment variables:"
echo "   export CLOUDINARY_CLOUD_NAME=your_cloud_name"
echo "   export CLOUDINARY_API_KEY=your_api_key"
echo "   export CLOUDINARY_API_SECRET=your_api_secret"
echo "4. Run: node scripts/upload-to-cloudinary.js"
echo "5. Update DualPanelPresentation to use Cloudinary videos"
echo ""
echo "🎯 Expected Results:"
echo "   - 2-3 second video loading"
echo "   - Global CDN delivery"
echo "   - Automatic optimization"
echo "   - Professional hosting"
echo ""
echo "☁️  Ready to setup? Follow the steps above!"
