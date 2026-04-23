'use client';

import Link from "next/link";
import { useState, useCallback, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

interface ExamListItem {
  id: number;
  title: string;
  cert_slug: string;
  year: number;
  total_time: number;
  total_question: number;
  thumbnail: string;
}

interface FilterOption {
  id: number;
  name: string;
  children?: FilterOption[];
}

interface ExamPageClientProps {
  initialExams: ExamListItem[];
  totalPages: number;
  totalItems: number;
  filters: FilterOption[];
  currentPage: number;
  currentSearch: string;
  selectedCategories: number[];
}

// Exam Card Component - Grid view
const ExamCard = ({ exam }: { exam: ExamListItem }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
      <div className="relative rounded-t-2xl overflow-hidden aspect-[16/10]">
        <img 
          src={exam.thumbnail} 
          alt={exam.title} 
          style={{objectFit: "cover"}} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </div>
      <div className="p-4">
        <h4 className="font-black text-slate-900 mb-2 h-12 group-hover:text-indigo-600 transition">
          {exam.title}
        </h4>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-4">
          <span><i className="far fa-clock mr-1 text-indigo-500"></i> {exam.total_time} phút</span>
          <span><i className="far fa-question-circle mr-1 text-indigo-500"></i> {exam.total_question} câu</span>
        </div>
        <Link href={`/test/${exam.cert_slug}/${exam.id}`}>
          <button className="w-full font-bold py-3 rounded-lg transition-all duration-300 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white">
            Vào thi ngay
          </button>
        </Link>
      </div>
    </div>
  )
}

// Exam Row Component - List view
const ExamListRow = ({ exam }: { exam: ExamListItem }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 hover:shadow-lg hover:shadow-indigo-100/50 transition-all flex gap-4 items-center group">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={exam.thumbnail} 
          alt={exam.title} 
          style={{objectFit: "cover"}} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </div>
      <div className="flex-1">
        <h4 className="font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition">
          {exam.title}
        </h4>
        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 font-bold">
          <span><i className="far fa-clock text-indigo-500 mr-1"></i>{exam.total_time} phút</span>
          <span><i className="far fa-question-circle text-indigo-500 mr-1"></i>{exam.total_question} câu</span>
        </div>
      </div>
      <Link href={`/test/${exam.cert_slug}/${exam.id}`}>
        <button className="font-bold py-2 px-6 rounded-lg transition-all duration-300 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white whitespace-nowrap">
          Vào thi ngay
        </button>
      </Link>
    </div>
  );
}

// Main Client Component
const ExamPageClient = ({ 
  initialExams, 
  totalPages, 
  totalItems,
  filters, 
  currentPage,
  currentSearch,
  selectedCategories 
}: ExamPageClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local UI state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // URL-based filters for SSR
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [checkedCategories, setCheckedCategories] = useState<number[]>(selectedCategories);
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // URL update function (no debounce)
  const updateURL = useCallback((newSearch?: string, newCategories?: number[], newPage?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear old params
    params.delete('search');
    params.delete('category');
    params.delete('page');
    
    // Set new params
    const search = newSearch ?? searchInput;
    const categories = newCategories ?? checkedCategories;
    const page = newPage ?? 1;
    
    if (search.trim()) {
      params.set('search', search.trim());
    }
    
    categories.forEach(id => {
      params.append('category', String(id));
    });
    
    if (page > 1) {
      params.set('page', String(page));
    }
    
    // Trigger server-side re-fetch via URL navigation
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [searchParams, router, searchInput, checkedCategories]);

  // Debounced search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    
    // Update input immediately for better UX
    setSearchInput(newSearch);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Debounce the API call (800ms delay)
    debounceTimer.current = setTimeout(() => {
      updateURL(newSearch, checkedCategories, 1); // Reset to page 1 on search
    }, 800);
  };
  
  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Category filter handler
  const handleCategoryChange = (id: number) => {
    const newCategories = checkedCategories.includes(id)
      ? checkedCategories.filter(cid => cid !== id)
      : [...checkedCategories, id];
    
    setCheckedCategories(newCategories);
    updateURL(searchInput, newCategories, 1); // Reset to page 1 on filter change
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchInput('');
    setCheckedCategories([]);
    updateURL('', [], 1);
  };

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    updateURL(searchInput, checkedCategories, newPage);
  };

  // Filter presets
  const filterPresets = [
    { id: 'all', label: '📚 Tất cả đề', icon: 'fa-th' },
    { id: 'newest', label: '✨ Mới nhất', icon: 'fa-flame' },
    { id: 'popular', label: '🔥 Phổ biến', icon: 'fa-star' },
  ];

  const [selectedPreset, setSelectedPreset] = useState('all');

  return (
    <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
      {/* Header */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3">Kho Đề Thi TOEIC</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Luyện tập với hàng trăm bộ đề thi thử được cập nhật liên tục, bám sát cấu trúc đề thi thật nhất.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Lọc đề thi</h3>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Tìm tên đề thi..."
                className="w-full text-sm pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchInput}
                onChange={handleSearchChange}
                disabled={isPending}
              />
              <i className="fas fa-search absolute left-3.5 top-3.5 text-slate-400"></i>
            </div>

            {/* Category Filters */}
            {filters.map(filterGroup => (
              <div key={filterGroup.id} className="space-y-3 mb-6">
                <h4 className="font-bold text-sm uppercase text-slate-400">{filterGroup.name}</h4>
                {filterGroup.children?.map(option => (
                  <label key={option.id} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      checked={checkedCategories.includes(option.id)}
                      onChange={() => handleCategoryChange(option.id)}
                      disabled={isPending}
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            ))}
            
            {/* Clear Filters Button */}
            <button 
              className="w-full text-sm text-indigo-600 font-bold hover:underline disabled:opacity-50"
              onClick={handleClearFilters}
              disabled={isPending}
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9">
          {/* Filter Presets */}
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex gap-2">
              {filterPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedPreset === preset.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
            {/* Sort Buttons */}
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white p-1 rounded-xl border border-slate-200/80">
              <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm">Mới nhất</button>
              <button className="px-4 py-1.5 hover:bg-slate-100 rounded-lg transition">Phổ biến</button>
              <button className="px-4 py-1.5 hover:bg-slate-100 rounded-lg transition">Rating</button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 text-sm font-bold text-slate-500 bg-white p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'hover:bg-slate-100'}`}
                title="Grid View"
              >
                <i className="fas fa-th"></i>
              </button>
              <div className="w-px h-5 bg-slate-200"></div>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'hover:bg-slate-100'}`}
                title="List View"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isPending && (
            <div className="fixed inset-0 bg-black/10 rounded-lg flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 bg-white/50"></div>
            </div>
          )}

          {/* Exam List - Grid or List View */}
          {initialExams.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {initialExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {initialExams.map(exam => <ExamListRow key={exam.id} exam={exam} />)}
              </div>
            )
          ) : (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-slate-500 text-lg">Không tìm thấy đề thi nào</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-1 text-sm font-bold text-slate-500 bg-white p-1 rounded-xl border border-slate-200/80">
                {/* Previous button */}
                <button
                  className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isPending}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => currentPage + i - 2)
                  .filter(p => p > 0 && p <= totalPages)
                  .map(p => (
                    <button
                      key={p}
                      className={`px-3 py-1.5 w-8 rounded-lg transition ${
                        currentPage === p 
                          ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                          : 'hover:bg-slate-100'
                      }`}
                      onClick={() => handlePageChange(p)}
                      disabled={isPending}
                    >
                      {p}
                    </button>
                  ))}

                {/* Ellipsis and last page */}
                {totalPages > 5 && currentPage < totalPages - 3 && (
                  <>
                    <span className="px-2">...</span>
                    <button
                      className="px-3 py-1.5 w-8 hover:bg-slate-100 rounded-lg transition"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={isPending}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {/* Next button */}
                <button
                  className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isPending}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ExamPageClient;
