
'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { AppProduct } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';

type AddToCartButtonProps = {
  product: AppProduct;
} & ButtonProps;

export function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
    };
    addToCart(cartProduct);
  }

  return (
    <Button
      onClick={handleAddToCart}
      {...props}
    >
      {props.children || (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </>
      )}
    </Button>
  );
}
