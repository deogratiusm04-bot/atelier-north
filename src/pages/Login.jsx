/* ============================================================
   Goodbite — Login Page
   Robust client validation, inline field errors, dismissible
   API/network error banner, loading state, show/hide password
   and smart post-login redirect (?redirectTo or location.state).
   ============================================================ */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

/* Pragmatic email shape: something@something.tld (no spaces) */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field, rawValue) => {
  const value = rawValue.trim();
  if (field === 'email') {
    if (!value) return 'Email is required.';
    if (!EMAIL_RE.test(value)) {
      return 'Enter a valid email address — e.g. you@example.com';
    }
    return null;
  }
  if (field === 'password') {
    if (!value) return 'Password is required.';
    return null;
  }
  return null;
};

/* Map any auth failure (thrown or returned) to a friendly banner */
const failureToBanner = (failure) => {
  if (!failure) return null;
  switch (failure.kind) {
    case 'network':
      return {
        title: 'Connection problem',
        text: "We couldn't reach Goodbite servers. Check your internet connection and try again.",
      };
    case 'credentials':
      return {
        title: "We couldn't sign you in",
        text: 'That email and password don’t match an account. Check your details and try again.',
      };
    default:
      return {
        title: 'Something went wrong',
        text: failure.message || 'Please try again in a moment.',
      };
  }
};

/* Only allow same-origin, path-only redirect targets */
const sanitizeRedirect = (candidate) => {
  if (typeof candidate !== 'string') return '/';
  if (!candidate.startsWith('/') || candidate.startsWith('//')) return '/';
  return candidate;
};

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: null, password: null });
  const [failure, setFailure] = useState(null); // { kind, message } from the "API"
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const banner = failureToBanner(failure);

  /* Post-login destination: protected route that bounced us here,
     ?redirectTo= deep link, otherwise home. */
  const redirectTo = sanitizeRedirect(
    (location.state && location.state.from) ||
      new URLSearchParams(location.search).get('redirectTo') ||
      '/'
  );

  const setFieldValue = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error as the user fixes it
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: null } : prev));
  };

  const blurValidate = (field) => {
    const message = validateField(field, form[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // 1) Client-side validation — block submission until clean
    const emailError = validateField('email', form.email);
    const passwordError = validateField('password', form.password);
    setFieldErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    // 2) Fresh attempt — new banner state
    setFailure(null);
    setBannerDismissed(false);

    try {
      const res = await login(form);

      if (res.success) {
        // 3) Return to the page that required auth, or home
        navigate(redirectTo, { replace: true });
      } else {
        setFailure(res.error || { kind: 'api', message: res.message });
      }
    } catch (err) {
      // Thrown = transport-level failure (network, server unreachable)
      setFailure({
        kind: err && err.kind ? err.kind : 'network',
        message: err && err.message,
      });
    }
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      aria-pressed={showPassword}
      title={showPassword ? 'Hide password' : 'Show password'}
      className="flex items-center justify-center w-7 h-7 rounded-full text-muted hover:text-brand transition-colors cursor-pointer"
    >
      {showPassword ? (
        <EyeOff className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Eye className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );

  return (
    <div className="min-h-[70svh] flex items-center justify-center px-4 py-6 sm:py-10">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4 text-brand">
              <span style={{ fontSize: '3rem' }} aria-hidden="true">
                🍽️
              </span>
            </div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted">Sign in to your Goodbite account</p>
          </div>

          {/* Dismissible API / network error banner */}
          {banner && !bannerDismissed && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 flex items-start gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{banner.title}</p>
                <p className="mt-0.5">{banner.text}</p>
              </div>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss error message"
                className="text-red-500 hover:text-red-700 shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Enter inside either input submits the form (native) */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              id="login-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
              onBlur={() => blurValidate('email')}
              error={!!fieldErrors.email}
              hint={fieldErrors.email || undefined}
              leftIcon={<Mail className="w-4 h-4" />}
              disabled={loading}
            />
            <Input
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              onBlur={() => blurValidate('password')}
              error={!!fieldErrors.password}
              hint={fieldErrors.password || undefined}
              leftIcon={<Lock className="w-4 h-4" />}
              trailing={passwordToggle}
              disabled={loading}
            />
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-remember"
                className="flex items-center gap-2 text-sm cursor-pointer select-none"
              >
                <input
                  id="login-remember"
                  type="checkbox"
                  className="accent-brand"
                  tabIndex={0}
                />
                Remember me
              </label>
              <Link to="/faq" className="text-sm text-brand hover:underline">
                Forgot password? Get help
              </Link>
            </div>
            <Button
              variant="primary"
              full
              size="lg"
              type="submit"
              disabled={loading}
              className="mt-4"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    className="w-4 h-4 animate-spin mr-2"
                    aria-hidden="true"
                  />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Demo error triggers (remove when a real API exists) */}
          {!loading && (
            <p className="mt-4 text-center text-xs text-muted">
              Demo: any credentials work · password{' '}
              <code>wrongpass</code> → invalid credentials ·{' '}
              <code>you@offline.com</code> → network error
            </p>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
