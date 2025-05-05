import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/Types/types';
import { motion } from 'framer-motion';
import { route } from 'ziggy-js';
import { useEffect } from 'react';

interface Article {
    id: number;
    title: string;
    content: string;
    images: string[];
    published_at: string;
    type: string;
}

interface RelatedArticle {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
}

interface EducationShowProps extends PageProps {
    article: Article;
    relatedArticles: RelatedArticle[];
}

export default function EducationShow({ article, relatedArticles, auth }: EducationShowProps) {
    // Efek untuk menambahkan styling khusus ke konten CKEditor
    useEffect(() => {
        const styleContent = () => {
            const contentElement = document.querySelector('.ck-content');
            if (contentElement) {
                contentElement.querySelectorAll('ul, ol').forEach(list => {
                    list.classList.add('my-4', 'space-y-2', 'pl-6');
                });

                contentElement.querySelectorAll('li').forEach(item => {
                    item.classList.add(
                        'relative',
                        'pl-6',
                        'before:content-[""]',
                        'before:absolute',
                        'before:left-0',
                        'before:top-2',
                        'before:w-2',
                        'before:h-2',
                        'before:bg-blue-500',
                        'before:rounded-full',
                        'ml-4'
                    );
                });
                

                // Style untuk paragraf
                contentElement.querySelectorAll('p').forEach(p => {
                    p.classList.add('my-4', 'leading-relaxed', 'text-gray-700');
                });

                // Style untuk heading
                contentElement.querySelectorAll('h2, h3, h4').forEach(heading => {
                    heading.classList.add('mt-8', 'mb-4', 'font-bold', 'text-gray-900');
                    if (heading.tagName === 'H2') {
                        heading.classList.add('text-2xl');
                    } else if (heading.tagName === 'H3') {
                        heading.classList.add('text-xl');
                    }
                });

                // Style untuk gambar
                contentElement.querySelectorAll('img').forEach(img => {
                    img.classList.add('rounded-lg', 'shadow-md', 'my-6', 'mx-auto', 'max-w-full');
                });
            }
        };

        const timer = setTimeout(styleContent, 100);
        return () => clearTimeout(timer);
    }, [article.content]);

    return (
        <GuestLayout user={auth.user}>
            <Head title={article.title} />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4"
                        >
                            {article.type}
                        </motion.span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {article.title}
                        </h1>
                        <div className="flex items-center justify-center space-x-2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Dipublikasikan pada {article.published_at}</span>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {article.images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8 rounded-xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={article.images[0]}
                                    alt={article.title}
                                    className="w-full h-auto max-h-96 object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-xl shadow-sm"
                        >
                            <div 
                                className="ck-content"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 bg-blue-50 rounded-xl p-6 text-center"
                        >
                            <h3 className="text-xl font-bold text-blue-800 mb-3">Informasi Lebih Lanjut</h3>
                            <p className="text-gray-700 mb-4">Untuk pertanyaan lebih lanjut tentang topik ini, silakan hubungi layanan kesehatan kami.</p>
                        </motion.div>

                        {relatedArticles.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-16"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Artikel Terkait
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedArticles.map((related) => (
                                        <motion.div
                                            key={related.id}
                                            whileHover={{ y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                                        >
                                            <Link href={route('guest.education.show', related.id)} className="block h-full">
                                                {related.image && (
                                                    <div className="h-40 overflow-hidden">
                                                        <img
                                                            src={related.image}
                                                            alt={related.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                        {related.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                                        {related.excerpt}
                                                    </p>
                                                    <div className="flex items-center text-blue-600 text-sm font-medium">
                                                        Baca selengkapnya
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}