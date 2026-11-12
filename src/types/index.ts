export type Category =
  | 'Outerwear'
  | 'Tops'
  | 'Bottoms'
  | 'Footwear'
  | 'Accessories';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  alternateImage: string;
  colors: { name: string; value: string }[];
  description: string;
  fabric: string;
  care: string;
  sizes: string[];
  badge?: string;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};
