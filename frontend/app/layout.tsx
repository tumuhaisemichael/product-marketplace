import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import ChatWidget from '@/components/chatbot/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Business Product Marketplace',
    description: 'Manage and approve products with ease.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                    <ChatWidget />
                </Providers>
            </body>
        </html>
    );
}
