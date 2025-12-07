import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const RoboticCentipede = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [headPosition, setHeadPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [bodySegments, setBodySegments] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const { cursorVariant } = useCursor();

  const numSegments = 14;
  const segmentDistance = 10;
  const stopDistance = 100;

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
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
          // Slow down gradually
          velocityRef.current.x *= 0.85;
          velocityRef.current.y *= 0.85;
          
          // Apply remaining velocity
          if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
            return {
              x: prev.x + velocityRef.current.x,
              y: prev.y + velocityRef.current.y,
            };
          }
          return prev;
        }
        
        setIsMoving(true);
        
        // Slow crawling motion
        const stiffness = 0.01;
        const damping = 0.82;
        
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
            
            // Inertia - slower for tail segments
            const smoothing = 0.25 + (i / numSegments) * 0.1;
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

      {/* Robotic Centipede */}
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
            
            // Segment size
            const sizeRatio = 1 - (i / numSegments) * 0.4;
            const segmentWidth = 7 * sizeRatio;
            const segmentHeight = 11 * sizeRatio;
            
            // Leg animation - ONLY when moving
            const legPairIndex = Math.floor(i / 2);
            const walkCycle = (t * 6 + legPairIndex * 1.5) % (Math.PI * 2); // Even faster
            
            // Much longer legs
            const upperLegLength = 22 * sizeRatio;
            const lowerLegLength = 20 * sizeRatio;
            const totalLegLength = upperLegLength + lowerLegLength;
            
            // Realistic crawling motion with ground contact
            const stepPhase = Math.sin(walkCycle);
            const isStance = stepPhase < 0; // Leg on ground
            
            // MUCH stronger motion for visible crawling
            const legLift = isMoving && !isStance ? Math.abs(stepPhase) * 25 : 0; // Much higher lift
            const legForward = isMoving ? stepPhase * 20 : 0; // Much more forward/backward
            const legPush = isMoving && isStance ? Math.abs(stepPhase) * 12 : 0; // Stronger push
            
            // Body bounce - synchronized with legs
            const bodyBounce = isMoving ? Math.abs(Math.sin(walkCycle * 2)) * 3 : 0;
            const bodyTilt = isMoving ? stepPhase * 2 : 0;
            
            
            return (
              <g key={`segment-${i}`}>
                {/* Mechanical Legs - ONLY animate when moving */}
                {i > 0 && i < numSegments - 1 && (
                  <g transform={`translate(${segment.x}, ${segment.y}) rotate(${segmentAngle})`}>
                    {/* Left leg - 3 segments */}
                    <g opacity="0.9">
                      {/* Upper leg (femur) */}
                      <line
                        x1="0"
                        y1="0"
                        x2={-upperLegLength * 0.7 + legForward - legPush}
                        y2={segmentHeight + 10 - legLift}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={3 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Knee joint */}
                      <circle
                        cx={-upperLegLength * 0.7 + legForward - legPush}
                        cy={segmentHeight + 10 - legLift}
                        r={2.5 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#525252"}
                        stroke={isAttentive ? "#991b1b" : "#404040"}
                        strokeWidth="1"
                      />
                      {/* Lower leg (tibia) */}
                      <line
                        x1={-upperLegLength * 0.7 + legForward - legPush}
                        y1={segmentHeight + 10 - legLift}
                        x2={-totalLegLength + legForward * 0.5 - legPush}
                        y2={segmentHeight + 25 + (isStance ? 2 : legLift * 0.5)}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={2.5 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Ankle joint */}
                      <circle
                        cx={-totalLegLength + legForward * 0.5 - legPush}
                        cy={segmentHeight + 25 + (isStance ? 2 : legLift * 0.5)}
                        r={2 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#525252"}
                        stroke={isAttentive ? "#991b1b" : "#404040"}
                        strokeWidth="1"
                      />
                      {/* Foot */}
                      <line
                        x1={-totalLegLength + legForward * 0.5 - legPush}
                        y1={segmentHeight + 25 + (isStance ? 2 : legLift * 0.5)}
                        x2={-totalLegLength - 5 + legForward * 0.5 - legPush}
                        y2={segmentHeight + 28 + (isStance ? 2 : legLift * 0.5)}
                        stroke={isAttentive ? "#f59e0b" : "#737373"}
                        strokeWidth={2 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Foot tip */}
                      <circle
                        cx={-totalLegLength - 5 + legForward * 0.5 - legPush}
                        cy={segmentHeight + 28 + (isStance ? 2 : legLift * 0.5)}
                        r={1.5 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#404040"}
                      />
                    </g>
                    
                    {/* Right leg - 3 segments */}
                    <g opacity="0.9">
                      {/* Upper leg (femur) */}
                      <line
                        x1="0"
                        y1="0"
                        x2={upperLegLength * 0.7 - legForward + legPush}
                        y2={-segmentHeight - 10 + legLift}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={3 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Knee joint */}
                      <circle
                        cx={upperLegLength * 0.7 - legForward + legPush}
                        cy={-segmentHeight - 10 + legLift}
                        r={2.5 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#525252"}
                        stroke={isAttentive ? "#991b1b" : "#404040"}
                        strokeWidth="1"
                      />
                      {/* Lower leg (tibia) */}
                      <line
                        x1={upperLegLength * 0.7 - legForward + legPush}
                        y1={-segmentHeight - 10 + legLift}
                        x2={totalLegLength - legForward * 0.5 + legPush}
                        y2={-segmentHeight - 25 - (isStance ? 2 : legLift * 0.5)}
                        stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                        strokeWidth={2.5 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Ankle joint */}
                      <circle
                        cx={totalLegLength - legForward * 0.5 + legPush}
                        cy={-segmentHeight - 25 - (isStance ? 2 : legLift * 0.5)}
                        r={2 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#525252"}
                        stroke={isAttentive ? "#991b1b" : "#404040"}
                        strokeWidth="1"
                      />
                      {/* Foot */}
                      <line
                        x1={totalLegLength - legForward * 0.5 + legPush}
                        y1={-segmentHeight - 25 - (isStance ? 2 : legLift * 0.5)}
                        x2={totalLegLength + 5 - legForward * 0.5 + legPush}
                        y2={-segmentHeight - 28 - (isStance ? 2 : legLift * 0.5)}
                        stroke={isAttentive ? "#f59e0b" : "#737373"}
                        strokeWidth={2 * sizeRatio}
                        strokeLinecap="round"
                      />
                      {/* Foot tip */}
                      <circle
                        cx={totalLegLength + 5 - legForward * 0.5 + legPush}
                        cy={-segmentHeight - 28 - (isStance ? 2 : legLift * 0.5)}
                        r={1.5 * sizeRatio}
                        fill={isAttentive ? "#dc2626" : "#404040"}
                      />
                    </g>
                  </g>
                )}
                
                {/* Body segment - Mechanical style with bounce */}
                <g transform={`rotate(${segmentAngle + bodyTilt}, ${segment.x}, ${segment.y})`}>
                  {/* Main body */}
                  <ellipse
                    cx={segment.x}
                    cy={segment.y - bodyBounce}
                    rx={segmentWidth}
                    ry={segmentHeight}
                    fill={isAttentive ? "#dc2626" : i === 0 ? "#f5f5f5" : "#e5e5e5"}
                    stroke={isAttentive ? "#991b1b" : "#737373"}
                    strokeWidth="1.5"
                    opacity={0.95}
                  />
                  {/* Mechanical details */}
                  <line
                    x1={segment.x - segmentWidth * 0.5}
                    y1={segment.y - bodyBounce}
                    x2={segment.x + segmentWidth * 0.5}
                    y2={segment.y - bodyBounce}
                    stroke={isAttentive ? "#991b1b" : "#525252"}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  {/* Core */}
                  <motion.circle
                    cx={segment.x}
                    cy={segment.y - bodyBounce}
                    r={2.5 * sizeRatio}
                    fill={isAttentive ? "#fef3c7" : "#dbeafe"}
                    animate={{
                      opacity: isMoving ? [0.8, 1, 0.8] : 0.6,
                      r: isMoving ? [2.5 * sizeRatio, 3 * sizeRatio, 2.5 * sizeRatio] : 2.5 * sizeRatio,
                    }}
                    transition={{
                      duration: isMoving ? 0.2 : 1,
                      repeat: Infinity,
                    }}
                  />
                </g>
                
                {/* Segment connection */}
                {nextSegment && (
                  <line
                    x1={segment.x}
                    y1={segment.y}
                    x2={nextSegment.x}
                    y2={nextSegment.y}
                    stroke={isAttentive ? "#991b1b" : "#525252"}
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                )}
                
                {/* Head details */}
                {i === 0 && (
                  <g transform={`translate(${segment.x}, ${segment.y}) rotate(${rotation})`}>
                    {/* Sensor antennae */}
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="18"
                      y2="-10"
                      stroke={isAttentive ? "#ef4444" : "#dc2626"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      animate={{
                        x2: isMoving ? 18 + Math.sin(t * 3) * 2 : 18,
                        y2: isMoving ? -10 + Math.cos(t * 3) * 2 : -10,
                      }}
                    />
                    <circle cx="18" cy="-10" r="2" fill={isAttentive ? "#ef4444" : "#dc2626"} />
                    
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="18"
                      y2="10"
                      stroke={isAttentive ? "#ef4444" : "#dc2626"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      animate={{
                        x2: isMoving ? 18 + Math.sin(t * 3 + Math.PI) * 2 : 18,
                        y2: isMoving ? 10 + Math.cos(t * 3 + Math.PI) * 2 : 10,
                      }}
                    />
                    <circle cx="18" cy="10" r="2" fill={isAttentive ? "#ef4444" : "#dc2626"} />
                    
                    {/* Optical sensors (eyes) */}
                    <motion.circle
                      cx="10"
                      cy="-5"
                      r="3"
                      fill={isAttentive ? "#ef4444" : "#dc2626"}
                      animate={{
                        opacity: isHovered ? [1, 0.3, 1] : 1,
                      }}
                      transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                    />
                    <circle cx="10" cy="-5" r="1.5" fill={isAttentive ? "#fef3c7" : "#fca5a5"} />
                    
                    <motion.circle
                      cx="10"
                      cy="5"
                      r="3"
                      fill={isAttentive ? "#ef4444" : "#dc2626"}
                      animate={{
                        opacity: isHovered ? [1, 0.3, 1] : 1,
                      }}
                      transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                    />
                    <circle cx="10" cy="5" r="1.5" fill={isAttentive ? "#fef3c7" : "#fca5a5"} />
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
            x: bodySegments[0].x - 50,
            y: bodySegments[0].y + 15,
          }}
        >
          <motion.div
            className="w-36 h-10 rounded-full bg-black opacity-10 blur-lg"
            animate={{
              scaleX: isMoving ? 1.4 : 1,
              opacity: isMoving ? 0.15 : 0.08,
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default RoboticCentipede;
