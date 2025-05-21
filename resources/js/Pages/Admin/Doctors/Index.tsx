import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination } from "@/Components/ui/pagination";
import { Badge } from "@/Components/ui/badge";
import { Edit, Trash2, PlusCircle, Search } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/Components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { APP_CONFIG } from "@/config";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  photo: string | null;
  phone: string | null;
  schedule: Array<{ day: string; time: string }> | null;
  is_active: boolean;
  created_at: string;
}

interface Props {
  doctors: {
    data: Doctor[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
  };
  filters: {
    search?: string;
  };
}

export default function Index({ doctors, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('admin.doctors.index'), { search: searchTerm }, { 
      preserveState: true,
      replace: true
    });
  };

  const handleDelete = (id: number) => {
    setIsDeleting(id);
    router.delete(route('admin.doctors.destroy', id), {
      preserveScroll: true,
      onFinish: () => setIsDeleting(null),
    });
  };

  const formatSchedule = (schedule: Array<{ day: string; time: string }> | null) => {
    if (!schedule || schedule.length === 0) return 'No schedule';
    return schedule.map(s => `${s.day}: ${s.time}`).join(', ');
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Doctors", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Doctors</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {doctors.data.length} doctors found
            </p>
          </div>
          <Button asChild>
            <Link href={route('admin.doctors.create')} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Doctor
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search doctors..."
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
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Doctor</TableHead>
                  <TableHead className="w-[20%]">Specialization</TableHead>
                  <TableHead className="w-[20%]">Contact</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[15%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      {searchTerm ? (
                        <Alert variant="default" className="border-0">
                          <AlertDescription>
                            No doctors found matching "{searchTerm}"
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert variant="default" className="border-0">
                          <AlertDescription>
                            No doctors available. Add one to get started.
                          </AlertDescription>
                        </Alert>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.data.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            {doctor.photo ? (
                              <AvatarImage 
                                src={APP_CONFIG.API_BASE_URL_ASSETS +`${doctor.photo}`} 
                                alt={doctor.name}
                                className="object-cover"
                              />
                            ) : (
                              <AvatarFallback className="bg-muted text-muted-foreground">
                                {doctor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <Link 
                              href={route('admin.doctors.edit', doctor.id)} 
                              className="font-medium hover:underline"
                            >
                              {doctor.name}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {formatSchedule(doctor.schedule)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={doctor.is_active ? 'default' : 'secondary'}>
                          {doctor.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              asChild 
                              variant="ghost" 
                              size="icon"
                              disabled={isDeleting === doctor.id}
                            >
                              <Link href={route('admin.doctors.edit', doctor.id)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isDeleting === doctor.id}>
                                  {isDeleting === doctor.id ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                  ) : (
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  )}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete the doctor's record.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(doctor.id)}
                                    disabled={isDeleting === doctor.id}
                                  >
                                    {isDeleting === doctor.id ? (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
          {doctors.links.length > 3 && (
            <CardFooter className="flex justify-center border-t pt-4">
              <Pagination links={doctors.links} />
            </CardFooter>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}