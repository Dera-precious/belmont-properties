'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
    LayoutGrid, Home, Menu, ShoppingBag, User, X,
    Lock, ShieldCheck, Wallet, Users, BookOpen, Scale, LogOut, LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    if (pathname === '/login' || pathname === '/signup') return null;

    const bottomNavItems = [
        { name: 'Central Hub', href: '/', icon: LayoutGrid, requireAuth: false },
        { name: 'My Home', href: '/tenant', icon: Home, requireAuth: true },
        { name: 'Menu', isCenter: true, icon: Menu }, // The Toggle Button
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
                <div className="bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-3 flex justify-between items-end h-[88px]">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href;

                        // --- CENTER BUTTON FIX ---
                        if (item.isCenter) {
                            return (
                                <div key={item.name} className="relative -top-1">
                                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                                        <motion.div
                                            animate={{
                                                y: isOpen ? -5 : 0, // Pops up when menu is OPEN
                                                scale: isOpen ? 1.1 : 1,
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            // Removed negative margins, handled by parent div for better alignment
                                            className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0F172A] shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-[#0F172A]"
                                        >
                                            {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                                        </motion.div>
                                    </button>
                                </div>
                            );
                        }

                        // --- SIDE BUTTONS ---
                        const isLocked = item.requireAuth && !user;
                        const linkDest = isLocked ? '/login' : item.href!;

                        return (
                            <Link key={item.name} href={linkDest} className="pb-1">
                                <motion.div
                                    animate={{
                                        y: isActive ? -10 : 0, // Pops up when ACTIVE
                                        scale: isActive ? 1.1 : 1,
                                        color: isActive ? '#D4AF37' : '#9CA3AF',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <div className={`p-2 rounded-xl border transition-all duration-300 ${isActive ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-transparent'}`}>
                                        {isLocked ? <Lock size={20} /> : <item.icon size={24} strokeWidth={2} />}
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
                        className="fixed inset-0 z-40 bg-[#0F172A] pt-24 px-6 pb-32 overflow-y-auto"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="relative w-10 h-10">
                                <Image src="/belmont-logo-gold.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-white">Menu</h2>
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
                                        className={`p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3 hover:bg-white/10 transition-colors ${isLocked ? 'opacity-60' : ''}`}
                                    >
                                        <div className="text-[#D4AF37]">
                                            {isLocked ? <Lock size={24} /> : <item.icon size={24} />}
                                        </div>
                                        <span className="font-bold text-white">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-12">
                            {user ? (
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full py-4 bg-red-500/10 text-red-500 font-bold rounded-xl border border-red-500/20 flex items-center justify-center gap-2"
                                >
                                    <LogOut size={20} /> Log Out
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2"
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

// Search Icon Helper
function SearchIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    )
}