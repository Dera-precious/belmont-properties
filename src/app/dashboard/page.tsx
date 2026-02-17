'use client';
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-6 pt-24 text-center">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
                <LayoutDashboard size={40} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white mb-4">Dashboard</h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Welcome to your central command center.
            </p>
        </div>
    );
}