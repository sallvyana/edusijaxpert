import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function StatBoard({ score, timer, streak, index, total }) {
  const data = [
    { name: 'Benar', value: score },
    { name: 'Streak', value: streak },
    { name: 'Sisa', value: total - index },
  ];
  return (
    <motion.div
      className="bg-cyan-50 rounded-xl p-4 shadow-inner mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="font-bold text-teal-700 mb-2">📊 Statistik Langsung</h3>
      <div className="flex justify-between mb-2 text-sm">
        <div>Soal: {index}/{total}</div>
        <div>Waktu: {timer}s</div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#34d399" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
