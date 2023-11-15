import Header from '@/components/header';
import { cn } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creative review',
  description: 'Creative Review',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(inter.className)}>
        <Providers>
          <Toaster richColors position='top-center' />
          <main className='grid h-screen grid-rows-[auto_1fr] bg-white'>
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
