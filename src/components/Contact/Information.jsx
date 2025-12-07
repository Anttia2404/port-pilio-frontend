import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si";

export default function Information() {
  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "tanloc01293@gmail.com",
      href: "mailto:tanloc01293@gmail.com",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "hover:border-red-200 dark:hover:border-red-800",
    },
    {
      icon: FiPhone,
      label: "Điện thoại",
      value: "(+84) 367061068",
      href: "tel:+84367061068",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "hover:border-green-200 dark:hover:border-green-800",
    },
    {
      icon: FiMapPin,
      label: "Địa chỉ",
      value: "Dĩ An, Bình Dương, Việt Nam",
      href: "https://goo.gl/maps/yourLocation",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "hover:border-blue-200 dark:hover:border-blue-800",
    },
  ];

  const socials = [
    {
      icon: SiFacebook,
      label: "Facebook",
      href: "https://facebook.com/yourprofile",
      color: "#1877F2",
    },
    {
      icon: SiGithub,
      label: "GitHub",
      href: "https://github.com/Anttia2404",
      color: "#4b5563",
    },
    {
      icon: SiLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      color: "#0A66C2",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Thông tin liên hệ
        </h3>
        {contactInfo.map(({ icon: Icon, label, value, href, color, bgColor, borderColor }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm 
                       border border-transparent ${borderColor}
                       hover:shadow-lg transition-all duration-300 group`}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className={`p-4 rounded-xl ${bgColor} transition-colors duration-300`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {label}
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {value}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Kết nối với tôi
        </h3>
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, label, href, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-lg 
                         border border-transparent hover:border-gray-200 dark:hover:border-gray-700
                         transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: color }}></div>
              <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: color }} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
