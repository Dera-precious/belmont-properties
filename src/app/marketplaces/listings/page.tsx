import React from 'react';
import ListingCard from '@/components/Listings/ListingCard';

export default function ListingsPage() {
    const listings = [
        { title: "Emerald Penthouse", price: "₦ 150,000,000", location: "Ikoyi, Lagos", fraudStatus: 'verified' },
        { title: "Sunshine Villa", price: "₦ 85,000,000", location: "Lekki Phase 1", fraudStatus: 'safe' },
        { title: "Ghost Duplex", price: "₦ 40,000,000", location: "Ajah, Lagos", fraudStatus: 'warning' },
        { title: "Royal Gardens", price: "₦ 200,000,000", location: "Maitama, Abuja", fraudStatus: 'verified' },
    ] as const;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-light text-white mb-2 tracking-tight">Marketplace.</h1>
                    <p className="text-xl text-muted">Verified listings with AI fraud detection.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass-panel px-6 py-3 text-gold uppercase tracking-wider text-sm transition-colors hover:bg-white/10 cursor-pointer">Filter</button>
                    <button className="glass-panel px-6 py-3 text-gold uppercase tracking-wider text-sm transition-colors hover:bg-white/10 cursor-pointer">Sort</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map((item, i) => (
                    <ListingCard key={i} {...item} />
                ))}
            </div>
        </div>
    );
}
