import { motion } from "framer-motion";
import { GalleryVerticalEnd, Lock, User } from "lucide-react";
import { LoginForm } from "@/Components/Guest/Login/LoginForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export default function Login() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="flex-1 flex flex-col p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{ minHeight: '100vh' }}
      >
        <motion.div variants={item} className="flex justify-center md:justify-start mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="bg-white p-1 rounded-full"
            >
              <Avatar>
              <AvatarImage
                src='/assets/Logo.webp'
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              <AvatarFallback delayMs={200}>
                <img
                  src="/assets/Logo.webp"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
              </AvatarFallback>
            </Avatar>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Rumah Sakit
              </span>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Muhammadiyah Lamongan
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn}
          className="flex flex-1 items-center justify-center"
        >
          <div className="w-full max-w-sm space-y-6">

            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700"
            >
              <LoginForm />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex relative w-1/2 bg-muted overflow-hidden items-center justify-center"
      >
        <motion.div 
          className="relative h-full w-full flex items-center justify-center"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            src="/assets/wanita.webp"
            alt="Medical Professional"
            className="h-[70%] w-auto object-contain"
            style={{
              maxWidth: '70%',
              maxHeight: '70%'
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-600 mix-blend-multiply"
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-sm p-3 rounded-full"
        >
          <User className="h-5 w-5 text-gray-500" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, 0, -10] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute top-1/3 right-1/4 bg-white/10 backdrop-blur-sm p-3 rounded-full"
        >
          <Lock className="h-5 w-5 text-gray-500" />
        </motion.div>

        {/* Compact Floating Text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 left-8 right-8 text-gray-500 text-center"
        >
          <h2 className="text-xl font-bold mb-1">Sistem Informasi</h2>
          <p className="text-black/50 text-sm">
            Akses fitur dengan akun Anda
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}