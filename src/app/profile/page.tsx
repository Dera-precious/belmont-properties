'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/context/AuthContext';
import { useBookings } from '@/app/context/BookingContext';
import {
    Crown, Shield, User, Mail, LogOut, Settings,
    Bell, DollarSign, Ruler, Moon, Sun, CheckCircle2,
    Clock, FileText, Wallet, ChevronRight, CreditCard,
    Download, Heart, Key, Lock, Zap
} from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { bookings: recentBookings } = useBookings();

    // NAVIGATION STATE
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'wallet' | 'saves' | 'settings'>('overview');

    // MOCK DATA FOR SAVED ITEMS
    const savedItems = [
        { id: 1, title: "Lekki Phase 1 Land", price: "₦120,000,000", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop", type: "Property" },
        { id: 2, title: "Italian Marble Sink", price: "₦180,000", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop", type: "Supply" },
        { id: 3, title: "Solar Panel 500W", price: "₦210,000", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=500&auto=format&fit=crop", type: "Supply" },
    ];

    // PREFERENCE STATES
    const [currency, setCurrency] = useState('NGN');
    const [notifications, setNotifications] = useState(true);
    const [measurement, setMeasurement] = useState('sqm');

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] dark:bg-[#0F172A]">
            <Link href="/login"><button className="px-6 py-2 bg-[#0F172A] text-white rounded-lg">Log In</button></Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-4 md:p-8 pb-32 font-sans transition-colors duration-500">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">Command Center</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your identity, assets, and security.</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* LEFT COLUMN: NAVIGATION & ID CARD */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 text-center shadow-sm relative overflow-hidden group">
                        {/* ID CARD HEADER */}
                        <div className={`absolute top-0 left-0 w-full h-24 transition-colors duration-500 ${user.tier === 'Diamond' ? 'bg-black' : user.tier === 'Gold' ? 'bg-[#D4AF37]' : 'bg-[#0F172A]'}`}></div>

                        <div className="relative z-10 -mt-10 mb-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white dark:border-[#1E293B] mx-auto flex items-center justify-center text-2xl font-bold text-gray-400 uppercase relative">
                                {user.name.charAt(0)}
                                {user.tier === 'Diamond' && <div className="absolute bottom-0 right-0 bg-black text-[#D4AF37] p-1.5 rounded-full border-2 border-white"><Crown size={14} fill="currentColor" /></div>}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">{user.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">{user.role}</p>

                        <div className={`flex items-center justify-center gap-2 py-2 rounded-lg mb-6 ${user.tier === 'Diamond' ? 'bg-black text-[#D4AF37]' : 'bg-yellow-50 dark:bg-yellow-900/20 text-[#D4AF37]'}`}>
                            {user.tier === 'Diamond' ? <Zap size={16} fill="currentColor" /> : <Crown size={16} />}
                            <span className="text-xs font-bold uppercase tracking-widest">{user.tier} Member</span>
                        </div>

                        {/* NAVIGATION MENU */}
                        <div className="space-y-1 text-left border-t border-gray-100 dark:border-gray-700 pt-4">
                            {[
                                { id: 'overview', icon: User, label: 'Overview' },
                                { id: 'bookings', icon: Clock, label: 'My Bookings', count: recentBookings.length },
                                { id: 'wallet', icon: Wallet, label: 'Wallet & Escrow' },
                                { id: 'saves', icon: Heart, label: 'My Saves', count: 3 }, // NEW TAB
                                { id: 'settings', icon: Settings, label: 'Settings & Security' }, // RENAMED
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === item.id ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
                                >
                                    <item.icon size={18} />
                                    <span className="font-bold text-sm">{item.label}</span>
                                    {item.count ? <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{item.count}</span> : null}
                                </button>
                            ))}
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                            <button onClick={logout} className="w-full p-3 rounded-xl flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-bold text-sm">
                                <LogOut size={18} /> <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: DYNAMIC CONTENT AREA */}
                <div className="md:col-span-2">

                    {/* 1. OVERVIEW TAB (Identity & Subscription) */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

                            {/* SUBSCRIPTION MANAGER */}
                            <div className="bg-[#0F172A] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div>
                                        <p className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-2">Current Plan</p>
                                        <h2 className="text-3xl font-serif font-bold mb-1">{user.tier} Membership</h2>
                                        <p className="text-gray-400 text-sm">Next billing date: March 1, 2026</p>
                                    </div>
                                    <Link href="/pricing">
                                        <button className="px-6 py-3 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-[#D4AF37] transition-colors shadow-lg flex items-center gap-2">
                                            <Zap size={18} /> Upgrade Plan
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* STATS ROW */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative">
                                    <div className="absolute top-4 right-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600"><CheckCircle2 size={20} /></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Bookings</p>
                                    <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">{recentBookings.length}</h3>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative">
                                    <div className="absolute top-4 right-4 p-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-600"><Heart size={20} /></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Saved Items</p>
                                    <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">{savedItems.length}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. BOOKINGS TAB (Existing Code) */}
                    {activeTab === 'bookings' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[400px] animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="font-bold text-xl mb-6 text-[#0F172A] dark:text-white">Service History</h3>
                            <div className="space-y-4">
                                {recentBookings.length > 0 ? recentBookings.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-[#D4AF37] transition-colors gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                                <Clock size={20} className="text-gray-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#0F172A] dark:text-white">{item.service}</h4>
                                                <p className="text-xs text-gray-500">Ref: {item.id} • {item.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                            <p className="font-serif font-bold text-[#0F172A] dark:text-white">{item.price}</p>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {item.status}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 text-gray-400">
                                        <Clock size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>No active bookings found.</p>
                                        <Link href="/services" className="text-[#D4AF37] font-bold text-sm mt-2 block hover:underline">Book a Service</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 3. WALLET TAB (Existing Code) */}
                    {activeTab === 'wallet' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[400px] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                                <Wallet size={40} className="text-[#D4AF37]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-[#0F172A] dark:text-white">Belmont Wallet</h3>
                            <p className="text-gray-500 max-w-sm mb-8">Securely manage your funds for inspections, legal fees, and property deposits.</p>
                            <Link href="/wallet">
                                <button className="px-8 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-opacity">
                                    Go to Wallet Dashboard
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* 4. MY SAVES TAB (NEW) */}
                    {activeTab === 'saves' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[400px] animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="font-bold text-xl mb-6 text-[#0F172A] dark:text-white">Saved Items</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {savedItems.map((item) => (
                                    <div key={item.id} className="group relative bg-gray-50 dark:bg-black/20 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37] transition-all">
                                        <div className="h-32 bg-gray-200 relative">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            <button className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/50 rounded-full text-red-500 hover:bg-white transition-colors">
                                                <Heart size={14} fill="currentColor" />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">{item.type}</span>
                                            <h4 className="font-bold text-[#0F172A] dark:text-white text-sm line-clamp-1">{item.title}</h4>
                                            <p className="text-[#D4AF37] font-serif font-bold text-sm mt-1">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. SETTINGS & SECURITY TAB (UPDATED) */}
                    {activeTab === 'settings' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">

                            {/* PREFERENCES SECTION */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-[#0F172A] dark:text-white flex items-center gap-2"><Settings size={18} /> Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            {theme === 'dark' ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-gray-400" />}
                                            <div><p className="text-sm font-bold text-[#0F172A] dark:text-white">App Theme</p><p className="text-xs text-gray-500">Switch mode</p></div>
                                        </div>
                                        <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-gray-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <Bell size={20} className="text-gray-400" />
                                            <div><p className="text-sm font-bold text-[#0F172A] dark:text-white">Notifications</p><p className="text-xs text-gray-500">Email alerts</p></div>
                                        </div>
                                        <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications ? 'translate-x-6' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-700" />

                            {/* SECURITY SECTION (NEW) */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-[#0F172A] dark:text-white flex items-center gap-2"><Shield size={18} /> Security</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Key size={20} className="text-gray-400" />
                                            <div><p className="text-sm font-bold text-[#0F172A] dark:text-white">Password</p><p className="text-xs text-gray-500">Last changed 30 days ago</p></div>
                                        </div>
                                        <button className="px-4 py-2 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Change</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Lock size={20} className="text-gray-400" />
                                            <div><p className="text-sm font-bold text-[#0F172A] dark:text-white">2-Factor Auth</p><p className="text-xs text-gray-500">Secure your account</p></div>
                                        </div>
                                        <button className="px-4 py-2 text-xs font-bold bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-lg hover:opacity-90 transition-colors">Enable</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}