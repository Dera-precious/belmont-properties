'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
    MapPin, BedDouble, Bath, Square, ArrowRight, Heart,
    Search, X, SlidersHorizontal
} from 'lucide-react';

// RAW DATA
const listingsData = [
    { id: 1, title: "The Ivory Penthouse", location: "Ikoyi, Lagos", price: 850000000, priceStr: "₦850,000,000", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop", beds: 4, baths: 5, area: "650 sqm", tag: "Exclusive" },
    { id: 2, title: "Enugu Heights Estate", location: "Independence Layout, Enugu", price: 120000000, priceStr: "₦120,000,000", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop", beds: 5, baths: 6, area: "800 sqm", tag: "New Listing" },
    { id: 3, title: "Minimalist Haven", location: "Maitama, Abuja", price: 450000000, priceStr: "₦450,000,000", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop", beds: 3, baths: 3, area: "400 sqm", tag: "Modern" },
    { id: 4, title: "The Glass Villa", location: "Lekki Phase 1, Lagos", price: 650000000, priceStr: "₦650,000,000", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2684&auto=format&fit=crop", beds: 6, baths: 7, area: "900 sqm", tag: "Luxury" },
    { id: 5, title: "Victoria Island Loft", location: "Victoria Island, Lagos", price: 300000000, priceStr: "₦300,000,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop", beds: 2, baths: 2, area: "250 sqm", tag: "City View" },
    { id: 6, title: "Asokoro Mansion", location: "Asokoro, Abuja", price: 1200000000, priceStr: "₦1,200,000,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop", beds: 8, baths: 10, area: "1500 sqm", tag: "Premium" }
];

export default function ListingsPage() {
    const { user, toggleSave } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [locationFilter, setLocationFilter] = useState("All");
    const [priceRange, setPriceRange] = useState(2500000000);

    const formatPrice = (price: number) => price >= 1000000000 ? `₦${(price / 1000000000).toFixed(1)}B` : `₦${(price / 1000000).toFixed(0)}M`;

    const filteredListings = useMemo(() => {
        return listingsData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLocation = locationFilter === "All" || item.location.includes(locationFilter);
            const matchesPrice = item.price <= priceRange;
            return matchesSearch && matchesLocation && matchesPrice;
        });
    }, [searchQuery, locationFilter, priceRange]);

    const activeFiltersCount = (locationFilter !== "All" ? 1 : 0) + (priceRange < 2500000000 ? 1 : 0);

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-4 md:p-8 font-sans transition-colors duration-500 pb-32 relative overflow-hidden">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">Curated Listings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Exclusive properties vetted for the Belmont Standard.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="flex-1 md:w-64 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" placeholder="Search location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-sm text-[#0F172A] dark:text-white transition-all" />
                    </div>
                    <button onClick={() => setShowFilters(true)} className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold shadow-sm transition-colors ${activeFiltersCount > 0 ? 'bg-[#D4AF37] text-[#0F172A] border-[#D4AF37]' : 'bg-white dark:bg-[#1E293B] border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-white hover:border-[#D4AF37]'}`}>
                        <SlidersHorizontal size={16} /> <span className="hidden md:inline">Filters</span>
                        {activeFiltersCount > 0 && <span className="bg-[#0F172A] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{activeFiltersCount}</span>}
                    </button>
                    <Link href="/saved">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold shadow-sm hover:border-red-500 text-red-500 transition-colors">
                            <Heart size={16} fill="currentColor" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* GRID */}
            {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredListings.map((item) => {
                        const isSaved = user?.savedIds?.includes(item.id);
                        return (
                            <div key={item.id} className="group bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                <div className="h-64 w-full overflow-hidden relative shrink-0">
                                    <div className="absolute top-4 left-4 z-10 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.tag}</div>

                                    {/* --- HEART BUTTON WITH Z-INDEX 50 --- */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Stop Link click
                                            e.stopPropagation(); // Stop Link click
                                            toggleSave(item.id);
                                        }}
                                        className={`absolute top-4 right-4 z-50 p-2 backdrop-blur-md rounded-full transition-colors cursor-pointer shadow-lg hover:scale-110 ${isSaved ? 'bg-red-500 text-white' : 'bg-white/30 text-white hover:bg-[#D4AF37]'}`}
                                    >
                                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                                    </button>
                                    {/* ------------------------------------ */}

                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{item.title}</h3>
                                        <p className="font-serif font-bold text-lg text-[#D4AF37] mb-2">{item.priceStr}</p>
                                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs"><MapPin size={12} /> {item.location}</div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 mb-6 mt-auto">
                                        <span className="flex items-center gap-1"><BedDouble size={14} /> {item.beds} Beds</span>
                                        <span className="flex items-center gap-1"><Bath size={14} /> {item.baths} Baths</span>
                                        <span className="flex items-center gap-1"><Square size={14} /> {item.area}</span>
                                    </div>
                                    <Link href={`/listings/${item.id}`}>
                                        <button className="w-full py-3 bg-[#0F172A] text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-all mt-auto">View Details <ArrowRight size={16} /></button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4"><Search size={32} className="text-gray-400" /></div>
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">No Properties Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">We couldn't find any matches for "{searchQuery}". Try adjusting your filters.</p>
                    <button onClick={() => { setSearchQuery(""); setLocationFilter("All"); setPriceRange(2500000000); }} className="px-6 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg">Clear All Filters</button>
                </div>
            )}

            {/* FILTER DRAWER */}
            {showFilters && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-[#1E293B] z-50 p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif font-bold text-[#0F172A] dark:text-white">Filter Properties</h2>
                            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><X size={20} className="text-[#0F172A] dark:text-white" /></button>
                        </div>
                        <div className="space-y-8 flex-1">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Location</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["All", "Lagos", "Abuja", "Enugu"].map(loc => (
                                        <button key={loc} onClick={() => setLocationFilter(loc)} className={`py-3 rounded-xl text-sm font-bold border transition-all ${locationFilter === loc ? 'bg-[#0F172A] text-white border-[#0F172A] dark:bg-white dark:text-[#0F172A]' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-[#D4AF37]'}`}>{loc}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Price</label>
                                    <span className="text-sm font-bold text-[#D4AF37]">{formatPrice(priceRange)}</span>
                                </div>
                                <input type="range" min="100000000" max="2500000000" step="50000000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-2"><span>₦100M</span><span>₦2.5B+</span></div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                            <button onClick={() => setShowFilters(false)} className="w-full py-4 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] rounded-xl font-bold hover:opacity-90 transition-opacity">Show {filteredListings.length} Properties</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}