import { useState } from 'react';
import { ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react';

type NavbarProps = {
  itemCount: number;
  onBagOpen: () => void;
};

const links = [
  { label: 'New arrivals', href: '#collection' },
  { label: 'Collections', href: '#collection' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Our story', href: '#story' },
];

export function Navbar({ itemCount, onBagOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        Complimentary shipping on all orders over $150 <span>—</span> Thoughtfully made, always
      </div>
      <header className="site-header">
        <nav className="navbar page-shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Atelier North home">
            ATELIER <span>NORTH</span>
          </a>
          <div className="nav-links">
            {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>
          <div className="nav-actions">
            <button className="bag-trigger" onClick={onBagOpen} aria-label={`Open shopping bag, ${itemCount} items`}>
              <span className="bag-label">Bag</span>
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="bag-count">{itemCount}</span>
            </button>
            <button
              className="mobile-menu-trigger icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label} <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
