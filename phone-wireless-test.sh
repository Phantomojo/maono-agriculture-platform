#!/bin/bash

echo "📱 Wireless Phone Testing for MAONO Platform"
echo "============================================="

# Configuration
SITE_URL="https://iridescent-druid-560174.netlify.app"
LOCAL_IP=$(hostname -I | awk '{print $1}')
PORT=3000

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🌐 MAONO Platform Mobile Testing Setup${NC}"
echo ""

# Method 1: Direct URL access
echo -e "${YELLOW}📱 Method 1: Direct URL Access (Recommended)${NC}"
echo -e "${GREEN}✅ Simply open this URL on your phone:${NC}"
echo -e "${BLUE}   $SITE_URL${NC}"
echo ""

# Method 2: Local development server
echo -e "${YELLOW}📱 Method 2: Local Development Server${NC}"
echo "Starting local development server for wireless access..."

# Check if npm is available
if command -v npm &> /dev/null; then
    echo -e "${BLUE}🚀 Starting development server on all interfaces...${NC}"
    echo "This will make the site accessible from your phone on the same network"
    echo ""
    echo -e "${YELLOW}📋 Instructions:${NC}"
    echo "1. Make sure your phone is on the same WiFi network as this computer"
    echo "2. Find your computer's IP address: $LOCAL_IP"
    echo "3. Open your phone's browser and go to: http://$LOCAL_IP:$PORT"
    echo ""
    
    # Start the development server
    echo -e "${GREEN}🚀 Starting npm start with host binding...${NC}"
    HOST=0.0.0.0 PORT=$PORT npm start &
    SERVER_PID=$!
    
    echo -e "${GREEN}✅ Development server started with PID: $SERVER_PID${NC}"
    echo -e "${BLUE}📱 Access from your phone: http://$LOCAL_IP:$PORT${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Note: Press Ctrl+C to stop the server when done testing${NC}"
    
    # Wait for server to start
    sleep 5
    
    echo -e "${BLUE}🔍 Checking if server is running...${NC}"
    if curl -s http://localhost:$PORT > /dev/null; then
        echo -e "${GREEN}✅ Server is running and accessible${NC}"
    else
        echo -e "${RED}❌ Server may not be running yet, please wait a moment${NC}"
    fi
    
else
    echo -e "${RED}❌ npm not found. Please install Node.js and npm first.${NC}"
fi

echo ""
echo -e "${BLUE}📱 Mobile Testing Checklist:${NC}"
echo "✅ Test touch interactions and swipe gestures"
echo "✅ Check responsive design on your phone screen"
echo "✅ Verify navigation works on mobile"
echo "✅ Test presentation flow on mobile"
echo "✅ Check performance on mobile network"
echo "✅ Test on different phone orientations"
echo ""
echo -e "${GREEN}🎯 Direct URL: $SITE_URL${NC}"
echo -e "${GREEN}🏠 Local URL: http://$LOCAL_IP:$PORT${NC}"
echo -e "${GREEN}📱 Your phone should be on the same WiFi network${NC}"
