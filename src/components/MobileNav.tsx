'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useTheme } from '@/app/context/ThemeContext';
import {
    LayoutGrid, Home, Menu, ShoppingBag, User, X,
    Lock, ShieldCheck, Wallet, Users, BookOpen, Scale, LogOut, LogIn,
    Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    if (pathname === '/login' || pathname === '/signup') return null;

    const bottomNavItems = [
        { name: 'Central Hub', href: '/', icon: LayoutGrid, requireAuth: false },
        { name: 'My Home', href: '/tenant', icon: Home, requireAuth: true },
        { name: 'Menu', isCenter: true, icon: Menu },
        { name: 'Market', href: '/supplies', icon: ShoppingBag, requireAuth: false },
        { name: 'Profile', href: '/profile', icon: User, requireAuth: true },
    ];

    const overlayMenuItems = [
        { name: 'Central Hub', icon: LayoutGrid, path: '/' },
        { name: 'My Home', icon: Home, path: '/tenant' },
        { name: 'Wallet', icon: Wallet, path: '/wallet' },
        { name: 'Listings', icon: SearchIcon, path: '/listings' },
        { name: 'Collab', icon: Users, path: '/collab' },
        { name: 'Mentorship', icon: BookOpen, path: '/mentorship' },
        { name: 'Trust Center', icon: ShieldCheck, path: '/trustcenter' },
        { name: 'Legal Docs', icon: Scale, path: '/legal' },
        { name: 'Admin Panel', icon: Lock, path: '/admin' },
    ];

    return (
        <>
            {/* BOTTOM BAR */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-end relative transition-colors duration-500">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href;

                        if (item.isCenter) {
                            return (
                                <div key={item.name} className="relative -top-1">
                                    <button onClick={() => setIsOpen(!isOpen)}>
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.05 }}
                                            animate={{
                                                boxShadow: isOpen ? "0px 0px 20px rgba(212,175,55,0.6)" : "0px 0px 10px rgba(212,175,55,0.3)"
                                            }}
                                            className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0F172A] border-4 border-[#FAFAF9] dark:border-[#0F172A] relative z-20"
                                        >
                                            {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                                        </motion.div>
                                    </button>
                                </div>
                            );
                        }

                        const isLocked = item.requireAuth && !user;
                        const linkDest = isLocked ? '/login' : item.href!;

                        return (
                            <Link key={item.name} href={linkDest}>
                                <motion.div
                                    animate={{
                                        y: isActive ? -10 : 0,
                                        scale: isActive ? 1.1 : 1,
                                        color: isActive ? '#D4AF37' : '#9CA3AF',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex flex-col items-center gap-1 relative"
                                >
                                    <div className={`p-2 rounded-xl border transition-all duration-300 ${isActive ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-transparent'}`}>
                                        {isLocked ? <Lock size={20} className="text-gray-400" /> : <item.icon size={24} strokeWidth={2} className="text-gray-400 dark:text-gray-400" />}
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* OVERLAY MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        // FIXED: Added light mode background (bg-[#FAFAF9])
                        className="fixed inset-0 z-40 bg-[#FAFAF9] dark:bg-[#0F172A] pt-24 px-6 pb-32 overflow-y-auto transition-colors duration-500"
                    >
                        {/* HEADER: Title on left, Theme Toggle on right */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <Image src="/belmont-logo-gold.png" alt="Logo" fill className="object-contain" />
                                </div>
                                {/* FIXED: Text changes color in light/dark mode */}
                                <h2 className="text-2xl font-serif font-bold text-[#0F172A] dark:text-white">Menu</h2>
                            </div>

                            {/* THEME TOGGLE (Fixed Colors) */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-white/10 rounded-full border border-gray-300 dark:border-white/10 text-[#0F172A] dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    {theme === 'dark' ? 'Dark' : 'Light'}
                                </span>
                                {theme === 'dark' ? <Moon size={18} className="text-[#D4AF37]" /> : <Sun size={18} className="text-orange-500" />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {overlayMenuItems.map((item) => {
                                const isLocked = !user && item.path !== '/';
                                const href = isLocked ? '/login' : item.path;

                                return (
                                    <Link
                                        key={item.name}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        // FIXED: Item Backgrounds now adapt to light/dark
                                        className={`p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col gap-3 hover:border-[#D4AF37] dark:hover:bg-white/10 transition-all shadow-sm ${isLocked ? 'opacity-60' : ''}`}
                                    >
                                        <div className="text-[#D4AF37]">
                                            {isLocked ? <Lock size={24} /> : <item.icon size={24} />}
                                        </div>
                                        {/* FIXED: Text color */}
                                        <span className="font-bold text-[#0F172A] dark:text-white">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-12">
                            {user ? (
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full py-4 bg-red-50 dark:bg-red-500/10 text-red-500 font-bold rounded-xl border border-red-100 dark:border-red-500/20 flex items-center justify-center gap-2"
                                >
                                    <LogOut size={20} /> Log Out
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <LogIn size={20} /> Log In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function SearchIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    )
}