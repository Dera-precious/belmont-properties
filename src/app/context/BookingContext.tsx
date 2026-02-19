'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

export interface Booking {
    id: string;
    service: string;
    price: string; // Formatted string like "₦15,000"
    status: string;
    date: string;  // Formatted date
}

interface BookingContextType {
    bookings: Booking[];
    addBooking: (service: string, amount: number, reference: string) => Promise<void>;
    isLoading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = async () => {
        if (!user) {
            setBookings([]);
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format data for the UI
            const formattedBookings = data.map((b) => ({
                id: b.id.substring(0, 8).toUpperCase(), // Shorten ID for UI
                service: b.service,
                price: `₦${b.price.toLocaleString()}`,
                status: b.status,
                date: new Date(b.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                })
            }));

            setBookings(formattedBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);

    // Function to add a booking after successful payment
    const addBooking = async (service: string, amount: number, reference: string) => {
        if (!user) return;

        try {
            const { error } = await supabase.from('bookings').insert({
                user_id: user.id,
                service: service,
                price: amount,
                status: 'Confirmed',
                reference: reference
            });

            if (error) throw error;
            fetchBookings(); // Refresh the list
        } catch (error) {
            console.error("Error saving booking:", error);
        }
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, isLoading }}>
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