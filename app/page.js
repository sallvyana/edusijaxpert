export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Selamat Datang di Kuis EduSijaXpert</h1>
      <p style={styles.subtitle}>Uji pemahamanmu tentang dunia teknologi & SIJA!</p>
      <a href="/quiz" style={styles.button}>Mulai Kuis</a>
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: '#0d1117',
    color: '#58a6ff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#1f6feb',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};
