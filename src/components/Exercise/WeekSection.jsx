import { motion } from "framer-motion";
import ExerciseCard from "./ExerciseCard";

export default function WeekSection({
  week,
  setSelectedExercise,
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {week.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onClick={() => setSelectedExercise(ex)}
              onViewedToggle={onViewedToggle}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
