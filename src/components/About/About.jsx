import { motion } from "framer-motion";
import { FiBookOpen, FiCode, FiAward } from "react-icons/fi";

const About = () => {
  const skills = [
    { name: "React", level: 70 },
    { name: "JavaScript", level: 75 },
    { name: "Node.js", level: 65 },
    { name: "HTML/CSS", level: 95 },
    { name: "Python", level: 70 },
    { name: "PostgreSQL", level: 60 },
    { name: "MongoDB", level: 55 },
    { name: "Git & GitHub", level: 70 },
    { name: "Tailwind CSS", level: 15 },
    { name: "TypeScript", level: 25 },
  ];

  const experiences = [
    {
      icon: FiCode,
      title: "Kinh nghiệm phát triển",
      description:
        "Thực hiện các dự án cá nhân và đồ án môn học với Python (Pygame, PyQt5) và JavaScript (React, Node.js), bao gồm game AI, app desktop và web full-stack.",
    },
    {
      icon: FiBookOpen,
      title: "Học vấn",
      description:
        "Hiện là sinh viên năm 3, chuyên ngành Công nghệ Thông tin. Tập trung vào lập trình web full-stack, cấu trúc dữ liệu, thuật toán và phát triển ứng dụng.",
    },
    {
      icon: FiAward,
      title: "Giải thưởng và thành tựu",
      description:
        "Hoàn thành và thuyết trình thành công các đồ án môn học. Đang trong quá trình chuẩn bị và nghiên cứu các giải pháp AI cho kỳ thi Hackathon 2025.",
    },
  ];

  return (
    <section
      className="min-h-screen py-28 bg-gray-50 dark:bg-neutral-900"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
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
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className="group relative bg-white dark:bg-neutral-800 p-6 rounded-lg shadow 
                        hover:shadow-lg transition-all duration-300 overflow-hidden
                        before:absolute before:w-16 before:h-16 before:-left-8 before:-top-8 
                        before:bg-indigo-500/5 before:rounded-full before:transition-all before:duration-500
                        before:scale-0 before:opacity-0 hover:before:scale-100 hover:before:opacity-100
                        after:absolute after:w-16 after:h-16 after:-right-8 after:-bottom-8 
                        after:bg-purple-500/5 after:rounded-full after:transition-all after:duration-500
                        after:scale-0 after:opacity-0 hover:after:scale-100 hover:after:opacity-100"
            >
              <div className="flex items-center mb-4">
                <div
                  className="p-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 
                              dark:from-indigo-900/20 dark:to-purple-900/20 rounded-md
                              transform transition-transform group-hover:scale-105 duration-300"
                >
                  <exp.icon
                    className="w-5 h-5 text-indigo-600 dark:text-indigo-400
                                    group-hover:text-purple-600 dark:group-hover:text-purple-400
                                    transition-colors duration-300"
                  />
                </div>
                <h3
                  className="ml-3 text-lg font-semibold text-gray-900 dark:text-white
                             group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                             transition-colors duration-300"
                >
                  {exp.title}
                </h3>
              </div>
              <p
                className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed
                          group-hover:text-gray-800 dark:group-hover:text-gray-200
                          transition-colors duration-300"
              >
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Kỹ năng và năng lực
            </h3>
            <div className="space-y-6">
              {skills
                .sort((a, b) => b.level - a.level)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.8 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                          delay: index * 0.15,
                        }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg"
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
        </motion.div>
      </div>
    </section>
  );
};

export default About;
