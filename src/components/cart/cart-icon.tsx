'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartDrawer } from './cart-drawer';

export function CartIcon() {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {cartCount}
          </span>
        )}
        <span className="sr-only">Open cart</span>
      </Button>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
