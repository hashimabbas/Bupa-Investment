import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { X, Gift, ArrowRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function PromotionPopup() {
    const { props } = usePage();
    const offers = (props.offers as any[]) || [];
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const activePopup = offers.find(o => o.type === 'popup');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (activePopup) {
            // Delay the popup a bit for better UX
            const timer = setTimeout(() => {
                const hasSeen = localStorage.getItem(`offer_seen_${activePopup.id}`);
                if (!hasSeen) {
                    setIsOpen(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [activePopup]);

    if (!activePopup) return null;

    const title = isRtl ? activePopup.title_ar : activePopup.title_en;
    const description = isRtl ? activePopup.description_ar : activePopup.description_en;
    const buttonText = isRtl ? activePopup.button_text_ar : activePopup.button_text_en;

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem(`offer_seen_${activePopup.id}`, 'true');
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] animate-in fade-in duration-500" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[4rem] shadow-2xl z-[110] overflow-hidden animate-in zoom-in fade-in duration-500 border border-slate-100">
                    
                    <div className="relative p-8 lg:p-12 flex flex-col items-center text-center gap-8">
                        <Dialog.Close asChild>
                            <button className="absolute top-8 right-8 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors" onClick={handleClose}>
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>

                        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary shadow-xl shadow-primary/5 animate-bounce">
                            <Gift className="w-10 h-10" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                {title}
                            </h2>
                            <p className="text-slate-500 font-medium leading-relaxed italic">
                                {description}
                            </p>
                        </div>

                        {activePopup.link && (
                            <a 
                                href={activePopup.link} 
                                onClick={handleClose}
                                className="w-full h-16 bg-primary text-white rounded-3xl flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
                            >
                                {buttonText || (isRtl ? 'احصل على العرض' : 'Claim Offer')}
                                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                            </a>
                        )}

                        <button onClick={handleClose} className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-500 transition-colors">
                            {isRtl ? 'تخطي هذا العرض' : 'Dismiss this offer'}
                        </button>
                    </div>

                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-blue-500" />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
