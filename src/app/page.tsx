'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
    Building2, Users, ArrowRight, Shield,
    Plus, HardHat, TrendingUp, MapPin, Edit2, X, Check,
    UploadCloud, Link as LinkIcon, GraduationCap, Scale, Loader2
} from 'lucide-react';

export default function Home() {
    const { user, updateListing } = useAuth();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    // SECURITY CHECK: Redirect to Login if no user found
    useEffect(() => {
        if (isMounted && !user) {
            router.push('/login');
        }
    }, [isMounted, user, router]);

    // Show Loading while checking
    if (!isMounted || !user) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
            </div>
        );
    }

    // --- CRASH FIX: SAFETY CHECKS ADDED BELOW ---
    // We use "?" to check if data exists before trying to read it.
    const userName = user?.name ? user.name.split(' ')[0] : 'Guest';
    const userTier = user?.tier || 'Free';
    const myListings = user?.myListings || [];

    // EDITING STATE
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [editImageMode, setEditImageMode] = useState<'upload' | 'link'>('upload');
    const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
    const [viewingItem, setViewingItem] = useState<any | null>(null);

    useEffect(() => {
        if (editingItem) {
            setEditPreviewUrl(editingItem.image);
            setEditImageMode('upload');
        }
    }, [editingItem]);

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) setEditPreviewUrl(url);
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

            {/* HERO */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* 1. Upload Property */}
                    <Link href="/upload" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">Upload Property</h3>
                                <p className="text-[10px] text-gray-500">List on Market</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                            <ArrowRight size={12} />
                        </div>
                    </Link>

                    {/* 2. War Room */}
                    <Link href="/collab" className="group bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center text-[#D4AF37]"><HardHat size={20} /></div><div><h3 className="font-bold text-sm text-[#0F172A] dark:text-white">War Room</h3><p className="text-[10px] text-gray-500">Project Management</p></div></div>
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
                            <div
                                key={item.id}
                                onClick={() => setViewingItem(item)} // TRIGGER "RISE UP" EFFECT
                                className="group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative cursor-pointer"
                            >
                                {/* EDIT BUTTON */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setEditingItem(item); }}
                                    className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#D4AF37] transition-colors shadow-sm"
                                >
                                    <Edit2 size={16} />
                                </button>

                                <div className="h-48 w-full overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
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
                        {/* Edit Form */}
                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Title</label><input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Price</label><input type="text" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#D4AF37] font-bold font-serif" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Location</label><input type="text" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                            </div>
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