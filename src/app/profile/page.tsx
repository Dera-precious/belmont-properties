'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/context/AuthContext';
// NEW: Import the Booking Hook to get real data
import { useBookings } from '@/app/context/BookingContext';
import {
    Crown, Shield, User, Mail, LogOut, Settings,
    Bell, DollarSign, Ruler, Moon, Sun, CheckCircle2,
    Clock, FileText, Wallet, ChevronRight, CreditCard, Download
} from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    // NEW: Use the real bookings from the context instead of mock data
    const { bookings: recentBookings } = useBookings();

    // NAVIGATION STATE
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'wallet' | 'settings'>('overview');

    // PREFERENCE STATES (Preserved from your settings)
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
                <p className="text-gray-500 dark:text-gray-400">Manage your property portfolio, bookings, and settings.</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* LEFT COLUMN: NAVIGATION & ID CARD */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 text-center shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-[#0F172A] group-hover:bg-[#D4AF37] transition-colors duration-500"></div>
                        <div className="relative z-10 -mt-10 mb-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white dark:border-[#1E293B] mx-auto flex items-center justify-center text-2xl font-bold text-gray-400 uppercase">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">{user.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">{user.role}</p>
                        <div className="flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 py-2 rounded-lg mb-6">
                            <Crown size={16} className="text-[#D4AF37]" />
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{user.tier} Tier</span>
                        </div>

                        {/* NAVIGATION MENU */}
                        <div className="space-y-1 text-left border-t border-gray-100 dark:border-gray-700 pt-4">
                            {[
                                { id: 'overview', icon: User, label: 'Overview' },
                                { id: 'bookings', icon: Clock, label: 'My Bookings', count: recentBookings.length },
                                { id: 'wallet', icon: Wallet, label: 'Wallet & Escrow' },
                                { id: 'settings', icon: Settings, label: 'Preferences' },
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

                    {/* 1. OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            {/* STATS */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#0F172A] text-white p-6 rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20"><Bell size={48} /></div>
                                    <p className="text-sm opacity-70 mb-1">Notifications</p>
                                    <h3 className="text-3xl font-bold">3</h3>
                                    <p className="text-xs mt-2 text-[#D4AF37]">2 Pending Approvals</p>
                                </div>
                                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 text-[#D4AF37] opacity-20"><CreditCard size={48} /></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Escrow Balance</p>
                                    <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">₦0.00</h3>
                                    <Link href="/pricing" className="text-xs mt-2 text-[#D4AF37] font-bold underline">Top Up Wallet</Link>
                                </div>
                            </div>

                            {/* RECENT ACTIVITY */}
                            <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-lg mb-6 text-[#0F172A] dark:text-white">Recent Activity</h3>
                                <div className="space-y-4">
                                    {recentBookings.length > 0 ? recentBookings.slice(0, 3).map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${booking.type === 'police' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    {booking.type === 'police' ? <Shield size={18} /> : <CheckCircle2 size={18} />}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">{booking.service}</h4>
                                                    <p className="text-xs text-gray-500">{booking.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    )) : (
                                        <p className="text-gray-400 text-sm text-center py-4">No recent activity.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. BOOKINGS TAB */}
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
                                            <ChevronRight size={16} className="text-gray-400" />
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

                    {/* 3. WALLET TAB */}
                    {activeTab === 'wallet' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[400px] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                                <Wallet size={40} className="text-[#D4AF37]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-[#0F172A] dark:text-white">Belmont Wallet</h3>
                            <p className="text-gray-500 max-w-sm mb-8">Securely manage your funds for inspections, legal fees, and property deposits.</p>

                            <div className="bg-gray-50 dark:bg-black/30 p-6 rounded-2xl w-full max-w-sm mb-8">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Balance</p>
                                <h2 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">₦0.00</h2>
                            </div>

                            <button className="px-8 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-opacity">
                                Fund Wallet
                            </button>
                        </div>
                    )}

                    {/* 4. SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-[#0F172A] dark:text-white">
                                <Settings size={20} className="text-[#D4AF37]" /> Preferences
                            </h3>

                            <div className="space-y-6">
                                {/* ACCOUNT EMAIL */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Mail size={18} className="text-gray-400" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Email Address</p>
                                            <p className="text-sm font-medium text-[#0F172A] dark:text-white">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                        <CheckCircle2 size={10} /> Verified
                                    </span>
                                </div>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* THEME TOGGLE */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {theme === 'dark' ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-gray-400" />}
                                        <div>
                                            <p className="text-sm font-bold text-[#0F172A] dark:text-white">App Theme</p>
                                            <p className="text-xs text-gray-500">Switch between light and dark mode</p>
                                        </div>
                                    </div>
                                    <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* CURRENCY */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <DollarSign size={20} className="text-gray-400" />
                                        <span className="text-sm font-bold text-[#0F172A] dark:text-white">Currency</span>
                                    </div>
                                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1 outline-none text-[#0F172A] dark:text-white">
                                        <option value="NGN">NGN (₦)</option>
                                        <option value="USD">USD ($)</option>
                                    </select>
                                </div>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* UNITS */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Ruler size={20} className="text-gray-400" />
                                        <span className="text-sm font-bold text-[#0F172A] dark:text-white">Measurement</span>
                                    </div>
                                    <div className="flex bg-gray-50 dark:bg-[#0F172A] rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                                        {['sqm', 'sqft'].map((unit) => (
                                            <button key={unit} onClick={() => setMeasurement(unit)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${measurement === unit ? 'bg-white dark:bg-[#1E293B] shadow-sm text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>
                                                {unit.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* NOTIFICATIONS */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Bell size={20} className="text-gray-400" />
                                        <span className="text-sm font-bold text-[#0F172A] dark:text-white">Notifications</span>
                                    </div>
                                    <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}