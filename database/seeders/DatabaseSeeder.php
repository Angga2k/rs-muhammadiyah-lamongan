<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\DoctorSeeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Rumah Sakit',
            'email' => 'admin@rs.com',
            'password' => Hash::make('password'),
        ]);

        $this->call([
            DoctorSeeder::class,
            ContentEducationSeeder::class,
        ]);
    }
}
