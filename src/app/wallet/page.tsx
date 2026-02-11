'use client';

import React, { useState } from 'react';
import {
    Wallet, ArrowUpRight, ArrowDownLeft, History,
    Shield, CreditCard, Plus, Lock
} from 'lucide-react';

export default function WalletPage() {
    // Mock Data
    const [balance, setBalance] = useState(2540500); // ₦2.5M
    const [escrow, setEscrow] = useState(850000);    // ₦850k
    const [showFundModal, setShowFundModal] = useState(false);

    const transactions = [
        { id: 1, title: "Golden Teak Tiles (50sqm)", type: "debit", amount: 625000, date: "Today, 10:23 AM", status: "Completed", category: "Supplies" },
        { id: 2, title: "Project Milestone: Foundation", type: "escrow_lock", amount: 850000, date: "Yesterday", status: "Held in Escrow", category: "War Room" },
        { id: 3, title: "Wallet Top-up", type: "credit", amount: 1500000, date: "Oct 24, 2025", status: "Success", category: "Deposit" },
        { id: 4, title: "MOPOL Escort Service", type: "debit", amount: 15000, date: "Oct 22, 2025", status: "Completed", category: "Trust Center" },
    ];

    const formatCurrency = (amount: number) => {
        return "₦" + amount.toLocaleString();
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans transition-colors duration-500 pb-32">

            {/* HERO SECTION */}
            <div className="bg-[#0F172A] text-white p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <p className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-2">Financial Overview</p>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-1">My Wallet</h1>
                        <p className="text-gray-400 text-sm">Manage funds, payments, and escrow securely.</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setShowFundModal(true)} className="px-6 py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:bg-[#b5952f] transition-colors shadow-lg">
                            <Plus size={18} /> Top Up
                        </button>
                        <button className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors">
                            <ArrowUpRight size={18} /> Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 space-y-8">

                {/* CARDS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. MAIN BALANCE CARD */}
                    <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                                <Wallet size={24} />
                            </div>
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
                        </div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Available Balance</p>
                        <h2 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">{formatCurrency(balance)}</h2>

                        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div>NGN Wallet</div>
                            <div className="flex items-center gap-1"><CreditCard size={14} /> **** 4829</div>
                        </div>
                    </div>

                    {/* 2. ESCROW CARD */}
                    <div className="bg-[#0F172A] text-white p-8 rounded-3xl shadow-xl border border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5"><Shield size={120} /></div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl text-[#D4AF37]">
                                <Lock size={24} />
                            </div>
                            <span className="text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30">Protected</span>
                        </div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1 relative z-10">Held in Escrow</p>
                        <h2 className="text-4xl font-serif font-bold text-white mb-2 relative z-10">{formatCurrency(escrow)}</h2>
                        <p className="text-xs text-gray-400 relative z-10">Funds locked for active projects. Released upon milestone approval.</p>
                    </div>
                </div>

                {/* TRANSACTIONS LIST */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                            <History size={20} className="text-gray-400" /> Recent Activity
                        </h3>
                        <button className="text-xs font-bold text-[#D4AF37] hover:underline">View Statement</button>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-black/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' :
                                            tx.type === 'escrow_lock' ? 'bg-[#0F172A] text-[#D4AF37]' :
                                                'bg-red-50 text-red-500'
                                        }`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={18} /> :
                                            tx.type === 'escrow_lock' ? <Lock size={18} /> :
                                                <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0F172A] dark:text-white text-sm">{tx.title}</p>
                                        <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold font-serif text-sm ${tx.type === 'credit' ? 'text-green-600' :
                                            tx.type === 'escrow_lock' ? 'text-gray-500' :
                                                'text-[#0F172A] dark:text-white'
                                        }`}>
                                        {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* FUND WALLET MODAL */}
            {showFundModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white mb-6">Top Up Wallet</h3>

                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Amount (NGN)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-400 font-serif">₦</span>
                                    <input type="number" placeholder="0.00" className="w-full pl-8 p-3 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] font-bold text-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                        <CreditCard size={16} /> Card
                                    </button>
                                    <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        Bank Transfer
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowFundModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Cancel</button>
                            <button onClick={() => setShowFundModal(false)} className="flex-1 py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-[#1e293b] transition-colors">Proceed</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}