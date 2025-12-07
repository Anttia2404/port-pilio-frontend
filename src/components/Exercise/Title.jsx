import { motion } from "framer-motion";
export default function Title() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-green-600">
          Bài tập Lập trình Web
        </span>
      </h2>
    </motion.div>
  );
}
