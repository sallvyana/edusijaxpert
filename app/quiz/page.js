
'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { quizData } from './quizData';
import { Suspense } from 'react';
import Image from 'next/image';

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategori = searchParams.get('kategori') || 'iot';
  const questions = quizData[kategori] || [];

  const logoMap = {
    iot: '/file.svg',
    paas: '/globe.svg',
    saas: '/next.svg',
    iaas: '/window.svg',
  };
  const logoSrc = logoMap[kategori] || '/vercel.svg';

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [flagged, setFlagged] = useState([]); // array of flagged question indices
  const [startTime] = useState(Date.now());
  const [streak, setStreak] = useState(0);

  const current = questions[index];
  const progress = Math.round(((index + 1) / questions.length) * 100);
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const speed = elapsed > 0 ? `${Math.round(elapsed / (index + 1))}s/soal` : '-';

  const handleAnswer = async (answerIdx) => {
    const res = await fetch(`/api/cekjawaban?jawaban=${encodeURIComponent(answerIdx)}&benar=${encodeURIComponent(questions[index].answer)}`);
    const data = await res.text();
    setFeedback(data);
    if (answerIdx === questions[index].answer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setFeedback("");
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {
        setShowModal(true);
      }
    }, 900);
  };

  const handleGoToScore = () => {
    router.push(`/quiz/score?kategori=${kategori}&score=${score}&total=${questions.length}`);
  };

  const handleFlag = () => {
    setFlagged((prev) => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };
  const handleNext = () => {
    if (index + 1 < questions.length) setIndex(index + 1);
  };

  return (
    <main style={styles.container}>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <Image src={logoSrc} alt={kategori} width={60} height={60} style={styles.logo} />
            <h2>Skor Akhir</h2>
            <p>Kategori: <b>{kategori.toUpperCase()}</b></p>
            <p>Skor Anda: <b>{score} / {questions.length}</b></p>
            <button style={styles.button} onClick={handleGoToScore}>Lihat Detail Skor</button>
          </div>
        </div>
      )}
      {!showModal && current && (
        <div style={styles.quizBox}>
          <div style={styles.headerRow}>
            <div style={styles.logoWrap}>
              <Image src={logoSrc} alt={kategori} width={40} height={40} style={styles.logo} />
            </div>
            <div style={styles.progressWrap}>
              <span style={styles.progressText}>Pertanyaan {index + 1} dari {questions.length}</span>
              <div style={styles.progressBarBg}>
                <div style={{ ...styles.progressBar, width: `${progress}%` }} />
              </div>
              <span style={styles.progressPercent}>{progress}% selesai</span>
            </div>
            <div style={styles.timeWrap}>
              <span>⏱️ {elapsed}s</span>
            </div>
          </div>
          <div style={styles.statLive}>
            <b>Statistik Live</b>
            <div>Progress: {index}/{questions.length} ({progress}%)</div>
            <div>Waktu: {elapsed}s</div>
            <div>Streak: {streak} berturut-turut</div>
            <div>Kecepatan: {speed}</div>
            <div>Flagged: {flagged.length}</div>
          </div>
          <h2 style={styles.question}>{current.question}</h2>
          <div style={styles.options}>
            {current.options.map((option, idx) => (
              <button key={option} style={styles.button} onClick={() => handleAnswer(idx)}>
                <b>{String.fromCharCode(65 + idx)}</b>. {option}
              </button>
            ))}
          </div>
          {feedback && <p style={styles.feedback}>{feedback}</p>}
          <div style={styles.actionRow}>
            <button style={styles.navButton} onClick={handlePrev} disabled={index === 0}>Sebelumnya</button>
            <button style={styles.flagButton} onClick={handleFlag}>{flagged.includes(index) ? '🚩 Unflag' : '🚩 Flag'}</button>
            <button style={styles.navButton} onClick={handleNext} disabled={index + 1 >= questions.length}>Selanjutnya</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <QuizContent />
    </Suspense>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#222',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizBox: {
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 0 24px #c3cfe2',
    padding: '2.5rem 2rem',
    minWidth: '380px',
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '0.5rem',
    gap: '1rem',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: '50%',
    background: '#f5f7fa',
  },
  progressWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  progressText: {
    fontSize: '1rem',
    color: '#0055ff',
    fontWeight: 'bold',
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    background: '#e0e7ef',
    borderRadius: '8px',
    margin: '0.2rem 0',
    overflow: 'hidden',
  },
  progressBar: {
    height: '8px',
    background: 'linear-gradient(90deg, #0055ff 0%, #00cfff 100%)',
    borderRadius: '8px',
    transition: 'width 0.3s',
  },
  progressPercent: {
    fontSize: '0.9rem',
    color: '#888',
  },
  timeWrap: {
    fontSize: '1rem',
    color: '#0055ff',
    fontWeight: 'bold',
  },
  statLive: {
    background: '#f5f7fa',
    borderRadius: '12px',
    boxShadow: '0 0 8px #e0e7ef',
    padding: '0.8rem 1.2rem',
    fontSize: '0.95rem',
    color: '#222',
    textAlign: 'left',
    width: '100%',
    marginBottom: '0.5rem',
  },
  question: {
    fontSize: '1.3rem',
    marginBottom: '1.2rem',
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  button: {
    padding: '1rem',
    background: '#f5f7fa',
    color: '#0055ff',
    border: '2px solid #e0e7ef',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 0 8px #e0e7ef',
    marginBottom: '0.2rem',
    transition: 'background 0.2s, color 0.2s',
    textAlign: 'left',
  },
  feedback: {
    marginTop: '1.2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#00cfff',
    textShadow: '0 0 6px #c3cfe2',
  },
  actionRow: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '1.2rem',
  },
  navButton: {
    background: 'linear-gradient(90deg, #0055ff 0%, #00cfff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 1.2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 0 8px #00cfff99',
    transition: 'background 0.2s',
  },
  flagButton: {
    background: '#fffbe6',
    color: '#d97706',
    border: '2px solid #facc15',
    borderRadius: '8px',
    padding: '0.7rem 1.2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 0 8px #facc1599',
    transition: 'background 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(195, 207, 226, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalBox: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#0055ff',
    padding: '2.5rem 2rem',
    borderRadius: '18px',
    boxShadow: '0 0 40px #c3cfe2',
    textAlign: 'center',
    minWidth: '320px',
  },
};
