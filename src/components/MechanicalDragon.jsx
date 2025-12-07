import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

// Simple Custom Cursor with Movement and Click Effects
const MechanicalDragon = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [clickRipples, setClickRipples] = useState([]);
  const { cursorVariant } = useCursor();

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Click effect
  useEffect(() => {
    const handleClick = (e) => {
      setClickRipples((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          createdAt: Date.now(),
        },
      ]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Cursor trail effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: mousePosition.x,
          y: mousePosition.y,
          createdAt: Date.now(),
        },
      ]);
    }, 50);

    return () => clearInterval(interval);
  }, [mousePosition]);

  // Clean up old trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) =>
        prev.filter((dot) => Date.now() - dot.createdAt < 500)
      );
      setClickRipples((prev) =>
        prev.filter((ripple) => Date.now() - ripple.createdAt < 800)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Don't show on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body { cursor: none !important; }
        }
      `}</style>

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{ 
          x: Math.max(0, Math.min(mousePosition.x - 6, window.innerWidth - 12)), 
          y: Math.max(0, Math.min(mousePosition.y - 6, window.innerHeight - 12)),
        }}
        transition={{ 
          type: "spring", 
          stiffness: 2000, 
          damping: 50
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{
            background: isAttentive 
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            boxShadow: isAttentive
              ? "0 0 20px rgba(102, 126, 234, 0.6), 0 0 40px rgba(118, 75, 162, 0.4)"
              : "0 0 20px rgba(240, 147, 251, 0.6), 0 0 40px rgba(245, 87, 108, 0.4)",
          }}
          animate={{
            scale: isAttentive ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: isAttentive ? Infinity : 0,
          }}
        />
      </motion.div>

      {/* Outer Ring - Follows with delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        animate={{ 
          x: Math.max(0, Math.min(mousePosition.x - 20, window.innerWidth - 40)), 
          y: Math.max(0, Math.min(mousePosition.y - 20, window.innerHeight - 40)),
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 20
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: isAttentive 
              ? "rgba(102, 126, 234, 0.5)"
              : "rgba(240, 147, 251, 0.5)",
          }}
          animate={{
            scale: isAttentive ? [1, 1.2, 1] : 1,
            rotate: 360,
          }}
          transition={{
            scale: {
              duration: 0.6,
              repeat: isAttentive ? Infinity : 0,
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </motion.div>

      {/* Cursor Trail */}
      <AnimatePresence>
        {cursorTrail.map((dot) => (
          <motion.div
            key={dot.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
            initial={{ 
              x: dot.x - 2, 
              y: dot.y - 2, 
              opacity: 0.6, 
              scale: 1 
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-1 h-1 rounded-full"
              style={{
                background: isAttentive 
                  ? "rgba(102, 126, 234, 0.8)"
                  : "rgba(240, 147, 251, 0.8)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Ripples */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-[9996] hidden md:block"
            initial={{ 
              x: ripple.x - 20, 
              y: ripple.y - 20,
            }}
          >
            <motion.div
              className="w-10 h-10 rounded-full border-2"
              style={{
                borderColor: isAttentive 
                  ? "rgba(102, 126, 234, 0.8)"
                  : "rgba(240, 147, 251, 0.8)",
              }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ 
                scale: 3, 
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default MechanicalDragon;
