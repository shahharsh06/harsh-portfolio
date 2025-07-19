# GitHub Pages Deployment Guide

## 🚀 Current Setup Status

Your portfolio is already configured for GitHub Pages deployment at:
**https://shahharsh06.github.io/harsh-portfolio**

## ✅ What's Already Configured

### 1. GitHub Actions Workflows
- **CI/CD Pipeline** (`.github/workflows/ci.yml`)
  - ✅ Automated testing with coverage
  - ✅ Linting and security audits
  - ✅ Build verification
  - ✅ Coverage reporting

- **Deployment Pipeline** (`.github/workflows/deploy.yml`)
  - ✅ Automatic deployment on push to main
  - ✅ GitHub Pages deployment
  - ✅ Build optimization

### 2. Build Configuration
- **Vite Config** - Optimized for production builds
- **Package.json** - Proper build scripts
- **Output Directory** - `dist/` folder for deployment

### 3. Repository Settings
- **GitHub Pages** - Configured to deploy from GitHub Actions
- **Branch Protection** - Main branch protected
- **Workflow Permissions** - Proper permissions set

## 🎯 Deployment Process

### Automatic Deployment
1. **Push to Main Branch** → Triggers deployment
2. **GitHub Actions** → Runs tests, builds, and deploys
3. **GitHub Pages** → Serves your site at the URL

### Manual Deployment
```bash
# Build locally
npm run build

# Push to trigger deployment
git add .
git commit -m "Update portfolio"
git push origin main
```

## 🔧 GitHub Repository Settings

### 1. Enable GitHub Pages
1. Go to your repository: `https://github.com/shahharsh06/harsh-portfolio`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Configure Branch Protection (Recommended)
1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

### 3. Workflow Permissions
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

## 📊 Monitoring Deployment

### 1. Check Workflow Status
- Go to **Actions** tab in your repository
- Monitor the **CI/CD Pipeline** and **Deploy to GitHub Pages** workflows
- Green checkmarks = successful deployment

### 2. View Deployment Logs
- Click on any workflow run
- Check the **deploy** job logs
- Look for any errors or warnings

### 3. Test Your Site
- Visit: `https://shahharsh06.github.io/harsh-portfolio`
- Check all pages and functionality
- Test on different devices

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build locally
npm run build

# Check for errors in:
# - vite.config.ts
# - package.json scripts
# - Import statements
```

#### 2. 404 Errors
- Ensure `dist/index.html` exists
- Check Vite base path configuration
- Verify GitHub Pages source is set to GitHub Actions

#### 3. Assets Not Loading
- Check file paths in `dist/` folder
- Ensure assets are in `public/` directory
- Verify relative paths in components

#### 4. Workflow Failures
- Check GitHub Actions logs
- Verify Node.js version compatibility
- Ensure all dependencies are in `package.json`

### Debug Commands
```bash
# Test build locally
npm run build

# Check dist folder
ls -la dist/

# Test preview
npm run preview

# Check for linting issues
npm run lint

# Run tests
npm run test
```

## 🎨 Custom Domain Setup (Optional)

### 1. Buy a Domain
- Purchase from: Namecheap, GoDaddy, Google Domains, etc.
- Example: `harshshah.dev` or `harsh-portfolio.com`

### 2. Configure DNS
Add these records to your domain provider:
```
Type: CNAME
Name: @
Value: shahharsh06.github.io
```

### 3. Update GitHub Settings
1. Go to repository **Settings** → **Pages**
2. Add your custom domain
3. Enable **Enforce HTTPS**

### 4. Update Portfolio Links
Update your portfolio to use the custom domain:
```typescript
// src/lib/constants.ts
export const SITE_URL = 'https://yourdomain.com';
```

## 📈 Performance Optimization

### 1. Build Optimization
- ✅ Vite is already optimized
- ✅ Tree shaking enabled
- ✅ Code splitting configured
- ✅ Asset optimization

### 2. GitHub Pages Optimization
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Compression enabled
- ✅ Caching headers

### 3. Monitor Performance
- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals
- Monitor loading times

## 🔄 Continuous Deployment

### Current Workflow
```yaml
# Triggers on every push to main
on:
  push:
    branches: [ main ]
```

### Deployment Steps
1. **Code Push** → Triggers workflow
2. **Install Dependencies** → `npm ci`
3. **Run Tests** → Coverage and linting
4. **Build Application** → `npm run build`
5. **Deploy to Pages** → Upload to GitHub Pages
6. **Live Site** → Available at your URL

## 📱 Mobile Optimization

### Responsive Design
- ✅ Tailwind CSS responsive classes
- ✅ Mobile-first approach
- ✅ Touch-friendly interactions
- ✅ Optimized images

### Testing
- Test on various devices
- Check mobile navigation
- Verify touch interactions
- Test loading performance

## 🎯 Next Steps

### Immediate Actions
1. ✅ Push your latest changes
2. ✅ Monitor GitHub Actions
3. ✅ Test the live site
4. ✅ Share your portfolio URL

### Future Enhancements
1. **Custom Domain** - Professional branding
2. **Analytics** - Track visitors
3. **SEO Optimization** - Better search rankings
4. **Performance Monitoring** - Track Core Web Vitals

## 🚀 Your Portfolio is Live!

**URL**: https://shahharsh06.github.io/harsh-portfolio

**Features**:
- ✅ Professional design
- ✅ Responsive layout
- ✅ Fast loading
- ✅ SEO optimized
- ✅ Accessibility compliant
- ✅ Modern tech stack
- ✅ CI/CD pipeline
- ✅ Test coverage
- ✅ Dashboard integration

---

**Congratulations! Your portfolio is now professionally deployed and ready to showcase your skills!** 🎉 