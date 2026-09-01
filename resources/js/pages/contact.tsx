import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import PageHeader from '@/components/Marketing/PageHeader';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';
    const settings = (props.siteSettings as Record<string, string>) || {};

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        type: 'General',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');

        if (type) {
            setFormData(prev => ({ ...prev, type }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('/api/contact', formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Contact submission failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const address = isRtl ? (settings.address_ar || settings.address_en) : (settings.address_en || settings.address_ar);

    const contactMethods = [
        ...(settings.email_info ? [{
            title: isRtl ? 'البريد الإلكتروني' : 'Email Address',
            value: settings.email_info,
            icon: Mail,
            color: 'bg-primary'
        }] : []),
        ...(settings.phone ? [{
            title: isRtl ? 'رقم الهاتف' : 'Phone Number',
            value: settings.phone,
            icon: Phone,
            color: 'bg-secondary'
        }] : []),
        ...(address ? [{
            title: isRtl ? 'موقعنا' : 'Our Office',
            value: address,
            icon: MapPin,
            color: 'bg-blue-600'
        }] : []),
    ];

    return (
        <MarketingLayout>
            <Head title="Contact Us - Bupa Investment Co. Ltd" />

            <PageHeader
                title={isRtl ? 'تواصل معنا' : 'Contact Us'}
                subtitle={isRtl
                    ? 'فريقنا جاهز للإجابة على جميع استفساراتكم.'
                    : 'Our team is ready to answer all your inquiries.'
                }
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1 flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-3xl font-heading font-black text-slate-900">
                                    {isRtl ? 'تواصل معنا مباشرة' : 'Get in Touch'}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {isRtl
                                        ? 'أرسل لنا رسالتك وسنعاود التواصل معك في أقرب وقت ممكن.'
                                        : 'Send us a message and we will get back to you as soon as possible.'
                                    }
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {contactMethods.map((method, idx) => {
                                    const Icon = method.icon;
                                    return (
                                        <div key={idx} className="flex gap-5 p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 items-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                                            <div className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{method.title}</span>
                                                <span className="text-lg font-bold text-slate-900" dir={method.icon === MapPin ? undefined : 'ltr'}>{method.value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {settings.whatsapp_number && (
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${settings.whatsapp_number}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex items-center gap-4 hover:bg-emerald-100 transition-colors"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <span className="text-sm font-black text-emerald-900">
                                        {isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                                    </span>
                                </a>
                            )}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-slate-50 p-8 lg:p-16 rounded-[4rem] border border-slate-100 relative overflow-hidden">
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-6 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/10">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-3xl font-black text-slate-900">
                                            {isRtl ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
                                        </h3>
                                        <p className="text-muted-foreground text-lg italic">
                                            {isRtl ? 'سيتواصل معك أحد أعضاء فريقنا قريباً.' : 'A member of our team will contact you shortly.'}
                                        </p>
                                    </div>
                                    <Button variant="outline" className="rounded-2xl" onClick={() => setIsSubmitted(false)}>
                                        {isRtl ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-3xl font-heading font-black text-slate-900">
                                            {isRtl ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {isRtl ? 'املأ البيانات التالية وسنتواصل معك قريباً.' : 'Fill in the details below and we\'ll get back to you soon.'}
                                        </p>
                                    </div>

                                    <form className="grid gap-6" onSubmit={handleSubmit}>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">{isRtl ? 'الاسم' : 'Full Name'}</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-slate-900 shadow-sm"
                                                    placeholder={isRtl ? 'أدخل اسمك الكريم' : 'Enter your name'}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">{isRtl ? 'رقم الهاتف' : 'Phone Number'}</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-white border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-slate-900 shadow-sm"
                                                    placeholder="+249..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">{isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-slate-900 shadow-sm"
                                                placeholder="example@domain.com"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">{isRtl ? 'رسالتك' : 'Your Message'}</label>
                                            <textarea
                                                rows={5}
                                                required
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white border-0 rounded-3xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-slate-900 shadow-sm resize-none"
                                                placeholder={isRtl ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                                            <Button
                                                size="lg"
                                                disabled={isSubmitting}
                                                className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-12 h-16 text-lg group w-full md:w-auto shadow-xl shadow-secondary/20 font-bold"
                                            >
                                                {isSubmitting ? (isRtl ? 'جاري الإرسال...' : 'Sending...') : (isRtl ? 'إرسال الرسالة' : 'Send Message')}
                                                <Send className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isRtl ? 'mr-3 rotate-180' : 'ml-3'}`} />
                                            </Button>

                                            <p className="text-[10px] text-muted-foreground italic text-center md:text-left">
                                                {isRtl ? 'بياناتك في أمان. نلتزم بخصوصية معلوماتك.' : 'Your data is secure. We respect your privacy.'}
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
