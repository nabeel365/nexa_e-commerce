'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Grid, 
  List, 
  Filter, 
  SlidersHorizontal,
  X,
  ChevronDown
} from 'lucide-react';
import { products, getProductsByCategory } from '@/data/products';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.category as string;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const categoryProducts = getProductsByCategory(categoryId);
  
  // Get unique tags from products
  const allTags = [...new Set(categoryProducts.flatMap(p => p.tags))];
  
  // Filter and sort products
  let filteredProducts = categoryProducts.filter(p => {
    if (priceRange[0] > 0 && p.price < priceRange[0]) return false;
    if (priceRange[1] < 50000 && p.price > priceRange[1]) return false;
    if (selectedTags.length > 0 && !selectedTags.some(t => p.tags.includes(t))) return false;
    return true;
  });

  // Sort
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

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
          <h1 className="font-display text-3xl md:text-4xl font-bold">{categoryName}</h1>
          <p className="text-gray-400 mt-2">{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full hover:bg-surface-light transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
              <span className="w-5 h-5 bg-accent-cyan rounded-full text-xs flex items-center justify-center text-black">
                {selectedTags.length + (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 bg-surface rounded-full text-sm focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'} transition-colors`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'} transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: showFilters ? 280 : 0, opacity: showFilters ? 1 : 0 }}
            className="flex-shrink-0 overflow-hidden"
          >
            <div className="w-72 pr-8 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent-cyan"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-medium mb-4">Style</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTags(prev => 
                          prev.includes(tag) 
                            ? prev.filter(t => t !== tag)
                            : [...prev, tag]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-accent-cyan text-black'
                          : 'bg-surface hover:bg-surface-light'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setPriceRange([0, 50000]);
                  }}
                  className="text-sm text-accent-pink hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setPriceRange([0, 50000]);
                  }}
                  className="text-accent-cyan hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}