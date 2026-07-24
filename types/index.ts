export interface Restaurant {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  cuisine_en: string[];
  cuisine_bn: string[];
  cover_image: string;
  logo: string;
  rating: number;
  review_count: number;
  delivery_time_min: number;
  delivery_time_max: number;
  delivery_fee: number;
  min_order: number;
  distance_km: number;
  is_active: boolean;
  is_featured: boolean;
  deals: string[];
  area: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_en: string;
  category_bn: string;
  name_en: string;
  name_bn: string;
  description_en: string;
  description_bn: string;
  price: number;
  original_price: number;
  image: string;
  is_popular: boolean;
  is_available: boolean;
  sort_order: number;
}

export interface TurtlemartProduct {
  id: string;
  category_en: string;
  category_bn: string;
  name_en: string;
  name_bn: string;
  price: number;
  original_price: number;
  image: string;
  is_featured: boolean;
  section: string;
}

export interface Shop {
  id: string;
  name_en: string;
  name_bn: string;
  logo: string;
  shop_type: string;
  delivery_time: number;
  is_open: boolean;
  opens_at: string;
}

export interface Banner {
  id: string;
  image: string;
  link: string;
  is_active: boolean;
  sort_order: number;
  section: string;
}

export interface FakeVoucher {
  id: string;
  code: string;
  discount_type: "percent" | "flat";
  discount_value: number;
  min_order: number;
  expires_at: string;
  is_active: boolean;
}

export interface FakeReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  is_top_reviewer: boolean;
}

export interface CartItem {
  id: string;
  restaurant_id: string;
  restaurant_slug: string;
  restaurant_name_en: string;
  restaurant_name_bn: string;
  name_en: string;
  name_bn: string;
  price: number;
  original_price: number;
  image: string;
  quantity: number;
}

export interface FakeOrder {
  id: string;
  restaurant_name_en: string;
  restaurant_name_bn: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

export type Language = "en" | "bn";
