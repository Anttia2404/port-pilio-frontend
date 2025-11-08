// ExercisePage.js (ĐÃ SỬA LẠI ĐỂ DÙNG API.JS)

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi"; // Bạn đã quên import FiTrash2, tôi sẽ thêm vào sau

// (1) Import TẤT CẢ các hàm API từ file mới
import * as api from "../../services/api.js"; // Đường dẫn này ĐÚNG

// (Import các component con - SỬA ĐƯỜNG DẪN Ở ĐÂY)
import AddExerciseForm from "./AddExerciseForm.jsx";
import WeekSection from "./WeekSection";
import WeekLists from "./WeekLists";
import Title from "./Title"; // Giả sử Title.js nằm cùng cấp (ĐÚNG)

import ExerciseDetailModal from "./ExerciseDetailModal";
import AddWeekForm from "./AddWeekForm";

export default function ExercisePage() {
  const [weeks, setWeeks] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isAddingForWeek, setIsAddingForWeek] = useState(null);
  const [isAddingWeek, setIsAddingWeek] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // === (Hàm sắp xếp - Giữ nguyên) ===
  function sortExercises(exercises) {
    if (!exercises) return [];
    return exercises.sort((a, b) => {
      const numA = parseInt(a.id.split("-b")[1], 10);
      const numB = parseInt(b.id.split("-b")[1], 10);
      return numA - numB;
    });
  }

  // === (5) SỬA LẠI TOÀN BỘ CÁC HÀM ĐỂ DÙNG "api.js" ===

  useEffect(() => {
    async function fetchWeeks() {
      setIsLoading(true);
      try {
        const data = await api.getWeeks(); // <--- DÙNG API
        const sortedData = data.map((week) => ({
          ...week,
          exercises: sortExercises(week.exercises),
        }));
        setWeeks(sortedData);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err.message);
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
      const savedWeek = await api.createWeek(dataToSend); // <--- DÙNG API
      setWeeks((prevWeeks) => [...prevWeeks, { ...savedWeek, exercises: [] }]);
      setIsAddingWeek(false);
    } catch (err) {
      console.error(err.message);
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
        await api.deleteWeek(weekId); // <--- DÙNG API
        setWeeks((prevWeeks) => prevWeeks.filter((week) => week.id !== weekId));
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleAddExercise(weekId, formData) {
    setIsLoading(true);
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
      const savedLesson = await api.createLesson(dataToSend); // <--- DÙNG API
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
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteExercise(exerciseId) {
    if (window.confirm("Bạn có chắc muốn xóa bài tập này?")) {
      setIsLoading(true);
      try {
        await api.deleteLesson(exerciseId); // <--- DÙNG API
        setWeeks((prevWeeks) =>
          prevWeeks.map((week) => ({
            ...week,
            exercises: week.exercises.filter((ex) => ex.id !== exerciseId),
          }))
        );
        setSelectedExercise(null);
      } catch (err) {
        console.error(err.message);
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
      console.error("Không tìm thấy tuần của bài tập!");
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
      ); // <--- DÙNG API

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
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
          >
            <FiPlus />
            {isLoading ? "Đang tải..." : "Thêm Tuần Mới"}
          </motion.button>
        </div>

        {isLoading && weeks.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg dark:text-white">Đang tải dữ liệu...</p>
          </div>
        )}

        {!isLoading && weeks.length === 0 && (
          <p className="text-center text-lg dark:text-gray-400">
            Chưa có tuần nào, hãy thêm tuần mới!
          </p>
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
