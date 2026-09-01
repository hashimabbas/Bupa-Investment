<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ (request()->is('admin*') && !request()->is('dashboard')) ? 'ltr' : (app()->getLocale() == 'ar' ? 'rtl' : 'ltr') }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Bupa Investment Co. Ltd') }}</title>

        <!-- Search Engine & Social Media Metadata -->
        <meta name="description" content="بوبا للاستثمار - شريككم الموثوق لتجهيز المستشفيات والمختبرات بأحدث التقنيات العالمية في السودان.">
        <meta property="og:title" content="بوبا للاستثمار | Bupa Investment Co. Ltd">
        <meta property="og:description" content="تجهيز المستشفيات والمختبرات بأحدث التقنيات العالمية مع ضمان استمرارية التشغيل عبر فريقنا الهندسي المتكامل.">
        <meta property="og:image" content="{{ asset('bupa-logo.png') }}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ asset('bupa-logo.png') }}">

        <link rel="icon" type="image/png" href="/bupa-logo.png">
        <link rel="apple-touch-icon" href="/bupa-logo.png">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
