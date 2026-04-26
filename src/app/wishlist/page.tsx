'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-accent-pink" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-gray-400 mt-2">{wishlistProducts.length} saved items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Save items you love by clicking the heart icon</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <ProductCard product={product} index={index} />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}