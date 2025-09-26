#!/bin/bash

# MAONO Platform - Complete Netlify CLI Deployment Script
# Handles authentication, site linking, and deployment

echo "🚀 MAONO Platform - Complete Netlify CLI Deployment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in the correct directory. Please run from maono-agricultural-platform folder"
    exit 1
fi

print_status "Starting MAONO platform deployment..."

# Step 1: Check and build the project
print_status "Checking build directory..."
if [ ! -d "build" ]; then
    print_status "Building the project..."
    npm run build
    if [ $? -ne 0 ]; then
        print_error "Build failed. Please fix errors and try again."
        exit 1
    fi
    print_success "Build completed successfully"
else
    print_success "Build directory found"
fi

# Step 2: Check Netlify CLI authentication
print_status "Checking Netlify authentication..."
npx netlify-cli status > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_warning "Not authenticated with Netlify. Starting authentication..."
    npx netlify-cli login
    if [ $? -ne 0 ]; then
        print_error "Authentication failed. Please try again."
        exit 1
    fi
    print_success "Authentication successful"
else
    print_success "Already authenticated with Netlify"
fi

# Step 3: Check if site is linked
print_status "Checking for linked site..."
if [ -f ".netlify/state.json" ]; then
    print_success "Site is already linked"
    SITE_NAME=$(npx netlify-cli status | grep "Site name" | cut -d: -f2 | xargs)
    print_status "Linked to site: $SITE_NAME"
else
    print_warning "No linked site found. You can:"
    echo "1. Link to existing site: npx netlify-cli link"
    echo "2. Create new site: npx netlify-cli sites:create"
    echo "3. Deploy without linking (will create new site)"
    read -p "Do you want to link to an existing site? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npx netlify-cli link
    fi
fi

# Step 4: Deploy to Netlify
print_status "Deploying to Netlify..."
npx netlify-cli deploy --prod --dir=build

if [ $? -eq 0 ]; then
    print_success "🎉 Deployment successful!"
    print_success "🌐 Your MAONO platform is now live!"
    print_status "📊 Check your Netlify dashboard for deployment details"
    
    # Get the deployment URL
    DEPLOY_URL=$(npx netlify-cli status | grep "Website URL" | cut -d: -f2 | xargs)
    if [ ! -z "$DEPLOY_URL" ]; then
        print_success "🔗 Live URL: $DEPLOY_URL"
    fi
else
    print_error "Deployment failed. Check the error messages above."
    print_status "💡 Try running: npx netlify-cli login"
    exit 1
fi

