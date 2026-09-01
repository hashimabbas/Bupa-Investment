import React from 'react';
import { usePage } from '@inertiajs/react';
import { ShieldCheck, Zap, Headphones, Users } from 'lucide-react';

const stats = [
    { value: '100%', labelEn: 'Genuine & Certified Products', labelAr: 'منتجات أصلية ومعتمدة', icon: ShieldCheck, color: 'from-blue-500 to-blue-600' },
    { value: '<24h', labelEn: 'Response Time', labelAr: 'سرعة الاستجابة', icon: Zap, color: 'from-emerald-500 to-emerald-600' },
    { value: '1:1', labelEn: 'Dedicated Account Support', labelAr: 'متابعة مباشرة لكل عميل', icon: Users, color: 'from-purple-500 to-purple-600' },
    { value: '24/7', labelEn: 'Tech Support', labelAr: 'دعم تقني', icon: Headphones, color: 'from-amber-500 to-amber-600' },
];

export default function StatsSection() {
    const { props } = usePage();
    const isRtl = (props.locale as string) === 'ar';

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                {/* <span className="block text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                    {stat.value}
                                </span> */}
                                <span className="text-sm font-bold text-white/50 uppercase tracking-widest">
                                    {isRtl ? stat.labelAr : stat.labelEn}
                                </span>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white/10 rounded-full group-hover:w-20 group-hover:bg-primary/50 transition-all duration-500" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
