import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import SectionHeader from '@/components/Marketing/SectionHeader';
import {
    Activity,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import ServiceRequestModal from '@/components/Marketing/ServiceRequestModal';

interface Service {
    id: number;
    type: 'service' | 'solution';
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image_url?: string;
    color: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    services: Service[];
}



export default function Services({ services }: Props) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const coreServices = services.filter(s => s.type === 'service');
    const integratedSolutions = services.filter(s => s.type === 'solution');

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState<Service | null>(null);

    const handleRequestService = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <MarketingLayout>
            <Head title="Services & Solutions - Bupa Investment Co. Ltd" />

            <PageHeader 
                title={isRtl ? 'الخدمات والحلول' : 'Services & Solutions'} 
                subtitle={isRtl
                    ? 'نقدم خدمات متخصصة مصممة لدعم الاحتياجات المتطورة لقطاع الرعاية الصحية. يركز نهجنا على الجودة والكفاءة والحلول التي تركز على العميل وتخلق قيمة دائمة للمتخصصين والمؤسسات الصحية.'
                    : 'We provide specialized services designed to support the evolving needs of the healthcare sector. Our approach focuses on quality, efficiency, and customer-focused solutions that create lasting value for healthcare professionals and organizations.'
                }
            />

            {/* Static Intro Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 text-center leading-tight">
                            {isRtl
                                ? 'خدمات رعاية صحية شاملة في جميع أنحاء السودان'
                                : 'Comprehensive Healthcare Services Across Sudan'
                            }
                        </h2>
                        <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                {isRtl
                                    ? 'نقدم مجموعة متنوعة من الخدمات والحلول الصحية في جميع ولايات السودان، لدعم احتياجات مقدمي الرعاية الصحية والمؤسسات في جميع أنحاء البلاد.'
                                    : 'We provide a diverse range of healthcare services and solutions across all states of Sudan, supporting the needs of healthcare providers and organizations throughout the country.'
                                }
                            </p>
                            <p>
                                {isRtl
                                    ? 'تمتد شبكتنا المتنامية وعلاقاتنا المهنية القوية لتشمل مجموعة واسعة من المؤسسات الصحية، بما في ذلك المستشفيات الحكومية والخاصة، والصيدليات، والمراكز الصحية، ومراكز رعاية مرضى السكري، والمختبرات الطبية، وغيرها من المرافق الصحية.'
                                    : 'Our growing network and strong professional relationships extend across a wide range of healthcare institutions, including government and private hospitals, pharmacies, healthcare centers, diabetes care centers, medical laboratories, and other healthcare facilities.'
                                }
                            </p>
                            <p>
                                {isRtl
                                    ? 'من خلال فهمنا لسوق الرعاية الصحية المحلي وعلاقاتنا الوثيقة بالمتخصصين والمؤسسات الصحية، نتمكن من تقديم حلول سريعة الاستجابة وموثوقة ومصممة خصيصاً لتلبية الاحتياجات المتطورة لشركائنا وعملائنا.'
                                    : 'Through our understanding of the local healthcare market and our close relationships with healthcare professionals and institutions, we are able to provide responsive, reliable, and tailored solutions that meet the evolving needs of our partners and customers.'
                                }
                            </p>
                            <p>
                                {isRtl
                                    ? 'نلتزم ببناء شراكات طويلة الأمد قائمة على الثقة والجودة والموثوقية والخدمة المهنية، مع التوسع المستمر في نطاق عملنا وقدراتنا لخدمة القطاع الصحي في جميع أنحاء السودان.'
                                    : 'We are committed to building long-term partnerships based on trust, quality, reliability, and professional service, while continuously expanding our reach and capabilities to serve the healthcare sector across Sudan.'
                                }
                            </p>
                            <p>
                                {isRtl
                                    ? 'هدفنا هو ربط مقدمي الرعاية الصحية بالمنتجات والخدمات والحلول المناسبة - أينما كانوا في السودان.'
                                    : 'Our goal is to connect healthcare providers with the right products, services, and solutions — wherever they are in Sudan.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            {coreServices.length > 0 && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <SectionHeader
                            title={isRtl ? 'الخدمات المهنية' : 'Professional Services'}
                            subtitle={isRtl ? 'دعم فني وتقني متكامل على مدار الساعة' : 'Integrated technical and clinical support around the clock'}
                            centered
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                            {coreServices.map((service) => {
                                return (
                                    <div key={service.id} className="group flex flex-col rounded-[3rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                         <div className="relative h-64 w-full bg-slate-200 overflow-hidden shrink-0">
                                             {service.image_url ? (
                                                 <img src={service.image_url} alt={service.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                             ) : (
                                                 <div className={`w-full h-full flex items-center justify-center ${service.color || 'bg-slate-200'}`}>
                                                     <Activity className="w-12 h-12 text-slate-400 opacity-30" />
                                                 </div>
                                             )}
                                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                         </div>
                                         <div className="flex flex-col gap-4 p-10 flex-1">
                                             <h3 className="text-2xl font-heading font-black text-slate-900 leading-tight">
                                                 {isRtl ? service.title_ar : service.title_en}
                                             </h3>
                                             <p className="text-slate-500 leading-relaxed font-medium flex-1">
                                                 {isRtl ? service.description_ar : service.description_en}
                                             </p>

                                             <div className="mt-4 pt-4 border-t border-slate-100">
                                                  <button
                                                    onClick={() => handleRequestService(service)}
                                                    className="text-primary font-black text-sm flex items-center gap-2 uppercase tracking-widest group-hover:text-slate-900 transition-colors"
                                                  >
                                                      {isRtl ? 'طلب خدمة' : 'Request Service'}
                                                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                                  </button>
                                             </div>
                                         </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Integrated Solutions Section */}
            {integratedSolutions.length > 0 && (
                <section className="py-24 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                            <div className="flex flex-col gap-4">
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-sm">
                                    {isRtl ? 'حلول تسليم مفتاح' : 'Turnkey Solutions'}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight">
                                    {isRtl ? 'الحلول المتكاملة' : 'Integrated Solutions'}
                                </h2>
                            </div>
                            <p className="max-w-xl text-slate-400 font-medium text-lg leading-relaxed">
                                {isRtl 
                                    ? 'نحن نأخذ على عاتقنا مسؤولية التخطيط والتنفيذ الكامل للمشاريع الطبية لضمان أعلى معايير الجودة والاستدامة.' 
                                    : 'We take responsibility for the full planning and execution of medical projects to ensure the highest standards of quality and sustainability.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {integratedSolutions.map((solution) => {
                                return (
                                    <div key={solution.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all duration-500 flex flex-col md:flex-row overflow-hidden">
                                        <div className="w-full md:w-2/5 relative h-72 md:h-auto overflow-hidden shrink-0">
                                            {solution.image_url ? (
                                                <img src={solution.image_url} alt={solution.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center ${solution.color || 'bg-white/10'}`}>
                                                    <Activity className="w-16 h-16 text-white/30" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent hidden md:block" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent block md:hidden" />
                                        </div>
                                        <div className="flex flex-col gap-6 p-10 md:p-14 flex-1 justify-center text-center md:text-start rtl:md:text-right">
                                            <h3 className="text-3xl font-heading font-black text-white leading-tight">
                                                {isRtl ? solution.title_ar : solution.title_en}
                                            </h3>
                                            <p className="text-slate-400 leading-relaxed font-medium text-lg">
                                                {isRtl ? solution.description_ar : solution.description_en}
                                            </p>
                                            <div>
                                                <button 
                                                    onClick={() => handleRequestService(solution)}
                                                    className="mt-2 text-primary font-black text-sm flex items-center justify-center md:justify-start rtl:md:flex-row-reverse gap-2 uppercase tracking-widest hover:text-white transition-colors"
                                                  >
                                                      {isRtl ? 'طلب الحل' : 'Request Solution'}
                                                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                                  </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-primary p-12 md:p-20 rounded-[4rem] flex flex-col items-center text-center gap-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-white relative z-10">
                            {isRtl ? 'جاهزون لدعم مؤسستكم الطبية؟' : 'Ready to Support Your Facility?'}
                        </h2>
                        <p className="text-white/80 max-w-2xl text-xl font-medium relative z-10 leading-relaxed">
                            {isRtl 
                                ? 'اتصل بنا اليوم لمناقشة احتياجات الصيانة أو التدريب أو التخطيط لمشاريعكم الجديدة.' 
                                : 'Contact us today to discuss your maintenance, training, or planning needs for your new projects.'}
                        </p>
                        <Link href={route('contact')} className="relative z-10">
                            <button className="bg-white text-primary px-12 h-16 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">
                                {isRtl ? 'تواصل معنا الآن' : 'Contact Us Now'}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Service Request Modal */}
            <ServiceRequestModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={selectedService}
            />
        </MarketingLayout>
    );
}
