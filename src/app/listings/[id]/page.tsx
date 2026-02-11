'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // 1. Hook to read the URL ID
import { useAuth } from '@/app/context/AuthContext';
import {
    ArrowLeft, MapPin, BedDouble, Bath, Square,
    Heart, Share2, CheckCircle2, Shield, Calendar, CreditCard
} from 'lucide-react';

// 2. SAME DATA (Ideally this should be in a shared file, but we keep it here for safety)
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
    const params = useParams(); // Get the ID from the URL (e.g., "2")
    const router = useRouter();
    const { user, toggleSave } = useAuth();

    // 3. FIND THE MATCHING LISTING
    // We convert params.id to a Number to match our data
    const listing = listingsData.find(item => item.id === Number(params.id));

    // Safety check: If someone types /listings/999 (invalid ID)
    if (!listing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white">
                <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
                <Link href="/listings">
                    <button className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl font-bold">Back to Listings</button>
                </Link>
            </div>
        );
    }

    const isSaved = user?.savedIds?.includes(listing.id);

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] font-sans transition-colors duration-500 pb-32">

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
                        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">{listing.title}</h1>
                        <div className="flex items-center gap-2 text-gray-300">
                            <MapPin size={18} className="text-[#D4AF37]" />
                            <span className="text-lg">{listing.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT: Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Key Stats */}
                    <div className="flex justify-between p-6 bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Price</p>
                            <p className="text-xl md:text-2xl font-serif font-bold text-[#D4AF37]">{listing.price}</p>
                        </div>
                        <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
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
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">About this property</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {listing.description}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div>
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['24/7 Power', 'Swimming Pool', 'Security', 'Gym', 'Smart Home', 'Parking'].map((feature) => (
                                <div key={feature} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <CheckCircle2 size={18} className="text-[#D4AF37]" />
                                    <span className="text-sm font-medium text-[#0F172A] dark:text-white">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Action Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl sticky top-24">
                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-6">Interested?</h3>

                        <div className="space-y-4">
                            <Link href="/services">
                                <button className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-3">
                                    <Shield size={18} /> Book Inspection
                                </button>
                            </Link>

                            <button className="w-full py-4 border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <Calendar size={18} /> Schedule Tour
                            </button>

                            <button className="w-full py-4 border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <CreditCard size={18} /> Make Offer
                            </button>
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            Verified by Belmont Trust Center. <br /> Transaction protected by Escrow.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}