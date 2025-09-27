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
