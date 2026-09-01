import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/components/Marketing/Navbar';
import Footer from '@/components/Marketing/Footer';
import WhatsAppButton from '@/components/Marketing/WhatsAppButton';
import PromotionBanner from '@/components/Marketing/PromotionBanner';
import PromotionPopup from '@/components/Marketing/PromotionPopup';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    useEffect(() => {
        // Set standard layout direction
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
        
        // Remove existing font classes and add appropriate ones
        document.body.classList.remove('font-sans', 'font-arabic');
        document.body.classList.add(isRtl ? 'font-sans' : 'font-sans'); // Our font-sans handles both Cairo and Inter/Poppins
        
        // Add a primary background class
        document.body.classList.add('bg-background');
    }, [isRtl, locale]);

    return (
        <div className="relative flex flex-col min-h-screen bg-background selection:bg-secondary/30 selection:text-secondary-foreground font-sans">
            <Navbar />
            <PromotionBanner />
            <main className="flex-grow pt-24 lg:pt-28">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <PromotionPopup />
        </div>
    );
}
