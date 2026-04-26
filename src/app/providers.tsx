'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { CartSidebar } from '@/components/CartSidebar';
import { SearchModal } from '@/components/SearchModal';
import { AIChatWidget } from '@/components/AIChatWidget';
import { Footer } from '@/components/Footer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
      <CartSidebar />
      <SearchModal />
      <AIChatWidget />
    </>
  );
}