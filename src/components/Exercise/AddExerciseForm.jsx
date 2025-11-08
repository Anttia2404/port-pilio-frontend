import { useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";

// (1) Thêm 'isLoading' vào props
export default function AddExerciseForm({
  weekId,
  onClose,
  onAdd,
  exerciseToEdit = null,
  isLoading = false, // Thêm prop
}) {
  const isEditMode = Boolean(exerciseToEdit);

  // (2) Bỏ state 'id'
  const [title, setTitle] = useState(isEditMode ? exerciseToEdit.title : "");
  const [notes, setNotes] = useState(isEditMode ? exerciseToEdit.notes : "");
  const [repoLink, setRepoLink] = useState(
    isEditMode ? exerciseToEdit.repoLink : ""
  );
  const [deployLink, setDeployLink] = useState(
    isEditMode ? exerciseToEdit.deployLink : ""
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return alert("Vui lòng nhập tiêu đề!");

    // (3) Sửa lại data gửi đi (Bỏ ID)
    // 'title' ở đây là 'chủ đề' (ví dụ: "React Hooks")
    const exerciseData = {
      title,
      notes,
      repoLink,
      deployLink,
    };

    if (isEditMode) {
      // Gửi data (đã sửa) VÀ id (cũ)
      onAdd({ ...exerciseData, id: exerciseToEdit.id });
    } else {
      // Gửi data (chưa có id/title)
      onAdd(weekId, exerciseData);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
          disabled={isLoading} // Thêm disabled
        >
          &times;
        </button>

        {/* (SỬA Ở ĐÂY) Thêm "text-gray-900" */}
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {isEditMode ? "Cập nhật bài tập" : "Thêm bài tập mới"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* (4) Bỏ input ID, sửa label Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {/* Nếu là Sửa, giữ nguyên Tiêu đề. Nếu là Thêm, hỏi Chủ đề. */}
              {isEditMode ? "Tiêu đề" : "Chủ đề buổi học (ví dụ: React Hooks)"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // (5) Nếu là chế độ Sửa, chúng ta không cho sửa tiêu đề
              disabled={isEditMode}
              // (SỬA Ở ĐÂY) Thêm "text-gray-900"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white
                         ${
                           isEditMode
                             ? "bg-gray-100 dark:bg-neutral-900 cursor-not-allowed" // Thêm cursor-not-allowed
                             : ""
                         }`}
              required
            />
          </div>

          {/* ... (Các input còn lại giữ nguyên) ... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ghi chú
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              // (SỬA Ở ĐÂY) Thêm "text-gray-900"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Link Repo Git
            </label>
            <input
              type="text"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              placeholder="https://github.com/..."
              // (SỬA Ở ĐÂY) Thêm "text-gray-900"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Link Deploy
            </label>
            <input
              type="text"
              value={deployLink}
              onChange={(e) => setDeployLink(e.target.value)}
              placeholder="https://my-project.vercel.app"
              // (SỬA Ở ĐÂY) Thêm "text-gray-900"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>

          <div className="flex justify-end">
            {/* (6) Thêm logic 'disabled' cho nút */}
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditMode ? <FiSave /> : <FiPlus />}
              {isLoading
                ? "Đang lưu..."
                : isEditMode
                ? "Lưu thay đổi"
                : "Thêm bài tập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
