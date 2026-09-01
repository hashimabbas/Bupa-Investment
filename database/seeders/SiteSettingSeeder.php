<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'about_title_en' => 'A Fresh Start, Built on Trust.',
            'about_title_ar' => 'بداية جديدة، قائمة على الثقة.',
            'about_desc_en' => 'Bupa Investment is a new medical supplies company, founded to bring quality-first, dependable service to Sudan\'s healthcare sector — one client at a time.',
            'about_desc_ar' => 'بوبا للاستثمار شركة توريدات طبية ناشئة، تأسست لتقديم خدمة موثوقة تضع الجودة أولاً لقطاع الرعاية الصحية في السودان، عميلاً تلو الآخر.',
            'phone' => '+249 110065436',
            'phone_2' => '+249 913206174',
            'whatsapp_number' => '249110065436',
            'website' => 'https://www.bupainvest.com',
            'address_en' => 'Hospital Street, Port Sudan, Sudan',
            'address_ar' => 'شارع المستشفى، بورتسودان، السودان',
            'email_info' => 'info@bupainvest.com',
            'email_marketing' => '',
            'email_sales' => '',
            'social_facebook' => '#',
            'social_twitter' => '#',
            'social_linkedin' => '#',
            'social_instagram' => '#',
        ];

        foreach ($defaults as $key => $value) {
            SiteSetting::firstOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
