'use client';

import React, { useState } from 'react';
import { Check, Star, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubscriptionTiers() {
    const router = useRouter();
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

    const handleSubscribe = () => {
        // Integrate Payment logic here later
        router.push('/'); // Go to Dashboard
    };

    const handleSkip = () => {
        router.push('/'); // Skip straight to Dashboard
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans py-10 px-6">

            {/* HEADER WITH SKIP BUTTON */}
            <div className="max-w-7xl mx-auto flex justify-end mb-4">
                <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
                >
                    Skip for now <ArrowRight size={14} />
                </button>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-serif text-[#D4AF37] mb-4">Choose Your Visibility</h1>
                <p className="text-gray-400">
                    How fast do you want to sell? Higher tiers guarantee top placement, verified badges, and priority in search results.
                </p>

                {/* TOGGLE */}
                <div className="mt-8 inline-flex bg-white/10 p-1 rounded-full">
                    <button
                        onClick={() => setBilling('monthly')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-white text-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBilling('yearly')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billing === 'yearly' ? 'bg-[#D4AF37] text-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
                    >
                        Yearly <span className="text-[10px] bg-black/20 px-2 rounded-full">-20%</span>
                    </button>
                </div>
            </div>

            {/* TIERS GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">

                {/* 1. PREMIUM */}
                <TierCard
                    title="Premium"
                    price={billing === 'yearly' ? "₦120,000" : "₦10,000"}
                    period={billing === 'yearly' ? "/year" : "/week"}
                    description="For quick flash sales."
                    icon={<Zap size={24} />}
                    features={[
                        "Standard Listing Visibility",
                        "Basic Search Placement",
                        "24hr Support"
                    ]}
                    onClick={handleSubscribe}
                />

                {/* 2. PREMIUM PRO */}
                <TierCard
                    title="Premium Pro"
                    price={billing === 'yearly' ? "₦200,000" : "₦20,000"}
                    period={billing === 'yearly' ? "/year" : "/month"}
                    description="Perfect for independent agents."
                    icon={<ShieldCheck size={24} />}
                    features={[
                        "Everything in Premium",
                        "Top 50 Listing Placement",
                        "Silver Verified Badge",
                        "Analytics Dashboard"
                    ]}
                    isPopular
                    onClick={handleSubscribe}
                />

                {/* 3. GOLD */}
                <TierCard
                    title="Gold Tier"
                    price={billing === 'yearly' ? "₦500,000" : "₦50,000"}
                    period={billing === 'yearly' ? "/year" : "/month"}
                    description="For established developers."
                    icon={<Star size={24} />}
                    features={[
                        "Everything in Pro",
                        "Top 10 Listing Placement",
                        "Gold Verified Badge",
                        "Dedicated Account Manager",
                        "Priority Support"
                    ]}
                    color="gold"
                    onClick={handleSubscribe}
                />

                {/* 4. DIAMOND */}
                <TierCard
                    title="Diamond"
                    price={billing === 'yearly' ? "₦1.5M" : "₦150,000"}
                    period={billing === 'yearly' ? "/year" : "/month"}
                    description="Complete market dominance."
                    icon={<Crown size={24} />}
                    features={[
                        "Always on Homepage Top",
                        "Diamond Verified Badge",
                        "Sorted #1 by Review Score",
                        "0% Commission on leads",
                        "Legal & Architect Support Included"
                    ]}
                    color="diamond"
                    onClick={handleSubscribe}
                />

            </div>
        </div>
    );
}

/* --- COMPONENTS --- */

function TierCard({ title, price, period, description, features, icon, isPopular, color, onClick }: any) {
    const isDiamond = color === 'diamond';
    const isGold = color === 'gold';

    return (
        <div className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:scale-105 ${isDiamond ? 'bg-gradient-to-b from-[#0F172A] to-blue-900 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)]' :
                isGold ? 'bg-[#0F172A] border-[#D4AF37]/50' :
                    'bg-[#1E293B] border-white/10'
            }`}>

            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0F172A] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                </div>
            )}

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isDiamond ? 'bg-[#D4AF37] text-[#0F172A]' :
                    isGold ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                        'bg-white/10 text-white'
                }`}>
                {icon}
            </div>

            <h3 className={`text-xl font-bold mb-2 ${isDiamond || isGold ? 'text-[#D4AF37]' : 'text-white'}`}>{title}</h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="mb-8">
                <span className="text-3xl font-serif font-bold text-white">{price}</span>
                <span className="text-gray-500 text-sm">{period}</span>
            </div>

            <div className="flex-1 space-y-4 mb-8">
                {features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                        <Check size={16} className={`mt-0.5 ${isDiamond ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-300">{feat}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={onClick}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isDiamond ? 'bg-[#D4AF37] text-[#0F172A] hover:bg-white' :
                        'bg-white/10 hover:bg-white hover:text-[#0F172A]'
                    }`}
            >
                Select Plan <ArrowRight size={16} />
            </button>

        </div>
    );
}