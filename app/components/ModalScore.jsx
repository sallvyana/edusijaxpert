// components/ModalScore.jsx
'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function ModalScore({ score, correct, wrong, time, streak, onRetry, onLeaderboard, onClose }) {
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center text-teal-800"
      >
        <h2 className="text-3xl font-bold text-teal-600 mb-2">🎉 Kuis Selesai!</h2>
        <p className="text-gray-600 mb-6">Hasil belajarmu sudah siap ✨</p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6 text-left">
          <div>
            <p className="text-gray-500">Skor:</p>
            <p className="text-lg font-bold text-teal-700">{score} poin</p>
          </div>
          <div>
            <p className="text-gray-500">Waktu:</p>
            <p className="text-lg font-bold text-teal-700">{time}</p>
          </div>
          <div>
            <p className="text-gray-500">Benar:</p>
            <p className="text-lg font-bold text-green-600">{correct} soal</p>
          </div>
          <div>
            <p className="text-gray-500">Salah:</p>
            <p className="text-lg font-bold text-red-500">{wrong} soal</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Streak terbaik:</p>
            <p className="text-lg font-bold text-blue-500">{streak} berturut-turut</p>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onRetry}
            className="px-5 py-2 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-600 transition"
          >
            🔁 Ulangi
          </button>
          <button
            onClick={onLeaderboard}
            className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            🏆 Leaderboard
          </button>
        </div>

        <button onClick={onClose} className="mt-5 text-gray-400 hover:text-gray-600 text-sm underline">
          Tutup
        </button>
      </motion.div>
    </div>
  );
}
