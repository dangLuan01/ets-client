"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Post, Pagination } from '@/types/post';
import { postService } from '@/services/postService';
import PostList from './PostList';
import { Tag } from '@/types/tag';

interface BlogContainerProps {
    initialPosts: Post[];
    initialPagination: Pagination | null;
    initialTags: Tag[];
}

const BlogContainer: React.FC<BlogContainerProps> = ({ initialPosts, initialPagination, initialTags }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [pagination, setPagination] = useState<Pagination | null>(initialPagination);
    const [currentPage, setCurrentPage] = useState(initialPagination?.page || 1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState("updated_at");
    const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get('tag'));

    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            let data;
            if (selectedTag) {
                data = await postService.getPostByTag(10, currentPage, selectedTag);
            } else {
                data = await postService.getPost(10, currentPage, sortBy, debouncedSearchTerm);
            }
            
            if (data) {
                setPosts(data.response);
                setPagination(data.pagination);
            } else {
                setPosts([]);
                setPagination(null);
            }
            setIsLoading(false);
        };

        const isInitialState = currentPage === 1 && debouncedSearchTerm === '' && sortBy === 'updated_at' && selectedTag === null && !searchParams.get('tag');

        if (!isInitialState) {
            fetchPosts();
        } else {
            // On initial load, or when returning to initial state, use initialPosts
            setPosts(initialPosts);
            setPagination(initialPagination);
        }
    }, [currentPage, debouncedSearchTerm, sortBy, selectedTag, initialPosts, initialPagination, searchParams]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSetTag = (tag: string | null) => {
        const newSelectedTag = tag;
        setSelectedTag(newSelectedTag);
        setCurrentPage(1);

        const params = new URLSearchParams(searchParams.toString());
        if (newSelectedTag) {
            params.set('tag', newSelectedTag);
        } else {
            params.delete('tag');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Reset to page 1 when searching
    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            setCurrentPage(1);
        }
    }, [debouncedSearchTerm]);


    return (
        <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black uppercase tracking-tighter">Tất cả bài viết</h3>
                    <div className="flex gap-4 text-xs font-bold text-slate-400">
                        <button onClick={() => { setSortBy("updated_at"); setCurrentPage(1); }}
                            className={sortBy === 'updated_at' ? "text-indigo-600 underline" : "hover:text-slate-900"}
                        >
                            Mới nhất
                        </button>
                        <button onClick={() => { setSortBy("view_count"); setCurrentPage(1); }}
                            className={sortBy === 'view_count' ? "text-indigo-600 underline" : "hover:text-slate-900"}
                        >
                            Xem nhiều nhất
                        </button>
                    </div>
                </div>
                <PostList
                    posts={posts}
                    pagination={pagination}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

            <div className="lg:w-1/4 space-y-12">
                <div className="border-b border-slate-100 pb-8">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Tìm nhanh</h5>
                    <input 
                        type="text" 
                        placeholder="Gõ từ khóa..." 
                        className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 outline-none transition"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                
                {/* Other static sidebar content can be passed as children or rendered here */}
                <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Chuyên mục</h5>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleSetTag(null)}
                            className={selectedTag === null ? "px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold transition" : "px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition"}
                        >
                            Tất cả
                        </button>
                        {initialTags.map((tag) => (
                            <button
                                key={tag.slug}
                                onClick={() => handleSetTag(tag.slug)}
                                className={selectedTag === tag.slug ? "px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold transition" : "px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition"}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-4">
                    <h5 className="font-black text-lg leading-tight">Nhận đề thi mới qua Email</h5>
                    <p className="text-xs text-slate-400 font-medium">Chúng tôi gửi 1 bài thi thử miễn phí vào mỗi thứ 2.</p>
                    <input type="email" placeholder="Email của bạn" className="w-full bg-white rounded-xl px-4 py-3 text-sm border-none outline-none"/>
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl text-xs">ĐĂNG KÝ</button>
                </div>
            </div>
        </div>
    );
};

export default BlogContainer;
