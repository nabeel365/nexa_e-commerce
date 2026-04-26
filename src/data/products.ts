export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  limitedDrop?: boolean;
  dropEndTime?: string;
  tags: string[];
  features?: string[];
  specifications?: Record<string, string>;
}

export const products: Product[] = [
  // T-Shirts
  {
    id: 'tshirt-1',
    name: 'Nebula Core Tee',
    description: 'Premium cotton t-shirt with futuristic graphic print. Features moisture-wicking technology and ultra-soft feel.',
    price: 2499,
    originalPrice: 3999,
    category: 'T-Shirts',
    subcategory: 'Graphic Tees',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stockCount: 45,
    featured: true,
    trending: true,
    tags: ['premium', 'cotton', 'graphic'],
    features: ['Moisture-wicking', 'Anti-odor', 'Sustainable'],
  },
  {
    id: 'tshirt-2',
    name: 'Quantum Pulse T-Shirt',
    description: 'Bold geometric design meets comfort. Made from organic cotton with a relaxed fit.',
    price: 1899,
    category: 'T-Shirts',
    subcategory: 'Graphic Tees',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    colors: ['Black', 'White', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockCount: 78,
    trending: true,
    tags: ['geometric', 'organic', 'relaxed'],
    features: ['Organic cotton', 'Relaxed fit', 'Eco-friendly'],
  },
  {
    id: 'tshirt-3',
    name: 'Cyber Drift Oversized',
    description: 'Oversized fit with abstract cyber design. Perfect for street style enthusiasts.',
    price: 2999,
    category: 'T-Shirts',
    subcategory: 'Oversized',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    colors: ['Black', 'White'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 23,
    featured: true,
    isNew: true,
    tags: ['oversized', 'streetwear', 'cyber'],
    features: ['Oversized fit', 'Heavy cotton', 'Drop shoulders'],
  },

  // Headphones
  {
    id: 'headphone-1',
    name: 'Sonic Pulse Pro',
    description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and studio-quality sound.',
    price: 8999,
    originalPrice: 12999,
    category: 'Headphones',
    subcategory: 'Wireless',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
    ],
    colors: ['Matte Black', 'Silver', 'Midnight Blue'],
    rating: 4.9,
    reviewCount: 567,
    inStock: true,
    stockCount: 34,
    featured: true,
    trending: true,
    limitedDrop: true,
    dropEndTime: '2026-04-30T23:59:59',
    tags: ['wireless', 'ANC', 'premium'],
    features: ['Active Noise Cancellation', '40hr battery', 'Hi-Res Audio', 'Touch controls'],
    specifications: {
      'Driver': '40mm Custom',
      'Frequency': '20Hz - 40kHz',
      'Battery': '40 hours',
      'Connectivity': 'Bluetooth 5.3',
    },
  },
  {
    id: 'headphone-2',
    name: 'Bass Xtreme 500',
    description: 'Immersive bass-heavy wireless headphones with RGB lighting and gaming mode.',
    price: 5999,
    category: 'Headphones',
    subcategory: 'Wireless',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
    ],
    colors: ['Black', 'White'],
    rating: 4.7,
    reviewCount: 312,
    inStock: true,
    stockCount: 56,
    trending: true,
    tags: ['gaming', 'RGB', 'bass'],
    features: ['RGB Lighting', 'Gaming Mode', 'Low latency', '30hr battery'],
  },
  {
    id: 'headphone-3',
    name: 'AirFlow True Wireless',
    description: 'True wireless earbuds with spatial audio and adaptive ANC.',
    price: 7499,
    category: 'Headphones',
    subcategory: 'Earbuds',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
    ],
    colors: ['Black', 'White'],
    rating: 4.8,
    reviewCount: 423,
    inStock: true,
    stockCount: 89,
    featured: true,
    tags: ['TWS', 'spatial audio', 'ANC'],
    features: ['Spatial Audio', 'Adaptive ANC', 'Wireless charging'],
  },

  // Speakers
  {
    id: 'speaker-1',
    name: 'BoomX Portable Speaker',
    description: 'Powerful portable speaker with 360° sound, IP67 waterproof rating, and 24-hour playtime.',
    price: 4999,
    originalPrice: 6999,
    category: 'Speakers',
    subcategory: 'Portable',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    ],
    colors: ['Black', 'Blue', 'Red'],
    rating: 4.8,
    reviewCount: 289,
    inStock: true,
    stockCount: 67,
    featured: true,
    trending: true,
    tags: ['portable', 'waterproof', '360 sound'],
    features: ['360° Sound', 'IP67 Waterproof', '24hr battery', 'PartyBoost'],
  },
  {
    id: 'speaker-2',
    name: 'HomePod Mini Elite',
    description: 'Smart home speaker with premium audio, voice assistant, and multi-room support.',
    price: 9999,
    category: 'Speakers',
    subcategory: 'Smart',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800',
    ],
    colors: ['White', 'Space Gray'],
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    stockCount: 23,
    tags: ['smart', 'multi-room', 'premium'],
    features: ['Multi-room audio', 'Voice assistant', 'AirPlay 2'],
  },
  {
    id: 'speaker-3',
    name: 'BassBunker Subwoofer',
    description: 'Premium home subwoofer with deep bass response and wireless connectivity.',
    price: 12999,
    category: 'Speakers',
    subcategory: 'Home',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    colors: ['Black'],
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    stockCount: 12,
    isNew: true,
    tags: ['home', 'subwoofer', 'wireless'],
    features: ['Deep bass', 'Wireless', 'App control'],
  },

  // Accessories
  {
    id: 'accessory-1',
    name: 'Titan Watch Pro',
    description: 'Smart watch with AMOLED display, 14-day battery, health monitoring, and premium build.',
    price: 15999,
    originalPrice: 19999,
    category: 'Accessories',
    subcategory: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    ],
    colors: ['Black', 'Silver', 'Gold'],
    rating: 4.9,
    reviewCount: 678,
    inStock: true,
    stockCount: 45,
    featured: true,
    trending: true,
    limitedDrop: true,
    dropEndTime: '2026-04-28T23:59:59',
    tags: ['smartwatch', 'health', 'premium'],
    features: ['AMOLED display', '14-day battery', 'SpO2', 'Heart rate'],
  },
  {
    id: 'accessory-2',
    name: 'GlassVision AR Glasses',
    description: 'Augmented reality glasses with heads-up display, wireless connectivity, and sleek design.',
    price: 24999,
    category: 'Accessories',
    subcategory: 'Glasses',
    images: [
      'https://images.unsplash.com/photo-1574256575493-e21a401fb241?w=800',
    ],
    colors: ['Black', 'Transparent'],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    isNew: true,
    tags: ['AR', 'smart glasses', 'futuristic'],
    features: ['Heads-up display', 'Wireless', 'Touch controls'],
  },
  {
    id: 'accessory-3',
    name: 'PowerBank Ultra 30000',
    description: 'High-capacity power bank with fast charging, multiple ports, and LED display.',
    price: 2999,
    category: 'Accessories',
    subcategory: 'Power Banks',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
    ],
    colors: ['Black', 'White'],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 123,
    trending: true,
    tags: ['power bank', 'fast charging', 'portable'],
    features: ['30000mAh', 'Fast charging', 'LED display', 'Multiple ports'],
  },
  {
    id: 'accessory-4',
    name: 'NeoCase Ultra',
    description: 'Premium phone case with military-grade protection and sleek transparent design.',
    price: 999,
    category: 'Accessories',
    subcategory: 'Cases',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800',
    ],
    colors: ['Clear', 'Black', 'Blue'],
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    stockCount: 234,
    tags: ['case', 'protection', 'slim'],
    features: ['Military grade', 'Wireless charging compatible', 'Slim fit'],
  },
];

export const categories = [
  { id: 'tshirts', name: 'T-Shirts', icon: 'Shirt', count: 12 },
  { id: 'headphones', name: 'Headphones', icon: 'Headphones', count: 8 },
  { id: 'speakers', name: 'Speakers', icon: 'Speaker', count: 6 },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', count: 15 },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(p => p.trending);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getLimitedDrops = (): Product[] => {
  return products.filter(p => p.limitedDrop);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
};

export const filterProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  inStock?: boolean,
  tags?: string[]
): Product[] => {
  return products.filter(p => {
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (inStock && !p.inStock) return false;
    if (tags && tags.length > 0 && !tags.some(t => p.tags.includes(t))) return false;
    return true;
  });
};