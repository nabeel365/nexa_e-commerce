import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface UserState {
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
  badges: string[];
  preferences: string[];
  purchaseHistory: string[];
}

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User
  user: UserState;
  updateUser: (updates: Partial<UserState>) => void;
  addPoints: (points: number) => void;

  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;

  // Filters
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;

  // Notifications
  notifications: { id: string; message: string; type: 'success' | 'info' | 'error' }[];
  addNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;
}

const initialUser: UserState = {
  name: 'Guest User',
  email: '',
  avatar: '',
  points: 0,
  level: 1,
  badges: [],
  preferences: [],
  purchaseHistory: [],
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity = 1, color, size) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedColor === color && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity, selectedColor: color, selectedSize: size }],
          };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      updateCartQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId) ? state.wishlist : [...state.wishlist, productId],
        }));
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }));
      },
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },

      // User
      user: initialUser,
      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },
      addPoints: (points) => {
        set((state) => {
          const newPoints = state.user.points + points;
          const newLevel = Math.floor(newPoints / 1000) + 1;
          return {
            user: { ...state.user, points: newPoints, level: newLevel },
          };
        });
      },

      // UI State
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      isChatOpen: false,
      setChatOpen: (open) => set({ isChatOpen: open }),

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (productId) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== productId);
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 10),
          };
        });
      },

      // Filters
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 50000],
      setPriceRange: (range) => set({ priceRange: range }),
      sortBy: 'featured',
      setSortBy: (sort) => set({ sortBy: sort }),

      // Notifications
      notifications: [],
      addNotification: (message, type = 'success') => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeNotification(id);
        }, 3000);
      },
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
    }),
    {
      name: 'nexa-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);