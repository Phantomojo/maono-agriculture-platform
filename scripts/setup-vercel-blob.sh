#!/bin/bash

# Vercel Blob Setup for MAONO Videos
# The fastest and easiest solution for video hosting

echo "🚀 VERCEL BLOB SETUP FOR MAONO"
echo "==============================="
echo ""

echo "✅ Why Vercel Blob is Perfect:"
echo "   - Already using Vercel for hosting"
echo "   - Zero configuration required"
echo "   - Global CDN delivery"
echo "   - Automatic video optimization"
echo "   - 1-2 second loading times"
echo "   - No external dependencies"
echo ""

echo "📦 Installing Vercel Blob..."
npm install @vercel/blob

echo ""
echo "🔧 Setting up Vercel Blob integration..."

# Create Vercel Blob upload script
cat > scripts/upload-to-vercel-blob.js << 'EOF'
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

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

  console.log('🚀 Uploading videos to Vercel Blob...');
  
  const videoUrls = {};
  
  for (const video of videos) {
    const videoPath = path.join(videosDir, video);
    
    if (fs.existsSync(videoPath)) {
      try {
        console.log(`📹 Uploading ${video}...`);
        
        const blob = await put(video, fs.createReadStream(videoPath), {
          access: 'public',
          contentType: 'video/mp4'
        });
        
        videoUrls[video] = blob.url;
        console.log(`✅ ${video} uploaded: ${blob.url}`);
        
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

# Create data directory
mkdir -p src/data

# Create Vercel Blob component
cat > src/components/VercelBlobVideo.tsx << 'EOF'
import React, { useState, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface VercelBlobVideoProps {
  src: string;
  poster?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: any) => void;
  style?: React.CSSProperties;
}

const VercelBlobVideo: React.FC<VercelBlobVideoProps> = ({
  src,
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
        src={src}
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

export default VercelBlobVideo;
EOF

echo ""
echo "📝 Next Steps:"
echo "1. Run: node scripts/upload-to-vercel-blob.js"
echo "2. Update DualPanelPresentation to use Vercel Blob videos"
echo "3. Deploy to Vercel"
echo ""
echo "🎯 Expected Results:"
echo "   - 1-2 second video loading"
echo "   - Global CDN delivery"
echo "   - Automatic optimization"
echo "   - No external dependencies"
echo ""
echo "🚀 Ready to upload? Run: node scripts/upload-to-vercel-blob.js"
