import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ArrowRight, Activity, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
    id: number;
    image_path: string;
    title_ar: string | null;
    title_en: string | null;
    subtitle_ar: string | null;
    subtitle_en: string | null;
}

export default function Hero() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';
    const slides = (props.heroSlides as HeroSlide[]) || [];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides]);

    const currentSlide = slides[currentIndex];

    // Fallback content if no slides are provided
    const defaultTitle = isRtl ? (
        <>نبتكر <span className="text-primary italic">الحلول الطبية</span> لنرتقي بالرعاية الصحية في السودان</>
    ) : (
        <>Precision <span className="text-primary italic">Medical Tech</span>, A Fresh Start You Can Trust.</>
    );

    const defaultSubtitle = isRtl
        ? 'شريككم لتجهيز المستشفيات والمختبرات بأحدث التقنيات العالمية، مع فريق هندسي مخصص لدعم استمرارية تشغيل أجهزتكم.'
        : 'Your partner for equipping hospitals and labs with world-class technology, backed by a dedicated engineering team focused on keeping your equipment running.';

    return (
        <section className="relative overflow-hidden pt-16 lg:pt-24 pb-20 lg:pb-32">
            {/* Background elements - Clinical Teal/Blue */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className={`absolute bottom-0 ${isRtl ? 'left-0 translated-x-1/2' : 'left-0 -translate-x-1/2'} translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10`} />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Column */}
                    <div className="flex flex-col gap-8 max-w-3xl">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-[2px] bg-secondary" />
                                <span className="text-secondary font-black text-sm uppercase tracking-[0.3em]">
                                    {isRtl ? 'بوبا للاستثمار' : 'Bupa Investment Co. Ltd'}
                                </span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 leading-[1.1] tracking-tight min-h-[3.3em] md:min-h-[2.2em]">
                                    {currentSlide ? (
                                        isRtl ? currentSlide.title_ar || defaultTitle : currentSlide.title_en || defaultTitle
                                    ) : defaultTitle}
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl min-h-[4.5em] md:min-h-[3em]">
                                    {currentSlide ? (
                                        isRtl ? currentSlide.subtitle_ar || defaultSubtitle : currentSlide.subtitle_en || defaultSubtitle
                                    ) : defaultSubtitle}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex flex-col gap-3 pt-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Link href={route('contact')}>
                                    <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-10 h-16 text-lg group shadow-xl shadow-secondary/20 font-bold w-full sm:w-auto">
                                        {isRtl ? 'تواصل معنا' : 'Contact Us'}
                                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${isRtl ? 'mr-3 rotate-180' : 'ml-3'}`} />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Image Column / Visuals */}
                    <div className="relative">
                        {/* Glass Stat Cards */}
                        <div className={`absolute top-10 ${isRtl ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'} z-20 bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-64 animate-bounce-slow`}>
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'سرعة الاستجابة' : 'Response Time'}</span>
                                    <span className="text-xl font-black text-slate-900">{isRtl ? 'أقل من 24 ساعة' : '< 24h'}</span>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute bottom-20 ${isRtl ? 'right-0 lg:-right-10' : 'left-0 lg:-left-10'} z-20 bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-64 animate-bounce-slow delay-500`}>
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'جودة مضمونة' : 'Guaranteed Quality'}</span>
                                    <span className="text-xl font-black text-slate-900">{isRtl ? '100% أصلي' : '100% Genuine'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Media Container */}
                        <div className="relative group perspective-1000">
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white transition-all duration-700 hover:rotate-y-2 hover:scale-[1.02]">
                                {currentSlide ? (
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentIndex}
                                            src={currentSlide.image_path}
                                            alt="Bupa Investment Co. Ltd"
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.8 }}
                                            className="w-full h-[600px] object-cover"
                                        />
                                    </AnimatePresence>
                                ) : (
                                    <div className="w-full h-[600px] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1e3d] via-[#0f2a52] to-[#16376b]">
                                        <div className="absolute inset-0 opacity-[0.07]" style={{
                                            backgroundImage: 'linear-gradient(#c9a24b 1px, transparent 1px), linear-gradient(90deg, #c9a24b 1px, transparent 1px)',
                                            backgroundSize: '48px 48px'
                                        }} />
                                        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#c9a24b]/10 blur-[110px]" />
                                        <div className="absolute -bottom-28 -right-16 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
                                        <div className="absolute w-72 h-72 rounded-full border border-white/10" />
                                        <div className="absolute w-96 h-96 rounded-full border border-white/5" />
                                        <img
                                            src="/bupa-logo.png"
                                            alt="Bupa Investment Co. Ltd"
                                            className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-2xl relative z-10"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                            </div>

                            {/* Dots navigation */}
                            {slides.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                                    {slides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Decorative glowing orbits */}
                            <div className="absolute -inset-4 bg-primary/20 blur-[100px] -z-10 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

