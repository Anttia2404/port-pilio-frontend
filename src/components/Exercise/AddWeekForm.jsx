import { useState } from "react";
import { FiPlus } from "react-icons/fi";

// (1) Thêm 'isLoading' vào props
export default function AddWeekForm({
  onClose,
  onAdd,
  isLoading = false, // Thêm prop
}) {
  // (2) Bỏ state 'id', chỉ cần 'title'
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return alert("Vui lòng nhập chủ đề tuần!");

    // (3) Gửi object CHỈ CÓ TITLE về
    onAdd({ title });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
          disabled={isLoading} // (4) Vô hiệu hóa nút X khi đang tải
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Tạo Tuần Học Mới
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* (5) Bỏ input 'id' */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading} // (6) Vô hiệu hóa nút Add
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus />
              {/* (7) Đổi text khi loading */}
              {isLoading ? "Đang tạo..." : "Tạo Tuần"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
