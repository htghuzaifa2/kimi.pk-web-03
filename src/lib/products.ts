
import type { Product as RawProduct, ProductImage } from '@/lib/types';
export type { ProductImage };
import productsData from './products.json';

// This is the shape of the product object used throughout the app.
export type AppProduct = {
    id: string;
    slug: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    compareAtPrice?: number;
    category: string | string[];
    brand: string;
    images: ProductImage[];
    longDescription?: string;
    specifications?: Record<string, string>;
    inStock: boolean;
};

function transformProduct(product: RawProduct): AppProduct {
    return {
        id: product.id.toString(),
        slug: product.slug,
        name: product.title,
        description: product.shortDescription || product.description,
        shortDescription: product.shortDescription || '',
        price: product.price,
        compareAtPrice: product.compareAtPrice || 0,
        category: product.categories,
        brand: product.brand,
        images: product.images.map((img) => ({
            url: img.url,
            altText: img.alt,
        })),
        longDescription: product.description,
        specifications: Object.fromEntries(
            Object.entries(product.specs || {}).filter(([, v]) => v !== undefined)
        ) as Record<string, string>,
        inStock: true,
    };
}

// This is the primary function to get products.
// It reads the local JSON file and transforms the data.
// This is a direct, synchronous import, which is reliable for static builds.
export function getProducts(): AppProduct[] {
    try {
        const rawProducts = Array.isArray(productsData) ? productsData : [];
        return rawProducts.map(transformProduct);
    } catch (error) {
        console.error("Failed to load or parse products.json:", error);
        return [];
    }
}

export function getProductBySlug(slug: string): AppProduct | null {
    const products = getProducts();
    return products.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(category: string): AppProduct[] {
    const products = getProducts();
    const lowerCaseCategory = category.toLowerCase();
    return products.filter((p) => {
        const productCategory = Array.isArray(p.category) ? p.category : [p.category];
        return productCategory.some(c => c.toLowerCase() === lowerCaseCategory);
    });
}

export function getProductsByNames(names: string[]): AppProduct[] {
    const products = getProducts();
    const lowerCaseNames = names.map(name => name.toLowerCase());
    return products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
}

export function getAllCategories(): string[] {
    const products = getProducts();
    const categories = new Set(products.flatMap(p => Array.isArray(p.category) ? p.category : [p.category]));
    return Array.from(categories);
}
