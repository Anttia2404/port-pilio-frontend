import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const CentipedeCreature = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [headPosition, setHeadPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [bodySegments, setBodySegments] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const { cursorVariant } = useCursor();

  const numSegments = 16;
  const segmentDistance = 8;
  const stopDistance = 100; // Stop when within 100px of cursor

  // Initialize body segments
  useEffect(() => {
    const initialSegments = Array.from({ length: numSegments }, (_, i) => ({
      x: window.innerWidth / 2 - i * segmentDistance,
      y: window.innerHeight / 2,
    }));
    setBodySegments(initialSegments);
  }, []);

  // Mouse tracking
  useEffect(() => {
    let lastMove = Date.now();
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastMove = Date.now();
    };

    const checkMoving = setInterval(() => {
      if (Date.now() - lastMove > 150) {
        setIsMoving(false);
      }
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(checkMoving);
    };
  }, []);

  // Smooth follow with stop distance
  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      timeRef.current += 0.016;
      
      setHeadPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stop if within stop distance
        if (distance < stopDistance) {
          setIsMoving(false);
          velocityRef.current.x *= 0.9;
          velocityRef.current.y *= 0.9;
          return prev;
        }
        
        setIsMoving(true);
        
        // Slow crawling motion
        const stiffness = 0.008; // Very slow
        const damping = 0.85;
        
        const ax = dx * stiffness;
        const ay = dy * stiffness;
        
        velocityRef.current.x = (velocityRef.current.x + ax) * damping;
        velocityRef.current.y = (velocityRef.current.y + ay) * damping;
        
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;
        
        // Calculate rotation
        if (distance > 5) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          setRotation(angle);
        }
        
        return { x: newX, y: newY };
      });
      
      // Update body segments with inertia
      setBodySegments((prevSegments) => {
        const newSegments = [headPosition];
        
        for (let i = 1; i < numSegments; i++) {
          const target = newSegments[i - 1];
          const current = prevSegments[i] || target;
          
          const dx = target.x - current.x;
          const dy = target.y - current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > segmentDistance) {
            const angle = Math.atan2(dy, dx);
            const newX = target.x - Math.cos(angle) * segmentDistance;
            const newY = target.y - Math.sin(angle) * segmentDistance;
            
            // Add inertia/smoothing
            const smoothing = 0.3;
            newSegments.push({
              x: current.x + (newX - current.x) * smoothing,
              y: current.y + (newY - current.y) * smoothing,
            });
          } else {
            newSegments.push(current);
          }
        }
        
        return newSegments;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, headPosition]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";
  const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);

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

      {/* Centipede Creature - Top-Down View */}
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
          {/* Body segments with legs */}
          {bodySegments.map((segment, i) => {
            if (!segment) return null;
            
            const t = timeRef.current;
            const nextSegment = bodySegments[i + 1];
            
            // Calculate segment angle
            let segmentAngle = 0;
            if (nextSegment) {
              const dx = segment.x - nextSegment.x;
              const dy = segment.y - nextSegment.y;
              segmentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            }
            
            // Segment size (larger at front, smaller at tail)
            const sizeRatio = 1 - (i / numSegments) * 0.5;
            const segmentWidth = 8 * sizeRatio;
            const segmentHeight = 12 * sizeRatio;
            
            // Leg animation
            const legPairIndex = Math.floor(i / 2);
            const walkCycle = (t * 4 + legPairIndex * 0.8) % (Math.PI * 2);
            const legSwing = Math.sin(walkCycle) * (isMoving ? 15 : 5);
            const legLength = 18 * sizeRatio;
            
            return (
              <g key={`segment-${i}`}>
                {/* Legs - Left and Right */}
                {i > 0 && i < numSegments - 1 && (
                  <g transform={`translate(${segment.x}, ${segment.y}) rotate(${segmentAngle})`}>
                    {/* Left leg */}
                    <g opacity="0.8">
                      <line
                        x1="0"
                        y1="0"
                        x2={-legLength - legSwing}
                        y2={segmentHeight / 2}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={2 * sizeRatio}
                        strokeLinecap="round"
                      />
                      <line
                        x1={-legLength - legSwing}
                        y1={segmentHeight / 2}
                        x2={-legLength - legSwing - 5}
                        y2={segmentHeight / 2 + 8}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={1.5 * sizeRatio}
                        strokeLinecap="round"
                      />
                    </g>
                    
                    {/* Right leg */}
                    <g opacity="0.8">
                      <line
                        x1="0"
                        y1="0"
                        x2={legLength + legSwing}
                        y2={-segmentHeight / 2}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={2 * sizeRatio}
                        strokeLinecap="round"
                      />
                      <line
                        x1={legLength + legSwing}
                        y1={-segmentHeight / 2}
                        x2={legLength + legSwing + 5}
                        y2={-segmentHeight / 2 - 8}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={1.5 * sizeRatio}
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                )}
                
                {/* Body segment */}
                <ellipse
                  cx={segment.x}
                  cy={segment.y}
                  rx={segmentWidth}
                  ry={segmentHeight}
                  fill={isAttentive ? "#dc2626" : i === 0 ? "#f5f5f5" : "#e5e5e5"}
                  stroke={isAttentive ? "#991b1b" : "#a3a3a3"}
                  strokeWidth="1.5"
                  transform={`rotate(${segmentAngle}, ${segment.x}, ${segment.y})`}
                  opacity={0.95 - i * 0.02}
                />
                
                {/* Segment connection */}
                {nextSegment && (
                  <line
                    x1={segment.x}
                    y1={segment.y}
                    x2={nextSegment.x}
                    y2={nextSegment.y}
                    stroke={isAttentive ? "#991b1b" : "#a3a3a3"}
                    strokeWidth="2"
                    opacity="0.3"
                  />
                )}
                
                {/* Head details */}
                {i === 0 && (
                  <g transform={`translate(${segment.x}, ${segment.y}) rotate(${rotation})`}>
                    {/* Antennae */}
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="15"
                      y2="-8"
                      stroke={isAttentive ? "#ef4444" : "#dc2626"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      animate={{
                        x2: 15 + Math.sin(timeRef.current * 3) * 3,
                        y2: -8 + Math.cos(timeRef.current * 3) * 3,
                      }}
                    />
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="15"
                      y2="8"
                      stroke={isAttentive ? "#ef4444" : "#dc2626"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      animate={{
                        x2: 15 + Math.sin(timeRef.current * 3 + Math.PI) * 3,
                        y2: 8 + Math.cos(timeRef.current * 3 + Math.PI) * 3,
                      }}
                    />
                    
                    {/* Eyes */}
                    <motion.circle
                      cx="8"
                      cy="-4"
                      r="2"
                      fill={isAttentive ? "#ef4444" : "#dc2626"}
                      animate={{
                        opacity: isHovered ? [1, 0.3, 1] : 1,
                      }}
                      transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                    />
                    <motion.circle
                      cx="8"
                      cy="4"
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
      {bodySegments[0] && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            x: bodySegments[0].x - 40,
            y: bodySegments[0].y + 10,
          }}
        >
          <motion.div
            className="w-32 h-8 rounded-full bg-black opacity-10 blur-lg"
            animate={{
              scaleX: isMoving ? 1.5 : 1,
              opacity: isMoving ? 0.15 : 0.08,
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CentipedeCreature;
