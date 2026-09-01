import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Globe2,
    Activity,
    TrendingUp,
    FileDown,
    LayoutGrid
} from 'lucide-react';

interface DepartmentStat {
    id: number;
    name_en: string;
    name_ar: string;
    products_count: number;
}

interface Props {
    stats: {
        products: number;
        partners: number;
        services: number;
    };
    departmentStats: DepartmentStat[];
}

export default function Dashboard({ stats, departmentStats }: Props) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const metricCards = [
        {
            title: isRtl ? 'الشركاء الدوليين' : 'Global Partners',
            value: stats.partners,
            subValue: isRtl ? 'مصنعون موثوقون' : 'trusted manufacturers',
            icon: Globe2,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: 'Stable',
            href: route('admin.partners.index')
        },
        {
            title: isRtl ? 'الخدمات والحلول' : 'Services & Solutions',
            value: stats.services,
            subValue: isRtl ? 'عروض نشطة' : 'active offerings',
            icon: Activity,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            trend: '+2',
            href: route('admin.services.index')
        }
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            {isRtl ? 'نظرة عامة على المنصة' : 'Platform Overview'}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {isRtl
                                ? `أهلاً بك مجدداً. إليك ما يحدث في بوبا للاستثمار اليوم، ${new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                                : `Welcome back. Here's what's happening at Bupa Investment today, ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                            }
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 h-12 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                            <FileDown className="w-4 h-4" />
                            {isRtl ? 'تصدير التقارير' : 'Export Reports'}
                        </button>
                    </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {metricCards.map((card, idx) => (
                        <Link key={idx} href={card.href} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden">
                            <div className="flex flex-col gap-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                        <card.icon className={`w-7 h-7 ${card.color}`} />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-600">{card.trend}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{card.title}</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900">{card.value}</span>
                                        <span className="text-xs font-bold text-slate-400">{card.subValue}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative background circle */}
                            <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${card.bg} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                        </Link>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Department Distribution */}
                    <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full" />
                        <div className="relative z-10 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                                    <LayoutGrid className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-black">{isRtl ? 'توزيع الأقسام' : 'Department Split'}</h2>
                                <p className="text-slate-400 text-xs font-medium">{isRtl ? 'نظرة على تنوع المنتجات الطبية' : 'Overview of medical product diversity'}</p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {departmentStats.slice(0, 5).map((dept) => (
                                    <div key={dept.id} className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                            <span className="text-slate-200">{isRtl ? dept.name_ar : dept.name_en}</span>
                                            <span className="text-primary">{dept.products_count}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${Math.min(100, (dept.products_count / (stats.products || 1)) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {departmentStats.length > 5 && (
                                    <Link href={route('admin.departments.index')} className="text-[10px] font-black text-center text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em] mt-2">
                                        {isRtl ? `+ ${departmentStats.length - 5} أقسام إضافية` : `+ ${departmentStats.length - 5} more departments`}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* System Quick Status */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{isRtl ? 'حالة النظام' : 'System Health'}</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                <span className="text-xs font-bold text-slate-600">{isRtl ? 'الموقع العام: نشط' : 'Public Site: Online'}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-xs font-bold text-slate-600">{isRtl ? 'قاعدة البيانات: مستقرة' : 'Database: Stable'}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                <span className="text-xs font-bold text-slate-600">{isRtl ? 'آخر مزامنة: منذ دقيقتين' : 'Last Sync: 2m ago'}</span>
                            </div>
                        </div>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                                {isRtl
                                    ? 'يتم تحديث جميع البيانات في الوقت الفعلي من الموقع الرئيسي.'
                                    : 'All data is synchronized in real-time from the main site.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
