'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, PenTool, Home, Users, BookOpen, Scale, Search, Bell, Menu } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="flex min-h-screen">

            {/* 1. ROYAL SAPPHIRE SIDEBAR */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-[#0F172A] text-white hidden md:flex flex-col z-50 shadow-2xl">
                <div className="p-8">
                    <h1 className="text-2xl font-serif tracking-widest text-[#D4AF37]">BELMONT</h1>
                    <p className="text-xs text-gray-400 tracking-[0.2em]">ESTATES</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-8">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Central Hub" active />
                    <NavItem icon={<PenTool size={18} />} label="Plan Generator" />
                    <NavItem icon={<Home size={18} />} label="Listings" />
                    <NavItem icon={<Users size={18} />} label="Collab" />
                    <NavItem icon={<BookOpen size={18} />} label="Mentorship" />
                    <NavItem icon={<Scale size={18} />} label="Legal" />
                </nav>

                <div className="p-8 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center font-serif text-[#0F172A]">JD</div>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-gray-400">Architect</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA (Limestone Background) */}
            <main className="flex-1 md:ml-64 p-8 bg-[#FAFAF9]">

                {/* Top Navigation */}
                <header className="flex justify-between items-center mb-12">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search properties, clients, docs..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0F172A]"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white rounded-full border border-gray-200 text-[#0F172A]">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-96 rounded-3xl overflow-hidden shadow-sm mb-12 group"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                    {/* Hero Text */}
                    <div className="absolute bottom-10 left-10 text-white">
                        <p className="text-sm tracking-widest mb-2 uppercase text-[#D4AF37]">Welcome Back</p>
                        <h2 className="text-5xl font-serif mb-4">The Crystal Villa</h2>
                        <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0F172A] transition-all">
                            Resume Project
                        </button>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ActionCard title="New Project" icon={<PenTool />} delay={0.1} />
                    <ActionCard title="Upload Site" icon={<Home />} delay={0.2} />
                    <ActionCard title="Find Mentor" icon={<BookOpen />} delay={0.3} />
                    <ActionCard title="Legal Help" icon={<Scale />} delay={0.4} />
                </div>

            </main>
        </div>
    );
}

// Helper Components
function NavItem({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#D4AF37] text-[#0F172A] font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
}

function ActionCard({ title, icon, delay }: { title: string, icon: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
            <div className="w-12 h-12 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-[#D4AF37] transition-colors mb-4">
                {icon}
            </div>
            <h3 className="font-medium text-[#0F172A]">{title}</h3>
        </motion.div>
    );
}