'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// IMPORT THE AUTH HOOK
import { useAuth } from '../context/AuthContext';
import { Check, ArrowLeft, Crown, Star, Shield, Zap, X, HardDrive } from 'lucide-react';

export default function PricingPage() {
    const { upgradeTier } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const handleUpgrade = (tierName: string) => {
        // @ts-ignore
        upgradeTier(tierName);
    };

    const plans = [
        {
            name: "Pro",
            tierName: "Pro",
            price: billingCycle === 'monthly' ? "15,000" : "150,000",
            icon: <Star size={20} />,
            color: "bg-blue-500",
            features: [
                { text: "4GB Cloud Storage", included: true, icon: <HardDrive size={14} /> },
                { text: "Verified Badge", included: true },
                { text: "View 50 Listings/day", included: true },
                { text: "Legal Document Generator", included: true },
                { text: "Mentorship Access", included: false },
                { text: "Surveyor & Architect Access", included: false }
            ]
        },
        {
            name: "Premium",
            tierName: "Premium",
            price: billingCycle === 'monthly' ? "30,000" : "300,000",
            icon: <Shield size={20} />,
            color: "bg-purple-500",
            features: [
                { text: "50GB Cloud Storage", included: true, icon: <HardDrive size={14} /> },
                { text: "Premium Badge", included: true },
                { text: "Unlimited Listings", included: true },
                { text: "Legal Document Generator", included: true },
                { text: "Mentorship Access", included: true },
                { text: "Surveyor & Architect Access", included: false }
            ]
        },
        {
            name: "Gold",
            tierName: "Gold",
            price: billingCycle === 'monthly' ? "75,000" : "750,000",
            icon: <Crown size={20} />,
            color: "bg-[#D4AF37]",
            features: [
                { text: "500GB Cloud Storage", included: true, icon: <HardDrive size={14} /> },
                { text: "Gold Verification", included: true },
                { text: "AI Architect Access", included: true },
                { text: "Legal Document Generator", included: true },
                { text: "Priority Mentorship", included: true },
                { text: "Surveyor & Architect Access", included: false }
            ]
        },
        {
            name: "Diamond",
            tierName: "Diamond",
            price: billingCycle === 'monthly' ? "250,000" : "2,500,000",
            icon: <Zap size={20} />,
            color: "bg-black",
            highlight: true,
            features: [
                { text: "Unlimited Storage", included: true, icon: <HardDrive size={14} /> },
                { text: "Diamond Authority", included: true },
                { text: "White-Glove Service", included: true },
                { text: "Direct CEO Access", included: true },
                { text: "Surveyor & Architect Access", included: true },
                { text: "Algorithm Support", included: true }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] font-sans p-8 transition-colors duration-500 pb-32">
            <Link href="/profile" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} /> Back to Profile
            </Link>

            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-serif font-bold mb-4 text-[#0F172A] dark:text-[#D4AF37]">Choose Your Tier</h1>
                <p className="text-gray-500 dark:text-gray-400">Unlock storage, tools, and exclusive access.</p>

                <div className="flex items-center justify-center mt-8 gap-4">
                    <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Monthly</span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        className="w-14 h-8 bg-[#0F172A] dark:bg-[#D4AF37] rounded-full relative transition-colors cursor-pointer"
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${billingCycle === 'yearly' ? 'left-7' : 'left-1'}`} />
                    </button>
                    <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Yearly <span className="text-[#D4AF37] text-[10px] ml-1">(SAVE 20%)</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {plans.map((plan) => (
                    <div key={plan.name} className={`relative p-6 rounded-3xl border flex flex-col transition-all duration-300 ${plan.highlight ? 'border-[#D4AF37] bg-white dark:bg-[#1E293B] shadow-2xl md:scale-105 z-10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] opacity-90 hover:opacity-100 hover:shadow-xl'}`}>
                        {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0F172A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>}

                        <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                            {plan.icon}
                        </div>

                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">{plan.name}</h3>
                        <div className="my-4">
                            <span className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white">₦{plan.price}</span>
                            <span className="text-xs text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                                <li key={i} className={`flex items-center gap-2 text-sm ${feat.included ? 'text-gray-600 dark:text-gray-300' : 'text-gray-300 dark:text-gray-700 line-through'}`}>
                                    {feat.included ? (feat.icon || <Check size={14} className="text-green-500 shrink-0" />) : <X size={14} className="shrink-0" />}
                                    <span className={feat.text.includes('Storage') ? 'font-bold text-[#0F172A] dark:text-white' : ''}>{feat.text}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleUpgrade(plan.tierName)}
                            className={`w-full py-3 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-[#D4AF37] text-[#0F172A] hover:bg-[#b5952f] shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-[#0F172A] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            Select {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}