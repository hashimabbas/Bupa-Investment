<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/offers/index', [
            'offers' => Offer::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
            'button_text_ar' => 'nullable|string|max:50',
            'button_text_en' => 'nullable|string|max:50',
            'type' => 'required|string|in:banner,popup',
            'is_active' => 'boolean',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date',
        ]);

        Offer::create($validated);

        return back()->with('success', 'Offer created successfully');
    }

    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
            'button_text_ar' => 'nullable|string|max:50',
            'button_text_en' => 'nullable|string|max:50',
            'type' => 'required|string|in:banner,popup',
            'is_active' => 'boolean',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date',
        ]);

        $offer->update($validated);

        return back()->with('success', 'Offer updated successfully');
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();
        return back()->with('success', 'Offer deleted successfully');
    }

    public function toggleStatus(Offer $offer)
    {
        $offer->update(['is_active' => !$offer->is_active]);
        return back()->with('success', 'Offer status updated');
    }
}
