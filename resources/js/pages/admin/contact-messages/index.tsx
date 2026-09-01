import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Mail,
    MailOpen,
    Search,
    Trash2,
    Phone,
    Inbox,
    CheckCircle2,
} from 'lucide-react';

interface ContactMessage {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    type: string;
    message: string | null;
    is_read: boolean;
    created_at: string;
}

interface Props {
    messages: {
        data: ContactMessage[];
        links: { url: string | null; label: string; active: boolean }[];
        total: number;
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    stats: {
        total: number;
        unread: number;
    };
}

const typeColors: Record<string, string> = {
    General: 'bg-slate-100 text-slate-600',
    Product: 'bg-blue-50 text-blue-600',
    Quote: 'bg-emerald-50 text-emerald-600',
    Support: 'bg-amber-50 text-amber-600',
    'Service Request': 'bg-purple-50 text-purple-600',
};

export default function ContactMessagesIndex({ messages, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.contact-messages.index'), { ...filters, search }, { preserveState: true });
    };

    const toggleRead = (message: ContactMessage) => {
        router.post(route('admin.contact-messages.toggle-read', message.id), {}, { preserveScroll: true });
    };

    const deleteMessage = (message: ContactMessage) => {
        if (confirm(`Are you sure you want to delete the message from "${message.name}"?`)) {
            router.delete(route('admin.contact-messages.destroy', message.id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout>
            <Head title="Contact Messages - Admin" />

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Contact Messages</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-primary" />
                        {stats.total} messages received from the website contact form.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                    onClick={() => router.get(route('admin.contact-messages.index'), {})}
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer hover:shadow-md transition-all"
                >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Inbox className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Messages</span>
                        <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                    </div>
                </div>
                <div
                    onClick={() => router.get(route('admin.contact-messages.index'), { status: 'unread' })}
                    className={`bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer hover:shadow-md transition-all ${stats.unread > 0 ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                >
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                        <Mail className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unread</span>
                        <span className="text-2xl font-black text-slate-900">{stats.unread}</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <form onSubmit={handleSearch} className="flex-1 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, phone, email, or message..."
                        className="w-full bg-white border border-slate-200 rounded-3xl h-14 pl-14 pr-6 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    />
                </form>

                <select
                    value={filters.status || ''}
                    onChange={e => router.get(route('admin.contact-messages.index'), { ...filters, status: e.target.value || null })}
                    className="bg-white border border-slate-200 rounded-2xl px-6 h-14 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none min-w-[140px]"
                >
                    <option value="">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                {messages.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 text-slate-300">
                        <Inbox className="w-16 h-16" />
                        <p className="font-bold text-slate-400">No messages found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {messages.data.map((message) => (
                            <div
                                key={message.id}
                                className={`flex flex-col md:flex-row md:items-start gap-4 p-8 transition-colors ${!message.is_read ? 'bg-primary/[0.03]' : ''}`}
                            >
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {!message.is_read && (
                                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        )}
                                        <span className="text-lg font-black text-slate-900">{message.name}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${typeColors[message.type] || 'bg-slate-100 text-slate-600'}`}>
                                            {message.type}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">{message.created_at}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium">
                                        <a href={`tel:${message.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors" dir="ltr">
                                            <Phone className="w-4 h-4" /> {message.phone}
                                        </a>
                                        {message.email && (
                                            <a href={`mailto:${message.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                                <Mail className="w-4 h-4" /> {message.email}
                                            </a>
                                        )}
                                    </div>

                                    {message.message && (
                                        <p className="text-slate-600 leading-relaxed max-w-2xl">{message.message}</p>
                                    )}
                                </div>

                                <div className="flex md:flex-col gap-2 shrink-0">
                                    <button
                                        onClick={() => toggleRead(message)}
                                        title={message.is_read ? 'Mark as unread' : 'Mark as read'}
                                        className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-400 flex items-center justify-center transition-colors"
                                    >
                                        {message.is_read ? <MailOpen className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => deleteMessage(message)}
                                        title="Delete message"
                                        className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {messages.last_page > 1 && (
                    <div className="flex flex-wrap gap-2 justify-center py-8 border-t border-slate-100">
                        {messages.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`h-10 px-4 rounded-xl flex items-center justify-center text-xs font-black transition-all ${link.active
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-white text-slate-500 border border-slate-100 hover:border-primary'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
