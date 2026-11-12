/* ============================================================
   Goodbite — Cart Context
   Manages shopping cart state (add, remove, update qty, clear)
   ============================================================ */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const loadCart = () => {
  try {
    const raw = localStorage.getItem('goodbite_cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('goodbite_cart', JSON.stringify(items));
  }, [items]);

  const persist = useCallback(
    (next) => {
      setItems(next);
    },
    [setItems]
  );

  const addItem = useCallback(
    (food, addons = [], qty = 1) => {
      persist((prev) => {
        const existing = prev.find(
          (i) =>
            i.foodId === food.id &&
            JSON.stringify(i.addons) === JSON.stringify(addons)
        );
        if (existing) {
          return prev.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [
          ...prev,
          {
            foodId: food.id,
            food,
            addons,
            qty,
            itemKey: `${food.id}-${JSON.stringify(addons)}`,
          },
        ];
      });
    },
    [persist]
  );

  const removeItem = useCallback(
    (itemKey) => {
      persist((prev) => prev.filter((i) => i.itemKey !== itemKey));
    },
    [persist]
  );

  const updateQty = useCallback(
    (itemKey, delta) => {
      persist((prev) =>
        prev
          .map((i) =>
            i.itemKey === itemKey
              ? { ...i, qty: Math.max(0, i.qty + delta) }
              : i
          )
          .filter((i) => i.qty > 0)
      );
    },
    [persist]
  );

  const setQty = useCallback(
    (itemKey, qty) => {
      persist((prev) =>
        prev
          .map((i) =>
            i.itemKey === itemKey ? { ...i, qty: Math.max(0, qty) } : i
          )
          .filter((i) => i.qty > 0)
      );
    },
    [persist]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce(
    (sum, i) =>
      sum +
      (i.food.price + i.addons.reduce((a, o) => a + o.price, 0)) * i.qty,
    0
  );

  const value = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQty,
    setQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};

export default CartContext;
