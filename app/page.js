
export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Selamat Datang di Kuis EduSijaXpert</h1>
      <p style={styles.subtitle}>Uji pemahamanmu tentang dunia teknologi & SIJA!</p>
      <div style={styles.categories}>
        <a href="/quiz?kategori=iot" style={styles.categoryButton}>IoT</a>
        <a href="/quiz?kategori=paas" style={styles.categoryButton}>PaaS</a>
        <a href="/quiz?kategori=saas" style={styles.categoryButton}>SaaS</a>
        <a href="/quiz?kategori=iaas" style={styles.categoryButton}>IaaS</a>
      </div>
      <div style={styles.glow}></div>
    </main>
  );
}

const styles = {
  container: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0a1a2f 0%, #003366 100%)',
    color: '#00cfff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: '0 0 40px 10px #00cfff55',
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, #00cfff55 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textShadow: '0 0 10px #00cfff, 0 0 20px #003366',
    zIndex: 1,
  },
  subtitle: {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    color: '#b3e6ff',
    textShadow: '0 0 6px #003366',
    zIndex: 1,
  },
  categories: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2.5rem',
    zIndex: 1,
  },
  categoryButton: {
    background: 'linear-gradient(90deg, #0055ff 0%, #00cfff 100%)',
    padding: '1rem 2.2rem',
    borderRadius: '16px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    boxShadow: '0 0 30px #00cfff99',
    border: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    zIndex: 1,
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: '1px',
  },
};
