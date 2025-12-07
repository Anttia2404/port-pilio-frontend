import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  // const currentYear = new Date().getFullYear();

  const menuItems = [
    { title: "Trang chủ", to: "/" },
    { title: "Giới thiệu", to: "/about" },
    { title: "Dự án", to: "/projects" },
    { title: "Bài tập", to: "/exercises" },
    { title: "Liên hệ", to: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/Anttia2404",
      label: "GitHub",
    },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/t%E1%BA%A5n-t%C3%A0i-v%C3%B5-0549b4385/",
      label: "LinkedIn",
    },
    {
      icon: FiMail,
      href: "https://mail.google.com/mail/u/0/?fs=1&to=tanloc01293@gmail.com&tf=cm",
      label: "Email",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/tan.tai.124297/?locale=vi_VN",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Võ Tấn Tài
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Một lập trình viên Full-stack đam mê xây dựng các ứng dụng web
              hiện đại, hiệu quả và có ý nghĩa.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors
                      ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}
                    `}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Liên hệ
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: tanloc01293@gmail.com
                <br />
                Phone: (+84) 367 061 068
                <br />
                Địa chỉ: TP. Hồ Chí Minh, Việt Nam
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 pt-8 border-t border-gray-200 dark:border-neutral-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Võ Tấn Tài. Đã đăng ký bản quyền.
            <br />
            Template được làm bởi:{" "}
            <a
              href="https://github.com/NekoSakuraLucia/Web-Portfolio-React"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-blue-500"
            >
              NekoSakuraLucia
            </a>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
