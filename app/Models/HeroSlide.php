<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'image_path',
        'title_ar',
        'title_en',
        'subtitle_ar',
        'subtitle_en',
        'sort_order',
        'is_active',
    ];
}
