"use client";
import React, { useState } from 'react';

const OfflineToggle = () => {
    const [isOffline, setIsOffline] = useState(false);

    return (
        <div className="flex items-center gap-4 p-4 mb-6 border border-[var(--color-gold)] bg-emerald/20">
            <div className="flex-1">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Offline Mode</h3>
                <p className="text-muted text-xs">Access critical data without internet.</p>
            </div>

            <button
                onClick={() => setIsOffline(!isOffline)}
                className={`relative w-12 h-6 transition-colors duration-200 ease-in-out border border-[var(--color-gold)] ${isOffline ? 'bg-gold' : 'bg-transparent'}`}
            >
                <span
                    className={`block w-4 h-4 bg-white transform transition-transform duration-200 ease-in-out ${isOffline ? 'translate-x-7 bg-emerald' : 'translate-x-1'}`}
                    style={{ backgroundColor: isOffline ? 'var(--color-emerald)' : 'white' }}
                />
            </button>

            {isOffline && <span className="text-xs text-gold animate-pulse">Syncing needed</span>}
        </div>
    );
};

export default OfflineToggle;
