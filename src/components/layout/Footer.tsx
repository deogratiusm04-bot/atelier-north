import { useState, type FormEvent } from 'react';
import { ArrowRight, Camera } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validEmail) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage('You’re on the list. Look out for a note from us soon.');
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main section-shell">
        <div className="newsletter">
          <span className="eyebrow">Notes from the north</span>
          <h2>A little more <em>considered.</em></h2>
          <p>First looks, thoughtful notes, and 10% off your first order.</p>
          <form className="newsletter-form" onSubmit={subscribe} noValidate>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} aria-describedby="newsletter-message" />
            <button type="submit" aria-label="Sign up for the newsletter"><ArrowRight size={18} /></button>
          </form>
          <p className={`newsletter-message${(message && !validEmail) || (email && !validEmail) ? ' error' : ''}`} id="newsletter-message" aria-live="polite">{message || (email && !validEmail ? 'Please enter a valid email address.' : '')}</p>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Visit us</span>
          <p>Soho<br />118 Spring Street<br />New York, NY 10012</p>
          <p className="footer-hours">Mon–Sat, 11–7<br />Sunday, 12–6</p>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Here to help</span>
          <a href="mailto:hello@ateliernorth.com">Contact us</a>
          <a href="#footer">Shipping & returns</a>
          <a href="#footer">Care guide</a>
          <a href="#footer">FAQs</a>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Follow along</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="social-link">Instagram <Camera size={15} /></a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest <ArrowRight size={14} /></a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <a className="wordmark footer-wordmark" href="#top">ATELIER <span>NORTH</span></a>
        <span>© 2026 Atelier North. Made with intention.</span>
        <div><a href="#footer">Privacy</a><a href="#footer">Terms</a></div>
      </div>
    </footer>
  );
}
