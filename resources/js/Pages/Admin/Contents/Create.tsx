import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, ImageIcon, Trash2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useRef, useState } from "react";
import { RichTextEditor } from "@/Components/Admin/Contents/RichTextEditor";

interface ContentType {
  [key: string]: string;
}

interface Props {
  contentTypes: ContentType;
}

export default function Create({ contentTypes }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<{url: string, file: File}[]>([]);
  
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
    title: string;
    content: string;
    type: string;
    is_published: boolean;
    images: File[];
  }>({
    title: '',
    content: '',
    type: '',
    is_published: true,
    images: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPreviewImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      
      setPreviewImages([...previewImages, ...newPreviewImages]);
      setData('images', [...data.images, ...Array.from(files)]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    
    const newImages = [...data.images];
    newImages.splice(index, 1);
    setData('images', newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.contents.store'), {
      onSuccess: () => {
        setPreviewImages([]);
        setData({ title: '', content: '', type: '', is_published: true, images: [] });
      },
    });
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Content", href: route('admin.contents.index') },
      { label: "Create Content", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={route('admin.contents.index')}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Content</h1>
            <p className="text-muted-foreground text-sm">
              Add new content to be displayed in the application
            </p>
          </div>
        </div>

        {recentlySuccessful && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Content created successfully!
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Details Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter content title"
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="type">Content Type *</Label>
                    <Select
                      value={data.type}
                      onValueChange={(value) => setData('type', value)}
                    >
                      <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(contentTypes).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.type}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="content">Content *</Label>
                    <RichTextEditor
                      value={data.content}
                      onChange={(value) => setData('content', value)}
                      error={errors.content}
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                    <Switch
                      id="is_published"
                      checked={data.is_published}
                      onCheckedChange={(checked: boolean) => setData('is_published', checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="is_published">Publish Status</Label>
                      <p className="text-sm text-muted-foreground">
                        {data.is_published 
                          ? "This content will be visible to users immediately"
                          : "This content will be saved as draft"}
                      </p>
                    </div>
                  </div>

                  <CardFooter className="flex justify-end gap-3 px-0 pb-0">
                    <Button variant="outline" asChild>
                      <Link href={route('admin.contents.index')}>Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                      {processing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Content
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Click to upload images
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

                  {previewImages.length > 0 && (
                    <div className="space-y-3">
                      <Label>Uploaded Images ({previewImages.length})</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {previewImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={`Preview ${index + 1}`}
                              className="rounded-md border w-full aspect-square object-cover"
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}