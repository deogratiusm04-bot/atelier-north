import { createContext } from 'react';
import type { CartItem, Product } from '../types';

export type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
