<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('visiting_hours', function (Blueprint $table) {
            $table->id();
            $table->time('morning_start')->nullable();
            $table->time('morning_end')->nullable();
            $table->time('afternoon_start')->nullable();
            $table->time('afternoon_end')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        DB::table('visiting_hours')->insert([
            'morning_start' => '10:00:00',
            'morning_end' => '12:00:00',
            'afternoon_start' => '15:00:00',
            'afternoon_end' => '17:00:00',
            'notes' => 'Maksimal 2 orang per pasien',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('visiting_hours');
    }
};