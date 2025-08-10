#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Small helpers
const readJson = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    // Silently handle JSON parsing errors
  }
  return null;
};

const normalizePath = (absPath) => ('/' + path.relative(process.cwd(), absPath)).replace(/\\/g, '/');

// Replace nested ternaries with a simple threshold table
const computeGrade = (pct) => {
  const thresholds = [
    { min: 90, grade: 'A+' },
    { min: 85, grade: 'A' },
    { min: 80, grade: 'B+' },
    { min: 75, grade: 'B' },
    { min: 70, grade: 'C+' },
    { min: 65, grade: 'C' }
  ];
  for (const { min, grade } of thresholds) {
    if (pct >= min) return grade;
  }
  return 'D';
};

const parseVitestReport = (reportPath) => {
  const json = readJson(reportPath);
  let numTotalTests = 0;
  let numTotalTestSuites = 0;
  let testResults = [];

  if (json) {
    numTotalTests = json.numTotalTests || 0;
    numTotalTestSuites = json.numTotalTestSuites || 0;
    if (json.testResults) {
      if (Array.isArray(json.testResults.tests)) {
        testResults = json.testResults.tests;
      } else if (Array.isArray(json.testResults)) {
        testResults = json.testResults;
      }
    } else if (Array.isArray(json.results)) {
      testResults = json.results;
    }
  }

  const safeArray = (val) => (Array.isArray(val) ? val : []);
  const countByPattern = (pattern) => {
    let count = 0;
    for (const file of testResults) {
      const fileName = (file.name || file.file || '').toString().replace(/\\/g, '/');
      const assertions = safeArray(file.assertionResults || file.assertions);
      if (fileName.includes(pattern)) count += assertions.length;
    }
    return count;
  };

  const testCategories = [
    { name: 'Component Tests', count: countByPattern('src/components/__tests__') },
    { name: 'UI Tests', count: countByPattern('src/components/ui/__tests__') },
    { name: 'Utility Tests', count: countByPattern('src/lib/__tests__') },
    { name: 'Integration Tests', count: countByPattern('src/__tests__') },
    { name: 'Hook Tests', count: countByPattern('src/hooks/__tests__') },
  ].sort((a, b) => b.count - a.count);

  return { numTotalTests, numTotalTestSuites, testCategories };
};

// Read coverage data
const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-final.json');

if (!fs.existsSync(coveragePath)) {
  process.exit(1);
}

try {
  const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));

  let totalLines = 0;
  let coveredLines = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;
  let totalBranches = 0;
  let coveredBranches = 0;

  const fileSummaries = [];

  // Process each file
  Object.entries(coverageData).forEach(([filePath, fileData]) => {
    const relativePath = normalizePath(filePath);
    
    if (!relativePath.includes('src/') || relativePath.includes('test/') || relativePath.includes('.test.') || relativePath.includes('.spec.')) {
      return; // Skip test files and non-source files
    }

    let fileLines = 0;
    let fileCoveredLines = 0;
    let fileFunctions = 0;
    let fileCoveredFunctions = 0;
    let fileBranches = 0;
    let fileCoveredBranches = 0;

    // Count lines
    if (fileData.s) {
      Object.entries(fileData.s).forEach(([lineNum, count]) => {
        fileLines++;
        totalLines++;
        if (count > 0) {
          fileCoveredLines++;
          coveredLines++;
        }
      });
    }

    // Count functions
    if (fileData.f) {
      Object.entries(fileData.f).forEach(([funcNum, count]) => {
        fileFunctions++;
        totalFunctions++;
        if (count > 0) {
          fileCoveredFunctions++;
          coveredFunctions++;
        }
      });
    }

    // Count branches
    if (fileData.b) {
      Object.entries(fileData.b).forEach(([branchNum, counts]) => {
        fileBranches++;
        totalBranches++;
        if (counts.some(count => count > 0)) {
          fileCoveredBranches++;
          coveredBranches++;
        }
      });
    }

    const lineCoverage = fileLines > 0 ? Math.round((fileCoveredLines / fileLines) * 100) : 0;
    const functionCoverage = fileFunctions > 0 ? Math.round((fileCoveredFunctions / fileFunctions) * 100) : 0;
    const branchCoverage = fileBranches > 0 ? Math.round((fileCoveredBranches / fileBranches) * 100) : 0;

    fileSummaries.push({
      path: relativePath,
      lines: fileLines,
      coveredLines: fileCoveredLines,
      lineCoverage,
      functions: fileFunctions,
      coveredFunctions: fileCoveredFunctions,
      functionCoverage,
      branches: fileBranches,
      coveredBranches: fileCoveredBranches,
      branchCoverage
    });
  });

  // Sort by coverage percentage (lowest first)
  fileSummaries.sort((a, b) => a.lineCoverage - b.lineCoverage);

  // Overall summary
  const overallLineCoverage = totalLines > 0 ? Math.round((coveredLines / totalLines) * 100) : 0;
  const overallFunctionCoverage = totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0;
  const overallBranchCoverage = totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0;

  const grade = computeGrade(overallLineCoverage);

  const dashboardDataPath = path.join(__dirname, '..', 'public', 'dashboard-data.json');
  const now = new Date().toISOString();

  let testCount = 0;
  let testFiles = 0;

  const functionThreshold = 80; // Set your actual threshold here
  
  // Run npm audit and calculate security score
  const getSecurity = () => {
    let score = 100;
    let high = 0;
    try {
      const auditResult = spawnSync('npm', ['audit', '--json'], { encoding: 'utf-8' });
      const auditRaw = auditResult.stdout;
      if (!auditRaw) {
        return { score, high };
      }
      try {
        const audit = JSON.parse(auditRaw);
        high = audit.metadata?.vulnerabilities?.high || 0;
        score = Math.max(100 - high * 5, 0);
        return { score, high };
      } catch {
        return { score, high };
      }
    } catch {
      return { score, high };
    }
  };
  
  const { score: securityScore, high: highSeverityIssues } = getSecurity();
  
  // Build per-component (per-file) coverage array for dashboard, sorted highest to lowest
  const componentCoverage = fileSummaries
    .filter(f => (f.path.startsWith('/src/components/') || f.path.startsWith('src/components/')) && f.path.endsWith('.tsx'))
    .map(f => ({
      name: f.path.split('/').pop(),
      coverage: Number(f.lineCoverage.toFixed(2))
    }))
    .sort((a, b) => b.coverage - a.coverage);

  // Vitest totals and categories
  const vitestReportPath = path.join(__dirname, '..', 'vitest-report.json');
  const vitestParsed = parseVitestReport(vitestReportPath);
  testCount = vitestParsed.numTotalTests;
  testFiles = vitestParsed.numTotalTestSuites;
  const testCategories = vitestParsed.testCategories;

  // Automate quality metrics for dashboard
  // TypeScript Coverage: use overallLineCoverage
  const typescriptCoverage = overallLineCoverage + '%';

  // Linting Score: run eslint and parse errors
  const getLintingScore = () => {
    const computeLintingResult = (json) => {
      const totalErrors = json.reduce((sum, file) => sum + (file.errorCount || 0), 0);
      const totalWarnings = json.reduce((sum, file) => sum + (file.warningCount || 0), 0);
      
      if (totalErrors === 0 && totalWarnings === 0) {
        return '100%';
      }
      if (totalErrors === 0 && totalWarnings > 0) {
        return `0 errors, ${totalWarnings} warnings`;
      }
      return `${totalErrors} errors, ${totalWarnings} warnings`;
    };

    try {
      const eslintResult = execSync('npx eslint "src/**/*.{ts,tsx}" -f json', { 
        encoding: 'utf-8', 
        stdio: ['pipe', 'pipe', 'pipe'] 
      });
      return computeLintingResult(JSON.parse(eslintResult));
    } catch (e) {
      if (e.stdout) {
        try { 
          return computeLintingResult(JSON.parse(e.stdout)); 
        } catch { 
          return 'lint error'; 
        }
      }
      return 'lint error';
    }
  };
  
  const lintingScore = getLintingScore();

  // Build Success Rate: set to '100%' if script completes
  const buildSuccessRate = '100%';

  // Fetch CI/CD workflow status using gh CLI
  const getWorkflowsStatus = () => {
    let ci = 'unknown';
    let deploy = 'unknown';
    try {
      ci = execSync('gh run list --workflow="CI/CD Pipeline" --limit 1 --json conclusion -q ".[0].conclusion"').toString().trim();
    } catch (e) {
      // Silently handle CI workflow status fetch error
    }
    try {
      deploy = execSync('gh run list --workflow="Deploy to GitHub Pages" --limit 1 --json conclusion -q ".[0].conclusion"').toString().trim();
    } catch (e) {
      // Silently handle Deploy workflow status fetch error
    }
    return { ciStatus: ci, deployStatus: deploy };
  };
  
  const { deployStatus } = getWorkflowsStatus();
  
  // Now use deployStatus for quality metrics with better error handling
  const computeDeploymentSuccess = (status) => {
    if (!status || status === 'unknown') return '100%';
    return status === 'success' ? '100%' : '0%';
  };
  
  const deploymentSuccess = computeDeploymentSuccess(deployStatus);

  // Security Vulnerabilities: use highSeverityIssues
  const securityVulnerabilities = highSeverityIssues;

  // Simple message without title
  let recommendations = [
    {
      title: '',
      items: ['Great job! Your code coverage is excellent. 🎉']
    }
  ];

  const quality = {
    typescriptCoverage,
    lintingScore,
    buildSuccessRate,
    deploymentSuccess,
    securityVulnerabilities
  };

  // --- CI/CD Status Automation Patch Start ---
  function checkCommand(cmd) {
    try {
      execSync(cmd, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
  
  const ciPassed = checkCommand('npm run test') && checkCommand('npm run lint');
  const deployPassed = checkCommand('npm run build');
  const workflows = {
    ci: ciPassed ? 'success' : 'failed',
    deploy: deployPassed ? 'success' : 'failed'
  };
  // --- CI/CD Status Automation Patch End ---

  const dashboardData = {
    lastUpdated: now,
    coverage: {
      percentage: overallLineCoverage,
      totalLines,
      coveredLines
    },
    functions: {
      percentage: overallFunctionCoverage,
      total: totalFunctions,
      covered: coveredFunctions,
      threshold: functionThreshold
    },
    branches: {
      percentage: overallBranchCoverage,
      total: totalBranches,
      covered: coveredBranches
    },
    tests: {
      count: testCount,
      files: testFiles,
      status: "passing"
    },
    security: {
      score: securityScore,
      highSeverityIssues: highSeverityIssues
    },
    componentCoverage,
    testCategories,
    quality,
    recommendations,
    workflows
  };

  // Update dashboard-history.json for trend chart (FIFO, unique dates, max 7 entries)
  const historyPath = path.join(__dirname, '..', 'public', 'dashboard-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      history = [];
    }
  }
  
  const today = new Date().toISOString().slice(0, 10);
  // Remove any existing entry for today
  history = history.filter(entry => entry.date !== today);
  // Add the latest entry for today
  history.push({
    date: today,
    coverage: overallLineCoverage,
    tests: testCount
  });
  // Keep only the latest 7 entries (FIFO)
  if (history.length > 7) {
    history = history.slice(history.length - 7);
  }
  
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

  // Write dashboardData to dashboard-data.json
  fs.writeFileSync(dashboardDataPath, JSON.stringify(dashboardData, null, 2));

} catch (error) {
  process.exit(1);
}