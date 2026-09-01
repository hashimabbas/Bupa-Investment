<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        return Inertia::render('client/dashboard', [
            'hospital' => $user->customer->name ?? 'N/A',
            'site' => $user->site->name ?? 'All Sites',
        ]);
    }
}
