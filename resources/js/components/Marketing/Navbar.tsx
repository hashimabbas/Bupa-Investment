import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Globe, PhoneCall, UserCircle2, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { props } = usePage();
    const locale = (props.locale as string) || 'en';
    const isRtl = locale === 'ar';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: isRtl ? 'الرئيسية' : 'Home', href: '/' },
        { name: isRtl ? 'عن الشركة' : 'About Us', href: '/about' },
        { name: isRtl ? 'الخدمات' : 'Services', href: '/services' },
        { name: isRtl ? 'اتصل بنا' : 'Contact', href: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled || route().current() !== 'home'
                    ? 'bg-white/90 py-3 shadow-md backdrop-blur-lg border-b border-border/50'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/bupa-logo.png"
                            alt="Bupa Investment Co. Ltd"
                            className="w-16 h-16 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2 rounded-full font-bold text-foreground/60">
                                    <Globe className="w-4 h-4 text-[#a9822f]" />
                                    <span>{locale.toUpperCase()}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/lang/en" className="w-full">English</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/lang/ar" className="w-full text-right font-arabic">العربية</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href={route('contact')}>
                            <Button variant="outline" className="rounded-full px-6 border-secondary text-secondary hover:bg-secondary hover:text-white gap-2 h-11 font-bold group">
                                <PhoneCall className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span>{isRtl ? 'تواصل معنا' : 'Contact Us'}</span>
                            </Button>
                        </Link>

                        {props.auth?.user ? (
                            <Link href={route('dashboard')}>
                                <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 gap-2 h-11 font-bold group">
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>{isRtl ? 'لوحة التحكم' : 'Dashboard'}</span>
                                </Button>
                            </Link>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 gap-2 h-11 font-bold group">
                                        <UserCircle2 className="w-4 h-4" />
                                        <span>{isRtl ? 'بوابة العملاء' : 'Client Portal'}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-2xl w-56 p-2">
                                    <DropdownMenuItem className="rounded-xl p-0">
                                        <Link href={route('login')} className="flex items-center gap-3 w-full px-4 py-3 font-bold text-slate-700">
                                            <LogIn className="w-4 h-4 text-primary" />
                                            {isRtl ? 'تسجيل الدخول' : 'Client Login'}
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-xl p-0 mt-1 bg-primary/5">
                                        <Link href={route('client.register')} className="flex items-center gap-3 w-full px-4 py-3 font-black text-primary">
                                            <UserPlus className="w-4 h-4" />
                                            {isRtl ? 'إنشاء حساب منشأة' : 'Register Hospital'}
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-semibold py-2 border-b border-border/50 text-foreground/80 hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                        {props.auth?.user ? (
                            <Link href={route('dashboard')} onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full rounded-xl bg-primary text-white font-bold h-12 gap-2">
                                    <LayoutDashboard className="w-5 h-5" />
                                    {isRtl ? 'لوحة التحكم' : 'Dashboard'}
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full rounded-xl border-primary text-primary font-bold h-12 gap-2">
                                        <LogIn className="w-5 h-5" />
                                        {isRtl ? 'تسجيل الدخول' : 'Client Login'}
                                    </Button>
                                </Link>
                                <Link href={route('client.register')} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-xl bg-primary text-white font-bold h-12 gap-2">
                                        <UserPlus className="w-5 h-5" />
                                        {isRtl ? 'إنشاء حساب جديد' : 'Create New Account'}
                                    </Button>
                                </Link>
                            </>
                        )}
                        <div className="flex gap-4">
                            <Link href="/lang/en" className={`flex-1 text-center py-2 rounded-lg ${locale === 'en' ? 'bg-primary text-white' : 'bg-muted'}`}>EN</Link>
                            <Link href="/lang/ar" className={`flex-1 text-center py-2 rounded-lg ${locale === 'ar' ? 'bg-primary text-white' : 'bg-muted'}`}>AR</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
