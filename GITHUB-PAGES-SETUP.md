# GitHub Pages Deployment Guide

## 🎯 Current Status

Your portfolio is already configured for GitHub Pages deployment at:
**https://shahharsh06.github.io/harsh-portfolio**

## ✅ What's Already Set Up

### 1. GitHub Actions Workflow
- ✅ **Deploy Workflow**: `.github/workflows/deploy.yml`
- ✅ **Automatic Deployment**: Deploys on every push to main branch
- ✅ **Build Process**: Uses Vite to build your React app
- ✅ **Artifact Upload**: Uploads built files to GitHub Pages

### 2. Build Configuration
- ✅ **Vite Config**: Properly configured for production builds
- ✅ **Output Directory**: Builds to `dist/` folder
- ✅ **Asset Optimization**: Images and CSS are optimized
- ✅ **Bundle Size**: Optimized JavaScript bundle (450KB → 143KB gzipped)

### 3. Repository Structure
- ✅ **Public Assets**: Images and PDFs in `public/` folder
- ✅ **Source Code**: React components in `src/` folder
- ✅ **Build Output**: Generated in `dist/` folder

## 🚀 How to Deploy

### Method 1: Automatic Deployment (Recommended)
1. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **GitHub Actions Will**:
   - ✅ Install dependencies
   - ✅ Run tests
   - ✅ Build the project
   - ✅ Deploy to GitHub Pages
   - ✅ Update your site automatically

### Method 2: Manual Deployment
1. **Build Locally**:
   ```bash
   npm run build
   ```

2. **Push Build Files**:
   ```bash
   git add dist/
   git commit -m "Update build"
   git push origin main
   ```

## 🔧 GitHub Pages Configuration

### Repository Settings
1. Go to your repository: `https://github.com/shahharsh06/harsh-portfolio`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Ensure settings are:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (created by GitHub Actions)
   - **Folder**: `/ (root)`

### Custom Domain (Optional)
To use a custom domain like `harshshah.dev`:
1. **Buy Domain**: Purchase from Namecheap, GoDaddy, etc.
2. **Add CNAME**: Create CNAME record pointing to `shahharsh06.github.io`
3. **Configure in GitHub**:
   - Go to repository Settings → Pages
   - Add custom domain
   - Enable HTTPS

## 📊 Monitoring Deployment

### Check GitHub Actions
1. Go to **Actions** tab in your repository
2. Look for **Deploy to GitHub Pages** workflow
3. Check for ✅ green checkmarks

### Check Deployment Status
1. Go to **Settings** → **Pages**
2. Look for **"Your site is live at"** message
3. Check deployment history

### Test Your Site
- **Main Site**: https://shahharsh06.github.io/harsh-portfolio
- **Dashboard**: https://shahharsh06.github.io/harsh-portfolio/dashboard.html

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Fails
**Error**: "Build step failed"
**Solution**:
```bash
# Test build locally
npm run build

# Check for errors
npm run lint
```

#### 2. Assets Not Loading
**Error**: Images or CSS not loading
**Solution**:
- Ensure assets are in `public/` folder
- Check file paths in components
- Verify build output in `dist/` folder

#### 3. 404 Errors
**Error**: Pages not found
**Solution**:
- Check React Router configuration
- Ensure `basename` is set correctly for GitHub Pages
- Add `404.html` redirect for SPA

#### 4. Slow Loading
**Issue**: Site loads slowly
**Solutions**:
- Optimize images (already done)
- Enable gzip compression
- Use CDN for assets

### Performance Optimization

#### 1. Image Optimization
```bash
# Your images are already optimized:
# harsh_profile_image.jpg: 991KB (good for high-quality photo)
# Harsh_SE_Resume.pdf: 186KB (reasonable for PDF)
```

#### 2. Bundle Optimization
```bash
# Current bundle sizes:
# CSS: 35KB → 6.5KB gzipped ✅
# JS: 450KB → 143KB gzipped ✅
```

#### 3. Caching Strategy
- Static assets cached for 1 year
- HTML files cached for 1 hour
- API responses cached appropriately

## 🔄 Update Process

### Regular Updates
1. **Make Changes**: Edit your code
2. **Test Locally**: `npm run dev`
3. **Build Test**: `npm run build`
4. **Commit & Push**: 
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
5. **Wait 2-3 minutes** for deployment
6. **Check Site**: Visit your live site

### Content Updates
- **Profile Info**: Edit `src/lib/constants.ts`
- **Projects**: Edit `src/data/projects.ts`
- **Skills**: Edit `src/components/Skills.tsx`
- **Styling**: Edit `src/index.css` or component files

## 📈 Analytics & Monitoring

### GitHub Analytics
- **Traffic**: Repository Insights → Traffic
- **Deployments**: Actions tab → Deploy workflow
- **Performance**: GitHub Pages analytics

### External Analytics
Consider adding:
- **Google Analytics**: Track visitors
- **Vercel Analytics**: Performance monitoring
- **Hotjar**: User behavior analysis

## 🎯 Best Practices

### 1. Regular Maintenance
- ✅ Keep dependencies updated
- ✅ Monitor build times
- ✅ Check for broken links
- ✅ Test on different devices

### 2. Performance
- ✅ Optimize images
- ✅ Minimize bundle size
- ✅ Use lazy loading
- ✅ Enable compression

### 3. SEO
- ✅ Add meta tags
- ✅ Use semantic HTML
- ✅ Optimize for mobile
- ✅ Add sitemap

## 🚀 Next Steps

### Immediate Actions
1. **Test Current Deployment**: Visit your live site
2. **Check Mobile View**: Test on phone/tablet
3. **Verify Links**: Ensure all links work
4. **Test Contact Form**: Verify form functionality

### Future Enhancements
1. **Custom Domain**: Buy `harshshah.dev`
2. **Analytics**: Add Google Analytics
3. **Performance**: Implement lazy loading
4. **SEO**: Add meta tags and sitemap

## 📞 Support

If you encounter issues:
1. **Check GitHub Actions**: Look for error messages
2. **Test Locally**: Run `npm run build` and `npm run preview`
3. **Check Console**: Browser developer tools for errors
4. **Review Logs**: GitHub Actions workflow logs

---

**Your portfolio is live at**: https://shahharsh06.github.io/harsh-portfolio

**Dashboard**: https://shahharsh06.github.io/harsh-portfolio/dashboard.html 