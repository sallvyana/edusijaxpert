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

  return (
    <main style={styles.container}>
      <Image src={logoSrc} alt={kategori} width={80} height={80} style={styles.logo} />
      <h1 style={styles.title}>Hasil Kuis</h1>
      <p style={styles.kategori}>Kategori: <b>{kategori.toUpperCase()}</b></p>
      <p style={styles.skor}>Skor Anda: <span style={styles.score}>{score} / {total}</span></p>
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
