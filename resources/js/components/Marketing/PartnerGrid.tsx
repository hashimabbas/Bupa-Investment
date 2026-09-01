import { Link, usePage } from '@inertiajs/react';
import SectionHeader from './SectionHeader';
import { Partner } from '@/types/partner';

interface PartnerGridProps {
    partners: Partner[];
}

export default function PartnerGrid({ partners = [] }: PartnerGridProps) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    if (!partners || partners.length === 0) return null;

    const displayPartners = partners;

    return (
        <section className="py-24 border-y border-slate-100 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeader
                    title={isRtl ? 'شركاؤنا' : 'Our Partners'}
                    description={isRtl
                        ? 'نبني شراكات موثوقة مع مصنعين عالميين في مجال التكنولوجيا الطبية.'
                        : 'We are building trusted partnerships with global manufacturers of medical technology.'
                    }
                />

                <div className="relative group">
                    <div className="flex overflow-hidden space-x-12 rtl:space-x-reverse py-10">
                        {/* Marquee Container */}
                        <div className="flex space-x-12 rtl:space-x-reverse animate-marquee items-center min-w-full justify-around shrink-0 group-hover:pause">
                            {displayPartners.concat(displayPartners).map((partner, idx) => (
                                <Link
                                    key={idx}
                                    href={route('partners')}
                                    className="flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 transform hover:scale-110 w-48 h-24 p-4 border border-transparent hover:border-slate-100 rounded-2xl hover:bg-slate-50/50 cursor-pointer"
                                >
                                    <img 
                                        src={partner.logo || ''} 
                                        alt={partner.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Fades for smooth infinite look */}
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
                </div>
                
                <div className="mt-12 text-center">
                     <p className="text-slate-400 font-medium text-sm">
                         {isRtl 
                            ? `+${displayPartners.length} شريكاً عالمياً موثوقاً` 
                            : `+${displayPartners.length} Trusted Global Partners`
                         }
                     </p>
                </div>
            </div>
        </section>
    );
}
