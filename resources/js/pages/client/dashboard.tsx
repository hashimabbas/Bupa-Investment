import React from 'react';
import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Phone,
    Mail,
    Activity
} from 'lucide-react';

interface Props {
    hospital: string;
    site: string;
}

export default function ClientDashboard({ hospital, site }: Props) {
    return (
        <ClientLayout>
            <Head title="لوحة تحكم العميل" />

            <div className="flex flex-col gap-8" dir="rtl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            مرحباً بك في {hospital}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {site} - بوابة العميل
                        </p>
                    </div>

                    <Link href={route('contact')} className="flex items-center gap-2 px-6 h-12 bg-primary text-white rounded-2xl text-sm font-black hover:shadow-lg hover:shadow-primary/20 transition-all">
                        <Phone className="w-5 h-5" />
                        تواصل معنا
                    </Link>
                </div>

                {/* Helpful Cards */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-4 max-w-md">
                        <div className="flex items-center gap-3 text-primary">
                            <Activity className="w-6 h-6" />
                            <h3 className="font-black">خدماتنا</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            تعرف على الخدمات المهنية التي نقدمها لمنشأتكم.
                        </p>
                        <Link href={route('services')} className="text-xs font-black text-primary uppercase tracking-widest mt-2 hover:underline">
                            عرض الخدمات
                        </Link>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        لأي استفسار أو طلب دعم، يسعدنا تواصلكم معنا عبر صفحة "تواصل معنا" وسيقوم فريقنا بالرد عليكم في أقرب وقت.
                    </p>
                </div>
            </div>
        </ClientLayout>
    );
}
