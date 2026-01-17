"use client";
import React, { useState } from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function CollabPage() {
    const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'milestones'>('chat');

    const messages = [
        { user: 'Architect', text: 'I have updated the floor plan based on the new dimensions.', time: '10:30 AM' },
        { user: 'You', text: 'Great! Does it include the garage extension?', time: '10:32 AM' },
        { user: 'Architect', text: 'Yes, check the "Files" tab for v2.pdf', time: '10:35 AM' }
    ];

    const milestones = [
        { title: 'Initial Concept', status: 'completed', date: 'Jan 10' },
        { title: 'Structural Drawing', status: 'pending', date: 'Jan 18' },
        { title: 'Final Approval', status: 'locked', date: 'Jan 25' }
    ];

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-6 max-w-7xl mx-auto">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-light text-white tracking-tight">Project Alpha Chat</h1>
                    <p className="text-sm text-muted">Collab ID: #88291</p>
                </div>
                <div className="glass-panel p-1 flex gap-1">
                    {[
                        { id: 'chat', icon: '💬', label: 'Chat' },
                        { id: 'files', icon: '📂', label: 'Files' },
                        { id: 'milestones', icon: '🚩', label: 'Milestones' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--color-gold)] text-[var(--color-emerald)]' : 'text-muted hover:text-white'}`}
                        >
                            <span>{tab.icon}</span> {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* CONTENT AREA */}
            <GlassContainer className="flex-1 overflow-hidden flex flex-col relative">

                {/* CHAT TAB */}
                {activeTab === 'chat' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                                    <span className="text-[10px] text-muted uppercase tracking-widest mb-1">{msg.user} • {msg.time}</span>
                                    <div className={`max-w-[70%] p-3 text-sm ${msg.user === 'You' ? 'bg-[var(--color-gold)] text-[var(--color-emerald)] font-bold' : 'bg-white/10 text-white'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[var(--color-text-muted)] flex gap-2">
                            <input className="flex-1 bg-transparent border border-[var(--color-text-muted)] p-3 text-white outline-none focus:border-[var(--color-gold)]" placeholder="Type a message..." />
                            <button className="bg-[var(--color-gold)] text-[var(--color-emerald)] px-6 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">Send</button>
                        </div>
                    </div>
                )}

                {/* FILES TAB */}
                {activeTab === 'files' && (
                    <div className="h-full">
                        <div className="border-2 border-dashed border-[var(--color-gold)] h-32 flex items-center justify-center mb-8 cursor-pointer hover:bg-white/5 transition-colors">
                            <p className="text-muted text-sm uppercase tracking-wider">Drag & Drop Blueprints Here</p>
                        </div>
                        <h3 className="text-gold text-xs uppercase tracking-widest mb-4">Project Files</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Floorplan_v1.pdf', 'Site_Survey.jpg', 'Contract_Signed.pdf'].map((file, i) => (
                                <div key={i} className="p-4 bg-white/5 border border-white/10 hover:border-[var(--color-gold)] cursor-pointer transition-colors flex items-center gap-3">
                                    <span className="text-2xl">📄</span>
                                    <span className="text-sm text-white truncate">{file}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MILESTONES TAB */}
                {activeTab === 'milestones' && (
                    <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-full max-w-2xl relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10"></div>

                            <div className="space-y-8">
                                {milestones.map((m, i) => (
                                    <div key={i} className="relative flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 ${m.status === 'completed' ? 'bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-emerald)]' : m.status === 'pending' ? 'bg-emerald border-[var(--color-gold)] text-gold animate-pulse' : 'bg-emerald border-white/20 text-muted'}`}>
                                            {m.status === 'completed' ? '✓' : i + 1}
                                        </div>
                                        <div className="flex-1 glass-panel p-4 flex justify-between items-center group hover:border-[var(--color-gold)] transition-colors">
                                            <div>
                                                <h4 className={`text-sm font-bold uppercase tracking-wider ${m.status === 'locked' ? 'text-muted' : 'text-white'}`}>{m.title}</h4>
                                                <span className="text-xs text-muted">{m.date}</span>
                                            </div>
                                            {m.status === 'pending' && (
                                                <button className="px-4 py-2 border border-[var(--color-gold)] text-gold text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-[var(--color-emerald)] transition-colors">
                                                    Approve & Pay
                                                </button>
                                            )}
                                            {m.status === 'completed' && <span className="text-xs text-gold uppercase tracking-widest">Paid</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </GlassContainer>
        </div>
    );
}
