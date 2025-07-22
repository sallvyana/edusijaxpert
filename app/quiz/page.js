'use client';

import { useState } from 'react';

const questions = [
  {
    question: "Apa kepanjangan dari IoT?",
    options: ["Internet of Things", "Interface of Tech", "Input of Transfer"],
    correct: "Internet of Things",
  },
  {
    question: "Manakah yang termasuk contoh SaaS?",
    options: ["Google Docs", "Amazon EC2", "Docker"],
    correct: "Google Docs",
  },
  {
    question: "PaaS biasanya digunakan untuk?",
    options: ["Hosting aplikasi", "Membuat hardware", "Desain logo"],
    correct: "Hosting aplikasi",
  },
  {
    question: "IaaS menyajikan layanan berupa?",
    options: ["Infrastruktur seperti server & storage", "Aplikasi siap pakai", "Framework web"],
    correct: "Infrastruktur seperti server & storage",
  },
];

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = async (answer) => {
    const res = await fetch(`/api/cekjawaban?jawaban=${encodeURIComponent(answer)}&benar=${encodeURIComponent(questions[index].correct)}`);
    const data = await res.text();
    setFeedback(data);
    setTimeout(() => {
      setFeedback("");
      setIndex((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
    }, 1500);
  };

  const current = questions[index];

  return (
    <main style={styles.container}>
      <h2 style={styles.question}>{current.question}</h2>
      <div style={styles.options}>
        {current.options.map((option) => (
          <button key={option} style={styles.button} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      {feedback && <p style={styles.feedback}>{feedback}</p>}
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    height: '100vh',
    padding: '2rem',
    textAlign: 'center',
  },
  question: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#58a6ff',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#1f6feb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  feedback: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};
