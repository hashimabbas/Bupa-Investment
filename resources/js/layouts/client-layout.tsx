import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { 
    Search,
    Bell,
} from 'lucide-react';
import { ClientSidebar } from '@/components/client-sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden h-screen" dir="rtl">
            <ClientSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative group">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="ابحث عن أجهزتك، بلاغات الصيانة، أو التقارير..." 
                                className="w-full bg-slate-50 border-none rounded-2xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all text-right"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 relative transition-colors border border-slate-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                {/* Page Area */}
                <div className="flex-1 p-8 lg:p-12 overflow-y-auto bg-slate-50/50">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
