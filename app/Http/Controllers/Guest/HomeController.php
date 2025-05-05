<?php
namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use App\Models\Doctors;
use App\Models\Service;
use App\Models\VisitingHour;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {
        $featuredDoctors = Doctors::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($doctor) {
                return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                    'specialization' => $doctor->specialization,
                    'photo' => $doctor->photo ? asset('storage/' . $doctor->photo) : asset('images/doctor-placeholder.jpg'),
                ];
            });

        $stats = [
            'doctors' => Doctors::where('is_active', true)->count(),
            'operation_hours' => '24',
        ];

        $visitingHours = VisitingHour::first();

        $featuredContents = Contents::all();

        return Inertia::render('Guest/Dashboard', [
            'featuredDoctors' => $featuredDoctors,
            'stats' => $stats,
            'featuredContents' => $featuredContents,
            'visitingHours' => $visitingHours ? [
                'morning_start' => $visitingHours->morning_start,
                'morning_end' => $visitingHours->morning_end,
                'afternoon_start' => $visitingHours->afternoon_start,
                'afternoon_end' => $visitingHours->afternoon_end,
            ] : null,
            'auth' => [ 
                'user' => Auth::user() ? [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email
                ] : null
            ]
        ]);
    }

    private function getContentTypeLabel($type)
    {
        $labels = [
            'education' => 'Edukasi Kesehatan',
            'rules' => 'Tata Tertib',
            'map' => 'Denah Rumah Sakit',
            'handwash' => 'Panduan Cuci Tangan',
        ];

        return $labels[$type] ?? 'Informasi';
    }
}