import './globals.css';
import { Cinzel, Manrope } from 'next/font/google';

// 1. Setup Fonts
const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
});

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    display: 'swap',
});

export const metadata = {
    title: 'Belmont Properties',
    description: 'The Ultra-Luxury Real Estate Ecosystem',
};

// 2. The Fix: This "export default" function was missing or broken
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${cinzel.variable} ${manrope.variable} font-sans bg-[#FAFAF9] text-slate-900`}>
                {children}
            </body>
        </html>
    );
}