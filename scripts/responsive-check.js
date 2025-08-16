#!/usr/bin/env node

/**
 * Responsive Design Checker
 * Scans project files for responsive design violations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define violation patterns
const VIOLATIONS = {
  'container mx-auto': {
    pattern: /container\s+mx-auto/g,
    fix: 'w-full px-4 sm:px-6 lg:px-8',
    severity: 'high'
  },
  'space-x spacing': {
    pattern: /space-x-\d+/g,
    fix: 'gap-4 xl:gap-6 2xl:gap-8',
    severity: 'high'
  },
  'space-y spacing': {
    pattern: /space-y-\d+/g,
    fix: 'gap-4 xl:gap-6 2xl:gap-8',
    severity: 'high'
  },
  'fixed width classes': {
    pattern: /\b(w-96|w-80|w-64|w-48|w-32)\b/g,
    fix: 'w-full max-w-* mx-auto',
    severity: 'medium'
  },
  'non-responsive grids': {
    pattern: /grid-cols-\d+(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    fix: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    severity: 'medium'
  },
  'fixed text sizes': {
    pattern: /text-(xs|sm|base|lg|xl|2xl|3xl)(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    fix: 'text-sm lg:text-base xl:text-lg',
    severity: 'low'
  }
};

// File extensions to check
const EXTENSIONS = ['.jsx', '.js', '.tsx', '.ts'];

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(file)) {
      scanDirectory(filePath, fileList);
    } else if (EXTENSIONS.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Check file for violations
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  
  Object.entries(VIOLATIONS).forEach(([name, config]) => {
    const matches = content.match(config.pattern);
    if (matches) {
      violations.push({
        file: filePath,
        violation: name,
        matches: matches,
        fix: config.fix,
        severity: config.severity,
        lineNumbers: getLineNumbers(content, config.pattern)
      });
    }
  });
  
  return violations;
}

/**
 * Get line numbers for matches
 */
function getLineNumbers(content, pattern) {
  const lines = content.split('\n');
  const lineNumbers = [];
  
  lines.forEach((line, index) => {
    if (pattern.test(line)) {
      lineNumbers.push(index + 1);
    }
  });
  
  return lineNumbers;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning for responsive design violations...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src directory not found');
    process.exit(1);
  }
  
  const files = scanDirectory(srcDir);
  const allViolations = [];
  
  files.forEach(file => {
    const violations = checkFile(file);
    allViolations.push(...violations);
  });
  
  // Group by severity
  const grouped = {
    high: allViolations.filter(v => v.severity === 'high'),
    medium: allViolations.filter(v => v.severity === 'medium'),
    low: allViolations.filter(v => v.severity === 'low')
  };
  
  // Display results
  let hasViolations = false;
  
  Object.entries(grouped).forEach(([severity, violations]) => {
    if (violations.length > 0) {
      hasViolations = true;
      const emoji = severity === 'high' ? '🚨' : severity === 'medium' ? '⚠️' : '💡';
      console.log(`${emoji} ${severity.toUpperCase()} PRIORITY VIOLATIONS (${violations.length}):`);
      
      violations.forEach(violation => {
        const relativePath = path.relative(projectRoot, violation.file);
        console.log(`  📄 ${relativePath}:${violation.lineNumbers.join(',')}`);
        console.log(`     Issue: ${violation.violation}`);
        console.log(`     Found: ${violation.matches.join(', ')}`);
        console.log(`     Fix: ${violation.fix}`);
        console.log('');
      });
    }
  });
  
  if (!hasViolations) {
    console.log('✅ No responsive design violations found!');
    console.log('🎉 Your project follows responsive best practices.');
  } else {
    console.log(`\n📊 SUMMARY:`);
    console.log(`   🚨 High Priority: ${grouped.high.length}`);
    console.log(`   ⚠️  Medium Priority: ${grouped.medium.length}`);
    console.log(`   💡 Low Priority: ${grouped.low.length}`);
    console.log(`   📁 Files scanned: ${files.length}`);
    
    console.log('\n🛠️  To auto-fix some issues, run:');
    console.log('   npm run responsive-fix');
    
    process.exit(1);
  }
}

main();
