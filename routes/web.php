<?php

use App\Http\Controllers\Admin\PartnerController as AdminPartnerController;
use App\Models\Partner;
use App\Models\Testimonial;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home', [
        'partners' => Partner::where('is_active', true)->orderBy('sort_order')->orderBy('created_at', 'desc')->get(),
        'testimonials' => Testimonial::active()->orderBy('sort_order')->get(),
        'heroSlides' => \App\Models\HeroSlide::where('is_active', true)->orderBy('sort_order')->get()
    ]);
})->name('home');

// Marketing Routes...
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('services', [
        'services' => \App\Models\Service::where('is_active', true)->orderBy('sort_order')->get()
    ]);
})->name('services');

Route::get('/partners', function () {
    return Inertia::render('partners', [
        'partners' => Partner::with('specialties')->where('is_active', true)->orderBy('sort_order')->orderBy('created_at', 'desc')->get()
    ]);
})->name('partners');

Route::get('/projects', function () {
    return Inertia::render('projects');
})->name('projects');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

Route::post('/service-requests', [App\Http\Controllers\ContactController::class, 'storeServiceRequest'])->name('service-requests.store');

// Language Switcher
Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'ar'])) {
        session()->put('locale', $locale);
    }
    return redirect()->back();
})->name('language.switch');

// Admin Panel Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('partners', AdminPartnerController::class);
    Route::resource('departments', \App\Http\Controllers\Admin\DepartmentController::class);
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::post('/users/{user}/approve', [\App\Http\Controllers\Admin\UserController::class, 'approve'])->name('users.approve');
    Route::post('/users/{user}/toggle-status', [\App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::resource('offers', \App\Http\Controllers\Admin\OfferController::class);
    Route::post('/offers/{offer}/toggle-status', [\App\Http\Controllers\Admin\OfferController::class, 'toggleStatus'])->name('offers.toggle-status');
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
    Route::post('/testimonials/{testimonial}/toggle-status', [\App\Http\Controllers\Admin\TestimonialController::class, 'toggleStatus'])->name('testimonials.toggle-status');
    Route::resource('hero-slides', \App\Http\Controllers\Admin\HeroSlideController::class);
    Route::post('/hero-slides/{hero_slide}/toggle-status', [\App\Http\Controllers\Admin\HeroSlideController::class, 'toggleStatus'])->name('hero-slides.toggle-status');

    Route::get('/settings', [\App\Http\Controllers\Admin\SiteSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SiteSettingController::class, 'update'])->name('settings.update');

    Route::get('/contact-messages', [\App\Http\Controllers\Admin\ContactMessageController::class, 'index'])->name('contact-messages.index');
    Route::post('/contact-messages/{contact_message}/toggle-read', [\App\Http\Controllers\Admin\ContactMessageController::class, 'toggleRead'])->name('contact-messages.toggle-read');
    Route::delete('/contact-messages/{contact_message}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'destroy'])->name('contact-messages.destroy');

});

Route::get('/pending-approval', function () {
    return Inertia::render('auth/pending-approval');
})->name('pending-approval');

Route::middleware(['auth', 'approved'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->role === 'client') {
            return redirect()->route('client.dashboard');
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'products' => \App\Models\Product::count(),
                'partners' => \App\Models\Partner::count(),
                'services' => \App\Models\Service::count(),
            ],
            'departmentStats' => \App\Models\Department::withCount('products')->orderBy('products_count', 'desc')->get()
        ]);
    })->name('dashboard');

    Route::get('client/dashboard', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('client.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
