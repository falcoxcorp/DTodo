export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  description: string;
  specifications: Record<string, string>;
  availableLocations?: {
    provinces: string[];
    municipalities: string[] | ['all'];
  };
}

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}