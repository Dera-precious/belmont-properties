'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// DEFINE USER TYPE (Updated with all Tiers)
interface User {
    id: string;
    name: string;
    email: string;
    role: 'tenant' | 'agent' | 'admin' | 'partner';
    // ADDED: Premium and Gold to support your pricing page
    tier: 'Free' | 'Pro' | 'Premium' | 'Gold' | 'Diamond';
}

interface AuthContextType {
    user: User | null;
    // Login now correctly takes 4 arguments
    login: (email: string, role: User['role'], name: string, tier: User['tier']) => void;
    logout: () => void;
    // Upgrade function is explicitly defined here
    upgradeTier: (newTier: string) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // 1. CHECK SUPABASE SESSION ON LOAD
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    const meta = session.user.user_metadata;
                    setUser({
                        id: session.user.id,
                        email: session.user.email!,
                        name: meta.full_name || 'User',
                        role: meta.role || 'tenant',
                        tier: meta.tier || 'Free'
                    });
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();

        // 2. LISTEN FOR CHANGES
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const meta = session.user.user_metadata;
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: meta.full_name || 'User',
                    role: meta.role || 'tenant',
                    tier: meta.tier || 'Free'
                });
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                router.push('/login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    // MANUAL LOGIN
    const login = (email: string, role: User['role'], name: string, tier: User['tier']) => {
        setUser({
            id: 'temp-id',
            email,
            role,
            name,
            tier,
        });
    };

    // MANUAL LOGOUT
    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/login');
    };

    // UPGRADE TIER FUNCTION
    const upgradeTier = async (newTier: string) => {
        if (!user) {
            router.push('/signup'); // Redirect if not logged in
            return;
        }

        try {
            // 1. Update Supabase
            const { error } = await supabase.auth.updateUser({
                data: { tier: newTier }
            });

            if (error) throw error;

            // 2. Update Local State
            // We use 'as any' here just to be safe with the string type, 
            // but in a strict app we would validate it matches the 'tier' type.
            setUser({ ...user, tier: newTier as User['tier'] });

            alert(`Success! You are now on the ${newTier} Plan.`);
            router.push('/dashboard');

        } catch (error) {
            console.error("Upgrade failed:", error);
            alert("Upgrade failed. Please try again.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, upgradeTier, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}