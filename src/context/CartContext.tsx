import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';
import { CartContext } from './CartContextValue';

const STORAGE_KEY = 'atelier-north-cart';

function readCart(): CartItem[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    const value: unknown = JSON.parse(saved);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is CartItem =>
      typeof item === 'object' &&
      item !== null &&
      'product' in item &&
      'size' in item &&
      'quantity' in item &&
      typeof item.size === 'string' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
    );
  } catch (error) {
    console.warn('Unable to restore the saved shopping bag.', error);
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  const updateItems = useCallback((updater: (current: CartItem[]) => CartItem[]) => {
    setItems((current) => {
      const next = updater(current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addToCart = useCallback((product: Product, size: string) => {
    updateItems((current) => {
      const match = current.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (match) {
        return current.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { product, size, quantity: 1 }];
    });
  }, [updateItems]);

  const setQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    updateItems((current) =>
      current.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  }, [updateItems]);

  const removeFromCart = useCallback((productId: string, size: string) => {
    updateItems((current) =>
      current.filter((item) => item.product.id !== productId || item.size !== size),
    );
  }, [updateItems]);

  const clearCart = useCallback(() => {
    updateItems(() => []);
  }, [updateItems]);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
  }), [items, addToCart, setQuantity, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

