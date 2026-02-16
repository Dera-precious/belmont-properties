'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Home, Menu, ShoppingBag, User } from 'lucide-react'; // Updated icons to match your screenshot
import { motion } from 'framer-motion';

export default function MobileNav() {
    const pathname = usePathname();

    // Hide on Auth pages
    if (pathname === '/login' || pathname === '/signup') return null;

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { name: 'Home', href: '/', icon: Home },
        { name: 'Menu', href: '/menu', icon: Menu, isCenter: true }, // The Center Button
        { name: 'Market', href: '/supplies', icon: ShoppingBag },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
            <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-end">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    // SPECIAL STYLE FOR CENTER BUTTON (Yellow Circle)
                    if (item.isCenter) {
                        return (
                            <Link key={item.name} href={item.href}>
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0F172A] shadow-[0_0_20px_rgba(212,175,55,0.4)] -mb-8 border-4 border-[#0F172A] relative z-10"
                                >
                                    <Icon size={24} strokeWidth={2.5} />
                                </motion.div>
                            </Link>
                        );
                    }

                    // STYLE FOR SIDE BUTTONS (The ones you marked in red)
                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                // THIS IS THE HOVER/ACTIVE EFFECT YOU ASKED FOR
                                animate={{
                                    y: isActive ? -10 : 0, // Moves up when active
                                    scale: isActive ? 1.1 : 1,
                                    color: isActive ? '#D4AF37' : '#9CA3AF', // Turns Gold
                                }}
                                whileTap={{ scale: 0.8 }}
                                className="flex flex-col items-center gap-1 relative"
                            >
                                {/* The Icon */}
                                <div className={`p-2 rounded-xl border transition-all duration-300 ${isActive ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-transparent'}`}>
                                    <Icon size={24} strokeWidth={2} />
                                </div>

                                {/* Tiny Dot Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-dot"
                                        className="w-1 h-1 bg-[#D4AF37] rounded-full absolute -bottom-2"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}