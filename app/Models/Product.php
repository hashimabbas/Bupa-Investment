<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
        'department_id',
        'partner_id',
        'description_en',
        'description_ar',
        'image',
        'brochure_pdf',
        'tests_pdf',
        'specs_en',
        'specs_ar',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'specs_en' => 'array',
        'specs_ar' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'department_id' => 'integer',
        'partner_id' => 'integer',
    ];

    /**
     * Relationship with Department.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    /**
     * Relationship with Partner.
     */
    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    /**
     * Scope for active products.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
