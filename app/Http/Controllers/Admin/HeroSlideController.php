<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HeroSlideController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/hero-slides/index', [
            'slides' => HeroSlide::orderBy('sort_order')->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|max:10240',
            'title_ar' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle_ar' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $path = $request->file('image')->store('hero-slides', 'public');
        
        $lastOrder = HeroSlide::max('sort_order') ?? -1;

        HeroSlide::create([
            'image_path' => Storage::url($path),
            'title_ar' => $validated['title_ar'] ?? null,
            'title_en' => $validated['title_en'] ?? null,
            'subtitle_ar' => $validated['subtitle_ar'] ?? null,
            'subtitle_en' => $validated['subtitle_en'] ?? null,
            'sort_order' => $lastOrder + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Slide added successfully.');
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|max:10240',
            'title_ar' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle_ar' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            try {
                if (str_contains($heroSlide->image_path, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $heroSlide->image_path);
                    Storage::disk('public')->delete($oldPath);
                }
            } catch (\Exception $e) {}

            $path = $request->file('image')->store('hero-slides', 'public');
            $heroSlide->image_path = Storage::url($path);
        }

        $heroSlide->update(array_filter([
            'title_ar' => $validated['title_ar'] ?? $heroSlide->title_ar,
            'title_en' => $validated['title_en'] ?? $heroSlide->title_en,
            'subtitle_ar' => $validated['subtitle_ar'] ?? $heroSlide->subtitle_ar,
            'subtitle_en' => $validated['subtitle_en'] ?? $heroSlide->subtitle_en,
            'is_active' => $request->boolean('is_active', $heroSlide->is_active),
            'sort_order' => $validated['sort_order'] ?? $heroSlide->sort_order,
        ]));

        return back()->with('success', 'Slide updated successfully.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        try {
            if (str_contains($heroSlide->image_path, '/storage/')) {
                $path = str_replace('/storage/', '', $heroSlide->image_path);
                Storage::disk('public')->delete($path);
            }
        } catch (\Exception $e) {}
        
        $heroSlide->delete();

        return back()->with('success', 'Slide deleted successfully.');
    }

    public function toggleStatus(HeroSlide $heroSlide)
    {
        $heroSlide->update(['is_active' => !$heroSlide->is_active]);
        return back()->with('success', 'Status updated.');
    }
}
