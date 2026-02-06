'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
// NEW: Import the Booking Modal
import BookingModal from '@/components/BookingModal';
import {
    MapPin, BedDouble, Bath, Square, ArrowLeft, Heart,
    Share2, Shield, TrendingUp, Lock, Phone, MessageSquare,
    BrainCircuit, Plane, ArrowRight
} from 'lucide-react';

export default function ListingDetail() {
    const { user, toggleSave } = useAuth();

    // NEW: State for the booking modal
    const [bookingType, setBookingType] = useState<'physical' | 'police' | 'drone' | null>(null);

    const property = {
        id: 1,
        title: "The Ivory Penthouse",
        location: "Ikoyi, Lagos",
        price: "₦850,000,000",
        description: "A masterpiece of modern architecture located in the heart of Ikoyi's most exclusive zone. Features floor-to-ceiling reinforced glass, a private elevator, and a rooftop infinity pool.",
        beds: 4, baths: 5, area: "650 sqm",
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"],
        investment: { roi: "12% Annual", rentalValue: "₦45M / year" },
        aiRating: { score: 9.2, structure: "Grade A Concrete", verdict: "Prime Investment" },
        owner: { name: "Chief T. Benson", phone: "+234 809 999 9999" }
    };

    const isGold = user?.tier === 'Gold' || user?.tier === 'Diamond' || user?.tier === 'Premium';
    const isDiamond = user?.tier === 'Diamond';
    const isSaved = user?.savedIds?.includes(property.id);

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans pb-24 transition-colors duration-500">

            {/* BOOKING MODAL */}
            <BookingModal
                isOpen={!!bookingType}
                onClose={() => setBookingType(null)}
                type={bookingType || 'physical'}
                price={bookingType === 'police' ? 15000 : bookingType === 'drone' ? 25000 : 0}
                propertyTitle={property.title}
            />

            {/* IMAGE */}
            <div className="relative h-[50vh] md:h-[60vh] bg-gray-200">
                <img src={property.images[0]} className="w-full h-full object-cover" alt="Main View" />
                <div className="absolute top-6 left-6 z-10">
                    <Link href="/listings"><button className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full"><ArrowLeft size={24} /></button></Link>
                </div>
                <div className="absolute bottom-6 right-6 flex gap-2">
                    <button className="px-4 py-2 bg-white/90 text-[#0F172A] text-sm font-bold rounded-lg flex items-center gap-2"><Share2 size={16} /> Share</button>
                    <button onClick={() => toggleSave(property.id)} className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 ${isSaved ? 'bg-red-500 text-white' : 'bg-white/90 text-red-500'}`}>
                        <Heart size={16} fill={isSaved ? "currentColor" : "none"} /> Save
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">

                        {/* --- FIXED OVERFLOW SECTION --- */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 break-words">{property.title}</h1>
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><MapPin size={18} /> {property.location}</div>
                            </div>
                            <div className="text-left md:text-right w-full md:w-auto">
                                <p className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] break-words">{property.price}</p>
                            </div>
                        </div>
                        {/* ------------------------------- */}

                        <div className="flex gap-6 py-6 border-y border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2"><BedDouble size={20} className="text-gray-400" /><span className="font-bold">{property.beds} Beds</span></div>
                            <div className="flex items-center gap-2"><Bath size={20} className="text-gray-400" /><span className="font-bold">{property.baths} Baths</span></div>
                            <div className="flex items-center gap-2"><Square size={20} className="text-gray-400" /><span className="font-bold">{property.area}</span></div>
                        </div>
                        <div className="pt-6"><h3 className="font-bold mb-3">Description</h3><p className="text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p></div>
                    </div>

                    {/* AI SCAN */}
                    <div className="bg-[#0F172A] text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-[#D4AF37] rounded-lg text-[#0F172A]"><BrainCircuit size={24} /></div>
                            <div><h3 className="font-bold text-lg">AI Architectural Scan</h3><p className="text-xs text-gray-400">Powered by Belmont Neural Engine</p></div>
                        </div>
                        {isGold ? (
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl"><p className="text-xs text-gray-400 uppercase">Score</p><p className="text-2xl font-bold text-[#D4AF37]">{property.aiRating.score}/10</p></div>
                                <div className="col-span-2 bg-white/10 p-4 rounded-xl"><p className="font-serif italic text-lg">"{property.aiRating.verdict}"</p></div>
                            </div>
                        ) : (
                            <div className="text-center py-8 relative z-10"><Lock size={32} className="mx-auto mb-3 text-gray-500" /><h4 className="font-bold mb-2">Analysis Locked</h4><Link href="/pricing"><button className="px-6 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg text-sm">Unlock AI Report</button></Link></div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN - Updated with Safety Features */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-4"><TrendingUp size={20} className="text-green-500" /><h3 className="font-bold">Investment Data</h3></div>
                        {isGold ? (
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-3"><span className="text-sm text-gray-500">Proj. ROI</span><span className="font-bold text-green-500">{property.investment.roi}</span></div>
                                <div className="flex justify-between"><span className="text-sm text-gray-500">Rental Value</span><span className="font-bold">{property.investment.rentalValue}</span></div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-xl text-center border border-dashed"><p className="text-xs text-gray-500 mb-3">ROI & Rental data hidden</p><Link href="/pricing"><button className="text-xs font-bold text-[#D4AF37]">Upgrade to View</button></Link></div>
                        )}
                    </div>

                    {/* INSPECTION CARD - CONNECTED */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden">
                        {/* Badge */}
                        <div className="absolute top-0 right-0 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-bl-xl border-l border-b border-blue-100 dark:border-blue-800">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                <Shield size={10} /> Safe Inspect™ Ready
                            </div>
                        </div>

                        <h3 className="font-bold mb-4">Book Inspection</h3>

                        <div className="space-y-3 mb-6">
                            {/* Option 1: Physical */}
                            <button
                                onClick={() => setBookingType('physical')}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:border-[#D4AF37] transition-colors group text-left"
                            >
                                <div><p className="font-bold text-sm">Physical Visit</p><p className="text-xs text-gray-500">Go yourself</p></div>
                                <span className="text-xs font-bold text-gray-400 group-hover:text-[#D4AF37]">Free</span>
                            </button>

                            {/* Option 2: Safe Inspect */}
                            <button
                                onClick={() => setBookingType('police')}
                                className="w-full p-3 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 flex items-center justify-between hover:border-blue-500 transition-colors text-left"
                            >
                                <div>
                                    <p className="font-bold text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2"><Shield size={12} /> With MOPOL Escort</p>
                                    <p className="text-xs text-gray-500">Armed security detail</p>
                                </div>
                                <span className="text-xs font-bold text-blue-600">+₦15k</span>
                            </button>

                            {/* Option 3: Drone */}
                            <button
                                onClick={() => setBookingType('drone')}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:border-[#D4AF37] transition-colors group text-left"
                            >
                                <div>
                                    <p className="font-bold text-sm flex items-center gap-2"><Plane size={12} /> Send Drone</p>
                                    <p className="text-xs text-gray-500">Receive 4K video report</p>
                                </div>
                                <span className="text-xs font-bold text-[#D4AF37]">+₦25k</span>
                            </button>
                        </div>

                        <button
                            onClick={() => setBookingType('physical')}
                            className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            Proceed to Booking <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
                        {isDiamond ? (
                            <div className="pt-2"><p className="text-xs font-bold text-[#D4AF37] mb-3 flex items-center gap-2"><Shield size={12} /> Diamond Access</p><div className="p-4 bg-[#D4AF37]/10 rounded-xl"><p className="text-sm font-bold mb-1">{property.owner.name}</p><p className="text-lg font-serif mb-3">{property.owner.phone}</p><button className="w-full py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg text-sm flex items-center justify-center gap-2"><Phone size={16} /> Call Owner</button></div></div>
                        ) : (
                            <div className="pt-2"><Link href="/pricing"><button className="w-full py-2 border border-gray-200 dark:border-gray-700 text-gray-400 font-bold rounded-xl text-sm">Diamond Exclusive: Call Owner</button></Link></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}