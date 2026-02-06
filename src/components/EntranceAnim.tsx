'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function EntranceAnim() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Keep animation visible for 3.5 seconds to read the text
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                    // Added p-6 to ensure text never touches screen edges on mobile
                    className="fixed inset-0 z-[9999] bg-[#0F172A] flex flex-col items-center justify-center pointer-events-none p-6"
                >
                    {/* 1. LOGO REVEAL */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        // Slightly smaller logo on mobile for better proportions
                        className="relative w-28 h-28 md:w-40 md:h-40 mb-6"
                    >
                        <Image
                            src="/belmont-logo-gold.png"
                            alt="Belmont Seal"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* TEXT CONTAINER - Constrains width on large screens */}
                    <div className="max-w-lg text-center">
                        {/* 2. COMPANY NAME REVEAL */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            // Tighter fonts and tracking for a more compact look
                            className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wider leading-tight"
                        >
                            BELMONT <span className="text-[#D4AF37] inline-block">PROPERTIES</span>
                        </motion.h1>

                        {/* 3. TAGLINE REVEAL */}
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "60px" }} // Shorter line
                                transition={{ delay: 1, duration: 0.8 }}
                                className="h-[1px] bg-[#D4AF37] my-4"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                // Smaller text and tighter tracking
                                className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest font-light leading-relaxed max-w-xs md:max-w-none mx-auto"
                            >
                                The Operating System for Real Estate
                            </motion.p>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}