<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use App\Models\Doctors;
use App\Models\VisitingHour;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    public function index()
    {
        // Get current day name in Indonesian
        $daysInIndonesian = [
            'Sunday' => 'Minggu',
            'Monday' => 'Senin',
            'Tuesday' => 'Selasa',
            'Wednesday' => 'Rabu',
            'Thursday' => 'Kamis',
            'Friday' => 'Jumat',
            'Saturday' => 'Sabtu'
        ];
        
        $todayEnglish = Carbon::now()->englishDayOfWeek;
        $todayIndonesian = $daysInIndonesian[$todayEnglish];

        $latestContents = Contents::where('is_published', true)
            ->latest()
            ->take(5)
            ->get();

        $activeDoctorsCount = Doctors::where('is_active', true)->count();

        $latestDoctors = Doctors::where('is_active', true)
            ->latest()
            ->take(5)
            ->get();

        $todayDoctors = Doctors::where('is_active', true)
            ->get()
            ->filter(function($doctor) use ($todayEnglish, $todayIndonesian) {
                if (empty($doctor->schedule)) {
                    return false;
                }
                
                return collect($doctor->schedule)
                    ->contains(function($schedule) use ($todayEnglish, $todayIndonesian) {
                        return $schedule['day'] === $todayEnglish || 
                               $schedule['day'] === $todayIndonesian;
                    });
            })
            ->map(function($doctor) use ($todayEnglish, $todayIndonesian) {
                $todaySchedules = collect($doctor->schedule)
                    ->filter(function($schedule) use ($todayEnglish, $todayIndonesian) {
                        return $schedule['day'] === $todayEnglish || 
                               $schedule['day'] === $todayIndonesian;
                    })
                    ->values()
                    ->toArray();

                return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                    'specialization' => $doctor->specialization,
                    'schedule' => $todaySchedules
                ];
            })
            ->values();

        $visitingHours = VisitingHour::first();

        $contentStats = [
            'rules' => Contents::where('type', 'rules')->count(),
            'map' => Contents::where('type', 'map')->count(),
            'handwash' => Contents::where('type', 'handwash')->count(),
            'education' => Contents::where('type', 'education')->count(),
            'other' => Contents::where('type', 'other')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'latestContents' => $latestContents,
            'activeDoctorsCount' => $activeDoctorsCount,
            'latestDoctors' => $latestDoctors,
            'todayDoctors' => $todayDoctors,
            'visitingHours' => $visitingHours,
            'contentStats' => $contentStats,
            'totalContents' => array_sum($contentStats),
            'totalDoctors' => Doctors::count(),
        ]);
    }
}