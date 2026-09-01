<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.view');
        $query = User::query();

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('job_title', 'like', "%{$request->search}%");
            });
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $users = $query->with('permissions')->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'permissions' => \App\Models\Permission::all()->groupBy('module'),
            'filters' => $request->only(['search', 'role', 'status']),
            'stats' => [
                'total' => User::count(),
                'active' => User::where('status', 'active')->count(),
                'pending' => User::where('status', 'pending')->count(),
                'admins' => User::where('role', 'admin')->count(),
            ]
        ]);
    }

    public function approve(User $user)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.edit');
        
        $user->update([
            'status' => 'active',
            'is_approved' => true
        ]);

        return back()->with('success', 'تمت الموافقة على المستخدم وتفعيل حسابه بنجاح.');
    }

    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.create');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'job_title' => 'nullable|string|max:255',
            'role' => 'required|string|in:admin,manager,sales,technician',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string|in:active,suspended,invited',
            'bio' => 'nullable|string',
            'permissions' => 'nullable|array',
        ]);

        $user = User::create([
            ...$validated,
            'password' => Hash::make($validated['password']),
        ]);

        if (isset($validated['permissions'])) {
            $user->permissions()->sync($validated['permissions']);
        }

        return back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.edit');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'job_title' => 'nullable|string|max:255',
            'role' => 'required|string|in:admin,manager,sales,technician',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string|in:active,suspended,invited',
            'bio' => 'nullable|string',
            'permissions' => 'nullable|array',
        ]);

        if ($request->password) {
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);

        if (isset($validated['permissions'])) {
            $user->permissions()->sync($validated['permissions']);
        }

        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.delete');
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }

    public function toggleStatus(User $user)
    {
        \Illuminate\Support\Facades\Gate::authorize('users.edit');
        $user->update([
            'status' => $user->status === 'active' ? 'suspended' : 'active'
        ]);

        return back()->with('success', 'User status updated.');
    }
}
