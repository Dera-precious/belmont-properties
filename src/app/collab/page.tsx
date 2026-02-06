'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import {
    ArrowLeft, MoreVertical, Send, Wallet, FileText,
    CheckCircle, Users, Lock, AlertCircle, Loader2
} from 'lucide-react';

export default function CollabPage() {
    const { user } = useAuth();

    // CHAT STATE
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState([
        { id: 1, sender: 'Arc. Ifeanyi', role: 'Architect', time: '10:00 AM', text: "I've updated the floor plans. The kitchen is now 20% larger as requested.", attachment: 'Floor_Plan_v2.pdf' },
        { id: 2, sender: 'You', role: 'Owner', time: '10:15 AM', text: "Looks great! Does this affect the total budget?", isMe: true },
        { id: 3, sender: 'Barr. Chidem', role: 'Legal', time: '10:20 AM', text: "I have reviewed the land titles. We are clear to proceed with payment." },
    ]);

    // AUTO-SCROLL TO BOTTOM
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // HANDLE SEND
    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'You',
            role: 'Owner',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: input,
            isMe: true
        };

        setMessages((prev) => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // SIMULATE ARCHITECT REPLY (DEMO MAGIC)
        setTimeout(() => {
            const replyMsg = {
                id: Date.now() + 1,
                sender: 'Arc. Ifeanyi',
                role: 'Architect',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: "Received. I'll update the bill of quantities and share the new estimate shortly.",
                isMe: false
            };
            setMessages((prev) => [...prev, replyMsg]);
            setIsTyping(false);
        }, 2500);
    };

    // TIER GATING
    const hasAccess = user?.tier === 'Premium' || user?.tier === 'Gold' || user?.tier === 'Diamond';

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] p-8 font-sans flex flex-col items-center justify-center text-center transition-colors duration-500">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <Lock size={40} className="text-gray-400" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">War Room Locked</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                    Upgrade to <strong>Gold Tier</strong> to access live project management, architectural chats, and financial tracking.
                </p>
                <div className="flex gap-4">
                    <Link href="/" className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                        Back Home
                    </Link>
                    <Link href="/pricing" className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0F172A] font-bold hover:bg-[#b5952f]">
                        Upgrade Access
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans transition-colors duration-500">

            {/* HEADER */}
            <header className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-colors">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-[#0F172A] dark:text-white" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white">BELMONT</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">COLLAB HUB</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        <Avatar initials="JD" color="bg-[#0F172A] dark:bg-black border-white dark:border-[#1E293B]" />
                        <Avatar initials="AR" color="bg-[#D4AF37] border-white dark:border-[#1E293B]" />
                        <Avatar initials="SV" color="bg-blue-900 border-white dark:border-[#1E293B]" />
                    </div>
                    <button className="px-4 py-2 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] text-sm rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center gap-2 font-bold">
                        <Users size={16} /> Invite
                    </button>
                </div>
            </header>

            {/* MAIN LAYOUT */}
            <main className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)]">

                {/* COLUMN 1: Projects */}
                <div className="hidden lg:block lg:col-span-3 space-y-4 overflow-y-auto">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Active Projects</h2>
                    <ProjectCard title="Lekki Phase 1 Villa" status="Active" progress={65} milestone="Roofing" active />
                    <ProjectCard title="Enugu Palm Estate" status="Pending" progress={10} milestone="Foundation" />
                    <ProjectCard title="Abuja Central Office" status="On Hold" progress={45} milestone="Permits" />
                </div>

                {/* COLUMN 2: Chat Stream */}
                <div className="col-span-1 lg:col-span-6 flex flex-col bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="font-medium text-[#0F172A] dark:text-white">Lekki Phase 1 Villa</span>
                        </div>
                        <MoreVertical size={18} className="text-gray-400 cursor-pointer" />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#FAFAF9] dark:bg-[#0F172A]">
                        {messages.map((msg) => (
                            <Message key={msg.id} {...msg} />
                        ))}

                        {/* Milestone Alert */}
                        <div className="flex justify-center">
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 text-xs px-3 py-1 rounded-full flex items-center gap-2">
                                <AlertCircle size={12} />
                                <span>Milestone "Foundation" marked as complete by Site Engineer.</span>
                            </div>
                        </div>

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Loader2 size={12} className="animate-spin" /> Arc. Ifeanyi is typing...
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-[#1E293B] border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0F172A] p-2 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition-all">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-2 outline-none text-[#0F172A] dark:text-white"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-[#0F172A] dark:bg-[#D4AF37] text-white dark:text-[#0F172A] rounded-lg hover:opacity-90 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* COLUMN 3: Financials */}
                <div className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-[#0F172A] dark:bg-black text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group border border-transparent dark:border-gray-800">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet size={80} />
                        </div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Budget</p>
                        <h3 className="text-3xl font-serif text-[#D4AF37] mb-4">₦150.5M</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm"><span className="text-gray-400">Paid</span><span className="font-medium">₦45.0M</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: '30%' }}></div></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-400">Outstanding</span><span className="font-medium text-red-300">₦105.5M</span></div>
                        </div>
                        <button className="w-full mt-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm hover:bg-[#D4AF37] hover:text-[#0F172A] hover:border-[#D4AF37] transition-all font-medium">Split Bill</button>
                    </div>

                    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h3 className="font-serif text-[#0F172A] dark:text-white mb-4">Pending Approvals</h3>
                        <div className="space-y-3">
                            <TaskItem label="Approve Site Plan" due="Today" />
                            <TaskItem label="Sign Contractor Agreement" due="Tomorrow" />
                            <TaskItem label="Release Tranche 2 Payment" due="In 3 days" />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

/* --- HELPER COMPONENTS --- */

function ProjectCard({ title, status, active, progress, milestone }: { title: string, status: string, active?: boolean, progress: number, milestone: string }) {
    return (
        <div className={`p-4 rounded-xl border cursor-pointer transition-all ${active ? 'bg-white dark:bg-[#1E293B] border-[#D4AF37] shadow-md' : 'bg-white dark:bg-[#1E293B] border-transparent hover:border-gray-200 dark:hover:border-gray-600'}`}>
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${active ? 'bg-[#0F172A] text-[#D4AF37]' : 'bg-gray-100 dark:bg-black text-gray-500'}`}><FileText size={18} /></div>
                <span className={`text-[10px] px-2 py-1 rounded-full border ${active ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'}`}>{status}</span>
            </div>
            <h4 className="font-medium text-sm text-[#0F172A] dark:text-white">{title}</h4>
            <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>{milestone}</span><span>{progress}%</span></div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1"><div className="bg-[#D4AF37] h-1 rounded-full" style={{ width: `${progress}%` }}></div></div>
            </div>
        </div>
    );
}

function Message({ sender, role, time, text, isMe, attachment }: { sender: string, role: string, time: string, text: string, isMe?: boolean, attachment?: string }) {
    return (
        <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isMe ? 'bg-[#D4AF37] text-[#0F172A]' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{sender[0]}</div>
            <div className={`max-w-[70%] space-y-1 ${isMe ? 'items-end flex flex-col' : ''}`}>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">{sender}</span>
                    <span className="text-[10px] text-gray-400 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">{role}</span>
                    <span className="text-[10px] text-gray-300">{time}</span>
                </div>
                <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-[#0F172A] text-white rounded-tr-none' : 'bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-none'}`}>
                    <p>{text}</p>
                    {attachment && (
                        <div className="mt-2 flex items-center gap-2 p-2 bg-black/5 dark:bg-white/10 rounded-lg border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/10 transition-colors">
                            <FileText size={14} /><span className="text-xs underline">{attachment}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TaskItem({ label, due }: { label: string, due: string }) {
    return (
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer group transition-colors">
            <div className="text-gray-300 dark:text-gray-600 group-hover:text-[#D4AF37] transition-colors"><CheckCircle size={18} /></div>
            <div className="flex-1"><p className="text-sm text-[#0F172A] dark:text-white line-clamp-1">{label}</p><p className="text-[10px] text-gray-400">{due}</p></div>
        </div>
    );
}

function Avatar({ initials, color }: { initials: string, color: string }) {
    return (
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs text-white font-medium ${color}`}>{initials}</div>
    );
}