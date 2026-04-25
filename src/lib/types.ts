export type ProductImage = {
  url: string;
  altText: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  currency?: string;
  brand: string;
  categories: string[];
  images: { url: string; alt: string }[];
  shortDescription?: string;
  description: string;
  specs?: Record<string, string | undefined>;
  compareAtPrice?: number;
  categorySlugs?: string[];
};

export type CartItem = {
  product: {
    id: string;
    name: string;
    price: number;
    images: ProductImage[];
    slug: string;
  };
  quantity: number;
};
