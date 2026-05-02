'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Flame, Star, Zap } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addNotification } = useStore();
  
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0], product.sizes?.[0]);
    addNotification(`${product.name} added to cart!`, 'success');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      addNotification('Removed from wishlist', 'info');
    } else {
      addToWishlist(product.id);
      addNotification('Added to wishlist!', 'success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface">
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.limitedDrop && (
              <span className="px-2 py-1 bg-accent-pink rounded-full text-xs font-medium text-black flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Drop
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 bg-accent-cyan rounded-full text-xs font-medium text-black">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="px-2 py-1 bg-accent-purple rounded-full text-xs font-medium text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              inWishlist 
                ? 'bg-accent-pink text-black' 
                : 'bg-black/40 backdrop-blur-sm text-white hover:bg-accent-pink hover:text-black'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isAdded 
                  ? 'bg-accent-cyan text-black scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {isAdded ? (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
            <Link
              href={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stock Warning */}
          {product.stockCount && product.stockCount < 20 && (
            <div className="absolute bottom-20 left-3 right-3">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-pink rounded-full" 
                  style={{ width: `${(product.stockCount / 50) * 100}%` }}
                />
              </div>
              <p className="text-xs text-center text-gray-400 mt-1">
                Only {product.stockCount} left
              </p>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium group-hover:text-accent-cyan transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((color, i) => (
                <span
                  key={color}
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                    color.toLowerCase() === 'white' ? '#fff' :
                    color.toLowerCase() === 'navy' ? '#1a1a4e' :
                    color.toLowerCase() === 'silver' ? '#c0c0c0' :
                    color.toLowerCase() === 'midnight blue' ? '#191970' :
                    color.toLowerCase() === 'gray' ? '#808080' :
                    color.toLowerCase() === 'blue' ? '#0000ff' :
                    color.toLowerCase() === 'red' ? '#ff0000' :
                    color.toLowerCase() === 'clear' ? 'transparent' : '#666'
                  }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}