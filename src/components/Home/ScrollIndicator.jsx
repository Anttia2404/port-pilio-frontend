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
          Cuộn Xuống
        </span>
      </motion.div>

      {/* Space Shuttle icon - pointing down */}
      <motion.div
        className="relative w-16 h-20 flex items-center justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-14 h-18"
          viewBox="0 0 100 140"
          fill="none"
        >
          {/* Main body */}
          <ellipse cx="50" cy="50" rx="18" ry="45" fill="#e5e7eb" className="dark:fill-gray-300" />
          <ellipse cx="50" cy="50" rx="14" ry="42" fill="#f3f4f6" className="dark:fill-gray-200" />
          
          {/* Nose cone - black */}
          <ellipse cx="50" cy="20" rx="14" ry="20" fill="#1f2937" />
          
          {/* Windows */}
          <circle cx="50" cy="35" r="3" fill="#60a5fa" opacity="0.8" />
          <circle cx="50" cy="42" r="2.5" fill="#60a5fa" opacity="0.6" />
          
          {/* Left wing */}
          <path
            d="M 32 60 Q 15 70 10 85 L 20 80 Q 30 70 35 65 Z"
            fill="#d1d5db"
            className="dark:fill-gray-400"
          />
          <path
            d="M 32 60 Q 18 68 15 82 L 22 78 Q 30 68 35 65 Z"
            fill="#e5e7eb"
            className="dark:fill-gray-300"
          />
          
          {/* Right wing */}
          <path
            d="M 68 60 Q 85 70 90 85 L 80 80 Q 70 70 65 65 Z"
            fill="#d1d5db"
            className="dark:fill-gray-400"
          />
          <path
            d="M 68 60 Q 82 68 85 82 L 78 78 Q 70 68 65 65 Z"
            fill="#e5e7eb"
            className="dark:fill-gray-300"
          />
          
          {/* Tail fin */}
          <path
            d="M 45 85 L 50 105 L 55 85 Z"
            fill="#9ca3af"
            className="dark:fill-gray-500"
          />
          
          {/* Engine nozzles */}
          <ellipse cx="45" cy="95" rx="4" ry="3" fill="#374151" />
          <ellipse cx="55" cy="95" rx="4" ry="3" fill="#374151" />
          <ellipse cx="50" cy="98" rx="3" ry="2" fill="#374151" />
          
          {/* Rocket flames - animated */}
          <motion.g
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scaleY: [0.9, 1.2, 0.9]
            }}
            transition={{ 
              duration: 0.3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Left flame */}
            <path
              d="M 45 95 Q 43 105 41 115 Q 45 110 45 95 Z"
              fill="#f97316"
              opacity="0.9"
            />
            <path
              d="M 45 95 Q 44 102 43 110 Q 45 105 45 95 Z"
              fill="#fbbf24"
              opacity="0.8"
            />
            
            {/* Right flame */}
            <path
              d="M 55 95 Q 57 105 59 115 Q 55 110 55 95 Z"
              fill="#f97316"
              opacity="0.9"
            />
            <path
              d="M 55 95 Q 56 102 57 110 Q 55 105 55 95 Z"
              fill="#fbbf24"
              opacity="0.8"
            />
            
            {/* Center flame */}
            <path
              d="M 50 98 Q 48 110 46 120 Q 50 112 54 120 Q 52 110 50 98 Z"
              fill="#fb923c"
              opacity="0.95"
            />
            <path
              d="M 50 98 Q 49 105 48 112 Q 50 108 52 112 Q 51 105 50 98 Z"
              fill="#fde047"
              opacity="0.9"
            />
          </motion.g>
          
          {/* Glow effect */}
          <motion.ellipse
            cx="50"
            cy="110"
            rx="15"
            ry="8"
            fill="#f97316"
            opacity="0.3"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </svg>
      </motion.div>

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
