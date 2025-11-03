#!/bin/bash

# MegaHub Deployment Script
# This script builds both frontend and backend for production

set -e  # Exit on error

echo "🚀 Starting MegaHub deployment build..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Install root dependencies (if any)
echo -e "${BLUE}📦 Installing root dependencies...${NC}"
npm install || true
echo ""

# Step 2: Build Frontend
echo -e "${BLUE}🎨 Building frontend...${NC}"
cd frontend
echo "Installing frontend dependencies (including dev dependencies)..."
npm ci --include=dev || npm install --include=dev
echo "Building frontend (production mode - skipping TypeScript check)..."
npm run build:prod
cd ..
echo -e "${GREEN}✅ Frontend build complete!${NC}"
echo ""

# Step 3: Build Backend
echo -e "${BLUE}⚙️  Building backend...${NC}"
cd backend
echo "Installing backend dependencies..."
npm ci || npm install
echo "Building backend..."
npm run build
cd ..
echo -e "${GREEN}✅ Backend build complete!${NC}"
echo ""

echo -e "${GREEN}🎉 Deployment build successful!${NC}"
echo ""
echo "📝 Next steps:"
echo "   1. Commit and push to your repository"
echo "   2. Deploy to Render with:"
echo "      - Build Command: bash deploy.sh"
echo "      - Start Command: cd backend && npm start"
echo ""
echo "🌐 Your app will be available at your Render URL"
