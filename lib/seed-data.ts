import { Restaurant, MenuItem, FakeVoucher } from "@/types";

// ---------------------------------------------------------------------------
// Bulk-generated restaurants (Gulshan/Banani/Baridhara, Dhaka) sourced from
// the delivery + pickup seed list. Kept separate from the hand-authored
// restaurants above/below so their menus can fall back to cuisine templates.
// ---------------------------------------------------------------------------

interface RawRestaurant {
  name: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  time: number; // minutes, midpoint
  fee: number; // Tk, 0 = free
  deals?: string[];
  area?: string;
  featured?: boolean;
}

const CUISINE_IMAGE_MAP: Record<string, string> = {
  Bangladeshi: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
  Biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
  "Rice Dishes": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  Pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  Burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  "Fast Food": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
  Chicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
  "Fried Chicken": "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  Chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  Asian: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  Thai: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  Dumpling: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  Japanese: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  Kebab: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
  "Middle Eastern": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
  Shawarma: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
  Wraps: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
  Dessert: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  Bakery: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  Cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  "Street Food": "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
  Snacks: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
  Seafood: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
  Healthy: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  "Healthy Food": "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  Indian: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
  BBQ: "https://images.unsplash.com/photo-1544025162-d76694265947",
  Kacchi: "https://images.unsplash.com/photo-1642821373181-696a54913e93",
  Bengali: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d",
  Coffee: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e",
  "Ice Cream": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a",
  Steak: "https://images.unsplash.com/photo-1546964124-0cce460f38ef",
  Juice: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8",
};
const DEFAULT_CUISINE_IMAGE = "https://images.unsplash.com/photo-1596797038530-2c107229654b";

function imageFor(cuisines: string[]): string {
  const url = CUISINE_IMAGE_MAP[cuisines[0]] || DEFAULT_CUISINE_IMAGE;
  return url;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()&'".]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AREAS = ["Gulshan", "Gulshan 2", "Banani", "Baridhara", "Niketon"];

const RAW_DHAKA_RESTAURANTS: RawRestaurant[] = [
  // Featured / promoted
  { name: "Barcode Cafe", cuisines: ["Fast Food"], rating: 4.7, reviews: 2000, time: 15, fee: 65, deals: ["10% off"], featured: true },
  { name: "Kung Pao Gulshan", cuisines: ["Chinese", "Asian"], rating: 4.8, reviews: 2000, time: 35, fee: 127, featured: true },
  { name: "Pizzolo Caffe", cuisines: ["Pizza"], rating: 4.4, reviews: 100, time: 15, fee: 55, deals: ["20% off"], featured: true },
  { name: "Dumplings Haven", cuisines: ["Dumpling", "Chinese"], rating: 4.7, reviews: 100, time: 10, fee: 55, deals: ["15% off"], featured: true },
  { name: "Tokyo Express", cuisines: ["Japanese", "Asian"], rating: 4.9, reviews: 4000, time: 15, fee: 70, featured: true },
  { name: "ShantiGraam", cuisines: ["Bangladeshi"], rating: 4.8, reviews: 31, time: 15, fee: 65, featured: true },
  { name: "Lunch Mafia Gulshan", cuisines: ["Rice Dishes", "Bangladeshi"], rating: 4.2, reviews: 3000, time: 20, fee: 127, deals: ["10% off"], featured: true },
  { name: "Helvetia Banani", cuisines: ["Chicken", "Fast Food"], rating: 4.7, reviews: 100, time: 25, fee: 70, featured: true },
  { name: "Arax", cuisines: ["Middle Eastern"], rating: 4.9, reviews: 4000, time: 10, fee: 65, featured: true },
  { name: "Domino's Pizza Gulshan 2", cuisines: ["Pizza"], rating: 4.9, reviews: 500, time: 10, fee: 39, deals: ["Up to 15% off", "Price Match"], featured: true },

  // Alphabetical / general list
  { name: "Al Kareem Restaurant", cuisines: ["Bangladeshi"], rating: 4.5, reviews: 2000, time: 15, fee: 65 },
  { name: "Alfresco Banani", cuisines: ["Thai", "Asian"], rating: 4.8, reviews: 4000, time: 15, fee: 70, deals: ["BOGO", "Price Match"] },
  { name: "American Burger Gulshan 2", cuisines: ["Burgers", "Fast Food"], rating: 4.9, reviews: 4000, time: 10, fee: 55 },
  { name: "Anu's Kitchen", cuisines: ["Bangladeshi"], rating: 4.8, reviews: 500, time: 30, fee: 30 },
  { name: "BACHELOR'S EXPRESS", cuisines: ["Pizza"], rating: 4.7, reviews: 100, time: 10, fee: 103 },
  { name: "Beauty Lassi & Faluda", cuisines: ["Dessert"], rating: 4.7, reviews: 1000, time: 15, fee: 40 },
  { name: "Bella Italia Gulshan", cuisines: ["Pizza"], rating: 4.9, reviews: 5000, time: 25, fee: 103 },
  { name: "Best Fried Chicken (BFC) Gulshan", cuisines: ["Fried Chicken", "Fast Food"], rating: 4.9, reviews: 15000, time: 10, fee: 51, deals: ["Price Match"] },
  { name: "Bhorta Express Gulshan", cuisines: ["Bangladeshi"], rating: 4.3, reviews: 3000, time: 30, fee: 51, deals: ["Price Match"] },
  { name: "Boomers Cafe Banani", cuisines: ["Fast Food"], rating: 4.8, reviews: 5000, time: 15, fee: 70, deals: ["BOGO", "Price Match"] },
  { name: "Brio Italian Restaurant", cuisines: ["Pizza"], rating: 5.0, reviews: 500, time: 10, fee: 51 },
  { name: "Burger King Gulshan 2", cuisines: ["Burgers", "Fast Food"], rating: 4.9, reviews: 10000, time: 10, fee: 51, deals: ["Price Match"] },
  { name: "Burger Xpress Banani", cuisines: ["Burgers", "Fast Food"], rating: 4.8, reviews: 25000, time: 10, fee: 65, deals: ["Price Match"] },
  { name: "Chaap Ghor Banani", cuisines: ["Kebab"], rating: 4.4, reviews: 100, time: 20, fee: 70 },
  { name: "Chicken Buzz Gulshan", cuisines: ["Chicken", "Fast Food"], rating: 4.8, reviews: 3000, time: 20, fee: 132, deals: ["Up to 15% off", "Price Match"] },
  { name: "Chillox Banani", cuisines: ["Burgers", "Fast Food"], rating: 4.8, reviews: 10000, time: 25, fee: 70, deals: ["10% off selected items"] },
  { name: "Club China", cuisines: ["Rice Dishes", "Chinese"], rating: 4.9, reviews: 75, time: 15, fee: 65, deals: ["Price Match"] },
  { name: "Crust & Cheese", cuisines: ["Pizza"], rating: 4.5, reviews: 99, time: 25, fee: 66, deals: ["15% off"] },
  { name: "Daily Daawat Gulshan 1", cuisines: ["Bangladeshi"], rating: 4.6, reviews: 1000, time: 15, fee: 127, deals: ["10% off"] },
  { name: "Doner's", cuisines: ["Middle Eastern", "Fast Food"], rating: 4.7, reviews: 100, time: 10, fee: 51 },
  { name: "Eleven Cafe", cuisines: ["Bangladeshi", "Cafe"], rating: 4.9, reviews: 100, time: 15, fee: 65 },
  { name: "Florentine", cuisines: ["Seafood"], rating: 4.9, reviews: 76, time: 40, fee: 92 },
  { name: "Fry Bucket Baridhara", cuisines: ["Fried Chicken", "Fast Food"], rating: 4.9, reviews: 500, time: 20, fee: 40 },
  { name: "Fuchka Club Gulshan 2", cuisines: ["Street Food", "Bangladeshi"], rating: 4.4, reviews: 5, time: 6, fee: 40 },
  { name: "Galito's Gulshan 2", cuisines: ["Snacks"], rating: 4.9, reviews: 3000, time: 10, fee: 35, deals: ["Price Match"] },
  { name: "Glazed Gulshan", cuisines: ["Dessert"], rating: 4.9, reviews: 5000, time: 10, fee: 55, deals: ["Up to 22% off", "Price Match"] },
  { name: "Golden Pizza Banani", cuisines: ["Pizza"], rating: 4.9, reviews: 100, time: 10, fee: 70 },
  { name: "Hakka Dhaka Banani", cuisines: ["Asian", "Chinese"], rating: 4.9, reviews: 5000, time: 15, fee: 70, deals: ["Price Match"] },
  { name: "Herfy Banani", cuisines: ["Burgers", "Fast Food"], rating: 4.9, reviews: 5000, time: 15, fee: 103, deals: ["Price Match"] },
  { name: "Holey Bakery", cuisines: ["Bakery", "Dessert"], rating: 5.0, reviews: 10000, time: 10, fee: 51, deals: ["Up to 15% off", "Price Match"] },
  { name: "House of Tehari", cuisines: ["Bangladeshi", "Rice Dishes"], rating: 4.8, reviews: 4000, time: 10, fee: 70 },
  { name: "Indian Kitchen Banani", cuisines: ["Indian"], rating: 4.5, reviews: 500, time: 25, fee: 70 },
  { name: "Istanbul Restaurant Dhaka", cuisines: ["Middle Eastern"], rating: 4.9, reviews: 100, time: 15, fee: 51, deals: ["10% off"] },
  { name: "Kacchi Bhai Gulshan", cuisines: ["Biryani", "Bangladeshi"], rating: 4.8, reviews: 30000, time: 15, fee: 55, deals: ["Price Match"] },
  { name: "KFC Banani", cuisines: ["Fried Chicken", "Fast Food"], rating: 4.8, reviews: 5000, time: 20, fee: 70, deals: ["Price Match"] },
  { name: "King's Kabab Niketon", cuisines: ["Kebab"], rating: 4.7, reviews: 5000, time: 20, fee: 65 },
  { name: "Madchef Banani", cuisines: ["Fast Food"], rating: 4.9, reviews: 15000, time: 20, fee: 70, deals: ["Price Match"] },
  { name: "Panda Dumplings", cuisines: ["Dumpling", "Chinese"], rating: 4.9, reviews: 3000, time: 20, fee: 103 },
  { name: "Pizza Hut Gulshan 2", cuisines: ["Pizza"], rating: 4.9, reviews: 2000, time: 10, fee: 40, deals: ["BOGO", "Price Match"] },
  { name: "Premium Sweets Gulshan 2", cuisines: ["Dessert"], rating: 4.9, reviews: 4000, time: 15, fee: 51 },
  { name: "Salad Bar", cuisines: ["Healthy"], rating: 4.6, reviews: 1000, time: 15, fee: 65, deals: ["Price Match"] },
  { name: "Secret Recipe Gulshan 2", cuisines: ["Fast Food"], rating: 4.9, reviews: 3000, time: 10, fee: 40, deals: ["Price Match"] },
  { name: "Shawarma House Banani", cuisines: ["Shawarma", "Middle Eastern"], rating: 4.8, reviews: 5000, time: 15, fee: 70, deals: ["Price Match"] },
  { name: "Star Kabab Banani", cuisines: ["Kebab"], rating: 4.8, reviews: 5000, time: 15, fee: 103, deals: ["Price Match"] },
  { name: "Sultan's Dine Gulshan", cuisines: ["Bangladeshi"], rating: 4.8, reviews: 35000, time: 15, fee: 55, deals: ["Price Match"] },
  { name: "Takeout Banani", cuisines: ["Burgers", "Fast Food"], rating: 4.9, reviews: 20000, time: 10, fee: 70, deals: ["Price Match"] },
  { name: "Tehari Ghar Gulshan", cuisines: ["Bangladeshi", "Rice Dishes"], rating: 4.9, reviews: 35000, time: 15, fee: 132, deals: ["Price Match"] },
  { name: "Thai Emerald Gulshan", cuisines: ["Thai", "Chinese"], rating: 4.9, reviews: 4000, time: 30, fee: 146, deals: ["Price Match"] },
  { name: "Waffle Up", cuisines: ["Dessert"], rating: 4.9, reviews: 5000, time: 10, fee: 70, deals: ["Price Match"] },
  { name: "Wow Momo Foods Baridhara", cuisines: ["Dumpling", "Chinese"], rating: 4.7, reviews: 500, time: 20, fee: 65 },
  { name: "Wrap & Roll", cuisines: ["Wraps", "Fast Food"], rating: 4.6, reviews: 1000, time: 20, fee: 51 },
];

function reviewLabelToCount(n: number): number {
  return n;
}

const GENERATED_RESTAURANTS: Omit<Restaurant, "id">[] = RAW_DHAKA_RESTAURANTS.map((r, i) => {
  const img = imageFor(r.cuisines);
  const area = r.area || AREAS[i % AREAS.length];
  return {
    name_en: r.name,
    name_bn: r.name,
    slug: slugify(r.name),
    cuisine_en: r.cuisines,
    cuisine_bn: r.cuisines,
    cover_image: `${img}?w=600&q=80`,
    logo: `${img}?w=100&q=80`,
    rating: r.rating,
    review_count: reviewLabelToCount(r.reviews),
    delivery_time_min: Math.max(5, r.time - 5),
    delivery_time_max: r.time + 10,
    delivery_fee: r.fee,
    min_order: 100 + (i % 5) * 20,
    distance_km: Math.round((0.3 + (i % 12) * 0.28) * 10) / 10,
    is_active: true,
    is_featured: !!r.featured,
    deals: r.deals || [],
    area,
  };
});

// ---------------------------------------------------------------------------
// 60 real, currently-operating Dhaka restaurants (foodpanda/Tripadvisor
// sourced), each with an explicit rating/review-count/time/distance/fee
// instead of derived midpoints. A handful of names overlap restaurants
// already hand-authored above (Beauty Lassi & Faluda, Chillox, Arax, BFC,
// Thai Emerald, Star Kabab, Haji Biryani, Fakruddin, Golden Pizza Banani) —
// those are skipped here rather than duplicated.
// ---------------------------------------------------------------------------

interface RawRestaurant60 {
  name: string;
  category: string;
  rating: number;
  reviews: number;
  timeMin: number;
  timeMax: number;
  distanceKm: number;
  fee: number;
  area?: string;
}

const RAW_RESTAURANTS_60: RawRestaurant60[] = [
  { name: "Arabian Fast Food – Dhanmondi", category: "Fast Food", rating: 4.4, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 2.8, fee: 45, area: "Dhanmondi" },
  { name: "Pizza Forge", category: "Pizza", rating: 4.6, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 3.0, fee: 50 },
  { name: "The Pizza Corner", category: "Pizza", rating: 4.7, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 2.4, fee: 50 },
  { name: "Pizza Burg – Dhanmondi", category: "Pizza", rating: 4.5, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 2.6, fee: 45, area: "Dhanmondi" },
  { name: "Turkish Adana Kebab & Restaurant", category: "BBQ", rating: 4.7, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 3.5, fee: 50 },
  { name: "Salam's Kitchen", category: "Kacchi", rating: 4.6, reviews: 1000, timeMin: 30, timeMax: 45, distanceKm: 4.0, fee: 60 },
  { name: "Sultan's Dine", category: "Kacchi", rating: 4.5, reviews: 5000, timeMin: 30, timeMax: 45, distanceKm: 3.8, fee: 60 },
  { name: "Tehari Ghar", category: "Bengali", rating: 4.6, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 3.1, fee: 45 },
  { name: "Nanna Biryani", category: "Kacchi", rating: 4.5, reviews: 1000, timeMin: 30, timeMax: 45, distanceKm: 5.5, fee: 60 },
  { name: "Kolkata Kachchi", category: "Kacchi", rating: 4.6, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 5.8, fee: 55 },
  { name: "Grand Nawab", category: "Kacchi", rating: 4.5, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 5.9, fee: 55 },
  { name: "Chui & Kacchi – Banani", category: "Kacchi", rating: 4.9, reviews: 100, timeMin: 25, timeMax: 35, distanceKm: 3.4, fee: 50, area: "Banani" },
  { name: "Dhakaiya Kacchi and Biriyani House", category: "Kacchi", rating: 3.6, reviews: 38, timeMin: 30, timeMax: 40, distanceKm: 4.2, fee: 50 },
  { name: "Bashmoti Kacchi", category: "Kacchi", rating: 4.2, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 3.9, fee: 50 },
  { name: "Bread & Beyond – Mohakhali", category: "Bakery", rating: 4.9, reviews: 90, timeMin: 20, timeMax: 30, distanceKm: 2.7, fee: 40, area: "Mohakhali" },
  { name: "Puro Pastry & Bakery – Shewrapara", category: "Bakery", rating: 4.8, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 6.1, fee: 45, area: "Shewrapara" },
  { name: "Beans & Blend", category: "Cafe", rating: 4.5, reviews: 80, timeMin: 20, timeMax: 30, distanceKm: 2.3, fee: 40 },
  { name: "Brownie Hut – Banani", category: "Dessert", rating: 4.7, reviews: 40, timeMin: 20, timeMax: 30, distanceKm: 2.9, fee: 40, area: "Banani" },
  { name: "Minis Dutch Pancakes", category: "Dessert", rating: 4.9, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 4.8, fee: 45 },
  { name: "Fluryz Food & Cafe", category: "Cafe", rating: 4.9, reviews: 90, timeMin: 20, timeMax: 30, distanceKm: 3.0, fee: 40 },
  { name: "Holey Artisan Bakery", category: "Bakery", rating: 4.6, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 3.6, fee: 50 },
  { name: "Well Food – Dhanmondi", category: "Bakery", rating: 4.4, reviews: 200, timeMin: 20, timeMax: 30, distanceKm: 2.8, fee: 40, area: "Dhanmondi" },
  { name: "Swiss Bakery", category: "Bakery", rating: 4.2, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 3.3, fee: 40 },
  { name: "Tabaq Coffee", category: "Coffee", rating: 4.6, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 2.5, fee: 40 },
  { name: "Wow Momo Foods – Banani", category: "Chinese", rating: 4.9, reviews: 70, timeMin: 20, timeMax: 30, distanceKm: 3.1, fee: 40, area: "Banani" },
  { name: "Dental Cafeteria", category: "Bengali", rating: 4.4, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 2.6, fee: 40 },
  { name: "Cold Stone Creamery – Gulshan", category: "Ice Cream", rating: 4.5, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 3.4, fee: 45, area: "Gulshan" },
  { name: "Premium Sweets by Central", category: "Dessert", rating: 4.3, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 3.0, fee: 40 },
  { name: "Pan Tao – Banani", category: "Thai", rating: 4.4, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 3.7, fee: 50, area: "Banani" },
  { name: "Laughing Buddha", category: "Chinese", rating: 4.3, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 4.1, fee: 50 },
  { name: "Bukhara Restaurant – Banani", category: "Indian", rating: 4.5, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 3.5, fee: 55, area: "Banani" },
  { name: "Khazana – Gulshan", category: "Indian", rating: 4.4, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 3.8, fee: 55, area: "Gulshan" },
  { name: "Chingri Chinese Restaurant – Katabon", category: "Chinese", rating: 4.0, reviews: 200, timeMin: 25, timeMax: 35, distanceKm: 4.4, fee: 45 },
  { name: "Mikado Chinese", category: "Chinese", rating: 4.2, reviews: 500, timeMin: 25, timeMax: 35, distanceKm: 4.6, fee: 45 },
  { name: "Chows – Banani", category: "Chinese", rating: 4.4, reviews: 200, timeMin: 25, timeMax: 35, distanceKm: 3.6, fee: 55, area: "Banani" },
  { name: "The Lone Star Steakhouse – Dhanmondi", category: "Steak", rating: 4.3, reviews: 500, timeMin: 30, timeMax: 40, distanceKm: 3.2, fee: 55, area: "Dhanmondi" },
  { name: "Durum", category: "Shawarma", rating: 4.5, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 3.0, fee: 45 },
  { name: "Shawarma Khabo – Mirpur", category: "Shawarma", rating: 3.5, reviews: 30, timeMin: 20, timeMax: 30, distanceKm: 5.4, fee: 40, area: "Mirpur" },
  { name: "Fresh Shawarma", category: "Shawarma", rating: 4.2, reviews: 200, timeMin: 20, timeMax: 30, distanceKm: 3.5, fee: 40 },
  { name: "Kishmot Hotel", category: "Fast Food", rating: 4.7, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 3.1, fee: 40 },
  { name: "KFC Bangladesh – Gulshan", category: "Fried Chicken", rating: 4.4, reviews: 5000, timeMin: 20, timeMax: 30, distanceKm: 3.3, fee: 49, area: "Gulshan" },
  { name: "Pizza Hut Bangladesh – Banani", category: "Pizza", rating: 4.3, reviews: 5000, timeMin: 25, timeMax: 35, distanceKm: 3.4, fee: 49, area: "Banani" },
  { name: "Domino's Pizza – Dhanmondi", category: "Pizza", rating: 4.3, reviews: 5000, timeMin: 20, timeMax: 30, distanceKm: 2.9, fee: 45, area: "Dhanmondi" },
  { name: "Nando's Bangladesh – Gulshan", category: "BBQ", rating: 4.5, reviews: 1000, timeMin: 25, timeMax: 35, distanceKm: 3.6, fee: 55, area: "Gulshan" },
  { name: "California Fried Chicken (CFC)", category: "Fried Chicken", rating: 4.0, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 3.0, fee: 40 },
  { name: "Cooper's", category: "Bakery", rating: 4.2, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 2.6, fee: 40 },
  { name: "North End Coffee Roasters", category: "Coffee", rating: 4.6, reviews: 1000, timeMin: 20, timeMax: 30, distanceKm: 3.2, fee: 45 },
  { name: "Gloria Jean's Coffees – Gulshan", category: "Coffee", rating: 4.4, reviews: 500, timeMin: 20, timeMax: 30, distanceKm: 3.4, fee: 45, area: "Gulshan" },
  { name: "Naval Bay – Mirpur", category: "Seafood", rating: 3.2, reviews: 27, timeMin: 30, timeMax: 40, distanceKm: 6.2, fee: 55, area: "Mirpur" },
  { name: "NutriflexBD", category: "Healthy Food", rating: 4.6, reviews: 26, timeMin: 25, timeMax: 35, distanceKm: 3.5, fee: 45 },
  { name: "Zhalmuri Juice Bar", category: "Juice", rating: 4.0, reviews: 200, timeMin: 15, timeMax: 25, distanceKm: 2.0, fee: 35 },
];

const GENERATED_RESTAURANTS_60: Omit<Restaurant, "id">[] = RAW_RESTAURANTS_60.map((r, i) => {
  const img = imageFor([r.category]);
  const area = r.area || AREAS[i % AREAS.length];
  return {
    name_en: r.name,
    name_bn: r.name,
    slug: slugify(r.name),
    cuisine_en: [r.category],
    cuisine_bn: [r.category],
    cover_image: `${img}?w=600&q=80`,
    logo: `${img}?w=100&q=80`,
    rating: r.rating,
    review_count: r.reviews,
    delivery_time_min: r.timeMin,
    delivery_time_max: r.timeMax,
    delivery_fee: r.fee,
    min_order: 100 + (i % 5) * 20,
    distance_km: r.distanceKm,
    is_active: true,
    is_featured: false,
    deals: [],
    area,
  };
});

// ---------------------------------------------------------------------------
// Cuisine-based menu templates — used as a fallback so every generated
// restaurant (not just the hand-authored ones below) has orderable dishes.
// ---------------------------------------------------------------------------

interface DishTemplate {
  name_en: string;
  price: number;
  original_price: number;
  image: string;
  description_en: string;
}

const MENU_TEMPLATES: Record<string, DishTemplate[]> = {
  Bangladeshi: [
    { name_en: "Kacchi Biryani", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", description_en: "Slow-cooked mutton biryani with fragrant basmati rice and traditional spices." },
    { name_en: "Beef Bhuna", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", description_en: "Rich, slow-cooked beef curry in a thick spiced gravy." },
    { name_en: "Plain Polao with Roast", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", description_en: "Fragrant polao rice served with chicken roast." },
    { name_en: "Borhani", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Traditional spiced yogurt drink." },
  ],
  Biryani: [
    { name_en: "Special Kacchi Biryani", price: 350, original_price: 400, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", description_en: "Our signature kacchi biryani with tender mutton and aromatic rice." },
    { name_en: "Chicken Biryani", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80", description_en: "Tender chicken layered with fragrant rice, cooked to perfection." },
    { name_en: "Beef Tehari", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", description_en: "Traditional Dhaka-style beef tehari with aromatic spices." },
    { name_en: "Firni", price: 80, original_price: 100, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Creamy rice pudding dessert." },
  ],
  "Rice Dishes": [
    { name_en: "Chicken Tehari", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", description_en: "Fragrant one-pot chicken and rice dish." },
    { name_en: "Morog Polao", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", description_en: "Whole spiced chicken leg served over polao rice." },
    { name_en: "Egg Fried Rice", price: 150, original_price: 180, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", description_en: "Classic egg fried rice with vegetables." },
  ],
  Pizza: [
    { name_en: "Chicken Tikka Pizza (Medium)", price: 550, original_price: 650, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", description_en: "Loaded with spiced chicken tikka, onion, and mozzarella." },
    { name_en: "Margherita Pizza (Medium)", price: 450, original_price: 520, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", description_en: "Classic tomato, mozzarella, and basil pizza." },
    { name_en: "Beef Pepperoni Pizza (Medium)", price: 590, original_price: 680, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", description_en: "Loaded with beef pepperoni and extra cheese." },
    { name_en: "Garlic Bread", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", description_en: "Toasted bread with garlic butter and herbs." },
  ],
  Burgers: [
    { name_en: "Classic Beef Burger", price: 280, original_price: 330, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", description_en: "Juicy beef patty with cheese, lettuce, and tomato." },
    { name_en: "Crispy Chicken Burger", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Crunchy fried chicken burger with spicy mayo." },
    { name_en: "Loaded Fries", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", description_en: "Crispy fries loaded with cheese sauce." },
  ],
  "Fast Food": [
    { name_en: "Chicken Wrap", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Grilled chicken wrap with fresh veggies and sauce." },
    { name_en: "Loaded Fries", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", description_en: "Crispy fries loaded with cheese sauce and jalapeños." },
    { name_en: "Chicken Nuggets (8pcs)", price: 200, original_price: 240, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Crispy golden chicken nuggets, served with dip." },
  ],
  Chicken: [
    { name_en: "Peri Peri Chicken (Half)", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Flame-grilled peri peri chicken, spicy and smoky." },
    { name_en: "Chicken Tikka Boti", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", description_en: "Char-grilled marinated chicken chunks." },
  ],
  "Fried Chicken": [
    { name_en: "Fried Chicken Bucket (6pcs)", price: 550, original_price: 650, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Crispy fried chicken bucket, family sized." },
    { name_en: "Fried Chicken (2pcs) + Fries", price: 250, original_price: 300, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Crispy fried chicken with a side of fries." },
  ],
  Chinese: [
    { name_en: "Chicken Chowmein", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Stir-fried noodles with chicken and vegetables." },
    { name_en: "Chilli Chicken", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Spicy, tangy stir-fried chicken with peppers." },
    { name_en: "Fried Rice with Egg", price: 200, original_price: 240, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", description_en: "Classic wok-fried rice with egg." },
  ],
  Asian: [
    { name_en: "Pad Thai", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Stir-fried rice noodles with tamarind and peanuts." },
    { name_en: "Chicken Dumplings (6pcs)", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Steamed chicken dumplings with dipping sauce." },
  ],
  Thai: [
    { name_en: "Tom Yum Soup", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Spicy and sour Thai soup with shrimp." },
    { name_en: "Thai Basil Chicken", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Stir-fried chicken with Thai basil and chilli." },
  ],
  Dumpling: [
    { name_en: "Steamed Chicken Momo (8pcs)", price: 200, original_price: 240, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Juicy steamed chicken momos, served with chutney." },
    { name_en: "Fried Veg Dumplings (8pcs)", price: 190, original_price: 220, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Crispy fried vegetable dumplings." },
  ],
  Japanese: [
    { name_en: "Chicken Katsu Curry", price: 380, original_price: 430, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", description_en: "Crispy chicken cutlet with Japanese curry sauce and rice." },
    { name_en: "California Roll (8pcs)", price: 420, original_price: 480, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", description_en: "Crab, avocado, and cucumber sushi roll." },
  ],
  Kebab: [
    { name_en: "Seekh Kabab", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", description_en: "Minced mutton kebabs grilled over charcoal." },
    { name_en: "Chicken Tikka", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", description_en: "Juicy chicken tikka marinated in yogurt and spices." },
    { name_en: "Garlic Naan", price: 60, original_price: 70, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", description_en: "Soft garlic-infused flatbread from the tandoor." },
  ],
  "Middle Eastern": [
    { name_en: "Chicken Shawarma Roll", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "Rotisserie chicken with garlic sauce in warm flatbread." },
    { name_en: "Hummus Plate", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80", description_en: "Creamy hummus with olive oil and pita bread." },
    { name_en: "Mixed Grill Platter", price: 480, original_price: 550, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "A generous mix of grilled kebabs and shawarma." },
  ],
  Shawarma: [
    { name_en: "Beef Shawarma Roll", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "Seasoned beef shawarma with tahini and pickles." },
    { name_en: "Chicken Shawarma Plate", price: 320, original_price: 370, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "Shawarma chicken served over rice with garlic sauce." },
  ],
  Wraps: [
    { name_en: "Grilled Chicken Wrap", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "Grilled chicken, lettuce, and sauce in a soft wrap." },
    { name_en: "Beef Wrap", price: 250, original_price: 290, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", description_en: "Spiced beef strips wrapped with fresh salad." },
  ],
  Dessert: [
    { name_en: "Red Velvet Cake (slice)", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", description_en: "Moist red velvet cake with cream cheese frosting." },
    { name_en: "Belgian Waffle", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", description_en: "Crispy waffle topped with chocolate and berries." },
    { name_en: "Faluda", price: 140, original_price: 170, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Chilled rose-milk dessert drink with vermicelli and jelly." },
  ],
  Bakery: [
    { name_en: "Chocolate Fudge Cake (slice)", price: 160, original_price: 190, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", description_en: "Dense, rich chocolate cake with fudge icing." },
    { name_en: "Butter Croissant", price: 90, original_price: 110, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", description_en: "Flaky, buttery croissant, baked fresh." },
    { name_en: "Cinnamon Roll", price: 150, original_price: 180, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", description_en: "Warm, soft cinnamon roll with cream cheese glaze." },
  ],
  Cafe: [
    { name_en: "Cold Brew Coffee", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", description_en: "Smooth, rich cold brew coffee steeped for 24 hours." },
    { name_en: "Iced Caramel Latte", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", description_en: "Espresso with caramel syrup, milk, and ice." },
    { name_en: "Chocolate Croissant", price: 160, original_price: 190, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", description_en: "Flaky, buttery croissant filled with dark chocolate." },
  ],
  "Street Food": [
    { name_en: "Fuchka (6pcs)", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Crispy shells filled with spiced tamarind water and potato." },
    { name_en: "Chotpoti", price: 80, original_price: 100, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Tangy mashed chickpea and potato street snack." },
  ],
  Snacks: [
    { name_en: "Chicken Peri Peri Wings (6pcs)", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Flame-grilled peri peri chicken wings." },
    { name_en: "Loaded Nachos", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Crispy nachos loaded with cheese and salsa." },
  ],
  Seafood: [
    { name_en: "Grilled Fish Platter", price: 480, original_price: 550, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", description_en: "Grilled seasonal fish served with sides." },
    { name_en: "Garlic Butter Prawns", price: 420, original_price: 480, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", description_en: "Sautéed prawns in garlic butter sauce." },
  ],
  Healthy: [
    { name_en: "Grilled Chicken Salad Bowl", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Grilled chicken over greens with a light vinaigrette." },
    { name_en: "Protein Power Bowl", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", description_en: "Quinoa, chickpeas, and grilled vegetables." },
  ],
  Indian: [
    { name_en: "Butter Chicken", price: 320, original_price: 370, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", description_en: "Creamy tomato-based chicken curry." },
    { name_en: "Paneer Tikka Masala", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", description_en: "Grilled paneer cubes in a spiced tomato gravy." },
    { name_en: "Garlic Naan", price: 60, original_price: 70, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", description_en: "Soft garlic-infused flatbread from the tandoor." },
  ],
  BBQ: [
    { name_en: "Adana Kebab Platter", price: 420, original_price: 480, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", description_en: "Char-grilled minced lamb kebabs, Turkish style." },
    { name_en: "Peri-Peri Whole Chicken", price: 650, original_price: 750, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", description_en: "Whole chicken flame-grilled in peri-peri marinade." },
    { name_en: "Mixed Grill Platter", price: 580, original_price: 660, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", description_en: "A hearty mix of grilled meats and kebabs." },
    { name_en: "Hummus with Pita", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80", description_en: "Creamy hummus served with warm pita bread." },
  ],
  Kacchi: [
    { name_en: "Mutton Kacchi Biryani", price: 380, original_price: 440, image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&q=80", description_en: "Slow-cooked mutton and basmati rice, layered and dum-cooked." },
    { name_en: "Beef Tehari", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", description_en: "Traditional Dhaka-style beef tehari with aromatic spices." },
    { name_en: "Chicken Rezala", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&q=80", description_en: "Mild, creamy chicken curry with a hint of sweetness." },
    { name_en: "Borhani", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Traditional spiced yogurt drink, served ice cold." },
    { name_en: "Firni", price: 80, original_price: 100, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Creamy rice pudding dessert." },
  ],
  Bengali: [
    { name_en: "Beef Bhuna", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&q=80", description_en: "Rich, slow-cooked beef curry in a thick spiced gravy." },
    { name_en: "Chicken Rezala", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&q=80", description_en: "Mild, creamy chicken curry, a Bengali classic." },
    { name_en: "Morog Polao", price: 260, original_price: 300, image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&q=80", description_en: "Whole spiced chicken leg served over fragrant polao rice." },
    { name_en: "Aloo Bhorta", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&q=80", description_en: "Mashed potato with mustard oil, onion, and green chilli." },
    { name_en: "Borhani", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", description_en: "Traditional spiced yogurt drink." },
  ],
  Coffee: [
    { name_en: "Cappuccino", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&q=80", description_en: "Espresso topped with steamed milk foam." },
    { name_en: "Cold Brew Coffee", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&q=80", description_en: "Smooth, rich cold brew steeped for 24 hours." },
    { name_en: "Iced Caramel Latte", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", description_en: "Espresso with caramel syrup, milk, and ice." },
    { name_en: "Blueberry Muffin", price: 160, original_price: 190, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", description_en: "Soft muffin loaded with blueberries." },
  ],
  "Ice Cream": [
    { name_en: "Cookies & Cream Sundae", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80", description_en: "Vanilla ice cream loaded with cookie crumble." },
    { name_en: "Chocolate Devotion", price: 300, original_price: 340, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80", description_en: "Rich chocolate ice cream with fudge chunks." },
    { name_en: "Strawberry Blitz", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80", description_en: "Fresh strawberry ice cream, blended to order." },
    { name_en: "Waffle Bowl Special", price: 350, original_price: 400, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80", description_en: "Two scoops served in a crisp waffle bowl." },
  ],
  Steak: [
    { name_en: "Rib Eye Steak", price: 950, original_price: 1100, image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80", description_en: "Grilled rib eye steak, cooked to your liking." },
    { name_en: "BBQ Chicken Wings", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80", description_en: "Smoky BBQ-glazed chicken wings." },
    { name_en: "Grilled Chicken Tenders", price: 380, original_price: 430, image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80", description_en: "Tender grilled chicken strips with house sauce." },
    { name_en: "Mashed Potato", price: 160, original_price: 190, image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80", description_en: "Creamy buttered mashed potato side." },
  ],
  "Healthy Food": [
    { name_en: "Grilled Chicken Salad Bowl", price: 320, original_price: 370, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", description_en: "Grilled chicken over greens with a light vinaigrette." },
    { name_en: "Quinoa Veggie Bowl", price: 300, original_price: 350, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", description_en: "Quinoa, chickpeas, and roasted vegetables." },
    { name_en: "Protein Power Wrap", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", description_en: "Grilled chicken and greens wrapped in whole wheat." },
    { name_en: "Green Detox Smoothie", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80", description_en: "Spinach, apple, and cucumber blended smoothie." },
  ],
  Juice: [
    { name_en: "Fresh Watermelon Juice", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80", description_en: "Chilled fresh watermelon juice, no added sugar." },
    { name_en: "Mixed Fruit Juice", price: 140, original_price: 170, image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80", description_en: "A blend of seasonal fresh fruits." },
    { name_en: "Mango Shake", price: 150, original_price: 180, image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80", description_en: "Thick, creamy mango shake." },
    { name_en: "Lemon Mint Cooler", price: 100, original_price: 130, image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80", description_en: "Refreshing lemon and mint cooler." },
  ],
};

const DEFAULT_MENU_TEMPLATE = MENU_TEMPLATES["Fast Food"];

export function getMenuItemsForRestaurant(restaurant: Restaurant): MenuItem[] {
  const template = MENU_TEMPLATES[restaurant.cuisine_en[0]] || DEFAULT_MENU_TEMPLATE;
  return template.map((dish, i) => ({
    id: `gen-item-${restaurant.slug}-${i}`,
    restaurant_id: restaurant.id,
    category_en: i === 0 ? "Popular" : "Menu",
    category_bn: i === 0 ? "জনপ্রিয়" : "মেনু",
    name_en: dish.name_en,
    name_bn: dish.name_en,
    description_en: dish.description_en,
    description_bn: dish.description_en,
    price: dish.price,
    original_price: dish.original_price,
    image: dish.image,
    is_popular: i === 0,
    is_available: true,
    sort_order: i + 1,
  }));
}

export const SEED_RESTAURANTS: Omit<Restaurant, "id">[] = [
  {
    name_en: "Fakruddin Biryani House",
    name_bn: "ফকরুদ্দিন বিরিয়ানি হাউস",
    slug: "fakruddin-biryani-house",
    cuisine_en: ["Biryani", "Bangladeshi"],
    cuisine_bn: ["বিরিয়ানি", "বাংলাদেশি"],
    cover_image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&q=80",
    rating: 4.8,
    review_count: 1200,
    delivery_time_min: 20,
    delivery_time_max: 35,
    delivery_fee: 0,
    min_order: 150,
    distance_km: 0.8,
    is_active: true,
    is_featured: true,
    deals: ["Free delivery"],
    area: "Old Dhaka",
  },
  {
    name_en: "Star Kabab & Restaurant",
    name_bn: "স্টার কাবাব ও রেস্টুরেন্ট",
    slug: "star-kabab-restaurant",
    cuisine_en: ["Kebab", "Bangladeshi"],
    cuisine_bn: ["কাবাব", "বাংলাদেশি"],
    cover_image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=100&q=80",
    rating: 4.6,
    review_count: 800,
    delivery_time_min: 25,
    delivery_time_max: 40,
    delivery_fee: 25,
    min_order: 100,
    distance_km: 1.2,
    is_active: true,
    is_featured: true,
    deals: ["20% off"],
    area: "Gulshan",
  },
  {
    name_en: "Haji Biryani",
    name_bn: "হাজী বিরিয়ানি",
    slug: "haji-biryani",
    cuisine_en: ["Biryani"],
    cuisine_bn: ["বিরিয়ানি"],
    cover_image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=100&q=80",
    rating: 4.9,
    review_count: 2000,
    delivery_time_min: 30,
    delivery_time_max: 45,
    delivery_fee: 0,
    min_order: 200,
    distance_km: 2.1,
    is_active: true,
    is_featured: true,
    deals: ["Free delivery", "15% off"],
    area: "Old Dhaka",
  },
  {
    name_en: "Pizza Hut Dhanmondi",
    name_bn: "পিজ্জা হাট ধানমন্ডি",
    slug: "pizza-hut-dhanmondi",
    cuisine_en: ["Pizza", "Fast Food"],
    cuisine_bn: ["পিজ্জা", "ফাস্ট ফুড"],
    cover_image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&q=80",
    rating: 4.3,
    review_count: 650,
    delivery_time_min: 25,
    delivery_time_max: 40,
    delivery_fee: 49,
    min_order: 300,
    distance_km: 1.8,
    is_active: true,
    is_featured: false,
    deals: ["20% off first order"],
    area: "Dhanmondi",
  },
  {
    name_en: "Kacchi Bhai",
    name_bn: "কাচ্চি ভাই",
    slug: "kacchi-bhai",
    cuisine_en: ["Bangladeshi", "Kacchi", "Biryani"],
    cuisine_bn: ["বাংলাদেশি", "কাচ্চি", "বিরিয়ানি"],
    cover_image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&q=80",
    rating: 4.7,
    review_count: 1500,
    delivery_time_min: 20,
    delivery_time_max: 30,
    delivery_fee: 0,
    min_order: 120,
    distance_km: 0.5,
    is_active: true,
    is_featured: true,
    deals: ["Free delivery"],
    area: "Banani",
  },
  {
    name_en: "Shuruchi Restaurant",
    name_bn: "সুরুচি রেস্টুরেন্ট",
    slug: "shuruchi-restaurant",
    cuisine_en: ["Bangladeshi", "Rice Dishes"],
    cuisine_bn: ["বাংলাদেশি", "ভাতের রান্না"],
    cover_image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=100&q=80",
    rating: 4.5,
    review_count: 420,
    delivery_time_min: 15,
    delivery_time_max: 25,
    delivery_fee: 20,
    min_order: 80,
    distance_km: 0.3,
    is_active: true,
    is_featured: false,
    deals: [],
    area: "Mirpur",
  },
  {
    name_en: "Chillox",
    name_bn: "চিলক্স",
    slug: "chillox",
    cuisine_en: ["Burgers", "Fast Food"],
    cuisine_bn: ["বার্গার", "ফাস্ট ফুড"],
    cover_image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
    rating: 4.4,
    review_count: 900,
    delivery_time_min: 20,
    delivery_time_max: 35,
    delivery_fee: 0,
    min_order: 150,
    distance_km: 1.0,
    is_active: true,
    is_featured: true,
    deals: ["Free delivery", "15% off"],
    area: "Dhanmondi",
  },
  {
    name_en: "Baked by Mahin",
    name_bn: "বেকড বাই মাহিন",
    slug: "baked-by-mahin",
    cuisine_en: ["Bakery", "Cakes", "Dessert"],
    cuisine_bn: ["বেকারি", "কেক", "ডেজার্ট"],
    cover_image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&q=80",
    rating: 4.8,
    review_count: 340,
    delivery_time_min: 30,
    delivery_time_max: 45,
    delivery_fee: 30,
    min_order: 200,
    distance_km: 2.5,
    is_active: true,
    is_featured: false,
    deals: ["10% off"],
    area: "Uttara",
  },
  {
    name_en: "Fuchka Club",
    name_bn: "ফুচকা ক্লাব",
    slug: "fuchka-club",
    cuisine_en: ["Street Food", "Bangladeshi", "Fuchka"],
    cuisine_bn: ["রাস্তার খাবার", "বাংলাদেশি", "ফুচকা"],
    cover_image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=80",
    rating: 4.6,
    review_count: 580,
    delivery_time_min: 15,
    delivery_time_max: 20,
    delivery_fee: 0,
    min_order: 60,
    distance_km: 0.4,
    is_active: true,
    is_featured: false,
    deals: ["Free delivery"],
    area: "Gulshan",
  },
  {
    name_en: "Chinese Garden",
    name_bn: "চাইনিজ গার্ডেন",
    slug: "chinese-garden",
    cuisine_en: ["Chinese", "Asian"],
    cuisine_bn: ["চাইনিজ", "এশিয়ান"],
    cover_image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=100&q=80",
    rating: 4.2,
    review_count: 280,
    delivery_time_min: 30,
    delivery_time_max: 50,
    delivery_fee: 49,
    min_order: 250,
    distance_km: 3.2,
    is_active: true,
    is_featured: false,
    deals: [],
    area: "Mohammadpur",
  },
  {
    name_en: "Crimson Cup Coffee",
    name_bn: "ক্রিমসন কাপ কফি",
    slug: "crimson-cup-coffee",
    cuisine_en: ["Cafe", "Beverages"],
    cuisine_bn: ["ক্যাফে", "পানীয়"],
    cover_image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
    rating: 4.7,
    review_count: 450,
    delivery_time_min: 20,
    delivery_time_max: 30,
    delivery_fee: 0,
    min_order: 100,
    distance_km: 0.9,
    is_active: true,
    is_featured: false,
    deals: ["Free delivery"],
    area: "Banani",
  },
  {
    name_en: "Doner House",
    name_bn: "ডোনার হাউস",
    slug: "doner-house",
    cuisine_en: ["Middle Eastern", "Fast Food", "Kebab"],
    cuisine_bn: ["মধ্যপ্রাচ্যের", "ফাস্ট ফুড", "কাবাব"],
    cover_image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=100&q=80",
    rating: 4.5,
    review_count: 360,
    delivery_time_min: 25,
    delivery_time_max: 40,
    delivery_fee: 25,
    min_order: 180,
    distance_km: 1.6,
    is_active: true,
    is_featured: false,
    deals: ["20% off"],
    area: "Dhanmondi",
  },
  ...GENERATED_RESTAURANTS,
  ...GENERATED_RESTAURANTS_60,
];

export const SEED_MENU_ITEMS: (Omit<MenuItem, "id"> & { restaurant_slug: string })[] = [
  // Fakruddin Biryani House
  { restaurant_slug: "fakruddin-biryani-house", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Kacchi Biryani", name_bn: "কাচ্চি বিরিয়ানি", description_en: "Slow-cooked mutton biryani with fragrant basmati rice, saffron, and traditional spices.", description_bn: "ধীরে রান্না করা মাটন বিরিয়ানি সুগন্ধী বাসমতী চাল দিয়ে।", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "fakruddin-biryani-house", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Chicken Biryani", name_bn: "চিকেন বিরিয়ানি", description_en: "Tender chicken pieces layered with fragrant rice, cooked to perfection.", description_bn: "নরম মুরগির টুকরো সুগন্ধী ভাতের সাথে।", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "fakruddin-biryani-house", restaurant_id: "", category_en: "Biryani", category_bn: "বিরিয়ানি", name_en: "Beef Tehari", name_bn: "বিফ তেহারি", description_en: "Traditional Dhaka-style beef tehari with aromatic spices.", description_bn: "ঐতিহ্যবাহী ঢাকাই বিফ তেহারি।", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },
  { restaurant_slug: "fakruddin-biryani-house", restaurant_id: "", category_en: "Sides", category_bn: "সাইড", name_en: "Borhani", name_bn: "বোরহানি", description_en: "Traditional spiced yogurt drink.", description_bn: "ঐতিহ্যবাহী মশলাদার দই পানীয়।", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", is_popular: false, is_available: true, sort_order: 4 },

  // Star Kabab
  { restaurant_slug: "star-kabab-restaurant", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Seekh Kabab", name_bn: "সিক কাবাব", description_en: "Minced mutton kebabs grilled over charcoal, served with naan and chutney.", description_bn: "কাঠকয়লায় গ্রিলড মাটন কিমা কাবাব।", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "star-kabab-restaurant", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Boti Kabab", name_bn: "বটি কাবাব", description_en: "Tender mutton pieces marinated in spices and grilled to perfection.", description_bn: "মশলায় মাখানো মাটনের টুকরো গ্রিল করা।", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "star-kabab-restaurant", restaurant_id: "", category_en: "Kabab", category_bn: "কাবাব", name_en: "Chicken Tikka", name_bn: "চিকেন টিক্কা", description_en: "Juicy chicken tikka marinated in yogurt and spices.", description_bn: "দই ও মশলায় মাখানো চিকেন টিক্কা।", price: 240, original_price: 280, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },
  { restaurant_slug: "star-kabab-restaurant", restaurant_id: "", category_en: "Sides", category_bn: "সাইড", name_en: "Garlic Naan", name_bn: "রসুন নান", description_en: "Soft garlic-infused flatbread from the tandoor.", description_bn: "রসুন মাখানো নরম নান রুটি।", price: 60, original_price: 70, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", is_popular: false, is_available: true, sort_order: 4 },

  // Kacchi Bhai
  { restaurant_slug: "kacchi-bhai", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Special Kacchi Biryani", name_bn: "স্পেশাল কাচ্চি বিরিয়ানি", description_en: "Our signature kacchi biryani with tender mutton and aromatic rice.", description_bn: "আমাদের বিশেষ কাচ্চি বিরিয়ানি নরম মাটন দিয়ে।", price: 380, original_price: 420, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "kacchi-bhai", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Half Kacchi", name_bn: "হাফ কাচ্চি", description_en: "Half portion of our famous kacchi biryani, perfect for one.", description_bn: "আমাদের বিখ্যাত কাচ্চির হাফ পোর্শন।", price: 220, original_price: 250, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "kacchi-bhai", restaurant_id: "", category_en: "Sides", category_bn: "সাইড", name_en: "Firni", name_bn: "ফিরনি", description_en: "Creamy rice pudding dessert.", description_bn: "ক্রিমি চালের পুডিং।", price: 80, original_price: 100, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },

  // Chillox
  { restaurant_slug: "chillox", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Classic Cheeseburger", name_bn: "ক্লাসিক চিজবার্গার", description_en: "Juicy beef patty with melted cheese, lettuce, tomato, and our secret sauce.", description_bn: "সরস বিফ প্যাটি গলানো চিজ দিয়ে।", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "chillox", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Crispy Chicken Burger", name_bn: "ক্রিসপি চিকেন বার্গার", description_en: "Crunchy fried chicken burger with coleslaw and spicy mayo.", description_bn: "মুচমুচে ফ্রাইড চিকেন বার্গার।", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "chillox", restaurant_id: "", category_en: "Sides", category_bn: "সাইড", name_en: "Loaded Fries", name_bn: "লোডেড ফ্রাইস", description_en: "Crispy fries loaded with cheese sauce and jalapeños.", description_bn: "চিজ সস ও জালাপেনো দিয়ে লোডেড ফ্রাইস।", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },

  // Crimson Cup Coffee
  { restaurant_slug: "crimson-cup-coffee", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Cold Brew Coffee", name_bn: "কোল্ড ব্রু কফি", description_en: "Smooth, rich cold brew coffee steeped for 24 hours.", description_bn: "২৪ ঘণ্টা ভেজানো মসৃণ কোল্ড ব্রু।", price: 220, original_price: 260, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "crimson-cup-coffee", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Iced Caramel Latte", name_bn: "আইসড ক্যারামেল লাটে", description_en: "Espresso with caramel syrup, milk, and ice.", description_bn: "ক্যারামেল সিরাপ ও দুধ দিয়ে এসপ্রেসো।", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "crimson-cup-coffee", restaurant_id: "", category_en: "Snacks", category_bn: "স্ন্যাকস", name_en: "Chocolate Croissant", name_bn: "চকলেট ক্রোয়াসাঁ", description_en: "Flaky, buttery croissant filled with dark chocolate.", description_bn: "ডার্ক চকলেট ভরা মাখনওয়ালা ক্রোয়াসাঁ।", price: 160, original_price: 190, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },

  // Baked by Mahin
  { restaurant_slug: "baked-by-mahin", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Red Velvet Cake", name_bn: "রেড ভেলভেট কেক", description_en: "Moist red velvet cake with cream cheese frosting.", description_bn: "ক্রিম চিজ ফ্রস্টিং সহ ভেজা রেড ভেলভেট কেক।", price: 450, original_price: 520, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "baked-by-mahin", restaurant_id: "", category_en: "Cakes", category_bn: "কেক", name_en: "Chocolate Fudge Cake", name_bn: "চকলেট ফাজ কেক", description_en: "Dense, rich chocolate cake with fudge icing.", description_bn: "ঘন সমৃদ্ধ চকলেট কেক ফাজ আইসিং দিয়ে।", price: 480, original_price: 550, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", is_popular: false, is_available: true, sort_order: 2 },
  { restaurant_slug: "baked-by-mahin", restaurant_id: "", category_en: "Pastries", category_bn: "পেস্ট্রি", name_en: "Cinnamon Roll", name_bn: "দারুচিনি রোল", description_en: "Warm, soft cinnamon rolls with cream cheese glaze.", description_bn: "গরম নরম দারুচিনি রোল ক্রিম চিজ গ্লেজ দিয়ে।", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },

  // Doner House
  { restaurant_slug: "doner-house", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Chicken Doner Wrap", name_bn: "চিকেন ডোনার র‍্যাপ", description_en: "Rotisserie chicken with garlic sauce, salad, and fries in a warm wrap.", description_bn: "রোটিসেরি চিকেন রসুন সস ও সালাদ দিয়ে।", price: 280, original_price: 320, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", is_popular: true, is_available: true, sort_order: 1 },
  { restaurant_slug: "doner-house", restaurant_id: "", category_en: "Popular", category_bn: "জনপ্রিয়", name_en: "Beef Shawarma", name_bn: "বিফ শাওয়ারমা", description_en: "Seasoned beef shawarma with tahini and pickles.", description_bn: "তাহিনি ও আচার দিয়ে মশলাদার বিফ শাওয়ারমা।", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", is_popular: true, is_available: true, sort_order: 2 },
  { restaurant_slug: "doner-house", restaurant_id: "", category_en: "Sides", category_bn: "সাইড", name_en: "Hummus Plate", name_bn: "হুমুস প্লেট", description_en: "Creamy hummus with olive oil and pita bread.", description_bn: "জলপাই তেল ও পিটা রুটি দিয়ে ক্রিমি হুমুস।", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80", is_popular: false, is_available: true, sort_order: 3 },
];

export const SEED_VOUCHERS: Omit<FakeVoucher, "id">[] = [
  {
    code: "TURTLE50",
    discount_type: "percent",
    discount_value: 50,
    min_order: 200,
    expires_at: "2025-12-31",
    is_active: true,
  },
  {
    code: "ASHBENA30",
    discount_type: "flat",
    discount_value: 30,
    min_order: 150,
    expires_at: "2025-12-31",
    is_active: true,
  },
  {
    code: "NBPLC100",
    discount_type: "percent",
    discount_value: 25,
    min_order: 399,
    expires_at: "2025-06-30",
    is_active: true,
  },
  {
    code: "CASHLESS",
    discount_type: "percent",
    discount_value: 7,
    min_order: 1499,
    expires_at: "2026-07-31",
    is_active: true,
  },
  {
    code: "DEALNAO",
    discount_type: "percent",
    discount_value: 30,
    min_order: 450,
    expires_at: "2025-12-31",
    is_active: true,
  },
];

export const FAKE_REVIEWS_BY_SLUG: Record<string, { author: string; rating: number; text: string; date: string; is_top_reviewer: boolean }[]> = {
  "fakruddin-biryani-house": [
    { author: "Rafiqul Islam", rating: 5, text: "The best kacchi biryani in Dhaka! The mutton is so tender and the rice is perfectly cooked. Order every week!", date: "2 weeks ago", is_top_reviewer: true },
    { author: "Nusrat Jahan", rating: 4, text: "Excellent biryani. Arrived hot and fresh. The portion size is generous. Will definitely reorder.", date: "1 month ago", is_top_reviewer: false },
    { author: "Kamal Hossain", rating: 5, text: "Legendary! The borhani was perfect with the biryani. My family's favourite. 100% recommend.", date: "3 weeks ago", is_top_reviewer: true },
  ],
  "chillox": [
    { author: "Sabbir Ahmed", rating: 5, text: "Best burgers in Dhaka hands down. The crispy chicken burger is insanely good!", date: "1 week ago", is_top_reviewer: true },
    { author: "Tania Rahman", rating: 4, text: "Really enjoyed the cheeseburger. Fries were crispy. Good value for money.", date: "2 weeks ago", is_top_reviewer: false },
    { author: "Imran Chowdhury", rating: 4, text: "Great ambiance and food. The loaded fries are a must try!", date: "1 month ago", is_top_reviewer: false },
  ],
};
