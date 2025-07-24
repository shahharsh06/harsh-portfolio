// scripts/generate-fake-history.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyPath = path.join(__dirname, '..', 'public', 'dashboard-history.json');

// Generate 7 days of fake data (ending today)
const days = 7;
const today = new Date();
const fakeHistory = [];
let baseCoverage = 80;
let baseTests = 120;
for (let i = days - 1; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  const isoDate = date.toISOString().slice(0, 10);
  fakeHistory.push({
    date: isoDate,
    coverage: baseCoverage,
    tests: baseTests
  });
  baseCoverage += Math.floor(Math.random() * 3) + 1; // +1 to +3%
  baseTests += Math.floor(Math.random() * 40) + 20;  // +20 to +59
}

fs.writeFileSync(historyPath, JSON.stringify(fakeHistory, null, 2));
console.log('✅ Generated fake dashboard-history.json with 7 days of data'); 