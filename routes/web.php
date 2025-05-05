<?php

use App\Http\Controllers\Guest\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    DashboardController,
    ContentController,
    DoctorController,
    VisitingHourController,
};

use App\Http\Controllers\Guest\DoctorController as GuestDoctorController;
use App\Http\Controllers\Guest\ContentController as GuestContentController;

Route::get('/', [HomeController::class, 'index'])->name('guest.home');
Route::get('/dokter', [GuestDoctorController::class, 'index'])->name('guest.doctors.index');
Route::get('/jadwal-dokter/hari-ini', [GuestDoctorController::class, 'today'])->name('doctors.today');

Route::group(['prefix' => 'education', 'as' => 'guest.education.'], function () {
    Route::get('/', [GuestContentController::class, 'education'])->name('index');
    Route::get('/{id}', [GuestContentController::class, 'show'])->name('show');
});

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    
    Route::resource('contents', ContentController::class)->names([
        'index' => 'admin.contents.index',
        'create' => 'admin.contents.create',
        'store' => 'admin.contents.store',
        'show' => 'admin.contents.show',
        'edit' => 'admin.contents.edit',
        'update' => 'admin.contents.update',
        'destroy' => 'admin.contents.destroy',
    ]);

    // Image handling routes for contents
    Route::get('contents/{content}/edit-images', [ContentController::class, 'editImages'])
        ->name('admin.contents.edit-images');
    
    Route::post('contents/{content}/update-images', [ContentController::class, 'updateImages'])
        ->name('admin.contents.update-images');
    
    Route::resource('doctors', DoctorController::class)->names([
        'index' => 'admin.doctors.index',
        'create' => 'admin.doctors.create',
        'store' => 'admin.doctors.store',
        'show' => 'admin.doctors.show',
        'edit' => 'admin.doctors.edit',
        'update' => 'admin.doctors.update',
        'destroy' => 'admin.doctors.destroy',
    ]);

    Route::post('doctors/{doctor}/update-photo', [DoctorController::class, 'updatePhoto'])
    ->name('admin.doctors.update-photo');

    Route::get('/visiting-hours', [VisitingHourController::class, 'edit'])->name('admin.visiting-hours.edit');
    Route::put('/visiting-hours', [VisitingHourController::class, 'update'])->name('admin.visiting-hours.update');
});

require __DIR__.'/auth.php';