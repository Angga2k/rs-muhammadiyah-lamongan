<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Contents extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'type',
        'is_published',
        'images'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'images' => 'array'
    ];

    /**
     * Scope for published contents
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Handle image deletion when model is deleted
     */
    protected static function booted()
    {
        static::deleted(function ($content) {
            if ($content->images) {
                foreach ($content->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }
        });
    }
}