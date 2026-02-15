'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (email && password.length >= 6) {
                login(email, 'tenant', 'Returning User');
                router.push('/');
            } else {
                setError('Invalid credentials. Password must be 6+ chars.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4 font-sans text-[#0F172A]">

            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px] animate-in fade-in duration-500">

                {/* LEFT: VISUALS */}
                <div className="hidden md:flex w-1/2 bg-[#0F172A] relative flex-col justify-center items-start p-12 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 mb-8">
                        {/* BIG LOGO */}
                        <div className="relative w-24 h-24 mb-4">
                            <Image
                                src="/belmont-logo-gold.png"
                                alt="Belmont Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-serif font-bold text-xl tracking-widest text-[#D4AF37]">BELMONT</span>
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-serif leading-tight mb-4">Welcome Back to Excellence.</h1>
                        <p className="text-sm text-gray-400">&quot;The only real estate OS you will ever need.&quot;</p>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#0F172A]">Sign In</h2>
                        <p className="text-gray-500 text-sm mt-1">Access your dashboard, listings, and contracts.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-sm text-[#0F172A]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                                <button type="button" className="text-xs font-bold text-[#D4AF37] hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-sm text-[#0F172A]" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-[#0F172A]">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-lg flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1e293b] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-bold text-[#D4AF37] hover:underline">Create Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}