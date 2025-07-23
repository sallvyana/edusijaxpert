import { motion } from 'framer-motion';
export default function QuizCard({ question, options, onAnswer }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft p-6 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold text-primary mb-4 text-center">{question}</h2>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className="bg-bgLight hover:bg-primary hover:text-white transition-all border-2 border-primary rounded-xl px-4 py-3 text-left text-primary font-semibold shadow"
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
          </button>
        ))}
      </div>
    </motion.div>
  );
}