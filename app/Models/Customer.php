<?php

namespace App\Models;

use App\Enums\CustomerType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'contact_person',
        'phone',
        'email',
        'address',
        'city',
        'country',
        'latitude',
        'longitude',
        'notes',
        'account_manager_id',
    ];

    protected $casts = [
        'type' => CustomerType::class,
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function accountManager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'account_manager_id');
    }

    public function sites(): HasMany
    {
        return $this->hasMany(CustomerSite::class);
    }
}
