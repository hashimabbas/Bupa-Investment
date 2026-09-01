import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function CTASection() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const settings = (props.siteSettings as Record<string, string>) || {};
    const isRtl = locale === 'ar';

    return (
        <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative rounded-[4rem] bg-foreground overflow-hidden group shadow-2xl shadow-primary/10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center lg:text-left rtl:lg:text-right flex flex-col gap-6">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
                                {isRtl ? 'هل أنت مستعد لتطوير منشأتك الصحية؟' : 'Ready to upgrade your healthcare facility?'}
                            </h2>
                            <p className="text-white/50 text-lg md:text-xl">
                                {isRtl
                                    ? 'دعنا نساعدك في اختيار أفضل الحلول الطبية التي تناسب احتياجاتك وميزانيتك.'
                                    : 'Let us help you choose the best medical solutions that fit your needs and budget.'
                                }
                            </p>
                            <div className="flex flex-wrap gap-6 mt-4 justify-center lg:justify-start">
                                {settings.phone && (
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-secondary" />
                                        </div>
                                        <span dir="ltr" className="font-bold">{settings.phone}</span>
                                    </div>
                                )}
                                {(settings.email_sales || settings.email_info) && (
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <span className="font-bold">{settings.email_sales || settings.email_info}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full sm:w-auto">
                            <Link href={route('contact')}>
                                <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-12 h-16 text-lg group shadow-2xl shadow-secondary/20 font-bold w-full">
                                    {isRtl ? 'تواصل معنا' : 'Contact Us'}
                                    <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 mr-2' : 'ml-2'}`} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
