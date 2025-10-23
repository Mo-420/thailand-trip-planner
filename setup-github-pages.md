# GitHub Pages Setup Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `thailand-trip-planner`
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README (we already have files)
5. Click "Create repository"

## Step 2: Push Your Code
After creating the repository, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/thailand-trip-planner.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Source: "GitHub Actions"
5. The workflow will automatically deploy your site

## Step 4: Your Public URL
Your app will be available at:
`https://YOUR_USERNAME.github.io/thailand-trip-planner`

## Alternative: Manual Deploy
If you prefer manual deployment, you can also:
1. Go to repository Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. Folder: "/ (root)"

Then run:
```bash
npm run build
git checkout -b gh-pages
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```
