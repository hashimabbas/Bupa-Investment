import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

interface Customer {
    id: string;
    name: string;
    sites: { id: string; name: string }[];
}

interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    customer_id: string;
    site_id: string;
    position: string;
    password: string;
    password_confirmation: string;
}

export default function ClientRegister({ customers }: { customers: Customer[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        phone: '',
        customer_id: '',
        site_id: '',
        position: '',
        password: '',
        password_confirmation: '',
    });

    const [availableSites, setAvailableSites] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        if (data.customer_id) {
            const customer = customers.find((c) => c.id === data.customer_id);
            setAvailableSites(customer?.sites || []);
            setData('site_id', '');
        } else {
            setAvailableSites([]);
        }
    }, [data.customer_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('client.register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="إنشاء حساب عميل" description="أدخل بياناتك أدناه لإنشاء حساب جديد في النظام">
            <Head title="تسجيل عميل" />
            <form className="flex flex-col gap-6" onSubmit={submit} dir="rtl">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="الاسم الثلاثي"
                            className="text-right"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                            <Input
                                id="email"
                                type="email"
                                tabIndex={2}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="text-left"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                tabIndex={3}
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder="09xxxxxxxx"
                                className="text-left"
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="customer">المركز أو المستشفى</Label>
                            <Select
                                value={data.customer_id}
                                onValueChange={(value) => setData('customer_id', value)}
                                disabled={processing}
                            >
                                <SelectTrigger id="customer" className="text-right">
                                    <SelectValue placeholder="اختر المركز" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.customer_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="site">الموقع / القسم</Label>
                            <Select
                                value={data.site_id}
                                onValueChange={(value) => setData('site_id', value)}
                                disabled={processing || availableSites.length === 0}
                            >
                                <SelectTrigger id="site" className="text-right">
                                    <SelectValue placeholder={availableSites.length === 0 ? "اختر المركز أولاً" : "اختر الموقع"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSites.map((site) => (
                                        <SelectItem key={site.id} value={site.id}>
                                            {site.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.site_id} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="position">المنصب / المسمى الوظيفي</Label>
                        <Input
                            id="position"
                            type="text"
                            required
                            tabIndex={4}
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            disabled={processing}
                            placeholder="مثال: مدير قسم الهندسة الطبية"
                            className="text-right"
                        />
                        <InputError message={errors.position} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={5}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="********"
                                className="text-left"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">تأكيد كلمة المرور</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={6}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="********"
                                className="text-left"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={7} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        إنشاء الحساب
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    لديك حساب بالفعل؟{' '}
                    <TextLink href={route('login')} tabIndex={8}>
                        تسجيل الدخول
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
