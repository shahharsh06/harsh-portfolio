# Migration Guide: GitHub Pages to Vercel

## Why Consider Vercel?

Vercel offers several advantages for React portfolios:
- **Better Performance**: Optimized for React applications
- **Preview Deployments**: Test changes before going live
- **Edge Functions**: Add serverless API endpoints
- **Analytics**: Built-in performance monitoring
- **Environment Variables**: Easy configuration management

## Migration Steps

### 1. Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Import your `harsh-portfolio` repository

### 2. Configure Build Settings
Vercel will auto-detect your React app, but verify these settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### 3. Environment Variables (if needed)
Add any environment variables in Vercel dashboard:
- `VITE_API_URL`
- `VITE_ANALYTICS_ID`

### 4. Custom Domain (Optional)
1. Go to your domain registrar
2. Add CNAME record pointing to Vercel
3. Configure in Vercel dashboard

### 5. Update GitHub Actions (Optional)
You can keep GitHub Actions for testing but use Vercel for deployment:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint
```

## Benefits After Migration

### Performance Improvements
- **Faster Loading**: Vercel's edge network
- **Better Caching**: Automatic static asset optimization
- **Image Optimization**: Automatic image compression

### Developer Experience
- **Preview URLs**: Test changes before merging
- **Instant Deployments**: Deploy on every push
- **Rollback**: Easy rollback to previous versions

### Analytics & Monitoring
- **Core Web Vitals**: Built-in performance metrics
- **Error Tracking**: Automatic error monitoring
- **Real-time Analytics**: Live visitor statistics

## Keep GitHub Pages as Backup

You can maintain both:
1. **Vercel**: Primary hosting with custom domain
2. **GitHub Pages**: Backup at `username.github.io/repo`

## Migration Checklist

- [ ] Sign up for Vercel
- [ ] Import repository
- [ ] Configure build settings
- [ ] Test deployment
- [ ] Set up custom domain (optional)
- [ ] Update documentation
- [ ] Test all functionality
- [ ] Update links in portfolio

## Rollback Plan

If you need to rollback:
1. Keep GitHub Pages workflow active
2. Simply push to main branch
3. GitHub Pages will redeploy automatically

---

**Note**: Your current GitHub Pages setup is excellent and doesn't need to be changed unless you want additional features like serverless functions or better analytics. 