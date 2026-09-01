import React from 'react';
import { usePage } from '@inertiajs/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export default function PromotionBanner() {
    const { props } = usePage();
    const offers = (props.offers as any[]) || [];
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const activeBanner = offers.find(o => o.type === 'banner');

    const [isVisible, setIsVisible] = React.useState(true);

    if (!activeBanner || !isVisible) return null;

    const title = isRtl ? activeBanner.title_ar : activeBanner.title_en;
    const buttonText = isRtl ? activeBanner.button_text_ar : activeBanner.button_text_en;

    return (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-primary px-6 py-2.5 sm:px-3.5 sm:before:flex-1 animate-in slide-in-from-top duration-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm leading-6 text-white font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <strong className="font-black">{title}</strong>
                    <svg viewBox="0 0 2 2" className="mx-auto inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <span className="opacity-90 font-medium">
                        {isRtl ? activeBanner.description_ar : activeBanner.description_en}
                    </span>
                </p>
                {activeBanner.link && (
                    <a
                        href={activeBanner.link}
                        className="flex-none rounded-full bg-white px-3.5 py-1 text-xs font-black text-primary shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105 flex items-center gap-1"
                    >
                        {buttonText || (isRtl ? 'استعرض الآن' : 'Check it out')}
                        <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                    </a>
                )}
            </div>
            <div className="flex flex-1 justify-end">
                <button type="button" onClick={() => setIsVisible(false)} className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-white hover:opacity-70 transition-opacity">
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
