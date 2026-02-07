'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Wand2, Download, Layers, Maximize2,
    AlertCircle, FileText, Image as ImageIcon, Loader2,
    Brain, Cpu, Sparkles
} from 'lucide-react';

// 1. UPDATED IMAGE LINKS (As requested)
const styleImages: Record<string, { exterior: string, blueprint: string }> = {
    Modern: {
        exterior: 'https://i.pinimg.com/1200x/4f/91/2e/4f912e41011355b608e2b0b66cc5ef61.jpg',
        blueprint: 'https://www.maramani.com/cdn/shop/products/1._Ground_Floor_Plan.jpg?v=1698137242&width=800'
    },
    Industrial: {
        exterior: 'https://mha.us.com/wp-content/uploads/2023/04/Overall-Image-1536x954.jpg',
        blueprint: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2574&auto=format&fit=crop&v=7'
    },
    Traditional: {
        exterior: 'https://cdn.trendir.com/wp-content/uploads/old/house-design/assets_c/2014/01/traditional-exterior-hides-colourfully-contemporary-interior-1-pool-thumb-970xauto-30359.jpg',
        blueprint: 'https://images.unsplash.com/photo-1596522354195-e8455305bc3d?q=80&w=2574&auto=format&fit=crop&v=7'
    }
};

const constructionSteps = [
    "Neural Engine Initialized...",
    "Analyzing Terrain Topography...",
    "Calculating Structural Load...",
    "Optimizing Floor Plan Layout...",
    "Rendering Photorealistic Textures..."
];

export default function PlanGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasResult, setHasResult] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);

    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Modern');
    const [selectedBudget, setSelectedBudget] = useState('100M - 250M');
    const [error, setError] = useState('');
    const [resultData, setResultData] = useState({ cost: '0', area: '0', rooms: '0' });

    useEffect(() => {
        if (prompt && !isGenerating && !hasResult) {
            setPrompt('');
        }
    }, [selectedStyle]);

    const calculateFakeData = () => {
        let basePrice = 0;
        let baseArea = 0;

        if (selectedBudget === '50M - 100M') { basePrice = 75; baseArea = 350; }
        else if (selectedBudget === '100M - 250M') { basePrice = 180; baseArea = 500; }
        else if (selectedBudget === '250M - 500M') { basePrice = 350; baseArea = 850; }
        else { basePrice = 650; baseArea = 1200; }

        const randomPrice = (basePrice + Math.random() * 20).toFixed(1);
        const randomArea = Math.floor(baseArea + Math.random() * 50);
        const rooms = baseArea > 600 ? '6 Bed / 7 Bath' : '4 Bed / 5 Bath';

        setResultData({
            cost: `₦${randomPrice}M`,
            area: `${randomArea} sqm`,
            rooms: rooms
        });
    };

    const handleGenerate = () => {
        if (!prompt.trim()) {
            setError('Please describe the property to generate a blueprint.');
            return;
        }
        setError('');

        setIsGenerating(true);
        setHasResult(false);
        setLoadingStep(0);
        calculateFakeData();
    };

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setLoadingStep((prev) => {
                    if (prev < constructionSteps.length - 1) return prev + 1;
                    return prev;
                });
            }, 1500);

            const timeout = setTimeout(() => {
                setIsGenerating(false);
                setHasResult(true);
            }, 7500);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [isGenerating]);

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white flex flex-col font-sans pb-20 md:pb-0 transition-colors duration-500">

            {/* HEADER */}
            <header className="h-16 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-[#1E293B] z-10 sticky top-0 transition-colors">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-[#0F172A] dark:text-white">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <h1 className="font-serif font-bold text-lg">Creation Engine <span className="text-[#D4AF37] text-xs font-sans tracking-wide ml-2">V 7.0</span></h1>
                </div>
                <div className="hidden md:flex gap-3">
                    <button className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white">History</button>
                    <button className="px-4 py-2 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] text-sm rounded-lg flex items-center gap-2 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-colors font-bold">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden md:overflow-hidden overflow-y-auto">

                {/* LEFT PANEL: Controls */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] p-6 md:p-8 overflow-y-auto flex flex-col h-auto md:h-full shrink-0 z-10 transition-colors">
                    <div className="mb-8">
                        <h2 className="text-2xl font-serif mb-2">Design your vision</h2>
                        <p className="text-gray-400 text-sm">Describe the property details below.</p>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Project Name</label>
                            <input
                                type="text"
                                placeholder="e.g. The Enugu Heights"
                                className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none transition-colors text-sm text-[#0F172A] dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Prompt <span className="text-red-500">*</span></label>
                            <textarea
                                rows={5}
                                value={prompt}
                                onChange={(e) => {
                                    setPrompt(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder={`Describe the ${selectedStyle} architecture...`}
                                className={`w-full p-3 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none transition-colors text-sm resize-none text-[#0F172A] dark:text-white ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
                            />
                            {error && (
                                <div className="flex items-center gap-2 mt-2 text-red-500 text-xs animate-pulse">
                                    <AlertCircle size={12} /> {error}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Budget (₦)</label>
                                <select
                                    value={selectedBudget}
                                    onChange={(e) => setSelectedBudget(e.target.value)}
                                    className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none cursor-pointer hover:border-[#D4AF37] transition-colors text-[#0F172A] dark:text-white"
                                >
                                    <option>50M - 100M</option>
                                    <option>100M - 250M</option>
                                    <option>250M - 500M</option>
                                    <option>500M+</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Style</label>
                                <select
                                    value={selectedStyle}
                                    onChange={(e) => setSelectedStyle(e.target.value)}
                                    className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none cursor-pointer hover:border-[#D4AF37] transition-colors text-[#0F172A] dark:text-white"
                                >
                                    <option value="Modern">Modern</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Traditional">Traditional</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full mt-8 py-4 bg-gradient-to-r from-[#0F172A] to-[#1e293b] dark:from-white dark:to-gray-200 text-white dark:text-[#0F172A] rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <Wand2 size={20} className="text-[#D4AF37] dark:text-[#0F172A]" /> Generate Blueprint
                            </>
                        )}
                    </button>
                </div>

                {/* RIGHT PANEL: Visualizer */}
                <div className="w-full md:w-2/3 bg-[#FAFAF9] dark:bg-[#0F172A] p-6 flex flex-col gap-4 relative overflow-y-auto min-h-[500px] md:h-full transition-colors">

                    {/* 1. EMPTY STATE */}
                    {!isGenerating && !hasResult && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 flex items-center justify-center">
                                <Layers size={40} className="text-gray-400 dark:text-gray-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Ready to Visualize</h3>
                            <p className="text-sm mt-2 max-w-xs mx-auto">Select a style and enter a prompt to generate a 3D render and blueprints.</p>
                        </div>
                    )}

                    {/* 2. LOADING STATE (THE GOLD BRAIN ANIMATION) */}
                    {isGenerating && (
                        <div className="flex-1 w-full bg-[#0F172A] dark:bg-black rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl overflow-hidden min-h-[500px] relative">

                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] opacity-20 animate-pulse"></div>

                            {/* The Brain */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="relative z-10 mb-8"
                            >
                                <Brain size={80} className="text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="absolute -top-4 -left-4 w-28 h-28 border border-dashed border-[#D4AF37]/30 rounded-full"
                                />
                            </motion.div>

                            {/* The Loading Text */}
                            <div className="h-8 relative z-10 text-center">
                                <motion.p
                                    key={loadingStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-[#D4AF37] font-mono text-sm tracking-widest uppercase font-bold"
                                >
                                    {constructionSteps[loadingStep]}
                                </motion.p>
                            </div>

                            {/* Processing Chips */}
                            <div className="flex gap-2 mt-4 opacity-50">
                                <Cpu size={14} className="text-[#D4AF37] animate-pulse" />
                                <Sparkles size={14} className="text-[#D4AF37] animate-pulse delay-75" />
                                <Cpu size={14} className="text-[#D4AF37] animate-pulse delay-150" />
                            </div>
                        </div>
                    )}

                    {/* 3. RESULT STATE */}
                    {hasResult && !isGenerating && (
                        <>
                            {/* Top: 3D Render */}
                            <motion.div
                                key={selectedStyle + "ext"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex-[2] bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm overflow-hidden relative group border border-gray-200 dark:border-gray-700 min-h-[300px]"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
                                    style={{ backgroundImage: `url("${styleImages[selectedStyle].exterior}")` }}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-full flex items-center gap-2 uppercase tracking-wider font-bold">
                                        <ImageIcon size={12} className="text-[#D4AF37]" /> {selectedStyle} Render
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors text-white"><Maximize2 size={16} /></button>
                                </div>
                            </motion.div>

                            {/* Bottom: Technical Blueprint */}
                            <motion.div
                                key={selectedStyle + "blue"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex-[2] bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm overflow-hidden relative border border-gray-200 dark:border-gray-700 min-h-[200px]"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-80"
                                    style={{ backgroundImage: `url("${styleImages[selectedStyle].blueprint}")` }}
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-[#0F172A] text-white text-[10px] rounded-full flex items-center gap-2 uppercase tracking-wider font-bold">
                                        <FileText size={12} className="text-white" /> Technical Drawing
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-black/90 backdrop-blur p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg right-4 md:right-auto">
                                    <div className="flex gap-4 md:gap-6 text-xs text-[#0F172A] dark:text-white justify-between md:justify-start">
                                        <div>
                                            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total Area</p>
                                            <p className="font-bold font-serif text-sm">{resultData.area}</p>
                                        </div>
                                        <div className="w-px bg-gray-200 dark:bg-gray-700 h-full"></div>
                                        <div>
                                            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Config</p>
                                            <p className="font-bold font-serif text-sm">{resultData.rooms}</p>
                                        </div>
                                        <div className="w-px bg-gray-200 dark:bg-gray-700 h-full"></div>
                                        <div>
                                            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Est. Cost</p>
                                            <p className="font-bold font-serif text-sm text-[#D4AF37]">{resultData.cost}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}