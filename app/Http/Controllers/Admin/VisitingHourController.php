<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VisitingHour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitingHourController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/VisitingHour/Index', [
            'visiting_hours' => VisitingHour::first(),
        ]);
    }

    public function edit()
    {
        $visitingHours = VisitingHour::first();
        return Inertia::render('Admin/VisitingHours/Edit', [
            'visitingHours' => $visitingHours
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'morning_start' => 'nullable|date_format:H:i',
            'morning_end' => 'nullable|date_format:H:i|after:morning_start',
            'afternoon_start' => 'nullable|date_format:H:i',
            'afternoon_end' => 'nullable|date_format:H:i|after:afternoon_start',
            'notes' => 'nullable|string|max:500',
        ]);

        $visitingHours = VisitingHour::firstOrNew();
        $visitingHours->fill($validated);
        $visitingHours->save();

        return redirect()->back()->with('success', 'Visiting hours updated successfully');
    }
}
