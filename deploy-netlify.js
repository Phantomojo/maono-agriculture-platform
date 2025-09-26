#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

console.log('🚀 MAONO Platform - Netlify Deployment');
console.log('=====================================');

// Check if build folder exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build folder not found. Please run "npm run build" first.');
  process.exit(1);
}

console.log('✅ Build folder found');
console.log('📁 Build contents:');
const buildContents = fs.readdirSync(buildDir);
buildContents.forEach(file => {
  const filePath = path.join(buildDir, file);
  const stats = fs.statSync(filePath);
  console.log(`  ${stats.isDirectory() ? '📁' : '📄'} ${file} (${stats.size} bytes)`);
});

console.log('\n🌐 Deployment Instructions:');
console.log('1. Go to https://netlify.com');
console.log('2. Click "Add new site" → "Deploy manually"');
console.log('3. Drag and drop the "build" folder');
console.log('4. Wait for deployment to complete');
console.log('5. Get your live URL!');

console.log('\n📊 Build Statistics:');
const buildSize = getDirectorySize(buildDir);
console.log(`Total size: ${(buildSize / 1024 / 1024).toFixed(2)} MB`);

console.log('\n🎯 Your MAONO agricultural platform is ready for deployment!');
console.log('Features included:');
console.log('✅ ORUN-style presentation');
console.log('✅ Judge-focused content');
console.log('✅ Loading states & animations');
console.log('✅ Mobile responsive design');
console.log('✅ 3D globe view');
console.log('✅ Weather & market intelligence');
console.log('✅ Farm management tools');
console.log('✅ Analytics dashboard');

function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}
