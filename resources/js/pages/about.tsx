import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import SectionHeader from '@/components/Marketing/SectionHeader';
import { Target, Eye, Heart, Sparkles, ShieldCheck, Rocket, MapPin, TrendingUp } from 'lucide-react';

export default function About() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const journey = [
        {
            title: isRtl ? 'البداية' : 'The Beginning',
            desc: isRtl
                ? 'تأسست شركة بوبا للاستثمار لتكون جسراً بين الابتكارات الطبية العالمية والاحتياجات اليومية لمقدمي الرعاية الصحية في السودان.'
                : 'Bupa Investment Co. Ltd was founded to be a bridge between global medical innovation and the everyday needs of healthcare providers in Sudan.',
            icon: Rocket
        },
        {
            title: isRtl ? 'اليوم' : 'Today',
            desc: isRtl
                ? 'من مقرنا في بورتسودان، ما زلنا في بداية الطريق - ننتقي كل منتج وكل شراكة مستقبلية بعناية فائقة والتزام لا يتنازل عن الجودة.'
                : 'Based in Port Sudan, we are just getting started — carefully vetting every product and every future partnership with an uncompromising standard for quality.',
            icon: MapPin
        },
        {
            title: isRtl ? 'إلى الأمام' : 'Looking Ahead',
            desc: isRtl
                ? 'نبني كل علاقة بنفس الالتزام، ونتوسع تدريجياً لنصل إلى مقدمي الرعاية الصحية في جميع أنحاء السودان.'
                : 'We are building every relationship with the same commitment, growing steadily toward serving healthcare providers across all of Sudan.',
            icon: TrendingUp
        },
    ];

    const values = [
        {
            title: isRtl ? 'النزاهة' : 'Integrity',
            desc: isRtl ? 'نلتزم بفعل الصواب في كل تعامل، مهما كان صغيراً.' : 'Doing the right thing, every time, no matter how small the deal.',
            icon: ShieldCheck
        },
        {
            title: isRtl ? 'الابتكار' : 'Innovation',
            desc: isRtl ? 'نبحث دائماً عن أحدث الحلول الطبية لنقلها إلى السوق المحلي.' : 'Always seeking the latest medical solutions to bring to the local market.',
            icon: Sparkles
        },
        {
            title: isRtl ? 'الموثوقية' : 'Reliability',
            desc: isRtl ? 'شريككم الذي يمكن الاعتماد عليه عندما يهم الأمر أكثر.' : 'Your dependable partner when it matters most.',
            icon: Heart
        },
    ];

    return (
        <MarketingLayout>
            <Head title="About Us - Bupa Investment Co. Ltd" />

            <PageHeader
                title={isRtl ? 'عن شركة بوبا للاستثمار' : 'About Bupa Investment'}
                subtitle={isRtl
                    ? 'تعرف على قصتنا، ورسالتنا، وكيف نساهم في تطوير القطاع الطبي.'
                    : 'Learn about our story, our mission, and how we contribute to developing the medical sector.'
                }
            />

            {/* Mission & Vision */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <Target className="w-32 h-32" />
                            </div>
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-heading font-extrabold">{isRtl ? 'رسالتنا' : 'Our Mission'}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {isRtl
                                    ? 'تمكين المؤسسات الصحية في السودان من تقديم رعاية طبية استثنائية من خلال توفير حلول تكنولوجية متطورة ودعم فني موثوق.'
                                    : 'Empowering health institutions in Sudan to provide exceptional medical care by providing advanced technological solutions and reliable technical support.'
                                }
                            </p>
                        </div>

                        <div className="bg-primary p-12 rounded-[3rem] text-white flex flex-col gap-6 relative overflow-hidden group shadow-2xl shadow-primary/20">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                                <Eye className="w-32 h-32" />
                            </div>
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-heading font-extrabold">{isRtl ? 'رؤيتنا' : 'Our Vision'}</h3>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {isRtl
                                    ? 'أن نصبح شريكاً موثوقاً ومعترفاً به في قطاع الرعاية الصحية من خلال توفير منتجات طبية موثوقة وحلول مبتكرة تساهم في مستقبل أفضل للرعاية الصحية، ونتطلع إلى الفرصة لتقديم أفضل ما لدينا.'
                                    : 'To become a trusted and recognized partner in the healthcare sector by providing reliable medical products and innovative solutions that contribute to a better future for healthcare. We look forward to the opportunity to give you our best effort.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story - Journey Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeader
                        title={isRtl ? 'قصتنا' : 'Our Story'}
                        align={isRtl ? 'right' : 'left'}
                        accent={false}
                    />

                    {/* Brand banner - built from the Bupa identity, not a stock photo */}
                    <div className="relative rounded-[3rem] overflow-hidden h-[280px] md:h-[420px] mb-20 shadow-xl bg-gradient-to-br from-[#0b1e3d] via-[#0f2a52] to-[#16376b]">
                        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[#c9a24b]/10 blur-[100px]" />
                        <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-[#c9a24b]/10 blur-[110px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src="/bupa-logo.png"
                                alt="Bupa Investment Co. Ltd"
                                className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                            />
                        </div>
                        <div className={`absolute bottom-8 ${isRtl ? 'right-8 text-right' : 'left-8 text-left'}`}>
                            <span className="text-white/60 font-bold text-sm uppercase tracking-[0.2em]">
                                {isRtl ? 'بورتسودان، السودان' : 'Port Sudan, Sudan'}
                            </span>
                        </div>
                    </div>

                    {/* Journey timeline */}
                    <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100 mx-[16.66%]" />
                        {journey.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="relative flex flex-col gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 relative z-10">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-2xl font-heading font-black text-slate-900">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeader
                        title={isRtl ? 'قيمنا' : 'Our Values'}
                        description={isRtl
                            ? 'المبادئ التي توجه كل قرار نتخذه وكل علاقة نبنيها.'
                            : 'The principles that guide every decision we make and every relationship we build.'
                        }
                        centered
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all duration-500">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-heading font-black text-slate-900">{value.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
