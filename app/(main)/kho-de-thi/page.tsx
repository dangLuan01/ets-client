'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { examService } from "@/services/examService";
import { FilterOption } from "@/types/filter";

interface ExamListItem {
  id: number;
  title: string;
  year: number;
  total_time: number;
  total_question: number;
  thumbnail: string;
}

// exams sẽ lấy từ API

const ExamCard = ({ exam }: { exam: ExamListItem }) => {
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
      <div className="relative rounded-t-2xl overflow-hidden aspect-[16/10]">
        <Image src={exam.thumbnail} alt={exam.title} fill style={{objectFit: 'cover'}} className="group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-4">
        <h4 className="font-black text-slate-900 mb-2 h-12 group-hover:text-indigo-600 transition">{exam.title}</h4>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-4">
          <span><i className="far fa-clock mr-1 text-indigo-500"></i> {exam.total_time} phút</span>
          <span><i className="far fa-question-circle mr-1 text-indigo-500"></i> {exam.total_question} câu</span>
        </div>
        <Link href={`/test/${exam.id}`}>
          <button className="w-full font-bold py-3 rounded-lg transition-all duration-300 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white">Vào thi ngay</button>
        </Link>
      </div>
    </div>
  )
}

const FilterCheckbox = ({ label }: { label: string }) => (
    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
        <input type="checkbox" className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
        {label}
    </label>
)

const ExamListRow = ({ exam }: { exam: ExamListItem }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 hover:shadow-lg hover:shadow-indigo-100/50 transition-all flex gap-4 items-center group">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={exam.thumbnail} alt={exam.title} fill style={{objectFit: 'cover'}} className="group-hover:scale-110 transition duration-500" />
      </div>
      <div className="flex-1">
        <h4 className="font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition">{exam.title}</h4>
        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 font-bold">
          <span><i className="far fa-clock text-indigo-500 mr-1"></i>{exam.total_time} phút</span>
          <span><i className="far fa-question-circle text-indigo-500 mr-1"></i>{exam.total_question} câu</span>
        </div>
      </div>
      <Link href={`/test/${exam.id}`}>
        <button className="font-bold py-2 px-6 rounded-lg transition-all duration-300 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white whitespace-nowrap">Vào thi ngay</button>
      </Link>
    </div>
  );
}

const KhoDeThiPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterPreset, setFilterPreset] = useState<string>('all');
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [examList, setExamList] = useState<ExamListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFilters = async () => {
      const filterData = await examService.getFilterStructure();
      if (filterData) {
        setFilters(filterData);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const params: any = {
          limit,
          page,
          search,
        };
        if (selectedCategories.length > 0) {
          params.category_id = selectedCategories;
        }
        const res = await examService.filterExams(params);
        setExamList(res?.data?.response || []);
        setTotalPages(res?.data?.pagination?.total_pages || 1);
      } catch (e) {
        setExamList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, [limit, page, search, selectedCategories]);

  const filterPresets = [
    { id: 'all', label: '📚 Tất cả đề', icon: 'fa-th' },
    { id: 'newest', label: '✨ Mới nhất', icon: 'fa-flame' },
    { id: 'popular', label: '🔥 Phổ biến', icon: 'fa-star' },
    { id: 'easy', label: '😊 Đề dễ', icon: 'fa-arrow-down' },
    { id: 'hard', label: '💪 Đề khó', icon: 'fa-arrow-up' },
  ];

  const handleCategoryChange = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearch('');
    setPage(1);
  };

  return (
      <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
        
        <section className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-3">Kho Đề Thi TOEIC</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Luyện tập với hàng trăm bộ đề thi thử được cập nhật liên tục, bám sát cấu trúc đề thi thật nhất.
            </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-lg mb-6">Lọc đề thi</h3>
                  
                  {/* Search */}
                  <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder="Tìm tên đề thi..."
                        className="w-full text-sm pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={search}
                        onChange={handleSearchChange}
                      />
                      <i className="fas fa-search absolute left-3.5 top-3.5 text-slate-400"></i>
                  </div>

                  {filters.map(filterGroup => (
                    <div key={filterGroup.id} className="space-y-3 mb-6">
                      <h4 className="font-bold text-sm uppercase text-slate-400">{filterGroup.name}</h4>
                      {filterGroup.children?.map(option => (
                        <label key={option.id} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            checked={selectedCategories.includes(option.id)}
                            onChange={() => handleCategoryChange(option.id)}
                          />
                          {option.name}
                        </label>
                      ))}
                    </div>
                  ))}
                  
                  <button className="w-full text-sm text-indigo-600 font-bold hover:underline" onClick={handleClearFilters}>Xóa tất cả bộ lọc</button>
              </div>
            </aside>

            {/* Exam List */}
            <div className="lg:col-span-9">
              {/* Filter Presets */}
              <div className="mb-6 overflow-x-auto pb-2">
                <div className="flex gap-2">
                  {filterPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setFilterPreset(preset.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        filterPreset === preset.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                          : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort & View Controls */}
              <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
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

              {/* Content Area */}
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {examList.map(exam => <ExamCard key={exam.id} exam={exam} />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {examList.map(exam => <ExamListRow key={exam.id} exam={exam} />)}
                </div>
              )}

               {/* Pagination */}
              <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-500 bg-white p-1 rounded-xl border border-slate-200/80">
                    <button
                      className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition"
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      disabled={page === 1}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(p => (
                      <button
                        key={p}
                        className={`px-3 py-1.5 w-8 rounded-lg transition ${page === p ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'hover:bg-slate-100'}`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                    {totalPages > 5 && <span className="px-2">...</span>}
                    {totalPages > 5 && (
                      <button
                        className="px-3 py-1.5 w-8 hover:bg-slate-100 rounded-lg transition"
                        onClick={() => setPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    )}
                    <button
                      className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition"
                      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                      disabled={page === totalPages}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
              </div>
            </div>
        </div>
      </main>
    );
}

export default KhoDeThiPage;