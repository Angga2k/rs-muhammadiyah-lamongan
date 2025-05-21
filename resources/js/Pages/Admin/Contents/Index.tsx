import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination } from "@/Components/ui/pagination";
import { Badge } from "@/Components/ui/badge";
import { ClipboardList, Map, Hand, BookOpen, Edit, Trash2, PlusCircle, Search, Image as ImageIcon } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/Components/ui/hover-card";
import { APP_CONFIG } from "@/config";

interface Content {
  id: number;
  title: string;
  type: string;
  is_published: boolean;
  created_at: string;
  images: Array<{
    url: string;
    path: string;
  }>;
}

interface Props {
  contents: {
    data: Content[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
  };
  filters: {
    search?: string;
  };
}

const getIconForType = (type: string) => {
  const icons = {
    'rules': <ClipboardList className="h-4 w-4" />,
    'map': <Map className="h-4 w-4" />,
    'handwash': <Hand className="h-4 w-4" />,
    'education': <BookOpen className="h-4 w-4" />,
    'other': <ClipboardList className="h-4 w-4" />
  };
  return icons[type as keyof typeof icons] || icons.other;
};

const getTypeLabel = (type: string) => {
  const labels = {
    'rules': 'Tata Tertib',
    'map': 'Denah',
    'handwash': 'Cuci Tangan',
    'education': 'Edukasi',
    'other': 'Lainnya'
  };
  return labels[type as keyof typeof labels] || labels.other;
};

export default function Index({ contents, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('admin.contents.index'), { search: searchTerm }, { 
      preserveState: true,
      replace: true
    });
  };

  const handleDeleteClick = (id: number) => {
    setContentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (contentToDelete) {
      setIsDeleting(contentToDelete);
      router.delete(route('admin.contents.destroy', contentToDelete), {
        preserveScroll: true,
        onFinish: () => {
          setIsDeleting(null);
          setDeleteDialogOpen(false);
        },
        onError: () => {
          setIsDeleting(null);
          alert('Failed to delete content. Please try again.');
        }
      });
    }
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Content", isCurrent: true },
    ]}>
      <Head title="Contents" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Contents</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {contents.data.length} contents found
            </p>
          </div>
          <Button asChild>
            <Link href={route('admin.contents.create')} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search contents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Title</TableHead>
                  <TableHead className="w-[5%]">Image</TableHead>
                  <TableHead className="w-[20%]">Type</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[15%]">Created</TableHead>
                  <TableHead className="w-[10%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {searchTerm ? (
                        <Alert variant="default" className="border-0">
                          <AlertDescription>
                            No contents found matching "{searchTerm}"
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert variant="default" className="border-0">
                          <AlertDescription>
                            No contents available. Create one to get started.
                          </AlertDescription>
                        </Alert>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  contents.data.map((content) => (
                    <TableRow key={content.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link 
                          href={route('admin.contents.edit', content.id)} 
                          className="hover:underline"
                        >
                          {content.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {content.images?.length > 0 ? (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="relative group cursor-pointer">
                                <img
                                  src={APP_CONFIG.API_BASE_URL_ASSETS + content.images[0].path}
                                  alt={`Thumbnail for ${content.title}`}
                                  className="h-10 w-10 rounded-md object-cover border"
                                />
                                {content.images.length > 1 && (
                                  <div className="absolute -bottom-1 -right-1 bg-primary text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    +{content.images.length - 1}
                                  </div>
                                )}
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-auto p-2">
                              <div className="grid grid-cols-2 gap-2">
                                {content.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={APP_CONFIG.API_BASE_URL_ASSETS + image.path}
                                    alt={`Content image ${index + 1}`}
                                    className="h-24 w-24 rounded-md object-cover border"
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2 text-center">
                                {content.images.length} image{content.images.length !== 1 ? 's' : ''}
                              </p>
                            </HoverCardContent>
                          </HoverCard>
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-2">
                          {getIconForType(content.type)}
                          {getTypeLabel(content.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={content.is_published ? 'default' : 'secondary'}>
                          {content.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(content.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              asChild 
                              variant="ghost" 
                              size="icon"
                              disabled={isDeleting === content.id}
                            >
                              <Link href={route('admin.contents.edit', content.id)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick(content.id)}
                              disabled={isDeleting === content.id}
                            >
                              {isDeleting === content.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          {contents.links.length > 3 && (
            <CardFooter className="flex justify-center border-t pt-4">
              <Pagination links={contents.links} />
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the content.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting === contentToDelete}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting === contentToDelete}
            >
              {isDeleting === contentToDelete ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}