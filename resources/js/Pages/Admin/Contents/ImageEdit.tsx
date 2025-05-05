import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, ImageIcon, Trash2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useRef, useState, useEffect } from "react";

interface ContentImage {
  id: string;
  path?: string;
  url: string;
  file?: File;
}

interface Props {
  content: {
    id: number;
    title: string;
    images: ContentImage[];
  };
}

export default function EditImages({ content }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<ContentImage[]>([]);

  const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
    new_images: File[];
    deleted_images: string[];
  }>({
    new_images: [],
    deleted_images: [],
  });

  // Initialize preview images
  useEffect(() => {
    if (content.images) {
      setPreviewImages(content.images.map(img => ({
        id: img.id,
        path: img.path,
        url: img.url
      })));
    }
  }, [content]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      previewImages.forEach(img => {
        if (img.file) URL.revokeObjectURL(img.url);
      });
    };
  }, [previewImages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      
      // Validate file sizes
      const oversizedFiles = newFiles.filter(file => file.size > 2 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some images exceed the 2MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }
      
      const newPreviewImages = newFiles.map(file => ({
        id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        file,
        path: undefined
      }));
      
      setPreviewImages([...previewImages, ...newPreviewImages]);
      setData('new_images', [...data.new_images, ...newFiles]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = previewImages[index];
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    if (imageToRemove.file) {
      // Remove from new_images array
      setData('new_images', data.new_images.filter(
        file => file !== imageToRemove.file
      ));
      URL.revokeObjectURL(imageToRemove.url);
    } else if (imageToRemove.path) {
      // Add to deleted_images array
      setData('deleted_images', [...data.deleted_images, imageToRemove.path]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('_method', 'PUT');
  
    // Append new images
    data.new_images.forEach((file) => {
      formData.append('new_images[]', file);
    });
  
    data.deleted_images.forEach((path) => {
      formData.append('deleted_images[]', path);
    });
  
    post(route('admin.contents.update-images', content.id), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        previewImages.forEach(img => {
          if (img.file) URL.revokeObjectURL(img.url);
        });
      },
      onError: (errors) => {
        console.error('Submission error:', errors);
      }
    });
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Content", href: route('admin.contents.index') },
      { label: content.title, href: route('admin.contents.edit', content.id) },
      { label: "Edit Images", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={route('admin.contents.edit', content.id)}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Images for: {content.title}</h1>
            <p className="text-muted-foreground text-sm">
              Manage images for this content
            </p>
          </div>
        </div>

        {recentlySuccessful && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Images updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There were {Object.keys(errors).length} errors with your submission
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Image Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload new images
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, JPG, GIF (Max: 2MB each)
                  </p>
                </div>
                <input
                  type="file"
                  id="images"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  multiple
                />

                {errors.new_images && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.new_images}
                  </p>
                )}

                {previewImages.length > 0 ? (
                  <div className="space-y-3">
                    <Label>Current Images ({previewImages.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {previewImages.map((image, index) => (
                        <div key={image.id} className="relative group group-hover:opacity-75 transition-opacity">
                          <img
                            src={image.url}
                            alt={`Preview ${index + 1}`}
                            className="rounded-md border w-full aspect-square object-cover"
                            onLoad={() => image.file && URL.revokeObjectURL(image.url)}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          {!image.file && (
                            <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Existing
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      No images uploaded yet
                    </p>
                  </div>
                )}
              </div>

              <CardFooter className="flex justify-end gap-3 px-0 pb-0">
                <Button variant="outline" asChild>
                  <Link href={route('admin.contents.edit', content.id)}>Back to Content</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}