import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Settings2, Upload, X, Loader2, Save, Image as ImageIcon, Phone, Mail, MessageCircle, Globe, Facebook, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    settings: Record<string, string>;
}

export default function SettingsIndex({ settings }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        about_image: null as File | null,
        about_title_en: settings.about_title_en || '',
        about_title_ar: settings.about_title_ar || '',
        about_desc_en: settings.about_desc_en || '',
        about_desc_ar: settings.about_desc_ar || '',
        phone: settings.phone || '',
        phone_2: settings.phone_2 || '',
        whatsapp_number: settings.whatsapp_number || '',
        website: settings.website || '',
        address_en: settings.address_en || '',
        address_ar: settings.address_ar || '',
        email_info: settings.email_info || '',
        email_marketing: settings.email_marketing || '',
        email_sales: settings.email_sales || '',
        social_facebook: settings.social_facebook || '',
        social_twitter: settings.social_twitter || '',
        social_linkedin: settings.social_linkedin || '',
        social_instagram: settings.social_instagram || '',
    });

    const currentImage = settings.about_image || '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                reset('about_image');
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Site Settings" />

            <div className="max-w-5xl space-y-10 pb-20">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Settings2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Site Settings</h1>
                        <p className="text-slate-500 font-medium">Manage global site content, contact info, and social media.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* About Section Settings */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Who We Are Section</h2>
                                <p className="text-sm font-medium text-slate-400">Customize the homepage about preview section.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Image</Label>
                                <div className={`relative aspect-[4/3] rounded-[2rem] border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center bg-slate-50 ${data.about_image ? 'border-primary/40' : 'border-slate-200 hover:border-primary/20'}`}>
                                    {data.about_image ? (
                                        <>
                                            <img src={URL.createObjectURL(data.about_image)} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setData('about_image', null)}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center shadow-xl"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                id="about-image-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={e => setData('about_image', e.target.files?.[0] || null)}
                                            />
                                            <label htmlFor="about-image-upload" className="flex flex-col items-center gap-4 cursor-pointer p-10 text-center">
                                                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary">
                                                    <Upload className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-slate-900">Choose Image</p>
                                                    <p className="text-xs font-medium text-slate-400">Recommended size: 800x600px</p>
                                                </div>
                                            </label>
                                        </>
                                    )}
                                </div>
                                {errors.about_image && <p className="text-destructive text-sm font-bold">{errors.about_image}</p>}

                                {!data.about_image && currentImage && (
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Current Image</Label>
                                        <div className="rounded-2xl overflow-hidden border border-slate-200">
                                            <img src={currentImage} alt="Current about section image" className="w-full object-cover" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="about_title_en" className="text-xs font-black uppercase tracking-widest text-slate-400">Title (English)</Label>
                                    <Input
                                        id="about_title_en"
                                        value={data.about_title_en}
                                        onChange={e => setData('about_title_en', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="Terma Medical: Your Trusted Partner..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="about_title_ar" className="text-xs font-black uppercase tracking-widest text-slate-400">Title (Arabic)</Label>
                                    <Input
                                        id="about_title_ar"
                                        dir="rtl"
                                        value={data.about_title_ar}
                                        onChange={e => setData('about_title_ar', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="تيرما للمعدات الطبية: شريككم الموثوق..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="about_desc_en" className="text-xs font-black uppercase tracking-widest text-slate-400">Description (English)</Label>
                                    <Textarea
                                        id="about_desc_en"
                                        value={data.about_desc_en}
                                        onChange={e => setData('about_desc_en', e.target.value)}
                                        className="min-h-[100px] rounded-xl"
                                        placeholder="We are not just suppliers; we are strategic partners..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="about_desc_ar" className="text-xs font-black uppercase tracking-widest text-slate-400">Description (Arabic)</Label>
                                    <Textarea
                                        id="about_desc_ar"
                                        dir="rtl"
                                        value={data.about_desc_ar}
                                        onChange={e => setData('about_desc_ar', e.target.value)}
                                        className="min-h-[100px] rounded-xl"
                                        placeholder="نحن لسنا مجرد موردين، بل نحن شركاء استراتيجيون..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Settings */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Contact Information</h2>
                                <p className="text-sm font-medium text-slate-400">Phone numbers and emails used across the site.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number (Display)
                                    </Label>
                                    <Input
                                        id="phone"
                                        dir="ltr"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="+249 91 903 3303"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone_2" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number 2 (optional)
                                    </Label>
                                    <Input
                                        id="phone_2"
                                        dir="ltr"
                                        value={data.phone_2}
                                        onChange={e => setData('phone_2', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="+249 913206174"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp_number" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <MessageCircle className="w-4 h-4 inline mr-1 text-emerald-600" />
                                        WhatsApp Number (digits only)
                                    </Label>
                                    <Input
                                        id="whatsapp_number"
                                        dir="ltr"
                                        value={data.whatsapp_number}
                                        onChange={e => setData('whatsapp_number', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="249110065436"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Globe className="w-4 h-4 inline mr-1" />
                                        Website URL
                                    </Label>
                                    <Input
                                        id="website"
                                        dir="ltr"
                                        value={data.website}
                                        onChange={e => setData('website', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="https://www.bupainvest.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address_en" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Address (English)
                                    </Label>
                                    <Input
                                        id="address_en"
                                        dir="ltr"
                                        value={data.address_en}
                                        onChange={e => setData('address_en', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="Hospital Street, Port Sudan, Sudan"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address_ar" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Address (Arabic)
                                    </Label>
                                    <Input
                                        id="address_ar"
                                        dir="rtl"
                                        value={data.address_ar}
                                        onChange={e => setData('address_ar', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="شارع المستشفى، بورتسودان، السودان"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email_info" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email (Info)
                                    </Label>
                                    <Input
                                        id="email_info"
                                        dir="ltr"
                                        value={data.email_info}
                                        onChange={e => setData('email_info', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="info@termamed.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email_marketing" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email (Marketing)
                                    </Label>
                                    <Input
                                        id="email_marketing"
                                        dir="ltr"
                                        value={data.email_marketing}
                                        onChange={e => setData('email_marketing', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="markting@termamed.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email_sales" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email (Sales)
                                    </Label>
                                    <Input
                                        id="email_sales"
                                        dir="ltr"
                                        value={data.email_sales}
                                        onChange={e => setData('email_sales', e.target.value)}
                                        className="h-12 rounded-xl"
                                        placeholder="sales@terma-medical.com"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Settings */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Social Media Links</h2>
                                <p className="text-sm font-medium text-slate-400">Set your social media profile URLs. Leave empty to hide the icon.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="social_facebook" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    <Facebook className="w-4 h-4 inline mr-1 text-blue-600" />
                                    Facebook URL
                                </Label>
                                <Input
                                    id="social_facebook"
                                    dir="ltr"
                                    value={data.social_facebook}
                                    onChange={e => setData('social_facebook', e.target.value)}
                                    className="h-12 rounded-xl"
                                    placeholder="https://facebook.com/termamed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="social_twitter" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    <Twitter className="w-4 h-4 inline mr-1 text-sky-500" />
                                    Twitter / X URL
                                </Label>
                                <Input
                                    id="social_twitter"
                                    dir="ltr"
                                    value={data.social_twitter}
                                    onChange={e => setData('social_twitter', e.target.value)}
                                    className="h-12 rounded-xl"
                                    placeholder="https://twitter.com/termamed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="social_linkedin" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    <Linkedin className="w-4 h-4 inline mr-1 text-blue-700" />
                                    LinkedIn URL
                                </Label>
                                <Input
                                    id="social_linkedin"
                                    dir="ltr"
                                    value={data.social_linkedin}
                                    onChange={e => setData('social_linkedin', e.target.value)}
                                    className="h-12 rounded-xl"
                                    placeholder="https://linkedin.com/company/termamed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="social_instagram" className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    <Instagram className="w-4 h-4 inline mr-1 text-pink-600" />
                                    Instagram URL
                                </Label>
                                <Input
                                    id="social_instagram"
                                    dir="ltr"
                                    value={data.social_instagram}
                                    onChange={e => setData('social_instagram', e.target.value)}
                                    className="h-12 rounded-xl"
                                    placeholder="https://instagram.com/termamed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="h-14 px-12 rounded-2xl font-black text-lg bg-primary shadow-xl shadow-primary/20">
                            {processing && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                            <Save className="w-5 h-5 mr-2" />
                            Save Settings
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
