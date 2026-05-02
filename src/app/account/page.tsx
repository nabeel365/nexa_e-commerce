'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Zap, 
  ChevronRight, 
  Star, 
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AccountPage() {
  const { user, wishlist, cart, updateUser, addNotification } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  const stats = [
    { label: 'Points', value: user.points, icon: Zap, color: 'text-accent-cyan' },
    { label: 'Level', value: user.level, icon: Star, color: 'text-yellow-500' },
    { label: 'Wishlist', value: wishlist.length, icon: Heart, color: 'text-accent-pink' },
    { label: 'Orders', value: 12, icon: Package, color: 'text-accent-purple' },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Profile */}
      <div className="relative h-64 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface border-4 border-background shadow-2xl">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-accent-cyan text-black rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-3xl font-bold font-display">{user.name}</h1>
                <span className="px-2 py-0.5 bg-accent-cyan/20 text-accent-cyan text-xs font-bold rounded-full border border-accent-cyan/30">
                  LEVEL {user.level}
                </span>
              </div>
              <p className="text-gray-400">{user.email || 'nexa.user@example.com'}</p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'profile', label: 'Profile Overview', icon: User },
              { id: 'orders', label: 'My Orders', icon: Package },
              { id: 'wishlist', label: 'Wishlist', icon: Heart },
              { id: 'payment', label: 'Payment Methods', icon: CreditCard },
              { id: 'address', label: 'Addresses', icon: MapPin },
              { id: 'security', label: 'Security', icon: ShieldCheck },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-accent-cyan text-black font-medium' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all mt-8">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="p-6 bg-surface rounded-2xl border border-white/5">
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 bg-surface rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:border-accent-cyan outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue={user.email || 'nexa.user@example.com'}
                          className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:border-accent-cyan outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-accent-cyan text-black rounded-full font-medium hover:opacity-90 transition-opacity">
                      Save Changes
                    </button>
                  </form>
                </div>

                <div className="p-6 bg-surface rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold mb-4">NEXA Rewards</h3>
                  <div className="relative h-4 bg-background rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(user.points % 1000) / 10}%` }}
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Next Level: {1000 - (user.points % 1000)} points needed</span>
                    <span className="text-accent-cyan font-medium">Level {user.level + 1}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3].map((order) => (
                  <div key={order} className="p-6 bg-surface rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-bold">Order #NX-8239{order}</p>
                        <p className="text-sm text-gray-500">Placed on April 12, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹4,999</p>
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">DELIVERED</span>
                    </div>
                    <button className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-colors">
                      Track Order
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-400 col-span-full">Your saved items will appear here. <Link href="/wishlist" className="text-accent-cyan hover:underline">View full wishlist</Link></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
