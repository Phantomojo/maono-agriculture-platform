#!/bin/bash

echo "📱 scrcpy Mobile Testing for MAONO Platform"
echo "==========================================="

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

echo -e "${BLUE}🔍 Checking scrcpy setup...${NC}"

# Check if scrcpy is installed
if ! command -v scrcpy &> /dev/null; then
    echo -e "${RED}❌ scrcpy not found. Installing...${NC}"
    sudo apt update && sudo apt install -y scrcpy
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install scrcpy${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ scrcpy is installed${NC}"

# Check for connected devices
echo -e "${BLUE}🔍 Checking for connected Android devices...${NC}"
adb devices

# Check if any devices are connected
DEVICES=$(adb devices | grep -v "List of devices" | grep -v "^$" | wc -l)
if [ "$DEVICES" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No Android devices detected.${NC}"
    echo -e "${BLUE}📋 Setup Instructions:${NC}"
    echo "1. Enable Developer Options on your phone:"
    echo "   - Go to Settings > About Phone"
    echo "   - Tap 'Build Number' 7 times"
    echo "2. Enable USB Debugging:"
    echo "   - Go to Settings > Developer Options"
    echo "   - Enable 'USB Debugging'"
    echo "3. Connect your phone via USB cable"
    echo "4. Allow USB debugging when prompted on your phone"
    echo ""
    echo -e "${BLUE}📱 Alternative: Wireless ADB (if supported)${NC}"
    echo "1. Connect phone via USB first"
    echo "2. Run: adb tcpip 5555"
    echo "3. Disconnect USB and run: adb connect YOUR_PHONE_IP:5555"
    echo ""
    echo -e "${GREEN}🎯 Once connected, run this script again!${NC}"
    exit 0
fi

echo -e "${GREEN}✅ Android device detected${NC}"

# Create QR code for easy access
echo -e "${BLUE}📱 Creating QR code for MAONO platform...${NC}"
qrencode -t ansiutf8 "$SITE_URL"

echo ""
echo -e "${BLUE}🚀 Starting scrcpy with MAONO testing setup...${NC}"

# Start scrcpy with optimized settings for testing
scrcpy \
    --window-title "MAONO Platform - Mobile Testing" \
    --max-size 1080 \
    --bit-rate 8M \
    --max-fps 30 \
    --turn-screen-off \
    --stay-awake \
    --disable-screensaver &

SCRCPY_PID=$!
echo -e "${GREEN}✅ scrcpy started with PID: $SCRCPY_PID${NC}"

# Wait a moment for scrcpy to initialize
sleep 3

# Open the MAONO platform on the phone
echo -e "${BLUE}🌐 Opening MAONO platform on your phone...${NC}"
adb shell am start -a android.intent.action.VIEW -d "$SITE_URL" 2>/dev/null || {
    echo -e "${YELLOW}⚠️  Could not open browser automatically. Please:${NC}"
    echo "1. Open your phone's browser manually"
    echo "2. Navigate to: $SITE_URL"
    echo "3. Or scan the QR code above"
}

echo ""
echo -e "${BLUE}📱 Mobile Testing with scrcpy:${NC}"
echo -e "${GREEN}✅ Phone screen is now mirrored on your computer${NC}"
echo -e "${GREEN}✅ You can control your phone from the computer${NC}"
echo -e "${GREEN}✅ Test touch interactions, swipe gestures, and navigation${NC}"
echo ""
echo -e "${YELLOW}📋 Testing Checklist:${NC}"
echo "✅ Test touch interactions and swipe gestures"
echo "✅ Check responsive design on phone screen"
echo "✅ Verify navigation works on mobile"
echo "✅ Test presentation flow on mobile"
echo "✅ Check performance on mobile network"
echo "✅ Test on different phone orientations"
echo ""
echo -e "${BLUE}🎯 Site URL: $SITE_URL${NC}"
echo -e "${BLUE}📱 Local IP: $LOCAL_IP (for local development)${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "- Use mouse to simulate touch on the mirrored screen"
echo "- Test swipe gestures by dragging on the screen"
echo "- Check how the site responds to phone rotation"
echo "- Test the presentation flow and navigation"
echo ""
echo -e "${RED}⚠️  Press Ctrl+C to stop scrcpy when done testing${NC}"

# Keep the script running
wait $SCRCPY_PID
