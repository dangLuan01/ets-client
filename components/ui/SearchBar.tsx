'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, ChevronRight, Timer, FileText } from 'lucide-react';
import Link from 'next/link';
import { examService } from '@/services/examService';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

// Interface phù hợp với API response
interface ExamResult {
  id: number;
  title: string;
  slug: string;
  exam_type: string;
  cert_slug: string;
  year: number;
  total_time: number;
  total_question: number;
  thumbnail?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface SearchApiResponse {
  data: {
    pagination: PaginationInfo;
    response: ExamResult[];
  };
  message: string;
  status: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  apiEndpoint?: string;
}

export default function SearchBar({ 
  placeholder = "Tìm bộ đề ETS 2026, ngữ pháp Part 5...", 
  //onSearch,
  apiEndpoint = ""
}: SearchBarProps) {
  const [query, setQuery]                       = useState('');
  const [results, setResults]                   = useState<ExamResult[]>([]);
  const [pagination, setPagination]             = useState<PaginationInfo | null>(null);
  const [isOpen, setIsOpen]                     = useState(false);
  const [isLoading, setIsLoading]               = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches]     = useState<string[]>([]);
  
  const searchRef                               = useRef<HTMLDivElement>(null);
  const inputRef                                = useRef<HTMLInputElement>(null);
  const debounceRef                             = useRef<NodeJS.Timeout | null>(null);
  const router                                  = useRouter();
  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('toeic_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleSelectResult(results[highlightedIndex]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, highlightedIndex]);

  // ✅ Search với API thật
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setPagination(null);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        // ✅ Gọi API với query params
        const response: SearchApiResponse = await examService.searchExams(searchQuery, 6, 1);
        
        // ✅ Parse đúng cấu trúc API
        if (response.status === 'SUCCESS' && response.data?.response) {
          setResults(response.data.response);
          setPagination(response.data.pagination);
          setIsOpen(true);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [apiEndpoint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSelectResult = (result: ExamResult) => {
    // Save to recent searches
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('toeic_recent_searches', JSON.stringify(updated));
    }
    
    setQuery('');
    setIsOpen(false);

    let url: string = '';
    
    if (result.exam_type === "PRACTICE") {
        url = `/practice/${result.cert_slug}/${result.slug}`
    } else {
        url = `/test/${result.cert_slug}/${result.slug}`
    }
    router.push(url)
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setPagination(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Helper: Format thời gian
  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h${mins > 0 ? ` ${mins}p` : ''}`;
    }
    return `${minutes} phút`;
  };

  // Helper: Get badge color theo exam type
  const getExamTypeBadge = (type: string) => {
    const types: Record<string, { bg: string; text: string; label: string }> = {
      'FULL': { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Full Test' },
      'MINI': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Mini Test' },
      'PARTICE': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Part Practice' },
      'MOCK': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Mock Test' },
    };
    
    const config = types[type] || { bg: 'bg-slate-100', text: 'text-slate-700', label: type };
    return config;
  };

  return (
    <div ref={searchRef} className="relative w-full mx-auto">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500">
          <Search className="w-5 h-5" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-slate-200 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                     outline-none shadow-sm hover:shadow-md transition-all duration-200
                     placeholder:text-slate-400 text-slate-900"
          aria-label="Tìm kiếm đề thi"
          aria-expanded={isOpen}
          aria-controls="search-results"
          role="combobox"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Xóa tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div 
          id="search-results"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 
                     overflow-hidden animate-fade-in-up max-h-[70vh] overflow-y-auto"
        >
          {/* Results List */}
          {results.length > 0 ? (
            <ul className="py-2">
              {/* Header với pagination info */}
              <li className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {pagination?.total_records || results.length} kết quả
                </span>
                {pagination?.has_next && (
                  <span className="text-[10px] text-slate-400">
                    Trang {pagination.page}/{pagination.total_pages}
                  </span>
                )}
              </li>
              
              {/* Result Items */}
              {results.map((result, index) => {
                const badgeConfig = getExamTypeBadge(result.exam_type);
                
                return (
                  <li key={result.id}>
                    <button
                      onClick={() => handleSelectResult(result)}
                      className={`
                        w-full flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors text-left
                        ${highlightedIndex === index ? 'bg-indigo-50' : 'hover:bg-slate-50'}
                      `}
                      role="option"
                      aria-selected={highlightedIndex === index}
                    >
                      {/* Thumbnail */}
                      {result.thumbnail && (
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                          <CldImage
                            src={result.thumbnail}
                            alt={result.title}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                            format='auto'
                            quality='auto'
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm text-slate-900 line-clamp-2 flex-1">
                            {highlightText(result.title, query)}
                          </h4>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full whitespace-nowrap ${badgeConfig.bg} ${badgeConfig.text}`}>
                            {badgeConfig.label}
                          </span>
                        </div>
                        
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {formatTime(result.total_time)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {result.total_question} câu
                          </span>
                          {result.year && (
                            <span className="text-slate-400">
                              {result.year}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() && !isLoading ? (
            /* Empty State */
            <div className="px-6 py-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600 font-medium">Không tìm thấy đề thi</p>
              <p className="text-xs text-slate-400 mt-1">Thử từ khóa khác như "ETS 2026", "Part 5"...</p>
            </div>
          ) : !query.trim() && recentSearches.length > 0 ? (
            /* Recent Searches */
            <div className="py-2">
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Tìm kiếm gần đây
                </span>
                <button 
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('toeic_recent_searches');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Xóa tất cả
                </button>
              </div>
              <ul className="py-1">
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setQuery(search);
                        handleSearch(search);
                        inputRef.current?.focus();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{search}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          
          {/* Footer với link xem tất cả */}
          {query.trim() && results.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
              <Link 
                href={`/kho-de-thi?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Xem tất cả {pagination?.total_records || results.length} kết quả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Keyboard Hint */}
      {isOpen && results.length > 0 && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-slate-400 hidden md:block">
          Dùng <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">↑</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">↓</kbd>{' '}
          để chọn, <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">Enter</kbd> để mở
        </div>
      )}
    </div>
  );
}

// Helper: Highlight matched text
function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-slate-900 rounded px-0.5">
        {part}
      </mark>
    ) : part
  );
}