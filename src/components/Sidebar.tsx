'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Building2, Users, BookOpen, ShieldCheck, Scale,
    Moon, Sun, ChevronLeft, ChevronRight, ShoppingBag, Wallet,
    Home as HomeIcon // ADDED: Home Icon
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useTheme } from '@/app/context/ThemeContext';

const menuItems = [
    { icon: LayoutDashboard, label: "Central Hub", href: "/" },
    { icon: HomeIcon, label: "My Home", href: "/tenant" }, // NEW: Tenant Portal
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Building2, label: "Listings", href: "/listings" },
    { icon: Users, label: "Collab", href: "/collab" },
    { icon: BookOpen, label: "Mentorship", href: "/mentorship" },
    { icon: ShieldCheck, label: "Trust Center", href: "/services" },
    { icon: ShoppingBag, label: "Supplies", href: "/supplies" },
    { icon: Scale, label: "Legal Docs", href: "/legal" },
    { icon: LayoutDashboard, label: "Admin Panel", href: "/admin" },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    if (pathname === '/login' || pathname?.includes('/onboarding')) return null;

    return (
        <aside className={`hidden md:flex flex-col bg-[#0F172A] text-white h-screen sticky top-0 border-r border-gray-800 transition-all duration-300 relative ${isCollapsed ? 'w-20' : 'w-64'}`}>

            {/* COLLAPSE ARROW */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-[#D4AF37] text-[#0F172A] p-1 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* HEADER */}
            <div className={`p-8 ${isCollapsed ? 'items-center px-4' : ''} flex flex-col shrink-0`}>
                {isCollapsed ? (
                    <h1 className="text-xl font-serif font-bold text-[#D4AF37]">B</h1>
                ) : (
                    <>
                        <h1 className="text-2xl font-serif font-bold text-[#D4AF37]">BELMONT</h1>
                        <p className="text-[10px] tracking-widest text-gray-500 uppercase mt-1 font-sans">Properties</p>
                    </>
                )}
            </div>

            {/* SCROLLABLE NAVIGATION AREA */}
            {/* Added: overflow-y-auto no-scrollbar */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar pb-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-sans group ${isActive ? 'bg-[#D4AF37] text-[#0F172A] font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'} ${isCollapsed ? 'justify-center px-0' : ''}`}
                        >
                            <item.icon size={20} className="shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* FOOTER (Theme & Profile) */}
            <div className="p-4 border-t border-gray-800 space-y-4 shrink-0 bg-[#0F172A]">
                <button onClick={toggleTheme} className={`flex items-center justify-between w-full p-3 text-xs font-bold text-gray-400 uppercase tracking-wider bg-white/5 hover:bg-white/10 rounded-xl transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
                    {!isCollapsed && <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>}
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </button>

                <Link href="/profile" className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group relative ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0F172A] font-bold font-serif shrink-0">
                        {user ? user.name.charAt(0).toUpperCase() : 'G'}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-bold truncate text-white font-serif">{user ? user.name : 'Guest'}</h4>
                            <p className="text-xs text-gray-500 capitalize font-sans truncate">{user ? user.role : 'Visitor'}</p>
                        </div>
                    )}
                </Link>
            </div>
        </aside>
    );
}