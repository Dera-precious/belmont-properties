'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
// IMPORT THE BOOKING MODAL
import BookingModal from '@/components/BookingModal';
import {
    ArrowLeft, MapPin, BedDouble, Bath, Square,
    Heart, Share2, CheckCircle2, Shield, Calendar, CreditCard,
    TrendingUp, Lock, BrainCircuit, Plane, Phone, ArrowRight
} from 'lucide-react';

// --- DATA SOURCE ---
const listingsData = [
    {
        id: 1,
        title: "The Ivory Penthouse",
        location: "Ikoyi, Lagos",
        price: "₦850,000,000",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
        beds: 4, baths: 5, area: "650 sqm", tag: "Exclusive",
        description: "A masterpiece of modern architecture located in the heart of Ikoyi's most exclusive zone. Features floor-to-ceiling reinforced glass, a private elevator, and a rooftop infinity pool overlooking the city skyline."
    },
    {
        id: 2,
        title: "Enugu Heights Estate",
        location: "Independence Layout, Enugu",
        price: "₦120,000,000",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
        beds: 5, baths: 6, area: "800 sqm", tag: "New Listing",
        description: "Experience serene luxury in the rolling hills of Enugu. This expansive estate features smart-home integration, a private cinema, and lush gardens perfect for family living."
    },
    {
        id: 3,
        title: "Minimalist Haven",
        location: "Maitama, Abuja",
        price: "₦450,000,000",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
        beds: 3, baths: 3, area: "400 sqm", tag: "Modern",
        description: "Clean lines and open spaces define this architectural gem in Maitama. Designed for the modern executive, it offers high-security access and premium finishing throughout."
    },
    {
        id: 4,
        title: "The Glass Villa",
        location: "Lekki Phase 1, Lagos",
        price: "₦650,000,000",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2684&auto=format&fit=crop",
        beds: 6, baths: 7, area: "900 sqm", tag: "Luxury",
        description: "An iconic glass structure in Lekki Phase 1. This property blurs the lines between indoor and outdoor living with its transparency and light. Includes a boat jetty."
    },
    {
        id: 5,
        title: "Victoria Island Loft",
        location: "Victoria Island, Lagos",
        price: "₦300,000,000",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        beds: 2, baths: 2, area: "250 sqm", tag: "City View",
        description: "Urban chic meets luxury. This double-volume loft in VI is perfect for the expatriate or business leader. Walking distance to major corporate HQs."
    },
    {
        id: 6,
        title: "Asokoro Mansion",
        location: "Asokoro, Abuja",
        price: "₦1,200,000,000",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
        beds: 8, baths: 10, area: "1500 sqm", tag: "Premium",
        description: "The definition of opulence. This diplomat-standard mansion in Asokoro features bulletproof glazing, a grand ballroom, and staff quarters for six."
    }
];

export default function ListingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user, toggleSave } = useAuth();

    // STATE FOR BOOKING MODAL
    const [bookingType, setBookingType] = useState<'physical' | 'police' | 'drone' | 'legal' | 'surveyor' | 'architect' | null>(null);

    // 1. FIND LISTING
    const baseListing = listingsData.find(item => item.id === Number(params.id));

    // 2. AUGMENT LISTING WITH FAKE "AI DATA" (Since our basic list doesn't have it)
    const listing = baseListing ? {
        ...baseListing,
        aiRating: { score: 9.2, structure: "Grade A Concrete", verdict: "Prime Investment" },
        investment: { roi: "12% Annual", rentalValue: "₦45M / year" },
        owner: { name: "Chief T. Benson", phone: "+234 809 999 9999" }
    } : null;

    if (!listing) return <div className="p-20 text-center">Property not found.</div>;

    const isSaved = user?.savedIds?.includes(listing.id);
    const isGold = user?.tier === 'Gold' || user?.tier === 'Diamond' || user?.tier === 'Premium';
    const isDiamond = user?.tier === 'Diamond';

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] font-sans transition-colors duration-500 pb-32 text-[#0F172A] dark:text-white">

            {/* BOOKING MODAL (Connects to Trust Center logic) */}
            <BookingModal
                isOpen={!!bookingType}
                onClose={() => setBookingType(null)}
                type={bookingType || 'physical'}
                price={bookingType === 'police' ? 15000 : bookingType === 'drone' ? 25000 : 0}
                propertyTitle={listing.title}
            />

            {/* HERO IMAGE */}
            <div className="relative h-[50vh] md:h-[60vh] w-full">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Back Button */}
                <button onClick={() => router.back()} className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                    <ArrowLeft size={24} />
                </button>

                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                        <Share2 size={20} />
                    </button>
                    <button
                        onClick={() => toggleSave(listing.id)}
                        className={`p-3 backdrop-blur-md rounded-full transition-all ${isSaved ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'}`}
                    >
                        <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="max-w-6xl mx-auto">
                        <span className="bg-[#D4AF37] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                            {listing.tag}
                        </span>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">{listing.title}</h1>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <MapPin size={18} className="text-[#D4AF37]" />
                                    <span className="text-lg">{listing.location}</span>
                                </div>
                            </div>
                            <p className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">{listing.price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT: Details & AI */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Key Stats */}
                    <div className="flex justify-between p-6 bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Layout</p>
                            <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white">
                                <BedDouble size={18} /> {listing.beds} <span className="text-gray-400 font-normal">|</span> <Bath size={18} /> {listing.baths}
                            </div>
                        </div>
                        <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Size</p>
                            <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white">
                                <Square size={18} /> {listing.area}
                            </div>
                        </div>
                        <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Rating</p>
                            <div className="flex items-center gap-2 font-bold text-[#D4AF37]">
                                <BrainCircuit size={18} /> {listing.aiRating.score}
                            </div>
                        </div>
                    </div>

                    {/* AI SCAN SECTION (Gated) */}
                    <div className="bg-[#0F172A] text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-[#D4AF37] rounded-lg text-[#0F172A]"><BrainCircuit size={24} /></div>
                            <div><h3 className="font-bold text-lg">AI Architectural Scan</h3><p className="text-xs text-gray-400">Powered by Belmont Neural Engine</p></div>
                        </div>
                        {isGold ? (
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl"><p className="text-xs text-gray-400 uppercase">Score</p><p className="text-2xl font-bold text-[#D4AF37]">{listing.aiRating.score}/10</p></div>
                                <div className="col-span-2 bg-white/10 p-4 rounded-xl"><p className="font-serif italic text-lg">"{listing.aiRating.verdict}"</p></div>
                            </div>
                        ) : (
                            <div className="text-center py-8 relative z-10"><Lock size={32} className="mx-auto mb-3 text-gray-500" /><h4 className="font-bold mb-2">Analysis Locked</h4><Link href="/pricing"><button className="px-6 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg text-sm">Unlock AI Report</button></Link></div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About this property</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {listing.description}
                        </p>
                    </div>

                    {/* Investment Data */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-4"><TrendingUp size={20} className="text-green-500" /><h3 className="font-bold">Investment Data</h3></div>
                        {isGold ? (
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3"><span className="text-sm text-gray-500">Proj. ROI</span><span className="font-bold text-green-500">{listing.investment.roi}</span></div>
                                <div className="flex justify-between"><span className="text-sm text-gray-500">Rental Value</span><span className="font-bold">{listing.investment.rentalValue}</span></div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-xl text-center border border-dashed border-gray-200 dark:border-gray-700"><p className="text-xs text-gray-500 mb-3">ROI & Rental data hidden</p><Link href="/pricing"><button className="text-xs font-bold text-[#D4AF37]">Upgrade to View</button></Link></div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Action Card */}
                <div className="lg:col-span-1 space-y-6">

                    {/* BOOKING CARD */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-bl-xl border-l border-b border-blue-100 dark:border-blue-800">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                <Shield size={10} /> Safe Inspect™
                            </div>
                        </div>

                        <h3 className="font-bold mb-4 text-lg">Book Inspection</h3>

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

                        <button onClick={() => setBookingType('physical')} className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                            Proceed to Booking <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* OWNER CARD */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
                        {isDiamond ? (
                            <div className="pt-2">
                                <p className="text-xs font-bold text-[#D4AF37] mb-3 flex items-center gap-2"><Shield size={12} /> Diamond Access</p>
                                <div className="p-4 bg-[#D4AF37]/10 rounded-xl">
                                    <p className="text-sm font-bold mb-1">{listing.owner.name}</p>
                                    <p className="text-lg font-serif mb-3">{listing.owner.phone}</p>
                                    <button className="w-full py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg text-sm flex items-center justify-center gap-2"><Phone size={16} /> Call Owner</button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-2 text-center">
                                <Lock size={24} className="mx-auto text-gray-400 mb-2" />
                                <p className="text-xs text-gray-500 mb-4">Owner contact is restricted.</p>
                                <Link href="/pricing"><button className="w-full py-2 border border-gray-200 dark:border-gray-700 text-gray-400 font-bold rounded-xl text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Diamond Exclusive: Call Owner</button></Link>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}