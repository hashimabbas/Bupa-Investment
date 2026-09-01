<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::pluck('value', 'key')->toArray();

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $textFields = [
            'about_title_en', 'about_title_ar',
            'about_desc_en', 'about_desc_ar',
            'phone', 'phone_2', 'whatsapp_number', 'website',
            'address_en', 'address_ar',
            'email_info', 'email_marketing', 'email_sales',
            'social_facebook', 'social_twitter', 'social_linkedin', 'social_instagram',
            'social_youtube',
        ];

        $rules = [];
        foreach ($textFields as $field) {
            $rules[$field] = 'nullable|string|max:500';
        }
        $rules['about_image'] = 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120';

        $validated = $request->validate($rules);

        foreach ($textFields as $field) {
            if ($request->has($field)) {
                SiteSetting::updateOrCreate(
                    ['key' => $field],
                    ['value' => $validated[$field] ?? '']
                );
            }
        }

        if ($request->hasFile('about_image')) {
            $old = SiteSetting::where('key', 'about_image')->value('value');
            if ($old && str_contains($old, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $old);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('about_image')->store('settings', 'public');
            SiteSetting::updateOrCreate(
                ['key' => 'about_image'],
                ['value' => Storage::url($path)]
            );
        }

        return back()->with('success', 'Settings updated successfully.');
    }
}
