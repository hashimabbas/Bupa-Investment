<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'type' => 'service',
                'title_en' => 'Fast-Response Biomedical Maintenance',
                'title_ar' => 'صيانة حيوية فائقة الاستجابة',
                'description_en' => 'Minimize downtime for critical devices through preventative maintenance contracts and immediate repair solutions that ensure medical service continuity.',
                'description_ar' => 'تقليل زمن توقف الأجهزة الحرجة من خلال عقود صيانة وقائية وحلول إصلاح فورية تضمن استمرارية خدماتكم الطبية.',
                'color' => 'bg-emerald-50',
                'sort_order' => 1,
            ],
            [
                'type' => 'solution',
                'title_en' => 'Healthcare Facility Planning & Fit-out',
                'title_ar' => 'تخطيط وتجهيز المنشآت الطبية',
                'description_en' => 'Transform empty spaces into integrated medical units (Labs, ORs, Radiology) with global engineering standards ensuring optimal workflow.',
                'description_ar' => 'تحويل المساحات الفارغة إلى وحدات طبية متكاملة (مختبرات، غرف عمليات، أشعة) بمعايير هندسية عالمية تضمن انسيابية العمل.',
                'color' => 'bg-blue-50',
                'sort_order' => 2,
            ],
            [
                'type' => 'service',
                'title_en' => 'Quality Management & Accreditation Support',
                'title_ar' => 'إدارة الجودة والاعتماد الطبي',
                'description_en' => 'We help your facility achieve international accreditation through precise tool calibration and strict adherence to quality and safety standards.',
                'description_ar' => 'نساعد منشأتكم في الحصول على الاعتمادات الدولية من خلال معايرة الأدوات والالتزام الصارم بمعايير الجودة والسلامة.',
                'color' => 'bg-amber-50',
                'sort_order' => 3,
            ],
            [
                'type' => 'service',
                'title_en' => 'Technical & Clinical Staff Training',
                'title_ar' => 'تدريب الكوادر الفنية والطبية',
                'description_en' => 'Empower your team to optimally use modern technologies, reducing operational errors and extending the lifespan of equipment.',
                'description_ar' => 'تمكين فريقكم من الاستخدام الأمثل للتقنيات الحديثة، مما يقلل من أخطاء التشغيل ويطيل العمر الافتراضي للمعدات.',
                'color' => 'bg-purple-50',
                'sort_order' => 4,
            ],
            [
                'type' => 'service',
                'title_en' => 'Proactive 24/7 Technical Support',
                'title_ar' => 'دعم فني استباقي على مدار الساعة',
                'description_en' => 'An engineering team ready for immediate intervention, resolving technical issues before they affect the patient journey or department performance.',
                'description_ar' => 'فريق هندسي جاهز للتدخل الفوري وحل المشكلات التقنية قبل أن تؤثر على رحلة المريض أو أداء القسم.',
                'color' => 'bg-sky-50',
                'sort_order' => 5,
            ],
            [
                'type' => 'service',
                'title_en' => 'Supply Chain Management (Reagents & Consumables)',
                'title_ar' => 'توريد المستهلكات والمحاليل الطبية',
                'description_en' => 'Ensuring regular availability of medical reagents and consumables to avoid scan or surgery stoppages due to stock shortages.',
                'description_ar' => 'ضمان توفر المستهلكات والمحاليل الطبية بانتظام، لتجنب توقف الفحوصات أو العمليات الجراحية بسبب نقص المخزون.',
                'color' => 'bg-rose-50',
                'sort_order' => 6,
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
