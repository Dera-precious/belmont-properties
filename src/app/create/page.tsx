'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CreateHub() {
    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-8 font-sans transition-colors duration-500 pb-32 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#0F172A] dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>
                <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">Creator Studio</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg">What would you like to initialize today?</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* OPTION 1: MARKET LISTING */}
                    <Link href="/create/market" className="group relative overflow-hidden bg-white dark:bg-[#1E293B] p-10 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl hover:border-[#D4AF37] transition-all duration-300">
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
                                <Building2 size={32} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">List Property</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">Upload a property for Sale or Rent.</p>
                            <span className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                Start Listing <ArrowRight size={18} />
                            </span>
                        </div>
                    </Link>

                    {/* OPTION 2: PLAN (THEMED CORRECTLY) */}
                    <Link href="/create/plan" className="group relative overflow-hidden bg-white dark:bg-[#1E293B] p-10 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl hover:border-[#D4AF37] transition-all duration-300">
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-6">
                                <HardHat size={32} className="text-[#D4AF37]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">New Project</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">Initialize a construction "War Room".</p>
                            <span className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                Initialize War Room <ArrowRight size={18} />
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}