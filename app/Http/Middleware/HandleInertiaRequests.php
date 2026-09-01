<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? $request->user()->load(['customer', 'site']) : null,
                'can' => $request->user() ? [
                    'view_products' => $request->user()->can('products.view'),
                    'view_partners' => $request->user()->can('partners.view'),
                    'view_services' => $request->user()->can('services.view'),
                    'view_departments' => $request->user()->can('departments.view'),
                    'view_users' => $request->user()->can('users.view'),
                    'view_offers' => $request->user()->can('offers.view'),
                    'view_gallery' => $request->user()->can('gallery.view'),
                    'view_hero' => $request->user()->can('hero_slides.view'),
                    'view_testimonials' => $request->user()->can('testimonials.view'),
                    'view_contact_messages' => $request->user()->can('contact_messages.view'),
                ] : null,
            ],
            'offers' => \App\Models\Offer::where('is_active', true)
                ->where(function($q) {
                    $q->whereNull('starts_at')->orWhere('starts_at', '<=', now());
                })
                ->where(function($q) {
                    $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
                })
                ->get(),
            'departments' => \App\Models\Department::where('is_active', true)->orderBy('name_en')->get(['id', 'name_ar', 'name_en']),
            'locale' => app()->getLocale(),
            'siteSettings' => \App\Models\SiteSetting::pluck('value', 'key')->toArray(),
        ];
    }
}
