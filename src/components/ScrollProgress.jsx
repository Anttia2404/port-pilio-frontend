import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Glow effect layer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 origin-left z-[10001] blur-sm opacity-60"
        style={{ 
          scaleX,
          background: "linear-gradient(90deg, #8b5cf6, #ec4899, #6366f1)"
        }}
      />
      
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[10002] shadow-lg"
        style={{ 
          scaleX,
          background: "linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute top-0 right-0 w-20 h-full bg-white/40 blur-[3px]" />
      </motion.div>
    </>
  );
};

export default ScrollProgress;

