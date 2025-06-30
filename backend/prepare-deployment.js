const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Deployment hazırlığı başlıyor...');

// TypeScript'i derle
console.log('📦 TypeScript derleniyor...');
try {
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript derleme başarılı');
} catch (error) {
  console.error('❌ TypeScript derleme hatası:', error.message);
  process.exit(1);
}

// deployment klasörü oluştur
const deployDir = path.join(__dirname, 'deploy');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir);
}

// Gerekli dosyaları kopyala
const filesToCopy = [
  'app.js',
  'package.json',
  'package-lock.json',
  '.htaccess' // eğer varsa
];

const dirsToCopy = [
  'dist',
  'database'
];

// Dosyaları kopyala
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(deployDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ ${file} kopyalandı`);
  }
});

// Klasörleri kopyala
dirsToCopy.forEach(dir => {
  const src = path.join(__dirname, dir);
  const dest = path.join(deployDir, dir);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log(`✅ ${dir} klasörü kopyalandı`);
  }
});

// Recursive copy function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('\n✅ Deployment hazırlığı tamamlandı!');
console.log('📁 deploy/ klasöründeki dosyaları cPanel\'e yükleyin'); 