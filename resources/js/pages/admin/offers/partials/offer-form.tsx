import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
    Loader2, 
    Type, 
    Link as LinkIcon, 
    Layout, 
    Megaphone, 
    Calendar,
    Globe2,
    Palette
} from 'lucide-react';

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
}

interface Props {
    offer?: Offer;
    onSuccess?: () => void;
}

export default function OfferForm({ offer, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title_ar: offer?.title_ar || '',
        title_en: offer?.title_en || '',
        description_ar: offer?.description_ar || '',
        description_en: offer?.description_en || '',
        link: offer?.link || '',
        button_text_ar: offer?.button_text_ar || '',
        button_text_en: offer?.button_text_en || '',
        type: offer?.type || 'banner',
        is_active: offer?.is_active ?? true,
        starts_at: offer?.starts_at ? new Date(offer.starts_at).toISOString().slice(0, 16) : '',
        ends_at: offer?.ends_at ? new Date(offer.ends_at).toISOString().slice(0, 16) : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (offer) {
            put(route('admin.offers.update', offer.id), {
                onSuccess: () => onSuccess?.(),
            });
        } else {
            post(route('admin.offers.store'), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Titles */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Globe2 className="w-3 h-3" /> English Title
                        </Label>
                        <Input 
                            value={data.title_en} 
                            onChange={e => setData('title_en', e.target.value)} 
                            placeholder="e.g. 20% Discount on Lab Equipment"
                            className="rounded-2xl h-12 border-slate-200 font-bold"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Globe2 className="w-3 h-3" /> Arabic Title
                        </Label>
                        <Input 
                            value={data.title_ar} 
                            onChange={e => setData('title_ar', e.target.value)} 
                            placeholder="مثال: خصم ٢٠٪ على معدات المختبرات"
                            className="rounded-2xl h-12 border-slate-200 font-bold text-right"
                            dir="rtl"
                            required
                        />
                    </div>
                </div>

                {/* Display Type */}
                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Promotion Style</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.type === 'banner' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-200'}`}>
                            <input type="radio" className="hidden" checked={data.type === 'banner'} onChange={() => setData('type', 'banner')} />
                            <Layout className="w-8 h-8 mb-2" />
                            <span className="text-xs font-black uppercase tracking-widest">Top Banner</span>
                        </label>
                        <label className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.type === 'popup' ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-slate-100 hover:border-slate-200'}`}>
                            <input type="radio" className="hidden" checked={data.type === 'popup'} onChange={() => setData('type', 'popup')} />
                            <Megaphone className="w-8 h-8 mb-2" />
                            <span className="text-xs font-black uppercase tracking-widest">Center Popup</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Descriptions */}
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">English Description</Label>
                    <Textarea 
                        value={data.description_en} 
                        onChange={e => setData('description_en', e.target.value)} 
                        placeholder="Detail your offer here..."
                        className="rounded-3xl min-h-[120px] border-slate-200 p-6 resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right block">وصف العرض (عربي)</Label>
                    <Textarea 
                        value={data.description_ar} 
                        onChange={e => setData('description_ar', e.target.value)} 
                        placeholder="اكتب تفاصيل العرض هنا..."
                        className="rounded-3xl min-h-[120px] border-slate-200 p-6 resize-none text-right"
                        dir="rtl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Link & Button */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call to Action Link</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <Input 
                                value={data.link} 
                                onChange={e => setData('link', e.target.value)} 
                                placeholder="https://..."
                                className="pl-12 rounded-2xl h-12 border-slate-200"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Button Text (EN)</Label>
                            <Input 
                                value={data.button_text_en} 
                                onChange={e => setData('button_text_en', e.target.value)} 
                                placeholder="e.g. Shop Now"
                                className="rounded-2xl h-12 border-slate-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right block">نص الزر (AR)</Label>
                            <Input 
                                value={data.button_text_ar} 
                                onChange={e => setData('button_text_ar', e.target.value)} 
                                placeholder="مثال: تسوق الآن"
                                className="rounded-2xl h-12 border-slate-200 text-right"
                                dir="rtl"
                            />
                        </div>
                    </div>
                </div>

                {/* Scheduling */}
                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Schedule</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Starts At</Label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                                <Input 
                                    type="datetime-local"
                                    value={data.starts_at} 
                                    onChange={e => setData('starts_at', e.target.value)} 
                                    onClick={(e) => (e.target as any).showPicker?.()}
                                    className="pl-12 rounded-2xl h-12 border-slate-200 text-xs font-bold relative z-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Ends At</Label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                                <Input 
                                    type="datetime-local"
                                    value={data.ends_at} 
                                    onChange={e => setData('ends_at', e.target.value)} 
                                    onClick={(e) => (e.target as any).showPicker?.()}
                                    className="pl-12 rounded-2xl h-12 border-slate-200 text-xs font-bold relative z-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-12 h-6 rounded-full transition-all relative ${data.is_active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                        <input type="checkbox" className="hidden" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${data.is_active ? 'left-7' : 'left-1'}`} />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-900">Activate Campaign Now</span>
                </label>

                <Button 
                    type="submit" 
                    disabled={processing} 
                    className="h-16 px-12 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                    {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {offer ? 'Update Promotion' : 'Launch Promotion'}
                </Button>
            </div>
        </form>
    );
}
