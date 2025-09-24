# MAONO Team Development Guide

## 👥 Team Onboarding

### Quick Start for New Team Members

1. **Clone the repository**
```bash
git clone <repository-url>
cd MAONO/maono-web
```

2. **Run setup script**
```bash
./setup.sh
```

3. **Start development**
```bash
./start-dev.sh
```

## 🎯 Project Overview

### What is MAONO?
MAONO is a comprehensive agricultural ecosystem platform designed for African farmers. It connects farmers with buyers, provides AI-powered weather predictions, and facilitates the entire agricultural supply chain.

### Key Features
- **🗺️ Interactive Map**: Real-time agricultural data across Africa
- **🛒 Marketplace**: Buy/sell agricultural products with real-time pricing
- **🌤️ AI Weather Assistant**: Offline weather predictions and farming recommendations
- **👥 Community**: Farmer-to-farmer communication and knowledge sharing
- **📱 Mobile-First**: Optimized for mobile devices with offline functionality

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, Material-UI, Leaflet.js
- **State Management**: Redux with Redux Thunk
- **Maps**: React Leaflet with OpenStreetMap
- **Mobile**: Progressive Web App (PWA)
- **Performance**: Lazy loading, service workers, mobile optimization

### Project Structure
```
maono-web/
├── public/                 # Static files
│   ├── index.html         # Main HTML
│   ├── manifest.json      # PWA manifest
│   └── sw.js             # Service worker
├── src/
│   ├── screens/          # Main application screens
│   │   ├── MapScreen.js
│   │   ├── ComprehensiveMarketplace.js
│   │   ├── WeatherAssistant.js
│   │   └── ProfileScreen.js
│   ├── store/            # Redux store
│   │   ├── actions/      # Redux actions
│   │   ├── reducers/     # Redux reducers
│   │   └── store.js      # Store configuration
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── package.json
├── setup.sh              # Setup script
└── README.md
```

## 🚀 Development Workflow

### Daily Development
1. **Start development server**
```bash
./start-dev.sh
```

2. **Open browser**
```
http://localhost:3000
```

3. **Test on mobile**
   - Use Chrome DevTools mobile simulation
   - Test on real mobile devices
   - Check performance with Lighthouse

### Code Standards
- **Functional Components**: Use React hooks
- **Lazy Loading**: Implement for all screens
- **Mobile First**: Design for mobile devices first
- **Performance**: Optimize for Core Web Vitals
- **PWA**: Follow Progressive Web App best practices

## 📱 Mobile Development

### Mobile Optimization Features
- **Lazy Loading**: Components load only when needed
- **Service Worker**: Offline functionality
- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Reduced Data**: Less data on mobile devices

### Mobile Testing
1. **Chrome DevTools**
   - Open DevTools (F12)
   - Click device toggle
   - Select mobile device
   - Test touch interactions

2. **Real Device Testing**
   - Use ngrok for local testing
   - Test on actual mobile devices
   - Check performance metrics

3. **Performance Testing**
   - Use Lighthouse mobile audit
   - Monitor Core Web Vitals
   - Test offline functionality

## 🛠️ Development Tools

### Essential Commands
```bash
# Development
npm start                 # Start dev server
./start-dev.sh           # Start with mobile optimizations

# Building
npm run build            # Production build
npm run build:mobile     # Mobile-optimized build
./build-mobile.sh        # Mobile build script

# Analysis
npm run analyze          # Bundle size analysis
./optimize-mobile.sh     # Mobile optimization
```

### Development Scripts
- `start-dev.sh`: Start development with mobile optimizations
- `build-mobile.sh`: Build mobile-optimized version
- `optimize-mobile.sh`: Run mobile optimization script

## 🎨 UI/UX Guidelines

### Design System
- **Colors**: Green (#4CAF50) primary, Dark (#0A0A0A) background
- **Typography**: Inter font family
- **Components**: Material-UI with custom styling
- **Animations**: Smooth transitions and hover effects

### Mobile Design Principles
- **Touch-Friendly**: Minimum 44px touch targets
- **Readable**: Clear typography and contrast
- **Fast**: Optimized for mobile performance
- **Offline**: Works without internet connection

## 🔧 Troubleshooting

### Common Issues

#### 1. Development Server Won't Start
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. Mobile Performance Issues
```bash
# Use mobile-optimized build
npm run build:mobile

# Check bundle size
npm run analyze

# Run mobile optimization
./optimize-mobile.sh
```

#### 3. Service Worker Issues
```bash
# Clear browser cache
# Check service worker registration in DevTools
# Verify sw.js file exists in public/
```

### Performance Optimization
- **Bundle Size**: Keep under 2MB
- **Load Time**: Target < 5 seconds on mobile
- **Memory Usage**: Monitor with DevTools
- **Network**: Minimize API calls

## 📊 Performance Monitoring

### Key Metrics
- **First Contentful Paint (FCP)**: < 2.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 5s
- **First Input Delay (FID)**: < 100ms

### Monitoring Tools
- **Lighthouse**: Performance audits
- **Chrome DevTools**: Real-time monitoring
- **WebPageTest**: Detailed analysis
- **Bundle Analyzer**: Size optimization

## 🚀 Deployment

### Production Deployment
1. **Build for production**
```bash
npm run build:mobile
```

2. **Deploy to server**
   - Upload build files
   - Configure web server
   - Enable compression
   - Set up CDN

3. **Verify deployment**
   - Test on mobile devices
   - Check service worker
   - Monitor performance

### Deployment Checklist
- [ ] Mobile-optimized build
- [ ] Service worker enabled
- [ ] CDN configured
- [ ] Compression enabled
- [ ] HTTP/2 enabled
- [ ] Performance monitoring

## 🤝 Collaboration

### Git Workflow
1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes**
   - Follow code standards
   - Test on mobile
   - Optimize performance

3. **Submit pull request**
   - Describe changes
   - Include screenshots
   - Test on mobile devices

### Code Review Guidelines
- **Mobile Testing**: Test on mobile devices
- **Performance**: Check bundle size and load time
- **Accessibility**: Ensure touch-friendly interface
- **PWA**: Verify offline functionality

## 📚 Learning Resources

### React & Mobile Development
- [React Documentation](https://reactjs.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [Mobile Performance](https://web.dev/mobile-performance/)

### MAONO-Specific
- [Project Documentation](./README.md)
- [Mobile Optimization Guide](./MOBILE_OPTIMIZATION_GUIDE.md)
- [Performance Monitoring](./PERFORMANCE_GUIDE.md)

## 🎯 Success Metrics

### Development Goals
- **Performance**: < 5s load time on mobile
- **Bundle Size**: < 2MB total
- **Offline**: Full functionality without internet
- **Mobile**: Smooth experience on all devices

### User Experience Goals
- **Farmers**: Easy access to weather and market data
- **Buyers**: Efficient product discovery and purchasing
- **Community**: Seamless communication and knowledge sharing
- **Mobile**: Native app-like experience

---

## 🌱 Welcome to MAONO!

**Building the future of African agriculture, one line of code at a time.**

### Quick Reference
- **Start Development**: `./start-dev.sh`
- **Mobile Build**: `./build-mobile.sh`
- **Performance**: `npm run analyze`
- **Documentation**: `./README.md`

### Support
- **Issues**: Check troubleshooting section
- **Performance**: Use monitoring tools
- **Mobile**: Test on real devices
- **Questions**: Refer to documentation

**Happy coding! 🚀📱🌱**
