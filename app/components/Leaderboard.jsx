'use client';
import { motion } from 'framer-motion';

const dummyData = [
  { name: 'Aldi', score: 250, time: '2:15' },
  { name: 'Bella', score: 230, time: '2:50' },
  { name: 'Chandra', score: 220, time: '3:00' },
  { name: 'Dewi', score: 210, time: '2:45' },
];

export default function Leaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto my-8"
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">🏆 Leaderboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-cyan-100 text-teal-800 font-semibold">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">Skor</th>
              <th className="py-3 px-4">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((entry, index) => (
              <tr
                key={index}
                className={`hover:bg-cyan-50 ${index === 0 ? 'font-bold text-teal-700' : ''}`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{entry.name}</td>
                <td className="py-3 px-4">{entry.score}</td>
                <td className="py-3 px-4">{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
