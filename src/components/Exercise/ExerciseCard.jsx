import { motion } from "framer-motion";
import { 
  FiBook, 
  FiLayers, 
  FiCode, 
  FiServer, 
  FiFileText, 
  FiShoppingCart, 
  FiTag, 
  FiDatabase,
  FiBox,
  FiMail,
  FiEye, 
  FiEyeOff 
} from "react-icons/fi";
import { useState } from "react";

const iconMap = {
  book: FiBook,
  layers: FiLayers,
  code: FiCode,
  server: FiServer,
  "file-text": FiFileText,
  "shopping-cart": FiShoppingCart,
  tag: FiTag,
  database: FiDatabase,
  box: FiBox,
  mail: FiMail,
};

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

  const Icon = iconMap[exercise.icon] || FiCode;
  const iconColor = exercise.color || "#10B981";

  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 h-36 flex flex-col items-center justify-center text-center 
                 border-2 border-transparent hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        borderColor: 'transparent',
      }}
      whileHover={{ 
        y: -5,
        borderColor: iconColor,
        boxShadow: `0 10px 30px ${iconColor}20`,
      }}
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

      {/* Background gradient effect */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 opacity-10"
        style={{ backgroundColor: iconColor }}
      ></div>
      
      {/* Icon with dynamic color */}
      <div 
        className="p-3 rounded-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
        style={{ 
          backgroundColor: `${iconColor}15`,
        }}
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: iconColor }}
        />
      </div>
      
      <span 
        className="font-semibold text-gray-800 dark:text-gray-200 transition-colors line-clamp-2 group-hover:font-bold"
        style={{
          color: undefined,
        }}
      >
        {exercise.title}
      </span>
    </motion.div>
  );
}
