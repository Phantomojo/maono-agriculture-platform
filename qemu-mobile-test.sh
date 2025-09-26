#!/bin/bash

echo "📱 QEMU Mobile Testing for MAONO Platform"
echo "=========================================="

# Configuration
SITE_URL="https://iridescent-druid-560174.netlify.app"
QEMU_MEMORY="2048"
QEMU_DISPLAY=":1"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🌐 Opening MAONO platform in mobile emulation mode...${NC}"

# Method 1: Chrome with mobile user agent
echo -e "${YELLOW}📱 Method 1: Chrome with mobile user agent${NC}"
google-chrome \
  --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1" \
  --window-size=375,667 \
  --new-window \
  "$SITE_URL" &

echo -e "${GREEN}✅ Mobile Chrome emulation started${NC}"

# Method 2: Firefox with mobile user agent
echo -e "${YELLOW}📱 Method 2: Firefox with mobile user agent${NC}"
firefox \
  --new-window \
  --width=375 \
  --height=667 \
  "$SITE_URL" &

echo -e "${GREEN}✅ Mobile Firefox emulation started${NC}"

# Method 3: QEMU with lightweight Linux (if available)
echo -e "${YELLOW}📱 Method 3: QEMU mobile emulation (if system available)${NC}"

# Check if we have a lightweight Linux image
if [ -f "/usr/share/qemu/pxe-boot.img" ]; then
    echo "Starting QEMU with PXE boot for mobile testing..."
    qemu-system-x86_64 \
        -m $QEMU_MEMORY \
        -netdev user,id=net0 \
        -device e1000,netdev=net0 \
        -display gtk \
        -boot n \
        -netdev user,id=net1,hostfwd=tcp::8080-:80 \
        -device e1000,netdev=net1 &
    
    echo -e "${GREEN}✅ QEMU mobile emulation started${NC}"
    echo "Access the site at: http://localhost:8080"
else
    echo -e "${YELLOW}⚠️  No QEMU system image found. Using browser emulation instead.${NC}"
fi

echo ""
echo -e "${BLUE}📱 Mobile Testing Instructions:${NC}"
echo "1. Test touch interactions and swipe gestures"
echo "2. Check responsive design on different screen sizes"
echo "3. Verify navigation works on mobile"
echo "4. Test presentation flow on mobile"
echo ""
echo -e "${GREEN}🎯 Site URL: $SITE_URL${NC}"
echo -e "${GREEN}📱 Mobile User Agent: iPhone Safari${NC}"
echo -e "${GREEN}📐 Screen Size: 375x667 (iPhone SE)${NC}"
