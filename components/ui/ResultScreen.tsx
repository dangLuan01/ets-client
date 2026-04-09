'use client';

import Link from "next/link";

interface ResultScreenProps {
  slug: string;
  examId: string;
  testResult: {
    total_score: number;
    raw_score?: {
      listening?: number;
      reading?: number;
    };
    scaled_score?: {
      listening?: number;
      reading?: number;
    };
  };
  onBack: () => void;
}

export default function ResultScreen({ testResult, onBack, slug, examId }: ResultScreenProps) {  
  
  const totalPercent = (testResult.total_score / 990) * 100;
  const listeningPercent = ((testResult.scaled_score?.listening || 0) / 495) * 100;
  const readingPercent = ((testResult.scaled_score?.reading || 0) / 495) * 100;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#f4f6f8] flex flex-col font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="h-[60px] bg-[#001a4e] flex items-center justify-between px-6 shrink-0 shadow-md">
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-white hover:bg-white/20 transition-colors text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center text-white pr-8">Result</h1>
      </header>

      {/* MAIN BODY */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center">
        
        {/* TOTAL SCORE BOX */}
        <div className="w-full max-w-2xl border-2 border-[#e27a33] rounded-lg bg-white p-8 mb-10 shadow-sm relative mt-4">
          <h2 className="text-center text-[#e27a33] font-bold text-xl mb-12">
            Your score: <span className="text-2xl">{testResult.total_score}</span>
          </h2>
          
          <div className="flex items-center w-full px-12 relative">
            <span className="absolute left-[-10px] font-bold text-[#001a4e] tracking-wider">TOTAL</span>
            
            <div className="relative w-full h-1.5 bg-gray-300 rounded-full">
              <div className="absolute top-0 left-0 h-full bg-[#e27a33] rounded-full" style={{ width: `${totalPercent}%` }}></div>
              <span className="absolute -top-7 left-0 text-[15px] font-bold text-[#001a4e] -translate-x-1/2">0</span>
              <div className="absolute top-1/2 left-0 w-4 h-4 bg-[#e27a33] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <span className="absolute -top-7 right-0 text-[15px] font-bold text-[#001a4e] translate-x-1/2">990</span>
              <div 
                className="absolute top-1/2 w-4 h-4 bg-[#e27a33] rounded-full -translate-y-1/2 -translate-x-1/2 shadow-md border-2 border-white"
                style={{ left: `${totalPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* SKILLS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* LISTENING CARD */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#e6f0f9] px-5 py-3 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center text-[#2b659b] font-bold text-[17px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 00-18 0v4a2 2 0 002 2h2v-6h10v6h2a2 2 0 002-2v-4z" />
                </svg>
                Listening
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#2b659b]">
                <path d="M12 15.25l-2.75 1.5.75-3.25-2.5-2.25 3.25-.25L12 8l1.25 3 3.25.25-2.5 2.25.75 3.25L12 15.25z" />
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-center text-[#001a4e] font-bold text-lg mb-10">Your score: {testResult.scaled_score?.listening}</h3>
              
              <div className="relative w-full h-1.5 bg-gray-300 rounded-full mb-10 px-2">
                <div className="absolute top-0 left-0 h-full bg-[#70a35e] rounded-full" style={{ width: `${listeningPercent}%` }}></div>
                <span className="absolute -top-6 left-0 text-sm font-bold text-[#001a4e] -translate-x-1/2">0</span>
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-[#70a35e] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                <span className="absolute -top-6 right-0 text-sm font-bold text-[#001a4e] translate-x-1/2">495</span>
                <div 
                  className="absolute top-1/2 w-3 h-3 bg-[#70a35e] rounded-full -translate-y-1/2 -translate-x-1/2 shadow-sm border border-white"
                  style={{ left: `${listeningPercent}%` }}
                ></div>
              </div>

              <ul className="list-disc pl-5 text-[13px] text-gray-700 space-y-2 mt-2 leading-relaxed">
                <li>You can <span className="underline decoration-dotted font-semibold">sometimes infer the central idea, purpose, and basic context</span> of short spoken exchanges, especially when the vocabulary is not difficult.</li>
                <li>You can <span className="underline decoration-dotted font-semibold">understand details</span> in short spoken exchanges when easy or medium-level vocabulary is used.</li>
              </ul>
            </div>
          </div>

          {/* READING CARD */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#fae8d4] px-5 py-3 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center text-[#a05a2c] font-bold text-[17px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Reading
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#a05a2c]">
                <path d="M12 15.25l-2.75 1.5.75-3.25-2.5-2.25 3.25-.25L12 8l1.25 3 3.25.25-2.5 2.25.75 3.25L12 15.25z" />
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-center text-[#001a4e] font-bold text-lg mb-10">Your score: {testResult.scaled_score?.reading}</h3>
              
              <div className="relative w-full h-1.5 bg-gray-300 rounded-full mb-10 px-2">
                <div className="absolute top-0 left-0 h-full bg-[#70a35e] rounded-full" style={{ width: `${readingPercent}%` }}></div>
                <span className="absolute -top-6 left-0 text-sm font-bold text-[#001a4e] -translate-x-1/2">0</span>
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-[#70a35e] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                <span className="absolute -top-6 right-0 text-sm font-bold text-[#001a4e] translate-x-1/2">495</span>
                <div 
                  className="absolute top-1/2 w-3 h-3 bg-[#70a35e] rounded-full -translate-y-1/2 -translate-x-1/2 shadow-sm border border-white"
                  style={{ left: `${readingPercent}%` }}
                ></div>
              </div>

              <ul className="list-disc pl-5 text-[13px] text-gray-700 space-y-2 mt-2 leading-relaxed">
                <li>You can <span className="underline decoration-dotted font-semibold">understand very familiar everyday words.</span></li>
                <li>You can <span className="underline decoration-dotted font-semibold">catch the basic idea</span> of very short and simple texts such as restaurant menus, train or bus schedules, traffic signs.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="h-[70px] bg-[#d5d7db] flex justify-center items-center shrink-0 w-full shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <Link href={`/practice/${slug}/${examId}`}>
        <button 
          // onClick={onBack}
          className="px-10 py-2 bg-[#1b4382] hover:bg-[#122e5a] text-white font-bold rounded-[4px] shadow-sm transition-colors text-[15px]"
        >
          Go to Explanation
        </button>
        </Link>
      </footer>

    </div>
  );
}