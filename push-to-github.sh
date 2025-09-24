#!/bin/bash

# MAONO GitHub Push Script
echo "🌱 MAONO GitHub Push Setup"
echo "=========================="
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

# Get repository URL from user
echo "Please provide your GitHub repository URL:"
echo "Example: https://github.com/yourusername/MAONO.git"
echo ""
read -p "GitHub repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No repository URL provided. Exiting."
    exit 1
fi

print_step "Setting up remote repository..."

# Add remote origin
git remote add origin $REPO_URL

# Push main branch
print_step "Pushing main branch..."
git checkout master
git push -u origin master

# Push development branch
print_step "Pushing development branch..."
git checkout development
git push -u origin development

print_success "Repository pushed to GitHub!"
echo ""
print_info "Your MAONO repository is now available at:"
echo "🔗 $REPO_URL"
echo ""
print_info "Next steps:"
echo "1. Share the repository URL with your team"
echo "2. Team members can clone with:"
echo "   git clone $REPO_URL"
echo "3. Team members can start development with:"
echo "   cd MAONO && ./setup.sh && ./quick-start.sh"
echo ""
print_success "MAONO is ready for team collaboration! 🚀📱🌱"
