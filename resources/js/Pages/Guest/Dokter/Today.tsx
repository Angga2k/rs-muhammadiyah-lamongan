import { Head, Link } from '@inertiajs/react';
import { CalendarDays, Clock, Phone } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/Types/types';
import { route } from 'ziggy-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Schedule {
  day: string;
  time: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  photo: string;
  schedules: Schedule[];
  phone: string;
}

interface TodayInfo {
  name: string;
  day: string;
}

interface DoctorTodayProps extends PageProps {
  doctors: Doctor[];
  today: TodayInfo;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};

const titleVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const emptyStateVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function DoctorToday({ doctors, today, auth }: DoctorTodayProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    return doctor.schedules?.some(schedule => 
      schedule.day === today.day || schedule.day === 'Setiap Hari'
    );
  });

  const getTodaySchedule = (schedules: Schedule[]) => {
    const todaySchedule = schedules.find(s => s.day === today.day);
    const everydaySchedule = schedules.find(s => s.day === 'Setiap Hari');
    
    return todaySchedule?.time || everydaySchedule?.time || 'Tidak ada jadwal';
  };

  return (
    <GuestLayout user={auth.user}>
      <Head title={`Jadwal Dokter Hari Ini - ${today.name}`} />

      <div className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <h1 className="text-3xl font-bold text-blue-900 mb-2 md:text-4xl lg:text-5xl">
              Jadwal Dokter Hari Ini
            </h1>
            <motion.div 
              className="flex items-center justify-center text-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              <p className="text-lg md:text-xl">{today.name}</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
          >
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredDoctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                      layout
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <motion.img 
                            src={`/storage/${doctor.photo}`} 
                            alt={`Foto ${doctor.name}`}
                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                            width={80}
                            height={80}
                            loading="lazy"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-blue-900">{doctor.name}</h3>
                            <motion.p 
                              className="text-blue-600"
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              {doctor.specialization}
                            </motion.p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-700">Jadwal Hari Ini:</p>
                              <p className="text-gray-600">
                                {getTodaySchedule(doctor.schedules)}
                              </p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <Phone className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <a 
                              href={`tel:${doctor.phone}`} 
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              aria-label={`Telepon ${doctor.name}`}
                            >
                              {doctor.phone}
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                className="text-center py-12 bg-white rounded-lg shadow"
                variants={emptyStateVariants}
              >
                <p className="text-gray-500 text-lg">Tidak ada jadwal dokter untuk hari ini</p>
                <motion.div
                  className="mt-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2
                  }}
                >
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </GuestLayout>
  );
}