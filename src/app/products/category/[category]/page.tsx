
import { APP_NAME } from '@/lib/constants';
import { getAllCategories } from '@/lib/products';
import { CategoryClientPage } from './client-page';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

function formatCategoryTitle(slug: string): string {
  return decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const allCategories = getAllCategories();
  const categoryExists = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());

  if (!categoryExists) return { title: 'Category Not Found' };

  const formattedTitle = formatCategoryTitle(decodedCategory);
  return {
    title: `${formattedTitle} | ${APP_NAME}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const allCategories = getAllCategories();
  const categoryExists = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());

  if (!categoryExists) {
    return notFound();
  }

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <CategoryClientPage category={decodedCategory} />
    </div>
  );
}
