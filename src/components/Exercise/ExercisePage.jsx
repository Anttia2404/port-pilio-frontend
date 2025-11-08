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
      try {
        const data = await api.getWeeks();
        const sortedData = data.map((week) => ({
          ...week,
          exercises: sortExercises(week.exercises),
        }));
        setWeeks(sortedData);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err.message);
      }
    }
    fetchWeeks();
  }, []);

  async function handleAddWeek(formData) {
    const nextWeekNum = weeks.length + 1;
    const newId = `week-${nextWeekNum}`;
    const newTitle = `Tuần ${nextWeekNum}: ${formData.title}`;
    const dataToSend = { id: newId, title: newTitle };

    try {
      const savedWeek = await api.createWeek(dataToSend);
      setWeeks((prevWeeks) => [...prevWeeks, { ...savedWeek, exercises: [] }]);
      setIsAddingWeek(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDeleteWeek(weekId) {
    if (
      window.confirm(
        "Bạn có chắc muốn XÓA TOÀN BỘ TUẦN này không? Mọi bài tập bên trong cũng sẽ bị xóa vĩnh viễn."
      )
    ) {
      try {
        await api.deleteWeek(weekId);
        setWeeks((prevWeeks) => prevWeeks.filter((week) => week.id !== weekId));
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleAddExercise(weekId, formData) {
    const currentWeek = weeks.find((week) => week.id === weekId);
    if (!currentWeek) return console.error("Không tìm thấy tuần!");
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
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDeleteExercise(exerciseId) {
    if (window.confirm("Bạn có chắc muốn xóa bài tập này?")) {
      try {
        await api.deleteLesson(exerciseId);
        setWeeks((prevWeeks) =>
          prevWeeks.map((week) => ({
            ...week,
            exercises: week.exercises.filter((ex) => ex.id !== exerciseId),
          }))
        );
        setSelectedExercise(null);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleEditExercise(updatedExercise) {
    let weekId = null;
    for (const week of weeks) {
      if (week.exercises.find((ex) => ex.id === updatedExercise.id)) {
        weekId = week.id;
        break;
      }
    }
    if (!weekId) return console.error("Không tìm thấy tuần của bài tập!");

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
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <section
      className="min-h-screen py-28 bg-gray-50 dark:bg-neutral-900"
      id="exercises"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Title />
        <div className="flex justify-end mb-8">
          <motion.button
            onClick={() => setIsAddingWeek(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus />
            Thêm Tuần Mới
          </motion.button>
        </div>
        <WeekLists>
          {weeks.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              handleDeleteWeek={handleDeleteWeek}
              setSelectedExercise={setSelectedExercise}
              setIsAddingForWeek={setIsAddingForWeek}
            />
          ))}
        </WeekLists>
      </div>

      {isAddingWeek && (
        <AddWeekForm
          onClose={() => setIsAddingWeek(false)}
          onAdd={handleAddWeek}
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
        />
      )}
      {isAddingForWeek && (
        <AddExerciseForm
          weekId={isAddingForWeek}
          onClose={() => setIsAddingForWeek(null)}
          onAdd={handleAddExercise}
        />
      )}
      {exerciseToEdit && (
        <AddExerciseForm
          onClose={() => setExerciseToEdit(null)}
          onAdd={handleEditExercise}
          exerciseToEdit={exerciseToEdit}
        />
      )}
    </section>
  );
}
