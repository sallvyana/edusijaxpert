export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-teal-100 text-teal-900 font-sans px-4">
      <section className="max-w-4xl mx-auto pt-14 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-3 drop-shadow">Kuis EduSijaXpert</h1>
        <p className="text-lg text-gray-700 mb-10">Uji kemampuanmu dengan soal SIJA, IoT, Cloud, dan Teknologi Digital!</p>

        {/* Highlight Keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '📚', title: 'Materi Komprehensif', desc: 'Soal SIJA, IoT, Cloud & Teknologi' },
            { icon: '⏰', title: 'Tanpa Batas Waktu', desc: 'Fokus pemahaman, bukan kecepatan' },
            { icon: '⚡', title: 'Feedback Instan', desc: 'Langsung tahu benar/salah' },
            { icon: '🚀', title: 'Tingkatkan Skill', desc: 'Asah kemampuan & upgrade diri' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-soft p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-base text-teal-700 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Kategori Quiz */}
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Kategori Quiz</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { name: 'IoT', desc: 'Internet of Things', icon: '/file.svg', href: '/quiz?kategori=iot' },
            { name: 'PaaS', desc: 'Platform as a Service', icon: '/globe.svg', href: '/quiz?kategori=paas' },
            { name: 'SaaS', desc: 'Software as a Service', icon: '/next.svg', href: '/quiz?kategori=saas' },
            { name: 'IaaS', desc: 'Infrastructure as a Service', icon: '/window.svg', href: '/quiz?kategori=iaas' },
          ].map((cat, i) => (
            <a
              key={i}
              href={cat.href}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-2 text-center hover:shadow-xl group transition-all duration-300"
            >
              <img src={cat.icon} alt={cat.name} className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-semibold text-teal-700">{cat.name}</h4>
              <p className="text-xs text-gray-600">{cat.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-5 bg-cyan-100 text-teal-700 text-sm shadow-inner">
        &copy; {new Date().getFullYear()} EduSijaXpert. All rights reserved.
      </footer>
    </main>
  );
}
