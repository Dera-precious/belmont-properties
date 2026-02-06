'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import {
    UploadCloud, Link as LinkIcon, X, DollarSign,
    MapPin, CheckCircle2, ArrowLeft
} from 'lucide-react';

export default function CreateListing() {
    const { addListing } = useAuth();
    const [imageMode, setImageMode] = useState<'upload' | 'link'>('upload');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '', price: '', location: '', description: '', imageUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // CRITICAL FIX: Convert image to Base64 so it persists
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewUrl(base64String);
                setFormData({ ...formData, imageUrl: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) {
            setPreviewUrl(url);
            setFormData({ ...formData, imageUrl: url });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            addListing({
                title: formData.title,
                price: `₦${Number(formData.price).toLocaleString()}`,
                location: formData.location,
                description: formData.description,
                // Use the Base64 string or fallback
                image: formData.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop'
            });

            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce"><CheckCircle2 size={48} className="text-green-600" /></div>
            <h2 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">Listing Published!</h2>
            <Link href="/"><button className="px-8 py-3 bg-[#0F172A] text-white rounded-xl font-bold">Go to Dashboard</button></Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-4 md:p-8 font-sans pb-32">
            <div className="max-w-4xl mx-auto">
                <Link href="/create" className="text-sm text-gray-500 hover:text-[#0F172A] dark:hover:text-white mb-6 inline-flex items-center gap-2"><ArrowLeft size={16} /> Back to Studio</Link>
                <h1 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white mb-8">Upload New Property</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Uploader */}
                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm h-fit">
                        <h3 className="font-bold mb-4 text-[#0F172A] dark:text-white">Property Image</h3>
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
                            <button onClick={() => setImageMode('upload')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-[#0F172A] shadow-sm text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Device Upload</button>
                            <button onClick={() => setImageMode('link')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${imageMode === 'link' ? 'bg-white dark:bg-[#0F172A] shadow-sm text-[#0F172A] dark:text-white' : 'text-gray-400'}`}>Image Link</button>
                        </div>
                        <div className="aspect-square bg-gray-50 dark:bg-[#0F172A] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group">
                            {previewUrl ? (
                                <><img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /><button onClick={() => { setPreviewUrl(null); setFormData({ ...formData, imageUrl: '' }); }} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full"><X size={16} /></button></>
                            ) : (
                                <div className="text-center p-8">
                                    {imageMode === 'upload' ? (
                                        <><UploadCloud size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-sm font-bold text-gray-500 mb-2">Click to Upload</p><input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" /></>
                                    ) : (
                                        <><LinkIcon size={48} className="text-gray-300 mx-auto mb-4" /><input type="text" placeholder="Paste image URL here..." onBlur={handleUrlBlur} className="w-full p-2 text-xs bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-center outline-none focus:border-[#D4AF37]" /></>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                        <div><label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Property Title</label><input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Modern Glass Villa" className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Price (₦)</label><input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                            <div><label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Location</label><input required type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Lagos" className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white" /></div>
                        </div>
                        <div><label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Description</label><textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe features..." className="w-full p-4 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37] text-[#0F172A] dark:text-white resize-none" /></div>
                        <button type="submit" disabled={isSubmitting || !formData.imageUrl} className="w-full py-4 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">{isSubmitting ? "Publishing..." : "Publish Listing"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}