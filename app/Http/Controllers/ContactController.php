<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\User;
use App\Notifications\ContactInquiryNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    /**
     * Handle the general contact form on the public site.
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'type' => 'required|string',
            'message' => 'nullable|string',
        ]);

        ContactMessage::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'type' => $validated['type'],
            'message' => $validated['message'] ?? null,
        ]);

        $this->notifyRecipients($validated, $validated['type']);

        return response()->json(['success' => true]);
    }

    /**
     * Track a WhatsApp button click as an inquiry notification.
     */
    public function trackWhatsapp(Request $request)
    {
        $validated = $request->validate([
            'scenario' => 'required|string',
            'page' => 'nullable|string',
        ]);

        $type = match ($validated['scenario']) {
            'product' => 'product',
            'support' => 'support',
            default => 'service',
        };

        $this->notifyRecipients([
            'name' => 'WhatsApp Prospect',
            'phone' => 'Pending Chat',
            'type' => $type,
            'message' => 'WhatsApp button clicked for ' . $validated['scenario'] . ' from page: ' . ($validated['page'] ?? 'Unknown'),
        ], $type);

        return response()->json(['success' => true]);
    }

    /**
     * Store a service request submitted from the public website.
     */
    public function storeServiceRequest(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'org' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'service_id' => 'required|exists:services,id',
            'service_title' => 'required|string',
            'message' => 'nullable|string',
        ]);

        $serviceMessage = $validated['message'] ?? "Requested Service: {$validated['service_title']}";

        ContactMessage::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'type' => 'Service Request',
            'message' => $serviceMessage,
        ]);

        $this->notifyRecipients([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'job_title' => $validated['position'] ?? null,
            'org' => $validated['org'] ?? null,
            'type' => 'service_request',
            'message' => $serviceMessage,
        ], 'service_request');

        return back()->with('success', 'Thank you! Your request has been submitted successfully.');
    }

    /**
     * Notify the relevant staff roles based on the inquiry type.
     */
    private function notifyRecipients(array $data, string $type): void
    {
        $recipients = User::where('role', 'admin')->get();

        if ($type === 'Quote') {
            $recipients = $recipients->concat(User::where('role', 'sales')->get());
        }

        $technicalTypes = ['Product', 'Support', 'product', 'support', 'service', 'service_request'];
        if (in_array($type, $technicalTypes, true)) {
            $recipients = $recipients->concat(User::where('role', 'technician')->get());
        }

        $recipients = $recipients->unique('id');

        if ($recipients->isNotEmpty()) {
            Notification::send($recipients, new ContactInquiryNotification($data));
        }
    }
}
