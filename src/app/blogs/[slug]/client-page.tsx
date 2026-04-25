
'use client';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CodeBlock } from '@/components/code-block';
import type { BlogPostWithContent } from '@/lib/blog-data';
import { TableOfContents } from '@/components/blog/Toc';

// Strip the duplicate title (first h2) and author byline (first p containing "By the") from content
function stripDuplicateHeaderElements(content: string): string {
    // Remove the first h2 tag (which is a duplicate title)
    let processedContent = content.replace(/<h2>.*?<\/h2>/i, '');
    // Remove the first p tag that contains "By the" or similar author/date line
    processedContent = processedContent.replace(/<p>By the.*?<\/p>/i, '');
    return processedContent.trim();
}

function parseContent(content: string) {
    // First strip the duplicate header elements
    const cleanedContent = stripDuplicateHeaderElements(content);
    const parts = cleanedContent.split(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g);
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
            if (parts[i].trim()) {
                elements.push(<div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: parts[i] }} />);
            }
        } else if (i % 3 === 1) {
            const lang = parts[i];
            const code = parts[i + 1];
            elements.push(
                <Suspense key={`code-${i}`} fallback={<div className="bg-muted rounded-md p-4">Loading code...</div>}>
                    <CodeBlock code={code} language={lang} />
                </Suspense>
            );
            i++;
        }
    }
    return elements;
}

// Smart Back Button Component
function SmartBackButton() {
    const router = useRouter();
    const [cameFromBlogs, setCameFromBlogs] = useState(false);

    useEffect(() => {
        // Check if user came from /blogs/ page
        const referrer = document.referrer;
        const cameFromBlogsPage = referrer.includes('/blogs') && !referrer.includes('/blogs/');
        setCameFromBlogs(cameFromBlogsPage);

        // Store scroll position when navigating to blog post
        if (cameFromBlogsPage) {
            // Save that we came from blogs
            sessionStorage.setItem('cameFromBlogs', 'true');
        }
    }, []);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if we came from blogs (either from referrer or session storage)
        const fromBlogs = cameFromBlogs || sessionStorage.getItem('cameFromBlogs') === 'true';

        if (fromBlogs && window.history.length > 1) {
            // Clear the session storage
            sessionStorage.removeItem('cameFromBlogs');
            // Navigate back to restore scroll position
            router.back();
        } else {
            // Navigate to blogs page
            router.push('/blogs');
        }
    };

    return (
        <button
            onClick={handleBackClick}
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-all no-underline group mb-10 px-3 py-1.5 rounded-full bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20"
        >
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Back to Insights
        </button>
    );
}


export function BlogPostClientPage({ post }: { post: BlogPostWithContent }) {
    const siteUrl = `https://www.kimi.pk`; // Hardcoded for simplicity or use APP_NAME if exported
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: `${siteUrl}/images/blog-placeholder.jpg`,
        author: {
            '@type': 'Organization',
            name: 'kimi.pk Team',
            url: siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'kimi.pk',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: new Date().toISOString(), // Fallback
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/blogs/${post.slug}`,
        },
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <TableOfContents />
            <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl 
          prose-p:leading-relaxed prose-p:mb-8 prose-p:text-slate-700 dark:prose-p:text-slate-300
          prose-headings:font-headline prose-headings:tracking-tight prose-headings:font-bold
          prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:mb-10 prose-h1:text-primary
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-li:my-3 prose-li:leading-relaxed
          prose-strong:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12">

                <div className="mb-14 pb-8">
                    <SmartBackButton />

                    <h1 className="not-prose text-4xl font-black tracking-tight lg:text-5xl mb-8 text-foreground leading-[1.15]">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 not-prose">
                        <Link href="/about" className="group/author flex items-center gap-4 no-underline bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/30 px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20 group-hover/author:scale-110 transition-transform duration-500">
                                K
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-0.5">Verified Source</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-bold text-foreground">kimi.pk Team</span>
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    <span className="text-[10px] font-bold text-primary uppercase">Editorial</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    {parseContent(post.content)}
                </div>
            </article>
        </div>
    );
}
