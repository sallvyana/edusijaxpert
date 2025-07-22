// Halaman skor akhir quiz
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { quizData } from '../quizData';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dyzokpqblmyzstvthnhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5em9rcHFibG15enN0dnRobmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDQ0NjgsImV4cCI6MjA2ODc4MDQ2OH0.0fy-9-C4qtwrbEt3OKzT7K1El51KI-z-bF11AUdxrCw';

export const supabase = createClient(supabaseUrl, supabaseKey);

function ScoreContent() {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori') || '';
  const score = searchParams.get('score') || 0;
  const total = searchParams.get('total') || 0;
  const router = useRouter();

  // Logo kategori
  const logoMap = {
    iot: '/file.svg',
    paas: '/globe.svg',
    saas: '/next.svg',
    iaas: '/window.svg',
  };
  const logoSrc = logoMap[kategori] || '/vercel.svg';

  // Ambil waktu, answers, leaderboard, myStat, questions
  const waktu = parseInt(searchParams.get('waktu') || '0');
  let answers = [];
  try {
    answers = JSON.parse(searchParams.get('answers') || '[]');
    if (!Array.isArray(answers)) answers = [];
  } catch {
    answers = [];
  }
  // State untuk leaderboard, statistik pribadi, pertanyaan, input nama, error, loading
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [myStat, setMyStat] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [namaInput, setNamaInput] = React.useState('');
  const [errorNama, setErrorNama] = React.useState('');
  const [loadingLeaderboard, setLoadingLeaderboard] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [modeBelajar, setModeBelajar] = React.useState(false);

  // Ambil pertanyaan dari localStorage atau quizData
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const localQuestions = JSON.parse(localStorage.getItem('questions') || 'null');
        if (localQuestions && Array.isArray(localQuestions) && localQuestions.length > 0) {
          setQuestions(localQuestions);
        } else {
          setQuestions(quizData[kategori] || []);
        }
      } catch {
        setQuestions(quizData[kategori] || []);
      }
    } else {
      setQuestions(quizData[kategori] || []);
    }
  }, [kategori]);

  // Ambil leaderboard dari Supabase
  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('waktu', { ascending: true })
      .limit(20);
    if (!error && Array.isArray(data)) {
      setLeaderboard(data);
    } else {
      setLeaderboard([]);
    }
    setLoadingLeaderboard(false);
  };

  React.useEffect(() => {
    fetchLeaderboard();
  }, [kategori]);

  // Handler simpan nama ke Supabase
  const handleNamaSubmit = async (e) => {
    e.preventDefault();
    if (!namaInput.trim()) {
      setErrorNama('Nama wajib diisi');
      return;
    }
    setLoadingSubmit(true);
    const newStat = {
      name: namaInput.trim(),
      score: Number(score),
      waktu: Number(waktu),
      progress: `${score}/${total}`,
      kategori,
      created_at: new Date().toISOString(),
    };
    // Insert ke Supabase
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([newStat])
      .select();
    if (!error && data && data.length > 0) {
      setMyStat(data[0]);
      fetchLeaderboard();
      setErrorNama('');
    } else {
      setErrorNama('Gagal simpan, coba lagi.');
    }
    setLoadingSubmit(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-teal-100 text-teal-900 font-sans">
      <div className="w-full max-w-xl mx-auto mt-10 mb-6 bg-white/70 rounded-xl shadow-lg p-6 text-center flex flex-col items-center">
        <Image src={logoSrc} alt={kategori} width={60} height={60} className="mx-auto mb-4 drop-shadow" />
        <h1 className="text-3xl font-bold text-teal-600 mb-2 drop-shadow">Hasil Kuis</h1>
        <p className="text-lg text-gray-700 mb-1">Kategori: <b>{kategori.toUpperCase()}</b></p>
        <p className="text-xl font-semibold mb-2">Skor Anda: <span className="text-cyan-600 font-bold drop-shadow">{score} / {total}</span></p>
        <p className="text-xl font-semibold mb-4">Waktu: <span className="text-cyan-600 font-bold drop-shadow">{waktu}s</span></p>
        {!myStat ? (
          <form onSubmit={handleNamaSubmit} className="flex flex-col items-center gap-3 bg-cyan-50/80 rounded-lg p-4 shadow mt-2 w-full max-w-sm mx-auto">
            <label htmlFor="nama" className="font-bold text-teal-700 text-base">Masukkan Nama Anda:</label>
            <input
              id="nama"
              type="text"
              value={namaInput}
              onChange={e => setNamaInput(e.target.value)}
              className="p-2 rounded-lg border border-cyan-400 text-base w-48 focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-cyan-50 text-teal-900 shadow"
              placeholder="Nama..."
              autoFocus
            />
            {errorNama && <div className="text-red-600 text-sm">{errorNama}</div>}
            <button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold py-2 px-6 rounded-lg shadow hover:scale-105 transition">Simpan</button>
          </form>
        ) : (
          <div className="bg-cyan-50/80 rounded-lg p-4 shadow mt-2 w-full max-w-sm mx-auto">
            <b className="block mb-2">Statistik Pribadi:</b>
            <div>Nama: {myStat.name}</div>
            <div>Skor: {myStat.score}</div>
            <div>Waktu: {myStat.waktu}s</div>
            <div>Progress: {myStat.progress}</div>
            <div>Tanggal: {new Date(myStat.date).toLocaleString()}</div>
          </div>
        )}
        <button className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-bold py-2 px-6 rounded-lg shadow mt-4 hover:scale-105 transition" onClick={() => setModeBelajar(!modeBelajar)}>
          {modeBelajar ? 'Tutup Mode Belajar' : 'Mode Belajar (Kunci & Penjelasan)'}
        </button>
      </div>
      <div className="w-full max-w-xl mx-auto mb-8 bg-white/70 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-teal-600 mb-3">Review Jawaban</h2>
        <ol className="text-left pl-4">
          {(questions && questions.length > 0 && answers && answers.length > 0) ? questions.map((q, i) => (
            <li key={i} className="mb-4 bg-cyan-100 rounded-lg p-3 shadow">
              <div className="font-semibold mb-1">{q.question}</div>
              <div>Jawaban Anda: <span className={answers[i] === q.answer ? "text-green-700 font-bold" : "text-red-600 font-bold"}>{q.options && q.options[answers[i]] ? q.options[answers[i]] : '-'}</span></div>
              <div>Kunci Jawaban: <span className="text-cyan-700 font-bold">{q.options && q.options[q.answer] ? q.options[q.answer] : '-'}</span></div>
              {modeBelajar && q.explanation && (
                <div className="bg-cyan-50 text-teal-700 rounded-md p-2 mt-2 shadow"><b>Penjelasan:</b> {q.explanation}</div>
              )}
            </li>
          )) : <li className="mb-4 bg-cyan-100 rounded-lg p-3 shadow">Belum ada data jawaban atau soal. Silakan mainkan kuis terlebih dahulu.</li>}
        </ol>
      </div>
      <div className="w-full max-w-xl mx-auto mb-8 bg-white/70 rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="mb-4 font-bold text-xl text-teal-600">🏆 Leaderboard</h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse bg-cyan-100 rounded-lg shadow">
            <thead>
              <tr>
                <th className="w-14 text-center font-bold text-base">Rank</th>
                <th>Nama</th>
                <th>Skor</th>
                <th>Waktu</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 10).map((l, i) => {
                let rankIcon = '';
                if (i === 0) rankIcon = '🥇';
                else if (i === 1) rankIcon = '🥈';
                else if (i === 2) rankIcon = '🥉';
                let rowClass = '';
                if (i === 0) rowClass = 'bg-yellow-100 text-yellow-700';
                else if (i === 1) rowClass = 'bg-blue-100 text-blue-700';
                else if (i === 2) rowClass = 'bg-orange-100 text-orange-700';
                if (myStat && l.name === myStat.name && l.date === myStat.date) rowClass += ' border-l-4 border-cyan-400 font-bold';
                return (
                  <tr key={i} className={rowClass}>
                    <td className="text-center font-bold">{rankIcon || i + 1}</td>
                    <td className="font-bold">{l.name}</td>
                    <td>{l.score}</td>
                    <td>{l.waktu}s</td>
                    <td>{new Date(l.date).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-xl shadow mt-4 hover:scale-105 transition" onClick={() => router.push('/')}>Kembali ke Beranda</button>
    </main>
  );
}

export default function QuizScorePage() {
  return (
    <Suspense fallback={<div>Memuat...</div>} suppressHydrationWarning>
      <ScoreContent />
    </Suspense>
  );
}

