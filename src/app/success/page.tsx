'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { motion } from 'framer-motion';

export default function SuccessPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    // Simulate "Generating Access Card" progress
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 2; // Speed of progress
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6 text-center">

            {/* SUCCESS ICON */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
            >
                <CheckCircle2 size={40} className="text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Membership Activated</h1>
            <p className="text-gray-400 text-lg max-w-md mb-12">
                Welcome to the 1%. Your access to the Belmont Ecosystem has been confirmed.
            </p>

            {/* DIGITAL ID CARD ANIMATION */}
            <div className="relative w-full max-w-sm aspect-[1.58/1] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-[#D4AF37] p-6 flex flex-col justify-between mb-12 shadow-2xl overflow-hidden group">

                {/* SHINE EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="flex justify-between items-start">
                    <span className="font-serif font-bold text-[#D4AF37] tracking-widest">BELMONT</span>
                    <ShieldCheck className="text-[#D4AF37]" size={24} />
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Member Name</p>
                    <h3 className="text-2xl font-bold font-mono text-white tracking-wide">{user ? user.name : 'Chinedu Okeke'}</h3>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase">Tier</p>
                        <p className="text-[#D4AF37] font-bold uppercase">{user ? user.tier : 'Gold'} Access</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase">ID No.</p>
                        <p className="text-white font-mono text-sm">BLM-8829-X</p>
                    </div>
                </div>
            </div>

            {/* PROGRESS BAR OR BUTTON */}
            <div className="w-full max-w-sm">
                {progress < 100 ? (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-[#D4AF37] uppercase">
                            <span>Generating Credentials...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#D4AF37] transition-all duration-100 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full py-4 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                            Enter Dashboard <ArrowRight size={20} />
                        </button>
                        <button className="text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors">
                            <Download size={14} /> Download Receipt
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}