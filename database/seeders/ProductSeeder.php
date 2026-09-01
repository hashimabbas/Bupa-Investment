<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Department;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name_en' => 'Digital X-Ray System',
                'name_ar' => 'جهاز الأشعة السينية الرقمي',
                'department' => ['en' => 'Radiology', 'ar' => 'الأشعة'],
                'description_en' => 'High-definition imaging system providing clear images with minimal radiation dose.',
                'description_ar' => 'نظام تصوير عالي الدقة يوفر صوراً واضحة بأقل جرعة إشعاعية.',
                'image' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
                'specs_en' => ['4K Resolution', 'Smart Processing'],
                'specs_ar' => ['دقة ٤ كيه', 'معالجة ذكية'],
                'sort_order' => 1,
            ],
            [
                'name_en' => 'Hydraulic Operating Table',
                'name_ar' => 'طاولة عمليات هيدروليكية',
                'department' => ['en' => 'Operating Rooms', 'ar' => 'غرف العمليات'],
                'description_en' => 'Flexible table supporting various surgical positions with full control.',
                'description_ar' => 'طاولة مرنة تدعم مختلف الوضعيات الجراحية مع تحكم كامل.',
                'image' => 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
                'specs_en' => ['300kg Capacity', 'Wireless Control'],
                'specs_ar' => ['حمولة ٣٠٠ كجم', 'تحكم لاسلكي'],
                'sort_order' => 2,
            ],
            [
                'name_en' => 'Advanced ICU Bed',
                'name_ar' => 'سرير عناية مركزة متطور',
                'department' => ['en' => 'Medical Furniture', 'ar' => 'الأثاث الطبي'],
                'description_en' => 'Integrated bed providing maximum patient comfort and ease of handling for nursing.',
                'description_ar' => 'سرير متكامل يوفر الراحة القصوى للمريض وسهولة التعامل للتمريض.',
                'image' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=800',
                'specs_en' => ['Integrated Scale', 'Exit Assistant'],
                'specs_ar' => ['وزن مدمج', 'مساعد نهوض'],
                'sort_order' => 3,
            ],
            [
                'name_en' => 'Biochemistry Analyzer',
                'name_ar' => 'محلل كيمياء حيوية',
                'department' => ['en' => 'Laboratory', 'ar' => 'المختبرات'],
                'description_en' => 'Fast and accurate analytical device for various biological samples.',
                'description_ar' => 'جهاز تحليلي سريع ودقيق للعينات البيولوجية المختلفة.',
                'image' => 'https://images.unsplash.com/photo-1579154236604-cd4681758675?auto=format&fit=crop&q=80&w=800',
                'specs_en' => ['400 test/hr', 'Self Maintenance'],
                'specs_ar' => ['٤٠٠ اختبار/ساعة', 'صيانة ذاتية'],
                'sort_order' => 4,
            ],
        ];

        foreach ($products as $pData) {
            $deptInfo = $pData['department'];
            unset($pData['department']);

            $department = Department::firstOrCreate(
                ['name_en' => $deptInfo['en']],
                ['name_ar' => $deptInfo['ar']]
            );

            $pData['department_id'] = $department->id;
            Product::create($pData);
        }
    }
}
