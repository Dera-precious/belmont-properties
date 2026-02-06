import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import EntranceAnim from "@/components/EntranceAnim";
import { AuthProvider } from "@/app/context/AuthContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
// NEW: Import the Booking Provider
import { BookingProvider } from "@/app/context/BookingContext";

export const metadata: Metadata = {
    title: "Belmont Properties",
    description: "The Operating System for Real Estate",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>

            <body className="bg-[#FAFAF9] dark:bg-[#0F172A] font-sans">
                <ThemeProvider>
                    <AuthProvider>
                        {/* 1. WRAP THE APP WITH BOOKING PROVIDER */}
                        <BookingProvider>

                            {/* The Entrance Animation sits here */}
                            <EntranceAnim />

                            <div className="flex min-h-screen pb-20 md:pb-0 transition-colors duration-500">

                                <Sidebar />

                                <div className="flex-1 w-full bg-[#FAFAF9] dark:bg-[#0F172A] overflow-x-hidden text-[#0F172A] dark:text-white transition-colors duration-500">
                                    {children}
                                </div>

                                <MobileNav />

                            </div>
                        </BookingProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}