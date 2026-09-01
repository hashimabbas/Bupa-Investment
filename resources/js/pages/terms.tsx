import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import { Scale, FileText, Gavel, AlertCircle, Bookmark } from 'lucide-react';

export default function Terms() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const sections = [
        {
            icon: Bookmark,
            title: isRtl ? 'قبول الشروط' : 'Acceptance of Terms',
            content: isRtl
                ? 'باستخدامك لموقع بوبا للاستثمار، سواء لتصفح خدماتنا أو إرسال استفسار أو إنشاء حساب في بوابة العملاء، فإنك توافق على الالتزام بالشروط الواردة في هذه الوثيقة.'
                : 'By using the Bupa Investment website — whether to browse our services, submit an inquiry, or create an account on the client portal — you agree to be bound by the terms set out in this document.'
        },
        {
            icon: FileText,
            title: isRtl ? 'محتوى الموقع والاستفسارات' : 'Site Content & Inquiries',
            content: isRtl
                ? 'المعلومات المعروضة عن خدماتنا هي لأغراض تعريفية عامة، ولا تُعد عرض سعر أو التزاماً نهائياً من جانبنا. أي عرض سعر أو تفاصيل فنية نهائية يتم تأكيدها مباشرة معك عبر التواصل الشخصي، ونحتفظ بالحق في تعديلها بناءً على توفر المنتجات أو الظروف اللوجستية.'
                : 'Information displayed about our services is for general informational purposes only and does not constitute a price quote or a final commitment on our part. Any final quote or technical details are confirmed with you directly through personal communication, and we reserve the right to adjust them based on availability or logistical conditions.'
        },
        {
            icon: Gavel,
            title: isRtl ? 'بوابة العملاء' : 'Client Portal',
            content: isRtl
                ? 'عند إنشاء حساب في بوابة العملاء، فإنك مسؤول عن تقديم معلومات دقيقة والحفاظ على سرية بيانات الدخول الخاصة بك. تخضع الحسابات الجديدة لمراجعة واعتماد من فريقنا قبل التفعيل، ونحتفظ بالحق في تعليق أي حساب يُستخدم بشكل مخالف لهذه الشروط.'
                : 'When you create an account on the client portal, you are responsible for providing accurate information and keeping your login credentials confidential. New accounts are subject to review and approval by our team before activation, and we reserve the right to suspend any account used in violation of these terms.'
        },
        {
            icon: Scale,
            title: isRtl ? 'الملكية الفكرية' : 'Intellectual Property',
            content: isRtl
                ? 'جميع المحتويات الظاهرة على هذا الموقع، بما في ذلك الشعار والتصميم والنصوص والصور، هي ملك لشركة بوبا للاستثمار المحدودة ولا يجوز إعادة استخدامها أو نسخها دون إذن كتابي مسبق.'
                : 'All content displayed on this website, including the logo, design, text, and images, is the property of Bupa Investment Co. Ltd and may not be reused or copied without prior written permission.'
        }
    ];

    return (
        <MarketingLayout>
            <Head title={isRtl ? 'الشروط والأحكام - بوبا للاستثمار' : 'Terms & Conditions - Bupa Investment Co. Ltd'} />

            <PageHeader
                title={isRtl ? 'الشروط والأحكام' : 'Terms & Conditions'}
                subtitle={isRtl
                    ? 'الأسس المنظمة لاستخدامك لموقعنا وتعاملك معنا.'
                    : 'The foundations governing your use of our website and your dealings with us.'
                }
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-12">
                            {sections.map((section, idx) => {
                                const Icon = section.icon;
                                return (
                                    <div key={idx} className="p-10 rounded-[4rem] bg-slate-50 border border-slate-100 flex flex-col gap-6 group hover:bg-white hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center -mt-20 self-start group-hover:scale-110 transition-transform">
                                            <Icon className="w-10 h-10 text-secondary" />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
                                                {section.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed font-medium italic">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="p-10 rounded-[4rem] bg-slate-50 border border-slate-100 flex flex-col gap-6 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center -mt-20 self-start group-hover:scale-110 transition-transform">
                                    <Scale className="w-10 h-10 text-secondary" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
                                        {isRtl ? 'القانون الواجب التطبيق' : 'Governing Law'}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed font-medium italic">
                                        {isRtl
                                            ? 'تخضع هذه الشروط والأحكام وتُفسر وفقاً للقوانين السارية في جمهورية السودان. أي نزاع ينشأ عن استخدام هذا الموقع يتم حله ودياً ابتداءً، أو عبر الجهات القضائية المختصة في السودان.'
                                            : 'These terms and conditions are governed by and construed in accordance with the laws of the Republic of Sudan. Any dispute arising from the use of this website shall be resolved amicably in the first instance, or through the competent judicial authorities in Sudan.'
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-[3rem] flex items-start gap-6">
                                <AlertCircle className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-lg font-bold text-blue-900">{isRtl ? 'إخلاء مسؤولية' : 'Disclaimer'}</h4>
                                    <p className="text-blue-800/70 text-sm leading-relaxed">
                                        {isRtl
                                            ? 'المعلومات المعروضة على هذا الموقع هي لأغراض تعريفية عامة، ونسعى دائماً لدقتها، لكننا لا نضمن خلوها من الأخطاء أو التحديثات المتأخرة. للحصول على معلومات نهائية ودقيقة عن أي خدمة، يُرجى التواصل معنا مباشرة.'
                                            : 'The information displayed on this website is for general informational purposes, and while we strive for accuracy, we do not guarantee it is free of errors or fully up to date. For final, accurate information about any service, please contact us directly.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
