import { AdminLayout } from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { TimePicker } from "@/Components/Admin/VisitingHours/TimePicker";
import { route } from "ziggy-js";

interface VisitingHours {
    id: number;
    morning_start: string;
    morning_end: string;
    afternoon_start: string;
    afternoon_end: string;
    notes: string;
}

interface Props {
    visitingHours: VisitingHours;
}

export default function Edit({ visitingHours }: Props) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        morning_start: visitingHours.morning_start || '',
        morning_end: visitingHours.morning_end || '',
        afternoon_start: visitingHours.afternoon_start || '',
        afternoon_end: visitingHours.afternoon_end || '',
        notes: visitingHours.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.visiting-hours.update'));
    };

    return (
        <AdminLayout breadcrumbs={[
            { label: "Visiting Hours", isCurrent: true },
        ]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Visiting Hours</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Set hospital visiting hours
                        </p>
                    </div>
                </div>

                {recentlySuccessful && (
                    <Alert variant="default">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                            Visiting hours updated successfully!
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
                        <CardTitle>Visiting Hours Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Morning Session</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="morning_start">Start Time</Label>
                                            <TimePicker
                                                id="morning_start"
                                                value={data.morning_start}
                                                onChange={(value) => setData('morning_start', value)}
                                                placeholder="Select start time"
                                            />
                                            {errors.morning_start && (
                                                <p className="text-sm text-destructive">
                                                    {errors.morning_start}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="morning_end">End Time</Label>
                                            <TimePicker
                                                id="morning_end"
                                                value={data.morning_end}
                                                onChange={(value) => setData('morning_end', value)}
                                                placeholder="Select end time"
                                            />
                                            {errors.morning_end && (
                                                <p className="text-sm text-destructive">
                                                    {errors.morning_end}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Afternoon Session</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="afternoon_start">Start Time</Label>
                                            <TimePicker
                                                id="afternoon_start"
                                                value={data.afternoon_start}
                                                onChange={(value) => setData('afternoon_start', value)}
                                                placeholder="Select start time"
                                            />
                                            {errors.afternoon_start && (
                                                <p className="text-sm text-destructive">
                                                    {errors.afternoon_start}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="afternoon_end">End Time</Label>
                                            <TimePicker
                                                id="afternoon_end"
                                                value={data.afternoon_end}
                                                onChange={(value) => setData('afternoon_end', value)}
                                                placeholder="Select end time"
                                            />
                                            {errors.afternoon_end && (
                                                <p className="text-sm text-destructive">
                                                    {errors.afternoon_end}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes/Information</Label>
                                <Input
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Additional information about visiting hours"
                                />
                                {errors.notes && (
                                    <p className="text-sm text-destructive">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            <CardFooter className="flex justify-end px-0 pb-0">
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