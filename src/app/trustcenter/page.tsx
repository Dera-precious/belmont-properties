'use client';

import React, { useState } from 'react';
import PaymentModal from '@/components/PaymentModal';
import { useBookings } from '@/app/context/BookingContext'; // IMPORT BOOKING CONTEXT
import { Shield, Plane, Scale, Ruler, ArrowRight, CheckCircle2, PenTool, AlertCircle } from 'lucide-react';

type ServiceType = 'police' | 'drone' | 'legal' | 'surveyor' | 'architect';

const SERVICES = {
    police: { price: 15000, title: 'Safe Inspect™', desc: 'Book a verified Mobile Police (MOPOL) escort.' },
    drone: { price: 25000, title: 'Aero View', desc: 'Deploy a licensed drone pilot for a 4K audit.' },
    legal: { price: 50000, title: 'Legal Shield', desc: 'Hire a top-tier property lawyer for contract review.' },
    surveyor: { price: 40000, title: 'Geo-Survey', desc: 'Book a registered surveyor for land coordinates.' },
    architect: { price: 75000, title: 'Design Consult', desc: 'Consult a registered architect for structural review.' }
};

export default function TrustCenterPage() {
    const [bookingType, setBookingType] = useState<ServiceType | null>(null);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // PULL THE ADD BOOKING FUNCTION FROM CONTEXT
    const { addBooking } = useBookings();

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    // SAVE BOOKING TO DATABASE ON SUCCESS
    const handlePaymentSuccess = async (reference: any, finalAmount: number) => {
        if (!bookingType) return;

        const serviceName = SERVICES[bookingType].title;
        setBookingType(null); // Close modal

        try {
            // TRIGGER THE DATABASE SAVE
            await addBooking(serviceName, finalAmount, reference.reference);
            showToast(`Payment successful! Your ${serviceName} is confirmed. Ref: ${reference.reference}`, 'success');
        } catch (error) {
            console.error("Failed to save booking:", error);
            showToast("Payment successful, but failed to save receipt.", 'error');
        }
    };

    const selectedService = bookingType ? SERVICES[bookingType] : null;

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans p-6 md:p-12 pb-32 transition-colors duration-500 relative">

            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 font-bold text-sm max-w-md w-full md:w-auto ${toast.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
                        : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                    }`}>
                    {toast.type === 'success' ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                    <span className="truncate">{toast.message}</span>
                </div>
            )}

            {selectedService && (
                <PaymentModal
                    isOpen={!!bookingType}
                    onClose={() => setBookingType(null)}
                    title={`Book ${selectedService.title}`}
                    description={selectedService.desc}
                    fixedAmount={selectedService.price}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}

            <div className="max-w-7xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Trust Layer.</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                    Real estate is risky. We removed the risk. Book verified government security,
                    licensed drone pilots, and senior legal counsel directly through Belmont.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group hover:border-blue-500 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400"><Shield size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Safe Inspect™</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Deploy a verified Mobile Police (MOPOL) officer to escort you during site visits.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Starting At</p><p className="text-xl font-bold font-serif">₦15,000</p></div>
                            <button onClick={() => setBookingType('police')} className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">Book Officer <ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group hover:border-[#D4AF37] transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 text-[#D4AF37]"><Plane size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Aero View</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Can't make it to the site? We send a licensed drone pilot to record a 4K audit.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Standard Flight</p><p className="text-xl font-bold font-serif">₦25,000</p></div>
                            <button onClick={() => setBookingType('drone')} className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">Deploy Drone <ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group hover:border-purple-500 transition-colors">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400"><Scale size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Legal Shield</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Hire top-tier property lawyers to review deeds, verify titles, and draft contracts.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Contract Review</p><p className="text-xl font-bold font-serif">₦50,000</p></div>
                            <button onClick={() => setBookingType('legal')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Find Lawyer</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group hover:border-orange-500 transition-colors">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400"><Ruler size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Geo-Survey</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Verify land coordinates and perimeter fencing with registered surveyors.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Per Plot</p><p className="text-xl font-bold font-serif">₦40,000</p></div>
                            <button onClick={() => setBookingType('surveyor')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Book Surveyor</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative group md:col-span-2 lg:col-span-1 hover:border-teal-500 transition-colors">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400"><PenTool size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">Design Consult</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Hire a registered architect for renovation advice, floor plan optimization, or structural review.</p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Site Visit</p><p className="text-xl font-bold font-serif">₦75,000</p></div>
                            <button onClick={() => setBookingType('architect')} className="px-6 py-3 border-2 border-[#0F172A] dark:border-gray-600 text-[#0F172A] dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A] transition-colors">Book Architect</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}