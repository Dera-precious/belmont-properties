'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Booking = {
    id: string;
    service: string;
    type: 'police' | 'drone' | 'legal' | 'surveyor' | 'architect';
    date: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Rejected'; // Added Rejected
    price: string;
    clientName?: string; // Added for Admin view
};

interface BookingContextType {
    bookings: Booking[];
    stats: { revenue: number; pending: number; active: number }; // Added Stats
    addBooking: (type: Booking['type'], date: string) => void;
    updateBookingStatus: (id: string, status: Booking['status']) => void; // New Function
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('belmont_bookings');
        if (saved) setBookings(JSON.parse(saved));
    }, []);

    // Save to local storage whenever bookings change
    useEffect(() => {
        if (bookings.length > 0) {
            localStorage.setItem('belmont_bookings', JSON.stringify(bookings));
        }
    }, [bookings]);

    // CALCULATE REAL-TIME STATS FOR ADMIN DASHBOARD
    const stats = bookings.reduce((acc, curr) => {
        // Parse price string "₦15,000" -> number 15000
        const numericPrice = parseInt(curr.price.replace(/[^0-9]/g, '')) || 0;

        if (curr.status !== 'Rejected') {
            acc.revenue += numericPrice;
        }
        if (curr.status === 'Pending') acc.pending += 1;
        if (curr.status === 'Confirmed') acc.active += 1;

        return acc;
    }, { revenue: 0, pending: 0, active: 0 });

    const addBooking = (type: Booking['type'], date: string) => {
        const prices = { police: '₦15,000', drone: '₦25,000', legal: '₦50,000', surveyor: '₦40,000', architect: '₦75,000' };
        const titles = { police: 'Safe Inspect™', drone: 'Aero View Audit', legal: 'Legal Shield Review', surveyor: 'Geo-Survey', architect: 'Design Consult' };

        const newBooking: Booking = {
            id: `BK-${Math.floor(Math.random() * 10000)}`,
            service: titles[type],
            type,
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Pending',
            price: prices[type],
            clientName: 'Returning User' // Simulating the logged-in user
        };

        setBookings(prev => [newBooking, ...prev]);
    };

    // NEW: Function for Admin to approve/reject
    const updateBookingStatus = (id: string, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    return (
        <BookingContext.Provider value={{ bookings, stats, addBooking, updateBookingStatus }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
}