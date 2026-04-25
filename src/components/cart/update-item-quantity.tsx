'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

type UpdateItemQuantityProps = {
  productId: string;
  quantity: number;
};

export function UpdateItemQuantity({ productId, quantity }: UpdateItemQuantityProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-1 rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => (quantity > 1 ? updateQuantity(productId, quantity - 1) : removeFromCart(productId))}
      >
        {quantity > 1 ? <Minus className="h-3 w-3" /> : <Trash2 className="h-3 w-3 text-destructive" />}
        <span className="sr-only">{quantity > 1 ? 'Decrease quantity' : 'Remove item'}</span>
      </Button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(productId, quantity + 1)}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
