/* ============================================================
   Goodbite — Food Detail Page
   Item details, addons, quantity, add to cart
   ============================================================ */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FOODS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/helpers';
import { Star, Clock, Plus, Minus, CheckCircle2 } from 'lucide-react';

export const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const food = FOODS.find((f) => f.id === id);
  if (!food) return null;

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon.id) ? prev.filter((a) => a !== addon.id) : [...prev, addon.id]
    );
  };

  const addonsPrice = food.addons.reduce(
    (sum, a) => sum + (selectedAddons.includes(a.id) ? a.price : 0),
    0
  );
  const unitPrice = food.price + addonsPrice;
  const total = unitPrice * qty;

  const handleAddToCart = () => {
    const addonObjs = food.addons.filter((a) => selectedAddons.includes(a.id));
    addItem(food, addonObjs, qty);
    navigate('/cart');
  };

  const hasDiscount = food.originalPrice && food.originalPrice > food.price;

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link to="/menu" className="hover:text-brand">Menu</Link>
        <span>/</span>
        <span className="font-medium">{food.name}</span>
      </nav>

      <div className="detail-grid">
        {/* Left: Image */}
        <div className="space-y-4">
          <Card className="h-[400px] relative overflow-hidden">
            <Card.Image src={food.image} alt={food.name} className="h-full w-full object-cover" />
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {food.isPopular && <Badge variant="warning">🔥 Popular</Badge>}
              {food.isNew && <Badge variant="info">✨ New</Badge>}
              {hasDiscount && (
                <Badge variant="error">
                  -{Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
          </Card>
          <div className="flex gap-2">
            {[food.image, food.image, food.image].map((_, i) => (
              <img
                key={i}
                src={food.image}
                alt={food.name}
                className="w-1/3 h-24 rounded-lg object-cover cursor-pointer border-2 opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="font-semibold">{food.rating}</span>
                <span className="text-muted text-sm">({food.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
              <span className="text-2xl font-bold text-brand">{formatCurrency(food.price)}</span>
              {hasDiscount && (
                <span className="text-muted line-through text-sm">{formatCurrency(food.originalPrice)}</span>
              )}
            </div>
          </div>

          <div className="border-b pb-4">
            <p className="text-secondary leading-relaxed">{food.description}</p>
          </div>

          {/* Addons */}
          {food.addons.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Add extras</h3>
              <div className="space-y-3">
                {food.addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-brand bg-brand/5 text-brand'
                          : 'border-border hover:border-brand/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddon(addon)}
                          className="accent-brand"
                          readOnly
                        />
                        <div>
                          <span className="font-medium">{addon.name}</span>
                          {addon.price > 0 && (
                            <span className="text-muted text-sm ml-2">+{formatCurrency(addon.price)}</span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-brand" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3 w-32">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty === 1}
                className="w-10 h-10 rounded border border-border flex items-center justify-center disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 rounded border border-border flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">Unit price</span>
              <span className="font-medium">{formatCurrency(unitPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-brand">{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            variant="primary"
            full
            size="lg"
            onClick={handleAddToCart}
            className="mt-4 shadow-lg hover:shadow-brand/20"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-10 p-6 rounded-xl border border-border bg-slate-50">
        <h4 className="font-semibold mb-3">Good to know</h4>
        <div className="flex items-start gap-3 text-sm text-secondary">
          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Estimated prep time: {food.prepTime} minutes</span>
        </div>
        <div className="flex items-start gap-3 text-sm text-secondary mt-2">
          <span className="w-4 h-4 flex-shrink-0">🔥</span>
          <span>{food.calories} calories per serving</span>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
