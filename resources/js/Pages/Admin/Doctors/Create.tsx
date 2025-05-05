// resources/js/Pages/Admin/Doctors/Create.tsx
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, X, UploadCloud, User } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Textarea } from "@/Components/ui/textarea";
import { Trash2 } from "lucide-react";
import { TimeRangePicker } from "@/Components/Admin/Doctors/DoctorTimePicker";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function Create() {
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    name: '',
    specialization: '',
    photo: null as File | null,
    phone: '',
    schedule: [{ day: '', time: '' }],
    is_active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.doctors.store'), {
      forceFormData: true,
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

  return (
    <AdminLayout breadcrumbs={[
      { label: "Doctors", href: route('admin.doctors.index') },
      { label: "Add Doctor", isCurrent: true },
    ]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={route('admin.doctors.index')}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Doctor</h1>
            <p className="text-muted-foreground text-sm">
              Add new doctor to the system
            </p>
          </div>
        </div>

        {recentlySuccessful && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Doctor added successfully!
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

              <div className="space-y-4">
                <Label htmlFor="photo">Profile Photo</Label>
                
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  {/* Preview Area */}
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-dashed border-muted-foreground/20">
                      {data.photo ? (
                        <AvatarImage 
                          src={URL.createObjectURL(data.photo)} 
                          alt="Preview" 
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {data.photo && (
                      <button
                        type="button"
                        onClick={() => setData('photo', null)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="photo"
                      className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        errors.photo 
                          ? "border-destructive bg-destructive/10 hover:bg-destructive/20" 
                          : "border-border bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        <div className="text-sm text-center">
                          <p className="font-medium">
                            {data.photo 
                              ? data.photo.name 
                              : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF (max. 2MB)
                          </p>
                        </div>
                      </div>
                      <input
                        id="photo"
                        type="file"
                        onChange={(e) => setData('photo', (e.target as HTMLInputElement).files?.[0] || null)}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    
                    {errors.photo && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.photo}</span>
                      </div>
                    )}
                  </div>
                </div>
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
                    <div className="flex-1 flex flex-col gap-1">
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
                  onCheckedChange={(checked: true) => setData('is_active', checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="is_active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {data.is_active 
                      ? "This doctor will be visible to patients"
                      : "This doctor will be hidden from patients"}
                  </p>
                </div>
              </div>

              <CardFooter className="flex justify-end gap-3 px-0 pb-0">
                <Button variant="outline" asChild>
                  <Link href={route('admin.doctors.index')}>Cancel</Link>
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
                      Create Doctor
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