import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Plus,
    Pencil,
    Trash2,
    MoreVertical,
    Activity,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import ServiceForm from '@/components/Admin/ServiceForm';

interface Service {
    id: number;
    type: 'service' | 'solution';
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image_url?: string;
    color: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    services: Service[];
}



export default function ServicesIndex({ services }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const deleteService = (service: Service) => {
        if (confirm(`Are you sure you want to delete ${service.title_en}?`)) {
            router.delete(route('admin.services.destroy', service.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Services & Solutions Management - Admin" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 font-sans">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Services & Solutions</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Managing {services.length} medical services and integrated solutions.
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" /> Add New Item
                </Button>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 mb-8 font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Title & Description</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {services.map((service) => {
                                return (
                                    <tr key={service.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-14 h-14 rounded-2xl ${service.color || 'bg-slate-100'} flex items-center justify-center shadow-sm overflow-hidden border border-slate-200/50`}>
                                                    {service.image_url ? (
                                                        <img src={service.image_url} alt={service.title_en} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="w-6 h-6 text-slate-400 opacity-50" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col max-w-md">
                                                    <span className="font-black text-slate-900 text-lg leading-snug">{service.title_en}</span>
                                                    <span className="text-sm font-medium text-slate-500 line-clamp-1">{service.description_en}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {service.type === 'solution' ? (
                                                <Badge className="rounded-lg bg-blue-50 text-blue-600 border-blue-100 font-black uppercase text-[10px] tracking-widest px-3 py-1">
                                                    Solution
                                                </Badge>
                                            ) : (
                                                <Badge className="rounded-lg bg-emerald-50 text-emerald-600 border-emerald-100 font-black uppercase text-[10px] tracking-widest px-3 py-1">
                                                    Service
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-slate-400">#{service.sort_order}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl w-48 p-2 shadow-2xl">
                                                    <DropdownMenuItem
                                                        onClick={() => setEditingService(service)}
                                                        className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold"
                                                    >
                                                        <Pencil className="w-4 h-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteService(service)}
                                                        className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                );
                            })}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center text-slate-400">
                                        <Activity className="w-12 h-12 opacity-20 mx-auto mb-4" />
                                        <p className="font-bold">No services or solutions added yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-black">New Service/Solution</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Define a new professional service or integrated medical solution.
                        </DialogDescription>
                    </DialogHeader>
                    <ServiceForm onSuccess={() => setIsCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-black">Edit Item</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Modify the details of this service or solution.
                        </DialogDescription>
                    </DialogHeader>
                    {editingService && (
                        <ServiceForm service={editingService} onSuccess={() => setEditingService(null)} />
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
