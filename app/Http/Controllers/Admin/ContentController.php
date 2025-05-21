<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index()
    {
        $contents = Contents::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Contents/Index', [
            'contents' => $contents,
            'filters' => request()->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Contents/Create', [
            'contentTypes' => $this->getContentTypes(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:rules,map,handwash,education,other',
            'is_published' => 'boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('contents', 'public');
                $imagePaths[] = [
                    'id' => uniqid(),
                    'path' => $path,
                    'url' => asset('storage/'.$path)
                ];
            }
        }

        Contents::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'type' => $validated['type'],
            'is_published' => $validated['is_published'] ?? false,
            'images' => $imagePaths,
        ]);

        return redirect()->route('admin.contents.index')
            ->with('success', 'Content created successfully');
    }

    public function edit(Contents $content)
    {
        $content->images = $this->mapImagePaths($content->images ?? []);

        return Inertia::render('Admin/Contents/Edit', [
            'content' => $content,
            'contentTypes' => $this->getContentTypes(),
        ]);
    }

    public function editImages(Contents $content)
    {
        $content->images = $this->mapImagePaths($content->images ?? []);

        return Inertia::render('Admin/Contents/ImageEdit', [
            'content' => $content,
        ]);
    }

    public function updateImages(Request $request, Contents $content)
    {
        $validated = $request->validate([
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'string',
        ]);

        $currentImages = $content->images ?? [];
        
        // Handle deleted images
        if ($request->deleted_images) {
            foreach ($request->deleted_images as $path) {
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
                $currentImages = array_filter($currentImages, fn($img) => $img['path'] !== $path);
            }
            $currentImages = array_values($currentImages);
        }

        $newImages = [];
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $path = $file->store('contents', 'public');
                $newImages[] = [
                    'id' => uniqid(),
                    'path' => $path,
                    'url' => asset('storage/'.$path)
                ];
            }
        }

        $content->update([
            'images' => array_merge($currentImages, $newImages),
        ]);

        return redirect()->route('admin.contents.edit-images', $content->id)
            ->with('success', 'Images updated successfully');
    }

    public function update(Request $request, Contents $content)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:rules,map,handwash,education,other',
            'is_published' => 'boolean',
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'string',
        ]);

        $currentImages = $content->images ?? [];
        
        if ($request->deleted_images) {
            foreach ($request->deleted_images as $path) {
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
                $currentImages = array_filter($currentImages, fn($img) => $img['path'] !== $path);
            }
            $currentImages = array_values($currentImages);
        }

        $newImages = [];
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $path = $file->store('contents', 'public');
                $newImages[] = [
                    'id' => uniqid(),
                    'path' => $path,
                    'url' => asset('storage/'.$path)
                ];
            }
        }

        $content->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'type' => $validated['type'],
            'is_published' => $validated['is_published'] ?? false,
            'images' => array_merge($currentImages, $newImages),
        ]);

        return back()->with('success', 'Content updated successfully');
    }

    public function destroy(Contents $content)
    {
        $this->deleteContentImages($content->images ?? []);
        $content->delete();

        return redirect()->route('admin.contents.index')
            ->with('success', 'Content deleted successfully');
    }

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

    protected function mapImagePaths(array $images)
    {
        return array_map(function($image) {
            if (is_string($image)) {
                return [
                    'id' => uniqid(),
                    'path' => $image,
                    'url' => asset('storage/'.$image)
                ];
            }
            return $image;
        }, $images);
    }

    protected function deleteContentImages(array $images)
    {
        foreach ($images as $image) {
            $path = is_array($image) ? $image['path'] : $image;
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }
    }
}