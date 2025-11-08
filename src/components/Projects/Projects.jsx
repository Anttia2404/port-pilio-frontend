import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "clipboard-landing-page-master",
    description:
      "Trang web cá nhân tôi tự xây dựng, sử dụng HTML, CSS để giới thiệu các dự án và kỹ năng của bản thân.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/clipboard-landing-page-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/clipboard-landing-page-master",
    demo: "https://clipboard-landing-page-master-khaki-zeta.vercel.app/",
    category: "web",
  },
  {
    id: 2,
    title: "fylo-data-storage-component-master",
    description:
      "Trang web cá nhân tôi tự xây dựng, sử dụng HTML, CSS để giới thiệu các dự án và kỹ năng của bản thân.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/fylo-data-storage-component-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/fylo-data-storage-component-master",
    demo: "https://fylo-data-storage-component-master-seven-ruby.vercel.app/",
    category: "web",
  },
  {
    id: 3,
    title: "testimonials-grid-section-main",
    description:
      "Trang web cá nhân tôi tự xây dựng, sử dụng HTML, CSS để giới thiệu các dự án và kỹ năng của bản thân.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/testimonials-grid-section-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/testimonials-grid-section-main",
    demo: "https://testimonials-grid-section-main-nine-phi.vercel.app/",
    category: "web",
  },
  {
    id: 4,
    title: "TodoX",
    description:
      "Trang web cá nhân tôi tự xây dựng, sử dụng React, MongoDB, Nodejs để giới thiệu các dự án và kỹ năng của bản thân.",
    image: "./TodoX.png",
    tags: ["React", "MongoDB", "Nodejs"],
    github: "https://github.com/Anttia2404/TodoX",
    demo: "https://todo-list-g79s.onrender.com/",
    category: "full-stack",
  },
  {
    id: 5,
    title: "bento-grid-main",
    description:
      "Trang web cá nhân tôi tự xây dựng, sử dụng HTML, CSS để giới thiệu các dự án và kỹ năng của bản thân.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/bento-grid-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/bento-grid-main",
    demo: "https://bento-grid-main-1xpv.vercel.app/",
    category: "web",
  },
];

const categories = [
  { key: "all", name: "Tất cả" },
  { key: "full-stack", name: "Full-stack" },
  { key: "web", name: "Web Frontend" },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      className="min-h-screen py-28 bg-gray-50 dark:bg-neutral-900"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Các Dự Án Của Tôi
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Đây là nơi tôi giới thiệu các dự án tâm huyết nhất, thể hiện kỹ năng
            lập trình và tư duy giải quyết vấn đề của mình.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-neutral-700 dark:text-gray-50 text-gray-600 hover:bg-indigo-50 dark:hover:bg-neutral-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex gap-4 justify-end">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/25 text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub size={20} />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/25 text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink size={20} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors z-10"
                  >
                    <FiX size={24} />
                  </button>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="p-6 md:p-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    <div className="flex gap-4">
                      <motion.a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiGithub /> GitHub
                      </motion.a>
                      <motion.a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiExternalLink /> Xem Demo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
