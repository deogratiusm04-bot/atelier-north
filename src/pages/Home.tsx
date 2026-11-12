import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Leaf, Menu as MenuIcon, MoveRight, Search } from 'lucide-react';
import { products } from '../data/products';
import type { Category, Product, SortOption } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Lookbook } from '../components/Lookbook';
import { RevealOnScroll } from '../components/motion/RevealOnScroll';
import { StaggerContainer } from '../components/motion/StaggerContainer';
import { StaggerItem } from '../components/motion/StaggerItem';

type HomeProps = {
  onQuickView: (product: Product) => void;
  onAdd: (product: Product, size: string) => void;
};

const categories: (Category | 'All')[] = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
};

export function Home({ onQuickView, onAdd }: HomeProps) {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 28]);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((item) =>
      (category === 'All' || item.category === category) &&
      (!normalizedQuery || `${item.name} ${item.category}`.toLowerCase().includes(normalizedQuery)),
    );
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, query, sort]);

  return (
    <>
      <main id="top" className="min-h-screen">
        <section className="hero section-shell" ref={heroRef}>
          <StaggerContainer className="hero-copy" trigger="mount" staggerChildren={0.12} delayChildren={0.08}>
            <StaggerItem><span className="eyebrow"><span className="eyebrow-line" /> Autumn / Winter 2026</span></StaggerItem>
            <StaggerItem><h1>Ease in<br />every <em>detail.</em></h1></StaggerItem>
            <StaggerItem><p>Thoughtful layers for the way the season unfolds. Designed for now, made to stay.</p></StaggerItem>
            <StaggerItem>
              <div className="hero-actions">
                <a className="button button-dark" href="#collection">Explore the collection <ArrowRight size={16} /></a>
                <a className="hero-secondary" href="#lookbook">View the lookbook <ArrowDown size={15} /></a>
              </div>
            </StaggerItem>
            <div className="hero-footnote"><span>01 / 03</span><span>New season, familiar feeling</span></div>
          </StaggerContainer>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <motion.img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90"
                alt="Autumn fashion in a softly tailored coat"
                style={{ y: heroImageY }}
              />
            </div>
            <span className="hero-caption">The shape of a quieter season</span>
            <span className="hero-vertical-label">A STUDY IN NATURAL FORM</span>
          </div>
          <div className="hero-stamp"><span>DESIGNED<br />TO LAST</span><span className="stamp-star">✳</span></div>
        </section>

        <section className="collection section-shell" id="collection">
          <RevealOnScroll className="section-heading collection-heading">
            <div><span className="eyebrow">The new season, considered</span><h2>Pieces to <em>keep.</em></h2></div>
            <p>Fewer, better things. Designed to find their way into your everyday.</p>
          </RevealOnScroll>
          <div className="collection-toolbar">
            <div className="category-tabs" role="tablist" aria-label="Filter by category">
              {categories.map((item) => (
                <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
            <label className="sort-control">
              <span className="sr-only">Sort products</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
                {Object.entries(sortLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
              </select>
            </label>
            <label className="search-control">
              <Search size={14} />
              <span className="sr-only">Search the collection</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" />
            </label>
          </div>
          {filteredProducts.length > 0 ? (
            <StaggerContainer className="product-grid" layout staggerChildren={0.08}>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <StaggerItem key={product.id} layout>
                    <ProductCard product={product} onQuickView={onQuickView} onAdd={onAdd} />
                  </StaggerItem>
                ))}
              </AnimatePresence>
            </StaggerContainer>
          ) : <RevealOnScroll className="empty-search">No pieces found. Try another search or category.</RevealOnScroll>}
          <button className="all-pieces-button" onClick={() => { setCategory('All'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Showing {filteredProducts.length} of {products.length} pieces <span><ArrowDown size={14} /></span>
          </button>
        </section>

        <section className="manifesto section-shell" id="story">
          <RevealOnScroll className="manifesto-image" direction="none">
            <motion.img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
              alt="Natural, considered materials in a modern wardrobe"
              loading="lazy"
              initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0.85 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="manifesto-image-label">Made for the long way around</span>
          </RevealOnScroll>
          <RevealOnScroll className="manifesto-copy">
            <span className="eyebrow">A more thoughtful wardrobe</span>
            <h2>Buy less.<br /><em>Feel more.</em></h2>
            <p>We believe what you wear should feel as good as the life you wear it for. So we start with natural fibers, work with makers we know by name, and create only what deserves a place in your wardrobe.</p>
            <a className="text-link" href="#footer">What we believe <ArrowUpRight size={15} /></a>
            <StaggerContainer className="values-row" staggerChildren={0.12}>
              <StaggerItem><Leaf size={18} /><span>Better materials</span></StaggerItem>
              <StaggerItem><Check size={17} /><span>Responsible making</span></StaggerItem>
            </StaggerContainer>
          </RevealOnScroll>
          <span className="manifesto-number">01 — A NORTH STAR</span>
        </section>

        <Lookbook onProduct={onQuickView} />

        <section className="closing-banner">
          <div className="closing-image" />
          <RevealOnScroll className="closing-content">
            <span className="eyebrow">The things that stay</span>
            <h2>Wear what <em>matters.</em></h2>
            <a href="#collection" className="button button-light">Find your forever pieces <MoveRight size={16} /></a>
          </RevealOnScroll>
          <span className="closing-mark"><MenuIcon size={20} /> ATELIER NORTH</span>
        </section>
      </main>
    </>
  );
}
