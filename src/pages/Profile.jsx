/* ============================================================
   Goodbite — Profile Page
   User account settings & order history
   ============================================================ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { formatCurrency } from '../utils/helpers';
import { User, MapPin, Phone } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setEditing(false);
  };

  /* Guests get a real sign-in prompt — never a blank page */
  if (!user) {
    return (
      <div className="container px-4 py-16 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6">
          <User className="w-9 h-9 text-brand" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Sign in to view your profile</h2>
        <p className="text-muted mb-8">
          Save your details, track orders, and reorder your favourites in one
          tap.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link to="/login" state={{ from: '/profile' }}>Log In</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted">Manage your profile and orders</p>
        </div>
        <Button onClick={() => setEditing(!editing)}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile card */}
      <Card className="mb-10 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-24 h-24 rounded-full bg-brand/10 flex items-center justify-center text-4xl text-brand flex-shrink-0">
            <User className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{form.name}</h2>
              <Badge variant="neutral">Member since {user.memberSince}</Badge>
            </div>
            <p className="text-muted">{form.email}</p>
            <div className="mt-4 flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted" />
              <span className="text-secondary">{form.phone}</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted" />
              <span className="text-secondary max-w-xs">{form.address}</span>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-2xl font-bold text-warning">4.9★</div>
            <div className="text-sm text-muted">{user.orders} total orders</div>
          </div>
        </div>
      </Card>

      {/* Edit form */}
      {editing && (
        <Card className="mb-10">
          <div className="p-6">
            <h3 className="font-semibold mb-6">Edit Profile</h3>
            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                label="Delivery Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <div className="flex gap-3 pt-6">
                <Button variant="primary" type="submit">Save Changes</Button>
                <Button variant="outline" type="button" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Order history */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Order History</h2>
        <Link to="/orders" className="text-brand font-semibold hover:underline">
          View all orders →
        </Link>
      </div>
      <div className="history-grid">
        {MOCK_ORDERS.slice(0, 4).map((order) => (
          <Card key={order.id} className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-medium text-sm">Order #{order.id.replace('ord_', 'ORD-')}</span>
                <div className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <Badge
                variant={order.status === 'delivered' ? 'success' : 'warning'}
                className="text-xs"
              >
                {order.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium">{order.items.length} items</div>
                <div className="text-sm text-muted">{order.paymentMethod}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatCurrency(order.total)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
