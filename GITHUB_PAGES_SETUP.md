# GitHub Pages Setup Guide

## Manual Setup (if workflow doesn't work)

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: `https://github.com/shahharsh06/harsh-portfolio`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 2. Verify Repository Settings

- **Repository name**: `harsh-portfolio`
- **Branch**: `main`
- **Folder**: `/ (root)`

### 3. Check Build Output

The build should create files in `dist/production/` with the correct base path `/harsh-portfolio/`.

### 4. Common Issues & Solutions

#### Issue: 404 Error
- **Cause**: GitHub Pages not enabled or wrong source branch
- **Solution**: Enable GitHub Pages and select correct source

#### Issue: Assets not loading
- **Cause**: Wrong base path in Vite config
- **Solution**: Ensure `base: '/harsh-portfolio/'` in vite.config.ts

#### Issue: Build fails
- **Cause**: Dependencies or build errors
- **Solution**: Run `npm run build` locally to check for errors

### 5. Test Locally

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Check if files exist
ls dist/production/
```

### 6. Force Rebuild

If changes don't appear:
1. Make a small change to any file
2. Commit and push
3. Check GitHub Actions tab for deployment status

### 7. Check Deployment Status

- Go to **Actions** tab in your repository
- Look for "Deploy to GitHub Pages" workflow
- Check if it completed successfully

## Current Configuration

- **Base Path**: `/harsh-portfolio/`
- **Build Output**: `dist/production/`
- **Entry Point**: `index.html`
- **404 Page**: Custom 404.html with redirect

## Support

If issues persist, check:
1. GitHub Actions logs for errors
2. Repository settings for Pages configuration
3. Build output for missing files
4. Browser console for JavaScript errors 