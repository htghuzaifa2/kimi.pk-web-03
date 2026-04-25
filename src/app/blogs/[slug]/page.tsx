import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { BlogPostClientPage } from './client-page';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { APP_NAME } from '@/lib/constants';
import JsonLd from '@/components/json-ld';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const siteUrl = `https://www.${APP_NAME}`;
  const canonicalUrl = `${siteUrl}/blogs/${post.slug}/`;
  // For simplicity, we use a generic blog image if not specified. 
  // In a real project, this would ideally be dynamic per post.
  const imageUrl = `${siteUrl}/images/blog-placeholder.jpg`;

  return {
    title: `${post.title} | ${APP_NAME}`,
    description: post.description || post.title,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url: canonicalUrl,
      siteName: APP_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.title,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const siteUrl = `https://www.${APP_NAME}`;
  const postUrl = `${siteUrl}/blogs/${post.slug}/`;
  const imageUrl = `${siteUrl}/images/blog-placeholder.jpg`;

  const blogPostingData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.title,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: APP_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: APP_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`,
      },
    },
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
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
        name: 'Blogs',
        item: `${siteUrl}/blogs/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingData} />
      <JsonLd data={breadcrumbData} />
      <BlogPostClientPage post={post} />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientOnlyRelatedProducts />
        </Suspense>
      </div>
    </>
  );
}
