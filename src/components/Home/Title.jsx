import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useCursor } from "@/context/CursorContext";

export default function Title() {
  const { cursorInverseEnter, cursorInverseLeave } = useCursor();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-0 w-full relative"
      >
        {/* Floating tech keywords decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['React', 'Node.js', 'Python', 'Java'].map((tech, i) => (
            <motion.span
              key={tech}
              className="absolute text-xs font-mono text-cyan-400/20 dark:text-cyan-300/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0.3, 0],
                scale: [0.8, 1, 1, 0.8],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight relative z-10"
          onMouseEnter={cursorInverseEnter}
          onMouseLeave={cursorInverseLeave}
        >
          {/* Greeting with code comment style */}
          <motion.span 
            className="block text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-mono mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-500">//</span> Hello World! 👋
          </motion.span>

          {/* Main name - Large and impressive */}
          <motion.div 
            className="block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="relative inline-block">
              {/* Main text with gradient */}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Võ Tấn Tài
              </span>
              
              {/* Glitch effect layer */}
              <span className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent opacity-20 blur-sm animate-pulse">
                Võ Tấn Tài
              </span>
              
              {/* Underline decoration */}
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </motion.div>

          {/* Terminal-style role with typing effect */}
          <motion.div 
            className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl mt-19"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Terminal prompt */}
            <span className="text-green-500 dark:text-green-400 font-mono text-xl sm:text-2xl">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                $
              </motion.span>
            </span>
            
            {/* Typing animation */}
            <span className="w-full h-20 flex items-center justify-center font-semibold">
              <TypeAnimation
                sequence={[
                  "Full-Stack Developer",
                  2000,
                  "React Enthusiast",
                  2000,
                  "Node.js Developer",
                  2000,
                  "Python Programmer",
                  2000,
                  "Problem Solver",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              />
              {/* Blinking cursor */}
              <motion.span 
                className="inline-block w-1 h-8 sm:h-10 bg-purple-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Subtitle - Code comment style */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 font-mono"
          >
            <span className="text-gray-500">/*</span> Sinh viên Công nghệ thông tin - HCMUTE <span className="text-gray-500">*/</span>
          </motion.p>
        </h1>
      </motion.div>
    </>
  );
}
