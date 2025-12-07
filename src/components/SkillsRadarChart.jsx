import { motion } from "framer-motion";
import { 
  SiReact, SiJavascript, SiNodedotjs, SiHtml5, 
  SiPython, SiPostgresql, SiMongodb, SiGithub, 
  SiTailwindcss, SiTypescript, SiSpringboot 
} from "react-icons/si";

const SkillsRadarChart = () => {
  const skills = [
    { name: "HTML/CSS", level: 95, icon: SiHtml5, color: "#E34F26" },
    { name: "JavaScript", level: 75, icon: SiJavascript, color: "#F7DF1E" },
    { name: "React", level: 70, icon: SiReact, color: "#61DAFB" },
    { name: "Python", level: 70, icon: SiPython, color: "#3776AB" },
    { name: "Git", level: 70, icon: SiGithub, color: "#4b5563" },
    { name: "Node.js", level: 65, icon: SiNodedotjs, color: "#339933" },
    { name: "Spring Boot", level: 60, icon: SiSpringboot, color: "#6DB33F" },
    { name: "PostgreSQL", level: 60, icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", level: 55, icon: SiMongodb, color: "#47A248" },
  ];

  // Calculate polygon points for radar chart
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index, percentage) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (maxRadius * percentage) / 100;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const skillPoints = skills.map((skill, index) => getPoint(index, skill.level));
  const polygonPoints = skillPoints.map(p => `${p.x},${p.y}`).join(" ");

  // Grid circles
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
        Kỹ năng và năng lực
      </h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Radar Chart */}
        <div className="relative">
          <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full">
            <defs>
              {/* Multi-color gradient for polygon */}
              <radialGradient id="multiColorGradient">
                {skills.map((skill, index) => (
                  <stop 
                    key={skill.name}
                    offset={`${(index / skills.length) * 100}%`}
                    stopColor={skill.color}
                    stopOpacity="0.3"
                  />
                ))}
              </radialGradient>
              
              {/* Individual gradients for each skill segment */}
              {skills.map((skill, index) => (
                <linearGradient 
                  key={`gradient-${skill.name}`}
                  id={`skillGradient-${index}`}
                  x1="0%" y1="0%" x2="100%" y2="100%"
                >
                  <stop offset="0%" stopColor={skill.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={skill.color} stopOpacity="0.1" />
                </linearGradient>
              ))}
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background grid circles */}
            {gridLevels.map((level) => (
              <circle
                key={level}
                cx={centerX}
                cy={centerY}
                r={(maxRadius * level) / 100}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-gray-700"
                opacity="0.3"
              />
            ))}

            {/* Grid lines with skill colors */}
            {skills.map((skill, index) => {
              const point = getPoint(index, 100);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke={skill.color}
                  strokeWidth="1"
                  opacity="0.2"
                />
              );
            })}

            {/* Individual skill segments with their own colors */}
            {skills.map((skill, index) => {
              const currentPoint = getPoint(index, skill.level);
              const nextIndex = (index + 1) % skills.length;
              const nextPoint = getPoint(nextIndex, skills[nextIndex].level);
              
              return (
                <motion.path
                  key={`segment-${skill.name}`}
                  d={`M ${centerX} ${centerY} L ${currentPoint.x} ${currentPoint.y} L ${nextPoint.x} ${nextPoint.y} Z`}
                  fill={`url(#skillGradient-${index})`}
                  stroke={skill.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                />
              );
            })}

            {/* Outer polygon outline with gradient stroke */}
            <motion.polygon
              points={polygonPoints}
              fill="none"
              stroke="url(#multiColorGradient)"
              strokeWidth="3"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Skill points */}
            {skills.map((skill, index) => {
              const point = getPoint(index, skill.level);
              return (
                <g key={skill.name}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={skill.color}
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="cursor-pointer hover:r-8 transition-all"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {skills.map((skill, index) => {
              const labelPoint = getPoint(index, 110);
              const Icon = skill.icon;
              return (
                <g key={`label-${skill.name}`}>
                  <foreignObject
                    x={labelPoint.x - 30}
                    y={labelPoint.y - 30}
                    width="60"
                    height="60"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <Icon 
                        style={{ color: skill.color }} 
                        className="w-6 h-6 mb-1"
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon style={{ color: skill.color }} className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-sm font-bold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsRadarChart;
