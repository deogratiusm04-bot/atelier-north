/* ============================================================
   Goodbite — Cart Page
   Full cart view: item rows with qty steppers, order summary,
   empty state. "Proceed to Checkout" routes to /checkout.
   ============================================================ */
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatCurrency } from '../utils/helpers';

const DELIVERY_FEE = 2.99;

export const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, removeItem, updateQty, clearCart } =
    useCart();

  const total = subtotal + DELIVERY_FEE;

  /* Empty state — everything links somewhere real */
  if (items.length === 0) {
    return (
      <div className="container px-4 py-16 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-9 h-9 text-brand" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted mb-8">
          Looks like you haven't added anything yet. Browse the menu and treat
          yourself.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link to="/menu" className="hover:text-brand">Menu</Link>
        <span>/</span>
        <span className="font-medium">Cart</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Your Cart{' '}
          <span className="text-brand">({itemCount})</span>
        </h2>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-muted hover:text-error underline underline-offset-4"
        >
          Clear cart
        </button>
      </div>

      <div className="checkout-grid">
        {/* Item rows */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const food = item.food;
            const addonsPrice = item.addons.reduce((sum, a) => sum + a.price, 0);
            const unitPrice = food.price + addonsPrice;
            return (
              <Card key={item.itemKey}>
                <div className="p-4 flex gap-4 items-center">
                  <Link
                    to={`/menu/${food.id}`}
                    className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border"
                    aria-label={`View ${food.name}`}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <Link
                          to={`/menu/${food.id}`}
                          className="font-semibold hover:text-brand transition-colors"
                        >
                          {food.name}
                        </Link>
                        <p className="text-xs text-muted mt-0.5">
                          {formatCurrency(unitPrice)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.itemKey)}
                        className="text-muted hover:text-error transition-colors"
                        aria-label={`Remove ${food.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.addons.length > 0 && (
                      <p className="text-xs text-muted mt-1">
                        Extras: {item.addons.map((a) => a.name).join(', ')}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <div
                        className="flex items-center gap-2"
                        role="group"
                        aria-label={`Quantity for ${food.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.itemKey, -1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-brand transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="w-5 text-center font-semibold"
                          aria-live="polite"
                        >
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.itemKey, 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-brand transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold">
                        {formatCurrency(unitPrice * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1 sticky top-24">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">
                  Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Delivery fee</span>
                <span>{formatCurrency(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span className="text-brand">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              full
              size="lg"
              className="mt-6"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outline"
              full
              className="mt-3"
              onClick={() => navigate('/menu')}
            >
              Continue Shopping
            </Button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
              <CheckCircle className="w-3.5 h-3.5 text-success" aria-hidden="true" />
              Free delivery on orders over $50
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
