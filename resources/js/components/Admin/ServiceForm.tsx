import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ImagePlus } from 'lucide-react';

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

interface ServiceFormProps {
    service?: Service;
    onSuccess?: () => void;
}

const COLORS = [
    { name: 'bg-emerald-50', label: 'Emerald Green' },
    { name: 'bg-blue-50', label: 'Marine Blue' },
    { name: 'bg-amber-50', label: 'Warm Amber' },
    { name: 'bg-purple-50', label: 'Royal Purple' },
    { name: 'bg-sky-50', label: 'Sky Blue' },
    { name: 'bg-rose-50', label: 'Soft Rose' },
    { name: 'bg-indigo-50', label: 'Deep Indigo' },
    { name: 'bg-slate-50', label: 'Neutral Slate' }
];

export default function ServiceForm({ service, onSuccess }: ServiceFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: service ? 'put' : 'post',
        type: service?.type || 'service',
        title_en: service?.title_en || '',
        title_ar: service?.title_ar || '',
        description_en: service?.description_en || '',
        description_ar: service?.description_ar || '',
        image: null as File | null,
        color: service?.color || 'bg-slate-50',
        is_active: service?.is_active ?? true,
        sort_order: service?.sort_order || 0
    });
    
    const [imagePreview, setImagePreview] = React.useState<string | null>(service?.image_url || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (service) {
            post(route('admin.services.update', service.id), {
                forceFormData: true,
                onSuccess: () => onSuccess?.()
            });
        } else {
            post(route('admin.services.store'), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6 font-sans">
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                <div className="space-y-2 flex-grow">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Classification</Label>
                    <Select 
                        value={data.type} 
                        onValueChange={(val: any) => setData('type', val)}
                    >
                        <SelectTrigger className="rounded-xl border-slate-200 bg-white h-12">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                            <SelectItem value="service">Core Service (e.g. Maintenance)</SelectItem>
                            <SelectItem value="solution">Integrated Solution (e.g. Facility Fit-out)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 lg:w-32">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Sort Order</Label>
                    <Input 
                        type="number" 
                        value={data.sort_order} 
                        onChange={e => setData('sort_order', parseInt(e.target.value))} 
                        className="rounded-xl border-slate-200 bg-white h-12"
                    />
                </div>
                <div className="flex items-center gap-2 pt-6">
                    <Checkbox 
                        id="is_active" 
                        checked={data.is_active} 
                        onCheckedChange={(checked) => setData('is_active', !!checked)} 
                    />
                    <Label htmlFor="is_active" className="font-bold cursor-pointer text-sm">Active</Label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary/20" />
                        English Details
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title_en">Title (EN)</Label>
                            <Input 
                                id="title_en" 
                                value={data.title_en} 
                                onChange={e => setData('title_en', e.target.value)} 
                                placeholder="Service title in English"
                                className="rounded-xl border-slate-200 h-12"
                            />
                            {errors.title_en && <p className="text-destructive text-xs">{errors.title_en}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description_en">Description (EN)</Label>
                            <Textarea 
                                id="description_en" 
                                value={data.description_en} 
                                onChange={e => setData('description_en', e.target.value)} 
                                placeholder="Service description in English..."
                                className="rounded-xl border-slate-200 min-h-[100px]"
                            />
                            {errors.description_en && <p className="text-destructive text-xs">{errors.description_en}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-4" dir="rtl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 text-right flex flex-row-reverse items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary/20" />
                        التفاصيل بالعربية
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title_ar" className="text-right block">العنوان (AR)</Label>
                            <Input 
                                id="title_ar" 
                                value={data.title_ar} 
                                onChange={e => setData('title_ar', e.target.value)} 
                                placeholder="عنوان الخدمة بالعربية"
                                className="rounded-xl border-slate-200 h-12 text-right"
                                dir="rtl"
                            />
                            {errors.title_ar && <p className="text-destructive text-xs text-right">{errors.title_ar}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description_ar" className="text-right block">الوصف (AR)</Label>
                            <Textarea 
                                id="description_ar" 
                                value={data.description_ar} 
                                onChange={e => setData('description_ar', e.target.value)} 
                                placeholder="وصف الخدمة بالعربية..."
                                className="rounded-xl border-slate-200 min-h-[100px] text-right"
                                dir="rtl"
                            />
                            {errors.description_ar && <p className="text-destructive text-xs text-right">{errors.description_ar}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Service Image</Label>
                    <div className="flex items-center gap-4">
                        {imagePreview ? (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 relative group shrink-0">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Label htmlFor="image" className="cursor-pointer text-white font-bold text-xs hover:underline">Change</Label>
                                </div>
                            </div>
                        ) : (
                            <Label htmlFor="image" className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-colors shrink-0">
                                <ImagePlus className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Upload</span>
                            </Label>
                        )}
                        <div className="flex-1">
                            <Input 
                                id="image" 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange} 
                            />
                            {errors.image && <p className="text-destructive text-xs mt-1">{errors.image}</p>}
                            <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
                                Upload a high-quality image representing the service. Recommended aspect ratio 1:1, max 2MB.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Theme Color</Label>
                    <Select 
                        value={data.color} 
                        onValueChange={(val) => setData('color', val)}
                    >
                        <SelectTrigger className="rounded-xl border-slate-200 bg-white h-12">
                            <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                            {COLORS.map((color) => (
                                <SelectItem key={color.name} value={color.name}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border border-slate-200 ${color.name}`} />
                                        <span className="font-bold">{color.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={processing} className="px-16 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {service ? 'Update Service' : 'Create Service'}
                </Button>
            </div>
        </form>
    );
}
