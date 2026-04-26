'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  Check,
  MessageCircle,
  Share2,
  Flame,
  Clock,
  Zap
} from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { Product3DViewer } from '@/components/Product3DViewer';

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params?.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed } = useStore();

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-accent-cyan hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-surface"
            >
              <Product3DViewer product={product} />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.limitedDrop && (
                  <span className="px-3 py-1.5 bg-accent-pink rounded-full text-sm font-medium text-black flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    Limited Drop
                  </span>
                )}
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-accent-cyan rounded-full text-sm font-medium text-black">
                    New Arrival
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-accent-cyan' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">{product.category} · {product.subcategory}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">{product.name}</h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">·</span>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                {product.reviewCount} Reviews
              </button>
              <span className="text-gray-500">·</span>
              <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Ask Question
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl font-bold gradient-text">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            {product.stockCount && product.stockCount < 30 && (
              <div className="flex items-center gap-2 text-accent-pink">
                <Flame className="w-5 h-5" />
                <span className="text-sm font-medium">Only {product.stockCount} items left!</span>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color: <span className="text-gray-400">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border transition-colors ${
                        selectedColor === color
                          ? 'border-accent-cyan bg-accent-cyan/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Size: <span className="text-gray-400">{selectedSize}</span></h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                        selectedSize === size
                          ? 'border-accent-cyan bg-accent-cyan/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-full">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:text-accent-cyan transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:text-accent-cyan transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stockCount && (
                  <span className="text-sm text-gray-400">
                    {product.stockCount} available
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                className={`p-4 rounded-full border transition-colors ${
                  inWishlist
                    ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
              <button className="p-4 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
              <div className="text-center">
                <Truck className="w-6 h-6 text-accent-cyan mx-auto mb-2" />
                <p className="text-xs text-gray-400">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-accent-cyan mx-auto mb-2" />
                <p className="text-xs text-gray-400">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-accent-cyan mx-auto mb-2" />
                <p className="text-xs text-gray-400">Easy Returns</p>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="space-y-4">
              <div className="flex gap-4 border-b border-white/10">
                {['description', 'features', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 capitalize transition-colors relative ${
                      activeTab === tab ? 'text-accent-cyan' : 'text-gray-400'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="py-4">
                {activeTab === 'description' && (
                  <p className="text-gray-400 leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'features' && (
                  <ul className="space-y-3">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-surface rounded-xl">
                        <span className="text-gray-400">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}