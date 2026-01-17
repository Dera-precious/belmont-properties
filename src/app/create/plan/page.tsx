"use client";
import React, { useState } from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function PlanGeneratorPage() {
    const [activeTab, setActiveTab] = useState<'2d' | 'layout' | 'specs'>('2d');
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => setIsOptimizing(false), 3000); // Simulate 3s optimization
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row">
            {/* LEFT PANEL - INPUTS (1/3) */}
            <div className="w-full md:w-1/3 p-6 border-r border-[var(--color-gold)] overflow-y-auto bg-emerald/50">
                <h1 className="text-3xl font-light text-white mb-6 tracking-tight">Plan Generator.</h1>

                {/* Project Details */}
                <section className="mb-8">
                    <h2 className="text-xs text-gold uppercase tracking-widest mb-4">Project Details</h2>
                    <button className="w-full h-32 border-2 border-dashed border-[var(--color-gold)] rounded-lg flex flex-col items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-colors group mb-6">
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                        <span className="text-xs uppercase tracking-widest">Upload Inspiration</span>
                    </button>

                    <div className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-2 block">Project Name</label>
                            <input type="text" placeholder="e.g. Eko Atlantic Villa" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 outline-none focus:border-[var(--color-gold)] transition-colors font-manrope" />
                        </div>

                        <div className="group">
                            <label className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-2 block">Dimensions (sqm)</label>
                            <input type="text" placeholder="Total Area" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 outline-none focus:border-[var(--color-gold)] transition-colors font-manrope" />
                        </div>

                        <div className="group">
                            <label className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-2 block">Architectural Style</label>
                            <select className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[var(--color-gold)] transition-colors font-manrope cursor-pointer">
                                <option className="bg-black text-white">Modern Contemporary</option>
                                <option className="bg-black text-white">Brutalist</option>
                                <option className="bg-black text-white">Traditional</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* AI Visual Search */}
                <section className="mb-8">
                    <h2 className="text-xs text-gold uppercase tracking-widest mb-4">AI Visual Search</h2>
                    <div className="border-2 border-dashed border-[var(--color-gold)] p-8 text-center cursor-pointer hover:bg-white/5 transition-colors group">
                        <span className="text-4xl block mb-2 opacity-70 group-hover:scale-110 transition-transform">📷</span>
                        <p className="text-sm text-white font-bold mb-1">Upload Reference Style</p>
                        <p className="text-xs text-muted">Drop an image to match aesthetic.</p>
                    </div>
                </section>

                {/* Style Selector */}
                <section>
                    <h2 className="text-xs text-gold uppercase tracking-widest mb-4">Architectural Style</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {['Modern', 'Colonial', 'Minimalist', 'Brutalist'].map(style => (
                            <button key={style} className="p-3 text-xs border border-[var(--color-text-muted)] text-muted hover:border-[var(--color-gold)] hover:text-white transition-colors text-left uppercase tracking-wider">
                                {style}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* RIGHT PANEL - CANVAS (2/3) */}
            <div className="w-full md:w-2/3 relative bg-[#011c12] flex flex-col">
                {/* Top Toolbar / Tabs */}
                <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start pointer-events-none">
                    <div className="glass-panel p-1 flex gap-1 pointer-events-auto">
                        {[
                            { id: '2d', label: '2D Plans' },
                            { id: 'layout', label: 'Floor Layouts' },
                            { id: 'specs', label: 'Material Specs' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all ${activeTab === tab.id ? 'bg-[var(--color-gold)] text-[var(--color-emerald)]' : 'text-muted hover:text-white'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 flex items-center justify-center relative overlow-hidden">
                    {/* Grid Lines Background */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Mock Content */}
                    <div className={`transition-all duration-1000 ${isOptimizing ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100'}`}>
                        {activeTab === '2d' && (
                            <div className="w-[400px] h-[500px] border-4 border-white/20 relative">
                                {/* Rooms */}
                                <div className="absolute top-0 left-0 w-1/2 h-1/3 border-b border-r border-white/20 flex items-center justify-center text-white/30 text-xs uppercase tracking-widest">Master Bed</div>
                                <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-l border-white/20 flex items-center justify-center text-white/30 text-xs uppercase tracking-widest">Living Area</div>
                                <div className="absolute bottom-0 left-0 w-2/3 h-1/3 border-t border-r border-white/20 flex items-center justify-center text-white/30 text-xs uppercase tracking-widest">Garage</div>
                            </div>
                        )}
                        {activeTab === 'layout' && (
                            <div className="text-center">
                                <span className="text-6xl block mb-4">🛋️</span>
                                <p className="text-muted">Furniture Layout AI Generating...</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div className="glass-panel p-6 w-[300px]">
                                <h3 className="text-gold border-b border-gold pb-2 mb-4 uppercase tracking-widest text-xs">Material Bill</h3>
                                <div className="space-y-2 text-xs text-white">
                                    <div className="flex justify-between"><span>Concrete</span> <span>400 bags</span></div>
                                    <div className="flex justify-between"><span>Steel (16mm)</span> <span>200 units</span></div>
                                    <div className="flex justify-between"><span>Glass Panels</span> <span>45 sqm</span></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Optimizing Overlay */}
                    {isOptimizing && (
                        <div className="absolute inset-0 flex items-center justify-center z-30">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                                <p className="text-gold uppercase tracking-widest text-sm animate-pulse">Re-calculating Light & Space...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* FAB */}
                <button
                    onClick={handleOptimize}
                    className="absolute bottom-8 right-8 bg-[var(--color-gold)] text-[var(--color-emerald)] px-6 py-4 font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105 transition-all flex items-center gap-2 z-40"
                >
                    <span>✨</span> Auto-Optimize Flow
                </button>
            </div>
        </div>
    );
}
