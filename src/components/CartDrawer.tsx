import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useEscapeKey } from '../hooks/useEscapeKey';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, setQuantity, removeFromCart, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  const closeDrawer = useCallback(() => {
    setConfirmed(false);
    onClose();
  }, [onClose]);

  useEscapeKey(closeDrawer, open);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('overlay-open');
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, [open]);

  if (!open) return null;

  const handleCheckout = () => {
    setConfirmed(true);
    clearCart();
  };

  return (
    <div className="overlay-backdrop drawer-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeDrawer();
    }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div className="drawer-header">
          <div><span className="eyebrow">A few good things</span><h2 id="bag-title">Your bag <span>({items.reduce((count, item) => count + item.quantity, 0)})</span></h2></div>
          <button className="icon-button" onClick={closeDrawer} aria-label="Close shopping bag"><X size={20} /></button>
        </div>
        {confirmed ? (
          <div className="checkout-success">
            <span className="success-icon"><Check size={24} /></span>
            <span className="eyebrow">Order received</span>
            <h3>Consider it yours.</h3>
            <p>Your order has been confirmed. We’ll send the details to your inbox shortly.</p>
            <button className="button button-dark" onClick={closeDrawer}>Continue exploring <ArrowRight size={16} /></button>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-bag">
            <span className="eyebrow">Nothing here just yet</span>
            <p>Your next favorite is waiting to be found.</p>
            <button className="button button-dark" onClick={closeDrawer}><ArrowLeft size={16} /> Explore the collection</button>
          </div>
        ) : (
          <>
            <div className="shipping-note">
              {subtotal >= 150
                ? <>You’re enjoying <strong>complimentary shipping</strong> on this order.</>
                : <>You’re <strong>{currency.format(150 - subtotal)} away</strong> from complimentary shipping.</>}
            </div>
            <div className="cart-items">
              {items.map(({ product, size, quantity }) => (
                <article className="cart-item" key={`${product.id}-${size}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-copy">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>Size: {size}</p>
                    <div className="quantity-control">
                      <button onClick={() => quantity === 1 ? removeFromCart(product.id, size) : setQuantity(product.id, size, quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => setQuantity(product.id, size, quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <strong>{currency.format(product.price * quantity)}</strong>
                    <button className="remove-item" onClick={() => removeFromCart(product.id, size)} aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="drawer-footer">
              <div className="subtotal-row"><span>Subtotal</span><strong>{currency.format(subtotal)}</strong></div>
              <p>Taxes and shipping calculated at checkout.</p>
              <button className="button button-dark checkout-button" onClick={handleCheckout}>
                Continue to checkout <ArrowRight size={16} />
              </button>
              <button className="continue-shopping" onClick={closeDrawer}>Continue shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
