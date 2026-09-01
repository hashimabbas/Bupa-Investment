import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShieldCheck, Stethoscope, Wrench, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientPortalCTA() {
    const { props } = usePage();
    const isRtl = props.locale === 'ar';

    return (
        <section className="relative py-24 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden group">
                    {/* Animated gradient background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="flex flex-col gap-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 w-fit">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {isRtl ? 'بوابة العملاء الحصرية' : 'Exclusive Client Portal'}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                {isRtl
                                    ? 'انضم إلى شبكة المستشفيات المتقدمة رقمياً'
                                    : 'Empower Your Hospital with Digital Engineering'}
                            </h2>

                            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                                {isRtl
                                    ? 'نقدم لشركائنا من المستشفيات والمراكز الطبية نظاماً ذكياً لمتابعة صيانة الأجهزة الطبية، طلب الدعم الفني، وإدارة الأصول بكفاءة عالية.'
                                    : 'We provide our hospital partners with a smart system to track medical equipment maintenance, request technical support, and manage assets efficiently.'}
                            </p>

                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex flex-wrap gap-4">
                                    <Link href={route('client.register')}>
                                        <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all gap-3">
                                            {isRtl ? 'سجل منشأتك الآن' : 'Register Your Facility'}
                                            {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                        </Button>
                                    </Link>
                                    <Link href={route('contact')}>
                                        <Button variant="outline" className="h-14 px-10 rounded-2xl bg-primary border-white/20 text-white  font-bold text-lg">
                                            {isRtl ? 'تواصل معنا' : 'Contact Us'}
                                        </Button>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3 text-slate-400 font-medium">
                                    <span>{isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'}</span>
                                    <Link href={route('login')} className="text-primary font-black hover:underline transition-all">
                                        {isRtl ? 'تسجيل دخول العملاء' : 'Client Login'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Stethoscope,
                                    title: isRtl ? 'إدارة الأصول' : 'Asset Management',
                                    desc: isRtl ? 'تتبع جميع أجهزتك الطبية في مكان واحد' : 'Track all your medical equipment in one place'
                                },
                                {
                                    icon: Wrench,
                                    title: isRtl ? 'بلاغات الصيانة' : 'Maintenance Tickets',
                                    desc: isRtl ? 'تقديم ومتابعة طلبات الصيانة فوراً' : 'Submit and track maintenance requests instantly'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: isRtl ? 'تقارير فنية' : 'Technical Reports',
                                    desc: isRtl ? 'الوصول إلى جميع تقارير الصيانة والزيارات' : 'Access all maintenance and visit reports'
                                },
                                {
                                    icon: ShieldCheck, // Changed from Activity for variety if needed
                                    title: isRtl ? 'دعم مستمر' : 'Continuous Support',
                                    desc: isRtl ? 'تواصل مباشر مع فريق المهندسين' : 'Direct communication with the engineering team'
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
