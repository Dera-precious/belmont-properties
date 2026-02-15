'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Loader2, ArrowRight, User, Briefcase, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    // --- STATE FOR ROLE SELECTION ---
    const [accountType, setAccountType] = useState<'client' | 'partner'>('client');
    const [profession, setProfession] = useState('');

    // FORM FIELDS
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Determine the final role 
        const finalRole = accountType === 'partner' ? (profession || 'architect') : 'tenant';
        const fullName = `${firstName} ${lastName}`;

        // SIMULATE REGISTRATION
        setTimeout(() => {
            login(email, finalRole as any, fullName);
            router.push('/');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FAFAF9] dark:bg-[#020617] text-[#0F172A] dark:text-white">

            {/* LEFT: VISUAL - LOGO IS NOW BIG AND CENTERED ABOVE TEXT */}
            <div className="hidden md:flex flex-col justify-center items-start p-16 bg-[#0F172A] text-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                {/* BIG LOGO */}
                <div className="relative z-10 mb-8">
                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src="/belmont-logo-gold.png"
                            alt="Belmont Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-serif font-bold tracking-[0.2em] text-[#D4AF37]">BELMONT</h1>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">Join the ecosystem.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">Connect with elite architects, secure suppliers, and verified buyers in one unified platform.</p>
                </div>

                <div className="absolute bottom-12 left-16 z-10 text-xs text-gray-600 font-mono">
                    © 2026 Belmont Digital City.
                </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="flex items-center justify-center p-8 transition-colors animate-in fade-in duration-700">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                        <p className="text-gray-500 dark:text-gray-400">Choose your profile type to get started.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">

                        {/* 1. ACCOUNT TYPE SELECTOR */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setAccountType('client')}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${accountType === 'client' ? 'border-[#0F172A] bg-[#0F172A]/5 dark:bg-white/5 dark:border-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accountType === 'client' ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'bg-gray-100 text-gray-500'}`}>
                                    <User size={20} />
                                </div>
                                <div className="text-center">
                                    <span className="block font-bold text-sm">Client</span>
                                    <span className="text-[10px] text-gray-500">Buyer / Tenant</span>
                                </div>
                                {accountType === 'client' && <div className="absolute top-2 right-2 text-green-500"><CheckCircle2 size={16} /></div>}
                            </button>

                            <button
                                type="button"
                                onClick={() => setAccountType('partner')}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${accountType === 'partner' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accountType === 'partner' ? 'bg-[#D4AF37] text-[#0F172A]' : 'bg-gray-100 text-gray-500'}`}>
                                    <Briefcase size={20} />
                                </div>
                                <div className="text-center">
                                    <span className="block font-bold text-sm">Partner</span>
                                    <span className="text-[10px] text-gray-500">Service Provider</span>
                                </div>
                            </button>
                        </div>

                        {/* 2. CONDITIONAL INPUT: PROFESSION DROPDOWN */}
                        {accountType === 'partner' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-xs font-bold uppercase text-[#D4AF37] mb-2">Select Your Profession</label>
                                <select
                                    required
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    className="w-full p-4 bg-white dark:bg-[#1E293B] border-2 border-[#D4AF37] rounded-xl outline-none focus:ring-4 focus:ring-[#D4AF37]/20 transition-all font-bold text-[#0F172A] dark:text-white appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Choose Service Type...</option>
                                    <option value="architect">Architect</option>
                                    <option value="lawyer">Property Lawyer</option>
                                    <option value="surveyor">Land Surveyor</option>
                                    <option value="engineer">Structural Engineer</option>
                                    <option value="agent">Real Estate Agent</option>
                                    <option value="supplier">Material Supplier</option>
                                </select>
                            </div>
                        )}

                        {/* 3. STANDARD FIELDS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">First Name</label>
                                <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-4 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#0F172A] dark:focus:border-white transition-all" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Last Name</label>
                                <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-4 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#0F172A] dark:focus:border-white transition-all" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#0F172A] dark:focus:border-white transition-all" required />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Create Password</label>
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#0F172A] dark:focus:border-white transition-all" required />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500">
                        Already have an account? <Link href="/login" className="font-bold text-[#D4AF37] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}