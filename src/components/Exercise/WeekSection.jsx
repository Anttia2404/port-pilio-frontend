import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import ExerciseCard from "./ExerciseCard";
export default function WeekSection({
  week,
  handleDeleteWeek,
  setSelectedExercise,
  setIsAddingForWeek,
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {week.title}
          </h3>
          <motion.button
            onClick={() => handleDeleteWeek(week.id)}
            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            whileHover={{ scale: 1.1 }}
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
            />
          ))}
          <motion.button
            onClick={() => setIsAddingForWeek(week.id)}
            className="h-32 w-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 dark:border-neutral-700 text-gray-500 dark:text-neutral-500 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus className="w-8 h-8 mb-1" />
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
