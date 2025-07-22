
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-cyan-100 via-cyan-200 to-teal-100 text-teal-900 font-sans">
      <div className="w-full max-w-2xl mx-auto mt-10 mb-6 text-center">
        <h1 className="text-4xl font-bold text-teal-600 mb-2 drop-shadow-lg">Kuis EduSijaXpert</h1>
        <p className="text-lg text-gray-700 mb-8">Uji kemampuanmu dengan soal SIJA, IoT, Cloud, dan Teknologi Digital!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition">
            <span className="text-2xl mb-1">📚</span>
            <b className="mb-1">Materi Komprehensif</b>
            <div className="text-sm text-gray-600">Pertanyaan SIJA, IoT, Cloud, dan Teknologi</div>
          </div>
          <div className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition">
            <span className="text-2xl mb-1">⏰</span>
            <b className="mb-1">Tanpa Batas Waktu</b>
            <div className="text-sm text-gray-600">Kerjakan dengan santai, fokus pemahaman</div>
          </div>
          <div className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition">
            <span className="text-2xl mb-1">⚡</span>
            <b className="mb-1">Feedback Instan</b>
            <div className="text-sm text-gray-600">Langsung tahu benar/salah setiap jawaban</div>
          </div>
          <div className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition">
            <span className="text-2xl mb-1">🚀</span>
            <b className="mb-1">Tingkatkan Skill</b>
            <div className="text-sm text-gray-600">Asah kemampuan SIJA & teknologi digital</div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto mb-10 text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-5 drop-shadow">Kategori Quiz</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center">
          <a href="/quiz?kategori=iot" className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition group">
            <img src="/file.svg" alt="IoT" className="w-10 h-10 mb-2 group-hover:scale-110 transition" />
            <div className="font-bold">IoT</div>
            <div className="text-xs text-gray-600">Internet of Things</div>
          </a>
          <a href="/quiz?kategori=paas" className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition group">
            <img src="/globe.svg" alt="PaaS" className="w-10 h-10 mb-2 group-hover:scale-110 transition" />
            <div className="font-bold">PaaS</div>
            <div className="text-xs text-gray-600">Platform as a Service</div>
          </a>
          <a href="/quiz?kategori=saas" className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition group">
            <img src="/next.svg" alt="SaaS" className="w-10 h-10 mb-2 group-hover:scale-110 transition" />
            <div className="font-bold">SaaS</div>
            <div className="text-xs text-gray-600">Software as a Service</div>
          </a>
          <a href="/quiz?kategori=iaas" className="bg-cyan-100 rounded-xl shadow-md p-5 flex flex-col items-center gap-1 hover:shadow-lg transition group">
            <img src="/window.svg" alt="IaaS" className="w-10 h-10 mb-2 group-hover:scale-110 transition" />
            <div className="font-bold">IaaS</div>
            <div className="text-xs text-gray-600">Infrastructure as a Service</div>
          </a>
        </div>
      </div>
      <footer className="w-full text-center py-5 bg-cyan-100 text-teal-600 text-base mt-8 shadow-inner">
        <div>&copy; {new Date().getFullYear()} EduSijaXpert</div>
      </footer>
    </main>
  );
}
