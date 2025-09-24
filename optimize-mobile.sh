#!/bin/bash

# MAONO Mobile Optimization Script
echo "🚀 MAONO Mobile Optimization Starting..."

# Set environment variables for mobile optimization
export GENERATE_SOURCEMAP=false
export INLINE_RUNTIME_CHUNK=false
export NODE_ENV=production

# Install bundle analyzer if not already installed
if ! command -v npx &> /dev/null; then
    echo "Installing webpack-bundle-analyzer..."
    npm install -g webpack-bundle-analyzer
fi

# Build with mobile optimizations
echo "📱 Building MAONO for mobile..."
npm run build:mobile

# Analyze bundle size
echo "📊 Analyzing bundle size..."
npm run analyze

# Create mobile-optimized build
echo "🔧 Creating mobile-optimized build..."
mkdir -p build-mobile
cp -r build/* build-mobile/

# Optimize images (if imagemagick is available)
if command -v convert &> /dev/null; then
    echo "🖼️ Optimizing images..."
    find build-mobile -name "*.png" -exec convert {} -quality 85 -strip {} \;
    find build-mobile -name "*.jpg" -exec convert {} -quality 85 -strip {} \;
fi

# Add mobile-specific optimizations
echo "📱 Adding mobile optimizations..."

# Create mobile-specific service worker
cat > build-mobile/sw.js << 'EOF'
// MAONO Mobile Service Worker - Optimized
const CACHE_NAME = 'maono-mobile-v2';
const STATIC_CACHE = 'maono-static-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/css/main.css'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
EOF

# Create mobile-specific manifest
cat > build-mobile/manifest.json << 'EOF'
{
  "name": "MAONO - Agricultural Ecosystem",
  "short_name": "MAONO",
  "description": "Agricultural ecosystem platform for African farmers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0A",
  "theme_color": "#4CAF50",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
EOF

echo "✅ MAONO Mobile Optimization Complete!"
echo "📱 Mobile-optimized build created in build-mobile/"
echo "🚀 Ready for mobile deployment!"

# Display build size
echo "📊 Build Size Analysis:"
du -sh build-mobile/
du -sh build-mobile/static/

echo "🎯 Mobile Performance Tips:"
echo "1. Use the mobile-optimized build for mobile deployment"
echo "2. Enable service worker for offline functionality"
echo "3. Use CDN for static assets"
echo "4. Enable compression on your server"
echo "5. Use HTTP/2 for better performance"
