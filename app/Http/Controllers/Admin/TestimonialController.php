<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::orderBy('sort_order')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'position_en' => 'nullable|string|max:255',
            'position_ar' => 'nullable|string|max:255',
            'company_en' => 'nullable|string|max:255',
            'company_ar' => 'nullable|string|max:255',
            'content_en' => 'required|string',
            'content_ar' => 'nullable|string',
            'avatar' => 'nullable|image|max:1024',
            'video_url' => 'nullable|url',
            'rating' => 'required|integer|min:1|max:5',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $validated['avatar'] = Storage::url($path);
        }

        Testimonial::create($validated);

        return back()->with('success', 'Testimonial created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'position_en' => 'nullable|string|max:255',
            'position_ar' => 'nullable|string|max:255',
            'company_en' => 'nullable|string|max:255',
            'company_ar' => 'nullable|string|max:255',
            'content_en' => 'required|string',
            'content_ar' => 'nullable|string',
            'avatar' => 'nullable',
            'video_url' => 'nullable|url',
            'rating' => 'required|integer|min:1|max:5',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar && str_contains($testimonial->avatar, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $testimonial->avatar);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('avatar')->store('testimonials', 'public');
            $validated['avatar'] = Storage::url($path);
        } elseif (is_string($request->avatar)) {
            $validated['avatar'] = $request->avatar;
        } else {
            unset($validated['avatar']);
        }

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar && str_contains($testimonial->avatar, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $testimonial->avatar);
            Storage::disk('public')->delete($oldPath);
        }
        
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully.');
    }

    /**
     * Toggle active status.
     */
    public function toggleStatus(Testimonial $testimonial)
    {
        $testimonial->update(['is_active' => !$testimonial->is_active]);
        return back();
    }
}
