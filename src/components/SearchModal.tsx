'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { products, searchProducts } from '@/data/products';

export function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setSearchOpen]);

  useEffect(() => {
    if (query.length > 1) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const trendingSearches = ['Headphones', 'Smart Watch', 'T-Shirts', 'Portable Speaker'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 max-w-2xl mx-auto z-50"
          >
            <div className="bg-surface rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Results or Suggestions */}
              <div className="max-h-96 overflow-y-auto">
                {query.length > 1 && results.length > 0 ? (
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">
                      Results
                    </p>
                    {results.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-light">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate group-hover:text-accent-cyan transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <span className="font-medium">₹{product.price.toLocaleString()}</span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-accent-cyan transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : query.length > 1 && results.length === 0 ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No products found for "{query}"</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-6">
                    {/* Trending */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-accent-cyan" />
                        <span className="text-sm font-medium">Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">Recent</span>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => setQuery(term)}
                              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <span>Press ESC to close</span>
                <span>Search powered by NEXA</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}