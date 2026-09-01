import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import SectionHeader from '@/components/Marketing/SectionHeader';
import { ExternalLink, Globe2, ShieldCheck } from 'lucide-react';
import { Partner } from '@/types/partner';

interface PartnersProps {
    partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    return (
        <MarketingLayout>
            <Head title="Our Partners - Terma Medical Supplies" />

            <PageHeader 
                title={isRtl ? 'شركاؤنا' : 'Our Partners'} 
                subtitle={isRtl 
                    ? 'نحن جسر التواصل بين أرقى المصنعين العالميين والمؤسسات الصحية المحلية.' 
                    : 'We are the bridge between the finest global manufacturers and local health institutions.'
                }
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {partners.map((partner) => (
                            <div key={partner.id} className="group flex flex-col lg:flex-row gap-8 p-10 bg-slate-50 rounded-[3rem] border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className="lg:w-1/3 flex items-center justify-center p-6 bg-white rounded-[2rem] shadow-sm">
                                     <img 
                                        src={partner.logo || ''} 
                                        alt={partner.name}
                                        className="max-w-full max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                     />
                                </div>
                                <div className="lg:w-2/3 flex flex-col gap-4">
                                     <div className="flex items-center justify-between">
                                         <h3 className="text-2xl font-heading font-black text-slate-900">{partner.name}</h3>
                                         <div className="text-primary"><ShieldCheck className="w-6 h-6" /></div>
                                     </div>
                                     <p className="text-muted-foreground leading-relaxed">
                                         {isRtl ? partner.desc_ar : partner.desc_en}
                                     </p>
                                     <div className="flex flex-wrap gap-2 mt-2">
                                         {partner.specialties?.map((spec: any, sIdx) => (
                                             <span key={sIdx} className="px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded-full border border-slate-100">
                                                 {isRtl ? spec.name_ar : spec.name_en}
                                             </span>
                                         ))}
                                     </div>
                                     {partner.website_url && (
                                         <div className="mt-4 pt-4 border-t border-slate-100">
                                              <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                                                  {isRtl ? 'زيارة الموقع الرسمي' : 'Visit Official Website'}
                                                  <ExternalLink className="w-4 h-4" />
                                              </a>
                                         </div>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <div className="mt-20 bg-slate-950 rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden">
                         <div className="relative z-10 flex flex-col items-center gap-6">
                              <Globe2 className="w-16 h-16 text-secondary animate-pulse" />
                              <h2 className="text-3xl md:text-5xl font-heading font-black text-white">
                                  {isRtl ? 'شبكة عالمية، دعم محلي' : 'Global Network, Local Support'}
                              </h2>
                              <p className="text-white/60 text-lg max-w-2xl">
                                  {isRtl 
                                     ? 'نحن نضمن حصولكم على الضمان الأصلي والدعم الفني المعتمد مباشرة من المصنعين.' 
                                     : 'We ensure you get the original warranty and certified technical support directly from the manufacturers.'
                                  }
                              </p>
                         </div>
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
