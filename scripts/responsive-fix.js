#!/usr/bin/env node

/**
 * Responsive Design Auto-Fixer
 * Automatically fixes common responsive design violations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define auto-fix patterns
const FIXES = [
  {
    name: 'Container to Full Width',
    pattern: /container\s+mx-auto\s+px-6/g,
    replacement: 'w-full px-4 sm:px-6 lg:px-8'
  },
  {
    name: 'Container to Full Width (generic)',
    pattern: /container\s+mx-auto/g,
    replacement: 'w-full px-4 sm:px-6 lg:px-8'
  },
  {
    name: 'Space-X to Gap',
    pattern: /space-x-8/g,
    replacement: 'gap-4 xl:gap-6 2xl:gap-8'
  },
  {
    name: 'Space-X to Gap (6)',
    pattern: /space-x-6/g,
    replacement: 'gap-3 lg:gap-4 xl:gap-6'
  },
  {
    name: 'Space-X to Gap (4)',
    pattern: /space-x-4/g,
    replacement: 'gap-2 md:gap-3 lg:gap-4'
  },
  {
    name: 'Space-Y to Gap',
    pattern: /space-y-8/g,
    replacement: 'gap-4 xl:gap-6 2xl:gap-8'
  },
  {
    name: 'Space-Y to Gap (6)',
    pattern: /space-y-6/g,
    replacement: 'gap-3 lg:gap-4 xl:gap-6'
  },
  {
    name: 'Space-Y to Gap (4)',
    pattern: /space-y-4/g,
    replacement: 'gap-2 md:gap-3 lg:gap-4'
  },
  {
    name: 'Fixed Width to Responsive',
    pattern: /\bw-96\b/g,
    replacement: 'w-full max-w-sm mx-auto'
  },
  {
    name: 'Fixed Width to Responsive (80)',
    pattern: /\bw-80\b/g,
    replacement: 'w-full max-w-xs mx-auto'
  },
  {
    name: 'Fixed Width to Responsive (64)',
    pattern: /\bw-64\b/g,
    replacement: 'w-full max-w-xs mx-auto'
  },
  {
    name: 'Non-responsive Grid',
    pattern: /grid-cols-4(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    replacement: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  },
  {
    name: 'Non-responsive Grid (3)',
    pattern: /grid-cols-3(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    replacement: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  },
  {
    name: 'Non-responsive Grid (2)',
    pattern: /grid-cols-2(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    replacement: 'grid-cols-1 sm:grid-cols-2'
  }
];

// File extensions to process
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
 * Apply fixes to file content
 */
function applyFixes(content, filePath) {
  let modifiedContent = content;
  const appliedFixes = [];
  
  FIXES.forEach(fix => {
    const matches = modifiedContent.match(fix.pattern);
    if (matches) {
      modifiedContent = modifiedContent.replace(fix.pattern, fix.replacement);
      appliedFixes.push({
        name: fix.name,
        count: matches.length,
        matches: matches
      });
    }
  });
  
  return {
    content: modifiedContent,
    fixes: appliedFixes,
    hasChanges: appliedFixes.length > 0
  };
}

/**
 * Create backup of file
 */
function createBackup(filePath) {
  const backupPath = `${filePath}.backup-${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Main execution
 */
function main() {
  console.log('🛠️  Auto-fixing responsive design violations...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src directory not found');
    process.exit(1);
  }
  
  const files = scanDirectory(srcDir);
  let totalFilesModified = 0;
  let totalFixesApplied = 0;
  const modificationLog = [];
  
  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const result = applyFixes(content, filePath);
    
    if (result.hasChanges) {
      // Create backup
      const backupPath = createBackup(filePath);
      
      // Write modified content
      fs.writeFileSync(filePath, result.content, 'utf8');
      
      const relativePath = path.relative(projectRoot, filePath);
      console.log(`✅ Modified: ${relativePath}`);
      
      result.fixes.forEach(fix => {
        console.log(`   📝 ${fix.name}: ${fix.count} replacement(s)`);
        totalFixesApplied += fix.count;
      });
      
      modificationLog.push({
        file: relativePath,
        fixes: result.fixes,
        backup: path.relative(projectRoot, backupPath)
      });
      
      totalFilesModified++;
      console.log('');
    }
  });
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   📁 Files scanned: ${files.length}`);
  console.log(`   ✏️  Files modified: ${totalFilesModified}`);
  console.log(`   🔧 Total fixes applied: ${totalFixesApplied}`);
  
  if (totalFilesModified > 0) {
    console.log('\n📋 MODIFICATION LOG:');
    modificationLog.forEach(log => {
      console.log(`   📄 ${log.file}`);
      console.log(`      Backup: ${log.backup}`);
      log.fixes.forEach(fix => {
        console.log(`      ${fix.name}: ${fix.count}x`);
      });
    });
    
    console.log('\n⚠️  IMPORTANT:');
    console.log('   1. Review all changes before committing');
    console.log('   2. Test your application thoroughly');
    console.log('   3. Backups created with .backup-* extension');
    console.log('   4. Run "npm run build" to verify everything works');
    
    console.log('\n🧪 RECOMMENDED NEXT STEPS:');
    console.log('   npm run build');
    console.log('   npm run dev');
    console.log('   # Test on multiple screen sizes');
  } else {
    console.log('\n🎉 No automatic fixes needed!');
    console.log('   Your code already follows responsive best practices.');
  }
}

main();
