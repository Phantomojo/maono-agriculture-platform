#!/bin/bash

echo "📱 Android Emulator Mobile Testing for MAONO Platform"
echo "====================================================="

# Configuration
SITE_URL="https://iridescent-druid-560174.netlify.app"
AVD_NAME="Medium_Phone_API_36.0"
AVD_PATH="/home/phantomojo/.android/avd/Medium_Phone.avd"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔍 Checking Android emulator setup...${NC}"

# Check if AVD exists
if [ ! -d "$AVD_PATH" ]; then
    echo -e "${RED}❌ AVD not found at $AVD_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found AVD: $AVD_NAME${NC}"

# Method 1: Try to find and launch emulator directly
echo -e "${YELLOW}📱 Method 1: Looking for emulator executable...${NC}"

# Common emulator locations
EMULATOR_PATHS=(
    "/snap/android-studio/current/bin/emulator"
    "/home/phantomojo/Android/Sdk/emulator/emulator"
    "/opt/android-sdk/emulator/emulator"
    "/usr/local/android-sdk/emulator/emulator"
    "/snap/android-studio/current/emulator/emulator"
)

EMULATOR_FOUND=""
for path in "${EMULATOR_PATHS[@]}"; do
    if [ -f "$path" ]; then
        EMULATOR_FOUND="$path"
        echo -e "${GREEN}✅ Found emulator at: $path${NC}"
        break
    fi
done

if [ -n "$EMULATOR_FOUND" ]; then
    echo -e "${BLUE}🚀 Launching Android emulator...${NC}"
    "$EMULATOR_FOUND" -avd "$AVD_NAME" &
    EMULATOR_PID=$!
    echo -e "${GREEN}✅ Emulator started with PID: $EMULATOR_PID${NC}"
    
    # Wait for emulator to boot
    echo -e "${YELLOW}⏳ Waiting for emulator to boot (this may take 2-3 minutes)...${NC}"
    sleep 30
    
    # Try to open the site in the emulator's browser
    echo -e "${BLUE}🌐 Opening MAONO platform in emulator browser...${NC}"
    adb shell am start -a android.intent.action.VIEW -d "$SITE_URL" 2>/dev/null || echo "Could not open browser automatically"
    
else
    echo -e "${YELLOW}⚠️  Emulator executable not found. Trying alternative methods...${NC}"
    
    # Method 2: Use Android Studio to launch emulator
    echo -e "${YELLOW}📱 Method 2: Launching through Android Studio...${NC}"
    android-studio &
    
    echo -e "${BLUE}📋 Manual Instructions:${NC}"
    echo "1. Android Studio should open"
    echo "2. Go to Tools > AVD Manager"
    echo "3. Click the play button next to 'Medium Phone API 36.0'"
    echo "4. Wait for emulator to boot"
    echo "5. Open Chrome browser in the emulator"
    echo "6. Navigate to: $SITE_URL"
fi

echo ""
echo -e "${BLUE}📱 Mobile Testing Checklist:${NC}"
echo "✅ Test touch interactions and swipe gestures"
echo "✅ Check responsive design on 1080x2400 screen"
echo "✅ Verify navigation works on mobile"
echo "✅ Test presentation flow on mobile"
echo "✅ Check performance on mobile hardware"
echo ""
echo -e "${GREEN}🎯 Site URL: $SITE_URL${NC}"
echo -e "${GREEN}📱 Device: Medium Phone (1080x2400, Android 36)${NC}"
echo -e "${GREEN}🔧 AVD: $AVD_NAME${NC}"
