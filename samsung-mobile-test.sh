#!/bin/bash

echo "📱 Samsung Mobile Testing for MAONO Platform"
echo "==========================================="

# Configuration
SITE_URL="https://iridescent-druid-560174.netlify.app"
DEVICE_ID=$(adb devices | grep -v "List of devices" | grep -v "^$" | awk '{print $1}')

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔍 Samsung Mobile Testing Setup${NC}"

# Check if device is connected
if [ -z "$DEVICE_ID" ]; then
    echo -e "${RED}❌ No Samsung device connected${NC}"
    echo "Please connect your Samsung phone via USB and enable USB debugging"
    exit 1
fi

echo -e "${GREEN}✅ Samsung device connected: $DEVICE_ID${NC}"

# Get device info
echo -e "${BLUE}📱 Device Information:${NC}"
DEVICE_MODEL=$(adb shell getprop ro.product.model)
DEVICE_BRAND=$(adb shell getprop ro.product.brand)
ANDROID_VERSION=$(adb shell getprop ro.build.version.release)
echo "Model: $DEVICE_MODEL"
echo "Brand: $DEVICE_BRAND"
echo "Android: $ANDROID_VERSION"

# Method 1: Direct browser opening
echo -e "${YELLOW}📱 Method 1: Opening MAONO platform in Samsung browser...${NC}"
adb shell am start -a android.intent.action.VIEW -d "$SITE_URL"
echo -e "${GREEN}✅ MAONO platform opened on your Samsung phone${NC}"

# Method 2: Take screenshot for verification
echo -e "${YELLOW}📱 Method 2: Taking screenshot for verification...${NC}"
adb shell screencap -p /sdcard/maono_test.png
adb pull /sdcard/maono_test.png ./samsung_maono_test.png
echo -e "${GREEN}✅ Screenshot saved as samsung_maono_test.png${NC}"

# Method 3: Check if Samsung DeX is available
echo -e "${YELLOW}📱 Method 3: Checking for Samsung DeX support...${NC}"
DEX_SUPPORT=$(adb shell getprop ro.samsung.device.dex 2>/dev/null)
if [ -n "$DEX_SUPPORT" ]; then
    echo -e "${GREEN}✅ Samsung DeX supported${NC}"
    echo "You can use Samsung DeX for desktop-like experience"
else
    echo -e "${YELLOW}⚠️  Samsung DeX not detected${NC}"
fi

# Method 4: Check for Samsung Flow
echo -e "${YELLOW}📱 Method 4: Checking for Samsung Flow...${NC}"
FLOW_AVAILABLE=$(adb shell pm list packages | grep -i flow)
if [ -n "$FLOW_AVAILABLE" ]; then
    echo -e "${GREEN}✅ Samsung Flow available${NC}"
    echo "You can use Samsung Flow for wireless screen mirroring"
else
    echo -e "${YELLOW}⚠️  Samsung Flow not found${NC}"
fi

# Method 5: Alternative - Samsung Smart Switch
echo -e "${YELLOW}📱 Method 5: Samsung Smart Switch alternatives...${NC}"
echo "For desktop screen mirroring, you can:"
echo "1. Install Samsung Smart Switch on your computer"
echo "2. Use Samsung Flow app on your phone"
echo "3. Use Samsung DeX if supported"

# Create QR code for easy access
echo -e "${BLUE}📱 Creating QR code for easy access...${NC}"
qrencode -t ansiutf8 "$SITE_URL"

echo ""
echo -e "${BLUE}📱 Samsung Mobile Testing Instructions:${NC}"
echo "1. The MAONO platform should now be open on your Samsung phone"
echo "2. Test touch interactions and swipe gestures"
echo "3. Check responsive design on your Samsung screen"
echo "4. Test navigation and presentation flow"
echo "5. Check performance on Samsung's hardware"
echo ""
echo -e "${GREEN}🎯 Site URL: $SITE_URL${NC}"
echo -e "${GREEN}📱 Device: $DEVICE_MODEL ($ANDROID_VERSION)${NC}"
echo -e "${GREEN}📸 Screenshot: samsung_maono_test.png${NC}"
echo ""
echo -e "${YELLOW}💡 Samsung-specific features to test:${NC}"
echo "• Samsung browser compatibility"
echo "• Touch sensitivity on Samsung screen"
echo "• Samsung's gesture navigation"
echo "• Performance on Samsung hardware"
echo "• Battery optimization impact"
