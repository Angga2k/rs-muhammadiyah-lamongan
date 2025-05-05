<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitingHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'morning_start',
        'morning_end',
        'afternoon_start',
        'afternoon_end',
        'notes'
    ];

    protected $casts = [
        'morning_start' => 'datetime:H:i',
        'morning_end' => 'datetime:H:i',
        'afternoon_start' => 'datetime:H:i',
        'afternoon_end' => 'datetime:H:i',
    ];

    public static function getCurrent()
    {
        return self::firstOrCreate([], [
            'morning_start' => '10:00',
            'morning_end' => '12:00',
            'afternoon_start' => '15:00',
            'afternoon_end' => '17:00',
            'notes' => 'Maksimal 2 orang per pasien'
        ]);
    }

    public function getMorningScheduleAttribute()
    {
        if (!$this->morning_start || !$this->morning_end) {
            return 'Tidak ada jam besuk pagi';
        }
        return $this->morning_start->format('H:i') . ' - ' . $this->morning_end->format('H:i');
    }

    public function getAfternoonScheduleAttribute()
    {
        if (!$this->afternoon_start || !$this->afternoon_end) {
            return 'Tidak ada jam besuk sore';
        }
        return $this->afternoon_start->format('H:i') . ' - ' . $this->afternoon_end->format('H:i');
    }
}