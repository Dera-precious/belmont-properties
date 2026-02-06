'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// UPDATED INTERFACE (Fixes the TS Error)
interface Listing {
    id: number;
    title: string;
    price: string;
    location: string;
    description: string; // Added this!
    image: string;
    status: 'Active' | 'Pending';
}

interface User {
    name: string;
    role: 'architect' | 'tenant';
    email: string;
    tier: 'Free' | 'Pro' | 'Premium' | 'Gold' | 'Diamond';
    savedIds: number[];
    myListings: Listing[];
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: 'architect' | 'tenant', name?: string) => void;
    upgradeTier: (tier: User['tier']) => void;
    toggleSave: (id: number) => void;
    addListing: (listing: Omit<Listing, 'id' | 'status'>) => void;
    updateListing: (id: number, updatedData: Partial<Listing>) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('belmont_user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (!parsed.savedIds) parsed.savedIds = [];
                if (!parsed.myListings) parsed.myListings = [];
                setUser(parsed);
            } catch (e) {
                localStorage.removeItem('belmont_user');
            }
        }
    }, []);

    const login = (email: string, role: 'architect' | 'tenant', name?: string) => {
        const newUser: User = {
            name: name || email.split('@')[0],
            role,
            email,
            tier: 'Free',
            savedIds: [],
            myListings: []
        };
        setUser(newUser);
        localStorage.setItem('belmont_user', JSON.stringify(newUser));
    };

    const upgradeTier = (tier: User['tier']) => {
        if (user) {
            const updatedUser = { ...user, tier };
            setUser(updatedUser);
            localStorage.setItem('belmont_user', JSON.stringify(updatedUser));
            setTimeout(() => router.push('/profile'), 100);
        } else {
            router.push('/login');
        }
    };

    const toggleSave = (id: number) => {
        if (!user) return router.push('/login');
        const currentSaved = user.savedIds || [];
        const isSaved = currentSaved.includes(id);
        const newSavedIds = isSaved ? currentSaved.filter(i => i !== id) : [...currentSaved, id];
        const updatedUser = { ...user, savedIds: newSavedIds };
        setUser(updatedUser);
        localStorage.setItem('belmont_user', JSON.stringify(updatedUser));
    };

    const addListing = (data: Omit<Listing, 'id' | 'status'>) => {
        if (!user) return;
        const newListing: Listing = {
            id: Date.now(),
            ...data,
            status: 'Active'
        };
        // SPREAD PREVIOUS LISTINGS CORRECTLY
        const updatedListings = [newListing, ...(user.myListings || [])];
        const updatedUser = { ...user, myListings: updatedListings };
        setUser(updatedUser);
        localStorage.setItem('belmont_user', JSON.stringify(updatedUser));
    };

    const updateListing = (id: number, updatedData: Partial<Listing>) => {
        if (!user) return;
        const updatedListings = user.myListings.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        );
        const updatedUser = { ...user, myListings: updatedListings };
        setUser(updatedUser);
        localStorage.setItem('belmont_user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('belmont_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, upgradeTier, toggleSave, addListing, updateListing, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}