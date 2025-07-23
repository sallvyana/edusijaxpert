'use client';
import { Suspense } from 'react';
import QuizBox from '@/components/QuizBox';

export default function QuizPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizBox />
    </Suspense>
  );
}
