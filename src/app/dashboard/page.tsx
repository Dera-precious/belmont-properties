'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/lib/supabaseClient'; // IMPORT SUPABASE
import {
    Shield, Scale, Zap, Home, User,
    CreditCard, Bell, Search, PlusCircle, Crown, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [balance, setBalance] = useState<number>(0);
    const [isBalanceLoading, setIsBalanceLoading] = useState(true);

    // PROTECT ROUTE
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    // FETCH REAL BALANCE
    useEffect(() => {
        if (!user) return;
        const fetchBalance = async () => {
            try {
                const { data, error } = await supabase
                    .from('transactions')
                    .select('amount')
                    .eq('user_id', user.id)
                    .eq('status', 'success');

                if (error) throw error;

                const currentBalance = data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
                setBalance(currentBalance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setIsBalanceLoading(false);
            }
        };

        fetchBalance();
    }, [user]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] dark:bg-[#0F172A]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    const tierColor =
        user.tier === 'Diamond' ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' :
            user.tier === 'Gold' ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20' :
                user.tier === 'Premium' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' :
                    user.tier === 'Pro' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                        'text-gray-400 bg-gray-400/10 border-gray-400/20';

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans transition-colors pb-32">

            <div className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 px-6 py-8 md:px-12 md:py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                            Welcome, {user.name.split(' ')[0]}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${tierColor}`}>
                                {user.tier === 'Diamond' && <Zap size={12} />}
                                {user.tier === 'Gold' && <Crown size={12} />}
                                {user.tier} Member
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {user.role === 'agent' ? 'Authorized Agent' : 'Verified Tenant'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-gray-100 dark:bg-[#0F172A] rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <Link href="/profile" className="flex items-center gap-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-5 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                            <User size={18} /> Profile
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* UPDATED WALLET CARD */}
                    <div className="p-6 rounded-3xl bg-[#0F172A] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-white/10 rounded-lg"><CreditCard size={20} /></div>
                                <span className="text-xs font-bold text-gray-400 uppercase">Balance</span>
                            </div>

                            {/* SHOW REAL BALANCE OR LOADER */}
                            {isBalanceLoading ? (
                                <div className="h-9 w-32 bg-white/10 animate-pulse rounded-lg mb-1"></div>
                            ) : (
                                <h3 className="text-3xl font-serif font-bold mb-1">₦{balance.toLocaleString()}</h3>
                            )}

                            <div className="flex gap-2 mt-4">
                                <Link href="/wallet" className="px-4 py-2 bg-[#D4AF37] text-[#0F172A] text-xs font-bold rounded-lg hover:bg-white transition-colors">Top Up</Link>
                                <Link href="/wallet" className="px-4 py-2 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-colors">History</Link>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37] transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><Home size={20} /></div>
                            <span className="text-xs font-bold text-gray-400 uppercase">Rent Due</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">No Active Rent</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You are not currently renting a property.</p>
                        <Link href="/listings" className="text-sm font-bold text-blue-500 hover:underline">Find a home →</Link>
                    </div>

                    {user.tier === 'Free' ? (
                        <Link href="/pricing" className="p-6 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-amber-600 text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <Crown size={24} />
                                        <span className="bg-black/20 px-2 py-1 rounded text-[10px] font-bold uppercase">Upgrade</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Unlock Premium</h3>
                                    <p className="text-xs text-white/80 mt-1">Get verified badge & legal tools.</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-sm font-bold">View Plans <ArrowRight size={16} /></div>
                            </div>
                        </Link>
                    ) : (
                        <Link href="/trustcenter" className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:border-green-500 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg"><Shield size={20} /></div>
                                <span className="text-xs font-bold text-gray-400 uppercase">Security</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Trust Center</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Verify agents & book security.</p>
                            <span className="text-sm font-bold text-green-500 hover:underline">Open Hub →</span>
                        </Link>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-[#D4AF37]" /> Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/listings" className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all group text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                                <Search size={24} />
                            </div>
                            <h3 className="font-bold text-sm">Find Property</h3>
                        </Link>
                        <Link href="/legal" className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all group text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                                <Scale size={24} />
                            </div>
                            <h3 className="font-bold text-sm">Legal Docs</h3>
                        </Link>
                        <Link href="/trustcenter" className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all group text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-sm">Verify Agent</h3>
                        </Link>
                        <Link href="/supplies" className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all group text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                                <PlusCircle size={24} />
                            </div>
                            <h3 className="font-bold text-sm">Order Supplies</h3>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}