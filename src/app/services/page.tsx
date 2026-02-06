'use client';

import React, { useState } from 'react';
import BookingModal from '@/components/BookingModal';
// FIX: Added PenTool for Architect Card
import { Shield, Plane, Scale, Ruler, ArrowRight, CheckCircle2, PenTool } from 'lucide-react';

export default function ServicesPage() {
    // FIX: Added 'architect' to the state type
    const [bookingType, setBookingType] = useState<'police' | 'drone' | 'legal' | 'surveyor' | 'architect' | null>(null);

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans p-6 md:p-12 pb-32 transition-colors duration-500">

            <BookingModal
                isOpen={!!bookingType}
                onClose={() => setBookingType(null)}
                type={bookingType || 'police'}
                price={
                    bookingType === 'police' ? 15000 :
                        bookingType === 'drone' ? 25000 :
                            bookingType === 'legal' ? 50000 :
                                bookingType === 'surveyor' ? 40000 :
                                    75000 // Architect Price
                }
            />

            <div className="max-w-7xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Trust Layer.</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                    Real estate is risky. We removed the risk. Book verified government security,
                    licensed drone pilots, and senior legal counsel directly through Belmont.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 1. SAFETY (POLICE) */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400"><Shield size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Safe Inspect™</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Deploy a verified Mobile Police (MOPOL) officer to escort you during site visits.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Starting At</p><p className="text-xl font-bold font-serif">₦15,000</p></div>
                            <button onClick={() => setBookingType('police')} className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">Book Officer <ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* 2. DRONE (REMOTE VIEW) */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 text-[#D4AF37]"><Plane size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Aero View</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Can't make it to the site? We send a licensed drone pilot to record a 4K audit.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Standard Flight</p><p className="text-xl font-bold font-serif">₦25,000</p></div>
                            <button onClick={() => setBookingType('drone')} className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">Deploy Drone <ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* 3. LEGAL (LAWYERS) */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400"><Scale size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Legal Shield</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Hire top-tier property lawyers to review deeds, verify titles, and draft contracts.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Contract Review</p><p className="text-xl font-bold font-serif">₦50,000</p></div>
                            <button onClick={() => setBookingType('legal')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Find Lawyer</button>
                        </div>
                    </div>
                </div>

                {/* 4. SURVEY (SURVEYORS) */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400"><Ruler size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Geo-Survey</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Verify land coordinates and perimeter fencing with registered surveyors.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Per Plot</p><p className="text-xl font-bold font-serif">₦40,000</p></div>
                            <button onClick={() => setBookingType('surveyor')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Book Surveyor</button>
                        </div>
                    </div>
                </div>

                {/* 5. ARCHITECT (NEW CARD) */}
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group md:col-span-2 lg:col-span-1">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400"><PenTool size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Design Consult</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Hire a registered architect for renovation advice, floor plan optimization, or structural review.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Site Visit</p><p className="text-xl font-bold font-serif">₦75,000</p></div>
                            <button onClick={() => setBookingType('architect')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Book Architect</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}