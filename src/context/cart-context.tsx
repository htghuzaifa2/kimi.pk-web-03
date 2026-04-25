
'use client';

import React, { createContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type ProductInCart = CartItem['product'];

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductInCart) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCartLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kimi_pk_cart';
const SHIPPING_THRESHOLD = 2500;
const SHIPPING_FEE = 200;


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Could not load cart from localStorage", error);
    } finally {
        setIsCartLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isCartLoading) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Could not save cart to localStorage", error);
        }
    }
  }, [cartItems, isCartLoading]);

  const addToCart = useCallback((product: ProductInCart) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    toast({
        title: "Added to cart",
        description: `${product.name} is now in your cart.`,
        duration: 3000,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    let itemToRemoveName = '';
    
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.product.id === productId);
        if (itemToRemove) {
            itemToRemoveName = itemToRemove.product.name;
        }
        return prevItems.filter(item => item.product.id !== productId)
    });

    if (itemToRemoveName) {
        toast({
            title: "Item removed",
            description: `${itemToRemoveName} has been removed.`,
            duration: 3000,
        });
    }
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const cartItemsRef = useRef(cartItems);
  cartItemsRef.current = cartItems;

  const clearCart = useCallback(() => {
    if(cartItemsRef.current.length > 0){
        setCartItems([]);
        toast({
            title: "Cart cleared",
            description: `All items have been removed from your cart.`,
            duration: 3000,
        });
    }
  }, [toast]);

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  
  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cartItems]);

  const shippingCost = useMemo(() => (subtotal > 0 && subtotal < SHIPPING_THRESHOLD) ? SHIPPING_FEE : 0, [subtotal]);

  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingCost,
        total,
        isCartOpen,
        setIsCartOpen,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
