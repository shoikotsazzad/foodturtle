export interface Shop {
  id: string;
  name_en: string;
  name_bn: string;
  logo: string;
  type: string;
  delivery_time: string;
  rating: number;
  is_open: boolean;
  area: string;
}

// ---------------------------------------------------------------------------
// Real-named neighbourhood shops (Gulshan/Banani/Baridhara) mapped onto the
// existing shop types below, so they slot into the existing type filters
// and product templates without needing new categories.
// ---------------------------------------------------------------------------

const TYPE_LOGOS: Record<string, string> = {
  "Supermarket": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80",
  "All In One Pharmacy": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80",
  "Bakery & Desserts": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80",
  Beauty: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80",
  Beverages: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80",
  Electronics: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80",
  Fashion: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80",
  Convenience: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80",
  "Flowers & Plants": "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80",
  "Pets": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80",
  "Stationery And Books": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80",
  "Sports & Fashion": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80",
};

// Distinct photo pools per shop type — each shop picks a deterministic-but-different
// entry from its type's pool (by id), instead of every shop of a type sharing one photo.
const TYPE_IMAGE_POOL: Record<string, string[]> = {
  "Supermarket": [
    "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&q=75",
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&q=75",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=75",
    "https://images.unsplash.com/photo-1553546895-531931aa1aa8?w=400&q=75",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=75",
  ],
  "All In One Pharmacy": [
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=75",
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=75",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=75",
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&q=75",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=75",
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=75",
  ],
  "Bakery & Desserts": [
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=75",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=75",
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=75",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=75",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=75",
    "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=400&q=75",
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=75",
    "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&q=75",
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=75",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=75",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=75",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=75",
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=75",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=75",
    "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=75",
    "https://images.unsplash.com/photo-1585652757173-57de5e9fab42?w=400&q=75",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=75",
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400&q=75",
  ],
  Beverages: [
    "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&q=75",
    "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=400&q=75",
    "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=75",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=75",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=75",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=75",
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=75",
    "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=75",
    "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&q=75",
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&q=75",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=75",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=75",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&q=75",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=75",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=75",
    "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=400&q=75",
    "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=75",
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=75",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=75",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=75",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=75",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=75",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=75",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=75",
  ],
  Convenience: [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=75",
    "https://images.unsplash.com/photo-1543168256-418811576931?w=400&q=75",
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=75",
    "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&q=75",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=75",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=75",
  ],
  "Flowers & Plants": [
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&q=75",
    "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400&q=75",
    "https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=400&q=75",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=75",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=75",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=75",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=75",
  ],
  "Pets": [
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=75",
    "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&q=75",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=75",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=75",
    "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&q=75",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=75",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=75",
    "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=400&q=75",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=75",
  ],
  "Stationery And Books": [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=75",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=75",
    "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=75",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=75",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=75",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=75",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=75",
    "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=75",
  ],
  "Sports & Fashion": [
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=75",
    "https://images.unsplash.com/photo-1517637382994-f02da38c6728?w=400&q=75",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=75",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=75",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=75",
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&q=75",
    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=75",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=75",
    "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&q=75",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&q=75",
  ],
};

function imageForShop(type: string, id: string): string {
  const pool = TYPE_IMAGE_POOL[type] || TYPE_IMAGE_POOL["Convenience"];
  const seed = parseInt(id.replace(/\D/g, ""), 10) || 0;
  return pool[seed % pool.length];
}

interface RawShop {
  name: string;
  type: keyof typeof TYPE_LOGOS;
  time: number; // minutes, midpoint
  area?: string;
  isNew?: boolean;
}

const NAMED_SHOP_AREAS = ["Gulshan", "Gulshan 2", "Banani", "Baridhara", "Niketon"];

const RAW_NAMED_SHOPS: RawShop[] = [
  { name: "Turtlemart Gulshan Banani", type: "Supermarket", time: 10 },
  { name: "Nur Hosen's Vegetable Store Gulshan 2", type: "Supermarket", time: 10 },
  { name: "Ramna Pharmacy and Grocery Gulshan 2", type: "All In One Pharmacy", time: 10 },
  { name: "Alibaba Gulshan 02", type: "Supermarket", time: 15 },
  { name: "German Butcher Gulshan", type: "Supermarket", time: 10 },
  { name: "Metro Mart", type: "Supermarket", time: 25 },
  { name: "Unimart Gulshan 2", type: "Supermarket", time: 20 },
  { name: "Agora RM Center", type: "Supermarket", time: 10 },
  { name: "Healthy World", type: "Supermarket", time: 20 },
  { name: "UK Products Gallery", type: "Convenience", time: 25 },
  { name: "Bengal Meat Gourmet Butcher Shop", type: "Supermarket", time: 10 },
  { name: "Bismillah Groceries Vegetable Corner", type: "Supermarket", time: 10 },
  { name: "Daily Mart Gulshan 01", type: "Convenience", time: 25 },
  { name: "24/7 Bangladesh", type: "Convenience", time: 20 },
  { name: "Foreigners Mart", type: "Convenience", time: 15 },

  { name: "Ramna Pharmacy & Grocery 2", type: "All In One Pharmacy", time: 5 },
  { name: "Bismillah Pharmacy Banani", type: "All In One Pharmacy", time: 20 },
  { name: "Rafi Pharmacy Gulshan 2", type: "All In One Pharmacy", time: 20 },
  { name: "Maheera Medicine Zone Gulshan 2", type: "All In One Pharmacy", time: 15 },
  { name: "Emergency Drug Niketon", type: "All In One Pharmacy", time: 20 },
  { name: "Hamdard Gulshan 2", type: "All In One Pharmacy", time: 5 },
  { name: "Best Care Pharma", type: "All In One Pharmacy", time: 20 },
  { name: "Bismillah Medicine Gulshan 2", type: "All In One Pharmacy", time: 15 },

  { name: "Holey Bakery", type: "Bakery & Desserts", time: 10 },
  { name: "Premium Sweets Gulshan 2", type: "Bakery & Desserts", time: 15 },
  { name: "Lavender Food & Bakery Gulshan 1", type: "Bakery & Desserts", time: 10 },
  { name: "Kavazo Gulshan", type: "Bakery & Desserts", time: 5 },
  { name: "Bhagyakul Mistanna Bhander", type: "Bakery & Desserts", time: 5 },
  { name: "Boss Sweets Gulshan", type: "Bakery & Desserts", time: 5 },
  { name: "YARA Gulshan", type: "Bakery & Desserts", time: 5 },
  { name: "Puro Pastry & Bakery", type: "Bakery & Desserts", time: 5 },

  { name: "Grounds Coffee Factory", type: "Beverages", time: 6 },
  { name: "Arabika Coffee Gulshan 2", type: "Beverages", time: 5 },
  { name: "The Coffee Lounge Gulshan", type: "Beverages", time: 6 },
  { name: "Tabaq Coffee Baridhara", type: "Beverages", time: 11 },
  { name: "NORTH END Coffee Roasters", type: "Beverages", time: 12 },

  { name: "Rose Valley Flower Shop Banani", type: "Flowers & Plants", time: 10 },
  { name: "Gulshan Flower House", type: "Flowers & Plants", time: 30 },
  { name: "Noyon Flower Shop", type: "Flowers & Plants", time: 20 },
  { name: "Banani Blooms", type: "Flowers & Plants", time: 30 },
  { name: "Flowers Petal Banani", type: "Flowers & Plants", time: 25 },
  { name: "Radian Flower & Gift Shop Gulshan 1", type: "Flowers & Plants", time: 30 },
  { name: "Amore Flower Shop Gulshan 1", type: "Flowers & Plants", time: 30 },
  { name: "Pushpo Koli Gulshan", type: "Flowers & Plants", time: 15 },
  { name: "Jannat Puspaloy", type: "Flowers & Plants", time: 10 },

  { name: "Pet Zone Gulshan 2", type: "Pets", time: 10 },
  { name: "Meow Town", type: "Pets", time: 10 },
  { name: "Banani Cat Shop", type: "Pets", time: 10 },
  { name: "Gulshan Pet Corner", type: "Pets", time: 10 },
  { name: "Dhaka Pet Shop Kalachandpur", type: "Pets", time: 15 },
  { name: "Happy Petz Club Gulshan 2", type: "Pets", time: 10 },
  { name: "Miki Pet Store Dhaka", type: "Pets", time: 30 },
  { name: "Banani Pet Care", type: "Pets", time: 10 },
  { name: "Dhaka Pet Shop", type: "Pets", time: 15 },

  { name: "Rokomari", type: "Stationery And Books", time: 25 },
  { name: "Pen Gallery Toy Shop", type: "Stationery And Books", time: 25 },
  { name: "Dhali's Toys Collection", type: "Stationery And Books", time: 10 },
  { name: "Gulshan Stationary & Library", type: "Stationery And Books", time: 15 },

  { name: "Star Tech Banani", type: "Electronics", time: 15 },
  { name: "Techland Banani", type: "Electronics", time: 10 },
  { name: "A2Z Gadget & Electronic Park", type: "Electronics", time: 15 },
  { name: "Best Mobile Gadget & Electronic Shop", type: "Electronics", time: 20 },
  { name: "Sarwar Electric & Mobile Gadget", type: "Electronics", time: 20 },
  { name: "Electronics Corner", type: "Electronics", time: 15 },
  { name: "Wall Touch", type: "Electronics", time: 20, isNew: true },

  { name: "Sujon Collection", type: "Fashion", time: 25 },
  { name: "Dhali's Unique Collection Gulshan 2", type: "Fashion", time: 10 },
];

const GENERATED_SHOPS: Shop[] = RAW_NAMED_SHOPS.map((r, i) => {
  const idx = 121 + i;
  return {
    id: `s${idx}`,
    name_en: r.name,
    name_bn: r.name,
    logo: TYPE_LOGOS[r.type],
    type: r.type,
    delivery_time: `${r.time}-${r.time + 15}`,
    rating: Math.round((4.0 + ((idx + r.name.length) % 10) * 0.09) * 10) / 10,
    is_open: (idx + r.name.length) % 7 !== 0,
    area: r.area || NAMED_SHOP_AREAS[idx % NAMED_SHOP_AREAS.length],
  };
});

export interface ShopProduct {
  id: string;
  name_en: string;
  name_bn: string;
  price: number;
  original_price: number;
  image: string;
  category: string;
}

export const SHOP_TYPES = [
  "All",
  "All In One Pharmacy",
  "Bakery & Desserts",
  "Beauty",
  "Beverages",
  "Butchery & Fishery",
  "Convenience",
  "Cross Vertical",
  "Electronics",
  "Fashion",
  "Fishery",
  "Flowers & Plants",
  "Fruits & Vegetables",
  "Games",
  "Health & Beauty",
  "Health And Wellness",
  "Home And Gifts",
  "Household & Living",
  "Mother And Baby",
  "Pets",
  "Snacks And Sweets",
  "Sports & Fashion",
  "Stationery And Books",
  "Supermarket",
  "Tobacco",
];

const PRODUCT_TEMPLATES: Record<string, ShopProduct[]> = {
  "Supermarket": [
    { id: "aio1", name_en: "Premium Rice (5kg)", name_bn: "প্রিমিয়াম চাল (৫কেজি)", price: 380, original_price: 450, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80", category: "Groceries" },
    { id: "aio2", name_en: "Cooking Oil (2L)", name_bn: "রান্নার তেল (২ লিটার)", price: 350, original_price: 420, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80", category: "Groceries" },
    { id: "aio3", name_en: "Sugar (1kg)", name_bn: "চিনি (১কেজি)", price: 95, original_price: 115, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80", category: "Groceries" },
    { id: "aio4", name_en: "Salt Pack (1kg)", name_bn: "লবণ (১কেজি)", price: 30, original_price: 40, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80", category: "Groceries" },
    { id: "aio5", name_en: "Wheat Flour (2kg)", name_bn: "আটা (২কেজি)", price: 140, original_price: 170, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80", category: "Groceries" },
    { id: "aio6", name_en: "Tea Bags (50 pcs)", name_bn: "টি ব্যাগ (৫০ পিস)", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&q=80", category: "Beverages" },
    { id: "aio7", name_en: "Noodles (6 packs)", name_bn: "নুডলস (৬ প্যাক)", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80", category: "Instant Food" },
    { id: "aio8", name_en: "Soap Set (3 bars)", name_bn: "সাবান (৩টি)", price: 75, original_price: 95, image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&q=80", category: "Hygiene" },
    { id: "aio9", name_en: "Milk Powder (400g)", name_bn: "মিল্ক পাউডার (৪০০গ্রা)", price: 320, original_price: 380, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", category: "Dairy" },
    { id: "aio10", name_en: "Mixed Household Bundle", name_bn: "মিক্সড হাউসহোল্ড বান্ডেল", price: 850, original_price: 1050, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Bundles" },
    { id: "aio11", name_en: "Paper Towels (2 rolls)", name_bn: "পেপার টাওয়েল (২ রোল)", price: 90, original_price: 110, image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&q=80", category: "Household" },
    { id: "aio12", name_en: "Eggs (12 pcs)", name_bn: "ডিম (১২টি)", price: 145, original_price: 170, image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=300&q=80", category: "Fresh" },
  ],
  "All In One Pharmacy": [
    { id: "ph1", name_en: "Paracetamol 500mg (10 tabs)", name_bn: "প্যারাসিটামল ৫০০মিগ্রা (১০ ট্যাবলেট)", price: 25, original_price: 30, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", category: "Medicine" },
    { id: "ph2", name_en: "Vitamin C (30 tabs)", name_bn: "ভিটামিন সি (৩০ ট্যাবলেট)", price: 150, original_price: 180, image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=300&q=80", category: "Vitamins" },
    { id: "ph3", name_en: "Antacid Suspension (200ml)", name_bn: "অ্যান্টাসিড (২০০মিলি)", price: 85, original_price: 100, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", category: "Medicine" },
    { id: "ph4", name_en: "Bandage Roll", name_bn: "ব্যান্ডেজ রোল", price: 60, original_price: 75, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&q=80", category: "First Aid" },
    { id: "ph5", name_en: "Hand Sanitizer (250ml)", name_bn: "হ্যান্ড স্যানিটাইজার (২৫০মিলি)", price: 110, original_price: 135, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80", category: "Hygiene" },
    { id: "ph6", name_en: "Digital Thermometer", name_bn: "ডিজিটাল থার্মোমিটার", price: 350, original_price: 420, image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&q=80", category: "Devices" },
    { id: "ph7", name_en: "Face Mask (Box 50 pcs)", name_bn: "ফেস মাস্ক (৫০ পিস বাক্স)", price: 190, original_price: 240, image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=300&q=80", category: "Hygiene" },
    { id: "ph8", name_en: "Eye Drops (10ml)", name_bn: "আই ড্রপস (১০মিলি)", price: 95, original_price: 115, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", category: "Eye Care" },
    { id: "ph9", name_en: "Calcium + D3 (30 tabs)", name_bn: "ক্যালসিয়াম + ডি৩ (৩০ ট্যাবলেট)", price: 220, original_price: 265, image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=300&q=80", category: "Vitamins" },
    { id: "ph10", name_en: "Glucose (500g)", name_bn: "গ্লুকোজ (৫০০গ্রা)", price: 75, original_price: 90, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80", category: "Supplements" },
    { id: "ph11", name_en: "Pain Relief Spray", name_bn: "পেইন রিলিফ স্প্রে", price: 280, original_price: 340, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80", category: "Medicine" },
    { id: "ph12", name_en: "Cough Syrup (100ml)", name_bn: "কাশির সিরাপ (১০০মিলি)", price: 120, original_price: 145, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", category: "Medicine" },
  ],
  "Bakery & Desserts": [
    { id: "bd1", name_en: "Chocolate Truffle Cake (1kg)", name_bn: "চকোলেট ট্রাফেল কেক (১কেজি)", price: 950, original_price: 1150, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80", category: "Cakes" },
    { id: "bd2", name_en: "Red Velvet Cupcakes (6 pcs)", name_bn: "রেড ভেলভেট কাপকেক (৬টি)", price: 480, original_price: 580, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80", category: "Cupcakes" },
    { id: "bd3", name_en: "Fresh Croissants (4 pcs)", name_bn: "ক্রোয়াসাঁ (৪টি)", price: 220, original_price: 270, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80", category: "Pastries" },
    { id: "bd4", name_en: "Fudge Brownie Box (9 pcs)", name_bn: "ফাজ ব্রাউনি (৯টি)", price: 520, original_price: 630, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300&q=80", category: "Brownies" },
    { id: "bd5", name_en: "Butter Cookies (250g)", name_bn: "বাটার কুকিজ (২৫০গ্রা)", price: 280, original_price: 340, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Cookies" },
    { id: "bd6", name_en: "Cheesecake Slice", name_bn: "চিজকেক স্লাইস", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80", category: "Cakes" },
    { id: "bd7", name_en: "Cinnamon Rolls (3 pcs)", name_bn: "দারুচিনি রোল (৩টি)", price: 240, original_price: 290, image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=300&q=80", category: "Pastries" },
    { id: "bd8", name_en: "Macaron Box (8 pcs)", name_bn: "ম্যাকারন বক্স (৮টি)", price: 680, original_price: 820, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&q=80", category: "Macarons" },
    { id: "bd9", name_en: "Banana Bread (loaf)", name_bn: "কলার পাউরুটি", price: 190, original_price: 230, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80", category: "Bread" },
    { id: "bd10", name_en: "Éclair (4 pcs)", name_bn: "এক্লেয়ার (৪টি)", price: 320, original_price: 390, image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=300&q=80", category: "Pastries" },
    { id: "bd11", name_en: "Fruit Tart (6 inch)", name_bn: "ফ্রুট টার্ট", price: 450, original_price: 550, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80", category: "Tarts" },
    { id: "bd12", name_en: "Tiramisu (500g)", name_bn: "তিরামিসু (৫০০গ্রা)", price: 680, original_price: 820, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80", category: "Desserts" },
  ],
  "Beauty": [
    { id: "bu1", name_en: "Matte Lipstick", name_bn: "ম্যাট লিপস্টিক", price: 580, original_price: 720, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80", category: "Makeup" },
    { id: "bu2", name_en: "BB Cream (30ml)", name_bn: "বিবি ক্রিম (৩০মিলি)", price: 420, original_price: 520, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80", category: "Foundation" },
    { id: "bu3", name_en: "Waterproof Mascara", name_bn: "ওয়াটারপ্রুফ মাসকারা", price: 380, original_price: 460, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80", category: "Eyes" },
    { id: "bu4", name_en: "Rose Water Toner (150ml)", name_bn: "রোজ ওয়াটার টোনার (১৫০মিলি)", price: 290, original_price: 350, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&q=80", category: "Skin Care" },
    { id: "bu5", name_en: "Vitamin C Serum (30ml)", name_bn: "ভিটামিন সি সিরাম (৩০মিলি)", price: 750, original_price: 920, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80", category: "Skin Care" },
    { id: "bu6", name_en: "SPF50 Sunscreen (50g)", name_bn: "এসপিএফ৫০ সানস্ক্রিন (৫০গ্রা)", price: 450, original_price: 550, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80", category: "Sun Care" },
    { id: "bu7", name_en: "Floral Perfume (50ml)", name_bn: "ফ্লোরাল পারফিউম (৫০মিলি)", price: 1200, original_price: 1480, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80", category: "Fragrance" },
    { id: "bu8", name_en: "Hair Serum (100ml)", name_bn: "হেয়ার সিরাম (১০০মিলি)", price: 380, original_price: 460, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80", category: "Hair Care" },
    { id: "bu9", name_en: "Eyeshadow Palette", name_bn: "আইশ্যাডো প্যালেট", price: 680, original_price: 850, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", category: "Eyes" },
    { id: "bu10", name_en: "Facial Cleanser (150ml)", name_bn: "ফেশিয়াল ক্লেনজার (১৫০মিলি)", price: 320, original_price: 390, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&q=80", category: "Skin Care" },
    { id: "bu11", name_en: "Nail Polish Set (6 colors)", name_bn: "নেইল পলিশ সেট (৬ রঙ)", price: 480, original_price: 590, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80", category: "Nails" },
    { id: "bu12", name_en: "Makeup Brush Set (12 pcs)", name_bn: "মেকআপ ব্রাশ সেট (১২টি)", price: 890, original_price: 1100, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", category: "Tools" },
  ],
  "Beverages": [
    { id: "bev1", name_en: "Fresh Orange Juice (1L)", name_bn: "তাজা কমলার রস (১ লিটার)", price: 150, original_price: 185, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80", category: "Juices" },
    { id: "bev2", name_en: "Cold Brew Coffee (500ml)", name_bn: "কোল্ড ব্রিউ কফি (৫০০মিলি)", price: 220, original_price: 270, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=300&q=80", category: "Coffee" },
    { id: "bev3", name_en: "Mineral Water 6-pack", name_bn: "মিনারেল ওয়াটার ৬ প্যাক", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80", category: "Water" },
    { id: "bev4", name_en: "Coconut Water (330ml)", name_bn: "ডাবের পানি (৩৩০মিলি)", price: 80, original_price: 100, image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=300&q=80", category: "Natural" },
    { id: "bev5", name_en: "Energy Drink (250ml)", name_bn: "এনার্জি ড্রিংক (২৫০মিলি)", price: 90, original_price: 110, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=300&q=80", category: "Energy" },
    { id: "bev6", name_en: "Herbal Green Tea (25 bags)", name_bn: "গ্রিন টি (২৫ ব্যাগ)", price: 140, original_price: 170, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&q=80", category: "Tea" },
    { id: "bev7", name_en: "Sports Drink (500ml)", name_bn: "স্পোর্টস ড্রিংক (৫০০মিলি)", price: 75, original_price: 95, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=300&q=80", category: "Sports" },
    { id: "bev8", name_en: "Coffee Capsules (10 pods)", name_bn: "কফি ক্যাপসুল (১০ পড)", price: 380, original_price: 460, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=300&q=80", category: "Coffee" },
    { id: "bev9", name_en: "Mango Juice (2L)", name_bn: "আমের রস (২ লিটার)", price: 185, original_price: 225, image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=300&q=80", category: "Juices" },
    { id: "bev10", name_en: "Lemon Sparkling Water", name_bn: "লেমন স্পার্কলিং ওয়াটার", price: 110, original_price: 135, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80", category: "Water" },
    { id: "bev11", name_en: "Milk 1L (UHT)", name_bn: "দুধ ১ লিটার (ইউএইচটি)", price: 85, original_price: 105, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", category: "Dairy" },
    { id: "bev12", name_en: "Protein Shake (450g)", name_bn: "প্রোটিন শেক (৪৫০গ্রা)", price: 950, original_price: 1180, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=300&q=80", category: "Supplements" },
  ],
  "Electronics": [
    { id: "el1", name_en: "Fast Phone Charger (20W)", name_bn: "ফাস্ট ফোন চার্জার (২০ওয়াট)", price: 650, original_price: 800, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&q=80", category: "Charging" },
    { id: "el2", name_en: "Wireless Earphones", name_bn: "ওয়্যারলেস ইয়ারফোন", price: 1200, original_price: 1500, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", category: "Audio" },
    { id: "el3", name_en: "Power Bank (10000mAh)", name_bn: "পাওয়ার ব্যাংক (১০০০০ মিলিঅ্যাম্পিয়ার)", price: 1450, original_price: 1800, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80", category: "Power" },
    { id: "el4", name_en: "USB-C Hub (7-in-1)", name_bn: "ইউএসবি-সি হাব (৭-ইন-১)", price: 1850, original_price: 2300, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&q=80", category: "Accessories" },
    { id: "el5", name_en: "Screen Protector (2 pcs)", name_bn: "স্ক্রিন প্রটেক্টর (২ পিস)", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&q=80", category: "Protection" },
    { id: "el6", name_en: "Bluetooth Speaker", name_bn: "ব্লুটুথ স্পিকার", price: 1600, original_price: 2000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", category: "Audio" },
    { id: "el7", name_en: "LED Night Light", name_bn: "এলইডি নাইট লাইট", price: 280, original_price: 350, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Lighting" },
    { id: "el8", name_en: "Gaming Mouse", name_bn: "গেমিং মাউস", price: 850, original_price: 1050, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80", category: "Computer" },
    { id: "el9", name_en: "Webcam (1080p)", name_bn: "ওয়েবক্যাম (১০৮০পি)", price: 2200, original_price: 2750, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&q=80", category: "Computer" },
    { id: "el10", name_en: "Cable Organizer Set", name_bn: "ক্যাবল অর্গানাইজার সেট", price: 150, original_price: 190, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&q=80", category: "Accessories" },
    { id: "el11", name_en: "Smart Watch Band", name_bn: "স্মার্ট ওয়াচ ব্যান্ড", price: 350, original_price: 430, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80", category: "Wearables" },
    { id: "el12", name_en: "Portable LED Desk Lamp", name_bn: "পোর্টেবল এলইডি ডেস্ক ল্যাম্প", price: 680, original_price: 850, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Lighting" },
  ],
  "Fashion": [
    { id: "fa1", name_en: "Classic White T-Shirt", name_bn: "ক্লাসিক হোয়াইট টি-শার্ট", price: 380, original_price: 480, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80", category: "Tops" },
    { id: "fa2", name_en: "Slim Fit Jeans", name_bn: "স্লিম ফিট জিন্স", price: 850, original_price: 1050, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80", category: "Bottoms" },
    { id: "fa3", name_en: "Floral Summer Dress", name_bn: "ফ্লোরাল সামার ড্রেস", price: 720, original_price: 900, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80", category: "Dresses" },
    { id: "fa4", name_en: "Cotton Kurta (Men's)", name_bn: "কটন কুর্তা (পুরুষ)", price: 480, original_price: 600, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80", category: "Traditional" },
    { id: "fa5", name_en: "Casual Polo Shirt", name_bn: "ক্যাজুয়াল পোলো শার্ট", price: 550, original_price: 690, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&q=80", category: "Tops" },
    { id: "fa6", name_en: "Chinos Trousers", name_bn: "চিনোস ট্রাউজার", price: 680, original_price: 850, image: "https://images.unsplash.com/photo-1587467512961-120760940315?w=300&q=80", category: "Bottoms" },
    { id: "fa7", name_en: "Denim Jacket", name_bn: "ডেনিম জ্যাকেট", price: 1450, original_price: 1800, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80", category: "Outerwear" },
    { id: "fa8", name_en: "Silk Hijab Scarf", name_bn: "সিল্ক হিজাব স্কার্ফ", price: 320, original_price: 400, image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&q=80", category: "Accessories" },
    { id: "fa9", name_en: "Canvas Belt", name_bn: "ক্যানভাস বেল্ট", price: 180, original_price: 230, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Accessories" },
    { id: "fa10", name_en: "Sports Socks (3 pairs)", name_bn: "স্পোর্টস সকস (৩ জোড়া)", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=300&q=80", category: "Accessories" },
    { id: "fa11", name_en: "Sun Hat", name_bn: "সান হ্যাট", price: 280, original_price: 350, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80", category: "Accessories" },
    { id: "fa12", name_en: "Linen Shirt (Men's)", name_bn: "লিনেন শার্ট (পুরুষ)", price: 620, original_price: 780, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80", category: "Tops" },
  ],
  "Convenience": [
    { id: "cv1", name_en: "Eggs (12 pcs)", name_bn: "ডিম (১২টি)", price: 145, original_price: 175, image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=300&q=80", category: "Fresh" },
    { id: "cv2", name_en: "Fresh Bread Loaf", name_bn: "তাজা পাউরুটি", price: 65, original_price: 80, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80", category: "Bakery" },
    { id: "cv3", name_en: "Butter (200g)", name_bn: "মাখন (২০০গ্রা)", price: 180, original_price: 220, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", category: "Dairy" },
    { id: "cv4", name_en: "Strawberry Jam (340g)", name_bn: "স্ট্রবেরি জ্যাম (৩৪০গ্রা)", price: 190, original_price: 235, image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&q=80", category: "Spreads" },
    { id: "cv5", name_en: "Peanut Butter (250g)", name_bn: "পিনাট বাটার (২৫০গ্রা)", price: 210, original_price: 260, image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&q=80", category: "Spreads" },
    { id: "cv6", name_en: "Instant Noodles (5 packs)", name_bn: "ইন্সট্যান্ট নুডলস (৫ প্যাক)", price: 95, original_price: 120, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80", category: "Instant" },
    { id: "cv7", name_en: "Canned Tuna (185g)", name_bn: "টিনজাত টুনা (১৮৫গ্রা)", price: 220, original_price: 270, image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=300&q=80", category: "Canned" },
    { id: "cv8", name_en: "Tomato Ketchup (500g)", name_bn: "টমেটো কেচাপ (৫০০গ্রা)", price: 140, original_price: 175, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300&q=80", category: "Condiments" },
    { id: "cv9", name_en: "Frozen Peas (500g)", name_bn: "ফ্রোজেন মটরশুঁটি (৫০০গ্রা)", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80", category: "Frozen" },
    { id: "cv10", name_en: "Soy Sauce (250ml)", name_bn: "সয়া সস (২৫০মিলি)", price: 95, original_price: 120, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&q=80", category: "Condiments" },
    { id: "cv11", name_en: "Coffee Jar (200g)", name_bn: "কফি জার (২০০গ্রা)", price: 380, original_price: 460, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=300&q=80", category: "Beverages" },
    { id: "cv12", name_en: "Mayonnaise (250g)", name_bn: "মেয়োনিজ (২৫০গ্রা)", price: 150, original_price: 185, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300&q=80", category: "Condiments" },
  ],
  "Flowers & Plants": [
    { id: "fl1", name_en: "Red Roses Bouquet (12 pcs)", name_bn: "লাল গোলাপ তোড়া (১২টি)", price: 650, original_price: 800, image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&q=80", category: "Roses" },
    { id: "fl2", name_en: "Mixed Seasonal Bouquet", name_bn: "মিক্সড সিজনাল তোড়া", price: 480, original_price: 590, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80", category: "Mixed" },
    { id: "fl3", name_en: "White Orchid Plant", name_bn: "সাদা অর্কিড গাছ", price: 950, original_price: 1180, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80", category: "Plants" },
    { id: "fl4", name_en: "Sunflower Bunch (5 pcs)", name_bn: "সূর্যমুখী ফুল (৫টি)", price: 380, original_price: 470, image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=300&q=80", category: "Sunflowers" },
    { id: "fl5", name_en: "Pink Lily Arrangement", name_bn: "গোলাপি লিলি সজ্জা", price: 720, original_price: 890, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80", category: "Lilies" },
    { id: "fl6", name_en: "Peace Lily Indoor Plant", name_bn: "পিস লিলি ইনডোর গাছ", price: 420, original_price: 520, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80", category: "Indoor Plants" },
    { id: "fl7", name_en: "Succulent Set (3 pots)", name_bn: "সাকুলেন্ট সেট (৩টি)", price: 350, original_price: 430, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&q=80", category: "Succulents" },
    { id: "fl8", name_en: "Dried Flower Wreath", name_bn: "শুকনো ফুলের মালা", price: 580, original_price: 720, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80", category: "Dried" },
    { id: "fl9", name_en: "Premium Glass Vase", name_bn: "প্রিমিয়াম গ্লাস ভাস", price: 490, original_price: 610, image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&q=80", category: "Vases" },
    { id: "fl10", name_en: "Yellow Tulip Bunch (7 pcs)", name_bn: "হলুদ টিউলিপ (৭টি)", price: 420, original_price: 520, image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300&q=80", category: "Tulips" },
    { id: "fl11", name_en: "Wedding Flower Box", name_bn: "বিবাহের ফুলের বাক্স", price: 1800, original_price: 2200, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80", category: "Special" },
    { id: "fl12", name_en: "Jasmine Garland (2m)", name_bn: "বেলি ফুলের মালা (২মি)", price: 150, original_price: 190, image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&q=80", category: "Garlands" },
  ],
  "Pets": [
    { id: "pet1", name_en: "Dry Dog Food (2kg)", name_bn: "ড্রাই ডগ ফুড (২কেজি)", price: 780, original_price: 960, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300&q=80", category: "Dog Food" },
    { id: "pet2", name_en: "Wet Cat Food (12 cans)", name_bn: "ওয়েট ক্যাট ফুড (১২ ক্যান)", price: 650, original_price: 800, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80", category: "Cat Food" },
    { id: "pet3", name_en: "Dog Training Treats", name_bn: "ডগ ট্রেনিং ট্রিটস", price: 280, original_price: 350, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300&q=80", category: "Treats" },
    { id: "pet4", name_en: "Cat Treat Sticks", name_bn: "ক্যাট ট্রিট স্টিকস", price: 180, original_price: 225, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80", category: "Treats" },
    { id: "pet5", name_en: "Retractable Dog Leash", name_bn: "রিট্র্যাক্টেবল ডগ লিশ", price: 420, original_price: 520, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80", category: "Accessories" },
    { id: "pet6", name_en: "Cat Litter (5L)", name_bn: "ক্যাট লিটার (৫ লিটার)", price: 380, original_price: 470, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80", category: "Cat Care" },
    { id: "pet7", name_en: "Pet Shampoo (250ml)", name_bn: "পেট শ্যাম্পু (২৫০মিলি)", price: 280, original_price: 345, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80", category: "Grooming" },
    { id: "pet8", name_en: "Bird Seed Mix (500g)", name_bn: "বার্ড সিড মিক্স (৫০০গ্রা)", price: 180, original_price: 225, image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=300&q=80", category: "Bird Care" },
    { id: "pet9", name_en: "Tropical Fish Food (50g)", name_bn: "ট্রপিকাল ফিশ ফুড (৫০গ্রা)", price: 150, original_price: 190, image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=300&q=80", category: "Fish Care" },
    { id: "pet10", name_en: "Pet Grooming Brush", name_bn: "পেট গ্রুমিং ব্রাশ", price: 250, original_price: 310, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80", category: "Grooming" },
    { id: "pet11", name_en: "Dog Toy Set (3 pcs)", name_bn: "ডগ টয় সেট (৩টি)", price: 320, original_price: 395, image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=300&q=80", category: "Toys" },
    { id: "pet12", name_en: "Cat Scratching Post", name_bn: "ক্যাট স্ক্র্যাচিং পোস্ট", price: 680, original_price: 840, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80", category: "Cat Furniture" },
  ],
  "Stationery And Books": [
    { id: "bk1", name_en: "A4 Ruled Notebook (200 pages)", name_bn: "এ৪ রুলড নোটবুক (২০০ পৃষ্ঠা)", price: 120, original_price: 150, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80", category: "Notebooks" },
    { id: "bk2", name_en: "Ballpoint Pens (Box of 10)", name_bn: "বলপয়েন্ট কলম (১০টি বাক্স)", price: 85, original_price: 110, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&q=80", category: "Pens" },
    { id: "bk3", name_en: "Highlighters Set (6 colors)", name_bn: "হাইলাইটার সেট (৬ রঙ)", price: 150, original_price: 190, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&q=80", category: "Highlighters" },
    { id: "bk4", name_en: "Sticky Notes (5 pads)", name_bn: "স্টিকি নোট (৫ প্যাড)", price: 95, original_price: 120, image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=300&q=80", category: "Sticky Notes" },
    { id: "bk5", name_en: "Scientific Calculator", name_bn: "সায়েন্টিফিক ক্যালকুলেটর", price: 480, original_price: 600, image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=300&q=80", category: "Electronics" },
    { id: "bk6", name_en: "Stapler + 1000 pins", name_bn: "স্ট্যাপলার + ১০০০ পিন", price: 180, original_price: 225, image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&q=80", category: "Office" },
    { id: "bk7", name_en: "Colored Pencil Set (24 pcs)", name_bn: "কালার পেন্সিল সেট (২৪টি)", price: 220, original_price: 275, image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80", category: "Art" },
    { id: "bk8", name_en: "Ruler + Eraser + Sharpener", name_bn: "রুলার + ইরেজার + শার্পনার", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&q=80", category: "Essentials" },
    { id: "bk9", name_en: "A5 Diary (365 pages)", name_bn: "এ৫ ডায়েরি (৩৬৫ পৃষ্ঠা)", price: 190, original_price: 240, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80", category: "Diaries" },
    { id: "bk10", name_en: "Whiteboard Markers (4 pcs)", name_bn: "হোয়াইটবোর্ড মার্কার (৪টি)", price: 140, original_price: 175, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&q=80", category: "Markers" },
    { id: "bk11", name_en: "Sketch Book (A4)", name_bn: "স্কেচ বুক (এ৪)", price: 160, original_price: 200, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80", category: "Art" },
    { id: "bk12", name_en: "Folder Set (10 pcs)", name_bn: "ফোল্ডার সেট (১০টি)", price: 180, original_price: 225, image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&q=80", category: "Filing" },
  ],
  "Sports & Fashion": [
    { id: "sp1", name_en: "Yoga Mat (6mm)", name_bn: "যোগব্যায়াম ম্যাট (৬মিমি)", price: 650, original_price: 800, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&q=80", category: "Yoga" },
    { id: "sp2", name_en: "Resistance Bands Set (5 pcs)", name_bn: "রেজিস্ট্যান্স ব্যান্ড সেট (৫টি)", price: 480, original_price: 600, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80", category: "Strength" },
    { id: "sp3", name_en: "Jump Rope (Speed)", name_bn: "জাম্প রোপ (স্পিড)", price: 280, original_price: 350, image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=300&q=80", category: "Cardio" },
    { id: "sp4", name_en: "Whey Protein (1kg)", name_bn: "হোয়ে প্রোটিন (১কেজি)", price: 2800, original_price: 3500, image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=300&q=80", category: "Supplements" },
    { id: "sp5", name_en: "Sports Water Bottle (750ml)", name_bn: "স্পোর্টস ওয়াটার বোতল (৭৫০মিলি)", price: 380, original_price: 475, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80", category: "Accessories" },
    { id: "sp6", name_en: "Gym Gloves (Anti-slip)", name_bn: "জিম গ্লাভস (অ্যান্টি-স্লিপ)", price: 350, original_price: 440, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80", category: "Gloves" },
    { id: "sp7", name_en: "Fitness Tracker Band", name_bn: "ফিটনেস ট্র্যাকার ব্যান্ড", price: 1800, original_price: 2250, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&q=80", category: "Wearables" },
    { id: "sp8", name_en: "Dumbbells 5kg (pair)", name_bn: "ডাম্বেল ৫কেজি (জোড়া)", price: 950, original_price: 1200, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80", category: "Weights" },
    { id: "sp9", name_en: "Running Shoes (unisex)", name_bn: "রানিং শু (ইউনিসেক্স)", price: 2200, original_price: 2750, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", category: "Footwear" },
    { id: "sp10", name_en: "Gym Bag (30L)", name_bn: "জিম ব্যাগ (৩০ লিটার)", price: 850, original_price: 1060, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", category: "Bags" },
    { id: "sp11", name_en: "Push-up Bars (pair)", name_bn: "পুশ-আপ বার (জোড়া)", price: 320, original_price: 400, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80", category: "Strength" },
    { id: "sp12", name_en: "Foam Roller (60cm)", name_bn: "ফোম রোলার (৬০সেমি)", price: 580, original_price: 720, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&q=80", category: "Recovery" },
  ],
};

export function getShopProducts(shop: Shop): ShopProduct[] {
  const templates = PRODUCT_TEMPLATES[shop.type] || PRODUCT_TEMPLATES["Convenience"];
  const seed = parseInt(shop.id.replace(/\D/g, ""), 10) || 1;
  return templates.map((p, i) => ({
    ...p,
    id: `${shop.id}-${p.id}`,
    price: Math.round(p.price * (0.9 + ((seed + i) % 4) * 0.08)),
    original_price: Math.round(p.original_price * (0.9 + ((seed + i) % 4) * 0.08)),
  }));
}

const SHOPS_BASE: Shop[] = [
  // All In One — 10 total
  { id: "s01", name_en: "Shwapno Gulshan", name_bn: "স্বপ্ন গুলশান", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "30-45", rating: 4.6, is_open: true, area: "Gulshan" },
  { id: "s02", name_en: "Meena Bazar Banani", name_bn: "মীনা বাজার বনানী", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "25-40", rating: 4.4, is_open: true, area: "Banani" },
  { id: "s03", name_en: "Agora Dhanmondi", name_bn: "আগোরা ধানমন্ডি", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "35-50", rating: 4.3, is_open: false, area: "Dhanmondi" },
  { id: "s04", name_en: "Prince Bazar Mirpur", name_bn: "প্রিন্স বাজার মিরপুর", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "40-55", rating: 4.1, is_open: true, area: "Mirpur" },
  { id: "s05", name_en: "Star Mart Uttara", name_bn: "স্টার মার্ট উত্তরা", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Uttara" },
  { id: "s06", name_en: "Fresh Corner Mohammadpur", name_bn: "ফ্রেশ কর্নার মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "25-40", rating: 4.2, is_open: true, area: "Mohammadpur" },
  { id: "s07", name_en: "Daily Needs Badda", name_bn: "ডেইলি নিডস বাড্ডা", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "30-45", rating: 4.0, is_open: true, area: "Badda" },
  { id: "s08", name_en: "Nandan Grocery Khilgaon", name_bn: "নন্দন গ্রোসারি খিলগাঁও", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "35-50", rating: 4.1, is_open: false, area: "Khilgaon" },
  { id: "s09", name_en: "Regal Supermarket Panthapath", name_bn: "রিগ্যাল সুপারমার্কেট পান্থপথ", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "25-40", rating: 4.4, is_open: true, area: "Panthapath" },
  { id: "s10", name_en: "City Mart Bashundhara", name_bn: "সিটি মার্ট বসুন্ধরা", logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80", type: "Supermarket", delivery_time: "40-55", rating: 4.3, is_open: true, area: "Bashundhara" },

  // Pharmacy — 10 total
  { id: "s11", name_en: "ACI Pharmacy Gulshan", name_bn: "এসিআই ফার্মেসি গুলশান", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "20-30", rating: 4.7, is_open: true, area: "Gulshan" },
  { id: "s12", name_en: "Square Pharma Banani", name_bn: "স্কয়ার ফার্মা বনানী", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "25-35", rating: 4.8, is_open: true, area: "Banani" },
  { id: "s13", name_en: "Neon Pharmacy Dhanmondi", name_bn: "নিওন ফার্মেসি ধানমন্ডি", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "15-25", rating: 4.5, is_open: true, area: "Dhanmondi" },
  { id: "s14", name_en: "Beacon Pharmacy Uttara", name_bn: "বিকন ফার্মেসি উত্তরা", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "20-30", rating: 4.6, is_open: true, area: "Uttara" },
  { id: "s15", name_en: "Popular Pharmacy Mirpur", name_bn: "পপুলার ফার্মেসি মিরপুর", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "25-40", rating: 4.3, is_open: false, area: "Mirpur" },
  { id: "s16", name_en: "Medinova Pharmacy Tejgaon", name_bn: "মেডিনোভা ফার্মেসি তেজগাঁও", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "20-30", rating: 4.4, is_open: true, area: "Tejgaon" },
  { id: "s17", name_en: "Healthcare Pharmacy Motijheel", name_bn: "হেলথকেয়ার ফার্মেসি মতিঝিল", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "25-35", rating: 4.2, is_open: true, area: "Motijheel" },
  { id: "s18", name_en: "Greenlife Pharmacy Shyamoli", name_bn: "গ্রিনলাইফ ফার্মেসি শ্যামলী", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "20-30", rating: 4.5, is_open: true, area: "Shyamoli" },
  { id: "s19", name_en: "Life Pharmacy Cantonment", name_bn: "লাইফ ফার্মেসি ক্যান্টনমেন্ট", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "30-45", rating: 4.1, is_open: true, area: "Cantonment" },
  { id: "s20", name_en: "Cure Pharmacy Wari", name_bn: "কিউর ফার্মেসি ওয়ারী", logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&q=80", type: "All In One Pharmacy", delivery_time: "25-35", rating: 4.0, is_open: false, area: "Wari" },

  // Bakery & Desserts — 10 total
  { id: "s21", name_en: "Bakehouse Gulshan", name_bn: "বেকহাউজ গুলশান", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "20-35", rating: 4.7, is_open: true, area: "Gulshan" },
  { id: "s22", name_en: "Baked by Mahin", name_bn: "বেকড বাই মাহিন", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "25-40", rating: 4.9, is_open: true, area: "Banani" },
  { id: "s23", name_en: "Sweet Dreams Bakery", name_bn: "সুইট ড্রিমস বেকারি", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Dhanmondi" },
  { id: "s24", name_en: "Golden Crust Bakery", name_bn: "গোল্ডেন ক্রাস্ট বেকারি", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "20-30", rating: 4.4, is_open: false, area: "Uttara" },
  { id: "s25", name_en: "Flour & Sugar", name_bn: "ফ্লাওয়ার ও সুগার", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "25-40", rating: 4.6, is_open: true, area: "Mirpur" },
  { id: "s26", name_en: "The Pastry Lab", name_bn: "দ্য পেস্ট্রি ল্যাব", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "30-45", rating: 4.8, is_open: true, area: "Mohammadpur" },
  { id: "s27", name_en: "Frosting Factory", name_bn: "ফ্রস্টিং ফ্যাক্টরি", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "20-35", rating: 4.5, is_open: true, area: "Bashundhara" },
  { id: "s28", name_en: "Crumbs & Co.", name_bn: "ক্রামস এবং কো", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "25-40", rating: 4.3, is_open: true, area: "Shyamoli" },
  { id: "s29", name_en: "Artisan Bake Shop", name_bn: "আর্টিসান বেক শপ", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "30-45", rating: 4.6, is_open: false, area: "Tejgaon" },
  { id: "s30", name_en: "Muffin & More", name_bn: "মাফিন ও আরও", logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=80", type: "Bakery & Desserts", delivery_time: "20-30", rating: 4.4, is_open: true, area: "Kalabagan" },

  // Beauty — 10 total
  { id: "s31", name_en: "Glamour Beauty Gulshan", name_bn: "গ্ল্যামার বিউটি গুলশান", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Gulshan" },
  { id: "s32", name_en: "Glow Studio Banani", name_bn: "গ্লো স্টুডিও বনানী", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "25-40", rating: 4.7, is_open: true, area: "Banani" },
  { id: "s33", name_en: "SkinGlow Dhanmondi", name_bn: "স্কিনগ্লো ধানমন্ডি", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "30-45", rating: 4.6, is_open: true, area: "Dhanmondi" },
  { id: "s34", name_en: "The Beauty Box Uttara", name_bn: "দ্য বিউটি বক্স উত্তরা", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "35-50", rating: 4.3, is_open: false, area: "Uttara" },
  { id: "s35", name_en: "Luxe Beauty Mirpur", name_bn: "লাক্স বিউটি মিরপুর", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "30-45", rating: 4.2, is_open: true, area: "Mirpur" },
  { id: "s36", name_en: "Pure Glow Mohammadpur", name_bn: "পিউর গ্লো মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "25-40", rating: 4.4, is_open: true, area: "Mohammadpur" },
  { id: "s37", name_en: "Radiance Beauty Bashundhara", name_bn: "র‍্যাডিয়েন্স বিউটি বসুন্ধরা", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "35-50", rating: 4.5, is_open: true, area: "Bashundhara" },
  { id: "s38", name_en: "Pretty Things Panthapath", name_bn: "প্রিটি থিংস পান্থপথ", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "25-35", rating: 4.3, is_open: true, area: "Panthapath" },
  { id: "s39", name_en: "Belle Beauty Khilgaon", name_bn: "বেল বিউটি খিলগাঁও", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "30-45", rating: 4.1, is_open: false, area: "Khilgaon" },
  { id: "s40", name_en: "Aura Beauty Shyamoli", name_bn: "অরা বিউটি শ্যামলী", logo: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&q=80", type: "Beauty", delivery_time: "20-35", rating: 4.4, is_open: true, area: "Shyamoli" },

  // Beverages — 10 total
  { id: "s41", name_en: "Juice World Gulshan", name_bn: "জুস ওয়ার্ল্ড গুলশান", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "15-25", rating: 4.5, is_open: true, area: "Gulshan" },
  { id: "s42", name_en: "The Drink Bar Banani", name_bn: "দ্য ড্রিংক বার বনানী", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "15-25", rating: 4.6, is_open: true, area: "Banani" },
  { id: "s43", name_en: "Fresh Sip Dhanmondi", name_bn: "ফ্রেশ সিপ ধানমন্ডি", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "20-30", rating: 4.4, is_open: true, area: "Dhanmondi" },
  { id: "s44", name_en: "Cool Drinks Uttara", name_bn: "কুল ড্রিংকস উত্তরা", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "20-30", rating: 4.3, is_open: false, area: "Uttara" },
  { id: "s45", name_en: "Thirst Quench Mirpur", name_bn: "থার্স্ট কোয়েঞ্চ মিরপুর", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "25-35", rating: 4.2, is_open: true, area: "Mirpur" },
  { id: "s46", name_en: "Liquid Lounge Bashundhara", name_bn: "লিকুইড লাউঞ্জ বসুন্ধরা", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "30-45", rating: 4.4, is_open: true, area: "Bashundhara" },
  { id: "s47", name_en: "Natural Sips Shyamoli", name_bn: "ন্যাচারাল সিপস শ্যামলী", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "20-30", rating: 4.3, is_open: true, area: "Shyamoli" },
  { id: "s48", name_en: "Brew & Sip Tejgaon", name_bn: "ব্রু ও সিপ তেজগাঁও", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "20-30", rating: 4.1, is_open: true, area: "Tejgaon" },
  { id: "s49", name_en: "Hydrate Co. Badda", name_bn: "হাইড্রেট কো. বাড্ডা", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "25-40", rating: 4.0, is_open: false, area: "Badda" },
  { id: "s50", name_en: "Sipper's Hub Wari", name_bn: "সিপারস হাব ওয়ারী", logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=80&q=80", type: "Beverages", delivery_time: "20-30", rating: 4.2, is_open: true, area: "Wari" },

  // Electronics — 10 total
  { id: "s51", name_en: "TechZone Gulshan", name_bn: "টেকজোন গুলশান", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "25-40", rating: 4.4, is_open: true, area: "Gulshan" },
  { id: "s52", name_en: "Gadget World Banani", name_bn: "গ্যাজেট ওয়ার্ল্ড বনানী", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "20-35", rating: 4.6, is_open: true, area: "Banani" },
  { id: "s53", name_en: "Digital Hub Dhanmondi", name_bn: "ডিজিটাল হাব ধানমন্ডি", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "30-45", rating: 4.3, is_open: true, area: "Dhanmondi" },
  { id: "s54", name_en: "Tech Corner Uttara", name_bn: "টেক কর্নার উত্তরা", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "35-50", rating: 4.2, is_open: false, area: "Uttara" },
  { id: "s55", name_en: "Smart Buy Mirpur", name_bn: "স্মার্ট বাই মিরপুর", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "30-45", rating: 4.1, is_open: true, area: "Mirpur" },
  { id: "s56", name_en: "iShop Bashundhara", name_bn: "আইশপ বসুন্ধরা", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "40-55", rating: 4.5, is_open: true, area: "Bashundhara" },
  { id: "s57", name_en: "Circuit City Panthapath", name_bn: "সার্কিট সিটি পান্থপথ", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "25-40", rating: 4.4, is_open: true, area: "Panthapath" },
  { id: "s58", name_en: "Plug & Play Mohammadpur", name_bn: "প্লাগ অ্যান্ড প্লে মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "30-45", rating: 4.2, is_open: true, area: "Mohammadpur" },
  { id: "s59", name_en: "Volt Electronics Shyamoli", name_bn: "ভোল্ট ইলেকট্রনিক্স শ্যামলী", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "25-40", rating: 4.0, is_open: false, area: "Shyamoli" },
  { id: "s60", name_en: "Byte Shop Tejgaon", name_bn: "বাইট শপ তেজগাঁও", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&q=80", type: "Electronics", delivery_time: "20-30", rating: 4.3, is_open: true, area: "Tejgaon" },

  // Fashion — 10 total
  { id: "s61", name_en: "Style Hub Gulshan", name_bn: "স্টাইল হাব গুলশান", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "30-50", rating: 4.5, is_open: true, area: "Gulshan" },
  { id: "s62", name_en: "Trendy Threads Banani", name_bn: "ট্রেন্ডি থ্রেডস বনানী", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "35-50", rating: 4.7, is_open: true, area: "Banani" },
  { id: "s63", name_en: "Closet Goals Dhanmondi", name_bn: "ক্লোজেট গোলস ধানমন্ডি", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "30-45", rating: 4.4, is_open: true, area: "Dhanmondi" },
  { id: "s64", name_en: "Urban Chic Uttara", name_bn: "আর্বান চিক উত্তরা", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "35-55", rating: 4.3, is_open: false, area: "Uttara" },
  { id: "s65", name_en: "Drip Fashion Mirpur", name_bn: "ড্রিপ ফ্যাশন মিরপুর", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "30-50", rating: 4.2, is_open: true, area: "Mirpur" },
  { id: "s66", name_en: "Glam Wardrobe Bashundhara", name_bn: "গ্ল্যাম ওয়ার্ডরোব বসুন্ধরা", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "40-55", rating: 4.4, is_open: true, area: "Bashundhara" },
  { id: "s67", name_en: "Thread & Needle Mohammadpur", name_bn: "থ্রেড অ্যান্ড নিডেল মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "25-40", rating: 4.3, is_open: true, area: "Mohammadpur" },
  { id: "s68", name_en: "The Outfit Shop Badda", name_bn: "দ্য আউটফিট শপ বাড্ডা", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "30-45", rating: 4.1, is_open: true, area: "Badda" },
  { id: "s69", name_en: "Runway Fashion Shyamoli", name_bn: "রানওয়ে ফ্যাশন শ্যামলী", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "25-40", rating: 4.2, is_open: false, area: "Shyamoli" },
  { id: "s70", name_en: "Fashionista Kalabagan", name_bn: "ফ্যাশনিস্তা কলাবাগান", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&q=80", type: "Fashion", delivery_time: "20-35", rating: 4.5, is_open: true, area: "Kalabagan" },

  // Convenience — 10 total
  { id: "s71", name_en: "Quick Mart Gulshan", name_bn: "কুইক মার্ট গুলশান", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "15-25", rating: 4.3, is_open: true, area: "Gulshan" },
  { id: "s72", name_en: "Corner Store Banani", name_bn: "কর্নার স্টোর বনানী", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "15-25", rating: 4.4, is_open: true, area: "Banani" },
  { id: "s73", name_en: "Speedy Mart Dhanmondi", name_bn: "স্পিডি মার্ট ধানমন্ডি", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "20-30", rating: 4.2, is_open: true, area: "Dhanmondi" },
  { id: "s74", name_en: "Handy Shop Uttara", name_bn: "হ্যান্ডি শপ উত্তরা", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "20-30", rating: 4.1, is_open: false, area: "Uttara" },
  { id: "s75", name_en: "Daily Stop Mirpur", name_bn: "ডেইলি স্টপ মিরপুর", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "25-35", rating: 4.0, is_open: true, area: "Mirpur" },
  { id: "s76", name_en: "Easy Pick Mohammadpur", name_bn: "ইজি পিক মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "20-30", rating: 4.2, is_open: true, area: "Mohammadpur" },
  { id: "s77", name_en: "Nearby Mart Tejgaon", name_bn: "নিয়ারবাই মার্ট তেজগাঁও", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "15-25", rating: 4.1, is_open: true, area: "Tejgaon" },
  { id: "s78", name_en: "Pronto Store Motijheel", name_bn: "প্রন্টো স্টোর মতিঝিল", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "20-30", rating: 4.0, is_open: true, area: "Motijheel" },
  { id: "s79", name_en: "Grab & Go Badda", name_bn: "গ্র্যাব অ্যান্ড গো বাড্ডা", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "25-40", rating: 3.9, is_open: false, area: "Badda" },
  { id: "s80", name_en: "Swift Shop Khilgaon", name_bn: "সুইফট শপ খিলগাঁও", logo: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=80&q=80", type: "Convenience", delivery_time: "20-30", rating: 4.1, is_open: true, area: "Khilgaon" },

  // Florist — 10 total
  { id: "s81", name_en: "Bloom Studio Gulshan", name_bn: "ব্লুম স্টুডিও গুলশান", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "25-40", rating: 4.7, is_open: true, area: "Gulshan" },
  { id: "s82", name_en: "Petal & Co Banani", name_bn: "পেটাল অ্যান্ড কো বনানী", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "20-35", rating: 4.8, is_open: true, area: "Banani" },
  { id: "s83", name_en: "The Flower House Dhanmondi", name_bn: "দ্য ফ্লাওয়ার হাউজ ধানমন্ডি", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Dhanmondi" },
  { id: "s84", name_en: "Blossom Floral Uttara", name_bn: "ব্লোসম ফ্লোরাল উত্তরা", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "30-45", rating: 4.4, is_open: false, area: "Uttara" },
  { id: "s85", name_en: "Garden Fresh Mirpur", name_bn: "গার্ডেন ফ্রেশ মিরপুর", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "35-50", rating: 4.3, is_open: true, area: "Mirpur" },
  { id: "s86", name_en: "Rose Garden Mohammadpur", name_bn: "রোজ গার্ডেন মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "25-40", rating: 4.5, is_open: true, area: "Mohammadpur" },
  { id: "s87", name_en: "Floral Art Bashundhara", name_bn: "ফ্লোরাল আর্ট বসুন্ধরা", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "40-55", rating: 4.6, is_open: true, area: "Bashundhara" },
  { id: "s88", name_en: "Tulip Flowers Khilgaon", name_bn: "টিউলিপ ফ্লাওয়ার্স খিলগাঁও", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "30-45", rating: 4.2, is_open: true, area: "Khilgaon" },
  { id: "s89", name_en: "Lily & Lotus Shyamoli", name_bn: "লিলি অ্যান্ড লোটাস শ্যামলী", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "25-40", rating: 4.4, is_open: false, area: "Shyamoli" },
  { id: "s90", name_en: "Wild Blooms Kalabagan", name_bn: "ওয়াইল্ড ব্লুমস কলাবাগান", logo: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=80&q=80", type: "Flowers & Plants", delivery_time: "20-35", rating: 4.5, is_open: true, area: "Kalabagan" },

  // Pet Care — 10 total
  { id: "s91", name_en: "Pawsome Gulshan", name_bn: "পসাম গুলশান", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "25-40", rating: 4.7, is_open: true, area: "Gulshan" },
  { id: "s92", name_en: "Pet Paradise Banani", name_bn: "পেট প্যারাডাইস বনানী", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "20-35", rating: 4.6, is_open: true, area: "Banani" },
  { id: "s93", name_en: "Happy Pets Dhanmondi", name_bn: "হ্যাপি পেটস ধানমন্ডি", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Dhanmondi" },
  { id: "s94", name_en: "Furry Friends Uttara", name_bn: "ফারি ফ্রেন্ডস উত্তরা", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "30-45", rating: 4.4, is_open: false, area: "Uttara" },
  { id: "s95", name_en: "Animal Kingdom Mirpur", name_bn: "অ্যানিমাল কিংডম মিরপুর", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "35-50", rating: 4.3, is_open: true, area: "Mirpur" },
  { id: "s96", name_en: "Pet Shop Mohammadpur", name_bn: "পেট শপ মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "25-40", rating: 4.2, is_open: true, area: "Mohammadpur" },
  { id: "s97", name_en: "Paws & Claws Bashundhara", name_bn: "পস অ্যান্ড ক্লস বসুন্ধরা", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "40-55", rating: 4.5, is_open: true, area: "Bashundhara" },
  { id: "s98", name_en: "PetZone Tejgaon", name_bn: "পেটজোন তেজগাঁও", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "20-30", rating: 4.1, is_open: true, area: "Tejgaon" },
  { id: "s99", name_en: "Wagging Tails Shyamoli", name_bn: "ওয়্যাগিং টেলস শ্যামলী", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "25-40", rating: 4.0, is_open: false, area: "Shyamoli" },
  { id: "s100", name_en: "Critter Care Wari", name_bn: "ক্রিটার কেয়ার ওয়ারী", logo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80", type: "Pets", delivery_time: "25-35", rating: 4.2, is_open: true, area: "Wari" },

  // Books & Stationery — 10 total
  { id: "s101", name_en: "Bookworm Gulshan", name_bn: "বুকওয়ার্ম গুলশান", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "25-40", rating: 4.6, is_open: true, area: "Gulshan" },
  { id: "s102", name_en: "The Reading Room Banani", name_bn: "দ্য রিডিং রুম বনানী", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "20-35", rating: 4.7, is_open: true, area: "Banani" },
  { id: "s103", name_en: "Scholars Den Dhanmondi", name_bn: "স্কলার্স ডেন ধানমন্ডি", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "30-45", rating: 4.5, is_open: true, area: "Dhanmondi" },
  { id: "s104", name_en: "Page Turner Uttara", name_bn: "পেজ টার্নার উত্তরা", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "25-40", rating: 4.4, is_open: false, area: "Uttara" },
  { id: "s105", name_en: "Ink & Paper Mirpur", name_bn: "ইংক অ্যান্ড পেপার মিরপুর", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "30-45", rating: 4.3, is_open: true, area: "Mirpur" },
  { id: "s106", name_en: "Write On Mohammadpur", name_bn: "রাইট অন মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "20-35", rating: 4.4, is_open: true, area: "Mohammadpur" },
  { id: "s107", name_en: "Pen & Pencil Bashundhara", name_bn: "পেন অ্যান্ড পেন্সিল বসুন্ধরা", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "40-55", rating: 4.5, is_open: true, area: "Bashundhara" },
  { id: "s108", name_en: "Campus Stationery Tejgaon", name_bn: "ক্যাম্পাস স্টেশনারি তেজগাঁও", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "20-30", rating: 4.2, is_open: true, area: "Tejgaon" },
  { id: "s109", name_en: "Student Hub Khilgaon", name_bn: "স্টুডেন্ট হাব খিলগাঁও", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "25-40", rating: 4.1, is_open: false, area: "Khilgaon" },
  { id: "s110", name_en: "Novel Ideas Shyamoli", name_bn: "নোভেল আইডিয়াস শ্যামলী", logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&q=80", type: "Stationery And Books", delivery_time: "20-35", rating: 4.3, is_open: true, area: "Shyamoli" },

  // Sports & Fitness — 10 total
  { id: "s111", name_en: "FitStore Gulshan", name_bn: "ফিটস্টোর গুলশান", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "25-40", rating: 4.5, is_open: true, area: "Gulshan" },
  { id: "s112", name_en: "Muscle Hub Banani", name_bn: "মাসেল হাব বনানী", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "20-35", rating: 4.6, is_open: true, area: "Banani" },
  { id: "s113", name_en: "Active Zone Dhanmondi", name_bn: "অ্যাক্টিভ জোন ধানমন্ডি", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "30-45", rating: 4.4, is_open: true, area: "Dhanmondi" },
  { id: "s114", name_en: "Sports Locker Uttara", name_bn: "স্পোর্টস লকার উত্তরা", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "30-45", rating: 4.3, is_open: false, area: "Uttara" },
  { id: "s115", name_en: "PowerPlay Mirpur", name_bn: "পাওয়ারপ্লে মিরপুর", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "35-50", rating: 4.2, is_open: true, area: "Mirpur" },
  { id: "s116", name_en: "Gain Zone Mohammadpur", name_bn: "গেইন জোন মোহাম্মদপুর", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "25-40", rating: 4.3, is_open: true, area: "Mohammadpur" },
  { id: "s117", name_en: "Sprint Sports Bashundhara", name_bn: "স্প্রিন্ট স্পোর্টস বসুন্ধরা", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "40-55", rating: 4.4, is_open: true, area: "Bashundhara" },
  { id: "s118", name_en: "Iron Will Tejgaon", name_bn: "আয়রন উইল তেজগাঁও", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "20-30", rating: 4.1, is_open: true, area: "Tejgaon" },
  { id: "s119", name_en: "Flex Zone Shyamoli", name_bn: "ফ্লেক্স জোন শ্যামলী", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "25-40", rating: 4.0, is_open: false, area: "Shyamoli" },
  { id: "s120", name_en: "Champion Sports Wari", name_bn: "চ্যাম্পিয়ন স্পোর্টস ওয়ারী", logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80", type: "Sports & Fashion", delivery_time: "25-35", rating: 4.2, is_open: true, area: "Wari" },
  ...GENERATED_SHOPS,
];

// Every shop gets a distinct photo from its type's pool (deterministic by id) instead
// of all shops of a type sharing one repeated stock photo.
export const SHOPS: Shop[] = SHOPS_BASE.map((s) => ({ ...s, logo: imageForShop(s.type, s.id) }));
