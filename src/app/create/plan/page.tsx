'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, HardHat, Download, Ruler, Layers,
    Zap, DollarSign, Cpu, BrainCircuit, Maximize2
} from 'lucide-react';

export default function CreatePlan() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Initializing...');

    const [projectTitle, setProjectTitle] = useState('');
    const [propertyType, setPropertyType] = useState('Modern');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState('');

    // ANIMATION SEQUENCE
    useEffect(() => {
        if (isGenerating) {
            setProgress(0);
            setStatusText('Initializing Neural Architect...');
            const stages = [
                { time: 1000, progress: 30, text: 'Scanning Terrain Data...' },
                { time: 2500, progress: 60, text: 'Drafting Structural Framework...' },
                { time: 4000, progress: 85, text: 'Calculating Material Costs...' },
                { time: 5500, progress: 100, text: 'Finalizing Blueprints...' },
            ];
            stages.forEach((stage, index) => {
                setTimeout(() => {
                    setProgress(stage.progress);
                    setStatusText(stage.text);
                    if (index === stages.length - 1) {
                        setTimeout(() => { setIsGenerating(false); setHasGenerated(true); }, 1000);
                    }
                }, stage.time);
            });
        }
    }, [isGenerating]);

    const handleGenerate = () => { if (!projectTitle) return; setIsGenerating(true); setHasGenerated(false); };

    const getRenderImage = () => {
        if (propertyType === 'Modern') return "https://cdn.luxury-houses.net/wp-content/uploads/2020/11/Concept-Design-of-Stunning-7-Bedroom-Modern-Villa-in-La-Zagaleta-Spain-9.jpg";
        if (propertyType === 'Traditional') return "https://cdn.trendir.com/wp-content/uploads/old/house-design/assets_c/2014/01/traditional-exterior-hides-colourfully-contemporary-interior-1-pool-thumb-970xauto-30359.jpg";
        return "https://mha.us.com/wp-content/uploads/2023/04/Overall-Image-1536x954.jpg";
    };
    const blueprintUrl = "https://www.cambridgehomes.co.nz/wp-content/uploads/2023/08/Floorplan_1853941919.png";

    return (
        // APPLIED THEME CLASSES TO MAIN CONTAINER
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans flex flex-col md:flex-row overflow-hidden transition-colors duration-500">

            {/* LEFT PANEL: INPUTS (Themed) */}
            {/* FIX: Added isGenerating to the hidden condition so it vanishes on mobile during animation */}
            <div className={`w-full md:w-1/3 bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-gray-800 p-8 flex flex-col h-screen overflow-y-auto z-20 shadow-xl ${(hasGenerated || isGenerating) ? 'hidden md:flex' : 'flex'}`}>
                <div className="mb-8">
                    <Link href="/create" className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white mb-4 inline-flex items-center gap-2 transition-colors">
                        <ArrowLeft size={14} /> Back to Studio
                    </Link>
                    <h1 className="text-3xl font-serif font-bold mb-2">AI Plan Generator</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Define parameters. Initialize Belmont Neural Architect.</p>
                </div>

                {/* THEMED INPUTS */}
                <div className="space-y-6 flex-1">
                    <div>
                        <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 block">Project Codename</label>
                        <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="e.g. Project Onyx" className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-[#0F172A] dark:text-white text-sm focus:border-[#D4AF37] outline-none transition-all placeholder:text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 block">Style</label>
                            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-[#0F172A] dark:text-white text-sm outline-none appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                                <option>Modern</option><option>Traditional</option><option>Industrial</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 block">Budget (₦)</label>
                            <div className="relative">
                                <DollarSign size={14} className="absolute left-4 top-4 text-gray-500" />
                                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="150M" className="w-full p-4 pl-10 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-[#0F172A] dark:text-white text-sm outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 block">Specs & Vision</label>
                        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe rooms, materials, lighting..." className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl text-[#0F172A] dark:text-white text-sm focus:border-[#D4AF37] outline-none resize-none transition-all placeholder:text-gray-400" />
                    </div>
                </div>
                <button onClick={handleGenerate} disabled={!projectTitle || isGenerating} className="w-full py-4 bg-[#D4AF37] text-[#0F172A] font-bold rounded-xl mt-6 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 group relative overflow-hidden">{isGenerating ? (<><Cpu className="animate-spin" size={18} /> GENERATING...</>) : (<><Zap size={18} /> GENERATE BLUEPRINT</>)}</button>
            </div>

            {/* RIGHT PANEL: VISUALIZATION (Themed) */}
            <div className="flex-1 bg-[#FAFAF9] dark:bg-[#0F172A] relative overflow-y-auto h-screen p-4 md:p-8 flex flex-col items-center transition-colors duration-500">

                {/* BACKGROUND GLOW (ADAPTIVE) */}
                {!hasGenerated && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-200 dark:bg-[#D4AF37] opacity-20 dark:opacity-5 rounded-full blur-[120px] pointer-events-none"></div>
                )}

                {/* STANDBY STATE */}
                {!isGenerating && !hasGenerated && (
                    <div className="relative z-10 flex flex-col items-center justify-center opacity-40">
                        <div className="w-24 h-24 rounded-2xl border border-gray-300 dark:border-gray-700 flex items-center justify-center mb-6 bg-white dark:bg-[#1E293B]">
                            <HardHat size={48} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-2xl font-serif">System Standby</p>
                    </div>
                )}

                {/* GENERATING STATE */}
                {isGenerating && (
                    <div className="w-full max-w-md flex flex-col items-center justify-center z-10 my-auto">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 bg-white dark:bg-[#1E293B] rounded-full border-2 border-[#D4AF37] flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_#D4AF3750]">
                                <BrainCircuit size={48} className="text-[#D4AF37] animate-pulse relative z-10" />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(212,175,55,0.2),transparent)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                            </div>
                            <div className="absolute inset-0 border-2 border-dashed border-[#D4AF37]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        </div>
                        <h2 className="text-xl font-bold mb-4 tracking-widest animate-pulse">{statusText}</h2>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
                            <div className="h-full bg-gradient-to-r from-[#D4AF37] to-yellow-200 transition-all duration-1000 ease-out relative" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}

                {/* GENERATED RESULT (THEMED CARDS) */}
                {hasGenerated && (
                    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 z-10 pb-20">

                        {/* 1. 3D RENDER */}
                        <div className="w-full bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl relative group border border-gray-100 dark:border-gray-800">
                            <div className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-[#0F172A] px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-1"><Layers size={10} /> 3D Visualization</div>
                            <div className="absolute top-4 right-4 z-10"><Maximize2 size={20} className="text-white drop-shadow-md cursor-pointer hover:scale-110 transition-transform" /></div>
                            <img src={getRenderImage()} alt="Render" className="w-full h-64 md:h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>

                        {/* 2. BLUEPRINT CARD */}
                        <div className="w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800">
                            <div className="bg-white dark:bg-[#1E293B] h-64 md:h-[400px] w-full relative flex items-center justify-center overflow-hidden rounded-t-3xl z-0">
                                <div className="absolute top-4 left-4 z-20 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"><Ruler size={12} /> Technical Drawing</div>
                                {/* INVERT IMAGE IN DARK MODE FOR BETTER VIEWING */}
                                <img src={blueprintUrl} alt="Blueprint" className="w-full h-full object-cover opacity-90 dark:invert-[.9]" />
                            </div>

                            {/* THEMED STATS FOOTER */}
                            <div className="bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white p-6 flex flex-wrap justify-between items-center gap-4 rounded-b-3xl relative z-10 border-t border-gray-100 dark:border-gray-800">
                                <div><p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Total Area</p><p className="text-xl font-bold">853 SQM</p></div>
                                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                                <div><p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Config</p><p className="text-xl font-bold">6 BED / 7 BATH</p></div>
                                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                                <div><p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Est. Cost</p><p className="text-xl font-bold text-[#D4AF37]">₦{budget ? Number(budget).toLocaleString() : '363,200,000'}</p></div>
                                <button className="ml-auto bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors flex items-center gap-2"><Download size={16} /> Save Plan</button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}