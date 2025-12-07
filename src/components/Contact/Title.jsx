import { motion } from "framer-motion";

export function Title() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600">
            Liên hệ
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Hãy kết nối với tôi! Nếu bạn có bất kỳ câu hỏi nào hoặc muốn trao đổi,
          đừng ngần ngại liên hệ với tôi qua biểu mẫu bên dưới.
        </p>
      </motion.div>
    </>
  );
}
