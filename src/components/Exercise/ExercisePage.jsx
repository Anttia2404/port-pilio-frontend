import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import WeekSection from "./WeekSection";
import WeekLists from "./WeekLists";
import Title from "./Title";
import ExerciseDetailModal from "./ExerciseDetailModal";
import { hardcodedWeeks } from "../../data/exerciseData.js";

const VIEWED_STORAGE_KEY = "exercise-viewed-status";

export default function ExercisePage() {
  const [weeks, setWeeks] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Load hardcoded data and merge with localStorage viewed status
  useEffect(() => {
    const viewedStatus = JSON.parse(localStorage.getItem(VIEWED_STORAGE_KEY) || "{}");
    
    const weeksWithViewedStatus = hardcodedWeeks.map(week => ({
      ...week,
      exercises: week.exercises.map(ex => ({
        ...ex,
        isViewed: viewedStatus[ex.id] || false,
        viewedAt: viewedStatus[ex.id] ? new Date().toISOString() : null,
      }))
    }));
    
    setWeeks(weeksWithViewedStatus);
  }, []);

  // Toggle viewed status and save to localStorage
  function handleToggleViewed(lessonId, isViewed) {
    // Update localStorage
    const viewedStatus = JSON.parse(localStorage.getItem(VIEWED_STORAGE_KEY) || "{}");
    viewedStatus[lessonId] = isViewed;
    localStorage.setItem(VIEWED_STORAGE_KEY, JSON.stringify(viewedStatus));
    
    // Update local state
    setWeeks(prevWeeks => 
      prevWeeks.map(week => ({
        ...week,
        exercises: week.exercises.map(ex => 
          ex.id === lessonId 
            ? { ...ex, isViewed, viewedAt: isViewed ? new Date().toISOString() : null }
            : ex
        )
      }))
    );
  }

  return (
    <section
      className="min-h-screen py-28 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-purple-950/30 dark:to-pink-950/30 relative overflow-hidden"
      id="exercises"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 dark:bg-purple-400/10 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Title />

        {weeks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Đang tải dữ liệu bài tập...
              </p>
            </div>
          </motion.div>
        )}

        <WeekLists>
          {weeks.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              setSelectedExercise={setSelectedExercise}
              onViewedToggle={handleToggleViewed}
            />
          ))}
        </WeekLists>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </section>
  );
}
