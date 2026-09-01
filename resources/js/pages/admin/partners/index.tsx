import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    ExternalLink, 
    Globe2, 
    MoreVertical,
    CheckCircle2,
    XCircle,
    LayoutGrid,
    List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from '@/components/ui/dialog';
import PartnerForm from '@/components/Admin/PartnerForm';
import { Partner } from '@/types/partner';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Paginator<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    partners: Paginator<Partner & { departments: any[] }>;
    departments: any[];
    filters: {
        search?: string;
    };
}

export default function PartnersIndex({ partners, departments, filters }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [search, setSearch] = useState(filters.search || '');

    const deletePartner = (partner: Partner) => {
        if (confirm(`Are you sure you want to delete ${partner.name}?`)) {
            router.delete(route('admin.partners.destroy', partner.id));
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.partners.index'), { search }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout>
            <Head title="Partners Management - Admin" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Partners</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-primary" />
                        Managing {partners.total} global partners and manufacturers.
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="relative w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                            placeholder="Search partners..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11 rounded-2xl h-12 border-slate-200 bg-white shadow-sm focus:ring-primary/20"
                        />
                    </form>
                    <Button 
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105 active:scale-95 shrink-0"
                    >
                        <Plus className="w-5 h-5" /> Add Partner
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Partner Details</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Departments</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {partners.data.map((partner) => (
                                <tr key={partner.id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2 shadow-sm focus-within:ring-2 ring-primary/20 transition-all overflow-hidden">
                                                {partner.logo ? (
                                                    <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <Globe2 className="w-6 h-6 text-slate-200" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{partner.name}</span>
                                                {partner.website_url && (
                                                    <a href={partner.website_url} target="_blank" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                                        <ExternalLink className="w-3 h-3" /> Visit Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {partner.is_active ? (
                                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full w-fit">
                                                <XCircle className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Inactive</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                                            #{partner.sort_order}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {partner.departments?.slice(0, 3).map((s, i) => (
                                                <span key={i} className="text-[9px] font-bold bg-white border border-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                    {s.name_en}
                                                </span>
                                            ))}
                                            {(partner.departments?.length || 0) > 3 && (
                                                <span className="text-[9px] font-bold text-slate-400">+{partner.departments.length - 3} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-2xl w-48 p-2">
                                                <DropdownMenuItem 
                                                    onClick={() => setEditingPartner(partner)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-slate-700"
                                                >
                                                    <Pencil className="w-4 h-4" /> Edit Partner
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => deletePartner(partner)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-destructive hover:bg-destructive/5"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete Partner
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            {partners.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <Globe2 className="w-12 h-12 opacity-20" />
                                            <p className="font-bold text-lg">{search ? `No partners match "${search}"` : 'No partners found yet.'}</p>
                                            {search ? (
                                                <Button variant="ghost" onClick={() => router.get(route('admin.partners.index'))}>Clear Search</Button>
                                            ) : (
                                                <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="rounded-xl">Add your first partner</Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
                    <span className="text-xs font-bold text-slate-400">
                        Showing <span className="text-slate-900">{partners.data.length}</span> of <span className="text-slate-900">{partners.total}</span> partners
                    </span>
                    {partners.last_page > 1 && (
                        <div className="flex items-center gap-2">
                            {partners.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    disabled={!link.url}
                                    className={`h-10 px-4 rounded-xl flex items-center justify-center text-xs font-black transition-all ${link.active
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-white text-slate-500 border border-slate-100 hover:border-primary'
                                        } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-3xl rounded-[2rem] p-8 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">Add New Partner</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Enter the details for the new manufacturer or partner.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                        <PartnerForm departments={departments} onSuccess={() => setIsCreateOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingPartner} onOpenChange={(open) => !open && setEditingPartner(null)}>
                <DialogContent className="max-w-3xl rounded-[2rem] p-8 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">Edit Partner</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Update the partner information and logo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                        {editingPartner && (
                            <PartnerForm 
                                partner={editingPartner} 
                                departments={departments}
                                onSuccess={() => setEditingPartner(null)} 
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
