import React from 'react';

interface GlassContainerProps {
    children: React.ReactNode;
    className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`glass-panel p-6 ${className}`}>
            {children}
        </div>
    );
};

export default GlassContainer;
