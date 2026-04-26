import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXA | Next-Gen Shopping Experience',
  description: 'Premium futuristic eCommerce platform with AI shopping assistant, 3D product viewer, and immersive shopping experience.',
  keywords: ['eCommerce', 'shopping', 'futuristic', 'premium', 'AI'],
  openGraph: {
    title: 'NEXA | Next-Gen Shopping Experience',
    description: 'Discover premium products with AI-powered recommendations and immersive 3D viewing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}