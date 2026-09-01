import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Quote, Stethoscope, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AboutPreview() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';
    const settings = (props.siteSettings as Record<string, string>) || {};
    const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

    return (
        <section className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
            {/* Background image, dimmed - only when a real photo has been uploaded via admin settings */}
            <div className="absolute inset-0">
                {settings.about_image && (
                    <img
                        src={settings.about_image}
                        alt="Bupa Investment"
                        className="w-full h-full object-cover opacity-15"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
            </div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="max-w-3xl">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                        {isRtl ? 'من نحن' : 'WHO WE ARE'}
                    </span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-heading font-extrabold leading-tight">
                        {isRtl
                            ? (settings.about_title_ar || 'بداية جديدة، قائمة على الثقة.')
                            : (settings.about_title_en || 'A Fresh Start, Built on Trust.')
                        }
                    </h2>
                    <p className="mt-6 text-white/60 text-lg leading-relaxed">
                        {isRtl
                            ? (settings.about_desc_ar || 'بوبا للاستثمار شركة توريدات طبية ناشئة، تأسست لتقديم خدمة موثوقة تضع الجودة أولاً لقطاع الرعاية الصحية في السودان، عميلاً تلو الآخر.')
                            : (settings.about_desc_en || 'Bupa Investment is a new medical supplies company, founded to bring quality-first, dependable service to Sudan\'s healthcare sector — one client at a time.')
                        }
                    </p>
                </div>

                {/* Vision Quote */}
                <div className={`mt-16 max-w-4xl ${isRtl ? 'border-r-4 pr-8' : 'border-l-4 pl-8'} border-secondary/50`}>
                    <Quote className={`w-10 h-10 text-secondary/60 mb-4 ${isRtl ? 'scale-x-[-1]' : ''}`} />
                    <p className="text-2xl md:text-3xl font-heading font-medium italic leading-snug text-white/90">
                        {isRtl
                            ? 'أن نصبح شريكاً موثوقاً ومعترفاً به في قطاع الرعاية الصحية من خلال توفير منتجات طبية موثوقة وحلول مبتكرة تساهم في مستقبل أفضل للرعاية الصحية، ونتطلع إلى الفرصة لتقديم أفضل ما لدينا.'
                            : 'To become a trusted and recognized partner in the healthcare sector by providing reliable medical products and innovative solutions that contribute to a better future for healthcare. We look forward to the opportunity to give you our best effort.'
                        }
                    </p>
                </div>

                {/* Services summary */}
                <div className="mt-16 max-w-4xl">
                    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors max-w-md">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-5">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{isRtl ? 'خدماتنا' : 'Our Services'}</h3>
                        <p className="text-sm text-white/50 leading-relaxed mb-5">
                            {isRtl
                                ? 'خدمات متخصصة تركز على الجودة والكفاءة وحلول مصممة حول احتياجات عملائنا.'
                                : 'Specialized services focused on quality, efficiency, and solutions built around our customers\' needs.'
                            }
                        </p>
                        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-secondary group-hover:gap-3 transition-all">
                            {isRtl ? 'استعرض الخدمات' : 'Explore Services'}
                            <ArrowIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-16">
                    <Button size="lg" asChild className="rounded-full px-10 bg-white text-slate-900 hover:bg-white/90">
                        <Link href="/about">
                            {isRtl ? 'اقرأ المزيد عنا' : 'Read More About Us'}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
