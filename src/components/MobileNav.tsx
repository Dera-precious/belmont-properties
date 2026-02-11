'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useTheme } from '@/app/context/ThemeContext';
import {
    LayoutDashboard, Search, Users, BookOpen, Scale,
    Menu, X, LogOut, User, Moon, Sun, ShieldCheck, Lock,
    ShoppingBag, Wallet, Home as HomeIcon // ADDED: Home Icon
} from 'lucide-react';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: 'Central Hub', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'My Home', icon: <HomeIcon size={20} />, path: '/tenant' }, // NEW: Tenant Portal
        { name: 'Wallet', icon: <Wallet size={20} />, path: '/wallet' },
        { name: 'Listings', icon: <Search size={20} />, path: '/listings' },
        { name: 'Collab', icon: <Users size={20} />, path: '/collab' },
        { name: 'Mentorship', icon: <BookOpen size={20} />, path: '/mentorship' },
        { name: 'Trust Center', icon: <ShieldCheck size={20} />, path: '/services' },
        { name: 'Supplies', icon: <ShoppingBag size={20} />, path: '/supplies' },
        { name: 'Legal Docs', icon: <Scale size={20} />, path: '/legal' },
        { name: 'Admin Panel', icon: <Lock size={20} />, path: '/admin' },
    ];

    if (pathname === '/login' || pathname?.includes('/onboarding')) {
        return null;
    }

    return (
        <>
            {/* 1. BOTTOM BAR (Always Visible - High Z-Index) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-800 p-4 flex justify-around items-center z-50 transition-colors duration-500 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <Link href="/" className={`p-2 rounded-xl ${pathname === '/' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                    <LayoutDashboard size={24} />
                </Link>
                <Link href="/listings" className={`p-2 rounded-xl ${pathname === '/listings' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                    <Search size={24} />
                </Link>
                <div className="relative -top-5">
                    <button onClick={toggleMenu} className="w-14 h-14 bg-[#0F172A] dark:bg-[#D4AF37] rounded-full flex items-center justify-center text-white dark:text-[#0F172A] shadow-xl hover:scale-105 transition-transform border-4 border-[#FAFAF9] dark:border-[#0F172A]">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <Link href="/collab" className={`p-2 rounded-xl ${pathname === '/collab' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                    <Users size={24} />
                </Link>
                <Link href="/profile" className={`p-2 rounded-xl ${pathname === '/profile' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                    <User size={24} />
                </Link>
            </div>

            {/* 2. FULL SCREEN MENU OVERLAY (Scroll Fixed) */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-[#FAFAF9] dark:bg-[#0F172A] z-40 flex flex-col animate-in slide-in-from-bottom-10 duration-300">

                    {/* SCROLLABLE CONTAINER */}
                    <div className="flex-1 overflow-y-auto overscroll-contain p-8 pt-12 pb-40 no-scrollbar">

                        {/* Header Area */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src="/belmont-logo-gold.png"
                                        alt="Belmont"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white">BELMONT</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Properties</p>
                                </div>
                            </div>
                            <button onClick={toggleTheme} className="p-3 bg-white dark:bg-[#1E293B] rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                                {theme === 'dark' ? <Moon size={20} className="text-[#D4AF37]" /> : <Sun size={20} className="text-orange-500" />}
                            </button>
                        </div>

                        {/* Menu Items Grid */}
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${pathname === item.path ? 'bg-[#D4AF37] text-[#0F172A] shadow-lg translate-x-2' : 'bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Logout Button */}
                        <div className="mt-8">
                            <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
                                <LogOut size={20} /> Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}