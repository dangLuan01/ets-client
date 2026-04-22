"use client";

import { formatDateVN } from '@/utils/helper';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Post, Pagination } from '@/types/post';

const textColors = [
    "text-emerald-600", "text-indigo-600", "text-violet-600", "text-amber-600", "text-yellow-600",
    "text-lime-600", "text-green-600", "text-teal-600", "text-cyan-600", "text-sky-600",
];

interface PostListProps {
    posts: Post[];
    pagination: Pagination | null;
    isLoading: boolean;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, pagination, isLoading, currentPage, onPageChange }) => {
    const [isClient, setIsClient] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > (pagination?.total_pages || 1) || newPage === currentPage) {
            return;
        }
        if (listRef.current) {
            // Find the top of the whole page container to scroll to
            const mainContent = listRef.current.closest('main');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onPageChange(newPage);
    };

    const renderPageNumbers = () => {
        if (!pagination) return null;

        const pages = [];
        const totalPages = pagination.total_pages;
        
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={isLoading}
                    className={`px-4 py-2 mx-1 rounded-lg transition ${currentPage === i ? 'bg-indigo-600 text-white' : 'bg-slate-50 hover:bg-indigo-100'}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    }

    return (
        <div ref={listRef}>
            <div className="space-y-12 min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    posts?.length > 0 ? (
                        posts.map((post, index) => (
                            <article key={post.slug} className="flex flex-col md:flex-row gap-6 md:items-center group cursor-pointer">
                                <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden flex-shrink-0 border border-slate-50 shadow-sm">
                                    <Image
                                        src={post.thumbnail_url}
                                        alt={post.name}
                                        width={192}
                                        height={128}
                                        className="w-full h-full object-cover transition group-hover:scale-105"
                                        key={post.slug + '-img'}
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                                        <span className={textColors[index % textColors.length]}>{post.tags[0].name}</span>
                                        <span>•</span>
                                        <span>{isClient ? formatDateVN(post.updated_at) : '...'}</span>
                                    </div>
                                    <Link href={`/bai-viet/${post.slug}`}>
                                        <h4 className="text-xl font-black group-hover:text-indigo-600 transition leading-tight">{post.name}</h4>
                                    </Link>
                                    <p className="text-slate-500 text-sm line-clamp-2">{post.summary}</p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="text-center text-slate-500">Không tìm thấy bài viết nào.</div>
                    )
                )}
            </div>

            <div className="mt-16 flex justify-center items-center">
                {pagination && pagination.total_pages > 1 && (
                    <nav className="flex items-center font-bold">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={!pagination.has_prev || isLoading}
                            className="px-4 py-2 mx-1 rounded-lg bg-slate-50 hover:bg-indigo-100 disabled:opacity-50"
                        >
                           Trang trước
                        </button>
                        
                        {renderPageNumbers()}

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={!pagination.has_next || isLoading}
                            className="px-4 py-2 mx-1 rounded-lg bg-slate-50 hover:bg-indigo-100 disabled:opacity-50"
                        >
                            Trang sau
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default PostList;
