import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAdd: (product: Product, size: string) => void;
};

export function ProductCard({ product, onQuickView, onAdd }: ProductCardProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button className="product-image-button" onClick={() => onQuickView(product)} aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
          <img className="product-image product-image-alt" src={product.alternateImage} alt="" loading="lazy" />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="quick-view-button" onClick={() => onQuickView(product)}>
          Quick view <ArrowUpRight size={14} />
        </button>
        <button
          className={`quick-add-toggle${quickAddOpen ? ' active' : ''}`}
          onClick={() => setQuickAddOpen(!quickAddOpen)}
          aria-label={`${quickAddOpen ? 'Close' : 'Quick add'} ${product.name}`}
          aria-expanded={quickAddOpen}
        >
          <Plus size={19} />
        </button>
        {quickAddOpen && (
          <div className="quick-add-sizes" aria-label="Choose a size">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  onAdd(product, size);
                  setQuickAddOpen(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="product-meta">
        <div>
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <span className="product-price">${product.price}</span>
      </div>
      <div className="product-colors" aria-label="Available colors">
        {product.colors.map((color, index) => (
          <button
            key={color.name}
            className={`color-swatch${selectedColor === index ? ' selected' : ''}`}
            style={{ '--swatch-color': color.value } as CSSProperties}
            onClick={() => setSelectedColor(index)}
            aria-label={color.name}
            aria-pressed={selectedColor === index}
            title={color.name}
          />
        ))}
        <span className="color-name">{product.colors[selectedColor]?.name}</span>
      </div>
    </article>
  );
}
