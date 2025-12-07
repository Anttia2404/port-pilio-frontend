import { motion } from "framer-motion";
import { FiCode, FiCoffee, FiGithub, FiTerminal } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiJavascript, SiPython, SiMongodb, SiPostgresql, SiSpringboot } from "react-icons/si";

const DevStats = () => {
  const stats = [
    { icon: FiCode, label: "Projects", value: "20+", color: "text-purple-600" },
    { icon: FiCoffee, label: "Coffee Cups", value: "∞", color: "text-amber-600" },
    { icon: FiGithub, label: "Commits", value: "500+", color: "text-gray-700" },
    { icon: FiTerminal, label: "Lines of Code", value: "10K+", color: "text-green-600" },
  ];

  const techStack = [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiPython, name: "Python", color: "#3776AB" },
    { icon: SiSpringboot, name: "Spring Boot", color: "#6DB33F" },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  ];

  return (
    <div className="mt-12 space-y-8">
      {/* Code Snippet Decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 shadow-2xl border border-gray-700 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-xs ml-2">~/portfolio/about-me.js</span>
          </div>
          <div className="font-mono text-sm">
            <div className="text-gray-500">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">developer</span> ={" "}
              <span className="text-yellow-300">{"{"}</span>
            </div>
            <div className="text-gray-500 ml-4">
              <span className="text-green-300">name</span>:{" "}
              <span className="text-orange-300">"Võ Tấn Tài"</span>,
            </div>
            <div className="text-gray-500 ml-4">
              <span className="text-green-300">role</span>:{" "}
              <span className="text-orange-300">"Full-Stack Developer"</span>,
            </div>
            <div className="text-gray-500 ml-4">
              <span className="text-green-300">location</span>:{" "}
              <span className="text-orange-300">"Ho Chi Minh City, VN"</span>,
            </div>
            <div className="text-gray-500 ml-4">
              <span className="text-green-300">skills</span>:{" "}
              <span className="text-yellow-300">{"["}</span>
              <span className="text-orange-300">"React"</span>,{" "}
              <span className="text-orange-300">"Node.js"</span>,{" "}
              <span className="text-orange-300">"Python"</span>
              <span className="text-yellow-300">{"]"}</span>,
            </div>
            <div className="text-gray-500 ml-4">
              <span className="text-green-300">passion</span>:{" "}
              <span className="text-orange-300">"Building amazing products"</span>,
            </div>
            <div className="text-gray-500">
              <span className="text-yellow-300">{"}"}</span>;
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {techStack.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-purple-200 dark:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500 transition-all"
            >
              <Icon style={{ color: tech.color }} className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-2xl transition-all"
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Available for opportunities
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default DevStats;
