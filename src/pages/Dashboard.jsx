/* ============================================================
   Goodbite — Dashboard Page (Restaurant Owner)
   ============================================================ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ORDERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/helpers';
import { Clock, Star, ShoppingCart, CreditCard } from 'lucide-react';

const ICONS = {
  clock: Clock,
  star: Star,
  cart: ShoppingCart,
  card: CreditCard,
};

const STATS = [
  { label: 'Total Sales', value: '$1,240', icon: 'cart', change: '+12%' },
  { label: 'Orders Today', value: '24', icon: 'clock', change: '+5%' },
  { label: 'Avg Rating', value: '4.9★', icon: 'star', change: '+0.2' },
  { label: 'Revenue', value: formatCurrency(1240.5), icon: 'card', change: '+8%' },
];

export const Dashboard = () => {
  const IconMap = (name) => ICONS[name] || Clock;
  const [storeOnline, setStoreOnline] = useState(true);

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
          <p className="text-muted">Manage your Goodbite location</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="stats-grid mb-10">
        {STATS.map((stat) => {
          const Icon = IconMap(stat.icon);
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted">{stat.label}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xs text-success font-medium">▲ {stat.change} vs last week</div>
            </Card>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="dashboard-grid">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Recent Orders
              </h3>
              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 rounded-lg border border-border hover:border-brand/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs">
                        #{order.id.slice(-3)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Customer Order</div>
                        <div className="text-xs text-muted">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={order.status === 'delivered' ? 'success' : 'warning'}
                        className="text-xs px-2 py-1"
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                      <div className="font-bold text-sm">{formatCurrency(order.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/menu"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-border text-left hover:bg-slate-50 transition-colors"
              >
                <span>Update Menu</span>
                <span className="text-sm text-muted" aria-hidden="true">→</span>
              </Link>
              <Link
                to="/orders"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-border text-left hover:bg-slate-50 transition-colors"
              >
                <span>Track Live Orders</span>
                <span className="text-sm text-muted" aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                onClick={() => setStoreOnline((v) => !v)}
                aria-pressed={!storeOnline}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-brand text-brand hover:bg-brand/10 transition-colors"
              >
                <span>Toggle Online Status</span>
                <span className="text-xs font-semibold">
                  {storeOnline ? 'Open' : 'Paused'}
                </span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
