<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class ClientRegistrationController extends Controller
{
    /**
     * Show the registration page for clients.
     */
    public function create(): Response
    {
        return Inertia::render('auth/client-register', [
            'customers' => Customer::with('sites')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:20',
            'customer_id' => 'required|exists:customers,id',
            'site_id' => 'nullable|exists:customer_sites,id',
            'position' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'customer_id' => $request->customer_id,
            'site_id' => $request->site_id,
            'position' => $request->position,
            'password' => Hash::make($request->password),
            'role' => 'client',
            'is_approved' => false,
            'status' => 'pending',
        ]);

        $user->assignRole('client');

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
