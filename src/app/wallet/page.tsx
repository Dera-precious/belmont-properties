'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { usePaystackPayment } from 'react-paystack'; // IMPORT PAYSTACK
import {
    Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft,
    History, CreditCard, Loader2, Plus, X
} from 'lucide-react';

// !!! PASTE YOUR PAYSTACK PUBLIC KEY HERE !!!
const PAYSTACK_PUBLIC_KEY = 'pk_test_2bbd0679391969083380ff70abd38297ba91d858';

interface Transaction {
    id: string;
    amount: number;
    type: string;
    status: string;
    description: string;
    created_at: string;
}

export default function WalletPage() {
    const { user } = useAuth();
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // PAYSTACK STATE
    const [amount, setAmount] = useState<number>(0); // Amount in NAIRA
    const [showModal, setShowModal] = useState(false);

    // PAYSTACK CONFIG
    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email || '',
        amount: amount * 100, // Paystack works in Kobo (Naira * 100)
        publicKey: PAYSTACK_PUBLIC_KEY,
    };

    const initializePayment = usePaystackPayment(config);

    // FETCH WALLET DATA
    const fetchData = async () => {
        if (!user) return;
        try {
            // 1. Get Balance (Sum of success transactions)
            const { data: txData, error: txError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'success');

            if (txError) throw txError;

            // Calculate Balance: (Deposits + Income) - (Withdrawals + Payments)
            // Simplified logic: We assume 'amount' is signed (+/-) in the DB
            // OR if you stored everything as positive, you handle the math here.
            // Let's assume you store Withdrawals as NEGATIVE numbers in the DB.
            const currentBalance = txData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
            setBalance(currentBalance);

            // 2. Get Recent History
            const { data: historyData } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            setTransactions(historyData || []);

        } catch (error) {
            console.error('Error fetching wallet:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    // HANDLE SUCCESSFUL PAYMENT
    const onSuccess = async (reference: any) => {
        setShowModal(false);
        if (!user) return;

        // INSERT INTO SUPABASE
        const { error } = await supabase.from('transactions').insert({
            user_id: user.id,
            amount: amount, // Store Positive Value
            type: 'deposit',
            status: 'success',
            description: 'Wallet Top Up',
            reference: reference.reference
        });

        if (error) {
            alert('Payment successful but failed to record. Contact support.');
            console.error(error);
        } else {
            alert(`Success! Funded ₦${amount.toLocaleString()}`);
            fetchData(); // Refresh Balance
            setAmount(0);
        }
    };

    const onClose = () => {
        alert('Payment cancelled.');
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-6 md:p-12 font-sans pb-32 transition-colors">

            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-[#D4AF37]">My Wallet</h1>
                <p className="text-gray-500">Manage your funds and transactions.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* 1. BALANCE CARD */}
                <div className="md:col-span-2 p-8 rounded-3xl bg-[#0F172A] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Total Balance</p>
                                {isLoading ? (
                                    <Loader2 className="animate-spin text-[#D4AF37]" />
                                ) : (
                                    <h2 className="text-5xl font-serif font-bold">₦{balance.toLocaleString()}</h2>
                                )}
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl">
                                <WalletIcon size={24} className="text-[#D4AF37]" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl hover:bg-white transition-colors"
                            >
                                <Plus size={18} /> Top Up
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                                <ArrowUpRight size={18} /> Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. STATS */}
                <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-2 text-green-500">
                            <ArrowDownLeft size={20} />
                            <span className="font-bold text-sm">Income</span>
                        </div>
                        <p className="text-2xl font-bold dark:text-white">₦0.00</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-2 text-red-500">
                            <ArrowUpRight size={20} />
                            <span className="font-bold text-sm">Spent</span>
                        </div>
                        <p className="text-2xl font-bold dark:text-white">₦0.00</p>
                    </div>
                </div>
            </div>

            {/* 3. TRANSACTION HISTORY */}
            <div className="max-w-4xl mx-auto mt-12">
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6 flex items-center gap-2">
                    <History size={20} /> Transaction History
                </h3>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {transactions.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                            <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No transactions yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${tx.type === 'deposit' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'}`}>
                                            {tx.type === 'deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#0F172A] dark:text-white">{tx.description}</p>
                                            <p className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className={`font-bold font-serif ${tx.type === 'deposit' ? 'text-green-600' : 'text-[#0F172A] dark:text-white'}`}>
                                        {tx.type === 'deposit' ? '+' : '-'} ₦{Math.abs(tx.amount).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* TOP UP MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 max-w-sm w-full relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <h3 className="text-xl font-bold mb-2 dark:text-white">Fund Wallet</h3>
                        <p className="text-gray-500 text-sm mb-6">Enter amount to add via Paystack.</p>

                        <div className="mb-6">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Amount (₦)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full p-4 text-2xl font-bold bg-gray-50 dark:bg-[#0F172A] rounded-xl border-none outline-none focus:ring-2 ring-[#D4AF37] dark:text-white"
                                placeholder="0.00"
                            />
                        </div>

                        <button
                            onClick={() => {
                                if (amount < 100) {
                                    alert("Minimum deposit is ₦100");
                                    return;
                                }
                                initializePayment({ onSuccess, onClose });
                            }}
                            className="w-full py-4 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Pay ₦{amount.toLocaleString()}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}