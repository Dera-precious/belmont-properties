'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
    MapPin, BedDouble, Bath, Square, ArrowRight, Heart,
    ArrowLeft, Search
} from 'lucide-react';

// SAME DATA AS LISTINGS PAGE (For consistency)
const listingsData = [
    { id: 1, title: "The Ivory Penthouse", location: "Ikoyi, Lagos", price: "₦850,000,000", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop", beds: 4, baths: 5, area: "650 sqm", tag: "Exclusive" },
    { id: 2, title: "Enugu Heights Estate", location: "Independence Layout, Enugu", price: "₦120,000,000", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop", beds: 5, baths: 6, area: "800 sqm", tag: "New Listing" },
    { id: 3, title: "Minimalist Haven", location: "Maitama, Abuja", price: "₦450,000,000", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop", beds: 3, baths: 3, area: "400 sqm", tag: "Modern" },
    { id: 4, title: "The Glass Villa", location: "Lekki Phase 1, Lagos", price: "₦650,000,000", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2684&auto=format&fit=crop", beds: 6, baths: 7, area: "900 sqm", tag: "Luxury" },
    { id: 5, title: "Victoria Island Loft", location: "Victoria Island, Lagos", price: "₦300,000,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop", beds: 2, baths: 2, area: "250 sqm", tag: "City View" },
    { id: 6, title: "Asokoro Mansion", location: "Asokoro, Abuja", price: "₦1,200,000,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop", beds: 8, baths: 10, area: "1500 sqm", tag: "Premium" }
];

export default function SavedPage() {
    const { user, toggleSave } = useAuth();

    // LOGIC: Filter the main list to show ONLY saved IDs
    const savedListings = listingsData.filter(item => user?.savedIds?.includes(item.id));

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-8 font-sans transition-colors duration-500 pb-32">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-12">
                <Link href="/listings" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} /> Back to Search
                </Link>
                <div className="flex items-center gap-3 text-red-500 mb-2">
                    <Heart size={32} fill="currentColor" />
                    <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white">Saved Collection</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    You have {savedListings.length} properties in your wishlist.
                </p>
            </div>

            {/* SAVED GRID */}
            {savedListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {savedListings.map((item) => (
                        <div key={item.id} className="group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 relative flex flex-col">

                            <div className="h-64 w-full overflow-hidden relative shrink-0">
                                <div className="absolute top-4 left-4 z-10 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {item.tag}
                                </div>

                                {/* REMOVE BUTTON (Clicking this removes it from list) */}
                                <button
                                    onClick={() => toggleSave(item.id)}
                                    className="absolute top-4 right-4 z-50 p-2 backdrop-blur-md rounded-full transition-colors bg-red-500 text-white hover:bg-gray-800 cursor-pointer shadow-lg"
                                    title="Remove from Saved"
                                >
                                    <Heart size={16} fill="currentColor" />
                                </button>

                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{item.title}</h3>
                                    <p className="font-serif font-bold text-lg text-[#D4AF37] mb-2">{item.price}</p>
                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                                        <MapPin size={12} /> {item.location}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 mb-6 mt-auto">
                                    <span className="flex items-center gap-1"><BedDouble size={14} /> {item.beds} Beds</span>
                                    <span className="flex items-center gap-1"><Bath size={14} /> {item.baths} Baths</span>
                                    <span className="flex items-center gap-1"><Square size={14} /> {item.area}</span>
                                </div>

                                <Link href={`/listings/${item.id}`}>
                                    <button className="w-full py-3 bg-[#0F172A] text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-all mt-auto">
                                        View Details <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* EMPTY STATE */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Heart size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Your Wishlist is Empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                        Start exploring properties and tap the heart icon to save them here.
                    </p>
                    <Link href="/listings">
                        <button className="px-6 py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl">
                            Explore Listings
                        </button>
                    </Link>
                </div>
            )}

        </div>
    );
}