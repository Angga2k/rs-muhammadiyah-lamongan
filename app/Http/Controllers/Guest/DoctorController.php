<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Doctors;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of all active doctors
     */
    public function index()
    {
        $doctors = Doctors::where('is_active', true)
            ->orderBy('name')
            ->get();

        $specializations = Doctors::where('is_active', true)
            ->distinct('specialization')
            ->orderBy('specialization')
            ->pluck('specialization');

        return Inertia::render('Guest/Dokter/Index', [
            'doctors' => $doctors,
            'specializations' => $specializations,
        ]);
    }

    /**
     * Display the specified doctor
     */
    public function show(Doctors $doctor)
    {
        if (!$doctor->is_active) {
            abort(404);
        }

        return Inertia::render('Guest/Doctors/Show', [
            'doctor' => [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'specialization' => $doctor->specialization,
                'photo' => $doctor->photo ? asset('storage/' . $doctor->photo) : asset('images/doctor-placeholder.jpg'),
                'phone' => $doctor->phone,
                'schedule' => $doctor->schedule,
                'schedule_display' => $doctor->schedule_display,
            ]
        ]);
    }

    public function today()
    {
        $today = Carbon::now()->isoFormat('dddd');
        
        $doctors = Doctors::where('is_active', true)
            ->get()
            ->map(function($doctor) {
                return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                    'specialization' => $doctor->specialization,
                    'photo' => $doctor->photo,
                    'schedules' => $doctor->schedule,
                    'phone' => $doctor->phone,
                ];
            });
    
        return Inertia::render('Guest/Dokter/Today', [
            'doctors' => $doctors,
            'today' => [
                'name' => Carbon::now()->translatedFormat('l, d F Y'),
                'day' => $today // Format: Monday, Tuesday, etc
            ]
        ]);
    }

}