import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Link, Head } from '@inertiajs/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  UserCircle,
  Menu,
  X,
  ChevronRight,
  Check,
  ChevronDown
} from 'lucide-react';
import { route } from 'ziggy-js';

const LayoutGuest = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSchedule, setHoveredSchedule] = useState(false);
  const [mobileScheduleOpen, setMobileScheduleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>(0322) 322834</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Jl. Jaksa Agung Suprapto No.76, Sarirejo, Sukorejo, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62215</span>
              <span className="sm:hidden">Lamongan, Jawa Timur</span>
            </div>
          </div>
          {user ? (
            <Link href="/admin/dashboard" className="flex items-center text-sm hover:text-blue-200 transition-colors">
              <UserCircle className="mr-2 h-4 w-4" />
              {user.name}
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link href="/login" className="text-sm hover:text-blue-200 transition-colors">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md relative">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/assets/logo.webp"
                alt="RS Muhammadiyah Lamongan"
                className="h-12"
              />
              <span className="ml-3 text-xl font-bold text-blue-900">
                RS Muhammadiyah Lamongan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                href="/"
                className="text-blue-900 font-medium hover:text-blue-600 transition-colors duration-300 relative group"
              >
                Beranda
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Jadwal Dropdown */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setHoveredSchedule(true)}
                onMouseLeave={() => setHoveredSchedule(false)}
              >
                <button className="text-blue-900 font-medium hover:text-blue-600 transition-colors duration-300 flex items-center">
                  Jadwal
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredSchedule ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transition-all duration-300 origin-top ${hoveredSchedule ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                  <div className="py-1">
                    <Link 
                      href={route('doctors.today')}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Jadwal Dokter Hari Ini
                    </Link>
                    <Link 
                      href={route('guest.doctors.index')} 
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Cari Dokter
                    </Link>
                  </div>
                </div>
              </div>

              {/* Edukasi Kesehatan Link */}
              <Link
                href={route('guest.education.index')}
                className="text-blue-900 font-medium hover:text-blue-600 transition-colors duration-300 relative group"
              >
                Edukasi Kesehatan
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none text-blue-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} transition-all duration-150`}>
            <div className="pt-4 pb-2 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              
              {/* Mobile Jadwal Dropdown */}
              <div className="relative">
                <button 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center"
                  onClick={() => setMobileScheduleOpen(!mobileScheduleOpen)}
                >
                  Jadwal
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileScheduleOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`pl-4 ${mobileScheduleOpen ? 'block' : 'hidden'} transition-all duration-150`}>
                  <Link 
                    href={route('doctors.today')} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jadwal Dokter Hari Ini
                  </Link>
                  <Link 
                    href={route('guest.doctors.index')}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cari Dokter
                  </Link>
                </div>
              </div>

              {/* Mobile Edukasi Kesehatan Link */}
              <Link
                href={route('guest.education.index')}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Edukasi Kesehatan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
              <p className="mb-4">
                Rumah Sakit Muhammadiyah Lamongan memberikan pelayanan kesehatan terbaik dengan
                mengutamakan kepuasan pasien.
              </p>
            </div>

            <div className="animate-fade-in delay-100">
              <h3 className="text-xl font-bold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li className="flex items-start group">
                  <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <a className="hover:text-blue-300 transition-colors">
                    Rawat Jalan
                  </a>
                </li>
                <li className="flex items-start group">
                  <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <a className="hover:text-blue-300 transition-colors">
                    Rawat Inap
                  </a>
                </li>
                <li className="flex items-start group">
                  <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <a className="hover:text-blue-300 transition-colors">
                    IGD 24 Jam
                  </a>
                </li>
                <li className="flex items-start group">
                  <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <a className="hover:text-blue-300 transition-colors">
                    Laboratorium
                  </a>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in delay-200">
              <h3 className="text-xl font-bold mb-4">Informasi</h3>
              <ul className="space-y-2">
                <li className="flex items-start group">
                  <ChevronRight className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <Link href={route('doctors.today')} className="hover:text-blue-300 transition-colors">
                    Jadwal Dokter
                  </Link>
                </li>
                <li className="flex items-start group">
                  <ChevronRight className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <a className="hover:text-blue-300 transition-colors">
                    Tarif Layanan
                  </a>
                </li>
                <li className="flex items-start group">
                  <ChevronRight className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <Link href={route('guest.education.index')} className="hover:text-blue-300 transition-colors">
                    Edukasi Kesehatan
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in delay-300">
              <h3 className="text-xl font-bold mb-4">Kontak</h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <span>Jl. Jaksa Agung Suprapto No.76, Sarirejo, Sukorejo, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62215</span>
                </li>
                <li className="flex items-center group">
                  <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <span>(0322) 322834</span>
                </li>
                <li className="flex items-center group">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
                  <span>Buka 24 Jam Setiap Hari</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-6 text-center animate-fade-in">
            <p>&copy; {new Date().getFullYear()} Rumah Sakit Muhammadiyah Lamongan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutGuest;