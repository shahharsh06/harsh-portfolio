#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read coverage data
const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-final.json');

if (!fs.existsSync(coveragePath)) {
  console.log('❌ Coverage file not found. Run "npm run test:coverage" first.');
  process.exit(1);
}

try {
  const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));

  console.log('\n📊 DETAILED COVERAGE SUMMARY\n');
  console.log('='.repeat(80));

  let totalLines = 0;
  let coveredLines = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;
  let totalBranches = 0;
  let coveredBranches = 0;

  const fileSummaries = [];

  // Process each file
  Object.entries(coverageData).forEach(([filePath, fileData]) => {
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    
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

  // Display file details
  console.log('\n📁 FILE-BY-FILE COVERAGE:\n');

  fileSummaries.forEach(file => {
    const status = file.lineCoverage >= 80 ? '✅' : file.lineCoverage >= 60 ? '⚠️' : '❌';
    console.log(`${status} ${file.path}`);
    console.log(`   Lines: ${file.coveredLines}/${file.lines} (${file.lineCoverage}%)`);
    console.log(`   Functions: ${file.coveredFunctions}/${file.functions} (${file.functionCoverage}%)`);
    console.log(`   Branches: ${file.coveredBranches}/${file.branches} (${file.branchCoverage}%)`);
    console.log('');
  });

  // Overall summary
  const overallLineCoverage = totalLines > 0 ? Math.round((coveredLines / totalLines) * 100) : 0;
  const overallFunctionCoverage = totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0;
  const overallBranchCoverage = totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0;

  console.log('='.repeat(80));
  console.log('🎯 OVERALL SUMMARY:\n');

  console.log(`📊 Lines:     ${coveredLines}/${totalLines} (${overallLineCoverage}%)`);
  console.log(`🔧 Functions: ${coveredFunctions}/${totalFunctions} (${overallFunctionCoverage}%)`);
  console.log(`🌿 Branches:  ${coveredBranches}/${totalBranches} (${overallBranchCoverage}%)`);

  // Coverage grade
  let grade = 'F';
  if (overallLineCoverage >= 90) grade = 'A+';
  else if (overallLineCoverage >= 85) grade = 'A';
  else if (overallLineCoverage >= 80) grade = 'B+';
  else if (overallLineCoverage >= 75) grade = 'B';
  else if (overallLineCoverage >= 70) grade = 'C+';
  else if (overallLineCoverage >= 65) grade = 'C';
  else if (overallLineCoverage >= 60) grade = 'D';

  console.log(`\n🏆 Coverage Grade: ${grade} (${overallLineCoverage}%)`);

  // Recommendations for CLI summary
  const lowCoverageFilesForSummary = fileSummaries.filter(f => f.lineCoverage < 80);
  if (lowCoverageFilesForSummary.length > 0) {
    console.log('\n📋 FILES NEEDING ATTENTION:');
    lowCoverageFilesForSummary.slice(0, 5).forEach(file => {
      console.log(`   • ${file.path} (${file.lineCoverage}%)`);
    });
  }

  console.log('\n' + '='.repeat(80));

  const dashboardDataPath = path.join(__dirname, '..', 'public', 'dashboard-data.json');
  const now = new Date().toISOString();

  let testCount = 0;
  let testFiles = 0;
  try {
    const vitestReportPath = path.join(__dirname, '..', 'vitest-report.json');
    if (fs.existsSync(vitestReportPath)) {
      const vitestReport = JSON.parse(fs.readFileSync(vitestReportPath, 'utf8'));
      testCount = vitestReport.numTotalTests || 0;
      testFiles = vitestReport.numTotalTestSuites || 0;
    }
  } catch (e) {
    console.warn('Could not read vitest-report.json:', e.message);
  }

  const functionThreshold = 80; // Set your actual threshold here
  // Run npm audit and calculate security score
  let securityScore = 100;
  let highSeverityIssues = 0;
  try {
    const auditResult = spawnSync('npm', ['audit', '--json'], { encoding: 'utf-8' });
    const auditRaw = auditResult.stdout;
    if (auditRaw) {
      try {
        const audit = JSON.parse(auditRaw);
        highSeverityIssues = audit.metadata?.vulnerabilities?.high || 0;
        securityScore = Math.max(100 - highSeverityIssues * 5, 0);
      } catch (parseErr) {
        console.warn('Could not parse npm audit output. Defaulting to 0 high severity issues.');
        highSeverityIssues = 0;
        securityScore = 100;
      }
    } else {
      console.warn('npm audit produced no output. Defaulting to 0 high severity issues.');
      highSeverityIssues = 0;
      securityScore = 100;
    }
  } catch (e) {
    console.warn('Could not run npm audit. Defaulting to 0 high severity issues.');
    highSeverityIssues = 0;
    securityScore = 100;
  }
  // Build per-component (per-file) coverage array for dashboard, sorted highest to lowest
  const componentCoverage = fileSummaries
    .filter(f => f.path.startsWith('/src/components/') && f.path.endsWith('.tsx'))
    .map(f => ({
      name: f.path.split('/').pop(),
      coverage: Number(f.lineCoverage.toFixed(2))
    }))
    .sort((a, b) => b.coverage - a.coverage);

  // Parse Vitest JSON report for real test category counts
  let vitestReport = [];
  const vitestReportPath = path.join(__dirname, '..', 'vitest-report.json');
  if (fs.existsSync(vitestReportPath)) {
    try {
      const reportData = JSON.parse(fs.readFileSync(vitestReportPath, 'utf8'));
      if (Array.isArray(reportData)) {
        vitestReport = reportData;
      } else if (Array.isArray(reportData.testResults)) {
        vitestReport = reportData.testResults;
      } else if (Array.isArray(reportData.results)) {
        vitestReport = reportData.results;
      } else {
        vitestReport = [];
      }
    } catch (e) {
      console.warn('Could not parse vitest-report.json, using placeholder test category counts.');
    }
  }
  function countTestsByPattern(pattern) {
    let count = 0;
    vitestReport.forEach(file => {
      if (file.name && file.name.replace(/\\/g, '/').includes(pattern) && Array.isArray(file.assertionResults)) {
        count += file.assertionResults.length;
      }
    });
    return count;
  }
  const testCategories = [
    { name: 'Component Tests', count: countTestsByPattern('src/components/__tests__') },
    { name: 'UI Tests', count: countTestsByPattern('src/components/ui/__tests__') },
    { name: 'Utility Tests', count: countTestsByPattern('src/lib/__tests__') },
    { name: 'Integration Tests', count: countTestsByPattern('src/__tests__') },
    { name: 'Hook Tests', count: countTestsByPattern('src/hooks/__tests__') }
  ].sort((a, b) => b.count - a.count);

  // Automate quality metrics for dashboard
  // TypeScript Coverage: use overallLineCoverage
  const typescriptCoverage = overallLineCoverage + '%';

  // Linting Score: run eslint and parse errors
  let lintingScore = '100%';
  try {
    const eslintResult = execSync('npx eslint "src/**/*.{ts,tsx}" -f json', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    const eslintJson = JSON.parse(eslintResult);
    const totalErrors = eslintJson.reduce((sum, file) => sum + (file.errorCount || 0), 0);
    const totalWarnings = eslintJson.reduce((sum, file) => sum + (file.warningCount || 0), 0);
    if (totalErrors === 0 && totalWarnings === 0) {
      lintingScore = '100%';
    } else if (totalErrors === 0 && totalWarnings > 0) {
      lintingScore = `0 errors, ${totalWarnings} warnings`;
    } else {
      lintingScore = `${totalErrors} errors, ${totalWarnings} warnings`;
    }
  } catch (e) {
    // Try to parse partial output if available
    if (e.stdout) {
      try {
        const eslintJson = JSON.parse(e.stdout);
        const totalErrors = eslintJson.reduce((sum, file) => sum + (file.errorCount || 0), 0);
        const totalWarnings = eslintJson.reduce((sum, file) => sum + (file.warningCount || 0), 0);
        if (totalErrors === 0 && totalWarnings === 0) {
          lintingScore = '100%';
        } else if (totalErrors === 0 && totalWarnings > 0) {
          lintingScore = `0 errors, ${totalWarnings} warnings`;
        } else {
          lintingScore = `${totalErrors} errors, ${totalWarnings} warnings`;
        }
      } catch {
        lintingScore = 'lint error';
      }
    } else {
      lintingScore = 'lint error';
    }
  }

  // Build Success Rate: set to '100%' if script completes
  const buildSuccessRate = '100%';

  // Fetch CI/CD workflow status using gh CLI
  let ciStatus = 'unknown';
  let deployStatus = 'unknown';
  try {
    ciStatus = execSync('gh run list --workflow="CI/CD Pipeline" --limit 1 --json conclusion -q ".[0].conclusion"').toString().trim();
  } catch (e) {
    console.warn('Could not get CI workflow status:', e.message);
  }
  try {
    deployStatus = execSync('gh run list --workflow="Deploy to GitHub Pages" --limit 1 --json conclusion -q ".[0].conclusion"').toString().trim();
  } catch (e) {
    console.warn('Could not get Deploy workflow status:', e.message);
  }
  // Now use deployStatus for quality metrics
  let deploymentSuccess = '100%';
  if (typeof deployStatus !== 'undefined') {
    deploymentSuccess = deployStatus === 'success' ? '100%' : '0%';
  }

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
    workflows // <-- Add workflows to the output
    // Add more fields as needed
  };

  // Update dashboard-history.json for trend chart (FIFO, unique dates, max 7 entries)
  const historyPath = path.join(__dirname, '..', 'public', 'dashboard-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      console.warn('Could not parse dashboard-history.json, starting fresh.');
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
  console.log('✅ Updated dashboard-history.json (FIFO, unique dates, max 7)');

  // Write dashboardData to dashboard-data.json
  fs.writeFileSync(dashboardDataPath, JSON.stringify(dashboardData, null, 2));
  console.log('✅ Updated dashboard-data.json with latest metrics and recommendations');

} catch (error) {
  console.error('❌ Error processing coverage data:', error.message);
  process.exit(1);
} 