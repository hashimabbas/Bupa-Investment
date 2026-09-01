<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ImportProductsSeeder extends Seeder
{
    public function run()
    {
        // 1. Departments Data
        $departmentsData = [
            ['100 tests for CLIA System', 'نظام CLIA (100 اختبار)'],
            ['50 tests for CLIA System', 'نظام CLIA (50 اختبار)'],
            ['Control', 'ضبط الجودة'],
            ['Biochemistry &  Electrolyte', 'الكيمياء الحيوية والكهارل'],
            ['Biossays C8', 'Biossays C8'],
            ['Biolumi CX8', 'Biolumi CX8'],
            ['Molecular Diagnostics', 'التشخيص الجزيئي'],
            ['Rapid Test Kit', 'اختبارات سريعة'],
            ['THYROID', 'الغدة الدرقية'],
            ['FERTILITY', 'الخصوبة'],
            ['PRENATAL SCREENING', 'فحوصات ما قبل الولادة'],
            ['TUMOR MARKER', 'مؤشرات الأورام'],
            ['GLYCO  METABOLISM', 'التمثيل الغذائي للسكر'],
            ['INFLAMMATION MONITORING', 'مراقبة الالتهاب'],
            ['BONE METABOLISM', 'استقلاب العظام'],
            ['ANEMIA', 'فقر الدم'],
            ['CARDIAC', 'القلب'],
            ['KIDNEY FUNCTION', 'وظائف الكلى'],
            ['HEPATIC FIBROSIS', 'تليف الكبد'],
            ['IMMUNOGLOBULIN', 'الغلوبولينات المناعية'],
            ['DRUG SUPERVISOR DETECTION', 'مراقبة الأدوية'],
            ['INFECTIOUS', 'الأمراض المعدية'],
            ['TORCH', 'تورچ TORCH'],
            ['EBV', 'فيروس إبشتاين بار (EBV)'],
            ['CONSUMABLES For M Series', 'مستهلكات سلسلة M'],
            ['CONSUMABLES For X Series', 'مستهلكات سلسلة X'],
            ['CONSUMABLES', 'مستهلكات'],
            ['Sample Diluent', 'مخفف العينة'],
            ['ANALYZER', 'أجهزة التحليل'],
            ['Caridac', 'القلب (Biochemistry)'],
            ['Diabetes', 'السكري'],
            ['Hepatic', 'الكبد'],
            ['Inorganic Ion', 'الأيونات غير العضوية'],
            ['Lipids', 'الدهون'],
            ['Renal', 'الكلى'],
            ['Immune', 'المناعة'],
            ['Anemia', 'فقر الدم (Biochemistry)'],
            ['Inflamation', 'الالتهاب'],
            ['Rheumatism', 'الروماتيزم'],
            ['Pancreatic', 'البنكرياس'],
            ['Calibration', 'المعايرة'],
            ['Electrode', 'الأقطاب'],
            ['Molecision Fully-auto Nucleic Acid Purification System', 'تنقية الأحماض النووية (Molecision)'],
            ['Reagent', 'كواشف'],
            ['Autoimmune', 'المناعة الذاتية'],
            ['OTHERS', 'أخرى'], // Added because it's referenced in products
        ];

        $deptMap = [];
        foreach ($departmentsData as $item) {
            $dept = Department::updateOrCreate(
                ['name_en' => $item[0]],
                ['name_ar' => $item[1]]
            );
            $deptMap[$item[0]] = $dept->id;
        }

        // 2. Products Data
        $productsRaw = [
            ['MAGLUMI 1000', 'MAGLUMI 1000', '100 tests for CLIA System', 'Cat No: 23020009', 'Cat No: 23020009', true, 1, '{"cat_no":"23020009","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 2000', 'MAGLUMI 2000', '100 tests for CLIA System', 'Cat No: 23020006', 'Cat No: 23020006', true, 2, '{"cat_no":"23020006","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 2000 Plus', 'MAGLUMI 2000 Plus', '100 tests for CLIA System', 'Cat No: 23020007', 'Cat No: 23020007', true, 3, '{"cat_no":"23020007","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 600', 'MAGLUMI 600', '100 tests for CLIA System', 'Cat No: 23020018', 'Cat No: 23020018', true, 4, '{"cat_no":"23020018","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 800', 'MAGLUMI 800', '100 tests for CLIA System', 'Cat No: 23020003', 'Cat No: 23020003', true, 5, '{"cat_no":"23020003","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 4000 Plus', 'MAGLUMI 4000 Plus', '100 tests for CLIA System', 'Cat No: 23020037', 'Cat No: 23020037', true, 6, '{"cat_no":"23020037","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI X8', 'MAGLUMI X8', '100 tests for CLIA System', 'Cat No: 010101008801', 'Cat No: 010101008801', true, 7, '{"cat_no":"010101008801","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI X3', 'MAGLUMI X3', '100 tests for CLIA System', 'Cat No: 010101003301', 'Cat No: 010101003301', true, 8, '{"cat_no":"010101003301","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI X6', 'MAGLUMI X6', '100 tests for CLIA System', 'Cat No: 010101006601', 'Cat No: 010101006601', true, 9, '{"cat_no":"010101006601","source_sheet":"100 tests for CLIA System"}'],
            ['Decapper Module (Model:SPS04)', 'Decapper Module (Model:SPS04)', '100 tests for CLIA System', 'Cat No: 010103000801', 'Cat No: 010103000801', true, 10, '{"cat_no":"010103000801","source_sheet":"100 tests for CLIA System"}'],
            ['Preaccu for Prenatal Screening', 'Preaccu for Prenatal Screening', '100 tests for CLIA System', 'Cat No: 22010315', 'Cat No: 22010315', true, 11, '{"cat_no":"22010315","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI TSH(CLIA)', 'MAGLUMI TSH(CLIA)', 'THYROID', 'Spec: 100TESTS/KIT | Cat No: 130203001M | Order Qty: 200', 'Spec: 100TESTS/KIT | Cat No: 130203001M | Order Qty: 200', true, 12, '{"spec":"100TESTS/KIT","cat_no":"130203001M","order_qty":"200","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI T4(CLIA)', 'MAGLUMI T4(CLIA)', 'THYROID', 'Spec: 100TESTS/KIT | Cat No: 130203002M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130203002M | Order Qty: 100', true, 13, '{"spec":"100TESTS/KIT","cat_no":"130203002M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI T3(CLIA)', 'MAGLUMI T3(CLIA)', 'THYROID', 'Spec: 100TESTS/KIT | Cat No: 130203003M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130203003M | Order Qty: 100', true, 14, '{"spec":"100TESTS/KIT","cat_no":"130203003M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI FT4(CLIA)', 'MAGLUMI FT4(CLIA)', 'THYROID', 'Spec: 100TESTS/KIT | Cat No: 130203004M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130203004M | Order Qty: 100', true, 15, '{"spec":"100TESTS/KIT","cat_no":"130203004M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI FT3(CLIA)', 'MAGLUMI FT3(CLIA)', 'THYROID', 'Spec: 100TESTS/KIT | Cat No: 130203005M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130203005M | Order Qty: 100', true, 16, '{"spec":"100TESTS/KIT","cat_no":"130203005M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI FSH(CLIA)', 'MAGLUMI FSH(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202001M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130202001M | Order Qty: 100', true, 17, '{"spec":"100TESTS/KIT","cat_no":"130202001M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI LH(CLIA)', 'MAGLUMI LH(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202002M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130202002M | Order Qty: 100', true, 18, '{"spec":"100TESTS/KIT","cat_no":"130202002M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI HCG/β-HCG(CLIA)', 'MAGLUMI HCG/β-HCG(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202003M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130202003M | Order Qty: 20', true, 19, '{"spec":"100TESTS/KIT","cat_no":"130202003M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI PRL(CLIA)', 'MAGLUMI PRL(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202006M | Order Qty: 100', 'Spec: 100TESTS/KIT | Cat No: 130202006M | Order Qty: 100', true, 20, '{"spec":"100TESTS/KIT","cat_no":"130202006M","order_qty":"100","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Estradiol (CLIA)', 'MAGLUMI Estradiol (CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202007M | Order Qty: 15', 'Spec: 100TESTS/KIT | Cat No: 130202007M | Order Qty: 15', true, 21, '{"spec":"100TESTS/KIT","cat_no":"130202007M","order_qty":"15","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI PRG(CLIA)', 'MAGLUMI PRG(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202009M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130202009M | Order Qty: 10', true, 22, '{"spec":"100TESTS/KIT","cat_no":"130202009M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Testosterone (CLIA)', 'MAGLUMI Testosterone (CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202010M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130202010M | Order Qty: 10', true, 23, '{"spec":"100TESTS/KIT","cat_no":"130202010M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI AMH(CLIA)', 'MAGLUMI AMH(CLIA)', 'FERTILITY', 'Spec: 100TESTS/KIT | Cat No: 130202014M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130202014M | Order Qty: 10', true, 24, '{"spec":"100TESTS/KIT","cat_no":"130202014M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Ferritin(CLIA)', 'MAGLUMI Ferritin(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201001M | Order Qty: 50', 'Spec: 100TESTS/KIT | Cat No: 130201001M | Order Qty: 50', true, 25, '{"spec":"100TESTS/KIT","cat_no":"130201001M","order_qty":"50","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI AFP(CLIA)', 'MAGLUMI AFP(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201002M | Order Qty: 30', 'Spec: 100TESTS/KIT | Cat No: 130201002M | Order Qty: 30', true, 26, '{"spec":"100TESTS/KIT","cat_no":"130201002M","order_qty":"30","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI CEA(CLIA)', 'MAGLUMI CEA(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201003M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130201003M | Order Qty: 10', true, 27, '{"spec":"100TESTS/KIT","cat_no":"130201003M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Total PSA(CLIA)', 'MAGLUMI Total PSA(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201004M | Order Qty: 30', 'Spec: 100TESTS/KIT | Cat No: 130201004M | Order Qty: 30', true, 28, '{"spec":"100TESTS/KIT","cat_no":"130201004M","order_qty":"30","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI f-PSA(CLIA)', 'MAGLUMI f-PSA(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201005M | Order Qty: 5', 'Spec: 100TESTS/KIT | Cat No: 130201005M | Order Qty: 5', true, 29, '{"spec":"100TESTS/KIT","cat_no":"130201005M","order_qty":"5","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI CA 125(CLIA)', 'MAGLUMI CA 125(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201009M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130201009M | Order Qty: 20', true, 30, '{"spec":"100TESTS/KIT","cat_no":"130201009M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI CA 15-3(CLIA)', 'MAGLUMI CA 15-3(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201010M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130201010M | Order Qty: 20', true, 31, '{"spec":"100TESTS/KIT","cat_no":"130201010M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI CA 19-9(CLIA)', 'MAGLUMI CA 19-9(CLIA)', 'TUMOR MARKER', 'Spec: 100TESTS/KIT | Cat No: 130201011M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130201011M | Order Qty: 20', true, 32, '{"spec":"100TESTS/KIT","cat_no":"130201011M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI C-Peptide(CLIA)', 'MAGLUMI C-Peptide(CLIA)', 'GLYCO  METABOLISM', 'Spec: 100TESTS/KIT | Cat No: 130205001M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130205001M | Order Qty: 10', true, 33, '{"spec":"100TESTS/KIT","cat_no":"130205001M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Insulin(CLIA)', 'MAGLUMI Insulin(CLIA)', 'GLYCO  METABOLISM', 'Spec: 100TESTS/KIT | Cat No: 130205002M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130205002M | Order Qty: 10', true, 34, '{"spec":"100TESTS/KIT","cat_no":"130205002M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI GH(CLIA)', 'MAGLUMI GH(CLIA)', 'OTHERS', 'Spec: 100TESTS/KIT | Cat No: 130298001M | Order Qty: 2', 'Spec: 100TESTS/KIT | Cat No: 130298001M | Order Qty: 2', true, 35, '{"spec":"100TESTS/KIT","cat_no":"130298001M","order_qty":"2","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Cortisol(CLIA)', 'MAGLUMI Cortisol(CLIA)', 'OTHERS', 'Spec: 100TESTS/KIT | Cat No: 130298002M | Order Qty: 3', 'Spec: 100TESTS/KIT | Cat No: 130298002M | Order Qty: 3', true, 36, '{"spec":"100TESTS/KIT","cat_no":"130298002M","order_qty":"3","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Intact PTH(CLIA)', 'MAGLUMI Intact PTH(CLIA)', 'BONE METABOLISM', 'Spec: 100TESTS/KIT | Cat No: 130211001M | Order Qty: 15', 'Spec: 100TESTS/KIT | Cat No: 130211001M | Order Qty: 15', true, 37, '{"spec":"100TESTS/KIT","cat_no":"130211001M","order_qty":"15","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI 25-OH Vitamin D(CLIA)', 'MAGLUMI 25-OH Vitamin D(CLIA)', 'BONE METABOLISM', 'Spec: 100TESTS/KIT | Cat No: 130211004M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130211004M | Order Qty: 20', true, 38, '{"spec":"100TESTS/KIT","cat_no":"130211004M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI FA(CLIA)', 'MAGLUMI FA(CLIA)', 'ANEMIA', 'Spec: 100TESTS/KIT | Cat No: 130213001M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130213001M | Order Qty: 20', true, 39, '{"spec":"100TESTS/KIT","cat_no":"130213001M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Vitamin B12(CLIA)', 'MAGLUMI Vitamin B12(CLIA)', 'ANEMIA', 'Spec: 100TESTS/KIT | Cat No: 130213002M | Order Qty: 20', 'Spec: 100TESTS/KIT | Cat No: 130213002M | Order Qty: 20', true, 40, '{"spec":"100TESTS/KIT","cat_no":"130213002M","order_qty":"20","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Troponin I(CLIA)', 'MAGLUMI Troponin I(CLIA)', 'CARDIAC', 'Spec: 100TESTS/KIT | Cat No: 130206002M | Order Qty: 10', 'Spec: 100TESTS/KIT | Cat No: 130206002M | Order Qty: 10', true, 41, '{"spec":"100TESTS/KIT","cat_no":"130206002M","order_qty":"10","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI D-Dimer(CLIA)', 'MAGLUMI D-Dimer(CLIA)', 'CARDIAC', 'Spec: 100TESTS/KIT | Cat No: 130206008M | Order Qty: 5', 'Spec: 100TESTS/KIT | Cat No: 130206008M | Order Qty: 5', true, 42, '{"spec":"100TESTS/KIT","cat_no":"130206008M","order_qty":"5","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI HBsAg(CLIA)', 'MAGLUMI HBsAg(CLIA)', 'INFECTIOUS', 'Spec: 100TESTS/KIT | Cat No: 130210001M | Order Qty: 80', 'Spec: 100TESTS/KIT | Cat No: 130210001M | Order Qty: 80', true, 43, '{"spec":"100TESTS/KIT","cat_no":"130210001M","order_qty":"80","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Anti-HCV(CLIA)', 'MAGLUMI Anti-HCV(CLIA)', 'INFECTIOUS', 'Spec: 100TESTS/KIT | Cat No: 130210006M | Order Qty: 80', 'Spec: 100TESTS/KIT | Cat No: 130210006M | Order Qty: 80', true, 44, '{"spec":"100TESTS/KIT","cat_no":"130210006M","order_qty":"80","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Syphilis (CLIA)', 'MAGLUMI Syphilis (CLIA)', 'INFECTIOUS', 'Spec: 100TESTS/KIT | Cat No: 130219003M | Order Qty: 80', 'Spec: 100TESTS/KIT | Cat No: 130219003M | Order Qty: 80', true, 45, '{"spec":"100TESTS/KIT","cat_no":"130219003M","order_qty":"80","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI HIV Ab/Ag Combi (CLIA)', 'MAGLUMI HIV Ab/Ag Combi (CLIA)', 'INFECTIOUS', 'Spec: 100TESTS/KIT | Cat No: 130219004M | Order Qty: 80', 'Spec: 100TESTS/KIT | Cat No: 130219004M | Order Qty: 80', true, 46, '{"spec":"100TESTS/KIT","cat_no":"130219004M","order_qty":"80","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Reaction Cup (3*182cups)', 'MAGLUMI Reaction Cup (3*182cups)', 'CONSUMABLES For X Series', 'Cat No: 130105000101 | Order Qty: 100 | Notes: Apply to X8/X6/X3', 'Cat No: 130105000101 | Order Qty: 100 | Notes: Apply to X8/X6/X3', true, 47, '{"cat_no":"130105000101","order_qty":"100","notes":"Apply to X8/X6/X3","source_sheet":"100 tests for CLIA System"}'],
            ['MAGLUMI Starter 1+2 (1Box=2*1.5L)', 'MAGLUMI Starter 1+2 (1Box=2*1.5L)', 'CONSUMABLES For X Series', 'Cat No: 130299027M | Notes: Apply to X8/X6', 'Cat No: 130299027M | Notes: Apply to X8/X6', true, 48, '{"cat_no":"130299027M","notes":"Apply to X8/X6","source_sheet":"100 tests for CLIA System"}'],
            ['Nucleic Acid Extraction Kit （Standard）', 'Nucleic Acid Extraction Kit （Standard）', 'Reagent', 'Spec: 32 Isolations/kit | Cat No: 132131001HC', 'Spec: 32 Isolations/kit | Cat No: 132131001HC', true, 49, '{"spec":"32 Isolations/kit","cat_no":"132131001HC","source_sheet":"Molecular Diagnostics"}'],
            ['SARS-CoV-2 RT-PCR Assay', 'SARS-CoV-2 RT-PCR Assay', 'Reagent', 'Spec: 100TESTS/KIT | Cat No: 132101002HA', 'Spec: 100TESTS/KIT | Cat No: 132101002HA', true, 50, '{"spec":"100TESTS/KIT","cat_no":"132101002HA","source_sheet":"Molecular Diagnostics"}'],
            ['SARS-CoV-2 Antigen Rapid Test (Colloidal Gold)', 'SARS-CoV-2 Antigen Rapid Test (Colloidal Gold)', 'Rapid Test Kit', 'Spec: 50TESTS/KIT | Cat No: 134101001K04', 'Spec: 50TESTS/KIT | Cat No: 134101001K04', true, 51, '{"spec":"50TESTS/KIT","cat_no":"134101001K04","source_sheet":"Rapid Test Kit"}'],
            ['Monkeypox Virus Antigen Rapid Test (Colloidal Gold)', 'Monkeypox Virus Antigen Rapid Test (Colloidal Gold)', 'Rapid Test Kit', 'Spec: 50TESTS/KIT | Cat No: 134101008K04', 'Spec: 50TESTS/KIT | Cat No: 134101008K04', true, 52, '{"spec":"50TESTS/KIT","cat_no":"134101008K04","source_sheet":"Rapid Test Kit"}'],
        ];

        $seen = [];
        foreach ($productsRaw as $row) {
            $name_en = $row[0];
            $name_ar = $row[1] ?: $name_en;
            $dept_name = $row[2];
            $desc_en = $row[3];
            $desc_ar = $row[4] ?: $desc_en;
            $is_active = (bool)$row[5];
            $sort_order = (int)$row[6];
            $specsRaw = json_decode($row[7], true);
            $specs = [];
            if (is_array($specsRaw)) {
                foreach ($specsRaw as $key => $val) {
                    $label = ucwords(str_replace('_', ' ', $key));
                    $specs[] = "{$label}: {$val}";
                }
            }

            if (!isset($deptMap[$dept_name])) {
                $this->command->warn("Department not found: {$dept_name} for product {$name_en}");
                continue;
            }

            $dept_id = $deptMap[$dept_name];

            // De-duplicate: same (name_en + department_id)
            $key = $name_en . '|' . $dept_id;
            if (isset($seen[$key])) {
                $this->command->info("Skipping duplicate: {$name_en} in department {$dept_name}");
                continue;
            }
            $seen[$key] = true;

            Product::updateOrCreate(
                [
                    'name_en' => $name_en,
                    'department_id' => $dept_id,
                ],
                [
                    'name_ar' => $name_ar,
                    'partner_id' => null,
                    'description_en' => $desc_en,
                    'description_ar' => $desc_ar,
                    'image' => null,
                    'specs_en' => $specs,
                    'specs_ar' => $specs,
                    'is_active' => $is_active,
                    'sort_order' => $sort_order,
                ]
            );
        }
    }
}
