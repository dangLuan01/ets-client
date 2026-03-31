'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { examService } from "@/services/examService";
import { FilterOption } from "@/types/filter";

const exams = [
  {
    id: 1,
    title: "ETS TOEIC 2026 - Test 01",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    tags: ["Full Test", "ETS 2026", "Free"],
    views: "12.5k",
    rating: 5,
    status: 'completed',
    score: 850
  },
  {
    id: 2,
    title: "Hacker TOEIC Vol 3 - Test 05",
    imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=400",
    tags: ["Full Test", "Hacker", "Mới"],
    views: "5.2k",
    rating: 4,
    status: 'not_started'
  },
    {
    id: 3,
    title: "ETS TOEIC 2026 - Test 02",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
    tags: ["Full Test", "ETS 2026"],
    views: "22k",
    rating: 5,
    status: 'in_progress',
    progress: 40
  },
  {
    id: 4,
    title: "Part 5 - Mini Drill #3",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400",
    tags: ["Part 5", "Mini Test"],
    views: "3.1k",
    rating: 4,
    status: 'not_started'
  },
  {
    id: 5,
    title: "ETS TOEIC 2025 - Test 10",
    imageUrl: "https://images.unsplash.com/photo-1588196749107-15d05b140b69?auto=format&fit=crop&q=80&w=400",
    tags: ["Full Test", "ETS 2025"],
    views: "35k",
    rating: 5,
    status: 'completed',
    score: 780
  },
];

const ExamCard = ({ exam }: { exam: typeof exams[0] }) => {
  
  const getStatusUI = () => {
    switch (exam.status) {
      case 'completed':
        return {
          buttonText: 'Xem lại & Luyện tập',
          buttonClass: 'bg-green-100 text-green-800 group-hover:bg-green-600 group-hover:text-white',
          badge: <div className="absolute top-3 right-3 text-xs font-bold bg-green-600/80 text-white px-2 py-1 rounded-md shadow-lg backdrop-blur-sm">Đã hoàn thành: {exam.score}/990</div>
        };
      case 'in_progress':
        return {
          buttonText: 'Làm tiếp',
          buttonClass: 'bg-amber-100 text-amber-800 group-hover:bg-amber-500 group-hover:text-white',
          badge: <div className="absolute w-full bottom-0 left-0 h-1.5 bg-amber-500 rounded-b-2xl">
                   <div className="h-full bg-amber-300" style={{width: `${exam.progress}%`}}></div>
                 </div>
        };
      default: // not_started
        return {
          buttonText: 'Vào thi ngay',
          buttonClass: 'bg-slate-50 text-slate-900 group-hover:bg-indigo-600 group-hover:text-white',
          badge: null
        };
    }
  }

  const { buttonText, buttonClass, badge } = getStatusUI();
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
      <div className="relative rounded-t-2xl overflow-hidden aspect-[16/10]">
        <Image src={exam.imageUrl} alt={exam.title} fill style={{objectFit: 'cover'}} className="group-hover:scale-105 transition duration-500" />
        {badge}
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {exam.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
        <h4 className="font-black text-slate-900 mb-2 h-12 group-hover:text-indigo-600 transition">{exam.title}</h4>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-4">
          <span><i className="far fa-user mr-1 text-indigo-500"></i> {exam.views} lượt thi</span>
          <div className="flex text-yellow-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < exam.rating ? '' : 'text-slate-200'}`}></i>
              ))}
          </div>
        </div>
        <Link href={`/test/${exam.id}`}>
          <button className={`w-full font-bold py-3 rounded-lg transition-all duration-300 ${buttonClass}`}>{buttonText}</button>
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

const ExamListRow = ({ exam }: { exam: typeof exams[0] }) => {
  const getStatusUI = () => {
    switch (exam.status) {
      case 'completed':
        return {
          statusBadge: <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">✓ Đã hoàn thành: {exam.score}/990</span>,
          buttonText: 'Xem lại & Luyện tập',
          buttonClass: 'bg-green-100 text-green-800 hover:bg-green-600 hover:text-white'
        };
      case 'in_progress':
        return {
          statusBadge: <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold">⏳ Đang làm ({exam.progress}%)</span>,
          buttonText: 'Làm tiếp',
          buttonClass: 'bg-amber-100 text-amber-800 hover:bg-amber-500 hover:text-white'
        };
      default:
        return {
          statusBadge: <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">Chưa làm</span>,
          buttonText: 'Vào thi ngay',
          buttonClass: 'bg-slate-50 text-slate-900 hover:bg-indigo-600 hover:text-white'
        };
    }
  }

  const { statusBadge, buttonText, buttonClass } = getStatusUI();

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 hover:shadow-lg hover:shadow-indigo-100/50 transition-all flex gap-4 items-center group">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={exam.imageUrl} alt={exam.title} fill style={{objectFit: 'cover'}} className="group-hover:scale-110 transition duration-500" />
      </div>
      <div className="flex-1">
        <div className="flex gap-2 mb-2">
          {exam.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
        <h4 className="font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition">{exam.title}</h4>
        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 font-bold">
          <span><i className="far fa-user text-indigo-500 mr-1"></i>{exam.views} lượt thi</span>
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star text-[10px] ${i < exam.rating ? '' : 'text-slate-200'}`}></i>
            ))}
          </div>
          <span className="text-slate-400">({exam.rating}/5)</span>
        </div>
        <div>{statusBadge}</div>
      </div>
      <Link href={`/test/${exam.id}`}>
        <button className={`font-bold py-2 px-6 rounded-lg transition-all duration-300 ${buttonClass} whitespace-nowrap`}>{buttonText}</button>
      </Link>
    </div>
  );
}

const KhoDeThiPage = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterPreset, setFilterPreset] = useState<string>('all');
    const [filters, setFilters] = useState<FilterOption[]>([]);

    useEffect(() => {
      const fetchFilters = async () => {
        const filterData = await examService.getFilterStructure();
        if (filterData) {
          setFilters(filterData);
        }
      };
      fetchFilters();
    }, []);

    const filterPresets = [
        { id: 'all', label: '📚 Tất cả đề', icon: 'fa-th' },
        { id: 'newest', label: '✨ Mới nhất', icon: 'fa-flame' },
        { id: 'popular', label: '🔥 Phổ biến', icon: 'fa-star' },
        { id: 'easy', label: '😊 Đề dễ', icon: 'fa-arrow-down' },
        { id: 'hard', label: '💪 Đề khó', icon: 'fa-arrow-up' },
    ];

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
                      <input type="text" placeholder="Tìm tên đề thi..." className="w-full text-sm pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <i className="fas fa-search absolute left-3.5 top-3.5 text-slate-400"></i>
                  </div>

                  {filters.map(filterGroup => (
                    <div key={filterGroup.id} className="space-y-3 mb-6">
                      <h4 className="font-bold text-sm uppercase text-slate-400">{filterGroup.name}</h4>
                      {filterGroup.children?.map(option => (
                        <FilterCheckbox key={option.id} label={option.name} />
                      ))}
                    </div>
                  ))}
                  
                  <button className="w-full text-sm text-indigo-600 font-bold hover:underline">Xóa tất cả bộ lọc</button>
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
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {exams.map(exam => <ExamListRow key={exam.id} exam={exam} />)}
                </div>
              )}

               {/* Pagination */}
              <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-500 bg-white p-1 rounded-xl border border-slate-200/80">
                      <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition"><i className="fas fa-chevron-left"></i></button>
                      <button className="px-3 py-1.5 w-8 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm">1</button>
                      <button className="px-3 py-1.5 w-8 hover:bg-slate-100 rounded-lg transition">2</button>
                      <button className="px-3 py-1.5 w-8 hover:bg-slate-100 rounded-lg transition">3</button>
                      <span className="px-2">...</span>
                       <button className="px-3 py-1.5 w-8 hover:bg-slate-100 rounded-lg transition">10</button>
                      <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg transition"><i className="fas fa-chevron-right"></i></button>
                  </div>
              </div>
            </div>
        </div>
      </main>
    );
}

export default KhoDeThiPage;