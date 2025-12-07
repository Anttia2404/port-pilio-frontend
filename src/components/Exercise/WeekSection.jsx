import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import ExerciseCard from "./ExerciseCard";
export default function WeekSection({
  week,
  handleDeleteWeek,
  setSelectedExercise,
  setIsAddingForWeek,
  onViewedToggle,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {week.title}
            </h3>
          </div>
          <motion.button
            onClick={() => handleDeleteWeek(week.id)}
            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 bg-gray-50 dark:bg-neutral-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Xóa tuần"
          >
            <FiTrash2 size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {week.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onClick={() => setSelectedExercise(ex)}
              onViewedToggle={onViewedToggle}
            />
          ))}
          <motion.button
            onClick={() => setIsAddingForWeek(week.id)}
            className="group h-36 w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-neutral-700 
                       text-gray-400 dark:text-neutral-500 hover:border-green-500 hover:text-green-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400 
                       bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-green-50/50 dark:hover:bg-green-900/10
                       transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-3 rounded-full bg-gray-100 dark:bg-neutral-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors mb-2">
              <FiPlus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">Thêm buổi</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

// WeekSection.propTypes = {
//   week: PropTypes.shape({
//     weekTitle: PropTypes.string.isRequired,
//     exercises: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         notes: PropTypes.string,
//         repoLink: PropTypes.string,
//         deployLink: PropTypes.string,
//       })
//     ).isRequired,
//   }).isRequired,
//   onOpenAddForm: PropTypes.func.isRequired,
//   onSelectExercise: PropTypes.func.isRequired,
// };
