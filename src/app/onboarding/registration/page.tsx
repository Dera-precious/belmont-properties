'use client';

import React, { useState } from 'react';
import { CheckCircle2, User, Briefcase, ArrowRight, Loader2, CreditCard, Landmark, Lock, Mail, Calendar, Eye, EyeOff, FastForward, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
// CRITICAL FIX: This path points exactly to src/app/context/AuthContext.tsx
import { useAuth } from '../../context/AuthContext';

export default function RegistrationGate() {
    const router = useRouter();
    const { login } = useAuth();

    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        age: '',
        role: 'client' as 'client' | 'provider'
    });

    const [planType, setPlanType] = useState<'entry' | 'lifetime'>('lifetime');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
    const [showPassword, setShowPassword] = useState(false);

    const getPrice = () => {
        if (formData.role === 'provider') return 15000;
        return planType === 'lifetime' ? 10000 : 2000;
    };

    const isPasswordValid = (pwd: string) => {
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSymbol = /[\W_]/.test(pwd);
        const isLongEnough = pwd.length >= 8;
        return hasUpper && hasLower && hasNumber && hasSymbol && isLongEnough;
    };

    const handleNext = () => {
        if (!formData.fullName || !formData.email || !formData.age) return alert("Please fill all fields");
        if (!isPasswordValid(formData.password)) return;
        setStep(2);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => { finalizeLogin(); }, 2500);
    };

    const handleSkip = () => {
        finalizeLogin();
    };

    const finalizeLogin = () => {
        setIsProcessing(false);
        const systemRole = formData.role === 'provider' ? 'architect' : 'tenant';

        login(formData.email, systemRole, formData.fullName);

        if (formData.role === 'client' && planType === 'entry') {
            router.push('/');
        } else {
            router.push('/pricing');
        }
    };

    const clientFeatures = ["Access Verified Agents", "Connect with Landlords", "Browse Exclusive Listings", "Basic Identity Verification"];
    const providerFeatures = ["Verified Professional Badge", "Access to 'War Room' Collab", "Legal Document Generator", "AI Architectural Analysis"];

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4 font-sans">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
                <div className="bg-[#0F172A] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-serif mb-2 text-[#D4AF37]">Official Registration</h1>
                        <p className="text-gray-400">Step {step} of 2: {step === 1 ? 'Identity' : 'Activation'}</p>
                        <div className="mt-12 space-y-6">
                            {(formData.role === 'client' ? clientFeatures : providerFeatures).map((text, i) => <FeatureItem key={i} text={text} />)}
                        </div>
                    </div>
                    <div className="mt-12 relative z-10">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-2">Total Due Today</p>
                            <p className="text-3xl font-serif">₦{getPrice().toLocaleString()}</p>
                            <p className="text-xs text-gray-400 mt-1">{formData.role === 'provider' ? 'Service Provider License' : (planType === 'lifetime' ? 'Lifetime Access' : 'Single Entry Pass')}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 lg:p-12 bg-white overflow-y-auto text-[#0F172A]">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold">Create your Profile</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <RoleCard icon={<User />} label="Client" active={formData.role === 'client'} onClick={() => setFormData({ ...formData, role: 'client' })} />
                                <RoleCard icon={<Briefcase />} label="Provider" active={formData.role === 'provider'} onClick={() => setFormData({ ...formData, role: 'provider' })} />
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputBox icon={<User size={18} />} placeholder="Full Name" value={formData.fullName} onChange={(e: any) => setFormData({ ...formData, fullName: e.target.value })} />
                                    <InputBox icon={<Calendar size={18} />} placeholder="Age" type="number" value={formData.age} onChange={(e: any) => setFormData({ ...formData, age: e.target.value })} />
                                </div>
                                <InputBox icon={<Mail size={18} />} placeholder="Email Address" type="email" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
                                <div className="relative">
                                    <InputBox icon={<Lock size={18} />} placeholder="Password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e: any) => setFormData({ ...formData, password: e.target.value })} />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-[#0F172A]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                                </div>
                                {formData.password && <div className={`text-xs mt-2 flex items-center gap-1 ${isPasswordValid(formData.password) ? 'text-green-600' : 'text-red-500'}`}>{isPasswordValid(formData.password) ? <Check size={12} /> : <X size={12} />} {isPasswordValid(formData.password) ? "Secure Password" : "Must have 8+ chars, Upper, Lower, Number & Symbol"}</div>}
                            </div>
                            <button onClick={handleNext} className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1e293b] transition-all">Continue to Payment <ArrowRight size={18} /></button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-400 hover:text-[#0F172A] mb-2">← BACK TO DETAILS</button>
                            <h2 className="text-2xl font-bold">Select Access Level</h2>
                            {formData.role === 'client' && <div className="space-y-3"><RadioOption label="Single Entry (7 Days)" price="₦2,000" selected={planType === 'entry'} onClick={() => setPlanType('entry')} /><RadioOption label="Lifetime Membership" price="₦10,000" selected={planType === 'lifetime'} onClick={() => setPlanType('lifetime')} highlight /></div>}
                            {formData.role === 'provider' && <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 text-sm font-bold">Provider License Required</div>}
                            <button onClick={handlePayment} disabled={isProcessing} className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all mt-8">{isProcessing ? <Loader2 className="animate-spin" /> : `Pay ₦${getPrice().toLocaleString()}`}</button>
                            <button onClick={handleSkip} className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"><FastForward size={16} /> Skip Payment (Demo Mode)</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) { return <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]"><CheckCircle2 size={14} /></div><span className="text-sm font-medium">{text}</span></div>; }
function RoleCard({ icon, label, active, onClick }: any) { return <div onClick={onClick} className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-2 transition-all ${active ? 'border-[#0F172A] bg-[#0F172A] text-white' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>{icon}<span className="text-sm font-bold">{label}</span></div>; }
function InputBox({ icon, ...props }: any) { return <div className="relative"><div className="absolute left-3 top-3.5 text-gray-400">{icon}</div><input {...props} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-sm text-[#0F172A]" /></div>; }
function RadioOption({ label, price, selected, onClick, highlight }: any) { return <div onClick={onClick} className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${selected ? 'border-[#D4AF37] bg-white shadow-md' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}><div className="flex items-center gap-3"><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#D4AF37]' : 'border-gray-300'}`}>{selected && <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />}</div><span className={`text-sm ${selected ? 'font-bold text-[#0F172A]' : 'text-gray-500'}`}>{label}</span></div><div className="flex items-center gap-2">{highlight && <span className="text-[10px] font-bold bg-[#D4AF37] text-[#0F172A] px-2 py-0.5 rounded-full">BEST</span>}<span className="font-serif font-bold text-[#0F172A]">{price}</span></div></div>; }