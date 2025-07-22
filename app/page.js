import React from 'react';

export default function Home() {
  return (
    <main style={styles.container}>
      <div style={styles.heroBox}>
        <h1 style={styles.title}>Kuis EduSijaXpert</h1>
        <p style={styles.subtitle}>Uji kemampuanmu dengan soal SIJA, IoT, Cloud, dan Teknologi Digital!</p>
        <div style={styles.featureRow}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📚</span>
            <b>Materi Komprehensif</b>
            <div>Pertanyaan SIJA, IoT, Cloud, dan Teknologi</div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⏰</span>
            <b>Tanpa Batas Waktu</b>
            <div>Kerjakan dengan santai, fokus pemahaman</div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⚡</span>
            <b>Feedback Instan</b>
            <div>Langsung tahu benar/salah setiap jawaban</div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🚀</span>
            <b>Tingkatkan Skill</b>
            <div>Asah kemampuan SIJA & teknologi digital</div>
          </div>
        </div>
      </div>
      <div style={styles.quizSection}>
        <h2 style={styles.quizTitle}>Kategori Quiz</h2>
        <div style={styles.categories}>
          <a href="/quiz?kategori=iot" style={styles.categoryCard}>
            <img src="/file.svg" alt="IoT" style={styles.categoryLogo} />
            <div><b>IoT</b></div>
            <div style={styles.categoryDesc}>Internet of Things</div>
          </a>
          <a href="/quiz?kategori=paas" style={styles.categoryCard}>
            <img src="/globe.svg" alt="PaaS" style={styles.categoryLogo} />
            <div><b>PaaS</b></div>
            <div style={styles.categoryDesc}>Platform as a Service</div>
          </a>
          <a href="/quiz?kategori=saas" style={styles.categoryCard}>
            <img src="/next.svg" alt="SaaS" style={styles.categoryLogo} />
            <div><b>SaaS</b></div>
            <div style={styles.categoryDesc}>Software as a Service</div>
          </a>
          <a href="/quiz?kategori=iaas" style={styles.categoryCard}>
            <img src="/window.svg" alt="IaaS" style={styles.categoryLogo} />
            <div><b>IaaS</b></div>
            <div style={styles.categoryDesc}>Infrastructure as a Service</div>
          </a>
        </div>
      </div>
      <footer style={styles.footer}>
        <div>&copy; {new Date().getFullYear()} EduSijaXpert</div>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 40%, #b2dfdb 100%)',
    color: '#174c43',
    minHeight: '100vh',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  heroBox: {
    width: '100%',
    maxWidth: '700px',
    margin: '2.5rem auto 1.5rem auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#009688',
    marginBottom: '0.5rem',
    textShadow: '0 0 10px #b2ebf2',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '2rem',
  },
  featureRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.2rem',
    marginBottom: '2.5rem',
  },
  featureCard: {
    background: '#e0f7fa',
    borderRadius: '16px',
    boxShadow: '0 0 12px #b2dfdb',
    padding: '1.2rem 1rem',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#174c43',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  featureIcon: {
    fontSize: '1.7rem',
    marginBottom: '0.2rem',
  },
  quizSection: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: '2.5rem',
    textAlign: 'center',
  },
  quizTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#009688',
    marginBottom: '1.2rem',
    textShadow: '0 0 8px #b2ebf2',
  },
  categories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    background: '#e0f7fa',
    borderRadius: '16px',
    boxShadow: '0 0 12px #b2dfdb',
    padding: '1.2rem 1rem',
    textAlign: 'center',
    color: '#174c43',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
    transition: 'box-shadow 0.2s',
  },
  categoryLogo: {
    width: '40px',
    height: '40px',
    marginBottom: '0.5rem',
  },
  categoryDesc: {
    fontSize: '0.95rem',
    color: '#888',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    padding: '1.2rem 0',
    background: '#e0f7fa',
    color: '#009688',
    fontSize: '1rem',
    marginTop: '2rem',
    boxShadow: '0 -2px 8px #b2dfdb',
  },
};
