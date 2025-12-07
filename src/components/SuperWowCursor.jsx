import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const SuperWowCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { cursorVariant } = useCursor();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
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
  const isInverse = cursorVariant === "inverse";

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

      {/* Layer 3: Outer Liquified Ring (Slowest, Most Blur) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          width: "80px",
          height: "80px",
          background: isInverse 
            ? "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.1), rgba(168,85,247,0.1), transparent 70%)",
          filter: "blur(12px)",
          mixBlendMode: isInverse ? "difference" : "normal",
        }}
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isHovering ? 1.4 : isInverse ? 1.6 : 1,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.8,
        }}
      />

      {/* Layer 2: Middle Ring (Medium Speed, Medium Blur) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          width: "48px",
          height: "48px",
          background: isInverse
            ? "rgba(255, 255, 255, 0.3)"
            : "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
          border: isInverse 
            ? "2px solid rgba(255, 255, 255, 0.6)"
            : "2px solid rgba(255, 255, 255, 0.3)",
          filter: "blur(4px)",
          backdropFilter: "blur(8px)",
          mixBlendMode: isInverse ? "difference" : "normal",
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.8 : isInverse ? 2 : 1,
          opacity: isVisible ? 0.9 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.6,
        }}
      />

      {/* Layer 1: Inner Dot (Fastest, Sharp) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          width: isInverse ? "16px" : "12px",
          height: isInverse ? "16px" : "12px",
          background: isInverse 
            ? "white"
            : isHovering 
              ? "linear-gradient(135deg, #6366f1, #a855f7)"
              : "white",
          boxShadow: isInverse
            ? "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)"
            : isHovering
              ? "0 0 15px rgba(168, 85, 247, 0.8)"
              : "0 0 8px rgba(255, 255, 255, 0.6)",
          border: isInverse ? "2px solid white" : "none",
          mixBlendMode: isInverse ? "difference" : "normal",
        }}
        animate={{
          x: mousePosition.x - (isInverse ? 8 : 6),
          y: mousePosition.y - (isInverse ? 8 : 6),
          scale: isHovering ? 1.5 : isInverse ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
          mass: 0.3,
        }}
      />

      {/* Note: INVERSE label removed to prevent display issues */}
      {/* The inverse effect is still visible through cursor appearance changes */}
    </>
  );
};

export default SuperWowCursor;

