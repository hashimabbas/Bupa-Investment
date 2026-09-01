<?php

namespace App\Enums;

enum CustomerType: string
{
    case HOSPITAL = 'hospital';
    case CLINIC = 'clinic';
    case LABORATORY = 'laboratory';
    case GOVERNMENT = 'government';
    case PRIVATE = 'private';

    public function label(): string
    {
        return match($this) {
            self::HOSPITAL => 'Hospital',
            self::CLINIC => 'Clinic',
            self::LABORATORY => 'Laboratory',
            self::GOVERNMENT => 'Government Entity',
            self::PRIVATE => 'Private Entity',
        };
    }
}
