import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const SkeletonCreature = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [creaturePosition, setCreaturePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animationTime, setAnimationTime] = useState(0); // Use state instead of ref for render
  const velocityRef = useRef({ x: 0, y: 0 });
  const { cursorVariant } = useCursor();

  useEffect(() => {
    let lastMove = Date.now();
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastMove = Date.now();
      setIsMoving(true);
    };

    const checkMoving = setInterval(() => {
      if (Date.now() - lastMove > 100) {
        setIsMoving(false);
      }
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(checkMoving);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      setAnimationTime(prev => prev + 0.016); // Update time state
      
      setCreaturePosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const stiffness = 0.02;
        const damping = 0.75;
        
        const ax = dx * stiffness;
        const ay = dy * stiffness;
        
        velocityRef.current.x = (velocityRef.current.x + ax) * damping;
        velocityRef.current.y = (velocityRef.current.y + ay) * damping;
        
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;
        
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

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isAttentive = cursorVariant === "attentive";

  // Calculate spine curve points using bezier
  const calculateSpineCurve = (numSegments) => {
    const points = [];
    const t = animationTime; // Use state instead of ref
    
    for (let i = 0; i < numSegments; i++) {
      const progress = i / (numSegments - 1);
      const x = 30 + progress * 130;
      
      // Natural spine curve with wave
      const baseCurve = Math.sin(progress * Math.PI) * 8;
      const wave = Math.sin(t * 2 + progress * 4) * (isMoving ? 4 : 1);
      const y = 60 - baseCurve + wave;
      
      points.push({ x, y, size: 4 + Math.sin(progress * Math.PI) * 2 });
    }
    return points;
  };

  // IK for multi-segment leg
  const calculateLegIK = (baseX, baseY, targetX, targetY, segment1Length, segment2Length) => {
    const dx = targetX - baseX;
    const dy = targetY - baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Clamp to reachable distance
    const maxReach = segment1Length + segment2Length;
    const clampedDist = Math.min(distance, maxReach * 0.95);
    
    // Law of cosines for angles
    const angle1Base = Math.atan2(dy, dx);
    const cosAngle1 = (segment1Length * segment1Length + clampedDist * clampedDist - segment2Length * segment2Length) / (2 * segment1Length * clampedDist);
    const angle1Offset = Math.acos(Math.max(-1, Math.min(1, cosAngle1)));
    const angle1 = angle1Base - angle1Offset;
    
    // Joint position
    const jointX = baseX + Math.cos(angle1) * segment1Length;
    const jointY = baseY + Math.sin(angle1) * segment1Length;
    
    return { jointX, jointY, angle1 };
  };

  const spinePoints = calculateSpineCurve(14);

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

      {/* Skeleton Creature */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-auto z-[9999] hidden md:block"
        style={{
          x: creaturePosition.x - 100,
          y: creaturePosition.y - 60,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="relative w-48 h-32"
          animate={{
            rotate: rotation,
            scale: isHovered ? 1.15 : isAttentive ? 1.1 : 1,
          }}
          transition={{
            rotate: { type: "spring", stiffness: 120, damping: 18 },
            scale: { type: "spring", stiffness: 300, damping: 25 },
          }}
        >
          <svg width="200" height="120" viewBox="0 0 200 120" className="absolute inset-0">
            {/* Tail - Curved segments */}
            {Array.from({ length: 18 }).map((_, i) => {
              const t = animationTime;
              const progress = i / 18;
              const segmentX = 20 - i * 3.5;
              const wave = Math.sin(t * 2.5 + i * 0.25) * (isMoving ? 4 : 1.5);
              const curve = Math.sin(progress * Math.PI * 0.5) * 6;
              const segmentY = 60 + wave + curve;
              const size = Math.max(0.8, 3.5 - i * 0.15);
              
              return (
                <g key={`tail-${i}`}>
                  <ellipse
                    cx={segmentX}
                    cy={segmentY}
                    rx={size}
                    ry={size * 0.7}
                    fill={isAttentive ? "#dc2626" : "#e5e5e5"}
                    stroke={isAttentive ? "#991b1b" : "#a3a3a3"}
                    strokeWidth="0.5"
                    opacity={0.95 - i * 0.04}
                  />
                  {i > 0 && (
                    <line
                      x1={20 - (i - 1) * 3.5}
                      y1={60 + Math.sin(t * 2.5 + (i - 1) * 0.25) * (isMoving ? 4 : 1.5) + Math.sin(((i - 1) / 18) * Math.PI * 0.5) * 6}
                      x2={segmentX}
                      y2={segmentY}
                      stroke={isAttentive ? "#dc2626" : "#d4d4d4"}
                      strokeWidth="1.2"
                      opacity="0.6"
                    />
                  )}
                </g>
              );
            })}

            {/* Spine with natural curve */}
            {spinePoints.map((point, i) => (
              <g key={`spine-${i}`}>
                <ellipse
                  cx={point.x}
                  cy={point.y}
                  rx={point.size}
                  ry={point.size * 0.8}
                  fill={isAttentive ? "#dc2626" : "#f5f5f5"}
                  stroke={isAttentive ? "#991b1b" : "#a3a3a3"}
                  strokeWidth="1"
                />
                {i > 0 && (
                  <line
                    x1={spinePoints[i - 1].x}
                    y1={spinePoints[i - 1].y}
                    x2={point.x}
                    y2={point.y}
                    stroke={isAttentive ? "#991b1b" : "#a3a3a3"}
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                )}
              </g>
            ))}

            {/* Ribs */}
            {spinePoints.filter((_, i) => i > 2 && i < spinePoints.length - 3 && i % 2 === 0).map((point, idx) => {
              const ribLength = 10 - Math.abs(idx - 3) * 1.5;
              return (
                <g key={`rib-${idx}`} opacity="0.7">
                  <path
                    d={`M ${point.x},${point.y} Q ${point.x - 4},${point.y + ribLength * 0.6} ${point.x - 2},${point.y + ribLength}`}
                    fill="none"
                    stroke={isAttentive ? "#dc2626" : "#d4d4d4"}
                    strokeWidth="1"
                  />
                  <path
                    d={`M ${point.x},${point.y} Q ${point.x + 4},${point.y - ribLength * 0.6} ${point.x + 2},${point.y - ribLength}`}
                    fill="none"
                    stroke={isAttentive ? "#dc2626" : "#d4d4d4"}
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Multi-segment legs with IK */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t = animationTime;
              const spineIdx = 3 + i * 2;
              const basePoint = spinePoints[spineIdx];
              
              if (!basePoint) return null;
              
              const walkCycle = (t * 3 + i * 1.047) % (Math.PI * 2); // 60 degree phase
              const stepHeight = Math.sin(walkCycle) * (isMoving ? 10 : 3);
              const stepForward = Math.cos(walkCycle) * (isMoving ? 6 : 2);
              
              const segment1 = 12;
              const segment2 = 10;
              
              // Left leg
              const leftTargetX = basePoint.x - 8 + stepForward;
              const leftTargetY = basePoint.y + 20 + stepHeight;
              const leftLeg = calculateLegIK(basePoint.x, basePoint.y, leftTargetX, leftTargetY, segment1, segment2);
              
              // Right leg
              const rightTargetX = basePoint.x + 8 - stepForward;
              const rightTargetY = basePoint.y + 20 - stepHeight;
              const rightLeg = calculateLegIK(basePoint.x, basePoint.y, rightTargetX, rightTargetY, segment1, segment2);
              
              return (
                <g key={`legs-${i}`}>
                  {/* Left leg */}
                  <g opacity="0.85">
                    <line
                      x1={basePoint.x}
                      y1={basePoint.y}
                      x2={leftLeg.jointX}
                      y2={leftLeg.jointY}
                      stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx={leftLeg.jointX} cy={leftLeg.jointY} r="2" fill={isAttentive ? "#dc2626" : "#d4d4d4"} />
                    <line
                      x1={leftLeg.jointX}
                      y1={leftLeg.jointY}
                      x2={leftTargetX}
                      y2={leftTargetY}
                      stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx={leftTargetX} cy={leftTargetY} r="1.5" fill={isAttentive ? "#dc2626" : "#d4d4d4"} />
                  </g>
                  
                  {/* Right leg */}
                  <g opacity="0.85">
                    <line
                      x1={basePoint.x}
                      y1={basePoint.y}
                      x2={rightLeg.jointX}
                      y2={rightLeg.jointY}
                      stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx={rightLeg.jointX} cy={rightLeg.jointY} r="2" fill={isAttentive ? "#dc2626" : "#d4d4d4"} />
                    <line
                      x1={rightLeg.jointX}
                      y1={rightLeg.jointY}
                      x2={rightTargetX}
                      y2={rightTargetY}
                      stroke={isAttentive ? "#f59e0b" : "#a3a3a3"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx={rightTargetX} cy={rightTargetY} r="1.5" fill={isAttentive ? "#dc2626" : "#d4d4d4"} />
                  </g>
                </g>
              );
            })}

            {/* Head/Skull */}
            <g transform="translate(160, 60)">
              <ellipse cx="0" cy="0" rx="14" ry="11" fill={isAttentive ? "#dc2626" : "#f5f5f5"} stroke={isAttentive ? "#991b1b" : "#a3a3a3"} strokeWidth="1.5" />
              
              {/* Eye sockets with glow */}
              <motion.g>
                <circle cx="-5" cy="-3" r="3.5" fill="#000" opacity="0.3" />
                <motion.circle
                  cx="-5"
                  cy="-3"
                  r="2.5"
                  fill={isAttentive ? "#ef4444" : "#dc2626"}
                  animate={{
                    opacity: isHovered ? [1, 0.3, 1] : 1,
                    r: isHovered ? [2.5, 1, 2.5] : 2.5,
                  }}
                  transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                />
                <circle cx="-5" cy="-3" r="1" fill={isAttentive ? "#fef3c7" : "#fca5a5"} opacity="0.8" />
              </motion.g>
              
              <motion.g>
                <circle cx="5" cy="-3" r="3.5" fill="#000" opacity="0.3" />
                <motion.circle
                  cx="5"
                  cy="-3"
                  r="2.5"
                  fill={isAttentive ? "#ef4444" : "#dc2626"}
                  animate={{
                    opacity: isHovered ? [1, 0.3, 1] : 1,
                    r: isHovered ? [2.5, 1, 2.5] : 2.5,
                  }}
                  transition={{ duration: 0.3, repeat: isHovered ? 1 : 0 }}
                />
                <circle cx="5" cy="-3" r="1" fill={isAttentive ? "#fef3c7" : "#fca5a5"} opacity="0.8" />
              </motion.g>
              
              {/* Jaw */}
              <path d="M -10,4 Q 0,7 10,4" fill="none" stroke={isAttentive ? "#991b1b" : "#a3a3a3"} strokeWidth="1.5" />
              
              {/* Teeth */}
              {[-8, -5, -2, 1, 4, 7].map((x) => (
                <line key={x} x1={x} y1="4" x2={x} y2="7" stroke={isAttentive ? "#fef3c7" : "#f5f5f5"} strokeWidth="1.2" />
              ))}
              
              {/* Horns */}
              <path d="M -12,-6 L -16,-12 L -14,-10" fill={isAttentive ? "#dc2626" : "#d4d4d4"} stroke={isAttentive ? "#991b1b" : "#a3a3a3"} strokeWidth="1" />
              <path d="M 12,-6 L 16,-12 L 14,-10" fill={isAttentive ? "#dc2626" : "#d4d4d4"} stroke={isAttentive ? "#991b1b" : "#a3a3a3"} strokeWidth="1" />
            </g>
          </svg>

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: isAttentive
                ? "radial-gradient(circle, rgba(239, 68, 68, 0.2), transparent 60%)"
                : "radial-gradient(circle, rgba(200, 200, 200, 0.1), transparent 60%)",
              filter: "blur(15px)",
            }}
            animate={{ opacity: isMoving ? 0.5 : 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: creaturePosition.x - 80,
          y: creaturePosition.y + 20,
        }}
      >
        <motion.div
          className="w-40 h-8 rounded-full bg-black opacity-10 blur-md"
          animate={{
            scaleX: isMoving ? 1.3 : 1,
            opacity: isMoving ? 0.15 : 0.1,
          }}
        />
      </motion.div>
    </>
  );
};

export default SkeletonCreature;
