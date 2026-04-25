
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'lib', 'blog-data.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// Count occurrences of "id": which strictly corresponds to blog entries in the JSON structure
const match = content.match(/"id":/g);
console.log(`Total blog posts found: ${match ? match.length : 0}`);
