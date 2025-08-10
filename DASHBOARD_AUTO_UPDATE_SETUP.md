# 🚀 Dashboard Auto-Update Setup Guide

## Overview
Your dashboard now automatically updates **on every commit** to the `main` branch! This replaces the old manual update process with a fully automated CI/CD pipeline.

## What Changed

### 1. **New Comprehensive Script** (`scripts/dashboard-update.js`)
- ✅ **Consolidated all functionality** into one script
- ✅ **Automatically cleans up** old coverage files
- ✅ **Runs tests and generates coverage** reports
- ✅ **Calculates all metrics** (tests, coverage, security, quality)
- ✅ **Updates both** `dashboard-data.json` and `dashboard-history.json`
- ✅ **No functionality lost** - everything from old scripts is preserved

### 2. **Updated GitHub Workflows**
- ✅ **`.github/workflows/dashboard.yml`** - Now triggers automatically on commits
- ✅ **`.github/workflows/ci.yml`** - Uses the new comprehensive script
- ✅ **Automatic triggers** on file changes in `src/`, `tests/`, etc.

### 3. **New NPM Scripts**
```bash
npm run dashboard:update    # Run the comprehensive update
npm run dashboard:full      # Same as above (alias)
```

## How It Works "On Commit"

### 🔄 **Automatic Trigger**
The dashboard workflow now triggers automatically when you:
- Push to `main` branch
- Modify any of these files:
  - `src/**` (source code)
  - `tests/**` (test files)
  - `**/*.test.*` (test files)
  - `**/*.spec.*` (spec files)
  - `vitest.config.*` (test config)
  - `package.json` (dependencies)

### 📊 **What Gets Updated**
1. **Test Results**: Latest test count, coverage percentages
2. **Quality Metrics**: Security scores, linting results
3. **Historical Data**: Trends over time in `dashboard-history.json`
4. **CI/CD Status**: Latest workflow run results

### 🚀 **Workflow Steps**
1. **Checkout** your latest code
2. **Install** dependencies
3. **Run** `npm run dashboard:update` (our comprehensive script)
4. **Check** CI/CD status
5. **Commit & Push** updated dashboard data
6. **Create** summary report

## Setup Requirements

### 1. **GitHub Secrets** (Required)
You need to set up these secrets in your repository:

#### `DASHBOARD_TOKEN` (Required)
- Go to **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
- Name: `DASHBOARD_TOKEN`
- Value: Create a Personal Access Token with `repo` permissions
- This allows the workflow to push dashboard updates

#### `QLTY_COVERAGE_TOKEN` (Optional)
- Only if you use Qlty Cloud for coverage
- Set this if you want coverage uploaded there

### 2. **Branch Protection** (Recommended)
- Ensure `main` branch requires status checks
- This prevents broken code from triggering dashboard updates

## Testing the Setup

### 1. **Test Locally First**
```bash
npm run dashboard:update
```
This should update your local dashboard files.

### 2. **Test the Workflow**
- Make a small change to any source file
- Commit and push to `main`
- Check **Actions** tab in GitHub
- You should see "Update Dashboard (Auto)" running

### 3. **Verify Results**
- Check `public/dashboard-data.json` for latest metrics
- Check `public/dashboard-history.json` for new entry
- Visit your dashboard page to see updates

## Troubleshooting

### ❌ **Workflow Fails to Start**
- Check if you're pushing to `main` branch
- Verify file paths in workflow trigger
- Check GitHub Actions permissions

### ❌ **Permission Denied Errors**
- Ensure `DASHBOARD_TOKEN` secret is set
- Check workflow has `contents: write` permission
- Verify token has `repo` scope

### ❌ **Script Execution Errors**
- Test locally with `npm run dashboard:update`
- Check Node.js version (requires 18+)
- Verify all dependencies are installed

## Benefits of New System

### 🎯 **Automatic Updates**
- No more manual dashboard updates
- Always current metrics
- Historical tracking preserved

### 🔧 **Maintainable**
- Single script to maintain
- No duplicate functionality
- Easy to debug and extend

### 📈 **Comprehensive**
- All metrics in one place
- Consistent data format
- Better error handling

### 🚀 **CI/CD Ready**
- Integrates with GitHub Actions
- Runs on every commit
- Professional workflow

## Next Steps

1. **Set up `DASHBOARD_TOKEN`** secret in GitHub
2. **Make a test commit** to trigger the workflow
3. **Monitor the Actions tab** to see it working
4. **Customize** the workflow if needed

## Support

If you encounter issues:
1. Check the **Actions** tab for error logs
2. Test locally with `npm run dashboard:update`
3. Verify all secrets are properly configured
4. Check file permissions and branch protection rules

---

**🎉 Your dashboard will now update automatically on every commit!** 