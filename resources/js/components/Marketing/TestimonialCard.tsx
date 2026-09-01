import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Play } from 'lucide-react';

export interface Testimonial {
    id: number;
    name_en: string;
    name_ar: string | null;
    position_en: string | null;
    position_ar: string | null;
    company_en: string | null;
    company_ar: string | null;
    avatar: string | null;
    content_en: string;
    content_ar: string | null;
    video_url: string | null;
    rating: number;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    isRtl: boolean;
    isActive: boolean;
    onVideoClick?: (url: string) => void;
}

function getYouTubeId(url: string): string | null {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
        const parts = url.split('/');
        return parts[parts.length - 1].split('?')[0];
    }
    return null;
}

export default function TestimonialCard({ testimonial, isRtl, isActive, onVideoClick }: TestimonialCardProps) {
    const name = isRtl ? (testimonial.name_ar || testimonial.name_en) : testimonial.name_en;
    const content = isRtl ? (testimonial.content_ar || testimonial.content_en) : testimonial.content_en;
    const position = isRtl ? (testimonial.position_ar || testimonial.position_en) : testimonial.position_en;
    const company = isRtl ? (testimonial.company_ar || testimonial.company_en) : testimonial.company_en;
    const youtubeId = testimonial.video_url ? getYouTubeId(testimonial.video_url) : null;

    if (testimonial.video_url && youtubeId) {
        return (
            <motion.div
                animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.4,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className={`relative w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden transition-all duration-700 group cursor-pointer ${
                    isActive ? 'shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)]' : ''
                }`}
                onClick={() => onVideoClick?.(testimonial.video_url!)}
            >
                <div className="relative aspect-video bg-slate-900">
                    <img
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 md:w-4 md:h-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                                />
                            ))}
                        </div>
                        <h4 className="text-lg md:text-2xl font-black text-white">{name}</h4>
                        <p className="text-xs md:text-sm font-bold text-white/60 mt-0.5">
                            {position} {company ? `@ ${company}` : ''}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`relative w-full max-w-2xl mx-auto p-10 md:p-16 rounded-[4rem] border transition-all duration-700 overflow-hidden group ${
                isActive
                ? 'bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] border-slate-100'
                : 'bg-slate-50/50 border-transparent'
            }`}
        >
            {isActive && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left rtl:md:text-right">
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            {testimonial.avatar ? (
                                <img src={testimonial.avatar} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <Quote className="w-8 h-8 text-slate-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                                />
                            ))}
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 leading-none">{name}</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {position} {company ? `@ ${company}` : ''}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Quote className={`absolute -top-6 ${isRtl ? '-right-6' : '-left-6'} w-12 h-12 text-primary/5 transform ${isRtl ? 'scale-x-[-1]' : ''}`} />
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                        "{content}"
                    </p>
                </div>

                <div className="h-px bg-slate-100 w-24 mx-auto md:mx-0" />

                <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                        {isRtl ? 'شهادة موثقة' : 'Verified Review'}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
            </div>
        </motion.div>
    );
}