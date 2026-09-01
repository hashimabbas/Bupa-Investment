<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = ['name_en', 'name_ar', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function partners()
    {
        return $this->belongsToMany(Partner::class, 'partner_department');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
