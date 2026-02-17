'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    // STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // HANDLE REAL LOGIN
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            // 1. ASK SUPABASE IF USER EXISTS
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                throw new Error("Invalid email or password.");
            }

            // 2. GET USER DETAILS
            const userMeta = data.user.user_metadata;

            // 3. LOGIN LOCALLY (NOW WITH TIER)
            login(
                email,
                userMeta.role || 'tenant',
                userMeta.full_name || 'User',
                userMeta.tier || 'Free' // <--- ADDED 4TH ARGUMENT
            );

            // 4. REDIRECT TO TENANT HOME
            router.push('/tenant');

        } catch (error: any) {
            console.error("Login Error:", error.message);
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#020617] text-[#0F172A] dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors">

            {/* BACKGROUND GLOWS */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* LOGIN CARD */}
            <div className="w-full max-w-md bg-white dark:bg-[#0F172A] p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* LOGO AREA */}
                <div className="text-center mb-8">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                            src="/belmont-logo-gold.png"
                            alt="Belmont"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-[#D4AF37]">BELMONT</h1>
                    <p className="text-xs tracking-widest text-gray-400 uppercase mt-1">Digital City</p>
                </div>

                {/* ERROR ALERT */}
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span className="text-sm font-bold">{errorMsg}</span>
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] dark:focus:border-white transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                            <Link href="/forgot-password" className="text-xs font-bold text-[#D4AF37] hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] dark:focus:border-white transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Sign In"} <ArrowRight size={20} />
                    </button>

                </form>

                <div className="text-center text-sm text-gray-500 mt-8">
                    Don't have an account? <Link href="/signup" className="font-bold text-[#0F172A] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">Create Account</Link>
                </div>

            </div>
        </div>
    );
}