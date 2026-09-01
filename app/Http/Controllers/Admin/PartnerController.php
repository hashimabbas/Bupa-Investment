<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        \Illuminate\Support\Facades\Gate::authorize('partners.view');
        $filters = $request->only(['search']);

        $partners = Partner::with('departments')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/partners/index', [
            'partners' => $partners,
            'departments' => Department::all(),
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Gate::authorize('partners.create');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc_en' => 'nullable|string',
            'desc_ar' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'website_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'department_ids' => 'nullable|array',
            'department_ids.*' => 'exists:departments,id',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = Storage::url($path);
        }

        $partner = Partner::create($validated);
        
        if (isset($validated['department_ids'])) {
            $partner->departments()->sync($validated['department_ids']);
        }

        return back()->with('success', 'Partner created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        \Illuminate\Support\Facades\Gate::authorize('partners.edit');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc_en' => 'nullable|string',
            'desc_ar' => 'nullable|string',
            'logo' => 'nullable', // Could be file or string (existing URL)
            'website_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'department_ids' => 'nullable|array',
            'department_ids.*' => 'exists:departments,id',
        ]);

        if ($request->hasFile('logo')) {
            // Delete old logo if it exists locally
            if ($partner->logo && str_contains($partner->logo, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $partner->logo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = Storage::url($path);
        } elseif (is_string($request->logo)) {
            $validated['logo'] = $request->logo;
        }

        $partner->update($validated);
        
        if (isset($validated['department_ids'])) {
            $partner->departments()->sync($validated['department_ids']);
        }

        return back()->with('success', 'Partner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        \Illuminate\Support\Facades\Gate::authorize('partners.delete');
        if ($partner->logo && str_contains($partner->logo, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $partner->logo);
            Storage::disk('public')->delete($oldPath);
        }
        
        $partner->delete();

        return back()->with('success', 'Partner deleted successfully.');
    }
}
