
'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { quizData } from './quizData';
import { Suspense } from 'react';

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategori = searchParams.get('kategori') || 'iot';
  const questions = quizData[kategori] || [];

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleAnswer = async (answerIdx) => {
    const res = await fetch(`/api/cekjawaban?jawaban=${encodeURIComponent(answerIdx)}&benar=${encodeURIComponent(questions[index].answer)}`);
    const data = await res.text();
    setFeedback(data);
    if (answerIdx === questions[index].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setFeedback("");
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
      } else {
        setShowModal(true);
      }
    }, 1200);
  };

  const handleGoToScore = () => {
    router.push(`/quiz/score?kategori=${kategori}&score=${score}&total=${questions.length}`);
  };

  const current = questions[index];

  return (
    <main style={styles.container}>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2>Skor Akhir</h2>
            <p>Kategori: <b>{kategori.toUpperCase()}</b></p>
            <p>Skor Anda: <b>{score} / {questions.length}</b></p>
            <button style={styles.button} onClick={handleGoToScore}>Lihat Detail Skor</button>
          </div>
        </div>
      )}
      {!showModal && current && (
        <>
          <h2 style={styles.question}>{current.question}</h2>
          <div style={styles.options}>
            {current.options.map((option, idx) => (
              <button key={option} style={styles.button} onClick={() => handleAnswer(idx)}>
                {option}
              </button>
            ))}
          </div>
          {feedback && <p style={styles.feedback}>{feedback}</p>}
        </>
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
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    height: '100vh',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
  },
  question: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#00cfff',
    textShadow: '0 0 8px #0055ff',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  button: {
    padding: '0.85rem',
    background: 'linear-gradient(90deg, #0055ff 0%, #00cfff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 0 12px #00cfff99',
    marginBottom: '0.5rem',
    transition: 'transform 0.2s',
  },
  feedback: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#00cfff',
    textShadow: '0 0 6px #0055ff',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(10, 26, 47, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalBox: {
    background: 'linear-gradient(135deg, #003366 0%, #00cfff 100%)',
    color: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '18px',
    boxShadow: '0 0 40px #00cfff99',
    textAlign: 'center',
    minWidth: '320px',
  },
};
