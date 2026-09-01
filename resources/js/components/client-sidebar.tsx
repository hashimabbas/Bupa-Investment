import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Stethoscope,
    Wrench,
    PlusCircle,
    LogOut,
    UserCircle,
    ChevronRight,
    Menu,
    X,
    Building2,
    ShieldCheck
} from 'lucide-react';

interface ClientSidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function ClientSidebar({ isOpen, setIsOpen }: ClientSidebarProps) {
    const { props } = usePage();
    const user = props.auth?.user;

    const navItems = [
        {
            name: 'لوحة التحكم',
            icon: LayoutDashboard,
            href: route('client.dashboard'),
            active: route().current('client.dashboard'),
        },
        {
            name: 'الأجهزة والمعدات',
            icon: Stethoscope,
            href: '#', // TODO: create client equipment route
            active: false,
        },
        {
            name: 'طلبات الصيانة',
            icon: Wrench,
            href: '#', // TODO: create client tickets route
            active: false,
        },
        {
            name: 'طلب خدمة جديد',
            icon: PlusCircle,
            href: '#', // TODO: create client ticket create route
            active: false,
        },
    ];

    return (
        <aside
            dir="rtl"
            className={`fixed lg:static inset-y-0 right-0 z-50 bg-white border-l border-slate-200 transition-all duration-300 shadow-xl lg:shadow-none ${isOpen ? 'w-72' : 'w-20'
                } overflow-hidden flex flex-col h-full`}
        >
            {/* Header/Logo */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${!isOpen && 'lg:opacity-0'}`}>
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col whitespace-nowrap">
                        <span className="font-black text-slate-900 tracking-tight">بوابة العميل</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Terma Medical</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                >
                    {isOpen ? <X className="lg:hidden w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group whitespace-nowrap ${item.active
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`} />
                        <span className={`font-bold text-sm transition-opacity duration-300 ${!isOpen && 'lg:hidden'}`}>
                            {item.name}
                        </span>
                        {item.active && isOpen && (
                            <ChevronRight className="mr-auto w-4 h-4 opacity-50 rotate-180" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-slate-100 shrink-0">
                <div className="bg-slate-50 p-4 rounded-2xl mb-4 overflow-hidden">
                    <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className={`text-xs font-black text-slate-900 truncate transition-opacity duration-300 ${!isOpen && 'lg:opacity-0'}`}>
                            {user?.customer?.name || 'مستشفى غير معروف'}
                        </span>
                    </div>
                    <div className={`flex items-center gap-3 transition-opacity duration-300 ${!isOpen && 'lg:opacity-0'}`}>
                        <span className="text-[10px] font-bold text-slate-400 truncate">
                            {user?.position || 'موظف'}
                        </span>
                    </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group`}>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                        {user?.avatar ? <img src={user.avatar} alt="" /> : <UserCircle className="w-6 h-6" />}
                    </div>
                    <div className={`flex flex-col transition-opacity duration-300 ${!isOpen && 'lg:hidden'} overflow-hidden`}>
                        <span className="text-sm font-bold text-slate-900 truncate max-w-[140px]">{user?.name}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px]">{user?.email}</span>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={`mr-auto p-2 text-slate-400 hover:text-red-500 transition-opacity duration-300 ${!isOpen && 'lg:hidden'}`}
                    >
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
