#!/usr/bin/env bash
# Exit on error
set -e

# Set Render environment variable
export RENDER=true

# Go to the project root
cd /opt/render/project/src

# Install dependencies
npm install

# Rebuild bcrypt specifically
cd apps/backend
npm rebuild bcrypt --build-from-source

# Build the application
cd ../..
npm run backend:build

# Output success message
echo "Build completed successfully!" 