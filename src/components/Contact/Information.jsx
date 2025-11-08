import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Information() {
  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "tanloc01293@gmail.com",
      href: "mailto:tanloc01293@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Điện thoại",
      value: "(+84) 367061068",
      href: "tel:+84367061068",
    },
    {
      icon: FiMapPin,
      label: "Địa chỉ",
      value: "Dĩ An, Bình Dương, Việt Nam",
      href: "https://goo.gl/maps/yourLocation",
    },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        {contactInfo.map(({ icon: Icon, label, value, href }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
              <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {label}
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {value}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}
