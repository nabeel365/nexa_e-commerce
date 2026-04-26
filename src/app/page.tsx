'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  TrendingUp, 
  Star, 
  Clock,
  Flame,
  Sparkles,
  ChevronRight,
  Package,
  Shield,
  Truck
} from 'lucide-react';
import { products, getFeaturedProducts, getTrendingProducts, getNewProducts, getLimitedDrops, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Product3DViewer } from '@/components/Product3DViewer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();
  const newArrivals = getNewProducts();
  const limitedDrops = getLimitedDrops();

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <ProductSection 
        title="Featured Collection" 
        subtitle="Handpicked premium products"
        products={featured}
        variant="featured"
      />

      {/* Limited Drops Banner */}
      <LimitedDropsBanner drops={limitedDrops} />

      {/* Trending Now */}
      <ProductSection 
        title="Trending Now" 
        subtitle="What everyone's buying"
        products={trending}
        variant="trending"
      />

      {/* 3D Product Showcase */}
      <ThreeDShowcase />

      {/* New Arrivals */}
      <ProductSection 
        title="Just Dropped" 
        subtitle="Fresh from the lab"
        products={newArrivals}
        variant="new"
      />

      {/* Gamification Section */}
      <GamificationSection />

      {/* Interactive Storytelling */}
      <StorytellingSection />

      {/* Live Activity */}
      <LiveActivitySection />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            Next-Gen Shopping Experience
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Shop the <br />
            <span className="gradient-text">Future</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Experience AI-powered shopping, immersive 3D product views, and exclusive drops. 
            Your next favorite product awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="group px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/drops"
              className="px-8 py-4 bg-white/5 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-accent-pink" />
              Explore Drops
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Trust Badges
function TrustBadges() {
  const badges = [
    { icon: Truck, label: 'Free Shipping', sublabel: 'On orders above ₹999' },
    { icon: Shield, label: 'Secure Payment', sublabel: '100% secure transactions' },
    { icon: Package, label: 'Easy Returns', sublabel: '30-day return policy' },
  ];

  return (
    <section className="py-8 border-y border-white/5 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent-cyan/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-accent-cyan" />
              </div>
              <div>
                <h4 className="font-medium">{badge.label}</h4>
                <p className="text-sm text-gray-400">{badge.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Section
function ProductSection({ 
  title, 
  subtitle, 
  products, 
  variant 
}: { 
  title: string; 
  subtitle: string; 
  products: Product[]; 
  variant: 'featured' | 'trending' | 'new';
}) {
  const colors = {
    featured: 'from-accent-cyan to-accent-purple',
    trending: 'from-accent-pink to-accent-purple',
    new: 'from-accent-green to-accent-cyan',
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colors[variant]} text-black mb-4`}>
              {variant === 'featured' && <Star className="w-3 h-3" />}
              {variant === 'trending' && <TrendingUp className="w-3 h-3" />}
              {variant === 'new' && <Sparkles className="w-3 h-3" />}
              {subtitle}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <Link
            href={`/${variant}`}
            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Limited Drops Banner
function LimitedDropsBanner({ drops }: { drops: typeof products }) {
  if (drops.length === 0) return null;

  const drop = drops[0];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-pink/20 via-accent-purple/20 to-accent-cyan/20 p-8 md:p-12"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink rounded-full text-xs font-medium text-black mb-4">
                <Flame className="w-3 h-3" />
                Limited Drop
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {drop.name}
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                {drop.description}
              </p>
              
              {/* Countdown */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center font-display text-2xl font-bold">
                    05
                  </div>
                  <span className="text-xs text-gray-400">Days</span>
                </div>
                <span className="text-2xl">:</span>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center font-display text-2xl font-bold">
                    12
                  </div>
                  <span className="text-xs text-gray-400">Hours</span>
                </div>
                <span className="text-2xl">:</span>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center font-display text-2xl font-bold">
                    45
                  </div>
                  <span className="text-xs text-gray-400">Mins</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/product/${drop.id}`}
                  className="px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Get It Now
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Only {drop.stockCount} left
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={drop.images[0]}
                  alt={drop.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-accent-pink rounded-full text-black font-medium"
              >
                -40% OFF
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 3D Product Showcase
function ThreeDShowcase() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/20 text-accent-purple mb-4">
            <Sparkles className="w-3 h-3" />
            Interactive 3D
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Experience Products in 3D
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Rotate, zoom, and explore products from every angle. Our 3D viewer gives you an immersive shopping experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.slice(0, 2).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden bg-background border border-white/10"
            >
              <Product3DViewer product={product} />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gamification Section
function GamificationSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-green/20 text-accent-green mb-4">
            <Zap className="w-3 h-3" />
            Earn & Redeem
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Shop, Earn, Win
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our rewards program. Earn points on every purchase, unlock exclusive perks, and spin to win discounts!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-accent-cyan" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Earn Points</h3>
            <p className="text-gray-400 mb-4">
              Get 1 point for every ₹10 spent. Points never expire!
            </p>
            <div className="text-3xl font-display font-bold gradient-text">2,450</div>
            <p className="text-sm text-gray-500 mt-2">Total Points Earned</p>
          </motion.div>

          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-accent-purple" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">VIP Level</h3>
            <p className="text-gray-400 mb-4">
              Unlock exclusive benefits as you level up.
            </p>
            <div className="text-3xl font-display font-bold gradient-text">Level 5</div>
            <p className="text-sm text-gray-500 mt-2">550 points to next level</p>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-gradient-to-r from-accent-purple to-accent-pink rounded-full" />
            </div>
          </motion.div>

          {/* Spin Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-accent-pink/20 to-accent-cyan/20 border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Flame className="w-8 h-8 text-accent-pink" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Spin to Win</h3>
            <p className="text-gray-400 mb-4">
              Daily spin for a chance to win exclusive discounts!
            </p>
            <button className="w-full py-3 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full font-medium hover:opacity-90 transition-opacity">
              Spin Now
            </button>
            <p className="text-xs text-gray-500 mt-2">1 spin remaining today</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Storytelling Section
function StorytellingSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the story behind our premium products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Crafted with Precision', desc: 'Every detail meticulously designed' },
            { title: 'Sustainable Materials', desc: 'Eco-friendly production process' },
            { title: 'Tested for Excellence', desc: 'Rigorous quality assurance' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-background border border-white/10 hover:border-accent-cyan/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                <span className="font-display text-xl font-bold text-accent-cyan">0{index + 1}</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Live Activity Section
function LiveActivitySection() {
  const activities = [
    { user: 'Rahul S.', action: 'purchased', item: 'Sonic Pulse Pro', time: '2 min ago' },
    { user: 'Priya M.', action: 'is viewing', item: 'Titan Watch Pro', time: '5 min ago' },
    { user: 'Alex K.', action: 'added to cart', item: 'BoomX Speaker', time: '8 min ago' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-green/20 text-accent-green mb-4">
            <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            Live Activity
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What's Trending
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-sm font-medium">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-400">{activity.action}</span>{' '}
                  <span className="text-accent-cyan">{activity.item}</span>
                </p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Grid
function CategoryGrid() {
  const categories = [
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', count: 12 },
    { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', count: 8 },
    { name: 'Speakers', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', count: 6 },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', count: 15 },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                className="group block relative aspect-square rounded-3xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display text-xl font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count} Products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter CTA
function NewsletterCTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 via-accent-purple/10 to-accent-pink/10 p-12 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Join 50,000+ shoppers who get exclusive access to new drops, special offers, and member-only perks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-white rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/account"
              className="px-8 py-4 bg-white/10 rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}