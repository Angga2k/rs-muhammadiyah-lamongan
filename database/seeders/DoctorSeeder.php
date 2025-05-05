<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    public function run()
    {
        $doctors = [
            [
                'name' => 'Dr. Ahmad Santoso',
                'specialization' => 'Cardiologist',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '081234567890',
                'schedule' => json_encode([
                    ['day' => 'Monday', 'time' => '08:00-16:00'],
                    ['day' => 'Wednesday', 'time' => '09:00-17:00'],
                    ['day' => 'Friday', 'time' => '10:00-18:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Siti Rahayu',
                'specialization' => 'Pediatrician',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '082345678901',
                'schedule' => json_encode([
                    ['day' => 'Tuesday', 'time' => '08:00-15:00'],
                    ['day' => 'Thursday', 'time' => '08:00-15:00'],
                    ['day' => 'Saturday', 'time' => '09:00-12:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Bambang Wijaya',
                'specialization' => 'Neurologist',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '083456789012',
                'schedule' => json_encode([
                    ['day' => 'Monday', 'time' => '13:00-20:00'],
                    ['day' => 'Wednesday', 'time' => '13:00-20:00'],
                    ['day' => 'Friday', 'time' => '13:00-20:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Dian Permata',
                'specialization' => 'Dermatologist',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '084567890123',
                'schedule' => json_encode([
                    ['day' => 'Tuesday', 'time' => '10:00-18:00'],
                    ['day' => 'Thursday', 'time' => '10:00-18:00'],
                    ['day' => 'Saturday', 'time' => '10:00-15:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Eko Prasetyo',
                'specialization' => 'Orthopedic Surgeon',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '085678901234',
                'schedule' => json_encode([
                    ['day' => 'Monday', 'time' => '07:00-12:00'],
                    ['day' => 'Wednesday', 'time' => '07:00-12:00'],
                    ['day' => 'Friday', 'time' => '07:00-12:00']
                ]),
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Altamizxyz',
                'specialization' => 'Orthopedic Surgeon',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '085678901234',
                'schedule' => json_encode([
                    ['day' => 'Thursday', 'time' => '07:00-12:00'],
                    ['day' => 'Wednesday', 'time' => '07:00-12:00'],
                    ['day' => 'Friday', 'time' => '07:00-12:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Altamiz',
                'specialization' => 'Orthopedic Surgeon',
                'photo' => 'doctors/avatar.jpg',
                'phone' => '085678901234',
                'schedule' => json_encode([
                    ['day' => 'Thursday', 'time' => '07:00-12:00'],
                    ['day' => 'Wednesday', 'time' => '07:00-12:00'],
                    ['day' => 'Friday', 'time' => '07:00-12:00']
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('doctors')->insert($doctors);
    }
}
