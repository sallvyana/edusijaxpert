// components/QuizBox.jsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { quizData } from '@/app/quiz/quizData';
import ModalScore from './ModalScore';
import StatBoard from './StatBoard';

export default function QuizBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori') || 'iot';
  const questions = quizData[kategori] || [];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [showModal]);

  const handleAnswer = async (answerIdx) => {
    const res = await fetch(`/api/cekjawaban?jawaban=${encodeURIComponent(answerIdx)}&benar=${encodeURIComponent(questions[index].answer)}`);
    const data = await res.text();
    setFeedback(data);
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = answerIdx;
      return copy;
    });
    if (answerIdx === questions[index].answer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setFeedback('');
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {
        setShowModal(true);
      }
    }, 800);
  };

  const handleRetry = () => {
    setIndex(0);
    setScore(0);
    setFeedback('');
    setStreak(0);
    setAnswers([]);
    setTimer(0);
    setShowModal(false);
  };

  const handleLeaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({
      score,
      kategori,
      waktu: timer,
      correct: score,
      wrong: questions.length - score,
      streak,
      date: new Date().toISOString(),
    });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    router.push(`/quiz/score?kategori=${kategori}`);
  };

  return (
    <>
      {showModal ? (
        <ModalScore
          score={score}
          correct={score}
          wrong={questions.length - score}
          time={`${timer}s`}
          streak={streak}
          onRetry={handleRetry}
          onLeaderboard={handleLeaderboard}
          onClose={() => setShowModal(false)}
        />
      ) : (
        <div className="relative flex flex-col md:flex-row items-start gap-6 p-6 min-h-screen bg-gradient-to-br from-white to-teal-50">
          <div className="flex-1 max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-xl font-semibold mb-2">Pertanyaan {index + 1} dari {questions.length}</h1>
            <p className="text-lg font-bold text-gray-700 mb-4">{questions[index]?.question}</p>
            <div className="grid gap-4">
              {questions[index]?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="text-left px-4 py-3 rounded-md border border-teal-300 hover:bg-teal-100 transition"
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 text-blue-500 font-semibold">{feedback}</p>}
          </div>
          <StatBoard
            current={index}
            total={questions.length}
            timer={timer}
            streak={streak}
          />
        </div>
      )}
    </>
  );
}
