/* ============================================================
   Goodbite — Order Tracking Page
   Live order status with stepper
   ============================================================ */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ORDER_STATUS_STEPS, MOCK_ORDERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/helpers';
import { CheckCircle2, Clock, Truck, Scroll, Home as HomeIcon } from 'lucide-react';

const STATUS_ICONS = {
  placed: Scroll,
  confirmed: CheckCircle2,
  preparing: Clock,
  out_for_delivery: Truck,
  delivered: HomeIcon,
};

export const OrderTracking = () => {
  const navigate = useNavigate();
  const [activeOrderId, setActiveOrderId] = useState('ord_1002');
  const order = MOCK_ORDERS.find((o) => o.id === activeOrderId) || MOCK_ORDERS[0];

  // Determine current step index
  const stepIndex = ORDER_STATUS_STEPS.findIndex((s) => s.id === order.status);
  const progress = ((Math.max(0, stepIndex) + 1) / ORDER_STATUS_STEPS.length) * 100;

  const statusLabels = {
    placed: 'Order Placed',
    confirmed: 'Restaurant Confirmed',
    preparing: 'Preparing Your Food',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  };

  return (
    <div className="container px-4 py-8 max-w-3xl mx-auto">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link to="/" className="hover:text-brand">
          <HomeIcon className="w-4 h-4 mr-1" /> Home
        </Link>
        <span>/</span>
        <span className="font-medium">Order Tracking</span>
      </nav>

      {/* Order selector */}
      <Card className="mb-8 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Track your order</h3>
            <p className="text-sm text-muted">
              Order #{order.id.replace('ord_', 'ORD-')}
            </p>
          </div>
          <div className="flex gap-2">
            {MOCK_ORDERS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActiveOrderId(o.id)}
                className={`px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
                  activeOrderId === o.id
                    ? 'border-brand bg-brand text-white'
                    : 'border-border text-slate-600 hover:border-brand/50'
                }`}
              >
                {o.id.replace('ord_', 'ORD-')}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Order status header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">{statusLabels[order.status]}</h2>
          <p className="text-muted">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <Badge
          variant={
            order.status === 'delivered'
              ? 'success'
              : order.status === 'out_for_delivery'
              ? 'info'
              : 'warning'
          }
          className="text-base px-4 py-2"
        >
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Progress stepper */}
      <div className="relative mb-12">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-px h-full bg-slate-200" />
        {ORDER_STATUS_STEPS.map((step, i) => {
          const completed = i <= Math.max(0, stepIndex);
          const Icon = STATUS_ICONS[step.id] || Clock;
          return (
            <div key={step.id} className="relative z-10 flex items-center gap-3 w-full max-w-[180px] mx-auto">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all ${
                  completed
                    ? 'bg-brand text-white'
                    : 'bg-slate-100 text-slate-400 border border-border'
                }`}
              >
                {completed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-medium ${completed ? 'text-slate-700' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-slate-200 h-1 rounded-full mb-6">
        <div
          className="bg-brand h-1 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Order details */}
      <div className="tracking-grid">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Estimated Delivery
              </h3>
              <div className="text-center py-6 rounded-xl border border-dashed border-border">
                <span className="text-3xl font-bold text-brand">25–40 min</span>
                <p className="text-muted text-sm mt-1">from now</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                      <img
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted">x{item.qty}</div>
                    </div>
                    <div className="font-medium text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Order Total</h3>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-brand">{formatCurrency(order.total)}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Payment</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Address</span>
                <span className="font-medium text-left">{order.deliveryAddress}</span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" full onClick={() => navigate('/menu')}>
                Order Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
