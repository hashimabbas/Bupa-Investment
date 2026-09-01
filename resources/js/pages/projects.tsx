import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import SectionHeader from '@/components/Marketing/SectionHeader';
import { Building, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function Projects() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const projects = [
        {
            title: isRtl ? 'تجهيز مركز رويال التخصصي' : 'Royal Specialist Center Equipment',
            client: isRtl ? 'مستشفى رويال' : 'Royal Hospital',
            location: isRtl ? 'الخرطوم' : 'Khartoum',
            year: '2023',
            desc: isRtl ? 'تجهيز كامل لغرف الأشعة المقطعية والعناية المكثفة بأحدث الأجهزة.' : 'Full equipment of CT scan and ICU rooms with latest devices.',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
        },
        {
            title: isRtl ? 'تطوير وحدة المختبرات المركزية' : 'Central Lab Unit Development',
            client: isRtl ? 'المختبرات القومية' : 'National Laboratories',
            location: isRtl ? 'بورتسودان' : 'Port Sudan',
            year: '2023',
            desc: isRtl ? 'توفير محاليل وأجهزة تحليل آلية عالية السرعة.' : 'Providing high-speed reagents and automated analysis devices.',
            image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=800'
        },
        {
            title: isRtl ? 'مشروع تجهيز المستشفى الريفي' : 'Rural Hospital Equipping Project',
            client: isRtl ? 'وزارة الصحة' : 'Ministry of Health',
            location: isRtl ? 'كسلا' : 'Kassala',
            year: '2022',
            desc: isRtl ? 'توريد أثاث طبي ومعدات جراحية أساسية للمناطق المتأثرة.' : 'Supplying medical furniture and basic surgical equipment for affected areas.',
            image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=800'
        }
    ];

    return (
        <MarketingLayout>
            <Head title="Our Projects - Terma Medical Supplies" />

            <PageHeader 
                title={isRtl ? 'مشاريعنا وعملاؤنا' : 'Projects & Clients'} 
                subtitle={isRtl 
                    ? 'فخورون بترك بصمتنا في كبرى المؤسسات الصحية عبر السودان.' 
                    : 'Proud of leaving our mark in major health institutions across Sudan.'
                }
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {projects.map((project, idx) => (
                            <div key={idx} className="group relative bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl">
                                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                                     <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                     />
                                </div>
                                <div className="md:w-3/5 p-8 flex flex-col gap-4">
                                     <div className="flex flex-col gap-1">
                                         <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                             <Calendar className="w-4 h-4" />
                                             {project.year}
                                         </div>
                                         <h3 className="text-2xl font-heading font-black text-slate-900 group-hover:text-primary transition-colors">
                                             {project.title}
                                         </h3>
                                     </div>
                                     
                                     <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                         {project.desc}
                                     </p>

                                     <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-slate-200">
                                          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                              <Building className="w-4 h-4 text-secondary" />
                                              {project.client}
                                          </div>
                                          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                              <MapPin className="w-4 h-4 text-secondary" />
                                              {project.location}
                                          </div>
                                     </div>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                     <CheckCircle className="w-4 h-4 text-emerald-500" />
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{isRtl ? 'مكتمل' : 'Completed'}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <div className="mt-20 flex flex-col items-center text-center gap-12 py-16 px-8 bg-slate-50 rounded-[4rem] border border-slate-100">
                         <div className="flex flex-col gap-4">
                             <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900">
                                 {isRtl ? 'نحن نخدم أكثر من ١٥٠ مؤسسة صحية' : 'We serve over 150 health institutions'}
                             </h2>
                             <p className="text-muted-foreground text-lg max-w-2xl">
                                 {isRtl 
                                    ? 'من المستشفيات الجامعية إلى المراكز الريفية، نصل بكل فخر لكل مكان في السودان.' 
                                    : 'From university hospitals to rural centers, we proudly reach every place in Sudan.'
                                 }
                             </p>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl">
                              <div className="flex flex-col gap-1">
                                  <span className="text-4xl font-black text-primary">٥٠+</span>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'مستشفى' : 'Hospitals'}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-4xl font-black text-primary">٨٠+</span>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'مركز متخصص' : 'Specialized Centers'}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-4xl font-black text-primary">١٨</span>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'ولاية' : 'States Covered'}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-4xl font-black text-primary">١٠٠٪</span>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'التزام' : 'Commitment'}</span>
                              </div>
                         </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
