import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolled down more than 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-12 right-8 z-50 flex flex-col items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      whileHover={{ scale: 1.15 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform" />

      {/* Text label with background */}
      <motion.div
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-cyan-500/30 dark:border-cyan-400/30"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 tracking-wider uppercase">
          Scroll Down
        </span>
      </motion.div>

      {/* Mouse icon - Larger and more vibrant */}
      <div className="relative w-8 h-14 border-3 border-cyan-500 dark:border-cyan-400 rounded-full flex justify-center overflow-hidden group-hover:border-purple-500 dark:group-hover:border-purple-400 transition-colors shadow-lg shadow-cyan-500/50 dark:shadow-cyan-400/50 group-hover:shadow-purple-500/50 dark:group-hover:shadow-purple-400/50">
        <motion.div
          className="w-2 h-4 bg-gradient-to-b from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 rounded-full absolute top-3 shadow-lg"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Chevron down icon - Larger with glow */}
      <motion.svg
        className="w-7 h-7 text-cyan-500 dark:text-cyan-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        fill="none"
        strokeWidth="3"
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </motion.svg>

      {/* Animated pulse ring */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-500/50 dark:border-cyan-400/50 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
