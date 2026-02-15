'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for Landing Page logo
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
    Building2, Users, ArrowRight, Shield,
    Plus, TrendingUp, MapPin, Edit2, X, Check,
    UploadCloud, Link as LinkIcon, GraduationCap, Loader2,
    Wand2, ShoppingBag, CheckCircle2, Globe, LayoutDashboard
} from 'lucide-react';

export default function Home() {
    // HOOKS
    const { user, updateListing } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    // DASHBOARD STATE (Only used if logged in)
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [editImageMode, setEditImageMode] = useState<'upload' | 'link'>('upload');
    const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
    const [viewingItem, setViewingItem] = useState<any | null>(null);

    useEffect(() => setIsMounted(true), []);

    // EDITING EFFECT
    useEffect(() => {
        if (editingItem) {
            setEditPreviewUrl(editingItem.image);
            setEditImageMode('upload');
        }
    }, [editingItem]);

    // LOADING STATE
    if (!isMounted) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
            </div>
        );
    }

    // =====================================================================================
    // 1. PUBLIC LANDING PAGE (If NOT Logged In)
    // =====================================================================================
    if (!user) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0F172A]">

                {/* NAV */}
                <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto relative z-20">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            <Image src="/belmont-logo-gold.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-serif font-bold text-lg tracking-widest text-[#D4AF37]">BELMONT</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/login" className="px-6 py-2 text-sm font-bold hover:text-[#D4AF37] transition-colors">Log In</Link>
                        <Link href="/signup" className="px-6 py-2 bg-white text-[#0F172A] rounded-full text-sm font-bold hover:bg-[#D4AF37] transition-colors">Get Started</Link>
                    </div>
                </nav>

                {/* HERO SECTION */}
                <header className="relative pt-20 pb-40 px-6 text-center max-w-5xl mx-auto">
                    {/* Background Glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10"></div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        <span className="text-xs font-bold tracking-wide uppercase text-gray-300">The Operating System for African Real Estate</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                        Build your legacy <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">precision.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        Connect with elite architects, secure verified supplies, and manage your property portfolio on one unified platform.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <Link href="/signup" className="px-10 py-4 bg-[#D4AF37] text-[#0F172A] font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                            Start Building
                        </Link>
                        <Link href="/login" className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-colors">
                            View Demo
                        </Link>
                    </div>

                    {/* SOCIAL PROOF */}
                    <div className="mt-20 pt-10 border-t border-white/5 animate-in fade-in duration-1000 delay-700">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Trusted By Industry Leaders</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xl font-serif font-bold">Jenew Homes</span>
                            <span className="text-xl font-serif font-bold">Lekki Gardens</span>
                            <span className="text-xl font-serif font-bold">Eko Atlantic</span>
                            <span className="text-xl font-serif font-bold">Vantage</span>
                        </div>
                    </div>
                </header>

                {/* FEATURE GRID */}
                <section className="py-32 bg-[#020617] relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: ShoppingBag, title: "Supply Depot", desc: "Source verified materials directly from manufacturers." },
                                { icon: Shield, title: "Trust Center", desc: "Book MOPOL escorts and verify land titles instantly." },
                                { icon: Wand2, title: "AI Architect", desc: "Generate construction blueprints in seconds with AI." },
                            ].map((feature, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-[#0F172A] border border-white/5 hover:border-[#D4AF37]/50 transition-colors group">
                                    <div className="w-14 h-14 bg-[#020617] rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-24 text-center px-6">
                    <h2 className="text-4xl font-serif font-bold mb-8">Ready to modernize your workflow?</h2>
                    <Link href="/signup" className="inline-flex items-center gap-2 px-12 py-5 bg-white text-[#0F172A] font-bold text-xl rounded-full hover:bg-gray-100 transition-colors">
                        Get Started Now <ArrowRight size={20} />
                    </Link>
                </section>

            </div>
        );
    }

    // =====================================================================================
    // 2. DASHBOARD (If Logged In) - Your Existing Code
    // =====================================================================================
    const userName = user.name ? user.name.split(' ')[0] : 'Guest';
    const userTier = user.tier || 'Free';
    const myListings = user.myListings || [];

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setEditPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleEditUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) setEditPreviewUrl(e.target.value);
    };

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            updateListing(editingItem.id, {
                title: editingItem.title,
                price: editingItem.price,
                location: editingItem.location,
                description: editingItem.description,
                image: editPreviewUrl || editingItem.image
            });
            setEditingItem(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] font-sans transition-colors duration-500 pb-32">

            {/* DASHBOARD HERO */}
            <div className="bg-[#0F172A] text-white p-8 md:p-12 pb-24 md:pb-32 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <p className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-2">Welcome Back</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hello, {userName}.</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Shield size={14} /><span>Status: <span className="text-white font-bold">{userTier} Tier</span></span>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {/* 1. Upload Property */}
                    <Link href="/upload" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400"><Plus size={20} /></div>
                            <div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">Upload Property</h3><p className="text-[10px] text-gray-500">List on Market</p></div>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors"><ArrowRight size={12} /></div>
                    </Link>

                    {/* 2. AI Architect */}
                    <Link href="/plan" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center text-[#D4AF37]"><Wand2 size={20} /></div>
                            <div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">AI Architect</h3><p className="text-[10px] text-gray-500">Generate Blueprints</p></div>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors"><ArrowRight size={12} /></div>
                    </Link>

                    {/* 3. Find Mentor */}
                    <Link href="/mentorship" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400"><GraduationCap size={20} /></div><div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">Find Mentor</h3><p className="text-[10px] text-gray-500">Expert Guidance</p></div></div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors"><ArrowRight size={12} /></div>
                    </Link>

                    {/* 4. Trust Center */}
                    <Link href="/services" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400"><Shield size={20} /></div><div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">Trust Center</h3><p className="text-[10px] text-gray-500">Book Security</p></div></div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors"><ArrowRight size={12} /></div>
                    </Link>

                    {/* 5. SUPPLY DEPOT */}
                    <Link href="/supplies" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400"><ShoppingBag size={20} /></div>
                            <div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">Supplies</h3><p className="text-[10px] text-gray-500">Materials Market</p></div>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors"><ArrowRight size={12} /></div>
                    </Link>
                </div>
            </div>

            {/* MY LISTINGS GRID */}
            {myListings.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-[#0F172A] dark:text-white flex items-center gap-2"><Building2 size={18} /> My Recent Listings</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myListings.map((item) => (
                            <div key={item.id} onClick={() => setViewingItem(item)} className="group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative cursor-pointer">
                                <button onClick={(e) => { e.stopPropagation(); setEditingItem(item); }} className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#D4AF37] transition-colors shadow-sm"><Edit2 size={16} /></button>
                                <div className="h-48 w-full overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                                <div className="p-5">
                                    <h4 className="font-bold text-lg text-[#0F172A] dark:text-white line-clamp-1 mb-1">{item.title}</h4>
                                    <p className="text-[#D4AF37] font-serif font-bold text-xl mb-3">{item.price}</p>
                                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 font-medium"><MapPin size={12} /> {item.location}</p>
                                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{item.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- VIEW MODAL --- */}
            {viewingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setViewingItem(null)}></div>
                    <div className="relative bg-white dark:bg-[#1E293B] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <button onClick={() => setViewingItem(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"><X size={20} /></button>
                        <div className="h-64 w-full relative"><img src={viewingItem.image} alt={viewingItem.title} className="w-full h-full object-cover" /></div>
                        <div className="p-8">
                            <h2 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white mb-1">{viewingItem.title}</h2>
                            <p className="text-[#D4AF37] font-bold text-xl mb-4">{viewingItem.price}</p>
                            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">{viewingItem.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in duration-300 max-h-[95vh] overflow-y-auto font-sans">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">Edit Property</h3>
                            <button onClick={() => setEditingItem(null)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"><X size={20} /></button>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Property Image</label>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-4">
                                <button onClick={() => setEditImageMode('upload')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${editImageMode === 'upload' ? 'bg-white dark:bg-[#0F172A] shadow-sm text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Device Upload</button>
                                <button onClick={() => setEditImageMode('link')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${editImageMode === 'link' ? 'bg-white dark:bg-[#0F172A] shadow-sm text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Image Link</button>
                            </div>
                            <div className="aspect-video bg-gray-50 dark:bg-[#0F172A] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group">
                                {editPreviewUrl ? (
                                    <><img src={editPreviewUrl} alt="Preview" className="w-full h-full object-cover" /><button onClick={() => setEditPreviewUrl(null)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button></>
                                ) : (
                                    <div className="text-center p-6">
                                        {editImageMode === 'upload' ? (
                                            <><UploadCloud size={32} className="text-gray-300 mx-auto mb-2" /><p className="text-xs font-bold text-gray-500">Click to change image</p><input type="file" accept="image/*" onChange={handleEditFileChange} className="absolute inset-0 opacity-0 cursor-pointer" /></>
                                        ) : (
                                            <><LinkIcon size={32} className="text-gray-300 mx-auto mb-2" /><input type="text" placeholder="Paste image URL..." onBlur={handleEditUrlBlur} className="w-full p-2 text-xs bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-center outline-none focus:border-[#D4AF37]" /></>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Title</label><input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Price</label><input type="text" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#D4AF37] font-bold font-serif" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Location</label><input type="text" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Description</label><textarea rows={4} value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white resize-none" /></div>
                            <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"><Check size={18} /> Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {/* STATS */}
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm"><div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase"><Building2 size={14} /> Active Listings</div><p className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white">{24 + myListings.length}</p></div>
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm"><div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase"><Users size={14} /> Collaborators</div><p className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white">12</p></div>
                <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm"><div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase"><TrendingUp size={14} /> Market Trend</div><p className="text-3xl font-serif font-bold text-green-500">+8.4%</p></div>
            </div>
        </div>
    );
}