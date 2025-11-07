import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Hero = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      id="home"
    >
      {/* Chúng ta đặt thẻ div "text-center" ra ngoài
        để bao bọc mọi thứ cho nhất quán
      */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
        {/* === BƯỚC 1: ĐƯA AVATAR LÊN TRÊN CÙNG === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8" // Thêm margin-bottom
        >
          <img
            src="/avatar.jpg" // Đường dẫn từ thư mục /public
            alt="Avatar"
            className="w-40 h-40 rounded-full shadow-xl object-cover "
          />
        </motion.div>

        {/* === BƯỚC 2: ĐẶT KHỐI H1 XUỐNG DƯỚI === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-0" // Bỏ margin-top vì đã có ở avatar
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block text-gray-900 dark:text-gray-100">
              Xin chào, tôi là
            </span>
            {/* Bây giờ khối này có thể thay đổi chiều cao
              mà không ảnh hưởng đến avatar
            */}
            <span className="block mt-2">
              <TypeAnimation
                sequence={[
                  "Võ Tấn Tài",
                  2000,
                  "Sinh viên Công nghệ thông tin - HCMUTE",
                  1000,
                  "Full-stack Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              />
            </span>
          </h1>
        </motion.div>

        {/* Các khối còn lại giữ nguyên */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className=" flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NavLink
            to="/contact"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Liên hệ
          </NavLink>
          <NavLink
            to="/projects"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Xem dự án
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex justify-center space-x-8"
        >
          {[
            {
              Icon: FiGithub,
              href: "https://github.com",
              label: "GitHub",
            },
            {
              Icon: FiLinkedin,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
            {
              Icon: FiMail,
              href: "https://gmail.com",
              label: "Email",
            },
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-gray-600 hover:text-indigo-600 transition-all duration-300 rounded-full hover:bg-indigo-50 hover:shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
