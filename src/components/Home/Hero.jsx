import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Demo from "./Demo";
import Title from "./Title";
import Link from "./Link";
import Avatar from "./Avatar";
import DevStats from "./DevStats";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const avatarX = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const avatarY = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
  
  const contentX = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const contentY = useTransform(ySpring, [-0.5, 0.5], [-10, 10]);

  const bgX = useTransform(xSpring, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(ySpring, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center perspective-1000"
      id="home"
      style={{ isolation: 'isolate' }}
    >
      {/* Developer-themed Background - Rainbow Theme */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 dark:from-black dark:via-purple-950/30 dark:to-pink-950/30"
        style={{ y: y1, x: bgX, translateY: bgY }}
      >
        {/* Matrix/Code rain effect overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(99, 102, 241, 0.05) 2px,
              rgba(99, 102, 241, 0.05) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(99, 102, 241, 0.05) 2px,
              rgba(99, 102, 241, 0.05) 4px
            )`
          }} />
        </div>
      </motion.div>

      {/* Animated code-style blobs */}
      <motion.div 
        className="absolute inset-0 opacity-40 overflow-hidden"
        style={{ y: y2, opacity, x: bgX, translateY: bgY }}
      >
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-400 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-6000" />
      </motion.div>

      {/* Terminal-style grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating code snippets decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-indigo-400/30 dark:text-cyan-300/10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              opacity: [0, 0.3, 0.3, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            {['const', 'function', 'return', 'import', 'export', 'async', 'await', 'class'][i]}
          </motion.div>
        ))}
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

      {/* Avatar Layer - Closest */}
      <motion.div style={{ x: avatarX, y: avatarY, zIndex: 20 }}>
        <Avatar />
      </motion.div>

      {/* Content Layer - Middle */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center"
        style={{ x: contentX, y: contentY }}
      >
        <Title />
        <Demo />
        <Link />
        <DevStats />
      </motion.div>

    </div>
  );
};

export default Hero;
