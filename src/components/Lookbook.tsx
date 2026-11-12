import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { products } from '../data/products';
import type { Product } from '../types';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { StaggerContainer } from './motion/StaggerContainer';
import { StaggerItem } from './motion/StaggerItem';

type LookbookProps = { onProduct: (product: Product) => void };

const looks = [
  { title: 'The art of layering', note: 'Look 01 — New York', image: 'photo-1483985988355-763728e1935b', productId: 'forma-wool-coat', className: 'look-tall' },
  { title: 'A softer structure', note: 'Look 02 — Copenhagen', image: 'photo-1539109136881-3be0616acf4b', productId: 'everyday-cashmere', className: 'look-short' },
  { title: 'Made for the in-between', note: 'Look 03 — The coast', image: 'photo-1515886657613-9f3515b0c78f', productId: 'wide-leg-trouser', className: 'look-medium' },
];

export function Lookbook({ onProduct }: LookbookProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="lookbook section-shell" id="lookbook">
      <RevealOnScroll className="section-heading lookbook-heading">
        <div><span className="eyebrow">A study in getting dressed</span><h2>Worn <em>your way.</em></h2></div>
        <a className="text-link" href="#collection">Shop the collection <ArrowUpRight size={15} /></a>
      </RevealOnScroll>
      <StaggerContainer className="lookbook-grid" staggerChildren={0.12}>
        {looks.map((look, index) => {
          const product = products.find((item) => item.id === look.productId);
          return (
            <StaggerItem as="article" className={`look-card ${look.className}`} key={look.title}>
              <motion.img
                src={`https://images.unsplash.com/${look.image}?auto=format&fit=crop&w=1000&q=85`}
                alt={look.title}
                loading="lazy"
                initial={shouldReduceMotion ? false : { scale: 1.06, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="look-index">0{index + 1}</span>
              {product && (
                <button className="look-hotspot" onClick={() => onProduct(product)} aria-label={`Shop ${product.name}`}>
                  <span className="hotspot-plus">+</span><span className="hotspot-label">{product.name} · ${product.price}</span>
                </button>
              )}
              <div className="look-caption"><span>{look.note}</span><h3>{look.title}</h3></div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
