import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, Star, Video, User } from 'lucide-react';

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
}

interface TestimonialFormProps {
    testimonial?: Testimonial;
    onSuccess?: () => void;
}

export default function TestimonialForm({ testimonial, onSuccess }: TestimonialFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name_en: testimonial?.name_en || '',
        name_ar: testimonial?.name_ar || '',
        position_en: testimonial?.position_en || '',
        position_ar: testimonial?.position_ar || '',
        company_en: testimonial?.company_en || '',
        company_ar: testimonial?.company_ar || '',
        content_en: testimonial?.content_en || '',
        content_ar: testimonial?.content_ar || '',
        avatar: testimonial?.avatar || null as File | string | null,
        video_url: testimonial?.video_url || '',
        rating: testimonial?.rating || 5,
        is_featured: testimonial?.is_featured ?? false,
        is_active: testimonial?.is_active ?? true,
        sort_order: testimonial?.sort_order || 0,
        _method: testimonial ? 'PUT' : 'POST'
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                if (!testimonial) reset();
                onSuccess?.();
            },
            forceFormData: true,
        };

        if (testimonial) {
            post(route('admin.testimonials.update', testimonial.id), options);
        } else {
            post(route('admin.testimonials.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* English Content */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary/20" />
                        English Details
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name_en">Client Name *</Label>
                            <Input 
                                id="name_en" 
                                value={data.name_en} 
                                onChange={e => setData('name_en', e.target.value)} 
                                className="rounded-xl border-slate-200 h-12"
                            />
                            {errors.name_en && <p className="text-destructive text-xs">{errors.name_en}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="position_en">Position</Label>
                                <Input 
                                    id="position_en" 
                                    value={data.position_en || ''} 
                                    onChange={e => setData('position_en', e.target.value)} 
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company_en">Company</Label>
                                <Input 
                                    id="company_en" 
                                    value={data.company_en || ''} 
                                    onChange={e => setData('company_en', e.target.value)} 
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content_en">Testimonial Content *</Label>
                            <Textarea 
                                id="content_en" 
                                value={data.content_en} 
                                onChange={e => setData('content_en', e.target.value)} 
                                className="rounded-xl border-slate-200 min-h-[120px]"
                            />
                            {errors.content_en && <p className="text-destructive text-xs">{errors.content_en}</p>}
                        </div>
                    </div>
                </div>

                {/* Arabic Content */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100" dir="rtl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 text-right flex-row-reverse">
                        <span className="w-8 h-[2px] bg-primary/20" />
                        التفاصيل العربية
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name_ar" className="text-right block">اسم العميل</Label>
                            <Input 
                                id="name_ar" 
                                value={data.name_ar || ''} 
                                onChange={e => setData('name_ar', e.target.value)} 
                                className="rounded-xl border-slate-200 h-12 text-right"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="position_ar" className="text-right block">المنصب</Label>
                                <Input 
                                    id="position_ar" 
                                    value={data.position_ar || ''} 
                                    onChange={e => setData('position_ar', e.target.value)} 
                                    className="rounded-xl border-slate-200 text-right"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company_ar" className="text-right block">الشركة</Label>
                                <Input 
                                    id="company_ar" 
                                    value={data.company_ar || ''} 
                                    onChange={e => setData('company_ar', e.target.value)} 
                                    className="rounded-xl border-slate-200 text-right"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content_ar" className="text-right block">نص الشهادة</Label>
                            <Textarea 
                                id="content_ar" 
                                value={data.content_ar || ''} 
                                onChange={e => setData('content_ar', e.target.value)} 
                                className="rounded-xl border-slate-200 min-h-[120px] text-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Media & Settings */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <Label className="font-black text-xs uppercase tracking-widest text-slate-400 mb-3 block">Client Avatar</Label>
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                {testimonial?.avatar && typeof data.avatar !== 'object' ? (
                                    <img src={testimonial.avatar} className="w-full h-full object-cover" />
                                ) : data.avatar instanceof File ? (
                                    <img src={URL.createObjectURL(data.avatar)} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-8 h-8 text-slate-200" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <Input 
                                    type="file" 
                                    onChange={e => setData('avatar', e.target.files?.[0] || null)}
                                    accept="image/*"
                                    className="rounded-xl border-slate-200 bg-white h-11 pt-2 text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <Label htmlFor="video_url" className="font-black text-xs uppercase tracking-widest text-slate-400 mb-3 block">Video URL (Optional)</Label>
                        <div className="relative">
                            <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                id="video_url"
                                value={data.video_url || ''}
                                onChange={e => setData('video_url', e.target.value)}
                                placeholder="YouTube / Vimeo link"
                                className="pl-11 rounded-xl border-slate-200 h-11"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 mb-3 block">Ratings & Status</Label>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold">Rating</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        className={`w-5 h-5 cursor-pointer transition-colors ${data.rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                                        onClick={() => setData('rating', star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is_featured" className="text-sm font-bold cursor-pointer">Featured</Label>
                            <Checkbox 
                                id="is_featured" 
                                checked={data.is_featured} 
                                onCheckedChange={checked => setData('is_featured', !!checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is_active" className="text-sm font-bold cursor-pointer">Active</Label>
                            <Checkbox 
                                id="is_active" 
                                checked={data.is_active} 
                                onCheckedChange={checked => setData('is_active', !!checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={processing} className="px-16 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                    {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {testimonial ? 'Update Testimonial' : 'Publish Testimonial'}
                </Button>
            </div>
        </form>
    );
}
