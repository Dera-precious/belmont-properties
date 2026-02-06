'use client';

import React from 'react';
import { useBookings } from '@/app/context/BookingContext';
import {
    LayoutDashboard, Users, TrendingUp, Activity,
    CheckCircle2, XCircle, Clock, Search, Filter
} from 'lucide-react';

export default function AdminDashboard() {
    const { bookings, stats, updateBookingStatus } = useBookings();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] text-[#0F172A] dark:text-white p-6 md:p-8 pb-32 transition-colors font-sans">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Executive Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back, CEO.</p>
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

            {/* KPI CARDS */}
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

            {/* REQUEST MANAGEMENT TABLE */}
            <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Incoming Requests</h3>
                    <div className="relative w-64">
                        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input type="text" placeholder="Search ID or Client..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-[#0F172A] text-gray-500 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Service Type</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {bookings.length > 0 ? bookings.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{item.id}</td>
                                    <td className="px-6 py-4 font-bold text-[#0F172A] dark:text-white">
                                        {item.service}
                                        <div className="text-xs text-gray-400 font-normal mt-0.5">{item.price}</div>
                                    </td>
                                    <td className="px-6 py-4">{item.clientName}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
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
                                                <button
                                                    onClick={() => updateBookingStatus(item.id, 'Confirmed')}
                                                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title="Approve"
                                                >
                                                    <CheckCircle2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => updateBookingStatus(item.id, 'Rejected')}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="Reject"
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        )}
                                        {item.status === 'Confirmed' && (
                                            <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
                                                <CheckCircle2 size={14} /> Dispatched
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No bookings found. Head to the <a href="/services" className="text-[#D4AF37] underline">Trust Center</a> to make a test booking.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}