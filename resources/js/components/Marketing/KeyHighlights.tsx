import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Microscope, Truck, Headphones, Wrench, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function KeyHighlights() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const highlights = [
        {
            title: isRtl ? 'اختيار حريص للأجهزة' : 'Carefully Sourced Equipment',
            desc: isRtl ? 'نحرص على اختيار أجهزة طبية أصلية وحديثة من مصنعين موثوقين تناسب احتياجات منشأتكم.' : 'We carefully select genuine, modern medical equipment from trusted manufacturers to fit your facility\'s needs.',
            icon: Microscope,
            accent: 'text-emerald-500',
            glow: 'from-emerald-500/20'
        },
        {
            title: isRtl ? 'لوجستيات سريعة' : 'Fast Logistics',
            desc: isRtl ? 'نظام توريد مبسط مصمم لإيصال طلباتكم في أسرع وقت ممكن.' : 'A streamlined supply process designed to get your orders to you as quickly as possible.',
            icon: Truck,
            accent: 'text-amber-500',
            glow: 'from-amber-500/20'
        },
        {
            title: isRtl ? 'دعم تقني ٢٤/٧' : '24/7 Support',
            desc: isRtl ? 'فريقنا متاح دائماً لتقديم الدعم الفني والمساعدة في أي وقت.' : 'Our team is always available to provide technical support and assistance.',
            icon: Headphones,
            accent: 'text-sky-500',
            glow: 'from-sky-500/20'
        },
        {
            title: isRtl ? 'صيانة دورية' : 'Regular Maintenance',
            desc: isRtl ? 'خدمات صيانة وقائية وعلاجية تساعد على استمرارية عمل أجهزتكم.' : 'Preventive and corrective maintenance services to help keep your equipment running smoothly.',
            icon: Wrench,
            accent: 'text-rose-500',
            glow: 'from-rose-500/20'
        },
        {
            title: isRtl ? 'معايير عالمية' : 'Global Standards',
            desc: isRtl ? 'نلتزم بأعلى معايير الجودة والسلامة المعترف بها دولياً في كل ما نقدمه.' : 'Committed to the highest internationally recognized quality and safety standards in everything we offer.',
            icon: ShieldCheck,
            accent: 'text-indigo-500',
            glow: 'from-indigo-500/20'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const active = highlights[activeIndex];
    const ActiveIcon = active.icon;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeader
                    title={isRtl ? 'لماذا بوبا؟' : 'Why Bupa?'}
                    description={isRtl
                        ? 'نجمع بين الالتزام والحرص على الجودة لتقديم حلول طبية مصممة حول احتياجاتكم، ونطمح للنمو معكم.'
                        : 'We combine dedication and quality-first sourcing to deliver medical solutions built around your needs, and we\'re looking to grow alongside you.'
                    }
                    align={isRtl ? 'right' : 'left'}
                    accent={false}
                />

                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-16 items-start">
                    {/* Index list */}
                    <div className="flex flex-col border-t border-slate-100">
                        {highlights.map((item, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`group flex items-center gap-6 py-6 border-b border-slate-100 text-left rtl:text-right transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
                                >
                                    <span className={`text-sm font-black tabular-nums transition-colors ${isActive ? 'text-primary' : 'text-slate-300'}`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`flex-1 text-xl md:text-2xl font-heading font-black tracking-tight transition-colors ${isActive ? 'text-slate-900' : 'text-slate-300 group-hover:text-slate-500'}`}>
                                        {item.title}
                                    </span>
                                    <ArrowUpRight className={`w-5 h-5 shrink-0 transition-all ${isRtl ? '-scale-x-100' : ''} ${isActive ? 'opacity-100 text-primary translate-x-0' : 'opacity-0 -translate-x-2 rtl:translate-x-2'}`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Preview panel */}
                    <div className="relative rounded-[3rem] bg-slate-950 p-12 md:p-16 min-h-[380px] flex flex-col justify-between overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${active.glow} to-transparent opacity-60 transition-all duration-700`} />
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                                className="relative z-10 flex flex-col gap-8"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ${active.accent}`}>
                                    <ActiveIcon className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight">
                                        {active.title}
                                    </h3>
                                    <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                        {active.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="relative z-10 flex gap-2 mt-8">
                            {highlights.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    aria-label={`Show highlight ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
