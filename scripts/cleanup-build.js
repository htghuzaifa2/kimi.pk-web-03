const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function deleteFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            deleteFiles(fullPath);
        } else if (file.endsWith('.txt') || file.endsWith('.map')) {
            fs.unlinkSync(fullPath);
        }
    }
}

console.log('Cleaning up .txt and .map files from build output to stay under Cloudflare limit...');
deleteFiles(outDir);
console.log('Cleanup complete.');
