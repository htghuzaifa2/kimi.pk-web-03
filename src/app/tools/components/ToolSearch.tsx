'use client';

import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { performSearch } from '@/lib/search-utils';
import { useDebounce } from 'use-debounce';
import type { Tool } from '@/lib/tool-data';
import ToolCard from './ToolCard';
import ToolPagination from './ToolPagination';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

interface ToolSearchProps {
  allTools: Tool[];
  itemsPerPage: number;
}

export default function ToolSearch({ allTools, itemsPerPage }: ToolSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (allTools.length > 0) {
      setIsLoading(false);
    }
  }, [allTools]);

  const filteredTools = useMemo(() => {
    if (!debouncedQuery) return allTools;
    return performSearch(debouncedQuery, allTools);
  }, [debouncedQuery, allTools]);

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const currentTools = filteredTools.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="space-y-8">
      <input
        className="mx-auto block w-full max-w-lg rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Search for tools by title..."
      />

      <div>
        {currentTools.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {currentTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12">
                <ToolPagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No tools found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
