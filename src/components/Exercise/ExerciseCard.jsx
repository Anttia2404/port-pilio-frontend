import { motion } from "framer-motion";

export default function ExerciseCard({ exercise, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-32 flex items-center justify-center text-center font-medium text-gray-800 dark:text-gray-200 hover:shadow-lg dark:hover:bg-neutral-700 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      layout
    >
      {exercise.title}
    </motion.div>
  );
}
