'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import PaymentModal from '@/components/PaymentModal'; // IMPORT OUR NEW COMPONENT
import {
    Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft,
    History, CreditCard, Loader2, Plus, AlertCircle, CheckCircle2
} from 'lucide-react';

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

    // UI STATE
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // FETCH WALLET DATA
    const fetchData = async () => {
        if (!user) return;
        try {
            const { data: txData, error: txError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'success');

            if (txError) throw txError;

            const currentBalance = txData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
            setBalance(currentBalance);

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

    // HANDLE SUCCESSFUL PAYMENT FROM OUR REUSABLE MODAL
    const handlePaymentSuccess = async (reference: any, finalAmount: number) => {
        setShowModal(false);
        if (!user) return;

        const { error } = await supabase.from('transactions').insert({
            user_id: user.id,
            amount: finalAmount,
            type: 'deposit',
            status: 'success',
            description: 'Wallet Top Up',
            reference: reference.reference
        });

        if (error) {
            console.error(error);
            showToast('Payment successful but failed to record. Contact support.', 'error');
        } else {
            showToast(`Success! Funded ₦${finalAmount.toLocaleString()}`, 'success');
            fetchData();
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-6 md:p-12 font-sans pb-32 transition-colors relative">

            {/* CUSTOM TOAST NOTIFICATION */}
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 font-bold text-sm ${toast.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
                        : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                    }`}>
                    {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {toast.message}
                </div>
            )}

            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-[#D4AF37]">My Wallet</h1>
                <p className="text-gray-500">Manage your funds and transactions.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* CALLING OUR REUSABLE MODAL HERE */}
            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Fund Wallet"
                description="Enter amount to add via Paystack."
                minAmount={5000}
                onPaymentSuccess={handlePaymentSuccess}
            />

        </div>
    );
}