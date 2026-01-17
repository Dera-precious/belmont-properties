import React from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

export default function TenantPortalPage() {
    const quickActions = [
        { icon: '💳', label: 'Pay Rent' },
        { icon: '🔧', label: 'Maintenance' },
        { icon: '🔑', label: 'Smart Lock' },
        { icon: '📦', label: 'Packages' }
    ];

    const announcements = [
        { title: 'Gym Maintenance', date: 'Today', content: 'The gym will be closed from 2pm to 4pm for deep cleaning.' },
        { title: 'Package Locker Update', date: 'Yesterday', content: 'New codes have been sent to your email.' },
        { title: 'Community BBQ', date: 'Jan 15', content: 'Join us on the roof deck this Saturday!' }
    ];

    return (
        <div className="min-h-[calc(100vh-80px)] p-4 max-w-md mx-auto md:max-w-7xl">
            <header className="mb-8 mt-4">
                <h1 className="text-3xl font-light text-white tracking-tight mb-1">Hello, Tenant.</h1>
                <p className="text-sm text-muted">Unit 402 • Lekki Gardens</p>
            </header>

            {/* RENT STATUS CARD */}
            <GlassContainer className="mb-8 border-l-4 border-[var(--color-gold)]">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-gold uppercase tracking-widest">Next Payment</span>
                    <span className="text-2xl font-bold text-white">₦ 2.5M</span>
                </div>
                <p className="text-xs text-muted mb-4">Due: Feb 1, 2026</p>
                <button className="w-full bg-[var(--color-gold)] text-[var(--color-emerald)] py-3 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
                    Pay Now
                </button>
            </GlassContainer>

            {/* QUICK ACTIONS GRID */}
            <section className="mb-8">
                <h2 className="text-xs text-muted mb-4 uppercase tracking-widest">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, i) => (
                        <button key={i} className="glass-panel p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                            <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
                            <span className="text-xs text-white uppercase tracking-wide font-bold">{action.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* COMMUNITY FEED */}
            <section>
                <h2 className="text-xs text-muted mb-4 uppercase tracking-widest">Community Board</h2>
                <div className="space-y-4">
                    {announcements.map((item, i) => (
                        <GlassContainer key={i} className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10"></div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                                <span className="text-[10px] text-muted border border-white/20 px-2 py-1 rounded-full">{item.date}</span>
                            </div>
                            <p className="text-xs text-muted leading-relaxed">{item.content}</p>
                        </GlassContainer>
                    ))}
                </div>
            </section>
        </div>
    );
}
