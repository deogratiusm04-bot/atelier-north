/* ============================================================
   Goodbite — CartDrawer
   Slide-out cart sidebar with items, totals, checkout
   ============================================================ */
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';

export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, removeItem, updateQty, clearCart } =
    useCart();

  /* Route to the real checkout flow */
  const handleCheckout = () => {
    if (onClose) onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop z-40" onClick={onClose} />
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface border-l shadow-lg flex flex-col"
        style={{ borderColor: 'var(--border)', transform: 'translateX(0)', transition: 'transform 0.3s ease' }}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Your Cart ({itemCount})</h3>
          <button type="button" onClick={onClose} className="text-muted" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span style={{ fontSize: '3rem' }} aria-hidden="true">🛒</span>
              <h3 className="font-bold text-lg mb-2">Your cart is empty</h3>
              <p className="text-secondary mb-6">Looks like you haven't added anything yet.</p>
              <Button variant="primary" asChild>
                <Link to="/menu" onClick={onClose}>Browse Menu</Link>
              </Button>
            </div>
          ) : (
                <>
                  {items.map((item) => {
                    const food = item.food;
                    const addonsPrice = item.addons.reduce((sum, a) => sum + a.price, 0);
                    const unitPrice = food.price + addonsPrice;
                    return (
                      <div key={item.itemKey} className="flex gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full rounded-lg object-cover border border-border"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-semibold text-sm line-clamp-1">{food.name}</h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.itemKey)}
                              className="text-muted hover:text-error"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.addons.length > 0 && (
                            <p className="text-xs text-muted mb-2">
                              {item.addons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQty(item.itemKey, -1)}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center text-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-4 text-center font-medium">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.itemKey, 1)}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center text-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="mt-1 font-medium text-sm">
                            {formatCurrency(unitPrice * item.qty)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary">Subtotal</span>
                      <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-secondary">Delivery fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="flex justify-between font-bold text-base mb-6">
                      <span>Total</span>
                      <span>{formatCurrency(subtotal + 2.99)}</span>
                    </div>
                    <Button
                      variant="primary"
                      full
                      onClick={handleCheckout}
                      disabled={items.length === 0}
                    >
                      Checkout
                    </Button>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full text-xs text-error underline underline-offset-4 mt-3 hover:text-error/80"
                    >
                      Clear cart
                    </button>
                  </div>
                </>
              )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
