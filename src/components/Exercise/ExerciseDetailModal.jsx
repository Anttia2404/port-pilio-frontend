import { motion } from "framer-motion";
import { FiGithub, FiLink } from "react-icons/fi";

export default function ExerciseDetailModal({
  exercise,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          {exercise.title}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Ghi chú
            </label>
            <p className="text-gray-800 dark:text-gray-200 p-3 bg-gray-50 dark:bg-neutral-700 rounded-md min-h-[50px] whitespace-pre-line">
              {exercise.notes || "(Không có ghi chú)"}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={exercise.repoLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                exercise.repoLink
                  ? "bg-gray-800 text-white hover:bg-gray-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiGithub /> Repo Git
            </a>
            <a
              href={exercise.deployLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                exercise.deployLink
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiLink /> Deploy
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
