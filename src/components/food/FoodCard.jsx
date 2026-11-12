/* ============================================================
   Goodbite — FoodCard
   Displays a single menu item; whole card links to the dish
   detail page. The hover "Add" button opts out of the link
   (prevents navigation) and adds straight to the cart.
   ============================================================ */
import { Link } from 'react-router-dom';
import { Star, Plus, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';

export const FoodCard = ({ food, onAddToCart }) => {
  const hasDiscount = food.originalPrice && food.originalPrice > food.price;

  return (
    <Link
      to={`/menu/${food.id}`}
      className="group cursor-pointer"
      aria-label={`View ${food.name}`}
    >
      <Card className="group">
        <div className="relative overflow-hidden">
          <Card.Image src={food.image} alt={food.name} />
          {food.isPopular && (
            <Badge variant="warning" className="absolute top-3 left-3 z-10">
              🔥 Popular
            </Badge>
          )}
          {food.isNew && (
            <Badge variant="info" className="absolute top-3 right-3 z-10">
              ✨ New
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="error" className="absolute top-3 left-20 z-10">
              -{Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)}%
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(food);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>
        </div>
        <Card.Content className="pt-3">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-base line-clamp-1">{food.name}</h4>
            <span className="font-bold text-brand">{formatCurrency(food.price)}</span>
          </div>
          <p className="text-xs text-muted line-clamp-2 mb-3">{food.description}</p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-medium">{food.rating}</span>
              <span className="text-muted ml-1">({food.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted" />
              <span className="text-muted">{food.prepTime} min</span>
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default FoodCard;
