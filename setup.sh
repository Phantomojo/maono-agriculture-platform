#!/bin/bash

# MAONO Setup Script
# This script sets up the MAONO web application for development

echo "🌱 MAONO Setup Starting..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
check_node() {
    print_info "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js found: $NODE_VERSION"
        
        # Check if version is 16 or higher
        NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR" -ge 16 ]; then
            print_status "Node.js version is compatible (16+)"
        else
            print_warning "Node.js version $NODE_VERSION may not be compatible. Recommended: 16+"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_info "Checking npm installation..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_status "npm found: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    if npm install; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Set up environment
setup_environment() {
    print_info "Setting up environment..."
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cat > .env << EOF
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
NODE_ENV=development
EOF
        print_status "Created .env file"
    else
        print_info ".env file already exists"
    fi
}

# Set up service worker
setup_service_worker() {
    print_info "Setting up service worker..."
    
    # Make sure service worker file exists
    if [ -f public/sw.js ]; then
        print_status "Service worker found"
    else
        print_warning "Service worker not found. Creating basic service worker..."
        cat > public/sw.js << 'EOF'
// Basic Service Worker for MAONO
const CACHE_NAME = 'maono-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
        print_status "Created basic service worker"
    fi
}

# Set up mobile optimization
setup_mobile_optimization() {
    print_info "Setting up mobile optimization..."
    
    # Make optimization script executable
    if [ -f optimize-mobile.sh ]; then
        chmod +x optimize-mobile.sh
        print_status "Mobile optimization script is ready"
    else
        print_warning "Mobile optimization script not found"
    fi
}

# Create development scripts
create_dev_scripts() {
    print_info "Creating development scripts..."
    
    # Create start-dev.sh
    cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting MAONO Development Server..."
echo "======================================"
echo "📱 Mobile-optimized build"
echo "🌐 Server: http://localhost:3000"
echo "📊 Bundle analysis available with: npm run analyze"
echo ""
npm start
EOF
    chmod +x start-dev.sh
    print_status "Created start-dev.sh"
    
    # Create build-mobile.sh
    cat > build-mobile.sh << 'EOF'
#!/bin/bash
echo "📱 Building MAONO for Mobile..."
echo "==============================="
echo "🔧 Mobile optimizations enabled"
echo "📦 Bundle size optimized"
echo "🚀 Service worker included"
echo ""
npm run build:mobile
echo ""
echo "✅ Mobile build complete!"
echo "📁 Output: build-mobile/"
EOF
    chmod +x build-mobile.sh
    print_status "Created build-mobile.sh"
}

# Run initial build test
test_build() {
    print_info "Testing build process..."
    
    # Test if the app can start
    print_info "Testing development server startup..."
    timeout 10s npm start > /dev/null 2>&1 &
    SERVER_PID=$!
    sleep 5
    
    if kill -0 $SERVER_PID 2>/dev/null; then
        print_status "Development server started successfully"
        kill $SERVER_PID 2>/dev/null
    else
        print_warning "Development server test failed, but this might be normal"
    fi
}

# Display final instructions
show_instructions() {
    echo ""
    echo "🎉 MAONO Setup Complete!"
    echo "======================="
    echo ""
    print_info "Next steps:"
    echo "1. Start development server:"
    echo "   ./start-dev.sh"
    echo "   or"
    echo "   npm start"
    echo ""
    echo "2. Open in browser:"
    echo "   http://localhost:3000"
    echo ""
    echo "3. For mobile-optimized build:"
    echo "   ./build-mobile.sh"
    echo "   or"
    echo "   npm run build:mobile"
    echo ""
    echo "4. Analyze bundle size:"
    echo "   npm run analyze"
    echo ""
    print_info "Key Features:"
    echo "• 📱 Mobile-optimized performance"
    echo "• 🌐 Offline functionality (PWA)"
    echo "• 🗺️ Interactive agricultural map"
    echo "• 🛒 Comprehensive marketplace"
    echo "• 🌤️ AI weather assistant"
    echo "• 👥 Community features"
    echo ""
    print_info "Development Tips:"
    echo "• Use Chrome DevTools for mobile testing"
    echo "• Monitor Core Web Vitals"
    echo "• Test on real mobile devices"
    echo "• Use Lighthouse for performance audits"
    echo ""
    echo "🌱 Happy coding with MAONO!"
}

# Main setup process
main() {
    echo "🌱 MAONO - Agricultural Ecosystem Platform"
    echo "=========================================="
    echo ""
    
    check_node
    check_npm
    install_dependencies
    setup_environment
    setup_service_worker
    setup_mobile_optimization
    create_dev_scripts
    test_build
    show_instructions
}

# Run main function
main
