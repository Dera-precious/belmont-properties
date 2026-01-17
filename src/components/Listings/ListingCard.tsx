import React from 'react';
import GlassContainer from '@/components/Shell/GlassContainer';

interface ListingProps {
    title: string;
    price: string;
    location: string;
    fraudStatus?: 'safe' | 'warning' | 'verified';
}

const ListingCard: React.FC<ListingProps> = ({ title, price, location, fraudStatus = 'safe' }) => {
    return (
        <GlassContainer className="relative group overflow-hidden transition-colors hover:border-[var(--color-gold)]">
            {/* Image Placeholder */}
            <div className="h-48 bg-emerald items-center justify-center flex relative mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-muted text-sm uppercase tracking-widest">Image Placeholder</span>

                {/* Fraud Flag Overlay */}
                {fraudStatus === 'warning' && (
                    <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 uppercase tracking-wider font-bold border"
                        style={{ backgroundColor: '#dc2626', borderColor: '#f87171', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        ⚠️ Fraud Alert
                    </div>
                )}
                {fraudStatus === 'verified' && (
                    <div className="absolute top-2 right-2 text-emerald text-xs px-2 py-1 uppercase tracking-wider font-bold border"
                        style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-emerald)', borderColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        ✓ Verified
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-muted mb-2 uppercase tracking-wide">{location}</p>
            <div className="text-2xl text-gold font-light mb-4">{price}</div>

            {/* Tools */}
            <div className="flex gap-2">
                <button className="flex-1 py-3 text-xs border border-[var(--color-text-muted)] text-muted hover:border-[var(--color-gold)] hover:text-gold transition-colors uppercase tracking-wider bg-transparent cursor-pointer">
                    Valuation
                </button>
                <button className="flex-1 py-3 text-xs border border-[var(--color-text-muted)] text-muted hover:border-[var(--color-gold)] hover:text-gold transition-colors uppercase tracking-wider bg-transparent cursor-pointer">
                    Mortgage
                </button>
            </div>
        </GlassContainer>
    );
};

export default ListingCard;
