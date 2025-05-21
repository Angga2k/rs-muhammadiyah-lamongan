<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search']);

        $doctors = Doctors::query()
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%'.$search.'%')
                        ->orWhere('specialization', 'like', '%'.$search.'%')
                        ->orWhere('phone', 'like', '%'.$search.'%');
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Doctors/Index', [
            'doctors' => $doctors,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Doctors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'specialization' => 'required|string|max:255',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'phone' => 'nullable|string|max:20',
                'schedule' => 'nullable|array',
                'schedule.*.day' => 'required_with:schedule|string',
                'schedule.*.time' => 'required_with:schedule|string',
                'is_active' => 'required|boolean',
            ]);

            if ($request->hasFile('photo')) {
                $validated['photo'] = $request->file('photo')->store('doctors', 'public');
            }

            if (isset($validated['schedule'])) {
                $validated['schedule'] = array_filter($validated['schedule'], function($item) {
                    return !empty($item['day']) && !empty($item['time']);
                });
            }

            Doctors::create($validated);

            return redirect()->route('admin.doctors.index')
                ->with('success', 'Doctor created successfully.');
                
        } catch (\Exception $e) {
            return redirect()->route('admin.doctors.create')
                ->with('error', 'Failed to create doctor: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doctors $doctor)
    {
        return Inertia::render('Admin/Doctors/Edit', [
            'doctor' => $doctor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctors $doctor)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'specialization' => 'required|string|max:255',
                'phone' => 'nullable|string|max:20',
                'schedule' => 'nullable|array',
                'schedule.*.day' => 'required_with:schedule|string',
                'schedule.*.time' => 'required_with:schedule|string',
                'is_active' => 'required|boolean',
            ]);

            if (isset($validated['schedule'])) {
                $validated['schedule'] = array_filter($validated['schedule'], function($item) {
                    return !empty($item['day']) && !empty($item['time']);
                });
            }

            $doctor->update($validated);

            return redirect()->route('admin.doctors.index')
                ->with('success', 'Doctor updated successfully.');
                
        } catch (\Exception $e) {
            return redirect()->route('admin.doctors.edit', $doctor->id)
                ->with('error', 'Failed to update doctor: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctors $doctor)
    {
        try {
            if ($doctor->photo) {
                Storage::disk('public')->delete($doctor->photo);
            }

            $doctor->delete();

            return redirect()->route('admin.doctors.index')
                ->with('success', 'Doctor deleted successfully.');
                
        } catch (\Exception $e) {
            return redirect()->route('admin.doctors.index')
                ->with('error', 'Failed to delete doctor: ' . $e->getMessage());
        }
    }

    /**
     * Update the doctor's photo.
     */
    public function updatePhoto(Request $request, Doctors $doctor)
    {
        try {
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        
            if ($doctor->photo) {
                Storage::disk('public')->delete($doctor->photo);
            }
        
            $path = $request->file('photo')->store('doctors', 'public');
        
            $doctor->update(['photo' => $path]);
        
            return redirect()->back()
                ->with('success', 'Doctor photo updated successfully.');
                
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to update photo: ' . $e->getMessage());
        }
    }
}