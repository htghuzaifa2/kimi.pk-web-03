
import { getToolBySlug, getTools, getDummyToolContent } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import MagicBento, { BentoItem } from '@/components/MagicBento';
import JsonLd from '@/components/json-ld';

export async function generateStaticParams() {
    const tools = getTools();
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) return { title: 'Tool Not Found' };

    return {
        title: `${tool.title} | ${APP_NAME}`,
        description: tool.description || `Use our ${tool.title} to improve your productivity.`,
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        return notFound();
    }

    // If we don't have a specific interactive component for this tool yet,
    // we show a nice "Coming Soon" or "Use this tool" placeholder structure.
    // Ideally, existing specific folder tools (like /tools/voice-to-text) take precedence
    // because Next.js file system routing prefers specific static/folder routes over dynamic [slug].

    // However, since we are putting this in [slug], this will ONLY receive traffic
    // for tools that DO NOT have a folder in src/app/tools.
    // So this is effectively the "Generic Tool Page".

    const siteUrl = `https://www.${APP_NAME}`;
    const toolUrl = `${siteUrl}/tools/${tool.slug}/`;

    const softwareApplicationData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.title,
        description: tool.description,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'PKR',
        },
        url: toolUrl,
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${siteUrl}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: `${siteUrl}/tools/`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: tool.title,
                item: toolUrl,
            },
        ],
    };

    return (
        <>
            <JsonLd data={softwareApplicationData} />
            <JsonLd data={breadcrumbData} />
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-foreground">
                            {tool.title}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {tool.description}
                        </p>
                    </div>

                    <div className="p-8 border rounded-3xl bg-secondary/5 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
                        {/* Abstract decorative element */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10 space-y-6">
                            {/* Icon if we had one mapped, otherwise generic */}
                            <div className="w-20 h-20 mx-auto bg-background rounded-2xl flex items-center justify-center shadow-sm border">
                                <span className="text-4xl">🛠️</span>
                            </div>

                            <div className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: getDummyToolContent(tool.title) }} />

                            {/*  Call to Action for "Perfect" look */}
                            <button className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25">
                                Launch Tool
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggest other tools */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8 text-center">Explore More Tools</h2>
                    {/* We could reuse a tool grid here, but keeping it simple for this file */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {getTools().slice(0, 3).map(t => (
                            <a key={t.id} href={`/tools/${t.slug}`} className="block p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-colors">
                                <h3 className="font-semibold text-lg mb-2">{t.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
