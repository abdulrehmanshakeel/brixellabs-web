/**
 * BrixelLabs Automated Secret Scanner
 * Scans codebase files to ensure no API keys, private keys, or credentials
 * are accidentally staged or committed to GitHub.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const HIGH_RISK_PATTERNS = [
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Private Key Block', regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'GitHub Personal Access Token', regex: /gh[pousr]_[A-Za-z0-9_]{36,255}/ },
  { name: 'OpenAI Secret Key', regex: /sk-[a-zA-Z0-9]{32,}/ },
  { name: 'Stripe Secret Key', regex: /sk_live_[0-9a-zA-Z]{24}/ },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z-_]{35}/ },
  { name: 'Slack Webhook URL', regex: /https:\/\/hooks\.slack\.com\/services\/T[0-9A-Za-z_]+\/B[0-9A-Za-z_]+\/[0-9A-Za-z_]+/ },
  { name: 'Hardcoded Production Secret', regex: /DJANGO_SECRET_KEY\s*=\s*['"][^'"]{20,}['"]/ },
];

const IGNORED_PATHS = [
  'node_modules',
  'dist',
  '.git',
  '.env.example',
  'backend/.env.example',
  'scripts/check_secrets.js',
  'package-lock.json',
  '.sqlite3',
  'OfficialTechIcons-5kU1omFz.js'
];

let scannedCount = 0;
let leakCount = 0;

function shouldIgnore(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  return IGNORED_PATHS.some(ignored => norm.includes(ignored));
}

function scanFile(filePath) {
  if (shouldIgnore(filePath)) return;

  try {
    const stats = fs.statSync(filePath);
    if (stats.size > 1024 * 1024) return; // Skip files > 1MB

    const content = fs.readFileSync(filePath, 'utf8');
    scannedCount++;

    HIGH_RISK_PATTERNS.forEach(rule => {
      const match = content.match(rule.regex);
      if (match) {
        // Double check it's not a dummy/example value
        const matchedStr = match[0];
        if (
          matchedStr.includes('your-') || 
          matchedStr.includes('dummy') || 
          matchedStr.includes('example') || 
          matchedStr.includes('template')
        ) {
          return;
        }

        console.error(`\x1b[31m[CRITICAL LEAK RISK]\x1b[0m ${rule.name} found in: ${filePath}`);
        console.error(`  Match snippet: ${matchedStr.substring(0, 10)}... (masked)`);
        leakCount++;
      }
    });
  } catch (err) {
    // Binary or unreadable file
  }
}

function traverse(dir) {
  if (shouldIgnore(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

console.log('\x1b[36m[BrixelLabs Security Scanner]\x1b[0m Inspecting repository for sensitive credentials...');
traverse(ROOT_DIR);

if (leakCount > 0) {
  console.error(`\n\x1b[31m[FAILED]\x1b[0m Detected ${leakCount} potential credential leak(s)! Do NOT push to GitHub.`);
  process.exit(1);
} else {
  console.log(`\x1b[32m[PASSED]\x1b[0m Scanned ${scannedCount} files. Zero secrets or signing keys detected in repo.`);
}
