import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    const { props } = usePage();
    const settings = (props.siteSettings as Record<string, string>) || {};
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { url: settings.social_facebook, icon: Facebook, color: 'hover:bg-blue-600' },
        { url: settings.social_twitter, icon: Twitter, color: 'hover:bg-sky-500' },
        { url: settings.social_linkedin, icon: Linkedin, color: 'hover:bg-blue-700' },
        { url: settings.social_instagram, icon: Instagram, color: 'hover:bg-pink-600' },
    ].filter(s => s.url && s.url !== '#');

    const sections = [
        {
            title: isRtl ? 'الروابط السريعة' : 'Quick Links',
            links: [
                { name: isRtl ? 'من نحن' : 'About Us', href: '/about' },
                { name: isRtl ? 'خدماتنا' : 'Services', href: '/services' },
                { name: isRtl ? 'تواصل معنا' : 'Contact Us', href: '/contact' },
            ]
        }
    ];

    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/bupa-logo.png"
                                alt="Bupa Investment Co. Ltd"
                                className="w-12 h-12 object-contain rounded-lg"
                            />
                             <div className="flex flex-col">
                                <span className="font-heading font-black text-xl leading-none tracking-tight">BUPA</span>
                                <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">Investment Co. Ltd</span>
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            {isRtl
                                ? 'شركة توريدات طبية ناشئة، ملتزمون بتقديم منتجات وحلول موثوقة للمؤسسات الصحية.'
                                : 'A new medical supplies company, committed to providing reliable products and solutions to healthcare institutions.'
                            }
                        </p>
                        {socialLinks.length > 0 && (
                            <div className="flex gap-4">
                                {socialLinks.map((s, idx) => {
                                    const Icon = s.icon;
                                    return (
                                        <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer"
                                            className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${s.color} transition-colors`}>
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Dynamic Sections */}
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-6">
                            <h3 className="font-heading font-bold text-lg text-white underline decoration-secondary decoration-2 underline-offset-8">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link href={link.href} className="text-white/60 hover:text-secondary transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-heading font-bold text-lg text-white underline decoration-secondary decoration-2 underline-offset-8">
                             {isRtl ? 'اتصل بنا' : 'Contact Info'}
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {(settings.address_en || settings.address_ar) && (
                                <li className="flex gap-3 text-sm text-white/60">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <span>{isRtl ? (settings.address_ar || settings.address_en) : (settings.address_en || settings.address_ar)}</span>
                                </li>
                            )}
                            {settings.phone && (
                                <li className="flex gap-3 text-sm text-white/60">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <span dir="ltr">{settings.phone}</span>
                                </li>
                            )}
                            {settings.phone_2 && (
                                <li className="flex gap-3 text-sm text-white/60">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <span dir="ltr">{settings.phone_2}</span>
                                </li>
                            )}
                            {settings.email_info && (
                                <li className="flex gap-3 text-sm text-white/60">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <span>{settings.email_info}</span>
                                </li>
                            )}
                            {settings.website && (
                                <li className="flex gap-3 text-sm text-white/60">
                                    <Globe className="w-5 h-5 text-primary shrink-0" />
                                    <a href={settings.website} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-secondary transition-colors">
                                        {settings.website.replace(/^https?:\/\//, '')}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-xs tracking-wide">
                        &copy; {currentYear} Bupa Investment Co. Ltd. {isRtl ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
                    </p>
                    <div className="flex gap-6 text-white/40 text-xs">
                        <Link href="/privacy" className="hover:text-white">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
                        <Link href="/terms" className="hover:text-white">{isRtl ? 'الشروط والأحكام' : 'Terms of Service'}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
