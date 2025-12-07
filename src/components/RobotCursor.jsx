import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { useLocation } from "react-router";
import confetti from "canvas-confetti";

const RobotCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const restingTimeoutRef = useRef(null);
  
  const { cursorVariant } = useCursor();
  const location = useLocation();
  const controls = useAnimation();

  // Check for "Excited" state based on route
  const isExcited = ["/projects", "/exercise"].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setIsResting(false);

      // Reset resting timer
      if (restingTimeoutRef.current) clearTimeout(restingTimeoutRef.current);
      restingTimeoutRef.current = setTimeout(() => {
        setIsResting(true);
      }, 2000); // 2 seconds of inactivity -> resting
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (restingTimeoutRef.current) clearTimeout(restingTimeoutRef.current);
    };
  }, []);

  // Calculate rotation to face cursor
  useEffect(() => {
    const deltaX = mousePosition.x - robotPosition.x;
    const deltaY = mousePosition.y - robotPosition.y;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    setRotation(angle);
  }, [mousePosition, robotPosition]);

  // Handle Click Interaction
  const handleClick = () => {
    // Startle animation
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [rotation, rotation + 360, rotation],
      transition: { duration: 0.4 }
    });

    // Particle Burst
    confetti({
      particleCount: 30,
      spread: 70,
      origin: {
        x: robotPosition.x / window.innerWidth,
        y: robotPosition.y / window.innerHeight
      },
      colors: isExcited ? ['#F59E0B', '#EF4444'] : ['#3B82F6', '#60A5FA'],
      zIndex: 10002
    });
  };

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";
  const isInverse = cursorVariant === "inverse";

  return (
    <>
      {/* Custom Crosshair Cursor */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Crosshair Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          opacity: isVisible ? 1 : 0,
          scale: isResting ? 0.8 : 1, // Shrink slightly when resting
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 30,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line
            x1="0" y1="12" x2="24" y2="12"
            stroke={isAttentive ? "#ef4444" : isInverse ? "#fff" : "#3b82f6"}
            strokeWidth="1.5"
            opacity="0.8"
          />
          <line
            x1="12" y1="0" x2="12" y2="24"
            stroke={isAttentive ? "#ef4444" : isInverse ? "#fff" : "#3b82f6"}
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle
            cx="12" cy="12" r="2"
            fill={isAttentive ? "#ef4444" : isInverse ? "#fff" : "#3b82f6"}
            opacity="0.6"
          />
          <circle
            cx="12" cy="12" r="8"
            fill="none"
            stroke={isAttentive ? "#f59e0b" : isInverse ? "#fff" : "#60a5fa"}
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Robot - Top-Down View (24px) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] hidden md:block cursor-pointer" // Added cursor-pointer for clickability check
        style={{ pointerEvents: "auto" }} // Allow clicks on the robot itself
        onClick={handleClick}
        animate={{
          x: mousePosition.x - 60,
          y: mousePosition.y - 60,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: isExcited ? 90 : 60,   // Faster when excited
          damping: isExcited ? 10 : 15,     // Bouncier when excited
          mass: 2,
        }}
        onUpdate={(latest) => {
          if (latest.x !== undefined && latest.y !== undefined) {
            setRobotPosition({ 
              x: latest.x + 60, 
              y: latest.y + 60 
            });
          }
        }}
      >
        <motion.div
          className="relative w-24 h-24"
          animate={controls} // Use controls for click animation
          // Combine standard animations
          style={{
            rotate: rotation,
          }}
        >
          {/* Inner container for resting/excited animations that don't affect rotation */}
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              scale: isAttentive ? 1.15 : isInverse ? 1.25 : isExcited ? 1.1 : 1,
              y: isResting ? [0, -5, 0] : 0, // Floating when resting
            }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 25 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" } // Slow float
            }}
          >

          {/* Robot Body - Top-Down View */}
          <div className="relative">
            {/* Main Chassis */}
            <div
              className="relative w-6 h-8 rounded-lg transition-colors duration-500"
              style={{
                background: isAttentive
                  ? "linear-gradient(180deg, #dc2626, #991b1b)"
                  : isExcited 
                    ? "linear-gradient(180deg, #F59E0B, #D97706)" // Orange/Gold when excited
                    : isInverse
                      ? "linear-gradient(180deg, #e5e5e5, #a3a3a3)"
                      : "linear-gradient(180deg, #2563eb, #1e3a8a)",
                boxShadow: isAttentive
                  ? "0 0 12px rgba(220, 38, 38, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)"
                  : isExcited
                    ? "0 0 12px rgba(245, 158, 11, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)"
                    : "0 0 10px rgba(37, 99, 235, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              {/* Engine Core (Pulsing) */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: isAttentive
                    ? "radial-gradient(circle, #fef3c7, #f59e0b)"
                    : isExcited
                      ? "radial-gradient(circle, #FEF3C7, #FBBF24)"
                      : isInverse
                        ? "radial-gradient(circle, #fff, #d4d4d4)"
                        : "radial-gradient(circle, #dbeafe, #3b82f6)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
                animate={{
                  scale: isAttentive || isExcited ? [1, 1.3, 1] : isResting ? [1, 0.9, 1] : [1, 1.1, 1], // Slow pulse when resting, fast when excited
                  boxShadow: isAttentive
                    ? [
                        "0 0 8px rgba(245, 158, 11, 0.8)",
                        "0 0 15px rgba(239, 68, 68, 1)",
                        "0 0 8px rgba(245, 158, 11, 0.8)",
                      ]
                    : [
                        "0 0 6px rgba(59, 130, 246, 0.8)",
                        "0 0 12px rgba(59, 130, 246, 1)",
                        "0 0 6px rgba(59, 130, 246, 0.8)",
                      ],
                }}
                transition={{
                  duration: isAttentive || isExcited ? 0.2 : isResting ? 2 : 0.8,
                  repeat: Infinity,
                }}
              />

              {/* Front Indicator (Direction) */}
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1 rounded-t-full"
                style={{
                  background: isAttentive ? "#fef3c7" : isInverse ? "#fff" : "#60a5fa",
                  boxShadow: `0 0 4px ${isAttentive ? "#fef3c7" : isInverse ? "#fff" : "#60a5fa"}`,
                }}
              />

              {/* Side Panels */}
              {[-1, 1].map((side) => (
                <div
                  key={side}
                  className="absolute top-1 h-6 w-1 rounded-full"
                  style={{
                    [side === -1 ? "left" : "right"]: "-2px",
                    background: isAttentive
                      ? "linear-gradient(180deg, #f59e0b, #dc2626)"
                      : isExcited
                        ? "linear-gradient(180deg, #FCD34D, #B45309)"
                        : isInverse
                          ? "linear-gradient(180deg, #d4d4d4, #a3a3a3)"
                          : "linear-gradient(180deg, #60a5fa, #2563eb)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </div>

            {/* Treads/Wheels (Top-Down) */}
            {[-1, 1].map((side) => (
              <motion.div
                key={side}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-full"
                style={{
                  [side === -1 ? "left" : "right"]: side === -1 ? "-4px" : "-4px",
                  background: isAttentive
                    ? "linear-gradient(180deg, #78350f, #451a03)"
                    : isInverse
                      ? "linear-gradient(180deg, #525252, #262626)"
                      : "linear-gradient(180deg, #1e3a8a, #0f172a)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                }}
                animate={{
                  scaleY: isAttentive || isExcited ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.15,
                  delay: side === 1 ? 0.05 : 0,
                  repeat: isAttentive || isExcited ? Infinity : 0,
                }}
              >
                {/* Tread segments */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute left-0 w-full h-0.5 bg-black opacity-20"
                    style={{ top: `${i * 25}%` }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Energy Trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          width: "50px",
          height: "50px",
          background: isAttentive
            ? "radial-gradient(circle, rgba(239, 68, 68, 0.3), transparent 70%)"
            : isExcited
              ? "radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent 70%)"
              : isInverse
                ? "radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          x: mousePosition.x - 85,
          y: mousePosition.y - 85,
          opacity: isVisible ? 0.6 : 0,
          scale: isResting ? 0.5 : 1, // Shrink trail when resting
        }}
        transition={{
          type: "spring",
          stiffness: 40,   // Even slower than robot
          damping: 20,
          mass: 2.5,       // Heavier for more lag
        }}
      />
    </>
  );
};

export default RobotCursor;
