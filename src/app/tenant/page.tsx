'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    CreditCard, Wrench, Key, Package,
    Calendar, ChevronRight, QrCode, X,
    CheckCircle2, AlertCircle, Home, User
} from 'lucide-react';

export default function TenantPortalPage() {
    // STATE FOR MODALS
    const [showGatePass, setShowGatePass] = useState(false);
    const [showMaintenance, setShowMaintenance] = useState(false);

    // MOCK DATA
    const tenant = {
        name: "Chioma Adesina",
        unit: "Unit 402 • Lekki Gardens Phase 4",
        rentDue: "₦2,500,000",
        dueDate: "Feb 28, 2026"
    };

    const announcements = [
        { id: 1, title: 'Gym Maintenance', date: 'Today', type: 'maintenance', content: 'The gym will be closed from 2pm to 4pm for deep cleaning.' },
        { id: 2, title: 'Package Locker Update', date: 'Yesterday', type: 'info', content: 'New access codes have been sent to your email.' },
        { id: 3, title: 'Community BBQ', date: 'Jan 15', type: 'event', content: 'Join us on the roof deck this Saturday! Drinks on us.' }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans transition-colors duration-500 pb-32">

            {/* HEADER */}
            <header className="bg-[#0F172A] text-white p-8 pb-24 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-1">Welcome Home.</h1>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                            <Home size={14} className="text-[#D4AF37]" /> {tenant.unit}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <User size={20} />
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-20 space-y-6">

                {/* RENT CARD */}
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Next Rent Payment</p>
                        <h2 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white">{tenant.rentDue}</h2>
                        <p className="text-xs text-red-500 font-bold mt-1 flex items-center justify-center md:justify-start gap-1">
                            <AlertCircle size={12} /> Due {tenant.dueDate}
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <Link href="/wallet">
                            <button className="w-full md:w-auto px-8 py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl hover:bg-[#b5952f] transition-colors shadow-lg flex items-center justify-center gap-2">
                                <CreditCard size={18} /> Pay Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setShowGatePass(true)} className="p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all group flex flex-col items-center gap-3 shadow-sm hover:shadow-md">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <QrCode size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">Visitor Access</span>
                    </button>

                    <button onClick={() => setShowMaintenance(true)} className="p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all group flex flex-col items-center gap-3 shadow-sm hover:shadow-md">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                            <Wrench size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">Maintenance</span>
                    </button>

                    <button className="p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all group flex flex-col items-center gap-3 shadow-sm hover:shadow-md">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                            <Key size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">Smart Lock</span>
                    </button>

                    <button className="p-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all group flex flex-col items-center gap-3 shadow-sm hover:shadow-md">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                            <Package size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">Packages (2)</span>
                    </button>
                </div>

                {/* COMMUNITY BOARD */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white mb-6">Community Board</h3>
                    <div className="space-y-6">
                        {announcements.map((item) => (
                            <div key={item.id} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-0">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full ring-4 ring-white dark:ring-[#1E293B]"></div>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">{item.title}</h4>
                                    <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-500">{item.date}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- MODAL: GATE PASS --- */}
            {showGatePass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center relative shadow-2xl">
                        <button onClick={() => setShowGatePass(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"><X size={20} className="text-black" /></button>

                        <h3 className="text-xl font-bold text-[#0F172A] mb-1">Visitor Access Code</h3>
                        <p className="text-xs text-gray-500 mb-6">Share this code with security at the gate.</p>

                        <div className="bg-[#0F172A] p-6 rounded-2xl mb-6 inline-block shadow-xl">
                            <QrCode size={150} className="text-white" />
                        </div>

                        <div className="bg-gray-100 p-3 rounded-xl mb-6">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Access Code</p>
                            <p className="text-3xl font-mono font-bold text-[#0F172A] tracking-widest">8492</p>
                        </div>

                        <button className="w-full py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl hover:opacity-90">Share Code</button>
                    </div>
                </div>
            )}

            {/* --- MODAL: MAINTENANCE --- */}
            {showMaintenance && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
                        <button onClick={() => setShowMaintenance(false)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"><X size={20} /></button>

                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6">Request Maintenance</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Issue Type</label>
                                <select className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-[#0F172A] dark:text-white">
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>Appliance</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Description</label>
                                <textarea rows={4} placeholder="Describe the issue..." className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-[#0F172A] dark:text-white resize-none"></textarea>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-400 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800">
                                    + Attach Photo
                                </button>
                            </div>
                        </div>

                        <button onClick={() => setShowMaintenance(false)} className="w-full mt-6 py-3 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90">Submit Request</button>
                    </div>
                </div>
            )}

        </div>
    );
}