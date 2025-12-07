import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const CreatureFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [creaturePosition, setCreaturePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const { cursorVariant } = useCursor();

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Detect if mouse is moving
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      setIsMoving(distance > 2);
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth follow with spring physics
  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      setCreaturePosition((prev) => {
        // Calculate direction to mouse
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Spring physics parameters
        const stiffness = 0.015; // Lower = more lag
        const damping = 0.7;     // Lower = more bounce
        
        // Calculate acceleration
        const ax = dx * stiffness;
        const ay = dy * stiffness;
        
        // Update velocity with damping
        velocityRef.current.x = (velocityRef.current.x + ax) * damping;
        velocityRef.current.y = (velocityRef.current.y + ay) * damping;
        
        // Update position
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;
        
        // Calculate rotation to face mouse
        if (distance > 5) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          setRotation(angle);
        }
        
        return { x: newX, y: newY };
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  // Hide on mobile
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";
  const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);

  return (
    <>
      {/* Hide default cursor */}
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
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="0" y1="12" x2="24" y2="12" stroke={isAttentive ? "#ef4444" : "#3b82f6"} strokeWidth="1.5" opacity="0.8" />
          <line x1="12" y1="0" x2="12" y2="24" stroke={isAttentive ? "#ef4444" : "#3b82f6"} strokeWidth="1.5" opacity="0.8" />
          <circle cx="12" cy="12" r="2" fill={isAttentive ? "#ef4444" : "#3b82f6"} opacity="0.6" />
        </svg>
      </motion.div>

      {/* Creature Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-auto z-[9999] hidden md:block"
        style={{
          x: creaturePosition.x - 40,
          y: creaturePosition.y - 40,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="relative w-20 h-20"
          animate={{
            rotate: rotation,
            scale: isHovered ? 1.2 : isAttentive ? 1.1 : 1,
          }}
          transition={{
            rotate: { type: "spring", stiffness: 100, damping: 15 },
            scale: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          {/* Shadow */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black opacity-20 blur-md"
            animate={{
              scaleX: isMoving ? 1.2 : 1,
              opacity: isMoving ? 0.3 : 0.2,
            }}
          />

          {/* Body Segments */}
          <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0">
            {/* Tail (3 segments) */}
            {[0, 1, 2].map((i) => (
              <motion.ellipse
                key={`tail-${i}`}
                cx="20"
                cy="40"
                rx={6 - i * 1.5}
                ry={4 - i}
                fill={isAttentive ? "#dc2626" : "#2563eb"}
                opacity={0.8 - i * 0.2}
                animate={{
                  cx: 20 - i * 8,
                  cy: 40 + Math.sin(Date.now() / 200 + i) * (isMoving ? 3 : 1),
                }}
                transition={{
                  type: "spring",
                  stiffness: 50 - i * 10,
                  damping: 10,
                }}
              />
            ))}

            {/* Main Body */}
            <motion.ellipse
              cx="40"
              cy="40"
              rx="12"
              ry="8"
              fill={isAttentive ? "#dc2626" : "#2563eb"}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              animate={{
                ry: isMoving ? [8, 9, 8] : 8,
              }}
              transition={{
                duration: 0.3,
                repeat: isMoving ? Infinity : 0,
              }}
            />

            {/* Core/Engine */}
            <motion.circle
              cx="40"
              cy="40"
              r="4"
              fill={isAttentive ? "#fef3c7" : "#dbeafe"}
              animate={{
                r: isMoving ? [4, 5, 4] : [4, 4.5, 4],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: isMoving ? 0.2 : 0.8,
                repeat: Infinity,
              }}
            />

            {/* Head */}
            <motion.ellipse
              cx="55"
              cy="40"
              rx="8"
              ry="6"
              fill={isAttentive ? "#dc2626" : "#2563eb"}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              animate={{
                cx: isHovered ? 57 : 55,
              }}
            />

            {/* Eyes */}
            {[-1, 1].map((side) => (
              <motion.circle
                key={`eye-${side}`}
                cx={58}
                cy={40 + side * 3}
                r="1.5"
                fill={isAttentive ? "#fef3c7" : "#60a5fa"}
                animate={{
                  r: isHovered ? [1.5, 0.5, 1.5] : 1.5,
                  opacity: isHovered ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isHovered ? 1 : 0,
                }}
              />
            ))}

            {/* Legs (4 pairs) */}
            {[0, 1, 2, 3].map((i) => {
              const legX = 30 + i * 8;
              const walkCycle = (Date.now() / 100 + i * 0.5) % (Math.PI * 2);
              const legOffset = Math.sin(walkCycle) * (isMoving ? 4 : 1);
              
              return (
                <g key={`leg-${i}`}>
                  {/* Left leg */}
                  <motion.line
                    x1={legX}
                    y1="40"
                    x2={legX - 2}
                    y2={48 + legOffset}
                    stroke={isAttentive ? "#f59e0b" : "#60a5fa"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Right leg */}
                  <motion.line
                    x1={legX}
                    y1="40"
                    x2={legX + 2}
                    y2={48 - legOffset}
                    stroke={isAttentive ? "#f59e0b" : "#60a5fa"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>
              );
            })}

            {/* Antennae */}
            {[-1, 1].map((side) => (
              <motion.line
                key={`antenna-${side}`}
                x1="60"
                y1="40"
                x2={65}
                y2={35 + side * 3}
                stroke={isAttentive ? "#ef4444" : "#3b82f6"}
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
                animate={{
                  x2: 65 + Math.sin(Date.now() / 300) * 2,
                  y2: 35 + side * 3 + Math.cos(Date.now() / 300) * 2,
                }}
              />
            ))}
          </svg>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: isAttentive
                ? "radial-gradient(circle, rgba(239, 68, 68, 0.3), transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: isMoving ? 0.6 : 0.3,
              scale: isMoving ? 1.2 : 1,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trail particles */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: creaturePosition.x - 25,
          y: creaturePosition.y - 25,
        }}
      >
        <motion.div
          className="w-12 h-12 rounded-full"
          style={{
            background: isAttentive
              ? "radial-gradient(circle, rgba(239, 68, 68, 0.2), transparent)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)",
            filter: "blur(8px)",
          }}
          animate={{
            opacity: isMoving ? 0.5 : 0.2,
            scale: isMoving ? 1.5 : 1,
          }}
        />
      </motion.div>
    </>
  );
};

export default CreatureFollower;
