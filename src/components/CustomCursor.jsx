import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const { cursorVariant } = useCursor();

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMousePosition(newPos);
      setIsVisible(true);
      
      // Add to trail
      setTrail((prev) => [...prev, newPos].slice(-8)); // Keep last 8 positions
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isHovering = cursorVariant === "hover";

  return (
    <>
      {/* Hide default cursor on desktop only */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Trail Dots */}
      <AnimatePresence>
        {trail.map((pos, index) => (
          <motion.div
            key={pos.id}
            className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] hidden md:block"
            style={{
              background: `linear-gradient(135deg, rgba(99, 102, 241, ${0.6 - index * 0.08}), rgba(168, 85, 247, ${0.6 - index * 0.08}))`,
            }}
            initial={{ x: pos.x - 4, y: pos.y - 4, scale: 1, opacity: 1 }}
            animate={{ 
              x: pos.x - 4, 
              y: pos.y - 4, 
              scale: 1 - index * 0.1,
              opacity: 1 - index * 0.12
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>

      {/* Pulse Ring (when hovering) */}
      <AnimatePresence>
        {isHovering && isVisible && (
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block border-2"
            style={{
              borderColor: "rgba(168, 85, 247, 0.5)",
              width: "64px",
              height: "64px",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              x: mousePosition.x - 32,
              y: mousePosition.y - 32,
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Cursor Ring with Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.4))",
          backdropFilter: "blur(4px)",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          boxShadow: isHovering 
            ? "0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(99, 102, 241, 0.6)"
            : "0 0 15px rgba(168, 85, 247, 0.4)",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 16),
          y: mousePosition.y - (isHovering ? 32 : 16),
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        initial={{ opacity: 0, width: "32px", height: "32px" }}
      />

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          background: "white",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.2,
        }}
        initial={{ opacity: 0 }}
      />

      {/* Text Label (when hovering) */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              x: mousePosition.x + 25,
              y: mousePosition.y - 35,
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
              Click
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;

