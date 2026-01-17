"use client";
import React from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function MentorshipPage() {
    const mentors = [
        { name: "Chief T. Balogun", role: "Estate Developer", experience: "25 Years", skills: ["Negotiation", "Land Law"] },
        { name: "Mrs. F. Adebayo", role: "Senior Architect", experience: "18 Years", skills: ["Green Design", "Urban Planning"] },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col items-center">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Mentorship Program.</h1>
                <p className="text-xl text-muted">Connect with industry veterans.</p>
            </header>

            {/* Matching Interface (Cards) */}
            <div className="w-full max-w-md mb-16 relative">
                {mentors.map((mentor, i) => (
                    <GlassContainer key={i} className={`absolute inset-0 h-[400px] border-[var(--color-gold)] flex flex-col justify-end p-8 transition-transform duration-500 hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${i === 0 ? 'z-20 rotate-0' : 'z-10 rotate-3 translate-x-4 bg-emerald/80'}`}>
                        <div className="flex-1 mb-4 border border-[var(--color-gold)] bg-emerald/30 flex items-center justify-center text-6xl opacity-50">
                            👤
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">{mentor.name}</h2>
                        <p className="text-gold uppercase tracking-widest text-sm mb-4">{mentor.role} • {mentor.experience}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {mentor.skills.map(skill => (
                                <span key={skill} className="text-[10px] border border-white/20 px-2 py-1 text-muted uppercase tracking-wider">{skill}</span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 py-3 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors uppercase font-bold text-xs tracking-widest">Pass</button>
                            <button className="flex-1 py-3 border border-[var(--color-gold)] text-gold hover:bg-[var(--color-gold)] hover:text-[var(--color-emerald)] transition-colors uppercase font-bold text-xs tracking-widest">Connect</button>
                        </div>
                    </GlassContainer>
                ))}
                {/* Spacer to push content below absolute cards */}
                <div className="h-[400px]"></div>
            </div>

            {/* Progress Tracker */}
            <div className="w-full max-w-2xl mt-8">
                <h3 className="text-center text-muted uppercase tracking-widest text-sm mb-6">Your Growth Journey</h3>

                <GlassContainer className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs text-white uppercase tracking-wider mb-2">
                            <span>Networking Goals</span>
                            <span>3/5 Connected</span>
                        </div>
                        <div className="h-2 bg-white/10 w-full">
                            <div className="h-full bg-[var(--color-gold)] w-[60%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-white uppercase tracking-wider mb-2">
                            <span>Knowledge Base</span>
                            <span>85% Completed</span>
                        </div>
                        <div className="h-2 bg-white/10 w-full">
                            <div className="h-full bg-emerald border border-[var(--color-gold)] w-[85%]"></div>
                        </div>
                    </div>
                </GlassContainer>
            </div>
        </div>
    );
}
