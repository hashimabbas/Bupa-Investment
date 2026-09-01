<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientStory extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_ar',
        'excerpt_en',
        'excerpt_ar',
        'content_en',
        'content_ar',
        'featured_image',
        'video_url',
        'client_name_en',
        'client_name_ar',
        'client_logo',
        'location_en',
        'location_ar',
        'challenge_en',
        'challenge_ar',
        'result_en',
        'result_ar',
        'quote_en',
        'quote_ar',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
