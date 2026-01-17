import React from 'react';
import Link from 'next/link';

const TopNav = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl glass-panel px-6 py-3 flex items-center justify-between rounded-full border-opacity-40 shadow-2xl">

            {/* BRAND LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-black/40 text-[var(--color-gold)] font-serif text-lg">
                    B
                </div>
                <span className="text-lg font-bold tracking-widest bg-gradient-to-r from-[var(--color-gold)] to-white bg-clip-text text-transparent group-hover:to-[var(--color-gold)] transition-all duration-500 font-cinzel">
                    BELMONT
                </span>
            </Link>

            {/* SEARCH BAR (Compact) */}
            <div className="hidden md:flex flex-1 mx-8 max-w-sm relative group">
                <input
                    type="text"
                    placeholder="Search ecosystem..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-xs text-white placeholder-white/30 outline-none focus:border-[var(--color-gold)] focus:bg-black/40 transition-all font-manrope tracking-wide"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--color-gold)] transition-colors">🔍</span>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-6">
                <button className="relative group">
                    <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🔔</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-gold)] rounded-full animate-pulse"></span>
                </button>

                <Link href="/profile" className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-widest">Architect</p>
                        <p className="text-xs text-white font-bold">J. Doe</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-black p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs">JD</div>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default TopNav;
