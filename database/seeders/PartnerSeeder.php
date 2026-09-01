<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            [
                'name' => 'GE Healthcare',
                'desc_en' => 'A global leader in medical imaging technology and digital solutions.',
                'desc_ar' => 'رائد عالمي في تكنولوجيا التصوير الطبي والحلول الرقمية.',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f0/GE_Healthcare_logo.svg',
                'website_url' => 'https://www.gehealthcare.com',
                'specialties_en' => ['Radiology', 'Maternal Care'],
                'specialties_ar' => ['الأشعة', 'رعاية الأمومة'],
                'sort_order' => 1,
            ],
            [
                'name' => 'Siemens Healthineers',
                'desc_en' => 'Providing cutting-edge innovations in laboratory diagnostics and molecular imaging.',
                'desc_ar' => 'تقدم ابتكارات متطورة في مجال التشخيص المخبري والتصوير الجزيئي.',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Siemens_Healthineers_logo.svg',
                'website_url' => 'https://www.siemens-healthineers.com',
                'specialties_en' => ['Laboratory', 'Radiation Therapy'],
                'specialties_ar' => ['المختبرات', 'العلاج الإشعاعي'],
                'sort_order' => 2,
            ],
            [
                'name' => 'Philips',
                'desc_en' => 'Integrated health solutions focused on improving lives through meaningful innovation.',
                'desc_ar' => 'حلول صحية متكاملة تركز على تحسين حياة الناس من خلال الابتكار الهادف.',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/5/53/Philips_logo_new.svg',
                'website_url' => 'https://www.philips.com',
                'specialties_en' => ['ICU', 'Ultrasound'],
                'specialties_ar' => ['العناية المركزة', 'الموجات فوق الصوتية'],
                'sort_order' => 3,
            ],
            [
                'name' => 'Medtronic',
                'desc_en' => 'Specializing in surgical medical devices and advanced therapeutic solutions.',
                'desc_ar' => 'متخصصة في الأجهزة الطبية الجراحية والحلول العلاجية المتقدمة.',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/41/Medtronic_logo.svg',
                'website_url' => 'https://www.medtronic.com',
                'specialties_en' => ['Surgical', 'Diabetes'],
                'specialties_ar' => ['الجراحة', 'السكري'],
                'sort_order' => 4,
            ],
        ];

        foreach ($partners as $partner) {
            \App\Models\Partner::create($partner);
        }
    }
}
