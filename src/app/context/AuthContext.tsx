'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// DEFINE USER TYPE
interface User {
    id: string;
    name: string;
    email: string;
    role: 'tenant' | 'agent' | 'admin' | 'partner';
    tier: 'Free' | 'Pro' | 'Premium' | 'Gold' | 'Diamond';
    savedIds?: number[];
    avatarUrl?: string;
}

// DEFINE CONTEXT TYPE
interface AuthContextType {
    user: User | null;
    login: (email: string, role: User['role'], name: string, tier: User['tier']) => void;
    logout: () => void;
    upgradeTier: (newTier: string) => Promise<void>;
    toggleSave: (id: number) => void;
    updateAvatar: (url: string) => Promise<void>;
    updateName: (newName: string) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

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
                        tier: meta.tier || 'Free',
                        savedIds: [],
                        avatarUrl: meta.avatar_url || undefined
                    });
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const meta = session.user.user_metadata;
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: meta.full_name || 'User',
                    role: meta.role || 'tenant',
                    tier: meta.tier || 'Free',
                    savedIds: [],
                    avatarUrl: meta.avatar_url || undefined
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

    const login = (email: string, role: User['role'], name: string, tier: User['tier']) => {
        setUser({ id: 'temp-id', email, role, name, tier, savedIds: [] });
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/login');
    };

    const upgradeTier = async (newTier: string) => {
        if (!user) return;
        try {
            const { error } = await supabase.auth.updateUser({ data: { tier: newTier } });
            if (error) throw error;
            setUser({ ...user, tier: newTier as User['tier'] });
            alert(`Success! You are now on the ${newTier} Plan.`);
            router.push('/dashboard');
        } catch (error) {
            console.error("Upgrade failed:", error);
        }
    };

    const toggleSave = (id: number) => {
        if (!user) return;
        const currentSaves = user.savedIds || [];
        const isSaved = currentSaves.includes(id);
        const newSaves = isSaved ? currentSaves.filter(savedId => savedId !== id) : [...currentSaves, id];
        setUser({ ...user, savedIds: newSaves });
    };

    const updateAvatar = async (url: string) => {
        if (!user) return;
        try {
            const { error } = await supabase.auth.updateUser({
                data: { avatar_url: url }
            });
            if (error) throw error;
            setUser({ ...user, avatarUrl: url });
        } catch (error) {
            console.error("Failed to save avatar URL:", error);
            throw error;
        }
    };

    // UPDATE NAME FUNCTION
    const updateName = async (newName: string) => {
        if (!user) return;
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: newName }
            });
            if (error) throw error;
            setUser({ ...user, name: newName });
        } catch (error) {
            console.error("Failed to save new name:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, upgradeTier, toggleSave, updateAvatar, updateName, isLoading }}>
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