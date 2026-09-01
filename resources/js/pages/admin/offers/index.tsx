import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Plus,
    Trash2,
    Edit3,
    Megaphone,
    ToggleLeft,
    ToggleRight,
    Layout,
    ExternalLink,
    Clock,
    Tag,
    XCircle,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from '@/components/ui/dialog';
import OfferForm from './partials/offer-form';

interface Offer {
    id: number;
    title_ar: string;
    title_en: string;
    description_ar: string | null;
    description_en: string | null;
    image: string | null;
    link: string | null;
    button_text_ar: string | null;
    button_text_en: string | null;
    type: string;
    is_active: boolean;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
}

interface Props {
    offers: Offer[];
}

export default function OffersIndex({ offers }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

    const deleteOffer = (offer: Offer) => {
        if (confirm(`Are you sure you want to delete offer "${offer.title_en}"?`)) {
            router.delete(route('admin.offers.destroy', offer.id));
        }
    };

    const toggleStatus = (offer: Offer) => {
        router.post(route('admin.offers.toggle-status', offer.id));
    };

    return (
        <AdminLayout>
            <Head title="Offers & Promotions - Admin" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Promotions & Offers</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary" />
                        Manage announcements, banners, and marketing popups.
                    </p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5" /> Create New Offer
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className={`bg-white rounded-[2.5rem] border transition-all overflow-hidden flex flex-col ${offer.is_active ? 'border-slate-100 shadow-xl shadow-slate-200/50' : 'border-slate-100 opacity-60 grayscale'}`}>
                        <div className="p-8 flex-1">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${offer.type === 'banner' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                        {offer.type === 'banner' ? <Layout className="w-6 h-6" /> : <Megaphone className="w-6 h-6" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{offer.type}</span>
                                            {offer.is_active ? (
                                                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                    <CheckCircle2 className="w-3 h-3" /> Live
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <XCircle className="w-3 h-3" /> Inactive
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{offer.title_en}</h3>
                                        <span className="text-sm font-bold text-slate-400" dir="rtl">{offer.title_ar}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingOffer(offer)} className="rounded-xl hover:bg-slate-50 transition-colors">
                                        <Edit3 className="w-4 h-4 text-slate-400" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => deleteOffer(offer)} className="rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-slate-600 font-medium line-clamp-2">
                                    {offer.description_en || "No description provided."}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Starts At</span>
                                            <span className="text-[10px] font-bold text-slate-700">{offer.starts_at ? new Date(offer.starts_at).toLocaleDateString() : 'Immediate'}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Ends At</span>
                                            <span className="text-[10px] font-bold text-slate-700">{offer.ends_at ? new Date(offer.ends_at).toLocaleDateString() : 'Never'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => toggleStatus(offer)}
                                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${offer.is_active ? 'text-emerald-600' : 'text-slate-400'}`}
                                >
                                    {offer.is_active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                    {offer.is_active ? 'Active' : 'Disabled'}
                                </button>
                            </div>
                            {offer.link && (
                                <a href={offer.link} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 hover:underline">
                                    Target Link <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {offers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                        <Tag className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">No active promotions</h3>
                    <p className="text-slate-400 font-medium">Start by creating your first announcement or offer.</p>
                </div>
            )}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-3xl rounded-[3rem] p-12">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Create Promotion</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-slate-400">Design a new banner or popup to engage your visitors.</DialogDescription>
                    </DialogHeader>
                    <OfferForm onSuccess={() => setIsCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingOffer} onOpenChange={() => setEditingOffer(null)}>
                <DialogContent className="max-w-3xl rounded-[3rem] p-12">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Edit Promotion</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-slate-400">Update the details and visibility of your offer.</DialogDescription>
                    </DialogHeader>
                    {editingOffer && <OfferForm offer={editingOffer} onSuccess={() => setEditingOffer(null)} />}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
