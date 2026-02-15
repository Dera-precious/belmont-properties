'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale, FileText, Lock, Download, CheckCircle2,
    ArrowLeft, Loader2, PenTool, Printer, Shield,
    Users, MessageSquare, Star, Clock, Briefcase
} from 'lucide-react';

export default function LegalHub() {
    const { user } = useAuth();

    // VIEW STATE: 'documents' | 'lawyers' | 'editor'
    const [activeTab, setActiveTab] = useState<'documents' | 'lawyers'>('documents');
    const [editorOpen, setEditorOpen] = useState(false);

    // --- LAWYER DIRECTORY DATA ---
    const lawyers = [
        { id: 1, name: "Barr. Chidem K.", firm: "Legal Shield Partners", specialty: "Property Law", rate: "₦50k/hr", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" },
        { id: 2, name: "Barr. Tunde Cole", firm: "Cole & Associates", specialty: "Commercial Leasing", rate: "₦75k/hr", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" },
        { id: 3, name: "Barr. Aisha Bello", firm: "Abuja Land Consult", specialty: "Land Titles (C of O)", rate: "₦60k/hr", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop" },
    ];

    // --- DOCUMENT DATA ---
    const documents = [
        {
            id: 1, title: "Standard Tenancy Agreement",
            desc: "Interactive editor. Customize landlord & tenant details.",
            type: "Residential", tiers: ['Free', 'Pro', 'Premium', 'Gold', 'Diamond']
        },
        {
            id: 2, title: "Non-Disclosure Agreement (NDA)",
            desc: "Protect your property data during negotiations.",
            type: "Corporate", tiers: ['Pro', 'Premium', 'Gold', 'Diamond']
        },
        {
            id: 3, title: "Commercial Lease Contract",
            desc: "For office spaces, retail, and warehouses.",
            type: "Commercial", tiers: ['Gold', 'Diamond']
        },
        {
            id: 4, title: "Joint Venture Agreement",
            desc: "Complex developer & landowner partnership.",
            type: "Development", tiers: ['Diamond']
        }
    ];

    // --- HUB STATES ---
    const [generating, setGenerating] = useState<string | null>(null);
    const [completed, setCompleted] = useState<string | null>(null);

    // --- EDITOR STATES ---
    const [isDrafting, setIsDrafting] = useState(false);
    const [hasDraft, setHasDraft] = useState(false);
    const [landlord, setLandlord] = useState('');
    const [tenant, setTenant] = useState('');
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');

    // --- ACCESS LOGIC ---
    const hasAccess = (requiredTier: string[]) => {
        if (!user) return false;
        if (user.tier === 'Diamond') return true;
        return requiredTier.includes(user.tier);
    };

    // --- HANDLERS ---
    const handleCardClick = (doc: any) => {
        if (!hasAccess(doc.tiers)) return;
        if (doc.title === "Standard Tenancy Agreement") {
            setEditorOpen(true);
            return;
        }
        setGenerating(doc.title);
        setTimeout(() => {
            setGenerating(null);
            setCompleted(doc.title);
            setTimeout(() => setCompleted(null), 3000);
        }, 2000);
    };

    const handleDraft = () => {
        if (!landlord || !tenant) return;
        setIsDrafting(true);
        setHasDraft(false);
        setTimeout(() => {
            setIsDrafting(false);
            setHasDraft(true);
        }, 2500);
    };

    // ==========================================
    // VIEW 1: THE EDITOR (If Open)
    // ==========================================
    if (editorOpen) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans flex flex-col transition-colors duration-500">
                {/* HEADER */}
                <header className="h-16 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-[#1E293B] z-10 sticky top-0 transition-colors">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setEditorOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-[#0F172A] dark:text-white">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <Shield className="text-[#D4AF37]" size={20} />
                            <h1 className="font-serif font-bold text-lg">Legal Shield Editor</h1>
                        </div>
                    </div>
                </header>

                {/* MAIN WORKSPACE (Your Editor Code) */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden md:overflow-hidden overflow-y-auto">
                    {/* LEFT PANEL: Inputs */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] p-6 md:p-8 overflow-y-auto flex flex-col h-auto md:h-full shrink-0 transition-colors">
                        <div className="mb-8">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-900 dark:text-blue-400 mb-4"><PenTool size={24} /></div>
                            <h2 className="text-2xl font-serif mb-2">Contract Drafter</h2>
                            <p className="text-gray-400 text-sm">Auto-generate legally binding agreements in seconds.</p>
                        </div>
                        <div className="space-y-6 flex-1">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Document Type</label>
                                <select disabled className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none text-[#0F172A] dark:text-white opacity-60 cursor-not-allowed">
                                    <option>Tenancy Agreement</option>
                                </select>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-gray-100 dark:border-gray-700 space-y-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Agreement Details</p>
                                <input type="text" placeholder="Landlord Full Name" value={landlord} onChange={(e) => setLandlord(e.target.value)} className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" />
                                <input type="text" placeholder="Tenant Full Name" value={tenant} onChange={(e) => setTenant(e.target.value)} className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" />
                                <input type="text" placeholder="Property Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" />
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400">₦</span>
                                    <input type="number" placeholder="Annual Rent Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 pl-8 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleDraft} disabled={isDrafting || !landlord || !tenant} className="w-full mt-8 py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {isDrafting ? (<> <Loader2 size={20} className="animate-spin" /> Drafting Clauses... </>) : (<> <FileText size={20} /> Generate Agreement </>)}
                        </button>
                    </div>

                    {/* RIGHT PANEL: Preview */}
                    <div className="w-full md:w-2/3 bg-gray-100 dark:bg-black p-6 md:p-8 flex items-center justify-center overflow-y-auto relative min-h-[600px] md:min-h-full transition-colors">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full md:w-[595px] min-h-[600px] md:min-h-[842px] shadow-2xl p-8 md:p-12 relative text-[10px] leading-relaxed text-justify text-gray-800 font-serif">
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"><Shield size={300} /></div>
                            {!hasDraft && !isDrafting ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4"><FileText size={64} /><p className="font-sans text-sm text-center">Enter details to generate a draft</p></div>
                            ) : (
                                <div className={isDrafting ? 'blur-sm transition-all' : ''}>
                                    <div className="text-center mb-8 border-b-2 border-[#0F172A] pb-4"><h1 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">TENANCY AGREEMENT</h1><p className="text-gray-500 font-sans text-xs">Prepared by Belmont Legal Shield AI</p></div>
                                    <div className="space-y-4 text-xs">
                                        <p><strong>THIS TENANCY AGREEMENT</strong> is made this <span className="underline">{new Date().toLocaleDateString()}</span> BETWEEN:</p>
                                        <p><strong>{landlord || "_________________"}</strong> (Hereinafter referred to as the "LANDLORD") of the one part;</p>
                                        <p>AND</p>
                                        <p><strong>{tenant || "_________________"}</strong> (Hereinafter referred to as the "TENANT") of the other part.</p>
                                        <p className="mt-4"><strong>WHEREAS:</strong><br />The Landlord is the owner of the property known as <strong>{address || "_________________"}</strong>.</p>
                                        <p><strong>IT IS HEREBY AGREED AS FOLLOWS:</strong></p>
                                        <ol className="list-decimal pl-8 space-y-2">
                                            <li>The Landlord lets and the Tenant takes the property for a period of <strong>1 YEAR</strong> commencing on <strong>{new Date().toLocaleDateString()}</strong>.</li>
                                            <li>The Rent payable is the sum of <strong>₦{amount || "_______"}</strong> per annum.</li>
                                            <li>The Tenant shall keep the interior of the premises in good and tenantable repair.</li>
                                            <li>The Tenant shall not sublet the premises without written consent.</li>
                                        </ol>
                                        <div className="mt-16 flex justify-between gap-4"><div className="text-center w-1/2"><div className="w-full h-0.5 bg-gray-300 mb-2"></div><p>Signed by Landlord</p></div><div className="text-center w-1/2"><div className="w-full h-0.5 bg-gray-300 mb-2"></div><p>Signed by Tenant</p></div></div>
                                    </div>
                                    {hasDraft && <motion.div initial={{ scale: 2, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} className="absolute bottom-12 right-12 md:bottom-24 md:right-24 border-4 border-green-600 text-green-600 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center font-bold text-center p-2 opacity-80"><div className="border border-green-600 rounded-full w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center"><CheckCircle2 size={24} /><span className="text-[8px] md:text-[10px] uppercase mt-1">Belmont Legal</span><span className="text-xs md:text-sm font-black">VERIFIED</span><span className="text-[8px]">{new Date().toLocaleDateString()}</span></div></motion.div>}
                                </div>
                            )}
                            {isDrafting && <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20"><div className="bg-[#0F172A] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl"><PenTool size={18} className="animate-bounce" /><span>Writing Clauses...</span></div></div>}
                        </motion.div>
                        {hasDraft && <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-8"><button className="px-8 py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"><Printer size={18} /> Print Agreement</button></motion.div>}
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // VIEW 2: THE HUB (Tabs for Documents / Lawyers)
    // ==========================================
    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-8 font-sans transition-colors duration-500 pb-32">

            {/* HEADER SECTION */}
            <div className="max-w-6xl mx-auto mb-12">
                <Link href="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} /> Back to Hub
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
                            <Scale size={32} />
                            <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">Legal Hub</h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                            Generate contracts or hire verified property lawyers.
                        </p>
                    </div>

                    {/* TAB SWITCHER */}
                    <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('documents')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'documents' ? 'bg-white dark:bg-[#1E293B] shadow text-[#0F172A] dark:text-white' : 'text-gray-500'}`}
                        >
                            Documents
                        </button>
                        <button
                            onClick={() => setActiveTab('lawyers')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'lawyers' ? 'bg-white dark:bg-[#1E293B] shadow text-[#0F172A] dark:text-white' : 'text-gray-500'}`}
                        >
                            Hire Lawyer
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-6xl mx-auto">

                {/* TAB 1: DOCUMENT GENERATOR */}
                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {documents.map((doc) => {
                            const locked = !hasAccess(doc.tiers);
                            return (
                                <div key={doc.id} className={`p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${locked ? 'bg-gray-50 dark:bg-[#1E293B]/50 border-gray-200 dark:border-gray-800 opacity-70' : 'bg-white dark:bg-[#1E293B] border-gray-100 dark:border-gray-700 shadow-lg hover:border-[#D4AF37]'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${locked ? 'bg-gray-200 text-gray-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
                                            {doc.type}
                                        </div>
                                        {locked && <Lock size={20} className="text-gray-400" />}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 h-10">{doc.desc}</p>

                                    {locked ? (
                                        <Link href="/pricing" className="w-full py-4 rounded-xl font-bold bg-gray-200 dark:bg-gray-800 text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">
                                            Upgrade to Unlock
                                        </Link>
                                    ) : (
                                        <button onClick={() => handleCardClick(doc)} disabled={generating === doc.title} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all ${completed === doc.title ? 'bg-green-600' : 'bg-[#0F172A] dark:bg-white dark:text-[#0F172A] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-white'}`}>
                                            {generating === doc.title ? (<><Loader2 className="animate-spin" /> Generating...</>) : completed === doc.title ? (<><CheckCircle2 /> Download Ready</>) : (
                                                doc.title === "Standard Tenancy Agreement" ? <><PenTool size={18} /> Open Editor</> : <><FileText size={18} /> Generate Document</>
                                            )}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* TAB 2: LAWYER DIRECTORY */}
                {activeTab === 'lawyers' && (
                    <div className="space-y-6">
                        {/* ASK A LAWYER BANNER */}
                        <div className="bg-[#D4AF37] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                            <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
                                <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-2 flex items-center gap-2 justify-center md:justify-start">
                                    <MessageSquare size={28} /> Ask AI Lawyer
                                </h2>
                                <p className="text-[#0F172A]/80 text-sm font-bold">Get instant answers to property law questions.</p>
                            </div>
                            <button className="relative z-10 px-8 py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                                Start Chat (Beta)
                            </button>
                        </div>

                        {/* LAWYER GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {lawyers.map(lawyer => (
                                <div key={lawyer.id} className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="h-48 bg-gray-200 relative">
                                        <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-[#0F172A] dark:text-white">{lawyer.name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{lawyer.firm}</p>
                                        <div className="flex justify-between items-center text-sm font-medium mb-6">
                                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300"><Briefcase size={14} className="text-[#D4AF37]" /> {lawyer.specialty}</span>
                                            <span className="flex items-center gap-1 text-[#0F172A] dark:text-white font-bold"><Clock size={14} className="text-gray-400" /> {lawyer.rate}</span>
                                        </div>
                                        <button className="w-full py-3 border border-[#0F172A] dark:border-white text-[#0F172A] dark:text-white rounded-xl font-bold hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">
                                            Book Consultation
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}