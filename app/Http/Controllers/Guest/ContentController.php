<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ContentController extends Controller
{
    protected function getContentTypes()
    {
        return [
            'rules' => 'Tata Tertib ICU',
            'map' => 'Denah Kamar ICU',
            'handwash' => 'Panduan Cuci Tangan',
            'education' => 'Edukasi Kesehatan',
            'other' => 'Lainnya',
        ];
    }

    public function education()
    {
        $articles = Contents::published()
            ->where('type', 'education')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => Str::limit(strip_tags($article->content), 200),
                    'content' => $article->content,
                    'images' => $article->images ? array_map(function ($image) {
                        return Storage::url($image);
                    }, $article->images) : [],
                    'published_at' => $article->created_at->format('d F Y'),
                ];
            });

        return Inertia::render('Guest/Contents/Educations/Index', [
            'articles' => $articles,
            'contentTypes' => $this->getContentTypes(),
        ]);
    }

    public function show($id)
    {
        $article = Contents::published()
            ->findOrFail($id);

        $relatedArticles = Contents::published()
            ->where('type', 'education')
            ->where('id', '!=', $id)
            ->inRandomOrder()
            ->limit(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => Str::limit(strip_tags($article->content), 100),
                    'image' => $article->images ? Storage::url($article->images[0]) : null,
                ];
            });

        return Inertia::render('Guest/Contents/Educations/Show', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'images' => $article->images ? array_map(function ($image) {
                    return Storage::url($image);
                }, $article->images) : [],
                'published_at' => $article->created_at->format('d F Y'),
                'type' => $this->getContentTypes()[$article->type] ?? $article->type,
            ],
            'relatedArticles' => $relatedArticles,
        ]);
    }
}