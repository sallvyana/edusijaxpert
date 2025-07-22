// Halaman skor akhir quiz
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function QuizScorePage() {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori') || '';
  const score = searchParams.get('score') || 0;
  const total = searchParams.get('total') || 0;
  const router = useRouter();

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Hasil Kuis</h1>
      <p style={styles.kategori}>Kategori: <b>{kategori.toUpperCase()}</b></p>
      <p style={styles.skor}>Skor Anda: <span style={styles.score}>{score} / {total}</span></p>
      <button style={styles.button} onClick={() => router.push('/')}>Kembali ke Beranda</button>
    </main>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #0a1a2f 0%, #003366 100%)',
    color: '#00cfff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    textShadow: '0 0 10px #00cfff, 0 0 20px #003366',
  },
  kategori: {
    fontSize: '1.3rem',
    marginBottom: '0.8rem',
    color: '#b3e6ff',
  },
  skor: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  score: {
    color: '#fff',
    fontWeight: 'bold',
    textShadow: '0 0 8px #00cfff',
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
