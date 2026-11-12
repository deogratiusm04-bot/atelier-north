/* ============================================================
   Goodbite — Checkout Page
   Delivery details, payment, place order
   ============================================================ */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { CreditCard, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState('details'); // details -> payment -> success
  const [form, setForm] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    instructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Simulate order placement
    setStep('success');
    clearCart();
  };

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link to="/menu" className="hover:text-brand">Menu</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-brand">Cart</Link>
        <span>/</span>
        <span className="font-medium">Checkout</span>
      </nav>

      {/* Step indicator */}
      <div className="mb-10 flex gap-1">
        {['details', 'payment', 'success'].map((s, i) => {
          const active = step === s;
          const completed = ['details', 'payment'].indexOf(step) > i || step === 'success';
          return (
            <div key={s} className="flex-1 relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  completed
                    ? 'bg-brand text-white'
                    : active
                    ? 'bg-brand text-white border-2 border-white shadow'
                    : 'bg-slate-100 text-slate-400 border border-border'
                }`}
              >
                {completed ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`mt-2 text-xs font-medium capitalize ${completed ? 'text-brand' : 'text-muted'}`}>
                {s}
              </span>
              {i < 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-brand" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {step === 'details' && (
        <div className="checkout-grid">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Delivery Details
                </h3>
                <Input
                  label="Delivery Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter your address"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter your phone"
                />
                <Input
                  label="Delivery Instructions (optional)"
                  value={form.instructions}
                  onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  placeholder="e.g., Leave at door, buzz apartment 4B"
                />
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.itemKey} className="flex justify-between items-start text-sm">
                      <div>
                        <div className="font-medium">{item.food.name}</div>
                        <div className="text-muted text-xs">
                          x{item.qty} {item.addons.length > 0 ? '(+extras)' : ''}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(
                            (item.food.price +
                              item.addons.reduce((s, a) => s + a.price, 0)) *
                              item.qty
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Delivery fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2">
                      <span>Total</span>
                      <span className="text-brand">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <Card className="p-6">
              <Button
                variant="primary"
                full
                size="lg"
                onClick={() => setStep('payment')}
                disabled={!form.address || !form.phone}
              >
                Continue to Payment
              </Button>
              <p className="mt-4 text-xs text-muted text-center">
                {form.address && form.phone ? 'Ready to proceed' : 'Please fill in address and phone'}
              </p>
            </Card>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="checkout-grid">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Method
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    { id: 'apple', label: 'Apple Pay', icon: '🍎' },
                    { id: 'google', label: 'Google Pay', icon: '📱' },
                    { id: 'cash', label: 'Cash on Delivery', icon: '💵' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors text-left ${
                        paymentMethod === method.id
                          ? 'border-brand bg-brand/5 text-brand font-semibold'
                          : 'border-border hover:border-brand/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span style={{ fontSize: '1.25rem' }}>{method.icon}</span>
                        <span>{method.label}</span>
                      </span>
                      {paymentMethod === method.id && <span className="text-brand">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.itemKey} className="flex justify-between text-sm">
                      <span className="text-muted">{item.food.name}</span>
                      <span className="font-medium">
                        {formatCurrency(
                          (item.food.price +
                            item.addons.reduce((s, a) => s + a.price, 0)) *
                            item.qty
                        )}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Delivery fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2">
                      <span>Total</span>
                      <span className="text-brand">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <Card className="p-6">
              <Button
                variant="primary"
                full
                size="lg"
                onClick={handlePlaceOrder}
              >
                Place Order — {formatCurrency(total)}
              </Button>
            </Card>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 text-success">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-muted mb-8">
            Thank you for ordering from Goodbite. Your food is being prepared.
          </p>
          <div className="inline-flex items-center gap-2 p-4 rounded-xl border border-success/20 bg-success/5 text-success text-sm">
            <Clock className="w-4 h-4" />
            <span>Estimated delivery: 25–40 min</span>
          </div>
          <div className="mt-10 flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/orders')}>
              Track Order
            </Button>
            <Button onClick={() => navigate('/menu')}>
              Order Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
