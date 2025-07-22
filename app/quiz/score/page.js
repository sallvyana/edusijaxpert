// Halaman skor akhir quiz
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

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
  const answers = JSON.parse(searchParams.get('answers') || '[]');
  // Dummy data untuk leaderboard, myStat, questions
  // Silakan ganti dengan logic asli jika sudah ada
  let leaderboard = [];
  let myStat = null;
  let questions = [];
  if (typeof window !== 'undefined') {
    try {
      leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      myStat = JSON.parse(localStorage.getItem('myStat') || 'null');
      questions = JSON.parse(localStorage.getItem('questions') || '[]');
    } catch {}
  }

  return (
    <main style={styles.container}>
      <div style={styles.scoreBox}>
        <Image src={logoSrc} alt={kategori} width={60} height={60} style={styles.logo} />
        <h1 style={styles.title}>Hasil Kuis</h1>
        <p style={styles.kategori}>Kategori: <b>{kategori.toUpperCase()}</b></p>
        <p style={styles.skor}>Skor Anda: <span style={styles.score}>{score} / {total}</span></p>
        <p style={styles.skor}>Waktu: <span style={styles.score}>{waktu}s</span></p>
        {myStat && (
          <div style={styles.statPribadi}>
            <b>Statistik Pribadi:</b>
            <div>Nama: {myStat.name}</div>
            <div>Skor: {myStat.score}</div>
            <div>Waktu: {myStat.waktu}s</div>
            <div>Progress: {myStat.progress}</div>
            <div>Tanggal: {new Date(myStat.date).toLocaleString()}</div>
          </div>
        )}
      </div>
      <div style={styles.reviewBox}>
        <h2>Review Jawaban</h2>
        <ol style={styles.reviewList}>
          {questions.map((q, i) => (
            <li key={i} style={styles.reviewItem}>
              <div><b>{q.question}</b></div>
              <div>Jawaban Anda: <span style={answers[i] === q.answer ? styles.benar : styles.salah}>{q.options[answers[i]] ?? '-'}</span></div>
              <div>Kunci Jawaban: <span style={styles.kunci}>{q.options[q.answer]}</span></div>
            </li>
          ))}
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
    <Suspense>
      <ScoreContent />
    </Suspense>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#222',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '1.2rem',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    color: '#0055ff',
    textShadow: '0 0 10px #c3cfe2',
  },
  kategori: {
    fontSize: '1.3rem',
    marginBottom: '0.8rem',
    color: '#0055ff',
  },
  skor: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  score: {
    color: '#00cfff',
    fontWeight: 'bold',
    textShadow: '0 0 8px #c3cfe2',
  },
  button: {
    background: 'linear-gradient(90deg, #0055ff 0%, #00cfff 100%)',
    padding: '0.85rem 1.7rem',
    borderRadius: '12px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 0 20px #00cfff99',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
};

  const waktu = parseInt(searchParams.get('waktu') || '0');
  const answers = JSON.parse(searchParams.get('answers') || '[]');

  return (
    <main style={styles.container}>
      <div style={styles.scoreBox}>
        <Image src={logoSrc} alt={kategori} width={60} height={60} style={styles.logo} />
        <h1 style={styles.title}>Hasil Kuis</h1>
        <p style={styles.kategori}>Kategori: <b>{kategori.toUpperCase()}</b></p>
        <p style={styles.skor}>Skor Anda: <span style={styles.score}>{score} / {total}</span></p>
        <p style={styles.skor}>Waktu: <span style={styles.score}>{waktu}s</span></p>
        {myStat && (
          <div style={styles.statPribadi}>
            <b>Statistik Pribadi:</b>
            <div>Nama: {myStat.name}</div>
            <div>Skor: {myStat.score}</div>
            <div>Waktu: {myStat.waktu}s</div>
            <div>Progress: {myStat.progress}</div>
            <div>Tanggal: {new Date(myStat.date).toLocaleString()}</div>
          </div>
        )}
      </div>
      <div style={styles.reviewBox}>
        <h2>Review Jawaban</h2>
        <ol style={styles.reviewList}>
          {questions.map((q, i) => (
            <li key={i} style={styles.reviewItem}>
              <div><b>{q.question}</b></div>
              <div>Jawaban Anda: <span style={answers[i] === q.answer ? styles.benar : styles.salah}>{q.options[answers[i]] ?? '-'}</span></div>
              <div>Kunci Jawaban: <span style={styles.kunci}>{q.options[q.answer]}</span></div>
            </li>
          ))}
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
