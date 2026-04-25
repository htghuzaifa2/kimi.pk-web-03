
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { performSearch } from '@/lib/search-utils';
import { useDebounce } from 'use-debounce';
import type { BlogPost } from '@/lib/blog-data';
import BlogCard from './BlogCard';
import BlogPagination from './BlogPagination';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

interface BlogSearchProps {
  allPosts: BlogPost[];
  itemsPerPage: number;
}

export default function BlogSearch({ allPosts, itemsPerPage }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (allPosts.length > 0) {
      setIsLoading(false);
    }
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return allPosts;
    return performSearch(debouncedQuery, allPosts);
  }, [debouncedQuery, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="space-y-12">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="block w-full pl-12 pr-4 py-4 text-lg rounded-2xl border bg-card/50 backdrop-blur-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all shadow-sm hover:shadow-md"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Explore articles, guides, and analysis..."
        />
      </div>

      <div className="min-h-[400px]">
        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <BlogPagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-secondary/5 rounded-3xl border-2 border-dashed border-muted">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">No Insights Found</h2>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto text-sm">
              We couldn't find any articles matching your search. Try different keywords or browse our archive.
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-6 text-primary font-semibold hover:underline flex items-center gap-2 mx-auto"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
