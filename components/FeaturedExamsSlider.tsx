"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeaturedExamsResponse } from "@/types/exam";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay } from 'swiper/modules';

type FeaturedExamsSliderProps = {
  featuredData: FeaturedExamsResponse | null;
};

export default function FeaturedExamsSlider({ featuredData }: FeaturedExamsSliderProps) {
  if (!featuredData || !featuredData.exams || featuredData.exams.length === 0) {
    return (
      <div className="md:col-span-2 bg-gray-200 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 relative overflow-hidden group animate-pulse h-[280px]">
        {/* Fallback UI */}
      </div>
    );
  }

  return (
    <div className="md:col-span-2 relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        speed={800}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
      >
        {featuredData.exams.map((exam) => (
          <SwiperSlide key={exam.id}>
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 relative overflow-hidden group h-full">
              <div className="relative z-10 space-y-4">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full">{featuredData.name}</span>
                <h2 className="text-2xl md:text-4xl font-black min-h-[100px]">{exam.title} <br />Full Simulation</h2>
                <p className="text-slate-500 text-sm md:text-base max-w-sm">{featuredData.description}</p>
                <div className="flex items-center gap-6 pt-4">
                    <div className="text-center">
                        <p className="text-xl font-black">{exam.total_time}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Phút</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                        <p className="text-xl font-black">{exam.total_question}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Câu hỏi</p>
                    </div>
                    <Link href={`/test/toiec-listening-reading/${exam.id}`} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold ml-auto shadow-xl">
                      THI NGAY
                    </Link>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-all"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
