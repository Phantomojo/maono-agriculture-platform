#!/bin/bash

# MAONO Quick Start Script
# For team members to get up and running quickly

echo "🌱 MAONO Quick Start"
echo "==================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if setup has been run
if [ ! -f "node_modules" ]; then
    print_step "First time setup detected. Running full setup..."
    ./setup.sh
    echo ""
fi

print_step "Starting MAONO development server..."
echo ""

print_info "🌐 Server will be available at: http://localhost:3000"
print_info "📱 Mobile testing: Use Chrome DevTools (F12) > Device Toggle"
print_info "🔧 Mobile build: ./build-mobile.sh"
print_info "📊 Bundle analysis: npm run analyze"
echo ""

print_info "Key Features:"
echo "• 🗺️ Interactive agricultural map"
echo "• 🛒 Comprehensive marketplace"
echo "• 🌤️ AI weather assistant"
echo "• 👥 Community features"
echo "• 📱 Mobile-optimized PWA"
echo ""

print_info "Development Tips:"
echo "• Test on mobile devices"
echo "• Monitor performance with Lighthouse"
echo "• Use Chrome DevTools for debugging"
echo "• Check offline functionality"
echo ""

print_success "Starting development server..."
echo ""

# Start the development server
npm start
