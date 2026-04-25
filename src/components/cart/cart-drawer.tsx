
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { UpdateItemQuantity } from './update-item-quantity';
import { BLUR_DATA_URL } from '@/lib/constants';
import { Separator } from '../ui/separator';
import { CreditCard, ShoppingCart, Trash2 } from 'lucide-react';

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cartItems, removeFromCart } = useCart();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Your Cart ({cartItems.length})</SheetTitle>
          <SheetDescription className="sr-only">Shopping cart items</SheetDescription>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow">
              <div className="flex flex-col gap-5 px-6 py-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText}
                        fill
                        className="object-contain"
                        sizes="96px"
                        data-ai-hint="product image"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                       <div className="flex items-start justify-between gap-2">
                         <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline text-sm sm:text-base pr-2" onClick={handleLinkClick}>
                            {item.product.name}
                          </Link>
                         <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground flex-shrink-0" onClick={() => removeFromCart(item.product.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                         </Button>
                       </div>
                      <p className="text-sm text-muted-foreground">PKR {item.product.price}</p>
                      <div className="flex items-center justify-between mt-2">
                         <UpdateItemQuantity productId={item.product.id} quantity={item.quantity} />
                         <p className="text-sm font-medium">PKR {item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto bg-secondary/50 p-6">
              <Button asChild size="lg" className="w-full" onClick={handleLinkClick}>
                <Link href="/checkout">
                  <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                </Link>
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center px-6">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
                <ShoppingCart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Button variant="outline" asChild onClick={handleLinkClick}>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
