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
import { Textarea } from "@/Components/ui/textarea";
import { useRef, useState, useEffect } from "react";
import { RichTextEditor } from "@/Components/Admin/Contents/RichTextEditor";

interface ContentType {
  [key: string]: string;
}

interface ContentImage {
  id: string;
  path: string;
  url: string;
  file?: File;
}

interface Props {
  content: {
    id: number;
    title: string;
    content: string;
    type: string;
    is_published: boolean;
    images: ContentImage[];
  };
  contentTypes: ContentType;
}

export default function Edit({ content, contentTypes }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<ContentImage[]>([]);

  const { data, setData, put, processing, errors, recentlySuccessful } = useForm<{
    title: string;
    content: string;
    type: string;
    is_published: boolean;
    new_images: File[];
    deleted_images: string[];
  }>({
    title: content.title,
    content: content.content,
    type: content.type,
    is_published: content.is_published,
    new_images: [],
    deleted_images: [],
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('type', data.type);
    formData.append('is_published', data.is_published ? '1' : '0');
  
    put(route('admin.contents.update', content.id), {
      forceFormData: false,
      preserveScroll: true,
      onError: (errors) => {
        console.error('Submission error:', errors);
      }
    });
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Content", href: route('admin.contents.index') },
      { label: "Edit Content", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={route('admin.contents.index')}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Content</h1>
            <p className="text-muted-foreground text-sm">
              Update content details and images
            </p>
          </div>
        </div>

        {recentlySuccessful && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Content updated successfully!
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    {errors.content && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.content}
                      </p>
                    )}
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
                          ? "This content is visible to users"
                          : "This content is saved as draft"}
                      </p>
                    </div>
                  </div>

                  <CardFooter className="flex justify-between gap-3 px-0 pb-0">
                    <div className="flex gap-3">
                      <Button variant="secondary" className="flex items-center" asChild>
                        <Link href={route('admin.contents.edit-images', content.id)}>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Manage Images
                        </Link>
                      </Button>
                      <Button type="submit" disabled={processing}>
                        {processing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Content
                          </>
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}