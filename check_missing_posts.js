
const fs = require('fs');

const contentMapPath = String.raw`d:\Web Dev\kimi.pk-web\k v3\k    v   3\src\lib\blog-contents.ts`;
const blogDataPath = String.raw`d:\Web Dev\kimi.pk-web\k v3\k    v   3\src\lib\blog-data.ts`;

try {
    const contentMapData = fs.readFileSync(contentMapPath, 'utf8');
    const blogDataData = fs.readFileSync(blogDataPath, 'utf8');

    // Extract keys from contentMap
    // Matches 'key': { or "key": {
    const contentMapKeys = [];
    const contentMapRegex = /['"]([\w-]+)['"]\s*:\s*{/g;
    let match;
    while ((match = contentMapRegex.exec(contentMapData)) !== null) {
        contentMapKeys.push(match[1]);
    }

    // Extract IDs from blogPosts
    // Matches id: 'key' or id: "key"
    const blogPostIds = [];
    const blogPostRegex = /id\s*:\s*['"]([\w-]+)['"]/g;
    while ((match = blogPostRegex.exec(blogDataData)) !== null) {
        blogPostIds.push(match[1]);
    }

    console.log(`Found ${contentMapKeys.length} items in contentMap.`);
    console.log(`Found ${blogPostIds.length} items in blogPosts.`);

    const missingInBlogPosts = contentMapKeys.filter(key => !blogPostIds.includes(key));
    const missingInContentMap = blogPostIds.filter(id => !contentMapKeys.includes(id));

    if (missingInBlogPosts.length > 0) {
        console.log("Missing in blogPosts (present in contentMap):");
        missingInBlogPosts.forEach(id => console.log(id));
    } else {
        console.log("All contentMap items are present in blogPosts.");
    }

    if (missingInContentMap.length > 0) {
        console.log("Missing in contentMap (present in blogPosts):");
        missingInContentMap.forEach(id => console.log(id));
    } else {
        console.log("All blogPosts items are present in contentMap.");
    }

} catch (err) {
    console.error(err);
}
