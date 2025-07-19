# CI/CD Pipeline Setup Guide

## 🚀 Overview

This repository includes a comprehensive CI/CD pipeline that automates testing, coverage reporting, security auditing, and deployment to GitHub Pages.

## 📋 Pipeline Components

### 1. **Main CI Pipeline** (`.github/workflows/ci.yml`)
- **Triggers**: Push to main/develop, Pull Requests
- **Jobs**:
  - **Test & Coverage**: Runs tests and generates coverage reports
  - **Build**: Builds the application
  - **Security**: Performs security audits

### 2. **Deployment Pipeline** (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main, Manual dispatch
- **Job**: Deploys to GitHub Pages

### 3. **Coverage Badge Pipeline** (`.github/workflows/coverage-badge.yml`)
- **Triggers**: Push to main/develop, Pull Requests, Manual dispatch
- **Job**: Updates coverage badge in README

## 🔧 Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"

### Step 2: Configure Repository Secrets (Optional)

For enhanced features, add these secrets to your repository:

```bash
# For coverage badge updates (optional)
GIST_SECRET=your_github_token
GIST_ID=your_gist_id

# For security scanning (optional)
SNYK_TOKEN=your_snyk_token
```

### Step 3: Enable GitHub Actions

1. Go to "Actions" tab in your repository
2. The workflows will automatically run on push/PR

## 📊 Coverage Reporting

### Coverage Reports Generated
- **Text Report**: Console output during CI
- **HTML Report**: Detailed coverage in `coverage/` directory
- **LCOV Report**: For external tools integration
- **JSON Report**: For programmatic access

### Coverage Badge
- Automatically updates in README
- Color-coded based on coverage percentage:
  - 🟢 **Green**: 80%+ coverage
  - 🟡 **Yellow**: 60-79% coverage
  - 🔴 **Red**: <60% coverage

### Coverage Thresholds
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## 🔒 Security Features

### Security Audits
- **npm audit**: Checks for known vulnerabilities
- **Severity Levels**: Moderate and above
- **Fail on High**: Pipeline fails if high severity issues found

### Security Best Practices
- Dependency scanning
- Vulnerability reporting
- Automated security checks

## 🚀 Deployment

### GitHub Pages Deployment
- **Automatic**: On push to main branch
- **Manual**: Via workflow dispatch
- **Concurrent**: Prevents overlapping deployments

### Deployment Process
1. Build application (`npm run build`)
2. Upload to GitHub Pages
3. Deploy to live site

## 📈 Pipeline Metrics

### Performance Metrics
- **Build Time**: ~2-3 minutes
- **Test Time**: ~10-15 seconds
- **Deployment Time**: ~1-2 minutes

### Coverage Metrics
- **Current Coverage**: 13.54%
- **Target Coverage**: 80%+
- **Test Count**: 62 tests

## 🛠️ Workflow Commands

### Manual Triggers
```bash
# Trigger deployment manually
gh workflow run deploy.yml

# Trigger coverage badge update
gh workflow run coverage-badge.yml

# Trigger full CI pipeline
gh workflow run ci.yml
```

### Local Testing
```bash
# Run tests with coverage
npm run test:coverage

# Run tests without coverage
npm run test:run

# Run linting
npm run lint

# Build application
npm run build
```

## 📝 Pipeline Outputs

### Artifacts Generated
- **Coverage Reports**: Available for 30 days
- **Build Files**: Available for 7 days
- **Test Results**: Available for 30 days

### PR Comments
- Coverage summary on pull requests
- Security audit results
- Build status updates

## 🔧 Customization

### Environment Variables
```yaml
env:
  NODE_VERSION: '18'  # Change Node.js version
```

### Coverage Configuration
```yaml
# In vitest.config.ts
coverage: {
  thresholds: {
    branches: 80,    # Adjust coverage thresholds
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### Deployment Settings
```yaml
# In .github/workflows/deploy.yml
on:
  push:
    branches: [ main ]  # Change deployment branch
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Coverage Reports Not Generated**
```bash
# Check if coverage directory exists
ls -la coverage/

# Run coverage locally
npm run test:coverage
```

#### 2. **Deployment Fails**
- Check GitHub Pages settings
- Verify repository permissions
- Check build output

#### 3. **Security Audit Fails**
```bash
# Run audit locally
npm audit --audit-level=moderate

# Fix vulnerabilities
npm audit fix
```

#### 4. **Badge Not Updating**
- Check repository secrets
- Verify workflow permissions
- Check README format

### Debug Commands
```bash
# Check workflow status
gh run list

# View workflow logs
gh run view <run-id>

# Download artifacts
gh run download <run-id>
```

## 📚 Additional Resources

### Documentation
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vitest Coverage Documentation](https://vitest.dev/guide/coverage.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### Tools
- [GitHub CLI](https://cli.github.com/) - Command line interface
- [Vitest UI](https://vitest.dev/guide/ui.html) - Test runner UI
- [Coverage Badge Generator](https://shields.io/) - Badge creation

## 🎯 Next Steps

### Immediate Actions
1. ✅ Enable GitHub Pages
2. ✅ Configure repository secrets (optional)
3. ✅ Test pipeline with a push to main

### Future Enhancements
- [ ] Add E2E testing
- [ ] Integrate with external coverage services
- [ ] Add performance monitoring
- [ ] Set up staging environment
- [ ] Add automated dependency updates

### Coverage Improvement
- [ ] Add tests for core components
- [ ] Add tests for UI components
- [ ] Add tests for utilities
- [ ] Reach 80% coverage target

---

**Pipeline Status**: ✅ Active and Ready  
**Last Updated**: $(date)  
**Maintainer**: Harsh Shah 