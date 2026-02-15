'use client';

import React, { useState } from 'react';
import { useBookings } from '@/app/context/BookingContext';
import {
    LayoutDashboard, Users, TrendingUp, Activity,
    CheckCircle2, XCircle, Clock, Search, Filter,
    AlertTriangle, ShieldAlert, UserX, MoreHorizontal, Ban
} from 'lucide-react';

export default function AdminDashboard() {
    const { bookings, stats, updateBookingStatus } = useBookings();

    // --- MOCK DATA: FRAUD RADAR ---
    const suspiciousListings = [
        { id: 1, title: "4BR Duplex in Banana Island", price: "₦5,000,000", reason: "Price 80% below market average", risk: "High" },
        { id: 2, title: "Lekki Phase 1 Land", price: "₦120,000,000", reason: "Duplicate images detected", risk: "Medium" },
    ];

    // --- MOCK DATA: USER MANAGEMENT ---
    const [users, setUsers] = useState([
        { id: 1, name: "Chinedu Okeke", email: "chinedu@gmail.com", tier: "Free", status: "Active" },
        { id: 2, name: "Sarah Williams", email: "sarah.w@yahoo.com", tier: "Gold", status: "Active" },
        { id: 3, name: "Tunde Bakare", email: "tunde@scam.net", tier: "Pro", status: "Flagged" },
    ]);

    const handleBanUser = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: "Banned" } : u));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] text-[#0F172A] dark:text-white p-6 md:p-8 pb-32 transition-colors font-sans">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Admin Panel</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Overview & Master Control</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] rounded-xl text-sm font-bold flex items-center gap-2">
                        <Activity size={16} /> Live Report
                    </button>
                </div>
            </div>

            {/* KPI CARDS (UNCHANGED) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold">₦{stats.revenue.toLocaleString()}</h3>
                </div>
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg"><Clock size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Actions</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold">{stats.pending}</h3>
                </div>
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Activity size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Dispatches</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold">{stats.active}</h3>
                </div>
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Users size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Clients</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold">142</h3>
                </div>
            </div>

            {/* MAIN GRID: REQUESTS + FRAUD + USERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COL 1: THE RED PHONE (REQUESTS) - Spans 2 columns */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-fit">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg flex items-center gap-2"><Clock size={20} className="text-[#D4AF37]" /> Incoming Requests</h3>
                        <div className="relative w-48">
                            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-[#0F172A] text-gray-500 uppercase text-xs font-bold">
                                <tr>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {bookings.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold">
                                            {item.service}
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">{item.price}</div>
                                        </td>
                                        <td className="px-6 py-4">{item.clientName}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                ${item.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                                    item.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                                        'bg-red-100 text-red-600'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.status === 'Pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => updateBookingStatus(item.id, 'Confirmed')} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><CheckCircle2 size={16} /></button>
                                                    <button onClick={() => updateBookingStatus(item.id, 'Rejected')} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><XCircle size={16} /></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* COL 2: SIDEBAR (FRAUD + USERS) */}
                <div className="space-y-8">

                    {/* FRAUD RADAR */}
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-red-50 dark:bg-red-900/10 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-red-600 dark:text-red-400 flex items-center gap-2"><ShieldAlert size={20} /> Fraud Radar</h3>
                            <span className="bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-1 rounded-full">{suspiciousListings.length} Alerts</span>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {suspiciousListings.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-black/20">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white line-clamp-1">{item.title}</h4>
                                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase">{item.risk} Risk</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">{item.reason}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 bg-gray-100 dark:bg-gray-700 text-xs font-bold rounded text-gray-600 dark:text-gray-300">Investigate</button>
                                        <button className="flex-1 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700">Takedown</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* USER MANAGEMENT */}
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Users size={20} /> User Control</h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-80 overflow-y-auto">
                            {users.map((u) => (
                                <div key={u.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">{u.name[0]}</div>
                                        <div>
                                            <p className="font-bold text-sm text-[#0F172A] dark:text-white">{u.name}</p>
                                            <p className="text-xs text-gray-500">{u.tier} Tier</p>
                                        </div>
                                    </div>
                                    {u.status === 'Banned' ? (
                                        <span className="text-xs font-bold text-red-500">BANNED</span>
                                    ) : (
                                        <button onClick={() => handleBanUser(u.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-full transition-colors" title="Ban User">
                                            <Ban size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                            <button className="w-full py-2 bg-gray-50 dark:bg-[#0F172A] text-xs font-bold text-gray-500 hover:text-[#0F172A] dark:hover:text-white transition-colors">View All Users</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}