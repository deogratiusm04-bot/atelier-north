/* ============================================================
   Goodbite — Navbar
   Sticky navigation bar with brand, search, auth & cart +
   executive-grade slide-out mobile drawer:
   profile header · icon list items with active accent bar ·
   counter pills · loyalty promo card · dark mode switch.
   ============================================================ */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronRight,
  Crown,
  Gift,
  HelpCircle,
  Home,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Receipt,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sun,
  User,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ORDERS, ORDER_STATUS_STEPS } from '../../data/mockData';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [promoCopied, setPromoCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('goodbite-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const closeRef = useRef(null);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  /* Return the user to the page they were on after signing in */
  const authIntent = { from: location.pathname + location.search };

  /* Live order tracking: the latest non-delivered order drives the Orders pill */
  const activeOrder = [...MOCK_ORDERS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .find((o) => o.status !== 'delivered');
  const activeOrderLabel = activeOrder
    ? (ORDER_STATUS_STEPS.find((s) => s.id === activeOrder.status)?.label ??
       'In progress')
    : null;

  /* Escape closes the drawer */
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  /* Scroll lock + focus management while the drawer is open */
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Persist dark mode (beta theme tokens) */
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('goodbite-theme', darkMode ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
  }, [darkMode]);

  const closeDrawer = () => setIsOpen(false);

  const handleInvite = () => {
    try {
      navigator.clipboard?.writeText('EAT10-FRIEND');
    } catch {
      /* clipboard unavailable */
    }
    setPromoCopied(true);
    setTimeout(() => setPromoCopied(false), 2000);
  };

  const drawerLinks = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/menu', label: 'Menu', Icon: UtensilsCrossed },
    {
      to: '/cart',
      label: 'Cart',
      Icon: ShoppingBag,
      badge: itemCount > 0 ? { label: `${itemCount}`, tone: 'brand' } : null,
    },
    {
      to: '/orders',
      label: 'My Orders',
      Icon: Receipt,
      badge:
        activeOrder && activeOrderLabel
          ? {
              label: activeOrderLabel,
              tone:
                activeOrder.status === 'out_for_delivery' ? 'live-green' : 'live-amber',
            }
          : null,
    },
    { to: '/profile', label: 'Profile', Icon: User },
  ];

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 font-display font-bold"
            style={{ fontSize: '1.375rem', color: 'var(--slate-800)' }}
            aria-label="Goodbite — Home"
          >
            <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🍽️</span>
            <span>Goodbite</span>
          </Link>

          {/* Search — vertically aligned with brand & actions */}
          <div className="search-wrap">
            <Search className="search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search dishes, cuisines, restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              aria-label="Search menu"
            />
          </div>

          {/* Actions — icon buttons align on the same 2.75rem row */}
          <div className="header-actions">
            <Link to="/cart" className="cart-btn btn-icon" title="View Cart" aria-label="View cart">
              <ShoppingCart className="w-5 h-5" strokeWidth={2} />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </Link>

            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={logout} className="hidden md:inline-flex">
                  Sign out
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-brand/10 text-brand flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <span className="hidden sm:inline">{user.name}</span>
                    </span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" state={authIntent}>Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup" state={authIntent}>Sign up</Link>
                </Button>
              </>
            )}

            <button
              type="button"
              className="btn-icon md:hidden"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer backdrop — semi-transparent with blur */}
      <div
        className={`drawer-backdrop${isOpen ? ' drawer-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile slide-out drawer */}
      <aside
        className={`drawer${isOpen ? ' drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Goodbite menu"
        aria-hidden={!isOpen}
      >
        {/* Profile header — guest/login state drives the whole card */}
        <div className="drawer-header">
          <span className="drawer-avatar" aria-hidden="true">
            {user?.avatar ? <img src={user.avatar} alt="" /> : '🧑‍🍳'}
          </span>
          <Link
            to={user ? '/profile' : '/login'}
            state={user ? undefined : authIntent}
            className="drawer-user"
            onClick={closeDrawer}
            aria-label={user ? 'Manage your account' : 'Sign in to your account'}
          >
            <p className="drawer-user-name">{user ? user.name : 'Goodbite Guest'}</p>
            {user?.email ? (
              <p className="drawer-user-sub">{user.email}</p>
            ) : (
              <p className="drawer-user-sub">Tap to sign in — it takes seconds</p>
            )}
            <span className={`drawer-status${user ? '' : ' drawer-status-muted'}`}>
              <Crown aria-hidden="true" />
              {user ? 'Gold Member' : 'Guest'}
            </span>
          </Link>
          <div className="drawer-header-actions">
            <Link
              to="/profile"
              className="drawer-icon-btn"
              onClick={closeDrawer}
              aria-label="Account settings"
              title="Account settings"
            >
              <Settings aria-hidden="true" className="w-4 h-4" />
            </Link>
            <button
              type="button"
              ref={closeRef}
              className="drawer-icon-btn"
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary nav — elevated list items with active accent bar */}
        <nav className="drawer-nav" aria-label="Primary">
          {drawerLinks.map(({ to, label, Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `drawer-item${isActive ? ' drawer-item-active' : ''}`
              }
              onClick={closeDrawer}
            >
              <span className="drawer-item-icon">
                <Icon aria-hidden="true" className="w-5 h-5" />
              </span>
              <span className="drawer-item-label">{label}</span>
              {badge && (
                <span
                  key={badge.label}
                  className={`drawer-pill ${
                    badge.tone === 'brand'
                      ? 'drawer-pill-brand'
                      : badge.tone === 'live-green'
                        ? 'drawer-pill-live-green'
                        : badge.tone === 'live-amber'
                          ? 'drawer-pill-live-amber'
                          : 'drawer-pill-muted'
                  }`}
                >
                  {(badge.tone === 'live-green' || badge.tone === 'live-amber') && (
                    <span className="drawer-live-dot" aria-hidden="true" />
                  )}
                  {badge.label}
                </span>
              )}
              <ChevronRight className="drawer-item-chevron" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        {/* Loyalty promo card */}
        <div className="drawer-promo">
          <div className="drawer-promo-card">
            <span className="drawer-promo-kicker">
              <Gift aria-hidden="true" /> Goodbite Pass
            </span>
            <p className="drawer-promo-title">Get $10 off</p>
            <p className="drawer-promo-text">
              Invite friends — you both get $10 credit on their first order.
            </p>
            <button type="button" className="drawer-promo-cta" onClick={handleInvite}>
              {promoCopied ? 'Code copied ✓' : 'Invite Friends'}
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Quick rows: dark mode, help, auth */}
        <div className="drawer-footer">
          <button
            type="button"
            role="switch"
            aria-checked={darkMode}
            className="drawer-row"
            onClick={() => setDarkMode((v) => !v)}
          >
            {darkMode ? (
              <Sun aria-hidden="true" className="drawer-row-icon" />
            ) : (
              <Moon aria-hidden="true" className="drawer-row-icon" />
            )}
            <span>Dark mode</span>
            <span className="drawer-switch" aria-hidden="true" />
          </button>

          <Link to="/faq" className="drawer-row" onClick={closeDrawer}>
            <HelpCircle aria-hidden="true" className="drawer-row-icon" />
            <span>Help & FAQ</span>
          </Link>

          {user ? (
            <button
              type="button"
              className="drawer-row"
              onClick={() => {
                closeDrawer();
                logout();
              }}
            >
              <LogOut aria-hidden="true" className="drawer-row-icon" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link to="/login" state={authIntent} className="drawer-row" onClick={closeDrawer}>
              <LogIn aria-hidden="true" className="drawer-row-icon" />
              <span>Log In</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
