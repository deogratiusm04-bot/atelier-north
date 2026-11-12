/* ============================================================
   Goodbite — Menu Page
   Category filter + searchable food grid
   ============================================================ */
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FOODS } from '../data/mockData';
import { Input } from '../components/ui/Input';
import { FoodCard } from '../components/food/FoodCard';
import { CategoryFilter } from '../components/food/CategoryFilter';
import { EmptyState } from '../components/ui/EmptyState';
import { Search } from 'lucide-react';

export const Menu = () => {
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [popularOnly, setPopularOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);

  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get('category') || 'all'
  );

  const filteredFoods = useMemo(() => {
    return FOODS.filter((food) => {
      const matchCategory = activeCategory === 'all' || food.category === activeCategory;
      const matchSearch =
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.description.toLowerCase().includes(search.toLowerCase());
      const hasDiscount =
        food.originalPrice && food.originalPrice > food.price;
      const matchFilters =
        (!popularOnly || food.isPopular) &&
        (!newOnly || food.isNew) &&
        (!discountOnly || hasDiscount);
      return matchCategory && matchSearch && matchFilters;
    });
  }, [search, activeCategory, popularOnly, newOnly, discountOnly]);

  const clearAll = () => {
    setSearch('');
    setPopularOnly(false);
    setNewOnly(false);
    setDiscountOnly(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Sidebar: filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="space-y-6">
              <div>
                <label className="form-label block mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
                  <Input
                    id="menu-search"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="form-label block mb-3">Category</label>
                <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              </div>
              <div className="p-4 rounded-xl border border-border bg-slate-50">
                <h4 className="font-semibold mb-2">Filters</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      checked={popularOnly}
                      onChange={(e) => setPopularOnly(e.target.checked)}
                    />{' '}
                    Popular only
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      checked={newOnly}
                      onChange={(e) => setNewOnly(e.target.checked)}
                    />{' '}
                    New items
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      checked={discountOnly}
                      onChange={(e) => setDiscountOnly(e.target.checked)}
                    />{' '}
                    On discount
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main: food grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{activeCategory === 'all' ? 'Menu' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
                <p className="text-muted">{filteredFoods.length} items found</p>
              </div>
            </div>

            {filteredFoods.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No items found"
                description="Try adjusting your search or filters."
                action={clearAll}
                actionLabel="Clear search & filters"
              />
            ) : (
              <div className="menu-grid">
                {filteredFoods.map((food) => (
                  <FoodCard key={food.id} food={food} onAddToCart={addItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
