import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import TestimonialCard, { Testimonial } from './TestimonialCard';
import TestimonialVideoModal from './TestimonialVideoModal';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    isRtl: boolean;
}

export default function TestimonialsSection({ testimonials = [], isRtl }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-play logic
    useEffect(() => {
        if (testimonials.length <= 1) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000); // 8 seconds per testimonial

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Handle scroll snap
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const itemWidth = scrollContainerRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
            setActiveIndex(newIndex);
        }
    };

    const scrollTo = (index: number) => {
        if (!scrollContainerRef.current) return;
        const itemWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
            left: itemWidth * index,
            behavior: 'smooth'
        });
        setActiveIndex(index);
    };

    if (testimonials.length === 0) return null;

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-6 mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 border border-primary/10"
                    >
                        <MessageSquare className="w-4 h-4" />
                        {isRtl ? 'ثقة العملاء' : 'Customer Trust'}
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-black text-slate-900 tracking-tight max-w-3xl leading-tight"
                    >
                        {isRtl
                            ? 'ماذا يقول عملاؤنا'
                            : 'What Our Clients Say'
                        }
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-medium text-lg max-w-2xl"
                    >
                        {isRtl
                            ? 'نحرص على تقديم حلول تقنية موثوقة تدعم عملاءنا في القطاع الصحي.'
                            : 'We are committed to providing reliable technical solutions that support our clients in the healthcare sector.'
                        }
                    </motion.p>
                </div>

                {/* Interactive Carousel */}
                <div className="relative group/carousel max-w-5xl mx-auto">
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar -mx-4 px-4 gap-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((testimonial, idx) => (
                            <div key={testimonial.id} className="w-full shrink-0 snap-center py-10">
                                <TestimonialCard 
                                    testimonial={testimonial} 
                                    isRtl={isRtl} 
                                    isActive={activeIndex === idx}
                                    onVideoClick={(url) => setVideoModal({ isOpen: true, url })}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 lg:-left-20 z-20">
                        <button 
                            onClick={() => scrollTo(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
                            className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all active:scale-95 group"
                        >
                            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-12 lg:-right-20 z-20">
                        <button 
                            onClick={() => scrollTo(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)}
                            className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all active:scale-95 group"
                        >
                            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Indicators */}
                <div className="mt-12 flex justify-center gap-3">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                activeIndex === idx ? 'w-12 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
                            }`}
                        />
                    ))}
                </div>

                {/* Bottom Trust Indicators */}
                <div className="mt-24 pt-16 border-t border-slate-50 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isRtl ? 'منتجات أصلية ومعتمدة' : 'Genuine & Certified Products'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isRtl ? 'متابعة مباشرة لكل عميل' : 'Direct Client Follow-up'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isRtl ? 'دعم فني على مدار الساعة' : '24/7 Technical Support'}</span>
                    </div>
                </div>
            </div>

            <TestimonialVideoModal 
                isOpen={videoModal.isOpen} 
                onClose={() => setVideoModal({ ...videoModal, isOpen: false })} 
                videoUrl={videoModal.url} 
            />
        </section>
    );
}
