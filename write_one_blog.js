const fs = require('fs');
const path = require('path');

const blogContentDir = path.join(process.cwd(), 'src', 'lib', 'blog-content');

// Helper to ensure directory exists
if (!fs.existsSync(blogContentDir)) {
    fs.mkdirSync(blogContentDir, { recursive: true });
}

// Function to write a blog post
function writeBlogPost(slug, title, htmlContent) {
    const filePath = path.join(blogContentDir, `${slug}.ts`);
    const fileContent = `
export default \`
${htmlContent}
\`;
`;
    fs.writeFileSync(filePath, fileContent);
    console.log(`Generated: ${slug}.ts`);
}

// Data passed from the LLM via command line argument (base64 encoded JSON)
const args = process.argv.slice(2);
if (args.length > 0) {
    try {
        const blog = JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8'));
        writeBlogPost(blog.slug, blog.title, blog.content);
    } catch (e) {
        console.error("Error parsing blog data:", e);
    }
}
