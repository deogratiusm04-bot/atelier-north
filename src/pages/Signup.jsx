/* ============================================================
   Goodbite — Signup Page
   ============================================================ */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4 text-brand">
              <span style={{ fontSize: '3rem' }} aria-hidden="true">🍽️</span>
            </div>
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="text-muted">Join Goodbite and start ordering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="signup-name"
              label="Full Name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              leftIcon={<UserIcon className="w-4 h-4" />}
            />
            <Input
              id="signup-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              leftIcon={<Lock className="w-4 h-4" />}
            />
            <Button variant="primary" full size="lg" type="submit" disabled={loading} className="mt-4">
              {loading ? <ArrowRight className="w-4 h-4 animate-spin mr-2" /> : null} Create account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
