'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Star, Clock, Calendar, Lock,
    CheckCircle2, ArrowLeft, Video, Shield, Play,
    Loader2, CalendarCheck, Users
} from 'lucide-react';

export default function MentorshipPage() {
    const { user } = useAuth();

    // TRACKING WHICH MENTOR IS BEING BOOKED
    const [bookingState, setBookingState] = useState<{ [key: number]: string }>({});

    // ACCESS LOGIC
    const canBookStandard = user?.tier === 'Gold' || user?.tier === 'Diamond' || user?.tier === 'Premium';
    const canBookDiamond = user?.tier === 'Diamond';

    const mentors = [
        {
            id: 1,
            name: "Arc. Ifeanyi O.",
            role: "Senior Architect",
            company: "BuildRight Ltd.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
            specialty: "Design & Approvals",
            price: "₦50k/session",
            exclusive: false
        },
        {
            id: 2,
            name: "Barr. Chidem K.",
            role: "Property Lawyer",
            company: "Legal Shield",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
            specialty: "Land Titles & C of O",
            price: "₦75k/session",
            exclusive: false
        },
        {
            id: 3,
            name: "Chief Adebayo",
            role: "Real Estate Mogul",
            company: "Lekki Gardens",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            specialty: "Investment Strategy",
            price: "Exclusive",
            exclusive: true // DIAMOND ONLY
        },
        {
            id: 4,
            name: "Mrs. Folake A.",
            role: "Interior Designer",
            company: "Luxe Spaces",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
            specialty: "Luxury Finishing",
            price: "₦40k/session",
            exclusive: false
        }
    ];

    // ANIMATED BOOKING LOGIC
    const handleBook = (id: number) => {
        if (bookingState[id] === 'booked') return;

        // 1. Checking
        setBookingState(prev => ({ ...prev, [id]: 'checking' }));

        // 2. Booking (after 1.5s)
        setTimeout(() => {
            setBookingState(prev => ({ ...prev, [id]: 'booking' }));
        }, 1500);

        // 3. Booked (after another 1.5s)
        setTimeout(() => {
            setBookingState(prev => ({ ...prev, [id]: 'booked' }));
            // Reset after 3s
            setTimeout(() => {
                setBookingState(prev => ({ ...prev, [id]: 'idle' }));
            }, 3000);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans pb-32 transition-colors duration-500">

            {/* HEADER */}
            <div className="p-8 pb-0 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} /> Back to Hub
                </Link>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">Belmont Academy</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">Learn from the Titans of Real Estate</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold shadow-sm">
                        <BookOpen size={16} className="text-[#D4AF37]" /> My Courses
                    </div>
                </div>
            </div>

            <div className="p-8 pt-0 space-y-12 max-w-7xl mx-auto">

                {/* 1. FEATURED MASTERCLASS (From Your Code) */}
                <section className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop")' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-10 max-w-2xl text-white">
                        <span className="px-3 py-1 bg-[#D4AF37] text-[#0F172A] text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block">New Release</span>
                        <h2 className="text-4xl font-serif mb-4 leading-tight">The Art of Negotiation: Closing 9-Figure Deals</h2>
                        <p className="text-gray-300 mb-6 line-clamp-2">Learn the psychological tactics used by billionaire developers to secure prime land at 30% below market value.</p>
                        <button className="px-8 py-3 bg-white text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:bg-[#D4AF37] transition-colors shadow-lg">
                            <Play size={18} fill="currentColor" /> Start Masterclass
                        </button>
                    </div>
                </section>

                {/* 2. 1-ON-1 MENTORSHIP (Grid View) */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-serif font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
                            <Users size={24} className="text-[#D4AF37]" /> 1-on-1 Mentorship
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mentors.map((mentor) => {
                            // Lock Logic
                            const isDiamondLocked = mentor.exclusive && !canBookDiamond;
                            const isStandardLocked = !mentor.exclusive && !canBookStandard;
                            const isLocked = isDiamondLocked || isStandardLocked;
                            const status = bookingState[mentor.id] || 'idle';

                            return (
                                <div key={mentor.id} className={`group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border transition-all duration-300 ${isLocked ? 'border-gray-200 dark:border-gray-800 opacity-80' : 'border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] hover:shadow-xl'}`}>

                                    {/* IMAGE */}
                                    <div className="h-48 bg-gray-200 relative">
                                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        {mentor.exclusive && (
                                            <div className="absolute top-4 right-4 bg-black text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37] flex items-center gap-1">
                                                <Shield size={10} fill="currentColor" /> DIAMOND
                                            </div>
                                        )}
                                        {isLocked && (
                                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <Lock size={32} className="text-white/50" />
                                            </div>
                                        )}
                                    </div>

                                    {/* DETAILS */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="font-bold text-lg text-[#0F172A] dark:text-white">{mentor.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.role} @ {mentor.company}</p>
                                        </div>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                <Star size={14} className="text-[#D4AF37]" /> <span>{mentor.specialty}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] dark:text-white">
                                                <Clock size={14} className="text-gray-400" /> <span>{mentor.price}</span>
                                            </div>
                                        </div>

                                        {/* ANIMATED BUTTON */}
                                        {isLocked ? (
                                            <Link href="/pricing">
                                                <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                                    Upgrade to Book
                                                </button>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => handleBook(mentor.id)}
                                                disabled={status === 'booked'}
                                                className={`w-full py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 overflow-hidden ${status === 'booked' ? 'bg-green-600 text-white' : 'bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] hover:opacity-90'}`}
                                            >
                                                <AnimatePresence mode='wait'>
                                                    {status === 'idle' && (
                                                        <motion.span key="idle" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-2">
                                                            <Calendar size={16} /> Book Session
                                                        </motion.span>
                                                    )}
                                                    {status === 'checking' && (
                                                        <motion.span key="checking" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-2">
                                                            <Loader2 size={16} className="animate-spin" /> Checking...
                                                        </motion.span>
                                                    )}
                                                    {status === 'booking' && (
                                                        <motion.span key="booking" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-2">
                                                            <CalendarCheck size={16} /> Confirming...
                                                        </motion.span>
                                                    )}
                                                    {status === 'booked' && (
                                                        <motion.span key="booked" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                                                            <CheckCircle2 size={16} /> Booked!
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. PREMIUM VAULT (From Your Code) */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
                            <Lock size={20} className="text-gray-400" /> Premium Vault
                        </h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">Diamond Tier Only</span>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${canBookDiamond ? '' : 'opacity-60 grayscale'}`}>
                        {['The Land Banking Strategy', 'Government Liaison Contacts', '2026 Market Predictions', 'Importing Materials Duty-Free'].map((item) => (
                            <div key={item} className="bg-gray-50 dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
                                {/* Lock Overlay if not Diamond */}
                                {!canBookDiamond && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-black/50 backdrop-blur-[1px] z-10">
                                        <Lock size={24} className="text-gray-400" />
                                    </div>
                                )}
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full group-hover:bg-[#D4AF37] transition-colors"></div>
                                <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <p className="font-bold text-sm text-[#0F172A] dark:text-white z-0">{item}</p>
                            </div>
                        ))}
                    </div>

                    {!canBookDiamond && (
                        <div className="mt-8 text-center">
                            <Link href="/pricing">
                                <button className="px-8 py-3 border border-[#0F172A] dark:border-white text-[#0F172A] dark:text-white rounded-xl text-sm font-bold hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">
                                    Upgrade to Unlock Vault
                                </button>
                            </Link>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}