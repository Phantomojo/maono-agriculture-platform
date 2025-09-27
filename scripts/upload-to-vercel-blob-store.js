const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadVideosToBlobStore() {
  console.log('🚀 Uploading MAONO videos to Vercel Blob Store...');
  console.log('');
  
  const videosDir = path.join(__dirname, '../public/videos/optimized');
  const videos = [
    'maono-intro.mp4',
    'agricultural-challenges.mp4', 
    'maono-solution.mp4',
    'technology-stack.mp4',
    'impact-stories.mp4',
    'future-vision.mp4'
  ];

  const videoUrls = {};
  
  for (const video of videos) {
    const videoPath = path.join(videosDir, video);
    
    if (fs.existsSync(videoPath)) {
      try {
        console.log(`📹 Uploading ${video}...`);
        
        // Upload to your "maono" blob store
        const blob = await put(video, fs.createReadStream(videoPath), {
          access: 'public',
          contentType: 'video/mp4'
        });
        
        videoUrls[video] = blob.url;
        console.log(`✅ ${video} uploaded successfully!`);
        console.log(`   URL: ${blob.url}`);
        console.log('');
        
      } catch (error) {
        console.error(`❌ Failed to upload ${video}:`, error.message);
        console.log('');
      }
    } else {
      console.log(`⚠️  ${video} not found in optimized folder`);
      console.log('');
    }
  }
  
  // Save video URLs to file
  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(dataDir, 'vercel-blob-urls.json'),
    JSON.stringify(videoUrls, null, 2)
  );
  
  console.log('🎉 Upload Summary:');
  console.log('==================');
  console.log(`✅ Videos uploaded: ${Object.keys(videoUrls).length}/6`);
  console.log(`📁 URLs saved to: src/data/vercel-blob-urls.json`);
  console.log('');
  console.log('🚀 Next Steps:');
  console.log('1. Update DualPanelPresentation to use blob URLs');
  console.log('2. Deploy to Vercel');
  console.log('3. Enjoy 1-2 second video loading!');
  console.log('');
  
  return videoUrls;
}

uploadVideosToBlobStore().catch(console.error);
