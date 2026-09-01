import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Partner } from '@/types/partner';
import { Loader2, BookOpen } from 'lucide-react';

interface Department {
    id: number;
    name_en: string;
    name_ar: string;
}

interface PartnerFormProps {
    partner?: Partner & { departments?: Department[] };
    departments: Department[];
    onSuccess?: () => void;
}

export default function PartnerForm({ partner, departments, onSuccess }: PartnerFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: partner?.name || '',
        desc_en: partner?.desc_en || '',
        desc_ar: partner?.desc_ar || '',
        logo: null as File | string | null,
        website_url: partner?.website_url || '',
        department_ids: partner?.departments?.map(s => s.id) || [] as number[],
        is_active: partner?.is_active ?? true,
        sort_order: partner?.sort_order || 0,
        _method: partner ? 'PUT' : 'POST'
    });

    const toggleDepartment = (id: number) => {
        const current = [...data.department_ids];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setData('department_ids', current);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                if (!partner) reset();
                onSuccess?.();
            },
            forceFormData: true,
        };

        if (partner) {
            post(route('admin.partners.update', partner.id), options);
        } else {
            post(route('admin.partners.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Partner Name</Label>
                    <Input 
                        id="name" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)} 
                        placeholder="e.g. GE Healthcare"
                        className="rounded-xl border-slate-200"
                    />
                    {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input 
                        id="website_url" 
                        type="url"
                        value={data.website_url} 
                        onChange={e => setData('website_url', e.target.value)} 
                        placeholder="https://example.com"
                        className="rounded-xl border-slate-200"
                    />
                    {errors.website_url && <p className="text-destructive text-xs">{errors.website_url}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="desc_en">Description (English)</Label>
                    <Textarea 
                        id="desc_en" 
                        value={data.desc_en} 
                        onChange={e => setData('desc_en', e.target.value)} 
                        placeholder="English description..."
                        className="rounded-xl border-slate-200 min-h-[100px]"
                    />
                    {errors.desc_en && <p className="text-destructive text-xs">{errors.desc_en}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="desc_ar">Description (Arabic)</Label>
                    <Textarea 
                        id="desc_ar" 
                        className="text-right rounded-xl border-slate-200 min-h-[100px]"
                        dir="rtl"
                        value={data.desc_ar} 
                        onChange={e => setData('desc_ar', e.target.value)} 
                        placeholder="الوصف بالعربية..."
                    />
                    {errors.desc_ar && <p className="text-destructive text-xs">{errors.desc_ar}</p>}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-sm font-black flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Medical Departments
                </Label>
                <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-all hover:border-primary/20">
                            <Checkbox 
                                id={`dept-${dept.id}`} 
                                checked={data.department_ids.includes(dept.id)} 
                                onCheckedChange={() => toggleDepartment(dept.id)} 
                            />
                            <div className="flex flex-col">
                                <Label 
                                    htmlFor={`dept-${dept.id}`}
                                    className="text-sm font-bold text-slate-900 cursor-pointer"
                                >
                                    {dept.name_en}
                                </Label>
                                <span className="text-[10px] text-slate-400 font-medium">{dept.name_ar}</span>
                            </div>
                        </div>
                    ))}
                    {departments.length === 0 && (
                        <p className="col-span-full text-center py-4 text-sm text-slate-400 font-bold">
                            No departments defined.
                        </p>
                    )}
                </div>
                {errors.department_ids && <p className="text-destructive text-xs">{errors.department_ids}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-slate-50/30 p-6 rounded-[2rem] border border-slate-50">
                <div className="space-y-2">
                    <Label htmlFor="logo">Logo Image</Label>
                    <Input 
                        id="logo" 
                        type="file" 
                        onChange={e => setData('logo', e.target.files?.[0] || null)} 
                        accept="image/*"
                        className="rounded-xl border-slate-200 bg-white"
                    />
                    {partner?.logo && typeof data.logo !== 'object' && (
                        <div className="mt-2 h-16 w-fit bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <img src={partner.logo} alt="current" className="h-full object-contain" />
                        </div>
                    )}
                    {errors.logo && <p className="text-destructive text-xs">{errors.logo}</p>}
                </div>
                <div className="flex items-center gap-8 pb-3 px-2">
                    <div className="flex items-center space-x-3">
                        <Checkbox 
                            id="is_active" 
                            checked={data.is_active} 
                            onCheckedChange={(checked) => setData('is_active', !!checked)} 
                        />
                        <Label htmlFor="is_active" className="font-bold cursor-pointer">Active</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Label htmlFor="sort_order" className="font-bold">Order</Label>
                        <Input 
                            id="sort_order" 
                            type="number" 
                            className="w-20 rounded-xl border-slate-200 bg-white"
                            value={data.sort_order} 
                            onChange={e => setData('sort_order', parseInt(e.target.value))} 
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Button type="submit" disabled={processing} className="px-10 h-12 rounded-xl font-black shadow-lg shadow-primary/20">
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {partner ? 'Update Partner' : 'Create Partner'}
                </Button>
            </div>
        </form>
    );
}
