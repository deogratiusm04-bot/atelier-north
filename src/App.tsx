import { useState } from 'react';
import { CartDrawer } from './components/CartDrawer.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { ProductQuickView } from './components/ProductQuickView.tsx';
import { Home } from './pages/Home.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { useCart } from './hooks/useCart';
import type { Product } from './types';

function Storefront() {
  const { itemCount, addToCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Navbar itemCount={itemCount} onBagOpen={() => setCartOpen(true)} />
      <Home
        onQuickView={setSelectedProduct}
        onAdd={(product, size) => addToCart(product, size)}
      />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
      )}
    </>
  );
}

export default function App() {
  return <CartProvider><Storefront /></CartProvider>;
}
