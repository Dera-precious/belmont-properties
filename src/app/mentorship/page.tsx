'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Star, Clock, Calendar, Lock,
    CheckCircle2, ArrowLeft, Video, Shield, Play,
    Loader2, Users, Filter, X, FileText, Download, PlayCircle
} from 'lucide-react';

export default function MentorshipPage() {
    const { user } = useAuth();

    // VIEW STATE: 'mentors' | 'resources'
    const [activeTab, setActiveTab] = useState<'mentors' | 'resources'>('mentors');
    const [selectedCategory, setSelectedCategory] = useState("All");

    // BOOKING STATE
    const [selectedMentor, setSelectedMentor] = useState<any>(null); // For Modal
    const [bookingStep, setBookingStep] = useState(1); // 1: Date, 2: Confirm

    // ACCESS LOGIC
    const canBookStandard = user?.tier === 'Gold' || user?.tier === 'Diamond' || user?.tier === 'Premium';
    const canBookDiamond = user?.tier === 'Diamond';

    // --- DATA: MENTORS ---
    const mentors = [
        {
            id: 1, name: "Arc. Ifeanyi O.", role: "Senior Architect", company: "BuildRight Ltd.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
            specialty: "Architecture", price: "₦50k/session", exclusive: false
        },
        {
            id: 2, name: "Barr. Chidem K.", role: "Property Lawyer", company: "Legal Shield",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
            specialty: "Legal", price: "₦75k/session", exclusive: false
        },
        {
            id: 3, name: "Chief Adebayo", role: "Real Estate Mogul", company: "Lekki Gardens",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            specialty: "Business", price: "Exclusive", exclusive: true
        },
        {
            id: 4, name: "Mrs. Folake A.", role: "Interior Designer", company: "Luxe Spaces",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
            specialty: "Design", price: "₦40k/session", exclusive: false
        }
    ];

    // --- DATA: RESOURCES (LIBRARY) ---
    const resources = [
        { id: 1, title: "How to Pass NIA Exams", type: "PDF Guide", size: "2.4 MB", category: "Education" },
        { id: 2, title: "Lagos Land Use Act 2025", type: "PDF Document", size: "1.1 MB", category: "Legal" },
        { id: 3, title: "Building Cheap in Nigeria", type: "Video Masterclass", duration: "45 mins", category: "Construction" },
        { id: 4, title: "The Land Banking Strategy", type: "Exclusive Report", size: "5.0 MB", category: "Investment", exclusive: true },
    ];

    const filteredMentors = selectedCategory === "All"
        ? mentors
        : mentors.filter(m => m.specialty === selectedCategory);

    // --- HANDLERS ---
    const handleBookClick = (mentor: any) => {
        setSelectedMentor(mentor);
        setBookingStep(1);
    };

    const confirmBooking = () => {
        setBookingStep(2); // Show Success Message
        setTimeout(() => {
            setSelectedMentor(null); // Close Modal
            setBookingStep(1); // Reset
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans pb-32 transition-colors duration-500">

            {/* HEADER */}
            <div className="p-8 pb-0 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} /> Back to Hub
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">Belmont Academy</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">Learn from the Titans of Real Estate</p>
                    </div>

                    {/* TAB SWITCHER */}
                    <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('mentors')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'mentors' ? 'bg-white dark:bg-[#1E293B] shadow text-[#0F172A] dark:text-white' : 'text-gray-500'}`}
                        >
                            Find Mentors
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'resources' ? 'bg-white dark:bg-[#1E293B] shadow text-[#0F172A] dark:text-white' : 'text-gray-500'}`}
                        >
                            Resource Library
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8 pt-0 space-y-12 max-w-7xl mx-auto">

                {/* FEATURED MASTERCLASS (Visible on both tabs) */}
                <section className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop")' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 max-w-2xl text-white">
                        <span className="px-3 py-1 bg-[#D4AF37] text-[#0F172A] text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block">New Release</span>
                        <h2 className="text-2xl md:text-4xl font-serif mb-4 leading-tight">The Art of Negotiation</h2>
                        <p className="text-gray-300 mb-6 line-clamp-2 text-sm md:text-base">Learn the psychological tactics used by billionaire developers to secure prime land at 30% below market value.</p>
                        <button className="px-6 md:px-8 py-3 bg-white text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:bg-[#D4AF37] transition-colors shadow-lg text-sm md:text-base">
                            <Play size={18} fill="currentColor" /> Start Masterclass
                        </button>
                    </div>
                </section>

                {/* --- TAB 1: MENTORS --- */}
                {activeTab === 'mentors' && (
                    <section>
                        {/* FILTERS */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {["All", "Architecture", "Legal", "Business", "Design"].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${selectedCategory === cat ? 'bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] border-transparent' : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 hover:border-[#D4AF37]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredMentors.map((mentor) => {
                                const isDiamondLocked = mentor.exclusive && !canBookDiamond;
                                const isStandardLocked = !mentor.exclusive && !canBookStandard;
                                const isLocked = isDiamondLocked || isStandardLocked;

                                return (
                                    <div key={mentor.id} className={`group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border transition-all duration-300 ${isLocked ? 'border-gray-200 dark:border-gray-800 opacity-80' : 'border-gray-100 dark:border-gray-700 hover:border-[#D4AF37] hover:shadow-xl'}`}>
                                        <div className="h-48 bg-gray-200 relative">
                                            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            {mentor.exclusive && <div className="absolute top-4 right-4 bg-black text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37] flex items-center gap-1"><Shield size={10} fill="currentColor" /> DIAMOND</div>}
                                            {isLocked && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"><Lock size={32} className="text-white/50" /></div>}
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h3 className="font-bold text-lg text-[#0F172A] dark:text-white">{mentor.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.role} @ {mentor.company}</p>
                                            </div>
                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"><Star size={14} className="text-[#D4AF37]" /> <span>{mentor.specialty}</span></div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] dark:text-white"><Clock size={14} className="text-gray-400" /> <span>{mentor.price}</span></div>
                                            </div>
                                            {isLocked ? (
                                                <Link href="/pricing"><button className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">Upgrade to Book</button></Link>
                                            ) : (
                                                <button onClick={() => handleBookClick(mentor)} className="w-full py-3 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] text-sm font-bold rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                                                    <Calendar size={16} /> Book Session
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* --- TAB 2: RESOURCES (LIBRARY) --- */}
                {activeTab === 'resources' && (
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((item) => {
                                const isLocked = item.exclusive && !canBookDiamond;
                                return (
                                    <div key={item.id} className={`p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between group hover:border-[#D4AF37] transition-all ${isLocked ? 'opacity-70' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type.includes('Video') ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                {item.type.includes('Video') ? <PlayCircle size={24} /> : <FileText size={24} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#0F172A] dark:text-white">{item.title}</h3>
                                                <p className="text-xs text-gray-500">{item.category} • {item.type} • {item.size || item.duration}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {isLocked ? (
                                                <Lock size={20} className="text-gray-400" />
                                            ) : (
                                                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-[#0F172A] dark:text-white">
                                                    <Download size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

            </div>

            {/* --- BOOKING MODAL --- */}
            {selectedMentor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
                        <button onClick={() => setSelectedMentor(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>

                        {bookingStep === 1 ? (
                            <>
                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Book Session</h3>
                                <p className="text-sm text-gray-500 mb-6">with {selectedMentor.name}</p>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Select Date</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Mon, 12', 'Tue, 13', 'Wed, 14'].map(date => (
                                                <button key={date} className="py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold hover:bg-[#D4AF37] hover:text-[#0F172A] hover:border-[#D4AF37] transition-colors dark:text-white">{date}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Select Time</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['10:00 AM', '02:00 PM', '04:00 PM'].map(time => (
                                                <button key={time} className="py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold hover:bg-[#D4AF37] hover:text-[#0F172A] hover:border-[#D4AF37] transition-colors dark:text-white">{time}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={confirmBooking} className="w-full py-3 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-colors">Confirm Booking</button>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-sm text-gray-500">A calendar invite has been sent to your email.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}