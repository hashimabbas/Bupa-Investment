import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Image as ImageIcon, 
    Upload, 
    Trash2, 
    Plus,
    Loader2,
    Eye,
    EyeOff,
    X,
    Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
    id: number;
    image_path: string;
    title_ar: string | null;
    title_en: string | null;
    subtitle_ar: string | null;
    subtitle_en: string | null;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    slides: HeroSlide[];
}

export default function HeroSlidesIndex({ slides }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null as File | null,
        title_ar: '',
        title_en: '',
        subtitle_ar: '',
        subtitle_en: '',
        is_active: true,
    });

    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.hero-slides.store'), {
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
            forceFormData: true,
        });
    };

    const deleteSlide = (id: number) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            router.delete(route('admin.hero-slides.destroy', id));
        }
    };

    const toggleStatus = (id: number) => {
        router.post(route('admin.hero-slides.toggle-status', id));
    };

    return (
        <AdminLayout>
            <Head title="Hero Slider Management" />

            <div className="space-y-10 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Hero Slider</h1>
                        <p className="text-slate-500 font-medium">Manage the main carousel images and text on your homepage.</p>
                    </div>
                    
                    <Button 
                        onClick={() => setIsAdding(!isAdding)}
                        className={`h-14 px-8 rounded-2xl font-black gap-3 shadow-xl transition-all ${isAdding ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' : 'bg-primary text-white shadow-primary/20'}`}
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {isAdding ? 'Cancel' : 'Add New Slide'}
                    </Button>
                </div>

                <AnimatePresence>
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Image Upload Area */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Slide Image</Label>
                                        <div className={`relative aspect-video rounded-[2rem] border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center bg-slate-50 ${data.image ? 'border-primary/40' : 'border-slate-200 hover:border-primary/20'}`}>
                                            {data.image ? (
                                                <>
                                                    <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('image', null)}
                                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center shadow-xl"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <input 
                                                        type="file" 
                                                        id="slide-upload"
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={e => setData('image', e.target.files?.[0] || null)}
                                                    />
                                                    <label htmlFor="slide-upload" className="flex flex-col items-center gap-4 cursor-pointer p-10 text-center">
                                                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary">
                                                            <Upload className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-base font-black text-slate-900">Choose Hero Image</p>
                                                            <p className="text-xs font-medium text-slate-400">Recommended size: 1920x1080px</p>
                                                        </div>
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-destructive text-sm font-bold">{errors.image}</p>}
                                    </div>

                                    {/* Text Fields */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title_ar" className="text-xs font-black uppercase tracking-widest text-slate-400">Title (Arabic)</Label>
                                                <Input 
                                                    id="title_ar"
                                                    dir="rtl"
                                                    value={data.title_ar}
                                                    onChange={e => setData('title_ar', e.target.value)}
                                                    className="h-12 rounded-xl"
                                                    placeholder="العنوان بالعربية..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="title_en" className="text-xs font-black uppercase tracking-widest text-slate-400">Title (English)</Label>
                                                <Input 
                                                    id="title_en"
                                                    value={data.title_en}
                                                    onChange={e => setData('title_en', e.target.value)}
                                                    className="h-12 rounded-xl"
                                                    placeholder="Title in English..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="subtitle_ar" className="text-xs font-black uppercase tracking-widest text-slate-400">Subtitle (Arabic)</Label>
                                                <Textarea 
                                                    id="subtitle_ar"
                                                    dir="rtl"
                                                    value={data.subtitle_ar}
                                                    onChange={e => setData('subtitle_ar', e.target.value)}
                                                    className="min-h-[100px] rounded-xl"
                                                    placeholder="الوصف بالعربية..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subtitle_en" className="text-xs font-black uppercase tracking-widest text-slate-400">Subtitle (English)</Label>
                                                <Textarea 
                                                    id="subtitle_en"
                                                    value={data.subtitle_en}
                                                    onChange={e => setData('subtitle_en', e.target.value)}
                                                    className="min-h-[100px] rounded-xl"
                                                    placeholder="Description in English..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <Button type="submit" disabled={processing || !data.image} className="h-14 px-12 rounded-2xl font-black text-lg bg-primary shadow-xl shadow-primary/20">
                                        {processing && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                                        Add Slide to Gallery
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {slides.map((slide, index) => (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative bg-white rounded-[2.5rem] border overflow-hidden transition-all duration-500 hover:shadow-2xl ${!slide.is_active ? 'border-slate-100 grayscale' : 'border-slate-200'}`}
                        >
                            <div className="aspect-video overflow-hidden relative">
                                <img src={slide.image_path} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="space-y-1">
                                        <p className="text-white font-black text-xl">{slide.title_en || 'Default Hero Title'}</p>
                                        <p className="text-white/60 text-xs font-medium line-clamp-2">{slide.subtitle_en || 'Default hero subtitle text will be shown here...'}</p>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 flex gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        onClick={() => deleteSlide(slide.id)}
                                        className="h-10 w-10 rounded-xl shadow-xl"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant={slide.is_active ? 'default' : 'secondary'}
                                        size="icon" 
                                        onClick={() => toggleStatus(slide.id)}
                                        className={`h-10 w-10 rounded-xl shadow-xl ${slide.is_active ? 'bg-white text-slate-900 hover:bg-slate-100' : ''}`}
                                    >
                                        {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                        <ImageIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Position</p>
                                        <p className="text-sm font-black text-slate-900"># {slide.sort_order}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {!slide.is_active && (
                                        <span className="px-3 py-1 rounded-full bg-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">Hidden</span>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slide.is_active ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                        {slide.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {slides.length === 0 && (
                    <div className="py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-200 mx-auto mb-6">
                            <ImageIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-400">The slider is empty</h3>
                        <p className="text-slate-400 font-medium">Add some high-quality images to welcome your website visitors.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
