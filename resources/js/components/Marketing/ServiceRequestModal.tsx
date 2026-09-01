import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { 
    X, 
    Send, 
    User, 
    Phone, 
    Mail, 
    Building2, 
    Briefcase,
    CheckCircle2,
    Loader2
} from 'lucide-react';

interface Service {
    id: number;
    title_en: string;
    title_ar: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    service: Service | null;
}

export default function ServiceRequestModal({ isOpen, onClose, service }: Props) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        phone: '',
        email: '',
        org: '',
        position: '',
        service_id: service?.id || '',
        service_title: isRtl ? service?.title_ar : service?.title_en,
        message: ''
    });

    React.useEffect(() => {
        if (service) {
            setData({
                ...data,
                service_id: service.id,
                service_title: isRtl ? service.title_ar : service.title_en
            });
        }
    }, [service]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('service-requests.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setTimeout(() => {
                    reset();
                    onClose();
                }, 3000);
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className={`absolute top-8 ${isRtl ? 'left-8' : 'right-8'} p-2 hover:bg-slate-100 rounded-full transition-colors z-10`}
                >
                    <X className="w-6 h-6 text-slate-400" />
                </button>

                {wasSuccessful ? (
                    <div className="p-12 md:p-20 flex flex-col items-center text-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">
                            {isRtl ? 'تم إرسال طلبك بنجاح' : 'Request Sent Successfully'}
                        </h2>
                        <p className="text-slate-500 font-medium max-w-md leading-relaxed">
                            {isRtl 
                                ? 'شكراً لاهتمامك بخدماتنا. سيقوم فريقنا المختص بمراجعة طلبك والتواصل معك قريباً جداً.' 
                                : 'Thank you for your interest. Our specialized team will review your request and get back to you very soon.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className="p-10 md:p-12 pb-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-primary font-black uppercase tracking-widest text-xs">
                                    {isRtl ? 'طلب خدمة مهنية' : 'Request Professional Service'}
                                </span>
                                <h2 className="text-3xl font-black text-slate-900">
                                    {isRtl ? service?.title_ar : service?.title_en}
                                </h2>
                                <p className="text-slate-400 text-sm font-medium">
                                    {isRtl ? 'يرجى تزويدنا بالتفاصيل التالية لنتمكن من خدمتك بشكل أفضل.' : 'Please provide the following details so we can serve you better.'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 md:p-12 pt-4 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'الاسم الكامل' : 'Full Name'}</label>
                                    <div className="relative">
                                        <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 ${isRtl ? 'right-4' : 'left-4'}`} />
                                        <input 
                                            required
                                            type="text" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full h-14 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12' : 'pl-12'}`}
                                            placeholder={isRtl ? 'أدخل اسمك الكريم' : 'Enter your name'}
                                        />
                                    </div>
                                    {errors.name && <span className="text-red-500 text-[10px] font-bold px-2">{errors.name}</span>}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'رقم الهاتف' : 'Phone Number'}</label>
                                    <div className="relative">
                                        <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 ${isRtl ? 'right-4' : 'left-4'}`} />
                                        <input 
                                            required
                                            type="tel" 
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className={`w-full h-14 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12' : 'pl-12'}`}
                                            placeholder={isRtl ? '05xxxxxxxx' : '05xxxxxxxx'}
                                        />
                                    </div>
                                    {errors.phone && <span className="text-red-500 text-[10px] font-bold px-2">{errors.phone}</span>}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                                    <div className="relative">
                                        <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 ${isRtl ? 'right-4' : 'left-4'}`} />
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`w-full h-14 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12' : 'pl-12'}`}
                                            placeholder="example@domain.com"
                                        />
                                    </div>
                                </div>

                                {/* Organization */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'اسم المستشفى / الجهة' : 'Hospital / Organization'}</label>
                                    <div className="relative">
                                        <Building2 className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 ${isRtl ? 'right-4' : 'left-4'}`} />
                                        <input 
                                            type="text" 
                                            value={data.org}
                                            onChange={e => setData('org', e.target.value)}
                                            className={`w-full h-14 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12' : 'pl-12'}`}
                                            placeholder={isRtl ? 'أدخل اسم الجهة التابع لها' : 'Enter hospital or entity name'}
                                        />
                                    </div>
                                </div>

                                {/* Position */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'الموقع الوظيفي' : 'Job Position'}</label>
                                    <div className="relative">
                                        <Briefcase className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 ${isRtl ? 'right-4' : 'left-4'}`} />
                                        <input 
                                            type="text" 
                                            value={data.position}
                                            onChange={e => setData('position', e.target.value)}
                                            className={`w-full h-14 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12' : 'pl-12'}`}
                                            placeholder={isRtl ? 'مثلاً: مدير صيانة، رئيس قسم...' : 'e.g. Maintenance Manager, Dept Head...'}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={processing}
                                type="submit"
                                className="mt-4 w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
                            >
                                {processing ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                                        {isRtl ? 'إرسال الطلب الآن' : 'Submit Request Now'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
