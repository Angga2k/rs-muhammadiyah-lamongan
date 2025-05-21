import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  BookOpen, 
  ClipboardList, 
  Map, 
  UserCircle,
  Stethoscope,
  CalendarClock,
  ArrowRight,
  ChevronRight,
  HeartPulse,
  Ambulance,
  ShieldCheck
} from 'lucide-react';
import LayoutGuest from '@/Layouts/GuestLayout';
import { useEffect, useState } from 'react';
import { APP_CONFIG } from '@/config';

const Dashboard = ({
  featuredDoctors,
  stats,
  visitingHours,
  contentSections,
  featuredContents,
  auth,
}: {
  featuredDoctors: any[];
  stats: { doctors: number; operation_hours: string };
  visitingHours: any;
  contentSections: any;
  featuredContents: any[];
  auth: any;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration: 0.5 
      } 
    },
  };

  const cardHover = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    },
  };

  const pulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const extractTime = (timestamp: string) => {
    return timestamp ? timestamp.split('T')[1].substring(0, 5) : '--:--';
  };

  console.log(featuredContents);

  return (
    <LayoutGuest user={auth.user}>
      <Head title="HOMEPAGE" />
      
      <section className="relative bg-blue-50 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/assets/rumahsakit.webp')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-20"></div>
        
        {!isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block absolute right-14 bottom-0 w-1/5 h-full"
            >
              <img 
                src={APP_CONFIG.ASSETS_URL + "pria.webp"} 
                alt="Dokter Pria" 
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block absolute left-14 bottom-0 w-1/5 h-full"
            >
              <img 
                src={APP_CONFIG.ASSETS_URL + "wanita.webp"} 
                alt="Dokter Wanita" 
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </motion.div>
          </>
        )}
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="text-center"
          >
            <motion.h1
              variants={item}
              className="text-2xl md:text-xl lg:text-3xl font-bold text-blue-900 mb-6"
            >
              Rumah Sakit Muhammadiyah <span className="text-blue-600">Lamongan</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-blue-800 mb-8 max-w-3xl mx-auto"
            >
              Memberikan Pelayanan Kesehatan Terbaik dengan Ikhlas dan Profesional
            </motion.p>
            <motion.div variants={item}>
              <motion.a
                href="#layanan"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 inline-flex items-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Layanan Kami <ChevronRight className="ml-1 h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Doctors Stat */}
            <motion.div
              variants={{
                ...item,
                hover: cardHover.hover
              }}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Stethoscope className="text-blue-600 h-8 w-8" />
              </div>
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-blue-900 mb-2"
              >
                {stats.doctors}+
              </motion.div>
              <p className="text-gray-600 text-lg">Dokter Spesialis</p>
            </motion.div>

            {/* Operation Hours */}
            <motion.div
              variants={{
                ...item,
                hover: cardHover.hover
              }}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Clock className="text-blue-600 h-8 w-8" />
              </div>
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-blue-900 mb-2"
              >
                {stats.operation_hours} Jam
              </motion.div>
              <p className="text-gray-600 text-lg">Layanan 24 Jam</p>
            </motion.div>

            {/* Emergency Units */}
            <motion.div
              variants={{
                ...item,
                hover: cardHover.hover
              }}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Ambulance className="text-blue-600 h-8 w-8" />
              </div>
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-blue-900 mb-2"
              >
                15+
              </motion.div>
              <p className="text-gray-600 text-lg">Unit Gawat Darurat</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="dokter" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Dokter Spesialis Kami</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {featuredDoctors.map((doctor: any) => (
              <motion.div
                key={doctor.id}
                variants={{
                  ...item,
                  hover: cardHover.hover
                }}
                whileHover="hover"
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 mb-4">{doctor.specialization}</p>
                  <motion.a
                    href={`/dokter/${doctor.id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300 inline-flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Lihat Profil <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/dokter"
              className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#2563eb",
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Semua Dokter
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Visiting Hours Section */}
      {visitingHours && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative"
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500 opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-blue-400 opacity-20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2
                }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <motion.h2 
                    className="text-3xl font-bold mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Jam Kunjungan
                  </motion.h2>
                  <motion.p 
                    className="text-blue-100 mb-6 text-lg"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Kami siap melayani Anda dengan sepenuh hati selama jam kunjungan berikut:
                  </motion.p>
                  
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="show"
                    variants={container}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex items-center"
                      variants={item}
                    >
                      <Clock className="mr-4 h-6 w-6 text-blue-200" />
                      <div>
                        <span className="font-semibold text-blue-100">Pagi:</span> {extractTime(visitingHours.morning_start)} - {extractTime(visitingHours.morning_end)}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center"
                      variants={item}
                    >
                      <Clock className="mr-4 h-6 w-6 text-blue-200" />
                      <div>
                        <span className="font-semibold text-blue-100">Sore:</span> {extractTime(visitingHours.afternoon_start)} - {extractTime(visitingHours.afternoon_end)}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="md:w-1/2 md:pl-8">
                  <motion.div
                    className="bg-white rounded-lg p-6 text-gray-800 shadow-lg"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <ShieldCheck className="text-blue-600 mr-2" /> Informasi Penting
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Diharapkan datang 15 menit sebelum jam kunjungan",
                        "Bawa kartu identitas dan kartu berobat (jika ada)",
                        "Patuhi protokol kesehatan yang berlaku",
                        "Pasien BPJS harap membawa surat rujukan"
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        >
                          <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Information Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {(() => {
            const contentGroups = {
              education: featuredContents.filter(content => content.type === 'education'),
              rules: featuredContents.filter(content => content.type === 'rules'),
              map: featuredContents.filter(content => content.type === 'map'),
              handwash: featuredContents.filter(content => content.type === 'handwash')
            };

            return (
              <AnimatePresence>

                {contentGroups.education.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    className="mb-16"
                  >
                    <div className="flex flex-col items-center mb-12">
                      <motion.div 
                        className="bg-blue-100 p-4 rounded-xl mb-4"
                        whileHover={{ 
                          rotate: [0, 5, -5, 5, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <BookOpen className="text-blue-600 h-8 w-8" />
                      </motion.div>
                      <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">Edukasi Kesehatan</h2>
                      <p className="text-lg text-blue-600 max-w-2xl text-center">
                        Informasi kesehatan terkini untuk hidup lebih sehat
                      </p>
                      <div className="w-24 h-1 bg-blue-400 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {contentGroups.education.map((content: any, index: number) => (
                        <motion.div
                          key={content.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5,
                            delay: index * 0.1
                          }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            y: -10,
                            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)"
                          }}
                          className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-50 transition-all duration-300 hover:border-blue-100 relative group"
                        >
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                          
                          <div className="p-6 h-full flex flex-col">
                            <div className="bg-blue-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                              <BookOpen className="text-blue-600 h-5 w-5" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                              {content.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                              {content.content.replace(/<[^>]*>/g, '')}
                            </p>
                            
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="mt-auto"
                            >
                              <a
                                href={`/informasi/${content.id}`}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 inline-flex items-center group-hover:text-blue-700"
                              >
                                Baca selengkapnya 
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </a>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center mt-12"
                    >
                      <a
                        href="/informasi?type=education"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        Lihat Semua Edukasi
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                      </a>
                    </motion.div>
                  </motion.div>
                )}

                {contentGroups.rules.length > 0 && (
                  <motion.div
                    key="rules"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    className="mb-16"
                  >
                    <div className="flex flex-col items-center mb-12">
                      <motion.div 
                        className="bg-blue-100 p-4 rounded-xl mb-4"
                        whileHover={{ 
                          rotate: [0, 5, -5, 5, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <ClipboardList className="text-blue-600 h-8 w-8" />
                      </motion.div>
                      <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">Tata Tertib Rumah Sakit</h2>
                      <p className="text-lg text-blue-600 max-w-2xl text-center">
                        Ketentuan dan peraturan untuk kenyamanan bersama
                      </p>
                      <div className="w-24 h-1 bg-blue-400 mt-4 rounded-full"></div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 relative group"
                    >
                      <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full z-10 shadow-md flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">Penting</span>
                      </div>

                      {contentGroups.rules[0].images?.length > 0 && (

                        <div className="relative h-auto w-full aspect-video overflow-hidden">
                          <motion.img
                            src={APP_CONFIG.API_BASE_URL_ASSETS + contentGroups.rules[0].images[0].path}
                            alt={contentGroups.rules[0].title || "Tata Tertib Rumah Sakit"}
                            className="w-full h-full object-contain"
                            initial={{ opacity: 0, scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none"></div>
                        </div>
                      )}

                      <div className="p-4 md:p-8 bg-gradient-to-b from-blue-50 to-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="prose max-w-none"
                        >
                          <h3 className="text-2xl md:text-3xl font-bold text-blue-900">
                            {contentGroups.rules[0].title || "Peraturan dan Tata Tertib"}
                          </h3>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <a
                              href={contentGroups.rules[0].images[0].url}
                              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                              Lihat Selengkapnya
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {contentGroups.map.length > 0 && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    className="mb-16"
                  >
                    <div className="flex flex-col items-center mb-12">
                      <motion.div 
                        className="bg-blue-100 p-4 rounded-xl mb-4"
                        whileHover={{ 
                          rotate: [0, 5, -5, 5, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <Map className="text-blue-600 h-8 w-8" />
                      </motion.div>
                      <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">Denah Rumah Sakit</h2>
                      <p className="text-lg text-blue-600 max-w-2xl text-center">
                        Temukan lokasi dan fasilitas dengan mudah di lingkungan kami
                      </p>
                      <div className="w-24 h-1 bg-blue-400 mt-4 rounded-full"></div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 relative group"
                    >
                      {/* Interactive Map Container */}
                      <div className="relative w-full h-auto">
                        {contentGroups.map[0].images?.length > 0 && (
                          <>
                            <motion.img
                              src={APP_CONFIG.API_BASE_URL_ASSETS + contentGroups.map[0].images[0].path}
                              alt={contentGroups.map[0].title || "Denah Rumah Sakit"}
                              className="w-full h-auto max-h-[800px] object-contain"
                              initial={{ opacity: 0, scale: 1.02 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.8 }}
                              viewport={{ once: true }}
                              loading="lazy"
                            />
                            
                            {/* Map Navigation Controls (Example) */}
                            <div className="absolute bottom-6 right-6 flex gap-2">
                              <button 
                                className="bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                                aria-label="Zoom in"
                              >
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                              </button>
                              <button 
                                className="bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                                aria-label="Zoom out"
                              >
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="p-8 md:p-12 bg-gradient-to-b from-blue-50 to-white">
                        <div className="max-w-4xl mx-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mb-8"
                          >
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                              {contentGroups.map[0].title || "Denah Lengkap Rumah Sakit"}
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                              {contentGroups.map[0].excerpt || "Temukan semua fasilitas dan ruangan di rumah sakit kami dengan denah interaktif ini."}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                          >
                            {[
                              { name: "IGD", color: "bg-red-500" },
                              { name: "Radiologi", color: "bg-blue-500" },
                              { name: "Laboratorium", color: "bg-yellow-500" },
                              { name: "Apotek", color: "bg-green-500" },
                            ].map((location, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                              >
                                <div className={`w-3 h-3 rounded-full ${location.color} mr-3`}></div>
                                <span className="text-gray-700">{location.name}</span>
                              </motion.div>
                            ))}
                          </motion.div>

                          <div className="flex flex-wrap justify-center gap-4">
                            <a
                              href={APP_CONFIG.API_BASE_URL_ASSETS + contentGroups.map[0].images[0].path}
                              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                              Download Denah
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {contentGroups.handwash.length > 0 && (
                  <motion.div
                    key="handwash"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    className="mb-16"
                  >
                    <div className="flex items-center mb-8">
                      <motion.div 
                        className="bg-blue-100 p-3 rounded-lg mr-4"
                        whileHover={{ rotate: 10 }}
                      >
                        <ClipboardList className="text-blue-600 h-6 w-6" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-blue-900">Panduan Cuci Tangan</h2>
                    </div>

                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    >
                      {contentGroups.handwash[0].images && (
                        <div className="relative h-96 overflow-hidden">
                          <motion.img
                            src={APP_CONFIG.API_BASE_URL_ASSETS + contentGroups.handwash[0].images[0].path}
                            alt={contentGroups.handwash[0].title}
                            className="w-full h-full object-contain"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      <div className="p-8">
                        <div className="prose max-w-none">
                          <h3 className="text-2xl font-bold text-blue-900 mb-4">
                            {contentGroups.handwash[0].title}
                          </h3>
                          <div 
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{ __html: contentGroups.handwash[0].content }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })()}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blue-500 opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-blue-400 opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />
          
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Butuh Bantuan Medis?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Tim medis kami siap memberikan pelayanan terbaik untuk kesehatan Anda dan keluarga.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="/jadwal-dokter/hari-ini"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Lihat Jadwal Dokter <CalendarClock className="ml-2 h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </LayoutGuest>
  );
};

export default Dashboard;