import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

import * as api from "../../services/api.js";

import AddExerciseForm from "./AddExerciseForm.jsx";
import WeekSection from "./WeekSection";
import WeekLists from "./WeekLists";
import Title from "./Title";

import ExerciseDetailModal from "./ExerciseDetailModal";
import AddWeekForm from "./AddWeekForm";

export default function ExercisePage() {
  const [weeks, setWeeks] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isAddingForWeek, setIsAddingForWeek] = useState(null);
  const [isAddingWeek, setIsAddingWeek] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function sortExercises(exercises) {
    if (!exercises) return [];
    return exercises.sort((a, b) => {
      const numA = parseInt(a.id.split("-b")[1], 10);
      const numB = parseInt(b.id.split("-b")[1], 10);
      return numA - numB;
    });
  }

  useEffect(() => {
    async function fetchWeeks() {
      setIsLoading(true);
      try {
        const data = await api.getWeeks();
        const sortedData = data.map((week) => ({
          ...week,
          exercises: sortExercises(week.exercises),
        }));
        setWeeks(sortedData);
      } catch {
        // Error handled silently - could add toast notification here
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeeks();
  }, []);

  async function handleAddWeek(formData) {
    setIsLoading(true);
    const nextWeekNum = weeks.length + 1;
    const newId = `week-${nextWeekNum}`;
    const newTitle = `Tuần ${nextWeekNum}: ${formData.title}`;
    const dataToSend = { id: newId, title: newTitle };

    try {
      const savedWeek = await api.createWeek(dataToSend);
      setWeeks((prevWeeks) => [...prevWeeks, { ...savedWeek, exercises: [] }]);
      setIsAddingWeek(false);
    } catch {
      // Error handled silently - could add toast notification here
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteWeek(weekId) {
    if (
      window.confirm(
        "Bạn có chắc muốn XÓA TOÀN BỘ TUẦN này không? Mọi bài tập bên trong cũng sẽ bị xóa vĩnh viễn."
      )
    ) {
      setIsLoading(true);
      try {
        await api.deleteWeek(weekId);
        setWeeks((prevWeeks) => prevWeeks.filter((week) => week.id !== weekId));
      } catch {
        // Error handled silently - could add toast notification here
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleAddExercise(weekId, formData) {
    setIsLoading(true);
    const currentWeek = weeks.find((week) => week.id === weekId);
    if (!currentWeek) return;
    const nextSessionNum = currentWeek.exercises.length + 1;
    const weekNum = currentWeek.id.split("-")[1];
    const newId = `t${weekNum}-b${nextSessionNum}`;
    const newTitle = `Buổi ${nextSessionNum}: ${formData.title}`;

    const dataToSend = {
      id: newId,
      title: newTitle,
      notes: formData.notes,
      repoLink: formData.repoLink,
      deployLink: formData.deployLink,
      week: { id: weekId },
    };

    try {
      const savedLesson = await api.createLesson(dataToSend);
      setWeeks((prevWeeks) =>
        prevWeeks.map((week) =>
          week.id === weekId
            ? {
                ...week,
                exercises: sortExercises([...week.exercises, savedLesson]),
              }
            : week
        )
      );
      setIsAddingForWeek(null);
    } catch {
      // Error handled silently - could add toast notification here
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteExercise(exerciseId) {
    if (window.confirm("Bạn có chắc muốn xóa bài tập này?")) {
      setIsLoading(true);
      try {
        await api.deleteLesson(exerciseId);
        setWeeks((prevWeeks) =>
          prevWeeks.map((week) => ({
            ...week,
            exercises: week.exercises.filter((ex) => ex.id !== exerciseId),
          }))
        );
        setSelectedExercise(null);
      } catch {
        // Error handled silently - could add toast notification here
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleEditExercise(updatedExercise) {
    setIsLoading(true);
    let weekId = null;
    for (const week of weeks) {
      if (week.exercises.find((ex) => ex.id === updatedExercise.id)) {
        weekId = week.id;
        break;
      }
    }
    if (!weekId) {
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      ...updatedExercise,
      week: { id: weekId },
    };

    try {
      const savedLesson = await api.updateLesson(
        updatedExercise.id,
        dataToSend
      );

      setWeeks((prevWeeks) =>
        prevWeeks.map((week) => ({
          ...week,
          exercises: sortExercises(
            week.exercises.map((ex) =>
              ex.id === savedLesson.id ? savedLesson : ex
            )
          ),
        }))
      );
      setExerciseToEdit(null);
    } catch {
      // Error handled silently - could add toast notification here
    } finally {
      setIsLoading(false);
    }
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
        <div className="flex justify-end mb-8">
          <motion.button
            onClick={() => setIsAddingWeek(true)}
            disabled={isLoading}
            className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium overflow-hidden
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="flex items-center gap-2 relative z-10">
              <FiPlus className="w-5 h-5" />
              <span>{isLoading ? "Đang tải..." : "Thêm Tuần Mới"}</span>
            </div>
          </motion.button>
        </div>

        {isLoading && weeks.length === 0 && (
          <motion.div 
            className="flex justify-center items-center h-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
              <p className="text-lg text-gray-900 dark:text-white font-medium">
                Đang tải dữ liệu...
              </p>
            </div>
          </motion.div>
        )}

        {!isLoading && weeks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Chưa có tuần nào, hãy thêm tuần mới!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Click vào nút "Thêm Tuần Mới" để bắt đầu
              </p>
            </div>
          </motion.div>
        )}

        <WeekLists>
          {weeks.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              handleDeleteWeek={handleDeleteWeek}
              setSelectedExercise={setSelectedExercise}
              setIsAddingForWeek={setIsAddingForWeek}
              isLoading={isLoading}
            />
          ))}
        </WeekLists>
      </div>

      {isAddingWeek && (
        <AddWeekForm
          onClose={() => setIsAddingWeek(false)}
          onAdd={handleAddWeek}
          isLoading={isLoading}
        />
      )}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onEdit={() => {
            setExerciseToEdit(selectedExercise);
            setSelectedExercise(null);
          }}
          onDelete={handleDeleteExercise}
          isLoading={isLoading}
        />
      )}
      {isAddingForWeek && (
        <AddExerciseForm
          weekId={isAddingForWeek}
          onClose={() => setIsAddingForWeek(null)}
          onAdd={handleAddExercise}
          isLoading={isLoading}
        />
      )}
      {exerciseToEdit && (
        <AddExerciseForm
          onClose={() => setExerciseToEdit(null)}
          onAdd={handleEditExercise}
          exerciseToEdit={exerciseToEdit}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}
