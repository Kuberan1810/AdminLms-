const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (!dirPath.includes('node_modules')) {
      let isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    }
  });
}

// Files manually adjusted or containing intentional user overrides
const excludeFiles = [
    'SettingsSidebar.tsx',
    'SideBar.tsx',
    'CourseQACard.tsx',
    'Chat.tsx',
    'Chats.tsx',
    'Routes.tsx',
    'Header.tsx',
    'StudentLayout.tsx',
    'ProfileDropdownMenu.tsx',
    'ConfirmLogoutModal.tsx'
];

const dirToWalk = 'd:/me/lms files/frontend git/LMS/src';

walkDir(dirToWalk, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let basename = path.basename(filePath);
    if (excludeFiles.includes(basename)) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Quick check if file has iconsax-react
    const importRegex = /import\s+{([^}]+)}\s+from\s+['"]iconsax-react['"]/g;
    let match;
    let icons = [];
    while ((match = importRegex.exec(content)) !== null) {
      const importedNames = match[1].split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => s.split(/\s+as\s+/).pop().trim());
      icons.push(...importedNames);
    }
    
    if (icons.length > 0) {
      // Get HEAD version
      let relPath = path.relative('d:/me/lms files/frontend git/LMS', filePath).replace(/\\/g, '/');
      let oldContent = '';
      try {
         oldContent = execSync(`git show HEAD:"${relPath}"`, { encoding: 'utf8', stdio: 'pipe' });
      } catch (e) {
         return; // if new file, skip restoring
      }

      let modified = content;
      let offset = 0;
      
      let allNewMatches = [];
      let allOldMatches = [];
      
      icons.forEach(iconName => {
         const regexStr = `<${iconName}\\b((?:[^>"']|"[^"]*"|'[^']*'|\\{[^}]*\\})*)>`;
         const oldRegex = new RegExp(regexStr, 'g');
         const newRegex = new RegExp(regexStr, 'g');
         
         let om = Array.from(oldContent.matchAll(oldRegex));
         let nm = Array.from(content.matchAll(newRegex));
         
         if (om.length === nm.length) {
            for (let i = 0; i < nm.length; i++) {
               allNewMatches.push({ index: nm[i].index, match: nm[i], oldMatch: om[i] });
            }
         }
      });
      
      allNewMatches.sort((a, b) => a.index - b.index);
      
      allNewMatches.forEach(item => {
          let oldTag = item.oldMatch[0];
          let newTag = item.match[0];
          let newIndex = item.index + offset;
          
          let origColorMatch = oldTag.match(/\bcolor=(["'])(.*?)\1|\bcolor=\{([^}]+)\}/);
          let origColor = origColorMatch ? origColorMatch[0] : null;
          
          let precedingContext = modified.substring(Math.max(0, newIndex - 300), newIndex);
          // Simple heuristic: search backwards for "iconstyle" (case insensitive)
          let lastIconStyleIndex = precedingContext.toLowerCase().lastIndexOf('iconstyle');
          let lastClosingTagIndex = precedingContext.lastIndexOf('</');
          
          let shouldKeepCurrentColor = false;
          if (lastIconStyleIndex !== -1 && lastIconStyleIndex > lastClosingTagIndex) {
              shouldKeepCurrentColor = true;
          }
          
          if (!shouldKeepCurrentColor) {
              // Restore original tag attributes from oldTag by ripping out the added currentColor 
              let restoredTag = newTag.replace(/\s*\bcolor=["']currentColor["']/, '');
              
              if (origColor) {
                 if (restoredTag.endsWith('/>')) {
                     restoredTag = restoredTag.slice(0, -2) + ' ' + origColor + ' />';
                 } else if (restoredTag.endsWith('>')) {
                     restoredTag = restoredTag.slice(0, -1) + ' ' + origColor + '>';
                 }
              }
              
              modified = modified.substring(0, newIndex) + restoredTag + modified.substring(newIndex + newTag.length);
              offset += (restoredTag.length - newTag.length);
          }
      });
      
      if (modified !== content) {
         fs.writeFileSync(filePath, modified, 'utf8');
         console.log('Reverted/updated', filePath);
      }
    }
  }
});
