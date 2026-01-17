import React from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function MarketingSuite() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-cinzel text-white mb-6">Marketing Suite</h1>
            <p className="text-xl text-muted font-manrope max-w-2xl mb-12">Generate ultra-realistic 3D renders and copy for your listings.</p>

            <GlassContainer className="p-12 border-[var(--color-gold)] flex flex-col items-center">
                <div className="text-6xl mb-6">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-muted">This module is under development.</p>
            </GlassContainer>
        </div>
    );
}
