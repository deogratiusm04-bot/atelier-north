/* ============================================================
   Goodbite — Mock Data
   Replace with real API calls in production
   ============================================================ */

export const RESTAURANT = {
  id: 'rest_1',
  name: 'Goodbite',
  tagline: 'Fresh bites, delivered fast.',
  rating: 4.9,
  reviewCount: 1248,
  deliveryTime: '25–40 min',
  deliveryFee: 2.99,
  minOrder: 15.0,
  cuisine: ['Burgers', 'Pizza', 'Salads', 'Desserts'],
  address: '123 Flavor Street, Foodie District',
  phone: '+1 (555) 123-4567',
  isOpen: true,
  image:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  logo:
    'https://images.unsplash.com/photo-1552504567-d778add56ba4?w=200&q=80',
};

export const CATEGORIES = [
  // `count` = mock catalog size for the marketing UI — replace with aggregated
  // menu counts from the API in production.
  {
    id: 'all',
    name: 'All',
    icon: '🍽️',
    count: 77,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    icon: '🍔',
    tag: 'trending',
    count: 24,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    tag: 'popular',
    count: 18,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
  },
  {
    id: 'salads',
    name: 'Salads',
    icon: '🥗',
    tag: 'healthy',
    count: 12,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    tag: 'new',
    count: 15,
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: '🥤',
    tag: 'fresh',
    count: 9,
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
  },
];

export const FOODS = [
  {
    id: 'food_1',
    name: 'Goodbite Signature Burger',
    category: 'burgers',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 320,
    description:
      'Juicy beef patty with melted cheddar, caramelized onions, lettuce, tomato, and our secret Goodbite sauce on a brioche bun.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    isPopular: true,
    isNew: false,
    prepTime: 12,
    calories: 850,
    addons: [
      { id: 'a1', name: 'Extra Cheese', price: 1.5 },
      { id: 'a2', name: 'Bacon', price: 2.0 },
      { id: 'a3', name: 'Avocado', price: 1.75 },
    ],
  },
  {
    id: 'food_2',
    name: 'Margherita Pizza',
    category: 'pizza',
    price: 14.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 210,
    description:
      'Fresh mozzarella, San Marzano tomatoes, basil, and extra virgin olive oil on a wood-fired crust.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    isPopular: true,
    isNew: false,
    prepTime: 18,
    calories: 680,
    addons: [
      { id: 'a4', name: 'Extra Cheese', price: 1.5 },
      { id: 'a5', name: 'Pepperoni', price: 2.0 },
      { id: 'a6', name: 'Mushrooms', price: 1.25 },
    ],
  },
  {
    id: 'food_3',
    name: 'Caesar Salad',
    category: 'salads',
    price: 9.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 150,
    description:
      'Crisp romaine lettuce, parmesan crisps, croutons, and creamy Caesar dressing.',
    image:
      'https://images.unsplash.com/photo-1550304943-4f24f535dd93?w=600&q=80',
    isPopular: false,
    isNew: true,
    prepTime: 8,
    calories: 320,
    addons: [
      { id: 'a7', name: 'Grilled Chicken', price: 3.5 },
      { id: 'a8', name: 'Shrimp', price: 4.0 },
    ],
  },
  {
    id: 'food_4',
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 7.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 410,
    description:
      'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    isPopular: true,
    isNew: false,
    prepTime: 10,
    calories: 540,
    addons: [
      { id: 'a9', name: 'Extra Ice Cream Scoop', price: 2.0 },
      { id: 'a10', name: 'Caramel Drizzle', price: 0.75 },
    ],
  },
  {
    id: 'food_5',
    name: 'Classic Cheeseburger',
    category: 'burgers',
    price: 10.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 180,
    description:
      'Beef patty with American cheese, pickles, ketchup, and mustard on a toasted bun.',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
    isPopular: false,
    isNew: false,
    prepTime: 10,
    calories: 720,
    addons: [
      { id: 'a11', name: 'Extra Cheese', price: 1.5 },
      { id: 'a12', name: 'Bacon', price: 2.0 },
    ],
  },
  {
    id: 'food_6',
    name: 'Pepperoni Pizza',
    category: 'pizza',
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviews: 290,
    description:
      'Pepperoni, mozzarella, and tomato sauce on a crispy wood-fired crust.',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    isPopular: true,
    isNew: false,
    prepTime: 18,
    calories: 750,
    addons: [
      { id: 'a13', name: 'Extra Cheese', price: 1.5 },
      { id: 'a14', name: 'Jalapeños', price: 1.0 },
    ],
  },
  {
    id: 'food_7',
    name: 'Greek Salad',
    category: 'salads',
    price: 11.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 95,
    description:
      'Cucumber, tomatoes, red onion, kalamata olives, and feta cheese with oregano vinaigrette.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    isPopular: false,
    isNew: true,
    prepTime: 8,
    calories: 280,
    addons: [
      { id: 'a15', name: 'Grilled Chicken', price: 3.5 },
    ],
  },
  {
    id: 'food_8',
    name: 'Strawberry Cheesecake',
    category: 'desserts',
    price: 8.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 260,
    description:
      'Creamy New York cheesecake topped with fresh strawberry compote.',
    image:
      'https://images.unsplash.com/photo-1533632724712-755f49035078?w=600&q=80',
    isPopular: false,
    isNew: false,
    prepTime: 5,
    calories: 420,
    addons: [],
  },
  {
    id: 'food_9',
    name: 'Iced Caramel Latte',
    category: 'drinks',
    price: 5.49,
    originalPrice: null,
    rating: 4.6,
    reviews: 120,
    description:
      'Espresso with cold milk, caramel syrup, and ice. Perfectly refreshing.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    isPopular: false,
    isNew: true,
    prepTime: 3,
    calories: 180,
    addons: [
      { id: 'a16', name: 'Extra Shot', price: 1.0 },
      { id: 'a17', name: 'Oat Milk', price: 0.75 },
    ],
  },
];

export const MOCK_ORDERS = [
  {
    id: 'ord_1001',
    status: 'delivered',
    total: 34.97,
    createdAt: '2026-10-28T19:30:00Z',
    deliveryAddress: '123 Flavor Street, Apt 4B',
    paymentMethod: 'Credit Card •••• 4242',
    items: [
      { id: 'food_1', name: 'Goodbite Signature Burger', qty: 2, price: 12.99 },
      { id: 'food_4', name: 'Chocolate Lava Cake', qty: 1, price: 7.99 },
    ],
  },
  {
    id: 'ord_1002',
    status: 'preparing',
    total: 27.98,
    createdAt: '2026-11-01T12:15:00Z',
    deliveryAddress: '456 Taste Avenue',
    paymentMethod: 'Apple Pay •••• 9912',
    items: [
      { id: 'food_2', name: 'Margherita Pizza', qty: 1, price: 14.99 },
      { id: 'food_9', name: 'Iced Caramel Latte', qty: 1, price: 5.49 },
    ],
  },
  {
    id: 'ord_1003',
    status: 'out_for_delivery',
    total: 18.98,
    createdAt: '2026-11-04T18:45:00Z',
    deliveryAddress: '789 Crave Lane',
    paymentMethod: 'Credit Card •••• 4242',
    items: [
      { id: 'food_5', name: 'Classic Cheeseburger', qty: 1, price: 10.99 },
      { id: 'food_8', name: 'Strawberry Cheesecake', qty: 1, price: 8.99 },
    ],
  },
];

export const MOCK_USER = {
  id: 'user_1',
  name: 'Alex Rivera',
  email: 'alex@goodbite.com',
  phone: '+1 (555) 123-4567',
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1272a8339a?w=200&q=80',
  address: '123 Flavor Street, Apt 4B, Foodie District',
  orders: 24,
  memberSince: 'March 2025',
};

export const ORDER_STATUS_STEPS = [
  { id: 'placed', label: 'Order Placed', icon: '🧾' },
  { id: 'confirmed', label: 'Confirmed', icon: '✅' },
  { id: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: '🛵' },
  { id: 'delivered', label: 'Delivered', icon: '🚪' },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎' },
  { id: 'google', name: 'Google Pay', icon: '📱' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
];
