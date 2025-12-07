import { motion } from "framer-motion";
import { FiBookOpen, FiCode, FiAward } from "react-icons/fi";
import { 
  SiReact, SiJavascript, SiNodedotjs, SiHtml5, SiCss3, 
  SiPython, SiPostgresql, SiMongodb, SiGithub, SiTailwindcss, SiTypescript, SiSpringboot 
} from "react-icons/si";
import SkillsRadarChart from "@/components/SkillsRadarChart";

const About = () => {
  const skills = [
    { name: "React", level: 70, description: "Xây dựng UI components và quản lý state", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", level: 75, description: "ES6+, async/await, DOM manipulation", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Node.js", level: 65, description: "Backend APIs, Express, middleware", icon: SiNodedotjs, color: "#339933" },
    { name: "HTML/CSS", level: 95, description: "Semantic HTML, Flexbox, Grid, Responsive", icon: SiHtml5, color: "#E34F26" },
    { name: "Python", level: 70, description: "Pygame, PyQt5, data structures", icon: SiPython, color: "#3776AB" },
    { name: "Spring Boot", level: 60, description: "Java backend framework, REST APIs", icon: SiSpringboot, color: "#6DB33F" },
    { name: "PostgreSQL", level: 60, description: "Queries, relationships, optimization", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", level: 55, description: "NoSQL, CRUD operations, aggregation", icon: SiMongodb, color: "#47A248" },
    { name: "Git & GitHub", level: 70, description: "Version control, collaboration, CI/CD", icon: SiGithub, color: "#4b5563" },
    { name: "Tailwind CSS", level: 15, description: "Utility-first CSS framework", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "TypeScript", level: 25, description: "Type safety, interfaces, generics", icon: SiTypescript, color: "#3178C6" },
  ];

  const experiences = [
    {
      icon: FiCode,
      title: "Kinh nghiệm phát triển",
      description:
        "Thực hiện các dự án cá nhân và đồ án môn học với Python (Pygame, PyQt5) và JavaScript (React, Node.js), bao gồm game AI, app desktop và web full-stack.",
      color: "text-blue-600 dark:text-blue-400",
      bgIcon: "bg-blue-100 dark:bg-blue-900/30",
      borderHover: "hover:border-blue-200 dark:hover:border-blue-800",
      shadowHover: "hover:shadow-blue-500/10",
    },
    {
      icon: FiBookOpen,
      title: "Học vấn",
      description:
        "Hiện là sinh viên năm 3, chuyên ngành Công nghệ Thông tin. Tập trung vào lập trình web full-stack, cấu trúc dữ liệu, thuật toán và phát triển ứng dụng.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgIcon: "bg-emerald-100 dark:bg-emerald-900/30",
      borderHover: "hover:border-emerald-200 dark:hover:border-emerald-800",
      shadowHover: "hover:shadow-emerald-500/10",
    },
    {
      icon: FiAward,
      title: "Giải thưởng và thành tựu",
      description:
        "Hoàn thành và thuyết trình thành công các đồ án môn học. Đang trong quá trình chuẩn bị và nghiên cứu các giải pháp AI cho kỳ thi Hackathon 2025.",
      color: "text-purple-600 dark:text-purple-400",
      bgIcon: "bg-purple-100 dark:bg-purple-900/30",
      borderHover: "hover:border-purple-200 dark:hover:border-purple-800",
      shadowHover: "hover:shadow-purple-500/10",
    },
  ];

  return (
    <section
      className="min-h-screen py-28 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-neutral-900 dark:via-indigo-950/20 dark:to-purple-950/20 relative overflow-hidden"
      id="about"
    >
      {/* Background Pattern - Purple-Pink Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
              Giới thiệu về tôi
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chào bạn, tôi là Võ Tấn Tài. Hiện tôi là sinh viên năm 3 ngành Công
            nghệ Thông tin, với đam mê lớn trong việc xây dựng và phát triển các
            ứng dụng web full-stack. Tôi luôn tìm tòi học hỏi các công nghệ mới,
            đặc biệt là về hệ sinh thái JavaScript (Node.js, React).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`group relative bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg
                        hover:shadow-2xl ${exp.shadowHover} transition-all duration-300 overflow-hidden
                        border border-transparent ${exp.borderHover}`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-white/5 dark:to-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="flex flex-col items-center text-center">
                <div
                  className={`p-4 ${exp.bgIcon} rounded-2xl mb-6
                              transform transition-all group-hover:scale-110 group-hover:rotate-3 duration-300
                              shadow-lg`}
                >
                  <exp.icon
                    className={`w-8 h-8 ${exp.color} transition-colors duration-300`}
                  />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4
                             group-hover:text-purple-600 dark:group-hover:text-pink-400
                             transition-colors duration-300"
                >
                  {exp.title}
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed
                            group-hover:text-gray-800 dark:group-hover:text-gray-200
                            transition-colors duration-300"
                >
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <SkillsRadarChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 mt-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Mục tiêu và nguồn cảm hứng
          </h3>
          <div className="prose prose-indigo dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Mục tiêu của tôi là trở thành Kỹ sư Phần mềm Full-Stack, xây
              dựng các sản phẩm công nghệ hoàn chỉnh và hữu ích cho người
              dùng.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Tôi lấy cảm hứng từ việc giải quyết các bài toán phức tạp và
              mong muốn ứng dụng Trí tuệ Nhân tạo (AI) vào các dự án thực tế
              trong tương lai.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
