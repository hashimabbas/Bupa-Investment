import React from 'react';
import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';

export default function WhatsAppButton() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const settings = (props.siteSettings as Record<string, string>) || {};
    const isRtl = locale === 'ar';

    if (!settings.whatsapp_number) return null;

    const message = isRtl
        ? 'مرحباً بوبا، أود التواصل معكم بخصوص منتجاتكم وخدماتكم.'
        : 'Hello Bupa, I\'d like to get in touch regarding your products and services.';

    const openWhatsApp = async () => {
        try {
            await axios.post('/api/contact/track', {
                scenario: 'general',
                page: window.location.pathname
            });
        } catch (e) {
            console.error('WhatsApp tracking failed', e);
        }

        const url = `https://api.whatsapp.com/send?phone=${settings.whatsapp_number}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-[100]`}>
            <button
                onClick={openWhatsApp}
                title={isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white bg-emerald-600 transition-all duration-500 hover:scale-110 active:scale-95 relative"
            >
                <MessageCircle className="w-8 h-8" />
                <span className="absolute inset-0 animate-ping bg-emerald-500/30 rounded-full" />
            </button>
        </div>
    );
}
