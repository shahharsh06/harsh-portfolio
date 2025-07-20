#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read coverage data
const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-final.json');

if (!fs.existsSync(coveragePath)) {
  console.log('❌ Coverage file not found. Run "npm run test:coverage" first.');
  process.exit(1);
}

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
  Object.entries(fileData.s).forEach(([lineNum, count]) => {
    fileLines++;
    totalLines++;
    if (count > 0) {
      fileCoveredLines++;
      coveredLines++;
    }
  });

  // Count functions
  Object.entries(fileData.f).forEach(([funcNum, count]) => {
    fileFunctions++;
    totalFunctions++;
    if (count > 0) {
      fileCoveredFunctions++;
      coveredFunctions++;
    }
  });

  // Count branches
  Object.entries(fileData.b).forEach(([branchNum, counts]) => {
    fileBranches++;
    totalBranches++;
    if (counts.some(count => count > 0)) {
      fileCoveredBranches++;
      coveredBranches++;
    }
  });

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

// Recommendations
console.log('\n💡 RECOMMENDATIONS:');
if (overallLineCoverage < 80) {
  console.log('   • Focus on improving line coverage to reach 80% target');
}
if (overallFunctionCoverage < 65) {
  console.log('   • Add more function tests to improve function coverage');
}
if (overallBranchCoverage < 80) {
  console.log('   • Add edge case tests to improve branch coverage');
}

const lowCoverageFiles = fileSummaries.filter(f => f.lineCoverage < 80);
if (lowCoverageFiles.length > 0) {
  console.log('\n📋 FILES NEEDING ATTENTION:');
  lowCoverageFiles.slice(0, 5).forEach(file => {
    console.log(`   • ${file.path} (${file.lineCoverage}%)`);
  });
}

console.log('\n' + '='.repeat(80)); 