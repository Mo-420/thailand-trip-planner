#!/bin/bash

echo "🚀 Deploying Thailand Trip Planner to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Create gh-pages branch if it doesn't exist
echo "🌿 Setting up gh-pages branch..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy dist contents to root
echo "📁 Copying build files..."
cp -r dist/* .

# Add and commit
echo "💾 Committing changes..."
git add .
git commit -m "Deploy Thailand Trip Planner to GitHub Pages"

# Push to gh-pages branch
echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages

# Switch back to main
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at: https://YOUR_USERNAME.github.io/thailand-trip-planner"
echo "⏰ It may take a few minutes for GitHub Pages to update."
