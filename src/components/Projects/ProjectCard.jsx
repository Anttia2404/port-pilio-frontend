import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import PropTypes from "prop-types";

const getTagColor = (tag) => {
  const colors = {
    // Official tech brand colors
    React: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 border border-cyan-500/30",
    HTML: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border border-orange-500/30",
    CSS: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/30",
    JavaScript: "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border border-yellow-500/30",
    
    // Backend
    "Node.js": "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border border-green-500/30",
    MongoDB: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30",
    
    // Other
    Grid: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-500/30",
    AI: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border border-pink-500/30",
    
    default: "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400 border border-gray-500/30",
  };
  return colors[tag] || colors.default;
};

const ProjectCard = ({ project, index, imageLoaded, setImageLoaded, setSelectedProject }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg group cursor-pointer border border-transparent hover:border-blue-500/30 dark:hover:border-cyan-400/30 transition-all duration-300 relative z-10"
      style={{ 
        transformStyle: "preserve-3d", 
        perspective: "1000px" 
      }}
      onClick={() => setSelectedProject(project)}
      whileHover={{
        y: -10,
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
      }}
    >
      {/* Floating Image Layer */}
      <motion.div 
        className="relative overflow-hidden aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-2xl"
        style={{ transformStyle: "preserve-3d", translateZ: "20px" }}
      >
        {/* Loading Skeleton */}
        {!imageLoaded[project.id] && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]"></div>
        )}

        <motion.img
          src={project.image}
          alt={`${project.title} - ${project.tags.join(", ")} project screenshot`}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded[project.id] ? "opacity-100" : "opacity-0"
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded((prev) => ({ ...prev, [project.id]: true }))}
          loading="lazy"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8"
             style={{ transform: "translateZ(30px)" }}>
          <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-gray-900 transition-all shadow-lg"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
            >
              <FiGithub size={22} />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600/80 backdrop-blur-md rounded-full hover:bg-cyan-600 text-white transition-all shadow-lg"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} live demo`}
            >
              <FiExternalLink size={22} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        className="p-6 bg-white dark:bg-neutral-800 rounded-b-2xl"
        style={{ transformStyle: "preserve-3d", translateZ: "10px" }}
      >
        <h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          style={{ transform: "translateZ(15px)" }}
        >
          {project.title}
        </h3>
        <p 
          className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed"
          style={{ transform: "translateZ(10px)" }}
        >
          {project.description}
        </p>
        <div 
          className="flex flex-wrap gap-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-bold px-3 py-1 rounded-full ${getTagColor(tag)} shadow-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string.isRequired,
    demo: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  imageLoaded: PropTypes.object.isRequired,
  setImageLoaded: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
};

export default ProjectCard;
