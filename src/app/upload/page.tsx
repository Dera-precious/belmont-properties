'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// FIX: Import the Auth Context to save the listing to the user's profile
import { useAuth } from '@/app/context/AuthContext';
import {
    ArrowLeft, UploadCloud, Image as ImageIcon, MapPin,
    DollarSign, BedDouble, Bath, Square, Sparkles, Loader2, CheckCircle2
} from 'lucide-react';

export default function UploadPage() {
    const { addListing } = useAuth(); // Use the global function to save data
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [published, setPublished] = useState(false);

    // FORM STATE
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [area, setArea] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // IMAGE HANDLER
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // MOCK AI GENERATOR (The "Lazy" Feature)
    const generateDescription = () => {
        if (!title || !location) return;
        setIsGenerating(true);

        // Simulating an AI API call
        setTimeout(() => {
            setDescription(
                `Experience the pinnacle of luxury living in this stunning ${title}. ` +
                `Located in the exclusive neighborhood of ${location}, this masterpiece features ` +
                `floor-to-ceiling windows, imported Italian marble flooring, and a state-of-the-art smart home system. ` +
                `The open-concept design seamlessly blends indoor and outdoor living, perfect for the modern elite.`
            );
            setIsGenerating(false);
        }, 1500);
    };

    const handlePublish = () => {
        setIsPublishing(true);

        // 1. Create the new listing object
        const newListing = {
            title: title || 'Untitled Property',
            price: price ? `₦${Number(price).toLocaleString()}` : 'Price on Request',
            location: location || 'Unknown Location',
            description: description,
            image: imagePreview || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop", // Fallback image
            beds: beds || '0',
            baths: baths || '0',
            area: area ? `${area} sqm` : 'N/A',
            status: 'Active'
        };

        // 2. Save it to the Global State (so it appears on Home)
        addListing(newListing);

        // 3. Show Success Screen
        setTimeout(() => {
            setIsPublishing(false);
            setPublished(true);
        }, 1500);
    };

    if (published) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 font-sans">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-xl">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-4xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">Listing Published</h1>
                <p className="text-gray-500 mb-8">Your property is now live on the Belmont Marketplace.</p>
                <div className="flex gap-4">
                    <Link href="/" className="px-8 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90">
                        Back to Dashboard
                    </Link>
                    <button onClick={() => { setPublished(false); setTitle(''); setPrice(''); }} className="px-8 py-3 border border-gray-300 dark:border-gray-700 font-bold rounded-xl text-gray-500 hover:text-[#0F172A] dark:hover:text-white">
                        Add Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans transition-colors duration-500 p-4 md:p-8 pb-32">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-serif font-bold">Upload Property</h1>
                        <p className="text-xs text-gray-500">Add a new asset to the marketplace.</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Creator Mode
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT: FORM */}
                <div className="space-y-6">

                    {/* 1. MEDIA UPLOAD (The "Lazy" Drag & Drop) */}
                    <div className="relative bg-white dark:bg-[#1E293B] p-8 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center hover:border-[#D4AF37] transition-all cursor-pointer group overflow-hidden">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        {imagePreview ? (
                            <div className="absolute inset-0">
                                <img src={imagePreview} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-bold">Click to Change</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-gray-50 dark:bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={24} className="text-gray-400 group-hover:text-[#D4AF37]" />
                                </div>
                                <h3 className="font-bold text-lg">Drag & Drop Photos</h3>
                                <p className="text-sm text-gray-400 mb-4">or click to browse (Max 10MB)</p>
                                <div className="flex justify-center gap-2">
                                    <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">JPG</span>
                                    <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">PNG</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* 2. BASIC INFO */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 space-y-4 shadow-sm">
                        <h3 className="font-bold border-b border-gray-100 dark:border-gray-800 pb-2 text-sm uppercase tracking-wider text-gray-400">Asset Details</h3>

                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Property Title</label>
                            <input
                                type="text"
                                placeholder="e.g. The Royal Lekki Villa"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all border border-transparent focus:border-[#D4AF37]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Price (₦)</label>
                                <div className="relative">
                                    <DollarSign size={14} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="150,000,000"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full p-3 pl-8 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Location</label>
                                <div className="relative">
                                    <MapPin size={14} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Ikoyi, Lagos"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full p-3 pl-8 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Beds</label>
                                <input type="number" placeholder="5" value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Baths</label>
                                <input type="number" placeholder="6" value={baths} onChange={(e) => setBaths(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Area</label>
                                <input type="number" placeholder="600" value={area} onChange={(e) => setArea(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]" />
                            </div>
                        </div>
                    </div>

                    {/* 3. AI DESCRIPTION */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 relative overflow-hidden shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Description</h3>
                            <button
                                onClick={generateDescription}
                                disabled={isGenerating || !title}
                                className="flex items-center gap-2 text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full font-bold hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors disabled:opacity-50"
                            >
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                {isGenerating ? 'Writing...' : 'Auto-Generate'}
                            </button>
                        </div>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the property features, view, and finishing..."
                            className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl outline-none resize-none text-sm leading-relaxed focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:border-[#D4AF37]"
                        />
                    </div>

                </div>

                {/* RIGHT: PREVIEW CARD (Sticky) */}
                <div className="lg:sticky lg:top-24 h-fit space-y-6">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Live Preview</h3>

                    {/* THE CARD */}
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
                        <div className="h-64 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} className="w-full h-full object-cover animate-in fade-in" />
                            ) : (
                                <ImageIcon size={48} className="text-gray-400" />
                            )}
                            <div className="absolute top-4 left-4 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                New Listing
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1 truncate text-[#0F172A] dark:text-white">{title || "Property Title"}</h3>
                            <p className="font-serif font-bold text-lg text-[#D4AF37] mb-2">{price ? `₦${Number(price).toLocaleString()}` : "₦0.00"}</p>
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-4">
                                <MapPin size={12} /> {location || "Location City, State"}
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <span className="flex items-center gap-1"><BedDouble size={14} /> {beds || 0} Beds</span>
                                <span className="flex items-center gap-1"><Bath size={14} /> {baths || 0} Baths</span>
                                <span className="flex items-center gap-1"><Square size={14} /> {area || 0} sqm</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePublish}
                        disabled={!title || !price || isPublishing}
                        className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPublishing ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
                        {isPublishing ? 'Publishing Asset...' : 'Publish Listing'}
                    </button>

                </div>

            </div>
        </div>
    );
}