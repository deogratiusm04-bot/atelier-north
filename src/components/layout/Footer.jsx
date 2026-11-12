/* ============================================================
   Goodbite — Footer
   Enterprise-grade site footer:
   brand & social proof · link columns (mobile accordions) ·
   newsletter with validation / loading / success states ·
   social icons with tooltips & glow ·
   localization selects · trust & payment signals.
   ============================================================ */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Clock,
  Globe,
  Lock,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { RESTAURANT } from '../../data/mockData';
import { isValidEmail } from '../../utils/helpers';

/* ---------- Data -------------------------------------------- */

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Full Menu' },
  { to: '/cart', label: 'Your Cart' },
  { to: '/orders', label: 'Order Tracking' },
  { to: '/profile', label: 'Your Profile' },
];

const SUPPORT_LINKS = [
  { to: '/orders', label: 'Track Your Order' },
  { to: '/faq', label: 'Help & FAQ' },
  { href: 'tel:+15551234567', label: 'Call Support' },
  { href: 'mailto:hello@goodbite.com', label: 'Email Us' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/terms#refunds', label: 'Refund Policy' },
];

/* Inline brand marks (lucide-react no longer ships brand icons) */
const SOCIALS = [
  {
    label: 'Follow us on X',
    href: 'https://x.com/goodbite',
    svgPath:
      'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'Follow us on Instagram',
    href: 'https://instagram.com/goodbite',
    svgPath:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'Follow us on Facebook',
    href: 'https://facebook.com/goodbite',
    svgPath:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Watch us on YouTube',
    href: 'https://youtube.com/@goodbite',
    svgPath:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const PAYMENTS = ['VISA', 'Mastercard', 'AMEX', 'PayPal', 'Apple Pay'];

/** Dynamic copyright year — computed once at module load (2026) */
const CURRENT_YEAR = new Date().getFullYear();

/* ---------- Hooks & building blocks -------------------------- */

/** Tracks the lg breakpoint so link columns collapse into accordions on mobile. */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(min-width: 1024px)').matches
      : true,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  return isDesktop;
};

const SocialButton = ({ label, href, svgPath }) => (
  <a
    className="social-btn"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    data-tip={label}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="social-btn-icon" aria-hidden="true">
      <path d={svgPath} />
    </svg>
  </a>
);

const FooterColumn = ({ title, links }) => {
  const isDesktop = useIsDesktop();

  const list = (
    <ul className="footer-list">
      {links.map((link) => (
        <li key={link.label}>
          {link.to ? (
            <Link to={link.to} className="footer-link">
              {link.label}
            </Link>
          ) : (
            <a href={link.href} className="footer-link">
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  if (isDesktop) {
    return (
      <section className="footer-col">
        <h2 className="footer-heading">{title}</h2>
        {list}
      </section>
    );
  }

  return (
    <details className="footer-accordion">
      <summary className="footer-accordion-summary">
        <span>{title}</span>
        <ChevronDown className="footer-accordion-icon" aria-hidden="true" />
      </summary>
      {list}
    </details>
  );
};

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | loading | success
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') setStatus('idle'); // clear the error as the user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!isValidEmail(email.trim())) {
      setStatus('error');
      inputRef.current?.focus();
      return;
    }

    setStatus('loading');
    // Simulated API latency — swap for a real subscribe call in production
    timerRef.current = setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1400);
  };

  if (status === 'success') {
    return (
      <div className="newsletter-success" role="status">
        <span className="success-tick" aria-hidden="true">✓</span>
        <div>
          <p className="newsletter-success-title">You&rsquo;re on the list!</p>
          <p className="newsletter-success-note">
            Welcome aboard — your <strong>10% off</strong> code is on its way to your inbox.
          </p>
          <button type="button" className="newsletter-reset" onClick={() => setStatus('idle')}>
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-card">
      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <div className="newsletter-field">
          <input
            ref={inputRef}
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`newsletter-input ${status === 'error' ? 'is-error' : ''}`}
            value={email}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          />
          <button
            type="submit"
            className="newsletter-btn"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="footer-spinner" aria-hidden="true" />
                Joining&hellip;
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        {status === 'error' && (
          <p id="newsletter-error" className="newsletter-error" role="alert">
            Please enter a valid email address.
          </p>
        )}
      </form>
      <p className="newsletter-note">Weekly specials only. No spam — unsubscribe anytime.</p>
    </div>
  );
};

/* ---------- Footer ------------------------------------------- */

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* Brand / About + social proof */}
          <section className="footer-brand" aria-label="About Goodbite">
            <Link to="/" className="footer-logo" aria-label="Goodbite — back to home">
              <span aria-hidden="true">🍽️</span> Goodbite
            </Link>
            <p className="footer-tagline">
              {RESTAURANT.tagline} Handcrafted classics, cooked to order and delivered
              hot — from our kitchen to your door.
            </p>

            <ul className="footer-proof" aria-label="What customers say">
              <li className="proof-pill">
                <Star className="proof-star" fill="currentColor" aria-hidden="true" />
                <span><strong>{RESTAURANT.rating}</strong> · {RESTAURANT.reviewCount}+ reviews</span>
              </li>
              <li className="proof-pill">
                <Clock aria-hidden="true" className="proof-star" />
                <span><strong>{RESTAURANT.deliveryTime}</strong> avg delivery</span>
              </li>
              <li className="proof-pill">
                <span><strong>12K+</strong> orders served</span>
              </li>
            </ul>

            <p className="footer-address">
              <MapPin aria-hidden="true" />
              <span>{RESTAURANT.address}</span>
            </p>

            <div className="footer-socials" aria-label="Social media">
              {SOCIALS.map((social) => (
                <SocialButton key={social.label} {...social} />
              ))}
            </div>
          </section>

          {/* Link columns — stacked accordions on mobile */}
          <FooterColumn title="Navigation" links={NAV_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />

          {/* Newsletter */}
          <section className="footer-col footer-newsletter" aria-labelledby="newsletter-heading">
            <h2 id="newsletter-heading" className="footer-heading">Stay in the loop</h2>
            <p className="newsletter-sub">
              Get <strong>10% off</strong> your first order, plus weekly specials and
              early access to new drops.
            </p>
            <NewsletterForm />
          </section>
        </div>
      </div>

      {/* Bottom bar — copyright · localization · trust · payments */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            &copy; {CURRENT_YEAR} {RESTAURANT.name}. All rights reserved.
          </p>

          <div className="footer-selects">
            <label className="footer-select-wrap">
              <Globe className="footer-select-icon" aria-hidden="true" />
              <span className="sr-only">Language</span>
              <select className="footer-select" defaultValue="en" aria-label="Language">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <ChevronDown className="footer-select-chevron" aria-hidden="true" />
            </label>
            <label className="footer-select-wrap">
              <span className="sr-only">Currency</span>
              <select className="footer-select" defaultValue="usd" aria-label="Currency">
                <option value="usd">USD $</option>
                <option value="eur">EUR €</option>
                <option value="gbp">GBP £</option>
              </select>
              <ChevronDown className="footer-select-chevron" aria-hidden="true" />
            </label>
          </div>

          <ul className="footer-trust" aria-label="Security and trust">
            <li><Lock aria-hidden="true" /> SSL encrypted</li>
            <li><ShieldCheck aria-hidden="true" /> Secure payments</li>
          </ul>

          <ul className="footer-pay" aria-label="Accepted payment methods">
            {PAYMENTS.map((payment) => (
              <li key={payment} className="pay-chip">{payment}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
