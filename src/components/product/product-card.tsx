'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { AddToCartButton } from './add-to-cart-button';
import { Button } from '@/components/ui/button';
import { BLUR_DATA_URL } from '@/lib/constants';
import { ChevronLeft, ChevronRight, Star, Sparkles, Truck, Shield, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  product: AppProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images;
  const hasMultipleImages = images.length > 1;

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const discount = (product.compareAtPrice && product.compareAtPrice > product.price)
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block relative aspect-square w-full overflow-hidden rounded-t-2xl bg-muted">
          <Image
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].altText}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Beauty Pick
          </div>
          {discount > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Image Navigation - simplified */}
        {hasMultipleImages && (
          <>
            <div className={cn(
              "absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-10 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.slice(0, 5).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    idx === currentImageIndex ? "w-4 bg-primary" : "w-1.5 bg-foreground/20"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-tight px-1.5 py-0.5 rounded bg-primary/10">
            In Stock
          </span>
        </div>

        <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Truck className="h-3 w-3 text-primary" />
            Free Delivery
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Shield className="h-3 w-3 text-primary" />
            Authentic
          </span>
        </div>

        {/* Price & Action */}
        <div className="pt-3 mt-auto border-t flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {(product.compareAtPrice ?? 0) > product.price ? (
              <span className="text-[11px] font-medium text-muted-foreground line-through">PKR {product.compareAtPrice!.toLocaleString()}</span>
            ) : null}
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-primary">PKR</span>
              <span className="text-lg font-black text-foreground">{product.price.toLocaleString()}</span>
            </div>
          </div>

          <AddToCartButton
            product={product}
            variant="default"
            size="sm"
            className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            Add
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
