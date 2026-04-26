'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export function CartSidebar() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setCartOpen]);

  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 99;
  const finalTotal = total + shipping;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-accent-cyan" />
                <h2 className="font-display text-xl font-bold">Your Cart</h2>
                <span className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan text-xs rounded-full">
                  {cart.length} items
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-4 p-4 bg-surface rounded-2xl"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-light">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-gray-400">
                        {item.selectedColor && `${item.selectedColor} · `}
                        {item.selectedSize && `${item.selectedSize}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-2 border-t border-white/5">
                    <span>Total</span>
                    <span className="gradient-text">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}