import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiGrid, FiLayers, FiLayout } from "react-icons/fi";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

// Tag color function (same as ProjectCard)
const getTagColor = (tag) => {
  const colors = {
    // Frontend
    React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800",
    HTML: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800",
    CSS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
    
    // Backend
    "Node.js": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800",
    MongoDB: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    
    // Other
    Grid: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
    AI: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 border border-pink-200 dark:border-pink-800",
    
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
  };
  return colors[tag] || colors.default;
};

const projects = [
  // Full-Stack Project
  {
    id: 1,
    title: "TodoX",
    description:
      "Ứng dụng quản lý công việc full-stack với React, MongoDB và Node.js. Tính năng đầy đủ: thêm, sửa, xóa, đánh dấu hoàn thành.",
    image: "./TodoX.png",
    tags: ["React", "MongoDB", "Node.js"],
    github: "https://github.com/Anttia2404/TodoX",
    demo: "https://todo-list-g79s.onrender.com/",
    category: "full-stack",
  },

  // Frontend Mentor - Landing Pages
  {
    id: 2,
    title: "Clipboard Landing Page",
    description:
      "Landing page cho ứng dụng clipboard với thiết kế hiện đại và responsive.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/clipboard-landing-page-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/clipboard-landing-page-master",
    demo: "https://clipboard-landing-page-master-khaki-zeta.vercel.app/",
    category: "web",
  },
  {
    id: 3,
    title: "Huddle Landing Page",
    description:
      "Landing page cho nền tảng mạng xã hội Huddle với single introductory section.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/huddle-landing-page-with-single-introductory-section-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/huddle-landing-page-with-single-introductory-section-master",
    demo: "https://huddle-landing-page-with-single-int-sable.vercel.app/",
    category: "web",
  },

  // Frontend Mentor - Components
  {
    id: 4,
    title: "Bento Grid",
    description:
      "Modern bento grid layout component với CSS Grid và responsive design.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/bento-grid-main/main/preview.jpg",
    tags: ["HTML", "CSS", "Grid"],
    github: "https://github.com/Anttia2404/bento-grid-main",
    demo: "https://bento-grid-main-1xpv.vercel.app/",
    category: "web",
  },
  {
    id: 5,
    title: "Testimonials Grid Section",
    description:
      "Grid layout hiển thị testimonials với thiết kế đẹp mắt và responsive.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/testimonials-grid-section-main/main/preview.jpg",
    tags: ["HTML", "CSS", "Grid"],
    github: "https://github.com/Anttia2404/testimonials-grid-section-main",
    demo: "https://testimonials-grid-section-main-nine-phi.vercel.app/",
    category: "web",
  },
  {
    id: 6,
    title: "Fylo Data Storage Component",
    description:
      "Component hiển thị dung lượng lưu trữ với progress bar và animations.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/fylo-data-storage-component-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/fylo-data-storage-component-master",
    demo: "https://fylo-data-storage-component-master-seven-ruby.vercel.app/",
    category: "web",
  },
  {
    id: 7,
    title: "Social Proof Section",
    description:
      "Section hiển thị social proof với ratings và reviews từ khách hàng.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/social-proof-section-master/main/design/desktop-preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/social-proof-section-master",
    demo: "https://social-proof-section-master-sage-seven.vercel.app/",
    category: "web",
  },
  {
    id: 8,
    title: "Four Card Feature Section",
    description:
      "Section hiển thị 4 features với card layout và màu sắc nổi bật.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/four-card-feature-section-master/main/design/desktop-preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/four-card-feature-section-master",
    demo: "https://four-card-feature-section-master-3t.vercel.app/",
    category: "web",
  },
  {
    id: 9,
    title: "3 Column Preview Card",
    description:
      "Card component với 3 columns hiển thị các loại xe với thiết kế đẹp.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/3-column-preview-card-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/3-column-preview-card-component-main",
    demo: "https://3-column-preview-card-component-mai-sage.vercel.app/",
    category: "web",
  },
  {
    id: 10,
    title: "Single Price Grid Component",
    description:
      "Pricing component với grid layout cho subscription plans.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/single-price-grid-component-master/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/single-price-grid-component-master",
    demo: "https://single-price-grid-component-master-tau.vercel.app/",
    category: "web",
  },
  {
    id: 11,
    title: "Profile Card Component",
    description:
      "Component hiển thị profile card với avatar và thông tin người dùng.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/profile-card-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/profile-card-component-main",
    demo: "https://profile-card-component-main-ten-rho.vercel.app/",
    category: "web",
  },
  {
    id: 12,
    title: "Stats Preview Card",
    description:
      "Card component hiển thị statistics với image overlay và gradient.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/stats-preview-card-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/stats-preview-card-component-main",
    demo: "https://stats-preview-card-component-main-one-pink.vercel.app/",
    category: "web",
  },
  {
    id: 13,
    title: "QR Code Component",
    description:
      "Simple QR code component với centered layout và clean design.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/qr-code-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/qr-code-component-main",
    demo: "https://qr-code-component-main-kappa-nine.vercel.app/",
    category: "web",
  },
  {
    id: 14,
    title: "NFT Preview Card",
    description:
      "Card component preview NFT với hover effects và glassmorphism.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/nft-preview-card-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/nft-preview-card-component-main",
    demo: "https://nft-preview-card-component-main-phi-ten.vercel.app/",
    category: "web",
  },
  {
    id: 15,
    title: "Order Summary Component",
    description:
      "Component hiển thị order summary với pricing và action buttons.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/order-summary-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/order-summary-component-main",
    demo: "https://order-summary-component-main-two-gamma.vercel.app/",
    category: "web",
  },
  {
    id: 16,
    title: "Results Summary Component",
    description:
      "Component hiển thị kết quả test với scores và categories.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/results-summary-component-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/results-summary-component-main",
    demo: "https://results-summary-component-main-six-coral.vercel.app/",
    category: "web",
  },
  {
    id: 17,
    title: "Product Preview Card",
    description:
      "Card component hiển thị product với image, pricing và add to cart button.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/product-preview-card-component-main/main/design/desktop-preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/product-preview-card-component-main",
    demo: "https://product-preview-card-component-main-eight-wheat.vercel.app/",
    category: "web",
  },
  {
    id: 18,
    title: "Recipe Page",
    description:
      "Trang hiển thị công thức nấu ăn với ingredients và instructions.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/recipe-page-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/recipe-page-main",
    demo: "https://recipe-page-main-rho-nine.vercel.app/",
    category: "web",
  },
  {
    id: 19,
    title: "Social Links Profile",
    description:
      "Profile page hiển thị social media links với clean design.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/social-links-profile-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/social-links-profile-main",
    demo: "https://social-links-profile-main-wheat.vercel.app/",
    category: "web",
  },
  {
    id: 20,
    title: "Blog Preview Card",
    description:
      "Card component hiển thị blog preview với image, category tag và author info.",
    image:
      "https://raw.githubusercontent.com/Anttia2404/blog-preview-card-main/main/preview.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/Anttia2404/blog-preview-card-main",
    demo: "https://blog-preview-card-main-five-gold.vercel.app/",
    category: "web",
  },
];

const categories = [
  { key: "all", name: "Tất cả", icon: FiGrid },
  { key: "full-stack", name: "Full-stack", icon: FiLayers },
  { key: "web", name: "Web Frontend", icon: FiLayout },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      className="min-h-screen py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-indigo-950/30 dark:to-purple-950/30 relative overflow-hidden"
      id="projects"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 dark:bg-cyan-400/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                Các Dự Án Của Tôi
              </span>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-8">
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
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`group relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border overflow-hidden ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-blue-500/30"
                  : "bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-neutral-700"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-pressed={selectedCategory === category.key}
              aria-label={`Lọc dự án theo ${category.name}`}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <category.icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[280px]"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Bento Grid pattern - different sizes for visual interest
              const gridSpans = [
                "md:col-span-2 lg:col-span-3 md:row-span-2", // Large featured
                "md:col-span-2 lg:col-span-3 md:row-span-1", // Medium wide
                "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
                "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
                "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
              ];
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${gridSpans[index % gridSpans.length]} group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl transition-all duration-500`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                  }}
                >
                  {/* Image with overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [project.id]: true }))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-end z-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-200 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="w-4 h-4" />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  </div>
                </motion.div>
              );
            })}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
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
                    aria-label="Đóng chi tiết dự án"
                  >
                    <FiX size={24} aria-hidden="true" />
                  </button>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="p-6 md:p-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" id="project-modal-title">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tags.map((tag) => {
                        let tagClass = "";
                        // Official tech brand colors
                        if (tag === "HTML") {
                          tagClass = "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border border-orange-500/30";
                        } else if (tag === "CSS") {
                          tagClass = "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/30";
                        } else if (tag === "React") {
                          tagClass = "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 border border-cyan-500/30";
                        } else if (tag === "Node.js") {
                          tagClass = "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border border-green-500/30";
                        } else if (tag === "MongoDB") {
                          tagClass = "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30";
                        } else if (tag === "Grid") {
                          tagClass = "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-500/30";
                        } else if (tag === "JavaScript") {
                          tagClass = "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border border-yellow-500/30";
                        } else if (tag === "AI") {
                          tagClass = "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border border-pink-500/30";
                        } else {
                          tagClass = "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400 border border-gray-500/30";
                        }
                        
                        return (
                          <span
                            key={tag}
                            className={`text-sm font-bold px-3 py-1.5 rounded-full shadow-sm ${tagClass}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
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
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50"
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
