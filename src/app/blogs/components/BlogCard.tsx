'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
        href={`/blogs/${post.slug}`} 
        className="group flex flex-col items-center justify-center rounded-xl border bg-card text-center text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary aspect-video p-6"
    >
      <h3 className="text-base font-semibold leading-snug group-hover:text-primary">
        {post.title}
      </h3>
    </Link>
  );
}
