import fs from 'fs';
import path from 'path';

const routes = new Set([
  '/', '/services', '/process', '/case-studies',
  '/case-studies/noesis', '/case-studies/neosis',
  '/case-studies/the-watcher', '/case-studies/watcher',
  '/case-studies/frontdesk-ai',
  '/case-studies/threadeye', '/case-studies/fabric-defect-detection',
  '/case-studies/getscry',
  '/about', '/contact', '/thank-you',
  '/privacy-policy', '/privacy',
  '/terms-of-service', '/terms', '/tos',
  '/refund-policy', '/refund', '/refunds',
  '/cookie-policy', '/cookies', '/cookie',
  '/data-deletion', '/delete-my-data', '/gdpr-erasure',
  '/unsubscribe', '/opt-out', '/optout',
  '/admin', '/404'
]);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk('./src');
const broken = [];
const allHrefs = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match href="..." or href='...'
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const m of hrefMatches) {
    const link = m[1];
    allHrefs.push({ file, link });
    if (link.startsWith('/')) {
      const clean = link.split('#')[0].split('?')[0];
      if (clean && !routes.has(clean)) {
        broken.push({ file, link, reason: 'Unknown internal route' });
      }
    } else if (link.startsWith('http://') || link.startsWith('https://')) {
      // Check for malformed external URLs
      try {
        new URL(link);
      } catch (e) {
        broken.push({ file, link, reason: 'Invalid URL format' });
      }
    } else if (link.startsWith('#')) {
      // Anchor link
    } else if (link.startsWith('mailto:') || link.startsWith('tel:')) {
      // Protocol link
    } else {
      // Relative or javascript or unknown
      broken.push({ file, link, reason: 'Suspicious relative link' });
    }
  }

  // Match navigate(...) or handleNav(...)
  const navMatches = content.matchAll(/(?:navigate|handleNav)\s*\(\s*["']([^"']+)["']/g);
  for (const m of navMatches) {
    const link = m[1];
    if (link.startsWith('/')) {
      const clean = link.split('#')[0].split('?')[0];
      if (clean && !routes.has(clean)) {
        broken.push({ file, link, reason: 'Unknown navigation path' });
      }
    }
  }
}

console.log(`Scanned ${files.length} source files.`);
console.log(`Total hrefs found: ${allHrefs.length}`);
console.log(`Issues found: ${broken.length}`);
for (const b of broken) {
  console.log(`[${b.reason}] ${b.link} in ${b.file}`);
}

// Button check
const suspectButtons = [];
for (const file of files) {
  if (!file.endsWith('.jsx')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  const btnRegex = /<button\b([^>]*)>/gs;
  let match;
  while ((match = btnRegex.exec(content)) !== null) {
    const attrs = match[1];
    const hasOnClick = /onClick\s*=/.test(attrs);
    const isSubmit = /type\s*=\s*['"]submit['"]/.test(attrs);
    const isReset = /type\s*=\s*['"]reset['"]/.test(attrs);
    if (!hasOnClick && !isSubmit && !isReset) {
      suspectButtons.push({ file, tag: match[0].replace(/\s+/g, ' ') });
    }
  }
}
console.log(`\nSuspect buttons count: ${suspectButtons.length}`);
for (const sb of suspectButtons) {
  console.log(`[Button without onClick or submit] in ${sb.file}: ${sb.tag.slice(0, 100)}...`);
}

