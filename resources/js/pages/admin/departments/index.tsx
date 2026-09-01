import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    MoreVertical,
    BookOpen,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Department {
    id: number;
    name_en: string;
    name_ar: string;
    created_at: string;
}

interface Props {
    departments: Department[];
}

export default function DepartmentsIndex({ departments }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name_en: '',
        name_ar: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDepartment) {
            put(route('admin.departments.update', editingDepartment.id), {
                onSuccess: () => {
                    setEditingDepartment(null);
                    reset();
                }
            });
        } else {
            post(route('admin.departments.store'), {
                onSuccess: () => {
                    setIsCreateOpen(false);
                    reset();
                }
            });
        }
    };

    const openEdit = (dept: Department) => {
        setData({
            name_en: dept.name_en,
            name_ar: dept.name_ar,
        });
        setEditingDepartment(dept);
    };

    const deleteDepartment = (dept: Department) => {
        if (confirm(`Are you sure you want to delete ${dept.name_en}? This will affect partners and products in this department.`)) {
            router.delete(route('admin.departments.destroy', dept.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Medical Departments - Admin" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Medical Departments</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Managing {departments.length} unified medical departments and categories.
                    </p>
                </div>
                <Button 
                    onClick={() => { reset(); clearErrors(); setIsCreateOpen(true); }}
                    className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" /> Add Department
                </Button>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 mb-8 font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name (EN)</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name (AR)</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Created At</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {departments.map((dept) => (
                                <tr key={dept.id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{dept.name_en}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-900 text-lg" dir="rtl">{dept.name_ar}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-slate-400">
                                            {new Date(dept.created_at).toLocaleDateString()}
                                        </span>
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
                                                    onClick={() => openEdit(dept)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-slate-700"
                                                >
                                                    <Pencil className="w-4 h-4" /> Edit Department
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => deleteDepartment(dept)}
                                                    className="rounded-xl px-4 py-3 cursor-pointer gap-2 font-bold text-destructive hover:bg-destructive/5"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete Department
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <BookOpen className="w-12 h-12 opacity-20" />
                                            <p className="font-bold text-lg">No departments defined yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog 
                open={isCreateOpen || !!editingDepartment} 
                onOpenChange={(open) => {
                    if (!open) {
                        setIsCreateOpen(false);
                        setEditingDepartment(null);
                        reset();
                        clearErrors();
                    }
                }}
            >
                <DialogContent className="max-w-md rounded-[2rem] p-8 border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            {editingDepartment ? 'Edit Department' : 'Add New Department'}
                        </DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Enter the medical department names in both languages.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name_en">Name (English)</Label>
                            <Input 
                                id="name_en" 
                                value={data.name_en} 
                                onChange={e => setData('name_en', e.target.value)} 
                                placeholder="Radiology"
                                className="rounded-xl border-slate-200 h-12"
                            />
                            {errors.name_en && <p className="text-destructive text-xs">{errors.name_en}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name_ar" className="text-right block">الاسم (بالعربية)</Label>
                            <Input 
                                id="name_ar" 
                                className="text-right rounded-xl border-slate-200 h-12"
                                dir="rtl"
                                value={data.name_ar} 
                                onChange={e => setData('name_ar', e.target.value)} 
                                placeholder="الأشعة"
                            />
                            {errors.name_ar && <p className="text-destructive text-xs text-right">{errors.name_ar}</p>}
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={processing} className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingDepartment ? 'Update Department' : 'Create Department'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
