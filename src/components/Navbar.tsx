'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Menu, 
  X,
  Zap,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { categories } from '@/data/products';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, wishlist, setCartOpen, setSearchOpen, user } = useStore();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Zap className="w-8 h-8 text-accent-cyan" />
                <div className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-full group-hover:blur-2xl transition-all" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider">
                NEXA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-sm font-medium text-gray-300 hover:text-accent-cyan transition-colors relative group"
                >
                  {category.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/drops"
                className="text-sm font-medium text-accent-pink hover:text-accent-pink/80 transition-colors"
              >
                Limited Drops
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>

              <Link
                href="/wishlist"
                className="p-2 rounded-full hover:bg-white/5 transition-colors group relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-400 group-hover:text-accent-pink transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-pink rounded-full text-xs flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors group relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent-cyan rounded-full text-xs flex items-center justify-center text-black font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <Link
                href="/account"
                className="p-2 rounded-full hover:bg-white/5 transition-colors group hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors md:hidden"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* User Points Banner */}
        {user.points > 0 && (
          <div className="hidden sm:block border-t border-white/5 bg-accent-cyan/5">
            <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Welcome back, <span className="text-accent-cyan">{user.name}</span>
              </span>
              <span className="text-gray-400">
                <span className="text-accent-cyan">{user.points}</span> points · 
                Level <span className="text-accent-purple">{user.level}</span>
              </span>
            </div>
          </div>
        )}
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {category.name}
                  <span className="ml-2 text-sm text-gray-500">({category.count})</span>
                </Link>
              ))}
              <Link
                href="/drops"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-lg font-medium text-accent-pink"
              >
                Limited Drops 🔥
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-lg font-medium text-gray-300"
              >
                My Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}