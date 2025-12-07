import { motion } from "framer-motion";
export default function Avatar() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-8 relative"
      >
        {/* Decorative Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-2 border-indigo-200 dark:border-indigo-800 opacity-20 animate-ping"></div>
          <div className="absolute w-56 h-56 rounded-full border-2 border-purple-200 dark:border-purple-800 opacity-20 animate-pulse"></div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse-glow"></div>
        </div>

        {/* Avatar Image */}
        <motion.div
          className="relative z-10 animate-float"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
            <img
              src="/avatar.jpg"
              alt="Võ Tấn Tài - Full-stack Developer"
              className="w-full h-full rounded-full shadow-2xl object-cover ring-4 ring-white dark:ring-gray-900"
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

