'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/app/context/AuthContext';
import { X, AlertCircle } from 'lucide-react';

// 1. DYNAMICALLY LOAD PAYSTACK
const PaystackButton = dynamic<any>(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);

// !!! YOUR PAYSTACK PUBLIC KEY !!!
const PAYSTACK_PUBLIC_KEY = 'pk_test_2bbd0679391969083380ff70abd38297ba91d858';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    fixedAmount?: number; // If passed, the user can't type an amount (e.g., Trust Center)
    minAmount?: number;   // Minimum limit if typing (e.g., 5000 for Wallet)
    onPaymentSuccess: (reference: any, finalAmount: number) => void; // What to do after payment
}

export default function PaymentModal({
    isOpen,
    onClose,
    title,
    description,
    fixedAmount,
    minAmount = 100,
    onPaymentSuccess
}: PaymentModalProps) {
    const { user } = useAuth();

    // If fixedAmount is provided, use it. Otherwise, default to 0.
    const [amount, setAmount] = useState<number>(fixedAmount || 0);

    // Reset amount if the modal opens/closes or fixedAmount changes
    useEffect(() => {
        if (isOpen) {
            setAmount(fixedAmount || 0);
        }
    }, [isOpen, fixedAmount]);

    if (!isOpen) return null;

    // Check if the current amount is valid
    const isValidAmount = amount >= minAmount;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 max-w-sm w-full relative animate-in zoom-in-95 duration-200 shadow-2xl">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                    <X size={16} />
                </button>

                <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
                <p className="text-gray-500 text-sm mb-6">{description}</p>

                {/* AMOUNT INPUT (Only show if it's NOT a fixed amount) */}
                {!fixedAmount ? (
                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Amount (₦)</label>
                        <input
                            type="number"
                            value={amount || ''}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={`w-full p-4 text-2xl font-bold bg-gray-50 dark:bg-[#0F172A] rounded-xl border-2 outline-none transition-all dark:text-white ${amount > 0 && amount < minAmount
                                    ? 'border-red-400 focus:ring-red-500'
                                    : 'border-transparent focus:border-[#D4AF37]'
                                }`}
                            placeholder="0.00"
                        />

                        {/* WARNING TEXT */}
                        {amount > 0 && amount < minAmount && (
                            <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1 animate-in fade-in">
                                <AlertCircle size={14} /> Minimum is ₦{minAmount.toLocaleString()}
                            </p>
                        )}
                    </div>
                ) : (
                    /* FIXED AMOUNT DISPLAY */
                    <div className="mb-8 p-6 bg-gray-50 dark:bg-[#0F172A] rounded-xl text-center border border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-bold uppercase text-gray-500 mb-1">Total Due</p>
                        <p className="text-3xl font-serif font-bold dark:text-white">₦{fixedAmount.toLocaleString()}</p>
                    </div>
                )}

                {/* PAY BUTTON */}
                {!isValidAmount ? (
                    <button
                        disabled
                        className="w-full py-4 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 font-bold rounded-xl cursor-not-allowed transition-colors"
                    >
                        {fixedAmount ? 'Invalid Amount' : 'Enter Valid Amount'}
                    </button>
                ) : (
                    <PaystackButton
                        email={user?.email || 'user@belmont.com'}
                        amount={amount * 100} // Convert to Kobo
                        publicKey={PAYSTACK_PUBLIC_KEY}
                        text={`Pay ₦${amount.toLocaleString()}`}
                        onSuccess={(ref: any) => onPaymentSuccess(ref, amount)}
                        onClose={() => console.log('Payment closed')}
                        reference={(new Date()).getTime().toString()}
                        className="w-full py-4 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                    />
                )}
            </div>
        </div>
    );
}