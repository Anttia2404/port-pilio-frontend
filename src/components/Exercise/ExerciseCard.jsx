import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";

export default function ExerciseCard({ exercise, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 h-36 flex flex-col items-center justify-center text-center 
                 border border-gray-100 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-emerald-400/50
                 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-green-50 dark:to-green-900/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
      
      <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <FiCode className="w-6 h-6 text-green-600 dark:text-emerald-400" />
      </div>
      
      <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
        {exercise.title}
      </span>
    </motion.div>
  );
}
