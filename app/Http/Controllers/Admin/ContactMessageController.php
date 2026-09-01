<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query()->latest();

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($status = $request->string('status')->toString()) {
            if ($status === 'unread') {
                $query->where('is_read', false);
            } elseif ($status === 'read') {
                $query->where('is_read', true);
            }
        }

        $messages = $query->paginate(15)->withQueryString();
        $messages->through(fn ($message) => [
            'id' => $message->id,
            'name' => $message->name,
            'phone' => $message->phone,
            'email' => $message->email,
            'type' => $message->type,
            'message' => $message->message,
            'is_read' => $message->is_read,
            'created_at' => $message->created_at->format('M d, Y \a\t h:i A'),
        ]);

        return Inertia::render('admin/contact-messages/index', [
            'messages' => $messages,
            'filters' => $request->only(['search', 'status']),
            'stats' => [
                'total' => ContactMessage::count(),
                'unread' => ContactMessage::where('is_read', false)->count(),
            ],
        ]);
    }

    public function toggleRead(ContactMessage $contact_message)
    {
        $contact_message->update(['is_read' => ! $contact_message->is_read]);

        return back();
    }

    public function destroy(ContactMessage $contact_message)
    {
        $contact_message->delete();

        return back()->with('success', 'Message deleted successfully.');
    }
}
