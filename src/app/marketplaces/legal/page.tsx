"use client";
import React, { useState } from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function LegalMarketplace() {
    const lawyers = [
        { name: "Barrister A. Okonjo", speciality: "Property Law", rate: "₦50k/hr", cases: 120 },
        { name: "Adeleke & Co", speciality: "Corporate", rate: "₦75k/hr", cases: 85 },
        { name: "Legal Eagles", speciality: "Dispute Resolution", rate: "₦40k/hr", cases: 200 },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Legal Services.</h1>
                <p className="text-xl text-muted">Expert counsel for your estate matters.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Directory (2/3) */}
                <div className="lg:col-span-2">
                    <div className="flex gap-4 mb-6">
                        <input type="text" placeholder="Search by name or speciality..." className="flex-1 bg-emerald/30 border border-[var(--color-gold)] p-3 text-white outline-none focus:bg-white/5 transition-colors" />
                        <button className="bg-[var(--color-gold)] text-[var(--color-emerald)] px-6 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                            Filter
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lawyers.map((lawyer, i) => (
                            <GlassContainer key={i} className="hover:border-[var(--color-gold)] transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">⚖️</div>
                                    <span className="text-xs text-gold border border-[var(--color-gold)] px-2 py-1 uppercase tracking-wider">{lawyer.rate}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors">{lawyer.name}</h3>
                                <p className="text-sm text-muted mb-4">{lawyer.speciality} • {lawyer.cases} Cases</p>
                                <button className="w-full py-2 border border-white/20 text-xs text-white uppercase tracking-widest hover:bg-white hover:text-[var(--color-emerald)] transition-colors">
                                    Book Consultation
                                </button>
                            </GlassContainer>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Dashboard & Vault (1/3) */}
                <div className="space-y-6">

                    {/* Case Management */}
                    <GlassContainer>
                        <h3 className="text-xs text-gold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Active Cases</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-white font-bold">Title Deed Transfer</p>
                                    <p className="text-xs text-muted">Waiting on Registry</p>
                                </div>
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                            </div>
                            <div className="flex justify-between items-center opacity-50">
                                <div>
                                    <p className="text-sm text-white font-bold">Tenancy Agreement</p>
                                    <p className="text-xs text-muted">Completed</p>
                                </div>
                                <span className="w-2 h-2 bg-emerald rounded-full"></span>
                            </div>
                        </div>
                    </GlassContainer>

                    {/* Secure Vault */}
                    <GlassContainer className="text-center group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                            🔒
                        </div>
                        <h3 className="text-white font-bold mb-1">Secure Vault</h3>
                        <p className="text-xs text-muted mb-4">Encrypted storage for sensitive docs.</p>
                        <div className="border-2 border-dashed border-white/20 p-4 rounded-lg group-hover:border-[var(--color-gold)] transition-colors">
                            <span className="text-xs text-muted uppercase tracking-wider">Upload / Access</span>
                        </div>
                    </GlassContainer>

                </div>
            </div>
        </div>
    );
}
