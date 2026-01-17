import React from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';
import OfflineToggle from '@/components/Profile/OfflineToggle';

export default function ProfilePage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-5xl font-light text-white mb-2 tracking-tight">Settings.</h1>
                <p className="text-xl text-muted">Manage security and preferences.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Account Security */}
                <section>
                    <h2 className="text-sm text-gold mb-6 uppercase tracking-widest">Security</h2>

                    <GlassContainer className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Two-Factor Authentication</h3>
                                <p className="text-sm text-muted">Protect your property portfolio.</p>
                            </div>
                            <span className="text-xs text-red-400 border border-red-400 px-2 py-1 uppercase tracking-wider">Disabled</span>
                        </div>
                        <button className="w-full py-3 text-xs border border-[var(--color-gold)] text-gold hover:bg-[var(--color-gold)] hover:text-[var(--color-emerald)] transition-colors uppercase tracking-widest font-bold">
                            Setup 2FA
                        </button>
                    </GlassContainer>

                    <GlassContainer>
                        <h3 className="text-lg font-bold text-white mb-4">Audit Logs</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between text-xs border-b border-[var(--color-text-muted)] pb-2 last:border-0 opacity-70">
                                    <span className="text-white">Login Attempt</span>
                                    <span className="text-muted">Oct {20 + i}, 14:0{i}</span>
                                </div>
                            ))}
                        </div>
                    </GlassContainer>
                </section>

                {/* Preferences */}
                <section>
                    <h2 className="text-sm text-gold mb-6 uppercase tracking-widest">Preferences</h2>

                    <OfflineToggle />

                    <GlassContainer>
                        <h3 className="text-lg font-bold text-white mb-4">Role Management</h3>
                        <div className="flex gap-2">
                            <button className="flex-1 py-8 border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-emerald)] font-bold uppercase tracking-wider text-xs">
                                Tenant
                            </button>
                            <button className="flex-1 py-8 border border-[var(--color-text-muted)] text-muted hover:border-[var(--color-gold)] hover:text-white transition-colors uppercase tracking-wider text-xs">
                                Landlord
                            </button>
                        </div>
                    </GlassContainer>
                </section>
            </div>
        </div>
    );
}
