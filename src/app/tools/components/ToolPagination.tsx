
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ToolPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ToolPagination({ currentPage, totalPages }: ToolPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('page', String(page));
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= half) {
      for (let i = 1; i <= maxPagesToShow - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - half) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-4 py-2">
            {page}
          </span>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  );
}
