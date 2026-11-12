/* ============================================================
   Goodbite — Home Page
   Landing: hero, announcement, trust strip, categories, popular
   ============================================================ */
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Flame,
  Sparkles,
  Leaf,
  Droplets,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT, CATEGORIES, FOODS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/helpers';

/* Micro-tag config for category chips — maps mockData tag ids to icon + style */
const CATEGORY_TAG_META = {
  trending: { label: 'Trending', Icon: Flame, className: 'category-tag-trending' },
  popular: { label: 'Popular', Icon: Star, className: 'category-tag-popular' },
  new: { label: 'New', Icon: Sparkles, className: 'category-tag-new' },
  healthy: { label: 'Healthy', Icon: Leaf, className: 'category-tag-healthy' },
  fresh: { label: 'Fresh', Icon: Droplets, className: 'category-tag-fresh' },
};

export const Home = () => {
  const { addItem } = useCart();
  const [popular] = useState(() => FOODS.filter((f) => f.isPopular));

  // Highlights the category card matching ?category= (deep-link / shared state)
  const [params] = useSearchParams();
  const activeCategory = params.get('category') ?? '';

  const handleAdd = (food) => addItem(food);

  return (
    <div className="min-h-svh flex flex-col">
      {/* Hero — white text on dark overlay for WCAG-level contrast */}
      <section className="hero" aria-label="Goodbite introduction">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-badge">Open now — order before midnight</p>
          <h1 className="hero-title">Craving something delicious?</h1>
          <p className="hero-subtitle">
            Fresh, handcrafted meals delivered to your door in under 40 minutes.
            Taste Goodbite.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="btn-hero-primary">
              Order Now <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </Link>
            <Link to="/menu" className="btn-hero-secondary">
              View Menu
            </Link>
          </div>

          <div className="hero-stats" aria-label="Service facts">
            <div className="hero-stat">
              <Clock className="stat-icon" aria-hidden="true" />
              <span><strong>25–40</strong> min delivery</span>
            </div>
            <div className="hero-stat">
              <Star className="stat-icon" aria-hidden="true" style={{ fill: 'currentColor' }} />
              <span><strong>4.9★</strong> ({RESTAURANT.reviewCount} reviews)</span>
            </div>
            <div className="hero-stat">
              <MapPin className="stat-icon" aria-hidden="true" />
              <span>{RESTAURANT.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges strip */}
      <section className="trust-strip" aria-label="Why customers love Goodbite">
        <div className="container">
          <ul className="trust-items">
            <li className="trust-item"><span className="trust-icon" aria-hidden="true">⚡</span> Fast delivery</li>
            <li className="trust-item"><span className="trust-icon" aria-hidden="true">🛡️</span> Secure payment</li>
            <li className="trust-item"><span className="trust-icon" aria-hidden="true">🌱</span> Fresh ingredients</li>
            <li className="trust-item"><span className="trust-icon" aria-hidden="true">🤝</span> 24/7 support</li>
          </ul>
        </div>
      </section>

      {/* Categories — elevated photography cards: grid on desktop, snap rail on mobile */}
      <section className="section" id="categories" aria-label="Food categories">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Browse by category</h2>
              <p className="section-sub">From flame-grilled classics to freshly squeezed — pick a craving.</p>
            </div>
            <Link to="/menu" className="link-arrow">View full menu →</Link>
          </div>

          <div className="category-track">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const tag = CATEGORY_TAG_META[cat.tag];
              const isActive = activeCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={`/menu?category=${cat.id}`}
                  className={`category-card${isActive ? ' category-card-active' : ''}`}
                  aria-label={`Browse ${cat.name} — ${cat.count} ${cat.count === 1 ? 'item' : 'items'}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {tag && (
                    <span className={`category-tag ${tag.className}`}>
                      <tag.Icon aria-hidden="true" />
                      {tag.label}
                    </span>
                  )}

                  <span className="category-media" aria-hidden="true">
                    {/* emoji renders underneath as a graceful fallback if the photo ever fails */}
                    <span className="category-media-emoji">{cat.icon}</span>
                    <img
                      src={cat.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </span>

                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">{cat.count} {cat.count === 1 ? 'item' : 'items'}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular items */}
      <section className="section section-alt" aria-label="Popular dishes this week">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Popular This Week</h2>
              <p className="section-sub">Customer favorites</p>
            </div>
          </div>

          <div className="popular-grid">
            {popular.map((food) => (
              <Link key={food.id} to={`/menu/${food.id}`} aria-label={`View ${food.name}`}>
                <Card className="group">
                  <div className="relative overflow-hidden">
                    <Card.Image src={food.image} alt={food.name} />
                    <Badge variant="warning" className="absolute top-3 left-3 z-10">Popular</Badge>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end px-4">
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ background: '#ffffff', color: 'var(--slate-900)', border: 'none', borderRadius: '9999px', fontWeight: 700 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAdd(food);
                        }}
                      >
                        <Star className="w-3 h-3 fill-current" aria-hidden="true" /> Add
                      </button>
                    </div>
                  </div>
                  <Card.Content className="pt-3">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className="font-semibold text-base line-clamp-1" style={{ color: 'var(--slate-800)' }}>{food.name}</h4>
                      <span className="font-bold shrink-0" style={{ color: 'var(--brand-dark)' }}>{formatCurrency(food.price)}</span>
                    </div>
                    <p className="text-xs mb-3 line-clamp-2">{food.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1" style={{ color: 'var(--warning)' }}>
                        <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                        <span className="font-semibold">{food.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{food.prepTime} min</span>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
