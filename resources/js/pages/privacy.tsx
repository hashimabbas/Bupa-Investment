import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import { ShieldCheck, Lock, Eye, Cookie, FileText } from 'lucide-react';

export default function Privacy() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const sections = [
        {
            icon: Eye,
            title: isRtl ? 'المعلومات التي نجمعها' : 'Information We Collect',
            content: isRtl
                ? 'نجمع فقط المعلومات التي تقدمها لنا مباشرة: عند تعبئة نموذج التواصل (الاسم، رقم الهاتف، والبريد الإلكتروني إن وُجد، ونص رسالتك)، عند طلب خدمة محددة، أو عند إنشاء حساب في بوابة العملاء (الاسم، البريد الإلكتروني، رقم الهاتف، اسم المنشأة، والمسمى الوظيفي). لا نجمع أي بيانات مالية أو معلومات دفع عبر الموقع.'
                : 'We only collect information you provide to us directly: through the contact form (name, phone number, and email if provided, along with your message), when requesting a specific service, or when creating an account on the client portal (name, email, phone number, facility name, and job title). We do not collect any financial or payment information through the website.'
        },
        {
            icon: Lock,
            title: isRtl ? 'كيف نستخدم بياناتك' : 'How We Use Your Information',
            content: isRtl
                ? 'تُستخدم بياناتك للرد على استفساراتك، وتزويدك بمعلومات عن منتجاتنا وخدماتنا، وإدارة حسابك إن قمت بإنشاء واحد. لا نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية، ولا نبيعها تحت أي ظرف.'
                : 'Your information is used to respond to your inquiries, provide you with information about our products and services, and manage your account if you have created one. We do not share your data with third parties for marketing purposes, and we never sell it.'
        },
        {
            icon: Cookie,
            title: isRtl ? 'واتساب وملفات تعريف الارتباط' : 'WhatsApp & Cookies',
            content: isRtl
                ? 'عند الضغط على زر واتساب، يتم فتح محادثة مباشرة عبر تطبيق أو موقع واتساب الخاص بك، وتخضع تلك المحادثة لسياسة خصوصية واتساب وليس لسياستنا. نستخدم على موقعنا فقط ملفات تعريف ارتباط أساسية للحفاظ على تفضيل اللغة وجلسة تسجيل الدخول، ولا نستخدم أدوات تتبع إعلانية من أطراف ثالثة.'
                : 'When you click the WhatsApp button, it opens a direct conversation through your own WhatsApp app or website, and that conversation is governed by WhatsApp\'s own privacy policy, not ours. On our site, we only use essential cookies to remember your language preference and keep you logged in — we do not use third-party advertising trackers.'
        },
        {
            icon: ShieldCheck,
            title: isRtl ? 'أمان بياناتك وحقوقك' : 'Data Security & Your Rights',
            content: isRtl
                ? 'يتم تخزين بياناتك في قاعدة بيانات آمنة، ولا يمكن الوصول إليها إلا من قبل فريقنا المخوّل. لك الحق الكامل في طلب الاطلاع على بياناتك المسجلة لدينا، أو تصحيحها، أو حذفها في أي وقت، وذلك بالتواصل معنا عبر صفحة "تواصل معنا".'
                : 'Your data is stored in a secure database and is only accessible to our authorized staff. You have the full right to request access to your registered data, request its correction, or request its deletion at any time by reaching out to us through our "Contact Us" page.'
        }
    ];

    return (
        <MarketingLayout>
            <Head title={isRtl ? 'سياسة الخصوصية - بوبا للاستثمار' : 'Privacy Policy - Bupa Investment Co. Ltd'} />

            <PageHeader
                title={isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
                subtitle={isRtl
                    ? 'نلتزم بحماية بياناتك والتعامل معها بشفافية ووضوح.'
                    : 'We are committed to protecting your data and handling it with transparency and clarity.'
                }
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col gap-16">
                            {sections.map((section, idx) => {
                                const Icon = section.icon;
                                return (
                                    <div key={idx} className="flex flex-col md:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-lg shadow-primary/5">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
                                                {section.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed text-lg italic">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col gap-6 mt-8">
                                <h4 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-secondary" />
                                    {isRtl ? 'التحديثات على هذه السياسة' : 'Updates to This Policy'}
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {isRtl
                                        ? 'تم تحديث هذه السياسة في سبتمبر ٢٠٢٦. قد نقوم بتعديل بنود هذه السياسة مستقبلاً بما يتوافق مع تطور خدماتنا والتشريعات المحلية في السودان. استمرارك في استخدام الموقع يعني موافقتك على النسخة الأحدث من هذه السياسة.'
                                        : 'This policy was last updated in September 2026. We may revise these terms in the future to reflect the evolution of our services and local legislation in Sudan. Your continued use of the site constitutes your agreement to the latest version of this policy.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
