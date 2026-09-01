import { Head, Link } from '@inertiajs/react';
import { Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function PendingApproval() {
    return (
        <AuthLayout 
            title="الحساب قيد المراجعة" 
            description="شكراً لتسجيلك. يتم حالياً مراجعة حسابك من قبل إدارة النظام."
        >
            <Head title="بانتظار الموافقة" />
            
            <div className="flex flex-col items-center justify-center space-y-6 py-8" dir="rtl">
                <div className="bg-amber-100 p-4 rounded-full">
                    <Clock className="h-12 w-12 text-amber-600" />
                </div>
                
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold text-foreground">طلبك قيد المعالجة</h2>
                    <p className="text-muted-foreground">
                        سيتم إشعارك فور تفعيل حسابك لتتمكن من الوصول إلى كافة خدماتنا.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-3 pt-4">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/" dir="rtl">العودة للرئيسية</Link>
                    </Button>
                    
                    <Button variant="ghost" asChild className="w-full text-destructive hover:text-destructive">
                        <Link href={route('logout')} method="post" as="button">
                            <LogOut className="ml-2 h-4 w-4" />
                            تسجيل الخروج
                        </Link>
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
