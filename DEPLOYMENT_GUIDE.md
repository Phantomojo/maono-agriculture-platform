# MAONO Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+
- npm 8+
- Web server (Nginx/Apache)
- Domain name
- SSL certificate

### 1. Build for Production

#### Standard Build
```bash
npm run build
```

#### Mobile-Optimized Build (Recommended)
```bash
npm run build:mobile
```

#### Custom Mobile Build
```bash
./optimize-mobile.sh
```

### 2. Build Output
```
build/ (or build-mobile/)
├── static/
│   ├── js/
│   ├── css/
│   └── media/
├── index.html
├── manifest.json
└── sw.js
```

## 🌐 Web Server Configuration

### Nginx Configuration

#### Basic Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/maono/build;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Static files caching
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        gzip_static on;
    }

    # Service worker
    location /sw.js {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Advanced Configuration with HTTP/2
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    root /path/to/maono/build;
    index index.html;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # PWA headers
    add_header Service-Worker-Allowed "/" always;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Static files
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
        gzip_static on;
        brotli_static on;
    }

    # Service worker
    location /sw.js {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
    }

    # Manifest
    location /manifest.json {
        expires 1d;
        add_header Cache-Control "public";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

#### .htaccess
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Service worker
<Files "sw.js">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</Files>

# SPA routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 📱 Mobile Deployment

### Progressive Web App (PWA) Setup

#### 1. Verify PWA Files
- `manifest.json` - App configuration
- `sw.js` - Service worker
- Icons (192x192, 512x512)

#### 2. Test PWA Features
```bash
# Test offline functionality
# Test installability
# Test push notifications
# Test background sync
```

#### 3. PWA Validation
- Use Lighthouse PWA audit
- Test on mobile devices
- Verify offline functionality
- Check install prompts

### Mobile Performance Optimization

#### Bundle Analysis
```bash
npm run analyze
```

#### Mobile Build
```bash
npm run build:mobile
```

#### Performance Testing
```bash
# Lighthouse mobile audit
# Chrome DevTools mobile simulation
# Real device testing
```

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# .env.production
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
NODE_ENV=production
PUBLIC_URL=https://your-domain.com
```

### Build Scripts
```json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build",
    "build:mobile": "GENERATE_SOURCEMAP=false INLINE_RUNTIME_CHUNK=false react-scripts build",
    "build:production": "NODE_ENV=production GENERATE_SOURCEMAP=false npm run build:mobile"
  }
}
```

## 📊 Performance Monitoring

### Core Web Vitals
- **LCP**: < 2.5s (Good)
- **FID**: < 100ms (Good)
- **CLS**: < 0.1 (Good)

### Monitoring Setup
```javascript
// Performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'load_time',
        value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
      });
    }
  }
});
```

### Analytics Integration
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deployment Platforms

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build

# Configure netlify.toml
[build]
  publish = "build"
  command = "npm run build:mobile"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront
```bash
# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔍 Post-Deployment Testing

### 1. Functionality Testing
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Maps display correctly
- [ ] Service worker registers

### 2. Performance Testing
- [ ] Lighthouse audit > 90
- [ ] Core Web Vitals pass
- [ ] Mobile performance good
- [ ] Bundle size < 2MB
- [ ] Load time < 5s

### 3. Mobile Testing
- [ ] Touch interactions work
- [ ] Responsive design
- [ ] Offline functionality
- [ ] PWA installable
- [ ] Push notifications

### 4. Security Testing
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] No console errors
- [ ] Service worker secure
- [ ] CSP headers configured

## 📈 Monitoring & Maintenance

### Performance Monitoring
```javascript
// Real User Monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
  }
});
observer.observe({entryTypes: ['largest-contentful-paint']});
```

### Error Monitoring
```javascript
// Error tracking
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  // Send to error tracking service
});
```

### Service Worker Updates
```javascript
// Service worker update handling
navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});
```

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Code reviewed and tested
- [ ] Mobile performance optimized
- [ ] Bundle size analyzed
- [ ] Service worker tested
- [ ] PWA features verified

### Deployment
- [ ] Production build created
- [ ] Web server configured
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Compression enabled

### Post-Deployment
- [ ] Functionality tested
- [ ] Performance verified
- [ ] Mobile devices tested
- [ ] Monitoring configured
- [ ] Documentation updated

---

## 🌱 MAONO Deployment Complete!

**Your agricultural platform is now live and ready to serve African farmers!**

### Quick Commands
```bash
# Build for production
npm run build:mobile

# Deploy to server
rsync -av build/ user@server:/path/to/maono/

# Test deployment
curl -I https://your-domain.com
```

### Support
- **Performance Issues**: Check Core Web Vitals
- **Mobile Problems**: Test on real devices
- **PWA Issues**: Verify service worker
- **Security**: Check HTTPS and headers

**Happy farming! 🌱📱🚀**
