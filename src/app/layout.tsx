import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'What2Eat',
  description: "Can't decide what to eat? Spin the wheel and we'll figure it out for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
