import { motion } from "framer-motion";
import { FiCode, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

export default function ExerciseCard({ exercise, onClick, onViewedToggle }) {
  const [isViewed, setIsViewed] = useState(exercise.isViewed || false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleViewed = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (isUpdating) return;
    
    setIsUpdating(true);
    const newStatus = !isViewed;
    
    try {
      await onViewedToggle(exercise.id, newStatus);
      setIsViewed(newStatus);
    } catch (error) {
      console.error('Failed to update viewed status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

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
      {/* Viewed Badge - Top Right */}
      <motion.button
        onClick={handleToggleViewed}
        disabled={isUpdating}
        className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1
                   transition-all duration-300 ${
          isViewed 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-300 dark:border-green-700' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
        } hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isViewed ? (
          <>
            <FiEye className="w-3 h-3" />
            <span>Đã xem</span>
          </>
        ) : (
          <>
            <FiEyeOff className="w-3 h-3" />
            <span>Chưa xem</span>
          </>
        )}
      </motion.button>

      {/* Existing card content */}
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
