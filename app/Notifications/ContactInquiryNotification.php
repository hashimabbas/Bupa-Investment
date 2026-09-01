<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactInquiryNotification extends Notification
{
    use Queueable;

    protected array $data;

    /**
     * @param array $data Expected keys: name, phone, email, job_title, org, type, message
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $typeLabel = match ($this->data['type'] ?? null) {
            'Quote' => 'Price Quote / عرض سعر',
            'Product' => 'Technical Consultation / استشارة فنية',
            'Support' => 'Maintenance / صيانة',
            'service_request' => 'Service Request / طلب خدمة',
            default => ucfirst($this->data['type'] ?? 'Inquiry'),
        };

        return (new MailMessage)
            ->subject('New Inquiry: ' . ($this->data['name'] ?? 'Website Visitor') . ' - ' . $typeLabel)
            ->greeting('Hello,')
            ->line('A new inquiry has been received from the website.')
            ->line('**Customer Details:**')
            ->line('Name: ' . ($this->data['name'] ?? 'N/A'))
            ->line('Organization: ' . ($this->data['org'] ?? 'N/A'))
            ->line('Phone: ' . ($this->data['phone'] ?? 'N/A'))
            ->line('Email: ' . ($this->data['email'] ?? 'N/A'))
            ->line('Job Title: ' . ($this->data['job_title'] ?? 'N/A'))
            ->line('Type: ' . $typeLabel)
            ->line('**Message:**')
            ->line($this->data['message'] ?? 'No message provided.');
    }
}
