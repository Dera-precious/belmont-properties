'use client';

import React, { useState } from 'react';
import { X, Calendar, Shield, Plane, CheckCircle2, Loader2, CreditCard, Scale, Ruler, PenTool, FileText } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext'; // IMPORT

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'physical' | 'police' | 'drone' | 'legal' | 'surveyor' | 'architect';
    price: number;
    propertyTitle?: string;
}

export default function BookingModal({ isOpen, onClose, type, price, propertyTitle }: BookingModalProps) {
    const { addBooking } = useBookings(); // USE HOOK
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleBooking = () => {
        setIsProcessing(true);

        // SAVE TO CONTEXT
        if (type !== 'physical') {
            addBooking(type, selectedDate || new Date().toISOString());
        }

        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 2000);
    };

    // ... (Keep the rest of your existing helper function 'getContent' and the JSX return exactly as it was)
    // HELPER: Get Dynamic Content based on Type
    const getContent = () => {
        switch (type) {
            case 'police': return { icon: <Shield size={24} className="text-blue-600" />, title: 'Safe Inspect™', sub: 'MOPOL Officer Escort', bg: 'bg-blue-50 border-blue-200 text-blue-700' };
            case 'drone': return { icon: <Plane size={24} className="text-[#D4AF37]" />, title: 'Aero View™', sub: 'Remote Drone Audit', bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#0F172A] dark:text-[#D4AF37]' };
            case 'legal': return { icon: <Scale size={24} className="text-purple-600" />, title: 'Legal Shield', sub: 'Contract Review & Verification', bg: 'bg-purple-50 border-purple-200 text-purple-700' };
            case 'surveyor': return { icon: <Ruler size={24} className="text-orange-600" />, title: 'Geo-Survey', sub: 'Perimeter & Land Check', bg: 'bg-orange-50 border-orange-200 text-orange-700' };
            case 'architect': return { icon: <PenTool size={24} className="text-teal-600" />, title: 'Design Consult', sub: 'Renovation & Layout Advice', bg: 'bg-teal-50 border-teal-200 text-teal-700' };
            default: return { icon: <CheckCircle2 size={24} />, title: 'Standard Visit', sub: 'Self-Guided Tour', bg: 'bg-gray-50 border-gray-200 text-gray-700' };
        }
    };

    const content = getContent();

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-[#0F172A]">
                    <div>
                        <h3 className="font-serif font-bold text-xl text-[#0F172A] dark:text-white">
                            {step === 3 ? 'Request Confirmed' : 'Service Request'}
                        </h3>
                        <p className="text-xs text-gray-500">{propertyTitle || 'General Service Booking'}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className={`p-4 rounded-xl border flex items-center gap-4 ${content.bg}`}>
                                <div className="p-3 rounded-full bg-white shadow-sm">{content.icon}</div>
                                <div>
                                    <h4 className="font-bold text-lg capitalize">{content.title}</h4>
                                    <p className="text-xs opacity-80">{content.sub}</p>
                                </div>
                                <div className="ml-auto font-bold text-lg">{price === 0 ? 'Free' : `₦${price / 1000}k`}</div>
                            </div>

                            {type === 'legal' ? (
                                <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-2">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400"><FileText size={20} /></div>
                                    <p className="text-xs font-bold text-gray-500">Upload Contract / C of O</p>
                                    <button className="text-xs text-[#D4AF37] font-bold underline">Choose File (PDF)</button>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                        <input type="date" className="w-full p-3 pl-12 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#D4AF37]" onChange={(e) => setSelectedDate(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setStep(2)} disabled={type !== 'legal' && !selectedDate} className="w-full py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">Continue</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-500">Service</span><span className="font-bold">{content.title}</span></div>
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-500">Total Due</span><span className="font-bold text-xl text-[#D4AF37]">{price === 0 ? '₦0.00' : `₦${price.toLocaleString()}`}</span></div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="px-6 py-4 font-bold text-gray-500">Back</button>
                                <button onClick={handleBooking} className="flex-1 py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90">
                                    {isProcessing ? <Loader2 className="animate-spin" /> : 'Pay & Book'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"><CheckCircle2 size={40} /></div>
                            <h4 className="text-2xl font-bold mb-2">Request Sent!</h4>
                            <p className="text-gray-500 text-sm mb-8">We will contact you shortly to confirm the appointment.</p>
                            <button onClick={onClose} className="w-full py-4 bg-gray-100 dark:bg-gray-800 font-bold rounded-xl">Close Window</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}