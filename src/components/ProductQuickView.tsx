import { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { Product } from '../types';

type ProductQuickViewProps = {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, size: string) => void;
};

export function ProductQuickView({ product, onClose, onAdd }: ProductQuickViewProps) {
  const [size, setSize] = useState(product.sizes.includes('M') ? 'M' : product.sizes[0]);
  const [showDetails, setShowDetails] = useState(true);

  useEscapeKey(onClose);

  useEffect(() => {
    document.body.classList.add('overlay-open');
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, []);

  return (
    <div className="overlay-backdrop modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-name">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close product details"><X size={20} /></button>
        <div className="modal-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-content">
          <span className="eyebrow">{product.category} · Autumn / Winter 2026</span>
          <h2 id="modal-product-name">{product.name}</h2>
          <p className="modal-price">${product.price}</p>
          <p className="modal-description">{product.description}</p>
          <div className="size-heading"><span>Select size</span><button className="text-link" onClick={() => setShowDetails(!showDetails)}>Size guide</button></div>
          <div className="size-picker">
            {product.sizes.map((option) => (
              <button
                key={option}
                className={size === option ? 'selected' : ''}
                onClick={() => setSize(option)}
                aria-pressed={size === option}
              >
                {option}
              </button>
            ))}
          </div>
          {!showDetails && <p className="size-guide-note">Designed for a relaxed fit. Choose your usual size for an easy silhouette.</p>}
          <button className="button button-dark modal-add" onClick={() => { onAdd(product, size); onClose(); }}>
            Add to bag <Plus size={16} />
          </button>
          <div className="product-details">
            <div><span>Fabric</span><p>{product.fabric}</p></div>
            <div><span>Care</span><p>{product.care}</p></div>
          </div>
          <div className="modal-note"><Minus size={13} /> Complimentary shipping over $150</div>
        </div>
      </section>
    </div>
  );
}
