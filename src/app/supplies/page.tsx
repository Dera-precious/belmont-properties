'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Search, ShoppingCart, Filter,
    Zap, Droplets, Hammer, Wind, Layers,
    Move, Home, PaintBucket, Armchair, Flower2,
    Wifi, ChevronRight, Star
} from 'lucide-react';

// --- DATA: CATEGORIES ---
const categories = [
    { id: 'structure', name: 'Structure', icon: <Hammer size={18} />, count: '120+' },
    { id: 'electrical', name: 'Electrical', icon: <Zap size={18} />, count: '340+' },
    { id: 'plumbing', name: 'Plumbing', icon: <Droplets size={18} />, count: '210+' },
    { id: 'hvac', name: 'HVAC', icon: <Wind size={18} />, count: '85+' },
    { id: 'insulation', name: 'Insulation', icon: <Layers size={18} />, count: '60+' },
    { id: 'flooring', name: 'Flooring', icon: <Move size={18} />, count: '400+' },
    { id: 'kitchen', name: 'Kitchen', icon: <Home size={18} />, count: '150+' },
    { id: 'paint', name: 'Paints', icon: <PaintBucket size={18} />, count: '500+' },
    { id: 'interior', name: 'Decor', icon: <Armchair size={18} />, count: '800+' },
    { id: 'outdoor', name: 'Outdoor', icon: <Flower2 size={18} />, count: '110+' },
    { id: 'smart', name: 'Smart Home', icon: <Wifi size={18} />, count: '90+' },
];

// --- DATA: PRODUCTS (UPDATED WITH CORRECT IMAGES) ---
const products = [
    {
        id: 1,
        name: "Golden Teak Tiles",
        price: "₦12,500/sqm",
        category: "Flooring",
        image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=500&auto=format&fit=crop",
        rating: 4.8
    },
    {
        id: 2,
        name: "Smart Dimmer Switch",
        price: "₦45,000",
        category: "Electrical",
        image: "https://images.unsplash.com/photo-1559735846-d2d9327d722f?q=80&w=500&auto=format&fit=crop", // Corrected: Light Switch
        rating: 4.9
    },
    {
        id: 3,
        name: "Italian Marble Sink",
        price: "₦180,000",
        category: "Kitchen",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop",
        rating: 4.7
    },
    {
        id: 4,
        name: "Solar Panel 500W",
        price: "₦210,000",
        category: "Electrical",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=500&auto=format&fit=crop",
        rating: 4.6
    },
    {
        id: 5,
        name: "Dulux Pure White",
        price: "₦45,000",
        category: "Paints",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=500&auto=format&fit=crop",
        rating: 4.5
    },
    {
        id: 6,
        name: "Copper Piping 15mm",
        price: "₦8,500/m",
        category: "Plumbing",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=500&auto=format&fit=crop", // Corrected: Copper Pipes
        rating: 4.8
    },
    {
        id: 7,
        name: "Velvet Accent Chair",
        price: "₦150,000",
        category: "Decor",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=500&auto=format&fit=crop",
        rating: 4.9
    },
    {
        id: 8,
        name: "HVAC Duct Vent",
        price: "₦15,000",
        category: "HVAC",
        image: "https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=500&auto=format&fit=crop",
        rating: 4.2
    },
    {
        id: 9,
        name: "Red Brick Facade",
        price: "₦220/pc",
        category: "Structure",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", // Corrected: Red Bricks
        rating: 4.7
    },
    {
        id: 10,
        name: "Garden Solar Light",
        price: "₦12,000",
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=500&auto=format&fit=crop", // Corrected: Garden Light
        rating: 4.4
    },
    {
        id: 11,
        name: "Smart Lock Pro",
        price: "₦185,000",
        category: "Smart Home",
        image: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=500&auto=format&fit=crop", // Corrected: Smart Home Controller
        rating: 4.9
    },
    {
        id: 12,
        name: "Teak Floorboard",
        price: "₦18,000/sqm",
        category: "Flooring",
        image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=500&auto=format&fit=crop",
        rating: 4.6
    },
];

export default function SupplyDepot() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory || p.category.includes(selectedCategory));

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans pb-32 transition-colors duration-500">

            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/"><button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><ArrowLeft size={20} /></button></Link>
                    <h1 className="font-serif font-bold text-xl">Supplies</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2"><Search size={20} /></button>
                    <button className="p-2 relative">
                        <ShoppingCart size={20} />
                        <span className="absolute top-1 right-0 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                    </button>
                </div>
            </header>

            {/* CATEGORY SCROLL (Horizontal) */}
            <div className="py-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
                <div className="flex gap-3 px-4 min-w-max">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === "All" ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
                    >
                        All Items
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === cat.name ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="p-4 md:p-6">

                {/* HERO BANNER */}
                <div className="bg-[#D4AF37] rounded-2xl p-6 mb-8 text-[#0F172A] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-20 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                    <h2 className="text-2xl font-serif font-bold mb-1">Wholesale Pricing</h2>
                    <p className="text-xs font-bold opacity-80 mb-4">Direct from manufacturers. No middlemen.</p>
                    <button className="px-4 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-lg">View Deals</button>
                </div>

                {/* PRODUCT GRID (LAZY DESIGN: SMALL CARDS, HIGH DENSITY) */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                    {filteredProducts.map((item) => (
                        <div key={item.id} className="group bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all cursor-pointer">
                            {/* Image Area */}
                            <div className="aspect-square relative bg-gray-200">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star size={8} className="text-[#D4AF37] fill-[#D4AF37]" /> {item.rating}
                                </div>
                            </div>

                            {/* Details Area */}
                            <div className="p-3">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold mb-0.5">{item.category}</p>
                                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white line-clamp-1 mb-1">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-serif font-bold text-[#D4AF37]">{item.price}</span>
                                    <button className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-[#0F172A] dark:text-white hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors">
                                        <ShoppingCart size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DEPARTMENTS LIST (For quick access) */}
                {selectedCategory === "All" && (
                    <div className="mt-12">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Filter size={18} /> Shop by Department</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {categories.map((cat) => (
                                <div key={cat.id} onClick={() => setSelectedCategory(cat.name)} className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between cursor-pointer hover:border-[#D4AF37] transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-[#0F172A] dark:text-white">{cat.name}</p>
                                            <p className="text-[10px] text-gray-400">{cat.count} items</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#D4AF37]" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}