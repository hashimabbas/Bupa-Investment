import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumb?: { name: string; href: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    return (
        <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
            {/* Background elements */}
            <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-1/2 h-full bg-primary/20 -skew-x-12 z-0 opacity-50`} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50 z-0" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col gap-6 max-w-4xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/40 text-sm font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            {isRtl ? 'الرئيسية' : 'Home'}
                        </Link>
                        {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        {breadcrumb?.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Link href={item.href} className="hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                                {idx < breadcrumb.length - 1 && (
                                    isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                                )}
                            </React.Fragment>
                        ))}
                        {breadcrumb && (isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
                        <span className="text-white/80">{title}</span>
                    </nav>

                    <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
