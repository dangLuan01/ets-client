'use client';

import React from 'react';
import QuestionPalette from '../ui/QuestionPalette';

interface TestFooterProps {
  totalQuestions?: number;
}

export default function TestFooter({ totalQuestions = 200 }: TestFooterProps) {
  return (
    <footer className="shrink-0 z-10 w-full bg-white border-t border-gray-300 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <QuestionPalette totalQuestions={totalQuestions} />
    </footer>
  );
}