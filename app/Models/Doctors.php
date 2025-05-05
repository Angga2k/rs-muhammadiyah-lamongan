<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctors extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'specialization',
        'photo',
        'phone',
        'schedule',
        'is_active',
    ];

    protected $casts = [
        'schedule' => 'array',
        'is_active' => 'boolean',
    ];

    public function getScheduleDisplayAttribute()
    {
        return collect($this->schedule)->map(function ($item) {
            return "{$item['day']}: {$item['time']}";
        })->implode(', ');
    }
}