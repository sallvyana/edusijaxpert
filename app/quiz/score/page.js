// Halaman skor akhir quiz
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import quizData from '../quizData';

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
  // Gunakan state agar aman untuk SSR/SSG
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [myStat, setMyStat] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setLeaderboard(JSON.parse(localStorage.getItem('leaderboard') || '[]'));
        setMyStat(JSON.parse(localStorage.getItem('myStat') || 'null'));
        const localQuestions = JSON.parse(localStorage.getItem('questions') || 'null');
        if (localQuestions && Array.isArray(localQuestions) && localQuestions.length > 0) {
          setQuestions(localQuestions);
        } else {
          // Fallback: ambil dari quizData sesuai kategori
          setQuestions(quizData[kategori] || []);
        }
      } catch {
        // Fallback: ambil dari quizData jika error parsing
        setQuestions(quizData[kategori] || []);
      }
    } else {
      // SSR fallback
      setQuestions(quizData[kategori] || []);
    }
  }, [kategori]);

  // State untuk input nama
  const [namaInput, setNamaInput] = React.useState('');
  const [errorNama, setErrorNama] = React.useState('');

  // Handler simpan nama
  const handleNamaSubmit = (e) => {
    e.preventDefault();
    if (!namaInput.trim()) {
      setErrorNama('Nama wajib diisi');
      return;
    }
    // Simpan ke localStorage dan state
    const newStat = {
      name: namaInput.trim(),
      score: score,
      waktu: waktu,
      progress: `${score}/${total}`,
      date: Date.now(),
    };
    localStorage.setItem('myStat', JSON.stringify(newStat));
    // Update leaderboard
    let currentLeaderboard = [];
    try {
      currentLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    } catch {}
    const newLeaderboard = [newStat, ...currentLeaderboard].sort((a, b) => b.score - a.score || a.waktu - b.waktu);
    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    // Refresh state dari localStorage agar data selalu up-to-date
    setMyStat(JSON.parse(localStorage.getItem('myStat') || 'null'));
    setLeaderboard(JSON.parse(localStorage.getItem('leaderboard') || '[]'));
  };

  // State mode belajar
  const [modeBelajar, setModeBelajar] = React.useState(false);

  return (
    <main style={styles.container}>
      <div style={styles.scoreBox}>
        <Image src={logoSrc} alt={kategori} width={60} height={60} style={styles.logo} />
        <h1 style={styles.title}>Hasil Kuis</h1>
        <p style={styles.kategori}>Kategori: <b>{kategori.toUpperCase()}</b></p>
        <p style={styles.skor}>Skor Anda: <span style={styles.score}>{score} / {total}</span></p>
        <p style={styles.skor}>Waktu: <span style={styles.score}>{waktu}s</span></p>
        {!myStat ? (
          <form onSubmit={handleNamaSubmit} style={styles.formNama}>
            <label htmlFor="nama" style={styles.labelNama}>Masukkan Nama Anda:</label>
            <input
              id="nama"
              type="text"
              value={namaInput}
              onChange={e => setNamaInput(e.target.value)}
              style={styles.inputNama}
              placeholder="Nama..."
              autoFocus
            />
            {errorNama && <div style={styles.errorNama}>{errorNama}</div>}
            <button type="submit" style={styles.buttonNama}>Simpan</button>
          </form>
        ) : (
          <div style={styles.statPribadi}>
            <b>Statistik Pribadi:</b>
            <div>Nama: {myStat.name}</div>
            <div>Skor: {myStat.score}</div>
            <div>Waktu: {myStat.waktu}s</div>
            <div>Progress: {myStat.progress}</div>
            <div>Tanggal: {new Date(myStat.date).toLocaleString()}</div>
          </div>
        )}
        <button style={styles.buttonBelajar} onClick={() => setModeBelajar(!modeBelajar)}>
          {modeBelajar ? 'Tutup Mode Belajar' : 'Mode Belajar (Kunci & Penjelasan)'}
        </button>
      </div>
      <div style={styles.reviewBox}>
        <h2>Review Jawaban</h2>
        <ol style={styles.reviewList}>
          {(questions && questions.length > 0 && answers && answers.length > 0) ? questions.map((q, i) => (
            <li key={i} style={styles.reviewItem}>
              <div><b>{q.question}</b></div>
              <div>Jawaban Anda: <span style={answers[i] === q.answer ? styles.benar : styles.salah}>{q.options && q.options[answers[i]] ? q.options[answers[i]] : '-'}</span></div>
              <div>Kunci Jawaban: <span style={styles.kunci}>{q.options && q.options[q.answer] ? q.options[q.answer] : '-'}</span></div>
              {modeBelajar && q.explanation && (
                <div style={styles.penjelasan}><b>Penjelasan:</b> {q.explanation}</div>
              )}
            </li>
          )) : <li style={styles.reviewItem}>Belum ada data jawaban atau soal. Silakan mainkan kuis terlebih dahulu.</li>}
        </ol>
      </div>
      <div style={styles.leaderboardBox}>
        <h2>Leaderboard</h2>
        <table style={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nama</th>
              <th>Skor</th>
              <th>Waktu</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 10).map((l, i) => (
              <tr key={i} style={myStat && l.name === myStat.name && l.date === myStat.date ? styles.highlight : {}}>
                <td>{i + 1}</td>
                <td>{l.name}</td>
                <td>{l.score}</td>
                <td>{l.waktu}s</td>
                <td>{new Date(l.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button style={styles.button} onClick={() => router.push('/')}>Kembali ke Beranda</button>
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

const styles = {
  buttonBelajar: {
    background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 10px #b2dfdb',
    marginTop: '1rem',
  },
  penjelasan: {
    background: '#e0f7fa',
    color: '#185a9d',
    borderRadius: '7px',
    padding: '0.5rem',
    marginTop: '0.5rem',
    fontSize: '1rem',
    boxShadow: '0 0 5px #b2dfdb',
  },
  container: {
    background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 40%, #b2dfdb 100%)',
    color: '#174c43',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '1.2rem',
    filter: 'drop-shadow(0 0 10px #b2ebf2)',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    color: '#009688',
    textShadow: '0 0 10px #b2ebf2',
  },
  kategori: {
    fontSize: '1.3rem',
    marginBottom: '0.8rem',
    color: '#00796b',
  },
  skor: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  score: {
    color: '#00bcd4',
    fontWeight: 'bold',
    textShadow: '0 0 8px #b2ebf2',
  },
  statPribadi: {
    background: 'rgba(224,247,250,0.7)',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1rem',
    boxShadow: '0 0 10px #b2dfdb',
  },
  formNama: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.7rem',
    background: 'rgba(224,247,250,0.7)',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1rem',
    boxShadow: '0 0 10px #b2dfdb',
  },
  labelNama: {
    fontWeight: 'bold',
    color: '#00796b',
    fontSize: '1.1rem',
  },
  inputNama: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid #00bcd4',
    fontSize: '1.1rem',
    outline: 'none',
    background: '#e0f7fa',
    color: '#174c43',
    width: '200px',
    boxShadow: '0 0 5px #b2ebf2',
  },
  errorNama: {
    color: '#d32f2f',
    fontSize: '0.95rem',
    marginTop: '-0.5rem',
  },
  buttonNama: {
    background: 'linear-gradient(90deg, #009688 0%, #00bcd4 100%)',
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 10px #b2dfdb',
  },
  reviewBox: {
    background: 'rgba(224,247,250,0.7)',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1.5rem 0',
    boxShadow: '0 0 10px #b2dfdb',
    width: '100%',
    maxWidth: '600px',
  },
  reviewList: {
    textAlign: 'left',
    paddingLeft: '1.2rem',
  },
  reviewItem: {
    marginBottom: '1rem',
    background: '#b2ebf2',
    borderRadius: '7px',
    padding: '0.7rem',
    boxShadow: '0 0 5px #b2dfdb',
  },
  benar: {
    color: '#388e3c',
    fontWeight: 'bold',
  },
  salah: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  kunci: {
    color: '#009688',
    fontWeight: 'bold',
  },
  leaderboardBox: {
    background: 'rgba(224,247,250,0.7)',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1.5rem 0',
    boxShadow: '0 0 10px #b2dfdb',
    width: '100%',
    maxWidth: '600px',
  },
  leaderboardTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '0.7rem',
    background: '#b2ebf2',
    borderRadius: '7px',
    overflow: 'hidden',
    boxShadow: '0 0 5px #b2dfdb',
  },
  highlight: {
    background: '#e0f7fa',
    fontWeight: 'bold',
    color: '#00796b',
  },
  button: {
    background: 'linear-gradient(90deg, #009688 0%, #00bcd4 100%)',
    padding: '0.85rem 1.7rem',
    borderRadius: '12px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 0 20px #b2dfdb',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
};
