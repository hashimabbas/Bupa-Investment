<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    /** @use HasFactory<\Database\Factories\PartnerFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'desc_en',
        'desc_ar',
        'logo',
        'website_url',
        'specialties_en',
        'specialties_ar',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'specialties_en' => 'array',
        'specialties_ar' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'partner_department');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
