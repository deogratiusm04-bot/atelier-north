/* ============================================================
   Goodbite — CategoryFilter
   Horizontal category chips
   ============================================================ */
import { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';

export const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const [selected, setSelected] = useState(activeCategory || 'all');

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setSelected(cat.id);
              onCategoryChange(cat.id);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
