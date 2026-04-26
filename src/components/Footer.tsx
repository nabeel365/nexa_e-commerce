'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail,
  ArrowRight
} from 'lucide-react';

export function Footer() {
  const footerLinks = {
    shop: {
      title: 'Shop',
      links: [
        { name: 'T-Shirts', href: '/category/tshirts' },
        { name: 'Headphones', href: '/category/headphones' },
        { name: 'Speakers', href: '/category/speakers' },
        { name: 'Accessories', href: '/category/accessories' },
        { name: 'New Arrivals', href: '/new' },
        { name: 'Best Sellers', href: '/best-sellers' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Track Order', href: '/track' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
  };

  return (
    <footer className="bg-surface border-t border-white/5">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Stay in the <span className="gradient-text">Loop</span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Get exclusive drops, special offers, and early access to new collections. 
                Join 50,000+ trendsetters.
              </p>
              <form className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 rounded-full focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent-cyan" />
              <span className="font-display text-lg font-bold">NEXA</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 NEXA. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Youtube className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
          {/* Designer/Developer Credit */}
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">
              Designed and Developed by{' '}
              <a
                href="#" // TODO: Update with your portfolio link
                className="underline hover:text-accent-cyan transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nabeel Choudhuri
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}