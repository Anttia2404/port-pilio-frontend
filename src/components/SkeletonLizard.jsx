import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const SkeletonLizard = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const numSegments = 25;
  const segmentDistance = 8;
  
  // Use lazy initialization to avoid setState in effect
  const [segments, setSegments] = useState(() => 
    Array.from({ length: numSegments }, (_, i) => ({
      x: window.innerWidth / 2 - i * segmentDistance,
      y: window.innerHeight / 2,
    }))
  );
  const [isHovered, setIsHovered] = useState(false);
  const { cursorVariant } = useCursor();


  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth follow with lerp
  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      setSegments((prevSegments) => {
        const newSegments = [];
        
        for (let i = 0; i < numSegments; i++) {
          if (i === 0) {
            // Head follows mouse with lerp
            const current = prevSegments[0] || mousePosition;
            const lerpFactor = 0.08; // Smooth following
            
            newSegments.push({
              x: current.x + (mousePosition.x - current.x) * lerpFactor,
              y: current.y + (mousePosition.y - current.y) * lerpFactor,
            });
          } else {
            // Each segment follows previous segment
            const target = newSegments[i - 1];
            const current = prevSegments[i] || target;
            
            const dx = target.x - current.x;
            const dy = target.y - current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > segmentDistance) {
              const angle = Math.atan2(dy, dx);
              newSegments.push({
                x: target.x - Math.cos(angle) * segmentDistance,
                y: target.y - Math.sin(angle) * segmentDistance,
              });
            } else {
              // Smooth lerp for tail inertia
              const lerpFactor = 0.15 + (i / numSegments) * 0.1; // Slower for tail
              newSegments.push({
                x: current.x + (target.x - current.x) * lerpFactor,
                y: current.y + (target.y - current.y) * lerpFactor,
              });
            }
          }
        }
        
        return newSegments;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:block"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 1000, damping: 40 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="0" y1="12" x2="24" y2="12" stroke={isAttentive ? "#ef4444" : "#888"} strokeWidth="1" opacity="0.6" />
          <line x1="12" y1="0" x2="12" y2="24" stroke={isAttentive ? "#ef4444" : "#888"} strokeWidth="1" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill={isAttentive ? "#ef4444" : "#888"} opacity="0.4" />
        </svg>
      </motion.div>

      {/* Skeleton Lizard */}
      <div
        className="fixed top-0 left-0 pointer-events-auto z-[9999] hidden md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg 
          width={window.innerWidth} 
          height={window.innerHeight} 
          style={{ pointerEvents: "none" }}
        >
          {/* Skeleton segments with legs */}
          {segments.map((segment, i) => {
            if (!segment) return null;
            
            // Segment size - larger at head, smaller at tail
            const sizeRatio = 1 - (i / numSegments) * 0.6;
            const segmentRadius = 6 * sizeRatio;
            
            // Leg length
            const legLength = 12 * sizeRatio;
            
            // 4 legs per segment (except last 4 segments)
            const hasLegs = i < numSegments - 4;
            
            // Leg angles (45°, 135°, -45°, -135° in radians)
            const legAngles = [
              Math.PI / 4,      // 45° (front-right)
              (3 * Math.PI) / 4, // 135° (front-left)
              -Math.PI / 4,     // -45° (back-right)
              -(3 * Math.PI) / 4 // -135° (back-left)
            ];
            
            return (
              <g key={`segment-${i}`}>
                {/* 4 Legs - simple lines */}
                {hasLegs && legAngles.map((angle, legIndex) => (
                  <line
                    key={`leg-${legIndex}`}
                    x1={segment.x}
                    y1={segment.y}
                    x2={segment.x + Math.cos(angle) * legLength}
                    y2={segment.y + Math.sin(angle) * legLength}
                    stroke={isAttentive ? "#f59e0b" : "#ccc"}
                    strokeWidth={1.5 * sizeRatio}
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                ))}
                
                {/* Segment body (vertebra) */}
                <circle
                  cx={segment.x}
                  cy={segment.y}
                  r={segmentRadius}
                  fill={isAttentive ? "#dc2626" : i === 0 ? "#eee" : "#ddd"}
                  stroke={isAttentive ? "#991b1b" : "#aaa"}
                  strokeWidth="1.5"
                  opacity={0.95 - i * 0.01}
                />
                
                {/* Connection line to next segment */}
                {i < numSegments - 1 && segments[i + 1] && (
                  <line
                    x1={segment.x}
                    y1={segment.y}
                    x2={segments[i + 1].x}
                    y2={segments[i + 1].y}
                    stroke={isAttentive ? "#991b1b" : "#999"}
                    strokeWidth="2"
                    opacity="0.4"
                  />
                )}
                
                {/* Head details */}
                {i === 0 && (
                  <g>
                    {/* Eyes */}
                    <motion.circle
                      cx={segment.x - 3}
                      cy={segment.y - 2}
                      r="2"
                      fill={isAttentive ? "#ef4444" : "#dc2626"}
                      animate={{
                        opacity: isHovered ? [1, 0.3, 1] : 1,
                      }}
                      transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                    />
                    <motion.circle
                      cx={segment.x + 3}
                      cy={segment.y - 2}
                      r="2"
                      fill={isAttentive ? "#ef4444" : "#dc2626"}
                      animate={{
                        opacity: isHovered ? [1, 0.3, 1] : 1,
                      }}
                      transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Shadow */}
      {segments[0] && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            x: segments[0].x - 40,
            y: segments[0].y + 10,
          }}
        >
          <div className="w-32 h-8 rounded-full bg-black opacity-10 blur-lg" />
        </motion.div>
      )}
    </>
  );
};

export default SkeletonLizard;
