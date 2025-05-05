import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, Trash2, UploadCloud } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useEffect } from "react";
import { TimeRangePicker } from "@/Components/Admin/Doctors/DoctorTimePicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue } from "@/Components/ui/select";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  photo: string | null;
  phone: string | null;
  schedule: Array<{ day: string; time: string }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  doctor: Doctor;
}

export default function Edit({ doctor }: Props) {
  const { data, setData, put, processing, errors, recentlySuccessful, reset } = useForm({
    name: doctor.name ?? '',
    specialization: doctor.specialization ?? '',
    phone: doctor.phone ?? '',
    schedule: doctor.schedule.length > 0 ? doctor.schedule : [{ day: '', time: '' }],
    is_active: doctor.is_active,
  });

  const { data: photoData, setData: setPhotoData, post: uploadPhoto, processing: photoProcessing, errors: photoErrors, reset: resetPhoto } = useForm({
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.doctors.update', doctor.id), {
      preserveScroll: true,
    });
  };

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photoData.photo as Blob);
    
    uploadPhoto(route('admin.doctors.update-photo', doctor.id), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        resetPhoto();
        if (e.target instanceof HTMLFormElement && e.target.elements.namedItem('photo')) {
          (e.target.elements.namedItem('photo') as HTMLInputElement).value = '';
        }
      },
    });
  };

  const handleScheduleChange = (index: number, field: 'day' | 'time', value: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index][field] = value;
    setData('schedule', newSchedule);
  };

  const addSchedule = () => {
    setData('schedule', [...data.schedule, { day: '', time: '' }]);
  };

  const removeSchedule = (index: number) => {
    const newSchedule = [...data.schedule];
    newSchedule.splice(index, 1);
    setData('schedule', newSchedule);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoData('photo', e.target.files[0]);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      reset('name', 'specialization', 'phone', 'schedule', 'is_active');
    }
  }, [errors]);

  return (
    <AdminLayout breadcrumbs={[
      { label: "Doctors", href: route('admin.doctors.index') },
      { label: "Edit Doctor", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={route('admin.doctors.index')}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Doctor</h1>
            <p className="text-muted-foreground text-sm">
              Last updated: {new Date(doctor.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {recentlySuccessful && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Doctor details updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePhotoSubmit}>
              <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/20">
                      <AvatarImage 
                        src={doctor.photo ? `/storage/${doctor.photo}` : undefined} 
                        alt={data.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {data.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {photoProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {doctor.photo ? 'Current photo' : 'No photo uploaded'}
                  </span>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="text-sm font-medium">
                      Upload New Photo
                    </Label>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="photo"
                        className="flex-1 cursor-pointer rounded-md border border-dashed border-input p-4 transition-colors hover:bg-accent/50"
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <UploadCloud className="h-6 w-6 text-muted-foreground" />
                          <div className="text-sm text-center">
                            <p className="font-medium text-foreground">
                              {photoData.photo 
                                ? photoData.photo.name 
                                : 'Click to browse or drag and drop'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or GIF (max. 2MB)
                            </p>
                          </div>
                        </div>
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {photoErrors.photo && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {photoErrors.photo}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={!photoData.photo || photoProcessing}
                      className="min-w-[120px]"
                    >
                      {photoProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4 mr-2" />
                          Update Photo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Enter doctor's full name"
                  className={errors.name ? "border-destructive" : ""}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="specialization">Specialization *</Label>
                <Input
                  id="specialization"
                  value={data.specialization}
                  onChange={(e) => setData('specialization', e.target.value)}
                  placeholder="Enter doctor's specialization"
                  className={errors.specialization ? "border-destructive" : ""}
                  required
                />
                {errors.specialization && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="Enter doctor's phone number"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Schedule</Label>
                {data.schedule.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 flex flex-col gap-1">
                      <Label htmlFor={`schedule-${index}-day`}>Day</Label>
                      <Select
                        value={item.day}
                        onValueChange={(value) => handleScheduleChange(index, 'day', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectScrollUpButton />
                          <SelectGroup>
                            <SelectLabel>Days</SelectLabel>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectScrollDownButton />
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`schedule-${index}-time`}>Time</Label>
                        <TimeRangePicker
                            id={`schedule-${index}-time`}
                            value={{ 
                            start: item.time.split('-')[0]?.trim() || '', 
                            end: item.time.split('-')[1]?.trim() || '' 
                            }}
                            onChange={({ start, end }) => handleScheduleChange(index, 'time', `${start} - ${end}`)}
                            placeholder="e.g. 08:00 - 16:00"
                        />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSchedule(index)}
                      disabled={data.schedule.length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSchedule}
                >
                  Add Schedule
                </Button>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <Switch
                  id="is_active"
                  checked={data.is_active}
                  onCheckedChange={(checked) => setData('is_active', checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="is_active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {data.is_active 
                      ? "This doctor is currently visible to patients"
                      : "This doctor is currently hidden from patients"}
                  </p>
                </div>
              </div>

              <CardFooter className="flex justify-between gap-3 px-0 pb-0">
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href={route('admin.doctors.index')}>Cancel</Link>
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={processing || !data.name.trim() || !data.specialization.trim()}
                  >
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
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}