import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/Types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { route } from 'ziggy-js';


interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    images: string[];
    published_at: string;
}

interface EducationProps extends PageProps {
    articles: Article[];
    contentTypes: Record<string, string>;
}

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
        scale: 1.02,
        transition: { duration: 0.2 }
    }
};

export default function Education({ articles, contentTypes, auth }: EducationProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <GuestLayout user={auth.user}>
            <Head title="Edukasi Kesehatan" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold text-blue-900 mb-4">Edukasi Kesehatan</h1>
                        <p className="text-lg text-blue-600 max-w-3xl mx-auto">
                            Informasi dan artikel kesehatan terkini untuk meningkatkan pengetahuan Anda tentang kesehatan
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg
                                className="absolute right-3 top-3 h-6 w-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </motion.div>

                    {filteredArticles.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredArticles.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                                    >
                                        <Link href={route('guest.education.show', article.id)}>
                                            {article.images.length > 0 && (
                                                <div className="h-48 overflow-hidden">
                                                    <motion.img
                                                        src={article.images[0]}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        {contentTypes.education}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {article.published_at}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {article.excerpt}
                                                </p>
                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    className="text-blue-600 font-medium inline-flex items-center"
                                                >
                                                    Baca selengkapnya
                                                    <svg
                                                        className="w-4 h-4 ml-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 bg-white rounded-xl shadow"
                        >
                            <div className="mx-auto h-24 w-24 text-blue-400 mb-4">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Artikel tidak ditemukan
                            </h3>
                            <p className="text-gray-500">
                                Tidak ada artikel yang sesuai dengan pencarian Anda
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}