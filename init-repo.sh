#!/bin/bash

# MAONO Repository Initialization
echo "🌱 MAONO Repository Setup"
echo "========================="
echo ""

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📋 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📋 Creating .gitignore file..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
build/
build-mobile/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test
EOF
    echo "✅ .gitignore created"
else
    echo "ℹ️  .gitignore already exists"
fi

# Create directories
echo "📋 Creating project directories..."
mkdir -p screenshots
mkdir -p docs
mkdir -p docs/development
mkdir -p docs/deployment
mkdir -p docs/user-guide
mkdir -p team
mkdir -p scripts
echo "✅ Project directories created"

# Create initial commit
echo "📋 Creating initial commit..."
git add .
git commit -m "🌱 Initial MAONO repository setup

- Added comprehensive documentation
- Created setup and development scripts
- Configured mobile optimization
- Added team collaboration guides
- Set up deployment documentation

Features:
- Interactive agricultural map
- Comprehensive marketplace
- AI weather assistant
- Mobile-optimized PWA
- Offline functionality

Ready for team development! 🚀"
echo "✅ Initial commit created"

# Create development branch
echo "📋 Creating development branch..."
git checkout -b development
echo "✅ Development branch created"

# Display final instructions
echo ""
echo "🎉 MAONO Repository Setup Complete!"
echo "===================================="
echo ""
echo "✅ Repository structure created"
echo "✅ Documentation added"
echo "✅ Development scripts ready"
echo "✅ Team collaboration setup"
echo ""
echo "📋 Next steps:"
echo "1. Push to remote repository:"
echo "   git remote add origin <repository-url>"
echo "   git push -u origin main"
echo "   git push -u origin development"
echo ""
echo "2. Share with team:"
echo "   - Repository URL"
echo "   - Setup instructions"
echo "   - Team guide"
echo ""
echo "3. Start development:"
echo "   ./quick-start.sh"
echo ""
echo "🌱 Ready for team development!"
echo "Happy coding! 🚀📱🌱"
