'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Clock, Zap, ArrowRight, ShoppingBag } from 'lucide-react';
import { getLimitedDrops } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function DropsPage() {
  const drops = getLimitedDrops();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,128,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 bg-accent-pink/20 text-accent-pink rounded-full text-sm font-bold border border-accent-pink/30 flex items-center gap-2">
              <Flame className="w-4 h-4 fill-current" />
              LIMITED DROPS
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display mb-8"
          >
            Cyber <span className="gradient-text">Nexus</span> Collection
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 md:gap-8"
          >
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface border border-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-2xl">
                  <span className="text-2xl md:text-3xl font-bold font-display">
                    {value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold font-display mb-4">Current Drops</h2>
            <p className="text-gray-400">
              Exclusive items available for a limited time only. Once they're gone, they're gone for good.
              Don't miss out on these unique pieces from the NEXA collection.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-accent-cyan font-medium">
            <Zap className="w-4 h-4" />
            Stock is extremely low
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {drops.map((product, index) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} index={index} />
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3" />
                  ENDS IN 2D : 14H
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Drop Teaser */}
        <div className="mt-32 p-12 bg-surface rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-accent-purple/20 text-accent-purple rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-4xl font-bold font-display mb-4">Phase II: Neon Horizon</h3>
              <p className="text-xl text-gray-400 mb-8">
                The next evolution of NEXA arrives next week. Get early access by joining the NEXA Prime membership.
              </p>
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Notify Me
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800"
                alt="Teaser"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
