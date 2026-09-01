import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    MoreVertical,
    CheckCircle2,
    XCircle,
    MessageSquare,
    Star,
    Video,
    User,
    Search,
    LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from '@/components/ui/dialog';
import TestimonialForm from '@/components/Admin/TestimonialForm';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
    id: number;
    name_en: string;
    name_ar: string | null;
    position_en: string | null;
    position_ar: string | null;
    company_en: string | null;
    company_ar: string | null;
    avatar: string | null;
    content_en: string;
    content_ar: string | null;
    video_url: string | null;
    rating: number;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

interface Props {
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteTestimonial = (testimonial: Testimonial) => {
        if (confirm(`Are you sure you want to delete ${testimonial.name_en}'s testimonial?`)) {
            router.delete(route('admin.testimonials.destroy', testimonial.id));
        }
    };

    const toggleStatus = (id: number) => {
        router.post(route('admin.testimonials.toggle-status', id));
    };

    const filteredTestimonials = testimonials.filter(t => {
        const query = searchQuery.toLowerCase();
        return (
            t.name_en.toLowerCase().includes(query) ||
            (t.name_ar || '').toLowerCase().includes(query) ||
            (t.company_en || '').toLowerCase().includes(query)
        );
    });

    return (
        <AdminLayout>
            <Head title="Testimonials Management - Admin" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight text-right md:text-left rtl:md:text-right">Testimonials</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Managing {testimonials.length} client experiences and success stories.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Search testimonials..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 rounded-2xl h-12 border-slate-200 bg-white"
                        />
                    </div>
                    <Button 
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105"
                    >
                        <Plus className="w-5 h-5" /> Add Testimonial
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 mb-8 font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client Details</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rating & Content</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTestimonials.map((testimonial) => (
                                <tr key={testimonial.id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-1 shadow-sm overflow-hidden shrink-0 relative">
                                                {testimonial.avatar ? (
                                                    <img src={testimonial.avatar} className="w-full h-full object-cover rounded-xl" />
                                                ) : (
                                                    <User className="w-6 h-6 text-slate-200" />
                                                )}
                                                {testimonial.video_url && (
                                                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-lg shadow-lg border-2 border-white">
                                                        <Video className="w-2.5 h-2.5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg">{testimonial.name_en}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-slate-400">
                                                        {testimonial.position_en} @ {testimonial.company_en}
                                                    </span>
                                                    {testimonial.is_featured && (
                                                        <Badge className="bg-primary/10 text-primary text-[8px] h-4 border-none font-black uppercase tracking-widest">Featured</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2 max-w-md">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2 italic font-medium leading-relaxed">
                                                "{testimonial.content_en}"
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button 
                                            onClick={() => toggleStatus(testimonial.id)}
                                            className="flex items-center gap-2"
                                        >
                                            {testimonial.is_active ? (
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <XCircle className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Inactive</span>
                                                </div>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-2xl w-52 p-2">
                                                <DropdownMenuItem 
                                                    onClick={() => setEditingTestimonial(testimonial)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-slate-700 hover:bg-primary/5 hover:text-primary"
                                                >
                                                    <Pencil className="w-4 h-4" /> Edit Testimonial
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => deleteTestimonial(testimonial)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-destructive hover:bg-destructive/5"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            {filteredTestimonials.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <MessageSquare className="w-12 h-12 opacity-20" />
                                            {searchQuery ? (
                                                <p className="font-bold text-lg">No results match "{searchQuery}"</p>
                                            ) : (
                                                <>
                                                    <p className="font-bold text-lg">No testimonials yet.</p>
                                                    <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="rounded-xl">Add first testimonial</Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-4xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] border-none shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black tracking-tight">New Testimonial</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500 text-base">
                            Add a new customer success story to your website.
                        </DialogDescription>
                    </DialogHeader>
                    <TestimonialForm onSuccess={() => setIsCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingTestimonial} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                <DialogContent className="max-w-4xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] border-none shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black tracking-tight">Edit Testimonial</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500 text-base">
                            Update the content or media for this testimonial.
                        </DialogDescription>
                    </DialogHeader>
                    {editingTestimonial && (
                        <TestimonialForm 
                            testimonial={editingTestimonial} 
                            onSuccess={() => setEditingTestimonial(null)} 
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
