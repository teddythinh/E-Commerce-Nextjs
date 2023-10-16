import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import SessionProvider from './SessionProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Teddy Store',
    description: 'We love your wallet more than you do.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <Navbar />
                    <main className="m-auto min-w-[300px] max-w-7xl p-4">
                        {children}
                        <Analytics />
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}
