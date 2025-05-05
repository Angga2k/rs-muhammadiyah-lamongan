import { AdminLayout } from "@/Layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { ClipboardList, Map, Hand, BookOpen, Stethoscope, Clock, UserRound, CalendarCheck } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Link } from "@inertiajs/react";

interface Props {
  latestContents: {
    id: number;
    title: string;
    type: 'rules' | 'map' | 'handwash' | 'education' | 'other';
    is_published: boolean;
  }[];
  activeDoctorsCount: number;
  latestDoctors: {
    id: number;
    name: string;
    specialization: string;
    is_active: boolean;
    schedule: {
      day: string;
      time: string;
    }[];
  }[];
  todayDoctors: {
    id: number;
    name: string;
    specialization: string;
    schedule: {
      day: string;
      time: string;
    }[];
  }[];
  visitingHours: {
    morning_start: string;
    morning_end: string;
    afternoon_start: string;
    afternoon_end: string;
    notes: string;
  } | null;
  contentStats: {
    rules: number;
    map: number;
    handwash: number;
    education: number;
    other: number;
  };
  totalContents: number;
  totalDoctors: number;
}

export default function Dashboard({
  latestContents,
  activeDoctorsCount,
  latestDoctors,
  todayDoctors,
  visitingHours,
  contentStats,
  totalContents,
  totalDoctors
}: Props) {
  // ICU Stats - You might want to fetch these dynamically later
  const stats = {
    currentPatients: 15,
    capacity: 20,
    averageStay: "3.5 hari"
  };

  console.log(todayDoctors);

  const contentTypes = {
    rules: { title: "Tata Tertib ICU", icon: ClipboardList },
    map: { title: "Denah Kamar ICU", icon: Map },
    handwash: { title: "Panduan Cuci Tangan", icon: Hand },
    education: { title: "Edukasi Kesehatan", icon: BookOpen },
    other: { title: "Lainnya", icon: ClipboardList }
  };

  // Format time from HH:MM:SS to HH:MM
  const formatTime = (timeString: string) => {
    return timeString?.substring(0, 5) || '--:--';
  };

  // Get latest content for each type
  const getLatestContentByType = (type: string) => {
    return latestContents.find(content => content.type === type);
  };

  return (
    <AdminLayout breadcrumbs={[
      { label: "Dashboard", href: "/admin/dashboard" },
    ]}>
      <div className="space-y-6">

        {/* Content Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Konten ICU
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Total: {totalContents} konten
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(contentTypes).map(([type, { title, icon: Icon }]) => {
                const content = getLatestContentByType(type);
                const count = contentStats[type as keyof typeof contentStats];
                
                return (
                  <Card key={type} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">{title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold">
                        {content ? content.title : 'Belum ada konten'}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant={content?.is_published ? 'default' : 'secondary'}>
                          {content?.is_published ? 'Published' : 'Draft'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {count} {count === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={content ? `/admin/contents/${content.id}/edit` : `/admin/contents/create?type=${type}`}>
                          {content ? 'Edit' : 'Buat'} Konten
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/contents">
                Lihat semua konten
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Today's Doctors */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5" />
                Dokter Jaga Hari Ini
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {todayDoctors.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {todayDoctors.map(doctor => (
                  <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {doctor.schedule
                          .filter(s => s.day === 'Today' || s.day === 'Hari Ini')
                          .map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{s.time}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/doctors/${doctor.id}`}>
                          Lihat Profil
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  Tidak ada dokter jaga hari ini
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Semua dokter sedang libur atau tidak ada jadwal
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/doctors/schedule">
                Kelola Jadwal Dokter
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Doctors on Duty */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Dokter Jaga Terbaru
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Menampilkan {latestDoctors.length} dari {totalDoctors} dokter
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Dokter</TableHead>
                  <TableHead>Spesialisasi</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>
                      {doctor.schedule?.map(s => `${s.day}: ${s.time}`).join(', ') || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={doctor.is_active ? 'default' : 'secondary'}>
                        {doctor.is_active ? 'Aktif' : 'Non-Aktif'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {latestDoctors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                      Tidak ada data dokter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/doctors">
                Lihat semua dokter
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Visiting Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Jam Besuk ICU
            </CardTitle>
          </CardHeader>
          <CardContent>
            {visitingHours ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">Jam Besuk Pagi</h3>
                    <p className="text-lg">
                      {formatTime(visitingHours.morning_start)} - {formatTime(visitingHours.morning_end)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Jam Besuk Sore</h3>
                    <p className="text-lg">
                      {formatTime(visitingHours.afternoon_start)} - {formatTime(visitingHours.afternoon_end)}
                    </p>
                  </div>
                </div>
                {visitingHours.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-bold text-gray-900">{visitingHours.notes}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-muted-foreground text-center py-4">
                Jam besuk belum diatur
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/visiting-hours/edit">
                {visitingHours ? 'Edit' : 'Atur'} Jam Besuk
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
}