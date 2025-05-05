import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/Types/types';
import GuestLayout from '@/Layouts/GuestLayout';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { CalendarClock, Search, UserRound, Phone, Star, ArrowRight } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    photo: string | null;
    phone: string | null;
    schedule: Array<{
        day: string;
        time: string;
    }>;
    schedule_display: string;
    rating?: number;
}

interface DoctorIndexProps extends PageProps {
    doctors: Doctor[];
    specializations: string[];
}

export default function DoctorIndex({ doctors: allDoctors, specializations, auth }: DoctorIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('default');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredDoctors = useMemo(() => {
        let result = [...allDoctors];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(doctor => 
                doctor.name.toLowerCase().includes(term) || 
                doctor.specialization.toLowerCase().includes(term));
        }

        if (selectedSpecialization !== 'all') {
            result = result.filter(doctor => 
                doctor.specialization === selectedSpecialization)
        }

        switch (sortOption) {
            case 'name_asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            // default: no sorting
        }

        return result;
    }, [allDoctors, searchTerm, selectedSpecialization, sortOption]);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Dokter Spesialis" />

            <div className="container mx-auto px-4 py-12">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
                        Dokter Spesialis Kami
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Temui tim dokter profesional yang siap memberikan pelayanan kesehatan terbaik untuk Anda
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Card className="mb-8 border border-gray-200 shadow-sm">
                        <CardContent className="">
                            <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
                                <div className="flex-1">
                                    <label htmlFor="doctor-search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cari Dokter
                                    </label>
                                    <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="doctor-search"
                                        placeholder="Nama dokter atau spesialisasi..."
                                        className="pl-10 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                                    <div className="w-full">
                                        <label htmlFor="specialization-filter" className="block text-sm font-medium text-gray-700 mb-1">
                                            Spesialisasi
                                        </label>
                                        <div className="relative">
                                            <Select
                                            value={selectedSpecialization}
                                            onValueChange={setSelectedSpecialization}
                                            >
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <SelectTrigger 
                                                id="specialization-filter" 
                                                className="w-full bg-white hover:bg-gray-50 transition-colors"
                                                >
                                                <SelectValue placeholder="Pilih spesialisasi" />
                                                </SelectTrigger>
                                            </motion.div>
                                            <SelectContent className="animate-in fade-in-80 zoom-in-95">
                                                <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                >
                                                <SelectItem 
                                                    value="all" 
                                                    className="focus:bg-blue-50 focus:text-blue-600 transition-colors"
                                                >
                                                    <motion.span whileHover={{ x: 2 }}>
                                                    Semua Spesialisasi
                                                    </motion.span>
                                                </SelectItem>
                                                {specializations.map((spec) => (
                                                    <SelectItem 
                                                    key={spec} 
                                                    value={spec}
                                                    className="focus:bg-blue-50 focus:text-blue-600 transition-colors"
                                                    >
                                                    <motion.span 
                                                        whileHover={{ x: 2 }}
                                                        className="flex items-center"
                                                    >
                                                        <UserRound className="h-4 w-4 mr-2 text-blue-500" />
                                                        {spec}
                                                    </motion.span>
                                                    </SelectItem>
                                                ))}
                                                </motion.div>
                                            </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full min-w-[180px]">
                                        <label htmlFor="sort-option" className="block text-sm font-medium text-gray-700 mb-1">
                                            Urutkan
                                        </label>
                                        <Select
                                            value={sortOption}
                                            onValueChange={setSortOption}
                                        >
                                            <SelectTrigger id="sort-option" className="w-full">
                                                <SelectValue placeholder="Urutkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default">Default</SelectItem>
                                                <SelectItem value="name_asc">Nama (A-Z)</SelectItem>
                                                <SelectItem value="name_desc">Nama (Z-A)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="hover:shadow-lg transition-shadow">
                                <div className="animate-pulse">
                                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                    <CardContent className="pt-4 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        <AnimatePresence>
                            {filteredDoctors.map((doctor) => (
                                <motion.div
                                    key={doctor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    layout
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                        <CardHeader className="p-0 relative">
                                            <div className="h-48 overflow-hidden rounded-t-lg relative">
                                                <img
                                                    src={doctor.photo ? `/storage/${doctor.photo}` : '/images/doctor-placeholder.jpg'}
                                                    alt={`Foto Dr. ${doctor.name}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/images/doctor-placeholder.jpg';
                                                    }}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="">
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-gray-500">Nama Dokter</p>
                                                <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
                                                {doctor.name}
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                                                </h3>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-gray-500">Spesialisasi</p>
                                                <div className="mt-1">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                    {doctor.specialization}
                                                </span>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                                                    <CalendarClock className="h-5 w-5 mr-2 text-blue-500" />
                                                    Jadwal Praktik
                                                </h3>

                                                <div className="relative">
                                                    <motion.div 
                                                    className="flex items-center bg-blue-50/50 p-2 rounded-lg border border-blue-100"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    >
                                                    <div className="flex-1">
                                                        <span className="font-medium text-blue-800">
                                                        {doctor.schedule[0].day}
                                                        </span>
                                                        <span className="mx-2 text-gray-400">|</span>
                                                        <span className="text-gray-600">
                                                        {doctor.schedule[0].time}
                                                        </span>
                                                    </div>
                                                    
                                                    {doctor.schedule.length > 1 && (
                                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                        +{doctor.schedule.length - 1} jadwal
                                                        </span>
                                                    )}
                                                    </motion.div>

                                                    {/* Additional schedules - appears on hover */}
                                                    {doctor.schedule.length > 1 && (
                                                    <AnimatePresence>
                                                        <motion.div
                                                        className="absolute z-10 top-full left-0 right-0 pt-1"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        whileHover={{
                                                            opacity: 1,
                                                            height: 'auto',
                                                            transition: { duration: 0.2 }
                                                        }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        >
                                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 space-y-2">
                                                            {doctor.schedule.slice(1).map((schedule, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.1 }}
                                                                className="flex items-center bg-blue-50/50 p-2 rounded-lg border border-blue-100"
                                                            >
                                                                <div className="flex-1">
                                                                <span className="font-medium text-blue-800">
                                                                    {schedule.day}
                                                                </span>
                                                                <span className="mx-2 text-gray-400">|</span>
                                                                <span className="text-gray-600">
                                                                    {schedule.time}
                                                                </span>
                                                                </div>
                                                            </motion.div>
                                                            ))}
                                                        </div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                <AnimatePresence>
                    {filteredDoctors.length === 0 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                                    <Search className="h-12 w-12" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Dokter Tidak Ditemukan
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Tidak ada dokter yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau kata kunci pencarian.
                                </p>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedSpecialization('all');
                                        setSortOption('default');
                                    }}
                                >
                                    Reset Filter
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GuestLayout>
    );
}