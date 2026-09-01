<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class EnsureUserIsApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->role === 'client' && !$user->is_approved) {
            // Check if it's an Inertia request to render the pending page
            if ($request->routeIs('pending-approval')) {
                return $next($request);
            }
            
            return redirect()->route('pending-approval');
        }

        return $next($request);
    }
}
