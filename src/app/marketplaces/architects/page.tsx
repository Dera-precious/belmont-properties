"use client";
import React, { useState } from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function ArchitectsHub() {
    const [showRequestForm, setShowRequestForm] = useState(false);

    const portfolio = [
        { title: "Glass House", architect: "Studio Z", imageColor: "#1a5c45", height: "h-64" },
        { title: "Urban Loft", architect: "Design Co", imageColor: "#2d4a3e", height: "h-40" },
        { title: "Eco Villa", architect: "Green Build", imageColor: "#0f332a", height: "h-56" },
        { title: "Sky Tower", architect: "Future Scapes", imageColor: "#234238", height: "h-48" },
        { title: "Desert Pod", architect: "Nomad Arc", imageColor: "#1e3b33", height: "h-64" }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Architects Hub.</h1>
                    <p className="text-xl text-muted">Visionaries for your next project.</p>
                </div>
                <button
                    onClick={() => setShowRequestForm(!showRequestForm)}
                    className="bg-[var(--color-gold)] text-[var(--color-emerald)] px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                    {showRequestForm ? 'Close Request' : 'Post Service Request'}
                </button>
            </header>

            {/* Service Request Form (Lazy Expansion) */}
            {showRequestForm && (
                <div className="mb-12 animate-pulse-slow">
                    <GlassContainer className="border-l-4 border-[var(--color-gold)]">
                        <h3 className="text-gold uppercase tracking-widest text-sm mb-4">New Project Brief</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <input type="text" placeholder="Project Budget (₦)" className="bg-white/5 border border-white/20 p-3 text-white outline-none focus:border-[var(--color-gold)]" />
                            <select className="bg-white/5 border border-white/20 p-3 text-white outline-none focus:border-[var(--color-gold)]">
                                <option>Modern</option>
                                <option>Traditional</option>
                                <option>Commercial</option>
                            </select>
                            <input type="text" placeholder="Timeline (Weeks)" className="bg-white/5 border border-white/20 p-3 text-white outline-none focus:border-[var(--color-gold)]" />
                        </div>
                        <button className="w-full py-3 border border-white/20 text-white uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-[var(--color-emerald)] font-bold transition-colors">
                            Submit to Marketplace
                        </button>
                    </GlassContainer>
                </div>
            )}

            {/* Escrow Status Banner */}
            <GlassContainer className="mb-12 flex items-center justify-between bg-emerald/50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]">
                        🛡️
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">Active Escrow Protection</h4>
                        <p className="text-xs text-muted">Funds are held securely until milestone approval.</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted uppercase tracking-wider">Total in Escrow</p>
                    <p className="text-xl text-[var(--color-gold)] font-bold">₦ 12,500,000</p>
                </div>
            </GlassContainer>

            {/* Masonry Portfolio Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {portfolio.map((item, i) => (
                    <div key={i} className={`w-full ${item.height} bg-emerald relative group break-inside-avoid cursor-pointer overflow-hidden border border-transparent hover:border-[var(--color-gold)] transition-all`} style={{ backgroundColor: item.imageColor }}>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform">
                            <h3 className="text-white font-bold">{item.title}</h3>
                            <p className="text-xs text-[var(--color-gold)] uppercase tracking-wider">{item.architect}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
